---
name: invoice-chase
description: Generate tone-matched overdue invoice reminders for a client's AR aging. Use when the user says "chase invoices", "AR reminders", "overdue follow-ups", or "collections email".
---

# Invoice Chase

Tone-graded reminders for overdue receivables — friendly at 7 days, firm at 60+.

## Inputs to confirm
- Client / QBO realm
- Relationship tone default (warm / neutral / firm)
- Send drafts only, or send live? (default: drafts)

## Steps
1. Pull AR aging via `qbo_accounting_get_ar_aging_detail`.
2. Bucket invoices:
   - 1–30 days late → **friendly nudge** ("just a quick check-in")
   - 31–60 days late → **firm reminder** (clear ask, mention terms)
   - 61–90 days late → **formal demand** (cite terms, mention late fee policy, copy AP contact)
   - 90+ days late → **escalation** (path to collections, payment plan offer)
3. For each invoice, draft an email using customer's primary contact. Include:
   - Invoice #, amount, original due date, days outstanding
   - Direct pay link if available (`qbo_sales_create_payment_link`)
   - Their PO number if on file
4. Group by customer when multiple invoices to one party.
5. Save as Gmail drafts.

## Output
- Bucket summary: count + total $ per tier
- List of drafted emails with recipient + subject + preview
- Three "high-priority calls" — invoices where email alone won't cut it
