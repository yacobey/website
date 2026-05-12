# Prompt 02 — Scenario Modeling

**When to use:** Forward planning conversations. Client is making a big decision (hire, lease, acquisition, expansion) and wants to see ranges. Annual planning. "What if" sessions.

**Before you paste:** complete the anonymization checklist in `README.md`.

**Limit:** For models with more than ~20 variables, build the math in Google Sheets and use prompt 03 to write the narrative around the numbers. Claude is excellent at scenario narratives; it's not a spreadsheet engine.

---

## The prompt

```
You are a CPA advisor building three scenarios for {{CLIENT_NAME}}, a
{{INDUSTRY}} small business, covering {{PERIOD}}.

The owner's working assumptions are below. Treat these as the starting
point, not the answer — your job is to show what could happen, not just
restate what they said.

Build three scenarios:
- BASE   (most likely path)
- UPSIDE (realistic favorable case — not best-case-ever)
- DOWNSIDE (realistic adverse case — not worst-case-ever)

For each scenario, produce:

1. A row of summary metrics: revenue, gross margin %, operating income,
   ending cash position.

2. The SINGLE variable that makes or breaks the outcome. Be specific —
   not "revenue" but "whether {{LARGEST_CUSTOMER_OR_REVENUE_LINE}}
   renews in Q3." If the make-or-break variable is the same across
   scenarios, say so — that tells the owner exactly where to focus.

3. ONE specific KPI the owner should monitor weekly that would tell us
   early which scenario is materializing. Make it something they can
   actually pull from their existing systems (QuickBooks, their CRM,
   their booking app) — not something that requires building a new
   report.

4. The "tell" — what changes in the business this week or this month
   would push us toward this scenario? One sentence each.

After the three scenarios, add:

- A "common cross-cutting risks" section: things that show up in all
  three scenarios (e.g., a vendor renegotiation, a key-person dependency).
- A "decisions the owner can make today" section: 2–4 specific actions
  that improve the upside or reduce downside exposure, regardless of
  which scenario plays out.

Format:
- 3-column scenario table
- Make-or-break variables in a short callout
- Weekly KPI list (one per scenario)
- Cross-cutting risks
- Decisions for today

Tone: practical, focused on decisions the owner can actually make. No
"directionally correct" hedging — commit to numbers. If the model can't
support a specific number, say "we'd need to know X before we can size
this," not "it depends."

---

ASSUMPTIONS:
[PASTE THE OWNER'S ASSUMPTION LIST HERE — anonymized]

CONSTRAINTS (anything fixed that scenarios shouldn't move):
[PASTE FIXED CONSTRAINTS — e.g., lease ends Sept, loan covenant requires X coverage ratio]

CURRENT BASELINE (TTM or YTD):
[PASTE BASELINE NUMBERS — anonymized]
```

---

## Tips for getting the best output

- **Always give Claude a baseline.** A scenario without an anchor is a guess. Trailing-twelve-months actuals as the baseline give Claude something real to scale from.
- **Tell Claude what's fixed.** Lease obligations, debt service, owner draw — anything that doesn't bend in any scenario. Otherwise Claude will let those numbers float and the scenarios won't be useful.
- **For multi-product businesses, run the prompt per product line** if revenue mix is the main driver. Three scenarios on one P&L hides the real story when 80% of variance comes from one product.
