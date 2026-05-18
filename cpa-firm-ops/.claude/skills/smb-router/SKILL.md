---
name: smb-router
description: Meta-skill that picks the right SMB ops skill based on what the user is trying to do. Use when the user describes a problem or task and isn't sure which skill applies, or says "what should I run", "help me figure out", or "I need to...".
---

# SMB Router

The "I don't know which skill I need" skill. Listens to the request, asks one or two clarifying questions if needed, then routes to the right skill.

## How it works
1. Listen to what the user said.
2. Match to the right skill below.
3. If two skills could apply, ask one clarifying question.
4. Invoke the chosen skill (don't just suggest — actually run it).

## Routing map

| User says... | Run this skill |
|---|---|
| "How's cash looking?" / "Can we afford X?" | `/cash-flow-snapshot` |
| "Can we make payroll?" | `/plan-payroll` |
| "It's the 25th, what's coming?" | `/month-heads-up` |
| "Close the books" / "month-end" | `/close-month` |
| "Reconcile Stripe / Square / QB" | `/month-end-prep` |
| "Chase invoices" / "AR follow-ups" | `/invoice-chase` |
| "Quarterly taxes" / "estimated payments" | `/tax-prep` |
| "1099s" / "W-9 check" | `/tax-season-organizer` |
| "Which products make money?" | `/margin-analyzer` |
| "Should I raise prices?" | `/price-check` |
| "Monday morning brief" | `/monday-brief` |
| "Friday wrap-up" | `/friday-brief` |
| "Show me everything" | `/business-pulse` |
| "Review this contract" (deep) | `/review-contract` |
| "Quick read on this NDA/MSA" | `/contract-review` |
| "New client onboarding" | `/smb-onboard` |
| "Hire a [role]" / "job post" | `/job-post-builder` |

## When nothing matches
- Ask: "What outcome do you want?"
- Common outcomes that don't map cleanly: budgeting, fundraising prep, valuation, audit prep, vendor evaluation. Surface them as "we don't have a dedicated skill for this yet — want me to handle it directly?"
