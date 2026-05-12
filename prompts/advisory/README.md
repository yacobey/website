# Advisory Prompt Library

Five reusable Claude prompts for CPA advisory work. Each is CPA-flavored (small business owner audience, not corporate FP&A), with placeholder slots and a "what the data isn't telling us" lens that distinguishes a CPA advisor from a financial analyst.

---

## Before you use any of these — ANONYMIZATION CHECKLIST

Per `CLAUDE.md` section 4, you must not paste real client identifiers into a prompt. Run this 30-second check every single time:

- [ ] Replaced real client name with `Client A`, `the design agency`, or similar
- [ ] Removed EIN, SSN, full account numbers, bank routing numbers
- [ ] Removed personal addresses and personal email addresses
- [ ] Removed names of specific employees, contractors, or customers of the client
- [ ] If the client is identifiable from the industry + region + revenue band (e.g., "the only Eritrean restaurant in Silver Spring doing $400K"), generalize the description
- [ ] If you're using ChatGPT or another tool that retains training data, redact more aggressively

When in doubt: anonymize. A slightly less-specific prompt with no PII is always better than a perfect prompt with leaked client info.

---

## How to use

1. Pick the prompt that fits the task.
2. Fill the placeholders (`{{CLIENT_NAME}}`, `{{INDUSTRY}}`, `{{PERIOD}}`).
3. Paste the relevant anonymized data where the prompt says `[PASTE … HERE]`.
4. Send to Claude.
5. Review for accuracy before sending anything client-facing. These prompts are draft generators, not final deliverables. Per `CLAUDE.md`: nothing leaves your desk without your CPA sign-off.

---

## The prompts

| File | When to use |
|---|---|
| `01-variance-analysis.md` | Quarterly variance commentary, budget vs. actuals reviews |
| `02-scenario-modeling.md` | Forward planning, "what if" conversations, FP&A advisory |
| `03-client-narrative.md` | Monthly/quarterly client report narrative section |
| `04-cost-driver-analysis.md` | Margin compression diagnostics, year-over-year deep dives |
| `05-forecast-challenge.md` | Stress-testing a client's plan before they commit big resources |

---

## What these are NOT

- Not a substitute for a real Excel model. For >20-variable scenario work, build the model in Sheets and use Claude to narrate.
- Not legal or tax advice. The prompts produce business commentary, not technical tax positions.
- Not auto-publish. Every output is a draft you review and edit before sending to a client.

---

## Source

These are CPA-flavored adaptations of the FP&A prompts shared by Ella K. on LinkedIn (FP&A — Financial Planning & Analysis newsletter). The original framework — "give Claude a role, a format, and a defined job" — is sound. The CPA-flavored differences:

- Audience is a small business owner, not a corporate board
- Each prompt forces Claude to flag what the data ISN'T showing (concentration risk, key-person risk, seasonality assumptions) — that's the CPA advisor lens
- Every output is anchored back to a specific question or action for the client, not just analysis
