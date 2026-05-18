---
name: month-end-prep
description: Reconcile QuickBooks against payment processors (Stripe, Square, PayPal, etc.) for month-end close. Use when user says "month-end prep", "processor recon", or "reconcile Stripe to QB".
---

# Month-End Prep

The pre-close reconciliation: catch discrepancies between QBO and payment processors before they become a problem.

## Inputs to confirm
- Client / QBO realm
- Month being closed
- Which processors are in scope (Stripe, Square, PayPal, Shopify, etc.)
- Recent processor statements/CSVs available?

## Steps
1. Pull QBO income transactions for the month tagged to each processor.
2. Pull processor statement totals (gross sales, fees, refunds, net deposits).
3. Reconcile per processor:
   - Gross sales QBO vs processor: should match
   - Fees: confirm posted to fee expense account
   - Refunds: confirm posted as negative income, not as expense
   - Net deposits: should match bank deposits to the day
4. Flag any of: duplicate transactions, missing deposits, fee account miscategorization, refund timing mismatches.
5. List the fixes needed (JE or recategorization).

## Output
- Per-processor recon table (QBO total | Processor total | Variance | Status)
- Discrepancy list with proposed adjusting entries
- "Clean to close" verdict per processor (✅ or ⚠️ with action)
