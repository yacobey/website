---
name: close-month
description: Full month-end close — reconciliation, P&L, balance sheet, and a packet for the client. Use when user says "close month", "month-end close", or "finalize the books for [month]".
---

# Close Month

The full month-end close ritual. Reconcile, post adjustments, produce statements, package for the client.

## Inputs to confirm
- Client / QBO realm
- Month being closed
- Has `/month-end-prep` already been run? (recommended first)
- Include comparative period? (default: prior month + same month prior year)

## Steps
1. **Reconcile**:
   - All bank accounts
   - All credit cards
   - All payment processors (run `/month-end-prep` if not done)
   - Loan balances
2. **Adjusting entries**:
   - Depreciation
   - Accrued expenses (utilities, payroll accrual if applicable)
   - Prepaid expense amortization
   - Sales tax payable true-up
3. **Generate statements**:
   - P&L (current month + comparatives) via `profit-loss-generator`
   - Balance sheet via `qbo_accounting_get_balance_sheet`
   - AR aging snapshot
   - AP aging snapshot
4. **Lock the period** (or note that owner should).
5. **Build the close packet**:
   - One-page executive summary (revenue, net income, cash, top variances)
   - Statements as PDF attachments
   - "Watches" — anything worth flagging to the owner

## Output
- Close packet (markdown + PDF-ready)
- List of JEs posted
- Open items list (anything that couldn't be resolved this month)
