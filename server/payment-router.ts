import { Router, Request, Response } from "express";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { db } from "./db";
import { agentSessionRedemptions } from "@shared/schema";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2025-05-28.basil" });

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN!;
const SESSION_SECRET = process.env.SESSION_SECRET!;
// One-time payment amount in cents ($29.99)
const AGENT_PRICE_AMOUNT = 2999;

// Server-side allowlist: product key -> Stripe price ID (from env).
// Only price IDs mapped here can be sold via the hosted checkout endpoint.
const ALLOWED_CHECKOUT_PRICES: Record<string, string> = Object.fromEntries(
  [
    ["consultation_1hr", process.env.STRIPE_PRICE_CONSULTATION_1HR],
    ["digital_guidelines", process.env.STRIPE_PRICE_DIGITAL_GUIDELINES],
  ].filter(([, v]) => !!v) as [string, string][]
);

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
    const decoded = jwt.verify(token, SESSION_SECRET) as jwt.JwtPayload;
    return typeof decoded.cid === "string" ? decoded.cid : null;
  } catch {
    return null;
  }
}

function setNonceCookie(res: Response, nonce: string) {
  const token = jwt.sign({ nonce }, SESSION_SECRET, { expiresIn: "2h" });
  res.cookie("scpa_nonce", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 2 * 3600 * 1000
  });
}

function getNonceFromCookie(req: Request): string | null {
  const token = req.cookies?.scpa_nonce;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SESSION_SECRET) as jwt.JwtPayload;
    return typeof decoded.nonce === "string" ? decoded.nonce : null;
  } catch {
    return null;
  }
}

/** One-time checkout for services */
router.post("/checkout", async (req: Request, res: Response) => {
  const { product_key } = req.body;
  if (!product_key) return res.status(400).json({ error: "Missing product_key" });

  const price_id = ALLOWED_CHECKOUT_PRICES[product_key as string];
  if (!price_id) return res.status(400).json({ error: "Invalid or unavailable product" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: price_id, quantity: 1 }],
      success_url: `${FRONTEND_ORIGIN}/success`,
      cancel_url: `${FRONTEND_ORIGIN}/cancel`,
      metadata: { source: "selamcpa.com", product_key }
    });
    return res.json({ url: session.url });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

/** One-time payment for Agent Pro lifetime access ($29.99) */
router.post("/subscribe-agent", async (_req, res) => {
  try {
    // Generate a browser-binding nonce stored as a cookie and recorded in the
    // Stripe session as client_reference_id; the confirm endpoint verifies it.
    const nonce = randomBytes(32).toString("hex");

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
      client_reference_id: nonce,
      success_url: `${FRONTEND_ORIGIN}/agent/confirm?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_ORIGIN}/agent`,
      metadata: { product_type: "agent_lifetime_access" }
    });

    setNonceCookie(res, nonce);
    return res.json({ url: session.url });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});

/** Confirm after checkout: verify nonce binding, record redemption in DB, set cookie */
router.get("/agent/confirm", async (req, res) => {
  const { session_id } = req.query;
  if (!session_id) return res.redirect(`${FRONTEND_ORIGIN}/agent`);

  const sid = session_id as string;
  const browserNonce = getNonceFromCookie(req);

  try {
    const cs = await stripe.checkout.sessions.retrieve(sid);

    if (
      cs.payment_status !== "paid" ||
      cs.metadata?.product_type !== "agent_lifetime_access"
    ) {
      return res.redirect(`${FRONTEND_ORIGIN}/agent`);
    }

    // Verify the request comes from the browser that initiated checkout (nonce binding)
    if (!browserNonce || cs.client_reference_id !== browserNonce) {
      return res.redirect(`${FRONTEND_ORIGIN}/agent`);
    }

    const customerId =
      typeof cs.customer === "string" ? cs.customer : cs.customer?.id ?? null;

    if (!customerId) {
      return res.redirect(`${FRONTEND_ORIGIN}/agent`);
    }

    // Atomic single-use enforcement: UNIQUE constraint on session_id rejects replays
    await db.insert(agentSessionRedemptions).values({
      sessionId: sid,
      stripeCustomerId: customerId,
    });

    res.clearCookie("scpa_nonce", { path: "/" });
    setCustomerCookie(res, customerId);
  } catch (e: unknown) {
    const code = (e as { code?: string })?.code;
    if (code !== "23505") {
      console.error("Agent confirm error:", e);
    }
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
