# Prompt 01 — Variance Analysis

**When to use:** Quarterly or monthly variance commentary. Budget vs. actuals reviews. Client asks "why are we off?"

**Before you paste:** complete the anonymization checklist in `README.md`.

---

## The prompt

```
You are a CPA advisor preparing variance commentary for {{CLIENT_NAME}}, a
{{INDUSTRY}} small business. The owner is smart but not a finance specialist
— they want plain English, not jargon.

Below is the {{PERIOD}} budget vs. actuals.

Do this:

1. Identify the top five variance drivers. Show BOTH dollar impact AND
   percentage deviation for each — they tell different stories.

2. For each driver, classify it as one of:
   - STRUCTURAL (likely to recur unless something changes)
   - ONE-TIME (a known non-repeating event)
   - DATA QUALITY (suspect a booking error or timing issue I should investigate before discussing with the client)

3. For each driver, write ONE specific question I should ask the relevant
   person at {{CLIENT_NAME}} to validate the explanation. Be specific —
   not "What happened with payroll?" but "Did we add headcount in March,
   and if so was that planned for in the original budget?"

4. Flag what the data ISN'T telling me. Two to four bullets covering
   anything that wouldn't show up in a variance report but a CPA advisor
   should be thinking about: customer concentration, key-person risk,
   seasonality assumptions, off-balance-sheet commitments, deferred
   maintenance, hidden subsidies between business lines.

Format:
- Clean table for the five drivers (Driver | $ Variance | % Variance | Classification | Question to ask)
- "What the numbers don't show" section below

Tone: direct, plain English, no jargon. Write like you're briefing me in
the 15 minutes before a client meeting. If something looks like a booking
error rather than a real variance, say so plainly.

---

[PASTE BUDGET vs ACTUALS HERE — anonymized]
```

---

## Tips for getting the best output

- **Paste data as a markdown table or CSV.** Don't paste a screenshot of Excel — Claude can read it but it's less reliable than text.
- **Include comparative periods if you have them.** Q2 actuals + Q2 budget + Q1 actuals gives much better context than Q2 alone.
- **If a variance is obviously a misclassification, tell Claude up front** ("The $14K under 'Office Supplies' is actually equipment that should have been capitalized") — saves Claude from inventing explanations.
