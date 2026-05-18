---
name: tax-season-organizer
description: Build a 1099-NEC contractor list with W-9 status flags and draft chase emails for missing forms. Use during tax season (Jan) or when the user says "1099 organizer", "W-9 check", or "1099 prep".
---

# Tax Season Organizer

Annual 1099-NEC prep: who needs a 1099, do we have their W-9, and what's missing.

## Inputs to confirm
- Client / QBO realm
- Tax year (default: prior calendar year)
- Threshold (default: $600 IRS minimum)

## Steps
1. Pull vendor payment list for the year via QBO.
2. Filter to 1099-eligible:
   - Paid via cash, check, ACH, or wire (NOT credit card — those go on 1099-K)
   - Total payments ≥ threshold
   - Not a registered corporation (per W-9)
3. For each eligible vendor, check W-9 status:
   - W-9 on file? ✅
   - Missing or expired (>3 years)? ❌
   - No W-9 ever requested? 🚨
4. For every ❌ and 🚨, draft a personalized W-9 request email via Gmail draft (`create_draft`).
5. Build the deliverable.

## Output
- Roster table: Vendor | EIN/SSN | Address | Total Paid | W-9 Status | Box (NEC vs MISC)
- Missing-W-9 summary count
- Suggested filing deadline reminders (1/31 to recipient, 1/31 IRS for NEC)
- Drafted emails saved to Gmail drafts
