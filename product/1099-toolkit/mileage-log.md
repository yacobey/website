# IRS-Compliant Mileage Log — Google Sheet Spec

The IRS audits mileage deductions aggressively because most freelancers can't produce contemporaneous records. This sheet forces a contemporaneous-style entry every trip and computes the deduction at the current standard mileage rate.

## Build this in Google Sheets

Create a new Google Sheet, name it **`Mileage Log — Selam CPA`**.

---

### Tab 1: "Trip Log"

Columns:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Date | Start Location | End Location | Business Purpose | Total Miles | Personal Miles | Business Miles (E − F) | Deduction at Rate |

**Column G formula:** `=E2-F2`

**Column H formula:** `=G2*'Rate'!$B$2`

The rate lives in a separate tab so the customer updates it once per year (IRS publishes the standard mileage rate annually).

---

### Tab 2: "Rate"

| A | B |
|---|---|
| Standard Mileage Rate (per mile) | 0.67 |

That's the 2025 business rate; verify the current year's rate at IRS.gov when you build this. Add a comment in cell B2: **"IRS publishes this each fall for the following year. Verify before tax season."**

---

### Tab 3: "Year-End Summary"

| A | B |
|---|---|
| Total business miles (year) | `=SUM('Trip Log'!G:G)` |
| Total mileage deduction (year) | `=SUM('Trip Log'!H:H)` |
| Trips logged | `=COUNTA('Trip Log'!A:A)-1` |

Below those rows, add:

> **What to put on your return:**
> - Schedule C, Line 9 (Car and Truck Expenses) = Total mileage deduction above.
> - Schedule C, Part IV (Information on Your Vehicle) requires: total business miles, total commuting miles (none here — commuting isn't deductible), total personal miles.
> - Keep this log for at least 4 years after filing.

---

### Tab 4: "What Counts as a Business Trip"

Plain-English IRS guidance for freelancers. One column.

> **Deductible (business miles):**
> - Driving to a client's office for a meeting
> - Driving to a co-working space when you don't have a regular workplace
> - Driving to a job site or shoot location
> - Driving between two job sites in the same day
> - Driving to the bank to deposit business funds, or to a supplier to pick up materials
> - Driving to a business networking event with a clear business purpose
>
> **Not deductible (personal miles):**
> - Commuting from home to a regular workplace
> - Running personal errands (even if it's "on the way")
> - Driving to lunch by yourself
> - Driving to a non-business event
>
> **Gray area — log it, but ask a CPA before deducting:**
> - Mixed personal/business trips (e.g., drove to a client meeting and then to the grocery store on the way back — only the client portion counts)
> - Driving to continuing education or networking that's only loosely related to your business

---

### Tab 5: "Start Here"

Same pattern. 3-step instructions, accuracy disclaimer, Yacob signature.

---

## Build checklist

- [ ] Created Google Sheet "Mileage Log — Selam CPA"
- [ ] Tab 1: Trip Log with formulas in G and H
- [ ] Tab 2: Rate — verified current IRS rate
- [ ] Tab 3: Year-End Summary
- [ ] Tab 4: What Counts as a Business Trip
- [ ] Tab 5: Start Here
- [ ] Tested 3 sample trips, confirmed deduction calculates
- [ ] Share setting: Anyone with link → Viewer
- [ ] `/copy` link saved into `customer-delivery-email.md`
