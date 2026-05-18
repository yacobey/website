# CPA Firm Ops — Claude Skills

A standalone Claude Code project for running a CPA firm's daily operations. Skills live in `.claude/skills/` and are auto-discovered when you start a Claude Code session in this directory.

## Skills installed

### Finance & Accounting (10)
- `/tax-prep` — Quarterly estimated tax or 1099 packet
- `/cash-flow-snapshot` — 30/60/90-day cash forecast
- `/plan-payroll` — Pre-payroll cash check + AR chase if tight
- `/month-heads-up` — 25th-of-month forward look
- `/tax-season-organizer` — 1099-NEC roster with W-9 flags
- `/invoice-chase` — Tone-graded overdue reminders
- `/month-end-prep` — QBO vs payment-processor reconciliation
- `/margin-analyzer` — Unit economics by product/service
- `/close-month` — Full month-end close packet
- `/price-check` — Pricing scenarios with margin impact

### Briefings (3)
- `/monday-brief` — Cash, sales, pipeline, to-dos
- `/friday-brief` — Revenue, wins, watches
- `/business-pulse` — Snapshot across QBO, HubSpot, Gmail, Canva

### Setup, Hiring & Legal (5)
- `/smb-onboard` — 2-week new-client onboarding
- `/job-post-builder` — Post + interview kit + comp envelope
- `/review-contract` — Deep contract review with redline DOCX
- `/contract-review` — Quick flags on NDAs, MSAs, vendor agreements
- `/smb-router` — Picks the right skill based on what you need

## Required MCP connections
These skills assume the following MCP servers are connected in your Claude Code session:
- **QuickBooks Online** — for all financial / accounting skills
- **HubSpot** — for pipeline and CRM skills
- **Gmail** — for drafting client communications
- **Canva** (optional) — for designed deliverables

## Usage
Open this directory in Claude Code:
```
cd ~/cpa-firm-ops
claude
```
Then invoke a skill, e.g. "Run monday-brief for Acme Inc."

When you're not sure which skill to use, just describe the task and `/smb-router` will pick one.

## Customization
- Each skill is a single `SKILL.md` in `.claude/skills/<name>/` — edit freely.
- Add new skills by creating new folders with a `SKILL.md` containing YAML frontmatter (`name`, `description`).
