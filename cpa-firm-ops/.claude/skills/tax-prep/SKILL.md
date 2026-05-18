---
name: tax-prep
description: Prepare a quarterly estimated tax packet OR a 1099 filing packet for a CPA client. Use when the user says "tax prep", "quarterly tax", "estimated taxes", "1099 packet", or asks to prep tax filings for a small business client.
---

# Tax Prep

Builds a clean packet a CPA can hand off to a client for either (a) quarterly estimated taxes or (b) annual 1099 filings.

## Inputs to confirm with the user
- Which packet: quarterly estimates or 1099?
- Client name / QBO realm
- Period (quarter & year, or tax year)
- Entity type (sole prop, S-corp, partnership, LLC)
- For 1099: payment threshold (default $600)

## Steps — Quarterly estimates
1. Pull YTD P&L via `qbo_accounting_get_balance_sheet` / profit-loss-generator scoped to the period.
2. Adjust for owner comp, depreciation add-backs, and known nondeductibles.
3. Compute estimated taxable income; apply federal + state effective rate (ask if unknown).
4. Subtract YTD withholding & prior quarterly payments.
5. Output: voucher amount (1040-ES / state equivalent), due date, calc memo.

## Steps — 1099 packet
1. Pull vendor payments via QBO for the tax year.
2. Filter: paid via cash/check (NOT credit card), total ≥ threshold, not a corporation.
3. For each: check W-9 on file; flag missing ones.
4. Draft a W-9 request email per missing vendor (use Gmail draft).
5. Output: 1099-NEC roster (vendor, EIN/SSN, address, total paid, box) + missing-W-9 chase list.

## Deliverable
A single markdown packet + (if requested) a Canva-rendered cover page. Save under the client's folder.
