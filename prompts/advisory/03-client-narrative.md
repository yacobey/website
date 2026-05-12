# Prompt 03 — Client Narrative

**When to use:** The narrative section of a monthly or quarterly client report. The story that goes on top of the P&L, cash flow, and balance sheet pages.

**Before you paste:** complete the anonymization checklist in `README.md`.

**Why this prompt is tuned to your CPA practice:** the original FP&A version targeted a corporate board. Your audience is a small business owner who wants the story over coffee, not a 40-slide deck. Same structure, different voice.

---

## The prompt

```
You are a CPA advisor writing the {{PERIOD}} narrative section of the
monthly client report for {{CLIENT_NAME}}, a {{INDUSTRY}} business. The
owner is smart but not a finance person — they want the story, not the
spreadsheet.

Write a three-paragraph narrative.

PARAGRAPH 1 — THE HEADLINE
Lead with the single most important number this period and what it means
for the business. Two sentences max. First sentence states the number.
Second sentence states why it matters in operational terms (not "this
represents a 12% YoY increase" but "this is the highest month since you
opened the second location").

PARAGRAPH 2 — WHAT DROVE IT
Explain the 2–3 underlying drivers in plain language. Connect numbers to
operational reality wherever possible — a new client win, a pricing
change, a one-time expense, a seasonal pattern. If a driver is just a
spreadsheet anomaly (timing, reclassification), say so.

PARAGRAPH 3 — NEXT 90 DAYS
What this means for the next quarter. What to watch. What decisions are
coming up. Be specific — not "we should monitor expenses" but "if labor
cost stays above 38% of revenue through October, we'll want to look at
the schedule for the holiday season."

After the three paragraphs, include:

- A "what I'd ask the team about" section: 2–3 specific questions you'd
  raise with the owner or their staff if you had 15 minutes with them
  next week. These often become billable advisory work.

- A "what the numbers don't show" section: 2–4 bullets covering items a
  CPA advisor should be tracking that aren't in the report — customer
  concentration, key-person dependency, deferred maintenance, vendor
  exposures, etc.

Tone: seasoned CPA talking to a business owner over coffee. Confident but
not arrogant. Plain English. Avoid consultant-speak entirely — no
"synergies," "leveraging opportunities," "going forward," or "at the end
of the day." Write like the trusted advisor the owner has known for years.

End with this sign-off, exactly as written:

Yacob Tewelde, CPA, FCCA
Selamcpa.com
301-640-8549
info@selamcpa.com

---

[PASTE QUARTERLY FINANCIALS HERE — P&L, cash flow summary, balance
sheet snapshot. Anonymized.]

CONTEXT THE NUMBERS DON'T SHOW (optional but recommended):
[ANYTHING THE OWNER MENTIONED IN PASSING — a new hire, a customer they
lost, a piece of equipment that broke. Anonymize names. This is what
turns the narrative from generic to specific.]
```

---

## Tips for getting the best output

- **The context section is what makes this prompt sing.** Without context, Claude writes a competent but generic narrative. With "the owner mentioned in September she's considering raising prices in January," the narrative becomes a tailored advisory document.
- **Always include cash flow and balance sheet, not just P&L.** A business can look profitable and be running out of cash. The narrative needs to see all three statements.
- **Don't paste numbers without period labels.** "Revenue: 145,000" tells Claude nothing. "September 2026 revenue: 145,000 vs. September 2025 revenue: 132,000" gives it something to work with.
- **Review before sending.** Per `CLAUDE.md` — every client deliverable gets your CPA sign-off. Watch especially for any specific operational claim Claude makes that didn't come from your context section; it may have inferred something incorrect.
