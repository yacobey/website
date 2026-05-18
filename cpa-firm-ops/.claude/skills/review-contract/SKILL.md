---
name: review-contract
description: Plain-English review of a contract plus a redline DOCX with suggested edits. Use when user says "review this contract", "redline this", or shares a contract file for review.
---

# Review Contract

A two-output review: plain-language summary for the owner, plus a redline they can send back to counterparty.

## Inputs to confirm
- Contract file (PDF or DOCX path or attachment)
- Role: are we the buyer/customer or seller/vendor?
- Deal context (size, length, importance)
- Any non-negotiables for this client?

## Steps
1. Read the contract end-to-end.
2. Identify **business terms**:
   - Price, payment terms, term length, renewal, termination
   - SLA / deliverables
   - Liability cap, indemnification scope
   - IP ownership, license grants
   - Confidentiality scope and duration
   - Non-compete / non-solicit if any
   - Governing law & dispute resolution
3. Flag **standard concerns** based on role.
4. Score each clause: 🟢 fine / 🟡 negotiate / 🔴 reject.
5. Build the plain-English summary (1 page max, no legalese).
6. Build the redline DOCX with proposed changes and rationale per change.

## Output
- Plain-English summary doc (markdown)
- Redline DOCX with tracked changes
- "Walk-away terms" list — what would make us decline this deal
- Suggested email to counterparty introducing the redline
