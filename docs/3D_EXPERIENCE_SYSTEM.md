# Selam CPA — 3D Experience Operating System

The complete design + engineering system behind `/experience`, the cinematic
scroll-driven 3D journey. This document is the "operating system": creative
direction, world design, storytelling map, motion language, technical
architecture, QA standards, and the roadmap for evolving it.

**Live route:** `/experience`
**Code:** `client/src/pages/experience.tsx` (page + overlay) · `client/src/lib/experience/world.ts` (Three.js world)

---

## 1. Creative Direction

### Brand analysis
- **Brand:** Selam CPA — a modern, AI-native CPA firm (tax, bookkeeping, advisory, AI consulting).
- **Audience:** Small-business owners, entrepreneurs, and finance leads who feel *behind* on their numbers; secondary: accounting firms buying AI consulting.
- **Emotional target:** Relief and confidence. The visitor should arrive anxious ("my books are a mess") and leave feeling "these people will handle it — and they're clearly ahead of the curve."
- **Competitive gap:** CPA websites are uniformly static and template-like. A cinematic experience is itself the proof-point for "AI-native, modern firm" — the medium demonstrates the claim.

### Visual identity
| Token | Value | Role |
|---|---|---|
| Deep navy | `#0a0f1e` | The void / background — matches the site's dark sections |
| Emerald | `#10b981` / `#34d399` | Life, growth, money-in-order; key light + accents |
| Sky blue | `#38bdf8` | Intelligence/technology accent (AI act) |
| Slate | `#94a3b8` | Supporting text, stars |
| Type | Existing site font stack, tight tracking, `tabular-nums` for counters | Continuity with the rest of the site |

Principles: **dark, spacious, restrained.** One accent color per moment. Glass
and light instead of clutter. Motion is slow and damped — luxury reads as
*unhurried*.

## 2. The Cinematic World

One continuous environment the camera travels through — not five separate
scenes. Spatial continuity is what makes it feel like a *place*.

| Act | Environment | Materials & light | Story beat |
|---|---|---|---|
| **Arrival** | A drifting cloud of 2,600 emerald particles in fog | Additive-blended points, dense exponential fog | Financial chaos — beautiful but formless |
| **Order** | The same particles morph into a 12-bar ascending "skyline" | Particle morph (chaos→order buffers), fog begins thinning | Bookkeeping: chaos becomes structure |
| **Ascent** | A climbing helix of nine glowing torus rings, emerald→blue gradient | Emissive standard materials, breathing scale/emissive pulse | Tax strategy: a planned climb |
| **Intelligence** | A wireframe icosahedron core, glowing inner solid, five orbiting satellites | Wireframe + emissive core, blue satellites | The AI-native practice |
| **Trust** | Six floating glass panels with emerald edge light, calm float | `MeshPhysicalMaterial` clearcoat "glass", edge `LineSegments` | Human judgment, steady hands |
| **Invitation** | Camera pulls back; the whole climb is visible below | Thinnest fog of the journey | CTA: "Your story is next" |

- **Camera choreography:** a Catmull-Rom dolly path (9 keys) plus a separate
  look-target spline — position and gaze are decoupled so the camera can
  "notice" objects the way a Steadicam operator would. Scroll is damped
  (`MathUtils.damp`, λ=4.5) so wheel-clicks become glides.
- **Environmental storytelling:** height = progress. The journey literally
  *rises* ~30 units from the chaos floor to the trust gallery, and fog density
  drops as clarity increases (0.028 → 0.016).
- **Lighting:** ambient base + emerald key and blue rim lights that travel
  with the camera, so every act is lit without lighting the whole world.
- **Interactivity:** pointer parallax on the camera (±0.55 units, damped);
  DOM stat counters and reveal cards respond to scroll position.

## 3. Scroll Storytelling

- **Structure:** Hero (invitation to scroll) → five acts → finale CTA. Each act
  is a `140vh` section, giving the camera time to travel *between* copy blocks —
  the empty travel is the transition; there are no cuts.
- **Attention:** one glass copy card per act, alternating left/right so the eye
  sweeps across the 3D scene between acts. Cards reveal with a 36px rise +
  fade (`cubic-bezier(0.22,1,0.36,1)`) at 35% visibility.
- **Emotion curve:** anxiety (chaos) → satisfaction (order snap) → aspiration
  (climb) → awe (core) → safety (glass gallery + counted stats) → action (CTA).
- **Progress feedback:** a 2px emerald journey bar at the top of the viewport;
  a bouncing "scroll to begin" hint on the hero.
- **Conversion:** the only two buttons in the journey are at the finale —
  Book a Discovery Call (Calendly) and Send a Message (/contact). No competing
  CTAs mid-story.

## 4. Motion & Interaction System

| Effect | Implementation | Purpose |
|---|---|---|
| Cinematic loader | 1.5s progress beat, brand wordmark, fade-out | Sets pace and mood; masks first-frame compile |
| Custom cursor | Emerald dot (instant) + trailing ring (0.16 lerp), ring expands over links/buttons | Signals "this page is different"; desktop `pointer: fine` only |
| Scroll damping | Exponential damp on scroll + pointer | Removes judder; luxury = smoothness |
| Particle morph | Per-frame lerp between two position buffers, smoothstepped 8%–30% scroll | The core "aha" moment of Act II |
| Breathing rings | Sine-driven scale + emissive intensity | Life without distraction |
| Orbiting satellites | Parametric orbits at differing radii/speeds | Suggests autonomous agents at work |
| Stat count-up | Cubic ease-out over 1.4s, triggered at 60% visibility | Trust moment lands with weight |
| Micro-interactions | CTA `hover:scale-1.03` / `active:scale-0.98`, cursor ring growth | Tactile feedback at the decision point |

Every effect maps to a story beat; nothing is decoration-only. Anything that
doesn't guide attention or reinforce a beat was cut (no film grain, no
distortion shaders, no scroll-jacking).

## 5. Technical Architecture (Three.js)

```
client/src/pages/experience.tsx     ← DOM: loader, cursor, acts, CTA, lifecycle
client/src/lib/experience/world.ts  ← WebGL: scene graph, camera rig, render loop
```

- **Boundary:** the page owns scroll/pointer/visibility and passes normalized
  values into the world (`setScroll(0..1)`, `setPointer(-1..1)`). The world
  never touches the DOM. This keeps React renders out of the 60fps path —
  scroll state lives in refs/closures, not component state (except the cheap
  progress bar).
- **Code-splitting:** the page is `React.lazy` in the router, and `world.ts`
  (with the whole `three` dependency, ~150KB gz) is a further dynamic
  `import()` inside the page — the rest of the site pays zero bytes.
- **Budgets:** ~3,500 particles + stars, 9 toruses, 1 icosahedron pair,
  5 satellites, 6 planes ≈ 25 draw calls, < 100k triangles. All geometry
  procedural — zero asset downloads.
- **Adaptive quality:** starts at `min(devicePixelRatio, 1.75)`; 30 consecutive
  slow frames (>34ms) drop pixel ratio by 0.25 (floor 1.0). Resolution
  degrades before frame rate does.
- **Lifecycle:** render loop pauses on `visibilitychange` and via
  IntersectionObserver; unmount cancels RAF and disposes every tracked
  geometry/material plus the renderer (no WebGL context leaks on SPA nav).
- **Resilience:** WebGL construction is try/caught — failure swaps in a
  radial-gradient backdrop and the page remains a fully readable story.

### Accessibility
- `prefers-reduced-motion`: no render loop (single static frame per scroll
  position), no custom cursor, no reveal/bounce animations, counters render
  final values. Listens for live changes to the media query.
- Canvas and cursor are `aria-hidden`; all narrative lives in real DOM text —
  screen readers and SEO crawlers get the full story.
- Keyboard: standard scroll and tab order; no scroll-jacking; visible CTAs are
  real anchors with test ids.

## 6. AI-Assisted Workflow (how this was built, and how to extend it)

1. **Creative direction** — brief the model with brand, audience, emotion
   target (Section 1) before any code; approve the act structure as text first.
2. **World building** — procedural geometry from prompts beats asset
   generation for abstract brand worlds: instant, weightless, on-palette. Use
   AI-generated GLB assets (e.g. Higgsfield/Meshy) only when a *literal* object
   is required, then Draco-compress.
3. **Iteration loop** — change one act at a time; verify with a headless
   Playwright screenshot at several scroll positions (fast, objective).
4. **Copy** — act copy is data (`ACTS` array), so voice iterations never touch
   scene code.
5. **QA** — run the Section 7 audit after each significant change.

## 7. Quality-Assurance Audit Standard

Run before shipping changes to the experience:

- [ ] **Branding** — palette limited to navy/emerald/blue/slate; type matches site
- [ ] **Storytelling** — each act readable in isolation; emotion curve intact
- [ ] **Animation** — no judder at trackpad and wheel speeds; damping feels weighted
- [ ] **Responsiveness** — 375px, 768px, 1440px; copy cards never overlap; touch = no cursor
- [ ] **Accessibility** — reduced-motion path renders; tab order sane; contrast ≥ 4.5:1 on copy
- [ ] **Performance** — 60fps on M-class laptop, ≥30fps on 2019 mid-range; three chunk stays lazy
- [ ] **SEO** — title/description/canonical present; narrative in DOM text
- [ ] **Conversion** — CTA above the fold at finale; Calendly link resolves
- [ ] **Resilience** — WebGL-blocked browser still gets full readable page

Priority order for improvements: conversion > performance > polish.

## 8. Scaling Roadmap

| Milestone | Scope | KPI |
|---|---|---|
| **v1 (this)** | Five-act journey, adaptive quality, reduced-motion path | Experience→Calendly CTR; scroll depth ≥ 60% |
| **v1.1** | GA4 events per act (enter/complete), scroll-depth funnel | Identify drop-off act |
| **v1.2** | Seasonal grades (tax-season warm keylight, year-end gold), copy A/B via `ACTS` | CTR lift per variant |
| **v2** | Per-industry world variants reusing the rig (healthcare, real estate, …) | Industry-page engagement |
| **v2.1** | Interactive Act IV: type a question, satellites "answer" via the existing chatbot API | Chat engagement from experience |
| **v3** | WebGPU renderer behind feature detection; shared element transition from homepage hero into the world | Perf headroom; homepage→experience flow |

Maintenance: pin `three` minor upgrades quarterly; re-run the QA audit on each
dependency bump; keep the world procedural (no binary assets) as long as
possible — it keeps the page weightless and diff-reviewable.
