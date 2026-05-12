# 4-Week Email Drip — After Toolkit Purchase

After the delivery email (Day 0) goes out, this 4-email sequence nurtures the buyer toward the upsell: **done-for-you tax prep at $399**.

## How this gets sent

Two viable approaches:

**Option A — Make.com only (free, simplest):**
After the delivery email, Make.com queues 4 scheduled emails (Days 3, 10, 21, 28) using its "Sleep" or "Scheduled" module. Works for a few hundred customers/month before you hit free-tier limits.

**Option B — Email tool (recommended once you cross ~100 customers/month):**
Add buyer to a list in **MailerLite** (free up to 1,000 subscribers) or **ConvertKit** ($0 for the free tier). Set up a 4-step automation. More reliable than Make.com for sequenced emails over time.

Either way, the trigger is the Stripe purchase webhook. Customer goes into the list/queue automatically.

---

## Email 1 — Day 3

**Subject:** Did you find the Quarterly Calculator?

```
Hi {{first_name}},

Quick check-in — you bought the 1099 Toolkit three days ago. Did you get
a chance to open the Quarterly Estimated Tax Calculator yet?

Most freelancers tell me the same thing the first time they use it:
"I had no idea I was supposed to be paying that much."

If you haven't opened it yet, here's the link again:
[QUARTERLY CALCULATOR LINK]

Two minutes to fill in your basic info. Five minutes to see what your
next quarterly payment should be.

If something doesn't make sense in the sheet, reply to this email and
I'll walk you through it.

Yacob Tewelde, CPA, FCCA
Selam CPA
```

---

## Email 2 — Day 10

**Subject:** Three deductions freelancers always miss

```
Hi {{first_name}},

In ten years of filing freelancer returns, three deductions come up
again and again as "I had no idea I could claim that":

1. SELF-EMPLOYED HEALTH INSURANCE
   If you pay your own health insurance premiums and you're not eligible
   for an employer plan (yours or a spouse's), the premiums are fully
   deductible — up to your net SE income. This goes on Schedule 1, not
   Schedule C. Most freelancers miss it.

2. SOLO 401(k) CONTRIBUTIONS
   You can contribute up to $23,000 of salary deferral plus 25% of your
   net SE income each year. That's a tax deduction in the same year you
   contribute. For a freelancer earning $80K, this can drop your tax
   bill by $5K–$8K. Verify current contribution limits with IRS each year.

3. HOME OFFICE — SIMPLIFIED METHOD
   $5 per square foot, up to 300 sq ft = up to $1,500 deduction with
   almost no paperwork. The space must be used regularly AND exclusively
   for business. Most freelancers qualify and never claim it because
   they're afraid it triggers audits. It doesn't, if you actually qualify.

Open the "What Can I Actually Deduct?" cheat sheet I sent you for the
full list.

If you've already done your taxes this year and missed any of these, you
can amend the return (Form 1040-X) up to three years back. Worth it for
most cases.

Yacob Tewelde, CPA, FCCA
Selam CPA
```

---

## Email 3 — Day 21 (THE UPSELL)

**Subject:** Want me to actually file your return?

```
Hi {{first_name}},

You bought the 1099 Toolkit three weeks ago. By now you've probably
realized something:

The toolkit is a great planning system. But come April, you still have
to sit down and actually file a return — with the right forms, the
right elections, and the right cross-checks.

For most freelancers, the math on doing it yourself looks like this:

  TurboTax Self-Employed:      $129 + state filing fees
  Hours spent figuring it out: 8–15 hrs
  Risk of leaving money on
  the table or making errors:  High

For my done-for-you tax prep, it looks like this:

  Selam CPA flat-rate Schedule C return:  $399
  Your time involved:                     ~30 min (upload docs, review)
  Reviewer-defensible filing:             Always
  CPA + FCCA signing the return:          Always

If you want me to file this year's return:
  - Reply to this email with "tax prep"
  - I'll send you a checklist of what to upload
  - We'll do a 30-min Zoom or phone review before I e-file
  - Toolkit customers save $50: pay $349 instead of $399

If you're DIY this year, no problem. Use the toolkit. The cheat sheet
covers the top traps.

Yacob Tewelde, CPA, FCCA
Selam CPA
301-640-8549
```

---

## Email 4 — Day 28

**Subject:** Last note — and a small ask

```
Hi {{first_name}},

This is the last email I'll send from this sequence — you'll only hear
from me when there's something actually useful (an annual toolkit
update, a tax law change that affects freelancers, or if you reply).

If the toolkit has been useful, two small asks:

1. TELL ONE OTHER FREELANCER
   If you know another self-employed person who's been winging it on
   taxes, send them the link: selamcpa.com/1099-toolkit. I'll throw in
   the same $50 discount on tax prep for them.

2. REPLY WITH ONE THING I COULD ADD
   What's the one thing missing from the toolkit that would have made
   it more useful for you? I read every reply and I update the toolkit
   based on customer feedback.

Thanks for the trust. Quarterly deadlines don't care about us — let's
make sure they don't surprise you again.

Yacob Tewelde, CPA, FCCA
Selam CPA
Selamcpa.com
```

---

## Things to know about this sequence

**Why 4 emails, not 10:**
Anything beyond 4 emails to a $79 buyer feels like harassment. The upsell email (#3) is the revenue driver. The other three build the relationship.

**Why the upsell is on Day 21, not Day 7:**
By Day 21, they've actually used the toolkit. They've felt the gap between "having a calculator" and "having someone file the return." That gap is what they're paying for. Hitting them with the upsell on Day 7 — before they've used the product — feels like a bait-and-switch.

**The reply trigger:**
Every email asks them to reply. This is intentional. Replies are the highest-intent sales signal you can get. When someone replies to email #2 saying "I have a weird situation," that's a $399 client knocking on the door.

**Spam compliance:**
- All these emails are transactional + relationship — they bought a product from you. CAN-SPAM compliant by default.
- Include a "reply 'STOP' to unsubscribe" line in MailerLite/ConvertKit (those tools auto-handle it).
- Never sell or share the email list. Ever. It's a CPA-trust thing.

**Tracking:**
- Watch open rate (target: 40%+) and reply rate on email #3.
- If reply rate on #3 is below 5%, the offer or the subject line is the problem. Test variations.
