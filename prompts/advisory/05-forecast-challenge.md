# Prompt 05 — Forecast Challenge

**When to use:** A client is about to commit big resources based on a forecast (new lease, hire, equipment purchase, expansion). Annual planning sign-off. Anytime you suspect the forecast is rosy and want a rigorous stress test before the owner makes the decision.

**Before you paste:** complete the anonymization checklist in `README.md`.

**Why this is one of the most valuable prompts in this library:** owners build forecasts when they're feeling good about the business. This prompt is the cold-water step that turns "I think we can do it" into "here's what I'd watch for if we're wrong."

---

## The prompt

```
You are a CPA advisor playing devil's advocate against {{CLIENT_NAME}}'s
current forecast for {{PERIOD}}. The owner believes this forecast. Your
job is not to talk them out of it — it's to make sure they know exactly
what to watch for if they're wrong.

Below is the forecast. Treat every assumption in it as a hypothesis,
not a fact.

Do this:

1. THE THREE MOST LIKELY WAYS THIS FORECAST IS WRONG
   Identify the three highest-probability failure modes. Be specific:
   not "revenue could be lower" but "the assumption that the
   {{LARGEST_CUSTOMER_OR_REVENUE_LINE}} contract renews at the same
   terms looks aggressive given [what the data or context suggests]."
   
   If the forecast appears too pessimistic, flag that too — failure can
   go both ways. An owner who under-forecasts and under-staffs misses
   revenue just as badly as one who over-forecasts and overspends.

2. FOR EACH FAILURE MODE, GIVE ME:
   a) The specific assumption that's at risk
   b) The EARLIEST WARNING SIGN that would tell us this scenario is
      materializing — something the owner can actually observe (a KPI,
      an email from a customer, a market signal). Not "revenue trending
      lower" — that's a lagging indicator. Give me something leading.
   c) WHEN that warning sign would show up (this week, this month, this
      quarter). The earlier we can spot it, the more time the owner has
      to adjust.
   d) THE FINANCIAL IMPACT if the scenario materializes — dollar range,
      not just "bad."

3. RANK BY SEVERITY × PROBABILITY
   Which failure mode would cause the biggest combined hit? That's the
   one the owner should be monitoring weekly. The other two are still
   worth tracking, but with less urgency.

4. THE QUESTION I'M NOT ASKING
   What's an assumption baked into this forecast that the owner
   probably hasn't questioned but should? One specific item. This is
   often the most valuable part of the analysis.

5. CIRCUIT BREAKERS
   For each of the three failure modes, define a specific trigger that
   says "stop and re-plan." Example: "If the booking pipeline drops
   below $X by date Y, cancel the Q3 hire." Owners need pre-committed
   triggers because by the time they're feeling the pain it's already
   too late.

Format:
- Three numbered scenarios, each with assumption, warning sign, timing, impact
- Severity ranking
- "The question I'm not asking"
- Circuit breakers list

Tone: rigorous but not alarmist. This is a stress test, not a doom
forecast. The goal is to build the owner a monitoring system, not to
make them stop investing in the business. End with one sentence that
acknowledges what looks SOLID in the forecast — owners need to hear what
they got right, not just what could go wrong.

---

[PASTE FORECAST HERE — full P&L forecast plus underlying assumptions.
Anonymized.]

CONTEXT (optional but useful):
[ANYTHING THE OWNER SAID THAT INFORMED THE FORECAST — "We're confident
in the renewal" or "the new product launches in May." This is what lets
Claude tell you which assumptions to stress.]

WHAT'S ALREADY FIXED:
[OBLIGATIONS THAT CAN'T BE UNDONE — signed leases, contracted hires,
committed equipment purchases. Stress-testing those is pointless; tell
Claude to ignore them.]
```

---

## Tips for getting the best output

- **Run this BEFORE the owner commits.** A devil's-advocate review after the lease is signed is therapy. Before is decision support.
- **The context section matters more here than in any other prompt.** Claude can only stress-test assumptions if it knows what assumptions exist. "Revenue: $1.2M" tells Claude nothing; "Revenue: $1.2M assuming the Q3 contract renews and the new product launches on time" tells it everything.
- **Use this on YOUR OWN forecasts too.** When the owner is you (the firm), the same stress test applies. Run it on Selam CPA's forecast at least quarterly.
- **The "question I'm not asking" output is often the highest-value finding.** Tag it for the next client meeting agenda.
