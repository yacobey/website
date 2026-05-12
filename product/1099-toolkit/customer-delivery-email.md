# Customer Delivery Email — Fires on Stripe Purchase

This is the email that goes out automatically the moment a customer pays. Make.com fires it via Gmail. **You'll paste this body into the Make.com scenario** (see `STRIPE_DELIVERY_SETUP.md`).

After you build the actual Google Sheets and PDFs, come back here and replace every `REPLACE_WITH_COPY_LINK` placeholder with the real `/copy` URL.

---

**Subject:** Your 1099 Tax Toolkit is here

**Body:**

```
Hi {{customer_first_name}},

Thanks for picking up the 1099 Tax Toolkit. Everything you bought is below.

Each Google Sheet link will ask you to "Make a copy" — click that button. The
copy goes into your own Google Drive, and you can edit it freely.

---

1. QUARTERLY ESTIMATED TAX CALCULATOR
   The one you'll use four times a year.
   REPLACE_WITH_COPY_LINK

2. DEDUCTIBLE EXPENSE TRACKER
   Pre-categorized for 1099 earners. Open it every time you spend money on
   the business and add a row.
   REPLACE_WITH_COPY_LINK

3. IRS-COMPLIANT MILEAGE LOG
   Log every business trip. Standard mileage rate, year-end deduction
   calculated for you.
   REPLACE_WITH_COPY_LINK

4. "WHAT CAN I ACTUALLY DEDUCT?" CHEAT SHEET (PDF)
   Print it. Stick it near your desk.
   REPLACE_WITH_PDF_LINK

5. QUARTERLY ACTION CHECKLIST (PDF)
   What to do in January, April, June, September, December. Save it.
   REPLACE_WITH_PDF_LINK

---

A few things worth knowing:

- The Quarterly Calculator gives a strong estimate, not a tax return. If you
  have multi-state income, dependents, big retirement contributions, or you
  got an IRS notice this year, get a CPA review before filing.

- I update the tax brackets in the calculator each January. If you bought
  this product before January and we're now in a new tax year, drop me an
  email at info@selamcpa.com and I'll send the updated version.

- If something doesn't work or a formula breaks, reply to this email. I read
  every reply personally.

If you want me to actually do your tax return for you, the flat-rate price
for a self-employed return is $399. Just reply with "tax prep" and we'll set
up a call.

Yacob Tewelde, CPA, FCCA
Selamcpa.com
301-640-8549
info@selamcpa.com
```

---

## Variable to map in Make.com

- `{{customer_first_name}}` → comes from Stripe's checkout data. In Make.com's Gmail "Send Email" module, map this to the customer's first name from the Stripe webhook trigger. Stripe collects this as part of the billing details on Checkout. If first name isn't available, fall back to "there."

## Sender setup

- **From:** info@selamcpa.com
- **Reply-To:** info@selamcpa.com
- **Sender name:** Yacob Tewelde — Selam CPA

The reply-to is critical — every customer who replies becomes a sales conversation.
