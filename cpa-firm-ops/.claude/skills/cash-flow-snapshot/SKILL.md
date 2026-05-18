---
name: cash-flow-snapshot
description: Build a 30/60/90-day cash flow forecast for a small business client. Use when the user asks for a "cash flow forecast", "cash snapshot", "runway check", or "30/60/90 outlook".
---

# Cash Flow Snapshot

Projects a client's cash position out 30, 60, and 90 days based on QBO data.

## Inputs to confirm
- Client / QBO realm
- Starting cash balance (auto-pull from QBO if available)
- Any large known one-offs (tax payments, equipment purchase, etc.)

## Steps
1. Starting balance: pull current cash via `qbo_accounting_get_balance_sheet`.
2. AR inflows: pull `qbo_accounting_get_ar_aging_summary`; bucket expected collections by due date with realistic collection rates (90% on-time, 70% 1-30 late, 40% 31-60, 15% 60+).
3. AP outflows: pull `qbo_accounting_get_ap_aging_summary`; schedule by due date.
4. Recurring outflows: payroll (use `qbo_payroll_get_company_last_payroll_run`), rent, software, etc. — ask client to confirm any not in QBO.
5. Roll forward weekly for 13 weeks. Show net cash at end of week 4, 8, 12.
6. Flag any week where projected cash < 2 weeks of payroll.

## Output
- Table: Week | Inflows | Outflows | Net | Ending Cash
- Three KPIs: 30-day end, 60-day end, 90-day end
- Risk callouts (negative weeks, large gaps)
- One-paragraph plain-English summary
