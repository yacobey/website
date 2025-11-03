import { Router, Request, Response } from "express";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2025-05-28.basil" });

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN!;
const SESSION_SECRET = process.env.SESSION_SECRET!;
// One-time payment amount in cents ($29.99)
const AGENT_PRICE_AMOUNT = 2999;

// Attach in server.ts: app.use(cookieParser());
/** Utils */
function setCustomerCookie(res: Response, customerId: string) {
  const token = jwt.sign({ cid: customerId }, SESSION_SECRET, { expiresIn: "30d" });
  res.cookie("scpa", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 3600 * 1000
  });
}

function getCustomerIdFromCookie(req: Request): string | null {
  const token = req.cookies?.scpa;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SESSION_SECRET) as any;
    return decoded.cid as string;
  } catch {
    return null;
  }
}

/** One-time checkout for services */
router.post("/checkout", async (req: Request, res: Response) => {
  const { price_id } = req.body;
  if (!price_id) return res.status(400).json({ error: "Missing price_id" });
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: price_id, quantity: 1 }],
      success_url: `${FRONTEND_ORIGIN}/success`,
      cancel_url: `${FRONTEND_ORIGIN}/cancel`,
      metadata: { source: "selamcpa.com" }
    });
    return res.json({ url: session.url });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

/** One-time payment for Agent Pro lifetime access ($29.99) */
router.post("/subscribe-agent", async (_req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Selam CPA Agent - Lifetime Access",
            description: "One-time payment for lifetime full access to the Selam CPA AI Agent",
          },
          unit_amount: AGENT_PRICE_AMOUNT,
        },
        quantity: 1,
      }],
      success_url: `${FRONTEND_ORIGIN}/agent/confirm?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_ORIGIN}/agent`,
      metadata: {
        product_type: "agent_lifetime_access"
      }
    });
    return res.json({ url: session.url });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

/** Confirm after checkout: exchange session_id -> customer id, set cookie */
router.get("/agent/confirm", async (req, res) => {
  const { session_id } = req.query;
  if (!session_id) return res.redirect(`${FRONTEND_ORIGIN}/agent`);
  try {
    const cs = await stripe.checkout.sessions.retrieve(session_id as string);
    const customer = cs.customer;
    if (typeof customer === "string") {
      setCustomerCookie(res, customer);
    } else if (customer && "id" in customer) {
      setCustomerCookie(res, (customer as any).id);
    }
  } catch (e) {
    // ignore and continue
  }
  return res.redirect(`${FRONTEND_ORIGIN}/agent`);
});

/** Agent status: check if customer has completed one-time payment */
router.get("/agent/status", async (req, res) => {
  const customerId = getCustomerIdFromCookie(req);
  if (!customerId) return res.json({ pro: false });

  try {
    // Check for successful payment sessions for this customer
    const sessions = await stripe.checkout.sessions.list({
      customer: customerId,
      limit: 100,
    });
    
    // Check if any session was completed and was for the agent lifetime access
    const hasPaid = sessions.data.some(
      session => session.payment_status === "paid" && 
                 session.metadata?.product_type === "agent_lifetime_access"
    );
    
    return res.json({ pro: hasPaid });
  } catch (error) {
    console.error("Error checking agent status:", error);
    return res.json({ pro: false });
  }
});

/** View payment receipt - redirect to customer portal for receipt access */
router.get("/agent/billing", async (req, res) => {
  const customerId = getCustomerIdFromCookie(req);
  if (!customerId) return res.redirect(`${FRONTEND_ORIGIN}/agent`);
  try {
    // Create a billing portal session for the customer to view receipts
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${FRONTEND_ORIGIN}/agent`
    });
    return res.redirect(portal.url);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
});

/** Logout Pro (clear cookie) */
router.post("/agent/logout", (req, res) => {
  res.clearCookie("scpa", { path: "/" });
  return res.json({ ok: true });
});

export default router;