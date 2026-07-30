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

## Ready-to-paste Replit Design master prompt (final — with states, benefits, privacy)

> Design a single-page interactive web tool called "Paycheck X-Ray". Dark editorial
> finance aesthetic: near-black navy background (#0A0F1E) with subtle film grain,
> generous whitespace, single-column layout max 720px wide, everything above the fold.
> Typography: large high-contrast serif display headline (Fraunces style) reading
> "Where does your paycheck actually go?", all numbers in tabular monospace so digits
> tick without layout shift. One large elegant input: "Your annual salary", with three
> small example chips beneath it ("Try $60,000 · $100,000 · $150,000") so visitors can
> play without entering their real number. As the user types, animate a Sankey-style
> ribbon flow that splits the salary into Take-home, Federal income tax, Social
> Security, Medicare, and State tax. The take-home ribbon is emerald (#10B981); every
> deduction ribbon is a muted desaturated slate tone — green is the only saturated
> color on the page. Use 2025 federal brackets, single filer, standard deduction,
> 6.2% Social Security up to the wage base, 1.45% Medicare; math runs fully
> client-side, no backend, nothing stored or sent anywhere. Directly under the input,
> a slim collapsed "Refine" row expands to reveal: a State dropdown (all 50 states +
> DC using simplified 2025 effective state income-tax rates, including $0 for the
> nine no-income-tax states), a 401(k) contribution % field, and a monthly health
> insurance premium field — pre-tax deductions appear as their own calm slate ribbon
> labeled "Benefits (still yours)" and reduce taxable income correctly. The refine
> row is optional; the tool must be complete and honest with just the one salary
> input using a national-median state estimate, labeled as such. Numbers count up
> with a 600ms ease; ribbons animate with a 400ms spring. Below the flow, one
> live-updating line in serif italic: "That's N hours of every week you work for the
> government." Add an Annual / Monthly / Per-paycheck toggle as minimal text tabs.
> Two quiet trust lines in the footer: "Nothing you type is stored or sent — the math
> runs entirely in your browser" and "Estimates only, not tax advice." Fully
> responsive; on mobile the flow stacks vertically. No nav bar, no sections, no
> marketing copy — the input and the flow ARE the page.

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

## Extended idea round — six more concepts, critically evaluated

Scored against the five criteria: instant emotional connection · zero explanation
needed · premium/shareable visual · real pain · cheap one-page build.

### D. "Debt-Free Date" ⭐ (strongest of the new round)
Type balance + APR + monthly payment → a giant serif date fills the screen:
**"You are debt-free on March 14, 2031."** Below it, one slider — "pay $50 more per
month" — and the date visibly melts backward by years as you drag. Confetti when the
date crosses under 1 year.
- **Connection:** debt anxiety is the deepest money emotion there is; the payoff is
  *hope*, which shares better than fear.
- **The wow:** dragging the slider and watching years disappear is a perfect 8-second
  screen recording. On-brand for a CPA. Math is trivial (amortization formula).
- **Risk:** almost none. Slightly heavier emotionally than Paycheck X-Ray.

### E. "The Meeting Cost Clock"
Pick number of attendees + average salary → hit start → a live counter burns dollars
in real time while the meeting runs. "This standup cost $412."
- **Connection:** instantly viral with the tech/LinkedIn crowd — the exact audience
  Replit's socials reach. Cheapest build on this list (one counter).
- **Risk:** it's been done before (meeting-cost calculators exist), so "out of the
  box" is weaker; and it's office-snark, not aligned with Selam CPA's client base.

### F. "Is It Worth It?" — the life-hours converter
Type any price + your salary → "This $1,299 phone = **34 hours of your life**,"
rendered as an elegant clock-face / hour-grid visual that fills as you type.
- **Connection:** converts money into the one currency everyone understands — time.
  Dead-simple two-field build.
- **Risk:** the "latte factor" genre is familiar; needs the visual execution to carry
  the out-of-the-box claim.

### G. "Subscription Lifetime"
A beautiful grid of subscription logos — tap the ones you pay for → a running counter
shows the 10-year true cost: "Your subscriptions are a **$31,000 car**."
- **Connection:** subscription creep is universal and current; tapping logos is a
  satisfying interaction with zero typing.
- **Risk:** logo licensing makes it awkward for Replit to reshare; comparison objects
  (car/house-downpayment) need care to not feel preachy.

### H. "Retire Me"
Age + monthly savings → the screen renders the exact date you can stop working, with
a compound-interest curve drawing itself behind the type. Slider: "+$100/month" pulls
the date closer.
- **Connection:** retirement anxiety is real, and "a specific date" makes the
  abstract concrete — same emotional mechanic as Debt-Free Date.
- **Risk:** requires assumptions (return rate, spend rate) that invite nitpicking in
  the replies; slightly more explaining than the others.

### I. "Your Raise Was a Pay Cut"
Type last year's raise % → against current inflation, see your real change in
purchasing power, typeset like a newspaper correction notice.
- **Connection:** provocative, very shareable, timely.
- **Risk:** negative-emotion payoff (anger, no agency) — great for engagement, but
  it's a downer with no action, and less on-brand for a trust-based CPA firm.

## Final ranking (all nine)

1. **Debt-Free Date (D)** — deepest emotion + the best single interaction (the
   slider melting years away) + on-brand + trivial math. New top recommendation,
   narrowly over Paycheck X-Ray.
2. **Paycheck X-Ray (A)** — most universal, best pure visual (the ribbon split),
   zero-risk tone. Pick this if you prefer the stronger *screenshot*; pick D if you
   prefer the stronger *feeling*.
3. **Is It Worth It? (F)** — simplest build with genuine universality.
4. **Meeting Cost Clock (E)** — most viral ceiling, least original floor.
5. **Am I Charging Enough? (B)** — best audience fit, narrower reach.
6. **Subscription Lifetime (G)**, then **Retire Me (H)**, **Penalty Clock (C)**,
   **Raise/Pay Cut (I)**.

## Master prompt — Debt-Free Date (if chosen)

> Design a single-page interactive experience called "Debt-Free Date". Dark editorial
> aesthetic: near-black navy (#0A0F1E), subtle grain, single column max 720px, all
> above the fold. Three minimal inputs in a row: current balance, APR, monthly
> payment — labels in small caps, values in tabular monospace. The moment all three
> are filled, the page's centerpiece renders: an enormous high-contrast serif date
> (Fraunces style) — "You are debt-free on March 14, 2031" — animating in with a
> 500ms rise-and-settle. Beneath it, one emerald (#10B981) slider labeled "What if
> you paid a little more?" ranging +$0 to +$500/month; dragging it recalculates the
> amortization live and the giant date visibly rolls backward, with a small line
> beneath: "$150 more per month sets you free 3 years and 2 months sooner." When the
> payoff drops under 12 months, fire a single tasteful emerald confetti burst. Green
> is the only saturated color. Standard amortization math, fully client-side, no
> backend. Small footnote: estimates only, not financial advice. Fully responsive.
> No nav, no sections, no marketing copy — the inputs and the date ARE the page.

## Social post playbook (step 2 of the challenge)

- Post a **screen recording**, not a static screenshot: typing the salary → ribbons
  splitting is the money shot (8–12 seconds, no sound needed).
- Caption formula: pain + speed + tool. Example:
  *"Ever stared at your paystub wondering where it all went? I typed one prompt into
  Replit Design and got this. ~20 minutes, no design skills."*
- Tag @Replit, include the live link, then drop the post link at
  communitycredits.replit.app with code REPLITDESIGN50.
