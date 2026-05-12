# Deductible Expense Tracker — Google Sheet Spec

A pre-categorized expense tracker built for 1099 earners. Most freelancers either don't track expenses at all or lump everything into "Misc." This tracker forces them into IRS-friendly categories with running deduction totals.

## Build this in Google Sheets

Create a new Google Sheet, name it **`Deductible Expense Tracker — Selam CPA`**. One main tab plus a summary tab.

---

### Tab 1: "Expenses"

Columns:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Date | Vendor / Description | Category (dropdown) | Amount | Payment Method | Business Use % | Deductible Amount |

**Column C dropdown (Data Validation):** pick from this exact list. These are the Schedule C lines most relevant to freelancers — names match line numbers so the customer can map directly to their return.

- Advertising (Line 8)
- Car & Truck Expenses (Line 9) — *use mileage log instead, not this column*
- Commissions & Fees (Line 10)
- Contract Labor (Line 11)
- Insurance — non-health (Line 15)
- Interest — business (Line 16b)
- Legal & Professional Services (Line 17)
- Office Expense (Line 18)
- Rent or Lease — Other Business Property (Line 20b)
- Repairs & Maintenance (Line 21)
- Supplies (Line 22)
- Taxes & Licenses (Line 23)
- Travel (Line 24a)
- Meals (Line 24b) — *50% deductible*
- Utilities (Line 25)
- Wages (Line 26)
- Software & Subscriptions (Other Expenses, Line 27a)
- Phone & Internet (Other Expenses, Line 27a)
- Continuing Education (Other Expenses, Line 27a)
- Bank Fees (Other Expenses, Line 27a)
- Health Insurance (Schedule 1, Line 17 — not Schedule C)
- Home Office (Form 8829 — separate calc)
- Retirement Contributions (Schedule 1, Line 16 — not Schedule C)

**Column G formula:** `=D2*F2`

For the **Meals** category specifically, deductible amount should be 50%. Use a slightly more complex formula:
```
=IF(C2="Meals (Line 24b) — *50% deductible*", D2*F2*0.5, D2*F2)
```

**Column F default:** 100% (most freelancer expenses are fully business). Customer adjusts per row if a purchase is mixed-use (e.g., a phone bill they use partly for personal).

---

### Tab 2: "Year-End Summary"

Pivots / totals for filing.

| A | B |
|---|---|
| Category | Total Deductible Amount |

One row per category from the dropdown list. Formula for each total:
```
=SUMIF('Expenses'!C:C, A2, 'Expenses'!G:G)
```

At the bottom: **Total Deductions: `=SUM(B2:B25)`** (or however many categories).

Below the total, add three guidance rows:

> **What to do at year-end:**
> 1. Open this tab.
> 2. Match each category to the corresponding Schedule C line number on your tax return.
> 3. Health Insurance, Home Office, and Retirement Contributions go on Schedule 1 or Form 8829, not Schedule C — flagged in the category names.
> 4. If your total deductions are over $25,000 or you have unusual items, get a CPA review before filing.

---

### Tab 3: "Receipts to Keep"

Plain-English reference for what records the IRS expects, by category. The customer doesn't have to print this; it's a sanity check.

| Category | What to keep |
|---|---|
| Meals | Date, place, business purpose, attendees, amount, receipt |
| Travel | Itinerary, receipts for lodging/flight/transport, business purpose |
| Office Expense | Receipt |
| Software & Subscriptions | Monthly emailed invoices or statements |
| Phone & Internet | Monthly bills + note on business-use percentage |
| Health Insurance | Annual 1095-B / 1095-C and proof of payment |
| Contract Labor | 1099-NEC issued + payment record (Bill, Zelle, check) |
| Continuing Education | Receipts + course documentation |

---

### Tab 4: "Start Here"

Same pattern as the calculator's Start Here tab. Title, 3-step instructions, accuracy disclaimer, Yacob signature block.

---

## Build checklist

- [ ] Created Google Sheet "Deductible Expense Tracker — Selam CPA"
- [ ] Tab 1: Expenses with all 4 columns + Category dropdown + formula in G
- [ ] Tab 2: Year-End Summary with SUMIF per category + total row
- [ ] Tab 3: Receipts to Keep populated
- [ ] Tab 4: Start Here
- [ ] Tested by entering 5 sample expenses across 3 categories, verified summary totals
- [ ] Share setting: Anyone with link → Viewer
- [ ] `/copy` link saved into `customer-delivery-email.md`
