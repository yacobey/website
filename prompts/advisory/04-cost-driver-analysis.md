# Prompt 04 — Cost Driver Analysis

**When to use:** Margin compression diagnostics. A client says "I'm working harder but making less" or "my profit just isn't where it used to be." Year-over-year deep dives. Pre-pricing-conversation analysis.

**Before you paste:** complete the anonymization checklist in `README.md`.

---

## The prompt

```
You are a CPA advisor diagnosing the cost structure of {{CLIENT_NAME}},
a {{INDUSTRY}} small business. The owner is busy running the business —
they haven't sat down with the P&L line by line in months and they're
about to be surprised by what's happened to their margins.

Below is six months (or more) of monthly P&L data.

Do this:

1. RANKED COST DRIVERS
   Identify the cost lines that have grown the most as a PERCENTAGE OF
   REVENUE — not just absolute dollars. Rank the top five.

   For each, show:
   - The cost line
   - % of revenue at the start of the period vs. % of revenue at the end
   - When the step-change happened (which month did the trend shift?)
   - The most likely explanation given the data (a hire, a pricing
     change, a vendor change, scope creep, increased COGS inputs)
   - Whether it looks STRUCTURAL or TEMPORARY

2. HIDDEN MARGIN COMPRESSION
   Identify any cost line that is RISING in absolute dollars while its
   percentage of revenue stayed flat. That's hidden compression most
   owners miss — they assume "% of revenue flat = no problem" when in
   fact the business is growing into a bigger cost base.

3. THE LINES NO ONE LOOKS AT
   Flag the 2–3 cost lines under $1,000/month that have grown >50%
   year-over-year. These are often subscriptions, fees, or auto-renewals
   that accumulate until they're $5K/year before anyone notices.

4. WHAT THE DATA ISN'T TELLING ME
   Two to four bullets covering anything a CPA advisor should be
   thinking about that wouldn't show up in a cost analysis:
   - Labor mix shifts (W-2 vs. 1099, junior vs. senior)
   - Vendor concentration (one supplier > 30% of COGS)
   - Deferred items (postponed maintenance, unfunded benefit accruals)
   - Owner draws or related-party expenses that may distort the picture

5. ONE QUESTION PER FINDING
   For each item across sections 1–3, write the single specific question
   I should ask the owner to validate the diagnosis.

Format:
- Section 1: ranked table
- Section 2: short callout
- Section 3: short callout
- Section 4: bullet list
- Section 5: numbered question list keyed to the findings

Tone: diagnostic. You're the doctor looking at lab results. Specific and
honest. If a line item looks like a booking error rather than real cost
growth, say so plainly — don't manufacture an explanation.

---

[PASTE SIX-MONTH-PLUS P&L HERE — monthly columns, all cost lines.
Anonymized.]

REVENUE TREND CONTEXT (optional):
[ONE-LINE NOTE on whether revenue is growing, flat, or declining over
the period, and any known major drivers. This stops Claude from
inventing revenue stories.]
```

---

## Tips for getting the best output

- **Monthly columns, not aggregated.** The whole point is to find WHEN a shift started. Quarterly data hides month-of-onset.
- **Include every cost line, not just the ones that look problematic.** Sometimes the surprise is the line you assumed was fine.
- **If you already know the cause of a variance, tell Claude up front.** Otherwise it spends effort theorizing about something you could have ruled out in one sentence.
- **Run this once a year on every advisory client.** It uncovers things the monthly close doesn't.
