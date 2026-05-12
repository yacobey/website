# Quarterly Estimated Tax Calculator — Google Sheet Spec

The single highest-value asset in this toolkit. A freelancer types in their monthly 1099 income; the sheet tells them exactly how much to pay the IRS and their state each quarter, plus shows whether they're on track for safe harbor.

## Build this in Google Sheets

Create a new Google Sheet, name it **`Quarterly Estimated Tax Calculator — Selam CPA`**. Build the following tabs.

---

### Tab 1: "Start Here"

A landing tab so the customer isn't dropped into a wall of formulas.

| Cell | Content |
|---|---|
| A1 | **The Quarterly Estimated Tax Calculator** (large heading, bold) |
| A3 | Welcome. This calculator tells you what to pay the IRS and your state each quarter, so you stop guessing. |
| A5 | **How to use it:** |
| A6 | 1. Fill in your basic info on the "Your Info" tab. |
| A7 | 2. Enter your 1099 income each month on the "Income & Expenses" tab. |
| A8 | 3. Open the "Quarterly Summary" tab to see exactly what to pay and when. |
| A10 | **Important:** This calculator gives a strong estimate. It is not a tax return. For your actual filing, work with a CPA — your situation may include items this sheet doesn't capture (credits, dependents, multi-state income, etc.). |
| A12 | Built by **Yacob Tewelde, CPA, FCCA** — Selamcpa.com — 301-640-8549 |

---

### Tab 2: "Your Info"

Inputs that drive the whole calculation.

| Cell | Label | Input | Notes |
|---|---|---|---|
| A1 | **Your Info** (heading) | | |
| A3 | Filing status | Dropdown: Single / Married Filing Jointly / Married Filing Separately / Head of Household | Cell B3 |
| A4 | State of residence | Dropdown: all 50 states + DC | Cell B4 |
| A5 | Tax year | Number (default current year) | Cell B5 |
| A6 | Last year's total tax liability (from prior year Form 1040 line 24) | Currency | Cell B6 — used for safe-harbor calc |
| A7 | Last year's AGI | Currency | Cell B7 — used for safe-harbor calc |
| A8 | Spouse's W-2 federal withholding YTD (if MFJ) | Currency | Cell B8 — reduces estimated payment need |
| A9 | Self-employment net income target for this year | Currency | Cell B9 |
| A10 | Estimated qualified business deductions YTD | Currency | Cell B10 — flows through to net SE income |

---

### Tab 3: "Income & Expenses"

Monthly tracking. 12 rows.

Columns:
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Month | Gross 1099 Income | Business Expenses | Net Income (B–C) | Cumulative Net Income | Cumulative SE Tax (15.3% × 92.35% of D running total) |

Row 1 = headers. Rows 2–13 = Jan through Dec.

**Formulas:**
- **D2** (Net Income for Jan): `=B2-C2`
- **E2** (Cumulative Net): `=D2`
- **E3 through E13**: `=E2+D3`, etc.
- **F2** (Cumulative SE Tax): `=E2*0.9235*0.153`
- **F3 through F13**: same pattern referencing E

---

### Tab 4: "Quarterly Summary" — THE MONEY TAB

The customer mostly lives here. Four quarter blocks.

For each quarter, show:

```
Q1 — Due April 15, [tax year]
  Income earned Jan–Mar:         $XX,XXX
  Estimated federal tax owed:    $XX,XXX
  Estimated state tax owed:      $XX,XXX
  Safe-harbor floor:             $XX,XXX
  PAY THIS QUARTER:              $XX,XXX   ← largest of above

Q2 — Due June 15
  Income earned Apr–May:         $XX,XXX
  Estimated federal:             $XX,XXX
  Estimated state:               $XX,XXX
  PAY THIS QUARTER:              $XX,XXX

Q3 — Due September 15
  Income earned Jun–Aug:         $XX,XXX
  Estimated federal:             $XX,XXX
  Estimated state:               $XX,XXX
  PAY THIS QUARTER:              $XX,XXX

Q4 — Due January 15, [tax year + 1]
  Income earned Sep–Dec:         $XX,XXX
  Estimated federal:             $XX,XXX
  Estimated state:               $XX,XXX
  PAY THIS QUARTER:              $XX,XXX
```

**Federal estimate formula per quarter** (simplified — for v1, use marginal brackets via the IRS Tax Brackets tab below):

For Q1 federal estimate at cell, say, C6:
```
=ROUND(VLOOKUP('Income & Expenses'!E4, 'Tax Brackets'!$A:$D, 4, TRUE)*0.25, 0)
```

(The actual implementation uses a marginal-rate lookup against the Tax Brackets tab. Detail in next tab.)

**State estimate formula**: cleanest v1 approach is a flat state effective rate per state. Build a 'State Rates' tab with two columns (State, Effective Rate). VLOOKUP from `Your Info` tab cell B4 → multiply by net quarterly income.

**Safe harbor formula** per quarter:
- If prior-year AGI ≤ $150K: pay 25% of (prior year total tax × 100%)
- If prior-year AGI > $150K: pay 25% of (prior year total tax × 110%)
- Formula in cell:
```
=IF('Your Info'!B7<=150000, 'Your Info'!B6*1.0/4, 'Your Info'!B6*1.1/4)
```

**PAY THIS QUARTER** = `MAX(federal_estimate + state_estimate, safe_harbor_floor)` minus any spouse W-2 withholding allocated.

---

### Tab 5: "Tax Brackets" (data)

Federal marginal brackets for the current tax year. Build this for the most-current year published by the IRS.

| Lower Bound | Upper Bound | Marginal Rate | Cumulative Tax at Lower Bound |
|---|---|---|---|

Use a separate sub-table per filing status. Or pick one and explain in the README that v1 supports Single + MFJ only; expansion later.

**Where to get current numbers:** IRS Revenue Procedure published each fall for the next year. Always verify against IRS.gov before locking the sheet for the year. Update annually.

---

### Tab 6: "State Rates" (data)

Two columns:
| State | Effective Rate |

Use an effective rate that approximates state income tax on a freelancer at median freelancer income. **Document the assumption** in row 1: "These rates are simplified effective rates for estimating purposes. Your actual state tax depends on your specific income, deductions, and credits."

States with no income tax (FL, TX, WA, NV, SD, WY, AK, NH, TN): rate = 0.

---

### Tab 7: "About This Calculator"

Plain-English disclaimers:

- This calculator is for estimation only. It is not a substitute for filing a tax return.
- Tax law changes annually. Verify brackets and rates each year.
- This calculator does not account for: child tax credits, retirement contributions, HSA deductions, multi-state allocations, prior-year overpayments applied forward, or itemized deductions beyond the standard.
- For a personal review or actual filing, contact Yacob Tewelde, CPA, FCCA — info@selamcpa.com — 301-640-8549.

---

## Build checklist

- [ ] Created Google Sheet "Quarterly Estimated Tax Calculator — Selam CPA"
- [ ] Tab 1: Start Here populated
- [ ] Tab 2: Your Info with dropdowns and validation
- [ ] Tab 3: Income & Expenses with formulas D, E, F
- [ ] Tab 4: Quarterly Summary with federal + state + safe-harbor + max formulas
- [ ] Tab 5: Tax Brackets populated with current-year IRS data
- [ ] Tab 6: State Rates populated
- [ ] Tab 7: About + disclaimers
- [ ] Tested with sample freelancer at $80K net income, verified Q1 estimate is in a sane range
- [ ] Share setting: Anyone with link → Viewer
- [ ] Generated `/copy` link → saved into `customer-delivery-email.md`
