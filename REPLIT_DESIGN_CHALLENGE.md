# Replit Design $50 Challenge — Concept Brief

## The challenge, decoded

- Build something with Replit Design (replit.com/design), post it on socials, submit the
  link with code `REPLITDESIGN50`.
- **Winners are picked randomly** from submissions — so the smart play is NOT to
  over-invest. Spend a fraction of $50 in credits, and put the ambition into a design
  that Replit's team *wants* to amplify on socials. Amplification is the real prize.
- Replit Design's pitch: describe your vision in natural language → complete designs
  with responsive layouts, working functionality, professional aesthetics. It showcases
  "premium aesthetics without being a designer." A submission that proves that promise
  in one screenshot is exactly what they'll reshare.

## Winning concept (recommended): **Paycheck X-Ray**

**One sentence:** Type your salary — watch, in real time, exactly where every dollar
goes.

**The pain (universal, zero explanation needed):** Everyone with a job has stared at a
paystub and thought "where did it all go?" No onboarding, no copy needed — one input
field IS the explanation. The moment the ribbons split, the viewer feels it in their gut:
*that's my money.*

**Why it wins on every criterion:**

| Criterion | How it delivers |
|---|---|
| Immediate connection | It's about the viewer's own paycheck — the most personal number they know |
| No explanation needed | One input ("Your annual salary") → animated picture. 3-second comprehension |
| Premium brand quality | Editorial finance aesthetic (below) — looks like Bloomberg × Stripe, not a "calculator" |
| Real-life pain | Paystub confusion, tax shock, "why is my take-home so low" |
| Cheap to build | One page, zero backend, zero auth, client-side math only |
| Bonus | Afterwards it embeds on selamcpa.com as a lead magnet — real business value beyond the challenge |

**The experience:**
1. Near-black screen. One serif headline: **"Where does your paycheck actually go?"**
   One large input beneath it.
2. As the user types a salary, animated ribbons (Sankey-style flow) split the total
   into: **Take-home · Federal tax · Social Security · Medicare · State (estimate)** —
   with spring easing, live-counting numerals.
3. One gut-punch line beneath the flow, updating live:
   *"That's **11 hours of every week** you work for the government."*
4. Toggle: Annual / Monthly / Per-paycheck. Small disclaimer: estimates, 2025 federal
   rates, single filer, standard deduction, flat state estimate.
5. Footer: "Built with Replit Design · Selam CPA".

**Design system (the "professional designer" layer):**
- **Canvas:** near-black navy ink `#0A0F1E` (matches the existing Ask Selam brand),
  subtle film grain, generous whitespace.
- **Accent:** single emerald `#10B981` for the take-home ribbon only — everything
  taken *from* the paycheck renders in muted desaturated tones, so the eye instantly
  reads "green = what you keep."
- **Type:** high-contrast editorial serif for the headline (Fraunces or Playfair
  Display), tabular monospace for all numerals (IBM Plex Mono / JetBrains Mono) so
  digits tick without layout shift.
- **Motion:** one hero animation only (the ribbon split) — restraint is what reads
  as premium. 400ms spring, numbers count up over 600ms.
- **Layout:** single column, max-width 720px, everything above the fold on desktop
  and mobile.

## Ready-to-paste Replit Design master prompt

> Design a single-page interactive experience called "Paycheck X-Ray". Dark editorial
> finance aesthetic: near-black navy background (#0A0F1E) with subtle film grain,
> generous whitespace, single-column layout max 720px wide, everything above the fold.
> Typography: large high-contrast serif display headline (Fraunces style) reading
> "Where does your paycheck actually go?", all numbers in tabular monospace so digits
> tick without layout shift. One large elegant input: "Your annual salary". As the user
> types, animate a Sankey-style ribbon flow that splits the salary into Take-home,
> Federal income tax, Social Security, Medicare, and State tax (flat 5% estimate,
> editable). The take-home ribbon is emerald (#10B981); every deduction ribbon is a
> muted desaturated slate tone — green is the only saturated color on the page. Use
> 2025 federal brackets, single filer, standard deduction; math runs fully client-side,
> no backend. Numbers count up with a 600ms ease; ribbons animate with a 400ms spring.
> Below the flow, one live-updating line in serif italic: "That's N hours of every week
> you work for the government." Add an Annual / Monthly / Per-paycheck toggle as
> minimal text tabs. Small footnote disclaimer that figures are estimates and not tax
> advice. Fully responsive; on mobile the flow stacks vertically. No nav bar, no
> sections, no marketing copy — the input and the flow ARE the page.

**Budget guardrails (stay far under $50):**
- One-shot the detailed prompt above rather than 15 vague iterations — the prompt is
  the design brief, so the first render lands close.
- No backend, no database, no auth — pure client-side page.
- Cap yourself at ~3 refinement prompts (spacing, easing, mobile), then ship.

## Alternates (if the concept above doesn't feel right)

### B. "Am I Charging Enough?" — freelancer true-rate reveal
Type your desired take-home salary → see the hourly rate you *actually* need once
self-employment tax, unbillable hours, and no-benefits reality are priced in. Same dark
editorial system. **Strength:** Replit's social audience IS freelancers/indie hackers —
the people who see the post are the people it's about, and "you're undercharging —
here's proof" is a strong share hook. **Weakness:** narrower than Paycheck X-Ray.

### C. "Penalty Clock" — quarterly estimated-tax countdown
A beautiful full-screen countdown to the next IRS quarterly estimated-payment deadline,
with a one-field payment estimator and add-to-calendar. **Strength:** cheapest possible
build, real pain (penalties). **Weakness:** less visual drama for the social post.

## Social post playbook (step 2 of the challenge)

- Post a **screen recording**, not a static screenshot: typing the salary → ribbons
  splitting is the money shot (8–12 seconds, no sound needed).
- Caption formula: pain + speed + tool. Example:
  *"Ever stared at your paystub wondering where it all went? I typed one prompt into
  Replit Design and got this. ~20 minutes, no design skills."*
- Tag @Replit, include the live link, then drop the post link at
  communitycredits.replit.app with code REPLITDESIGN50.
