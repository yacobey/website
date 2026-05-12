# Stripe + Automated Delivery Setup — 1099 Toolkit

How a freelancer pays $79 at 3am and gets the product in their inbox 30 seconds later, with no involvement from you.

You've built this site already and you have a sales page now at **selamcpa.com/1099-toolkit**. This guide wires the money flow.

---

## What gets set up

1. **Stripe Payment Link** — the checkout URL the sales page button points to
2. **Google Drive folder** — where the finished Sheets and PDFs live
3. **Make.com scenario** — Stripe webhook → Gmail delivery email + add buyer to nurture list
4. **Optional: MailerLite or ConvertKit** — runs the 4-email drip after delivery

Time to set up: ~90 minutes once. After that: $0 of your time per sale.

---

## Step 1 — Build the Google Drive folder

1. Open Google Drive.
2. Create folder: `1099 Toolkit — Customer Files`.
3. Build the five customer files inside it, using the specs in `product/1099-toolkit/`:
   - Quarterly Estimated Tax Calculator (Google Sheet)
   - Deductible Expense Tracker (Google Sheet)
   - Mileage Log (Google Sheet)
   - "What Can I Actually Deduct?" Cheat Sheet (Google Doc → export as PDF)
   - Quarterly Action Checklist (Google Doc → export as PDF)
4. For each Google Sheet/Doc:
   - **Share** → "Anyone with the link" → **Viewer**
   - Copy the URL
   - Replace `/edit` (or `/view`) at the end with `/copy`
   - Save that customer link
5. For the two PDFs:
   - Upload them to the same Drive folder
   - Share → "Anyone with the link" → **Viewer**
   - Copy each direct link

Once all five customer links exist, open `product/1099-toolkit/customer-delivery-email.md` and replace every `REPLACE_WITH_COPY_LINK` / `REPLACE_WITH_PDF_LINK` with the real URL.

---

## Step 2 — Stripe account + Payment Link

### 2a. Create the Stripe account

1. Go to **stripe.com** → Start now.
2. Sign up with your business email (info@selamcpa.com).
3. Complete the business onboarding:
   - Business name: **Selam CPA**
   - Legal entity: whatever you filed (sole prop or LLC)
   - EIN or SSN
   - Bank account (US business checking)
   - Address: your Laurel, MD address
4. Stripe will hold your first payouts for ~7 days while verifying. After that, payouts hit your bank on a 2-day rolling schedule.

### 2b. Create the Product

1. In Stripe dashboard → **Products → Add product**.
2. Name: **The 1099 Tax Toolkit**
3. Description: **CPA-built toolkit for self-employed freelancers — Quarterly Estimated Tax Calculator, Expense Tracker, Mileage Log, and reference PDFs. Built and signed by Yacob Tewelde, CPA, FCCA.**
4. Image: upload a clean toolkit cover image (or skip for v1).
5. Pricing:
   - **One time** payment
   - **Price: $79.00**
   - Currency: USD
6. Click **Save product**.

### 2c. Create the Payment Link

1. Top of the product page → **Create payment link**.
2. Settings:
   - **After payment:** Show a confirmation page with a custom message:
     > "Payment received. Your toolkit is on its way to your inbox — check your email in the next few minutes (including spam, just in case). Questions? Reply to the email or call 301-640-8549."
   - **Collect customer information:** Email + Full Name (not address — we don't need it)
   - **Allow promo codes:** ON (so you can run launch discounts later)
3. Click **Create link**.
4. Copy the URL. It looks like `https://buy.stripe.com/abc123xyz...`.

### 2d. Drop the Stripe URL into the sales page

1. Open `client/src/pages/toolkit-1099.tsx`.
2. Find the line:
   ```ts
   const STRIPE_CHECKOUT = "https://buy.stripe.com/REPLACE_AFTER_STRIPE_SETUP";
   ```
3. Replace the placeholder URL with your real Stripe Payment Link URL.
4. Deploy (Replit auto-deploys on push, or hit Deploy in Replit).

The sales page is now wired to accept payments.

---

## Step 3 — Make.com scenario: Stripe → Gmail

This is what fires the delivery email automatically the moment a payment lands.

### 3a. Get your Stripe webhook ready

You don't need to manually configure a webhook — Make.com sets it up via its Stripe app. Just make sure you have Stripe access ready in Step 3c.

### 3b. Create the Make scenario

1. Make.com → **Scenarios → Create a new scenario**.
2. Click the **+** circle.
3. Search **Stripe** → pick **Stripe**.
4. Pick the trigger: **Watch Events**.
5. Click **Create a connection** → sign in with your Stripe account → grant access.
6. **Event types** to watch: select only **`payment_intent.succeeded`** (or **`checkout.session.completed`** — try both during testing and pick whichever fires reliably for Payment Links; typically `checkout.session.completed`).
7. Click **OK**.

### 3c. Filter for the right product

If you sell other things on Stripe later, you'll want this scenario to only fire for the toolkit.

1. Click the line after the Stripe trigger → **Set up a filter**.
2. Condition: **`amount` → equal to → `7900`** (Stripe amounts are in cents; $79 = 7900).
3. AND: **`status` → text equal to → `succeeded`**.
4. Click **OK**.

(More precise: filter by `metadata.product_id` once you start selling multiple products. For one product, the amount filter is enough.)

### 3d. Send the delivery email via Gmail

1. Click **+** after the filter.
2. Search **Gmail** → pick **Send an Email**.
3. Click **Create a connection** → sign in with **info@selamcpa.com** → grant Make.com access.
4. Configure:
   - **To:** map to the customer's email from the Stripe trigger (look for `customer_email` or `customer_details.email` in the variable picker).
   - **Subject:** `Your 1099 Tax Toolkit is here`
   - **Content type:** Plain text
   - **Content:** copy the email body from `product/1099-toolkit/customer-delivery-email.md`, paste it in, replace `{{customer_first_name}}` with the variable for the customer's first name from Stripe.
   - **From name:** `Yacob Tewelde — Selam CPA`
5. Click **OK**.

### 3e. (Optional) Log the sale in Google Sheets

If you want a running record of sales without leaving Make.com:

1. Click **+** after Gmail.
2. **Google Sheets → Add a Row**.
3. Pick a tracking sheet (create one called `Toolkit Sales` with columns: Date, Customer Email, Customer Name, Amount, Stripe ID).
4. Map each column to the appropriate Stripe variables.

### 3f. Name + activate the scenario

1. Top of screen: **`1099 Toolkit — Deliver on Purchase`**.
2. Set **Run scenario: Immediately** (Stripe triggers via webhook are real-time, not polled).
3. Toggle the scenario **ON**.

---

## Step 4 — End-to-end test (don't skip)

1. Make a real Stripe test purchase:
   - Open the sales page: selamcpa.com/1099-toolkit
   - Click "Get the Toolkit"
   - At checkout, use Stripe test card: `4242 4242 4242 4242`, any future expiry, any 3-digit CVC, any ZIP.
   - **Important:** Stripe Payment Links don't support test mode in the live URL. Two options:
     a) Make a real $79 purchase with your own card, verify everything, then refund yourself in the Stripe dashboard.
     b) In Stripe dashboard, toggle to **Test mode** (top-right), create a separate test Payment Link, run the test, then build the real link in live mode.
   - Option (a) is faster and the refund is one click.
2. Within 30 seconds, your customer email should receive the delivery email.
3. Click every link in the email — make sure each one opens a "Make a copy" prompt.
4. If anything's broken, open Make.com → the scenario → **History** to see the failure.

---

## Step 5 — Optional: Add the 4-week drip in MailerLite

You can do the drip in Make.com directly (using Sleep/Wait modules), but once you have >50 customers/month it's cleaner to use an email tool.

### 5a. MailerLite setup

1. Sign up at **mailerlite.com** with info@selamcpa.com. Free tier: 1,000 subscribers.
2. Create a list called **`1099 Toolkit Buyers`**.
3. Go to **Automation → Create new automation**.
4. Trigger: **When subscriber joins this group**.
5. Build the 4-step sequence using the copy from `product/1099-toolkit/email-drip.md`:
   - **Wait 3 days** → Send email 1 (Quarterly Calculator check-in)
   - **Wait 7 days** → Send email 2 (Three deductions freelancers miss)
   - **Wait 11 days** → Send email 3 (Tax prep upsell)
   - **Wait 7 days** → Send email 4 (Final note + referral ask)
6. Activate the automation.

### 5b. Add a Make.com step to add buyers to MailerLite

1. Open the existing `1099 Toolkit — Deliver on Purchase` scenario.
2. Add a new module after Gmail.
3. Search **MailerLite → Add a subscriber to a group**.
4. Connect MailerLite, pick the **`1099 Toolkit Buyers`** group.
5. Map: email = Stripe customer email, name = Stripe customer name.

Now every buyer gets the delivery email instantly + lands on the drip automatically.

---

## What this costs ongoing

| Tool | What it costs |
|---|---|
| Stripe | 2.9% + $0.30 per transaction → ~$2.60 per $79 sale → you net ~$76.40 |
| Make.com | Free up to 1,000 ops/month (each sale uses ~3 ops, so 300+ sales/mo free) |
| Google Drive | Included in your existing Google account |
| MailerLite | Free up to 1,000 subscribers |
| Gmail | Free with your Google account |
| **You per sale** | **$0 — just the Stripe fee** |

---

## Troubleshooting

**"The delivery email never arrived."**
1. Check Make.com → scenario History. If it says "filtered out," your filter is too strict (check the amount and status conditions).
2. If Make.com fired successfully but no email came, check Gmail "Sent" folder — if it's there, it landed in the customer's spam. Add Selam CPA to their address book in the delivery email body for future emails.

**"The customer says the link didn't ask them to 'Make a copy'."**
Your link URL ends with `/edit` or `/view` instead of `/copy`. Fix the link in `customer-delivery-email.md` and re-test.

**"Payment came in but Make.com didn't fire."**
Stripe webhook config. Open Make.com → scenario → trigger module → **Re-create connection** to Stripe. Or check Stripe dashboard → **Developers → Webhooks** to see if the event endpoint is healthy.

**"I want to send the toolkit to a customer manually."**
You always can. Open the delivery email file, paste it into Gmail, send. No tools required.

---

## Pre-launch checklist

Before you announce the product:

- [ ] All five customer files built in Google Drive
- [ ] All `/copy` links in the delivery email replaced with real URLs
- [ ] Stripe account verified (you can receive payouts)
- [ ] Stripe Payment Link created at $79
- [ ] Payment Link URL pasted into `toolkit-1099.tsx` and deployed
- [ ] Make.com scenario active and tested with real $79 purchase
- [ ] You self-refunded the test purchase
- [ ] MailerLite drip set up (or Make.com drip)
- [ ] You can find the product page at selamcpa.com/1099-toolkit and it loads

Once every box is checked, see `LAUNCH_PLAN.md` for the week-1 launch sequence.
