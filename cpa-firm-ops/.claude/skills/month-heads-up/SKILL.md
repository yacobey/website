---
name: month-heads-up
description: Run on the 25th of the month to give the client a heads-up on month-end cash position before close. Use when user says "month heads up", "25th check-in", or "end of month preview".
---

# Month Heads-Up

Five-day early warning before month-end close. Spots problems while there's still time to fix them.

## When to invoke
Around the 25th of the month — or any time the user wants a 5-7 day forward look.

## Inputs to confirm
- Client / QBO realm
- Target month-end date

## Steps
1. Project cash at month-end (use cash-flow-snapshot logic, but only 5-7 days out).
2. Pull AR aging — anything that *should* close this month but hasn't.
3. Pull AP — anything due before month-end that risks late fees or relationship hits.
4. Pull MTD revenue vs prior 3-month average — flag if pacing >15% below.
5. Surface anything unusual: large uncategorized transactions, unposted bills, unsent invoices.

## Output
- 🟢/🟡/🔴 status per area: Cash, AR, AP, Revenue pacing, Bookkeeping hygiene
- Top 3 actions before month-end (specific: "Send invoice #1234 to Acme" not "follow up on AR")
- One-paragraph "what to tell the owner"
