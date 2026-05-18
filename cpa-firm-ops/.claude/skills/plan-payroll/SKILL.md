---
name: plan-payroll
description: Plan the next payroll run — confirm cash on hand covers it, then generate a chase list of overdue AR to close the gap if needed. Use when the user says "plan payroll", "can we make payroll", or "payroll cash check".
---

# Plan Payroll

Pre-flight check for an upcoming payroll: do we have the cash, and if not, what receivables should we chase?

## Inputs to confirm
- Client / QBO realm
- Payroll date (default: next scheduled)
- Safety buffer (default: 1 week of operating expenses)

## Steps
1. Estimate payroll total: `qbo_payroll_get_company_last_payroll_run` + any known headcount changes.
2. Add employer taxes (~7.65% FICA + state/fed unemployment if applicable).
3. Pull current cash + pending deposits.
4. Compute gap: `Cash + Pending Deposits − Payroll − Buffer`.
5. If gap is negative or <0.5x payroll:
   - Pull `qbo_accounting_get_ar_aging_detail`
   - Rank invoices by `(amount × inverse-of-days-old × customer-pay-history)`
   - Build top-5 chase list with phone/email + suggested script
6. Output recommendation: PROCEED / TIGHT (chase first) / DELAY.

## Output
- One-line verdict
- Payroll math (gross, employer tax, total)
- Cash position table
- Top-5 chase list (if needed) with draft scripts
