---
name: contract-review
description: Quick-flag review of standard contracts — NDAs, MSAs, vendor agreements. Use when user shares one of these and asks for a quick read. For full redline use /review-contract instead.
---

# Contract Review (Quick Flags)

Faster, lighter-weight than `/review-contract`. Built for the common cases: NDA, MSA, vendor SOW.

When the user needs a redline DOCX or has a non-standard contract, route to `/review-contract`.

## Inputs to confirm
- Contract type: NDA / MSA / Vendor agreement / Other
- Our role: receiving party (NDA) / customer (MSA, vendor)
- Counterparty (just to know who drafted it)

## Steps — NDA
Check the standard list:
- Mutual or one-way? (mutual usually fairer)
- Definition of "confidential information" — too broad?
- Term length (3-5 years standard for general NDAs)
- Carve-outs: publicly known, independently developed, legally required disclosure
- Return/destroy obligation at termination
- Governing law / venue

## Steps — MSA
- Term and termination (for cause vs convenience, notice period)
- Payment terms (Net X, late fees)
- Liability cap (1x annual fees is reasonable; higher is concerning)
- Indemnification (mutual? scope?)
- IP ownership and license grants
- Auto-renewal trap (silent rollover?)
- Dispute resolution (court vs arbitration, venue)

## Steps — Vendor
- Scope of work clarity
- Acceptance criteria & sign-off process
- Change order process
- Performance guarantees / SLA
- Right to terminate for non-performance

## Output
- Per-clause flag table (🟢 / 🟡 / 🔴)
- Top 3 things to push back on
- Top 3 things that look fine
- One-line: sign as-is / negotiate / push to `/review-contract` for deep review
