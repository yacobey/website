---
name: monday-brief
description: Start-of-week brief covering cash, sales, pipeline, and to-dos. Use on Monday mornings or when user says "Monday brief", "weekly kickoff", or "what should I focus on this week".
---

# Monday Brief

The Monday-morning briefing. Sets the week's priorities in five minutes of reading.

## Inputs to confirm
- Client / QBO realm
- Week starting date (default: today if Mon, else this Mon)

## Steps
1. **Cash**: current balance, runway in weeks at current burn, next 7 days of bills & payroll.
2. **Sales** (weekend + last week):
   - Revenue last 7 days
   - Top 3 customers by spend
   - Any large refunds or chargebacks to address
3. **Pipeline** (HubSpot):
   - Deals expected to close this week (`search_crm_objects` filtered to close_date this week)
   - Stale deals (no activity 14+ days)
   - New leads to triage
4. **To-dos this week**:
   - Overdue invoices to chase (top 3)
   - Bills to pay this week
   - Payroll on the calendar?
   - Tax/compliance deadlines?

## Output
- 4 sections: Cash · Sales · Pipeline · To-dos
- Top-3 priorities for the week (specific actions, not categories)
- One question to ask the owner if anything seems off
