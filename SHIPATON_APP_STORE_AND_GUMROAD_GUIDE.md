# Shipaton 26: Design, Publish & Sell — Complete Guide

A practical playbook built from the Replit + RevenueCat Shipaton materials in your inbox
(the Aug 6 "From Idea to Published App" YouTube session, the Replit Designathon, and the
"Make Your First Dollar in the App Store" session), plus current store requirements and a
Gumroad sales plan tailored to the Selam CPA store.

---

## 1. What Shipaton 26 Is (and Why It Matters Now)

**RevenueCat Shipaton 2026** is the largest mobile hackathon in the world:

| Item | Detail |
|---|---|
| Window | **August 1 – September 30, 2026** |
| Prizes | **$1M+ total, $700K+ cash** across 9 award categories |
| Replit bonus | **$30K reserved just for Replit builders** |
| Requirement | Ship a **brand-new app** publicly to the **App Store, Google Play, or Samsung Galaxy Store** during the window |
| Monetization | Must integrate the **RevenueCat SDK** (subscriptions / in-app purchases) |
| Submission | Via Devpost: https://revenuecat-shipaton-2026.devpost.com/ |
| Official site | https://www.shipaton.com/ |
| Prep guide | https://revenuecat.github.io/codelabs/shipaton-2026-prep.html |

**Your resources from Gmail:**
- Webinar you registered for: *From Idea to Published App with Replit and RevenueCat
  [Shipaton 26]* — Aug 6, streamed on YouTube. Event page (replay link posts here):
  https://luma.com/gyzypv4l
- *Replit Designathon* (week of Aug 4, $50K+ in prizes) — kickoff replay was emailed to you;
  you're registered for *Designathon Live: Get Feedback on Your Design* (Aug 7).
- Earlier session: *Make Your First Dollar in the App Store* (Replit × RevenueCat) — covered
  building → payments → App Store submission end to end.

**The play:** you already ship web apps on Replit (AccountantAI/Selam CPA, Bid-Helper,
Event-Ticket-Hub). Shipaton is the push to turn one idea into a **mobile** app with
subscriptions and ship it inside the window.

---

## 2. Design the App (Days 1–7)

### Pick the idea
- Choose **one problem, one audience** — e.g., a freelancer tax-deadline tracker fits your
  existing CPA niche and cross-sells your Gumroad products.
- Validate against Shipaton categories (Best Design, Best Vibes, #BuildInPublic, etc. on the
  Devpost page) and design for one category deliberately.

### Design workflow
1. **Sketch the core loop first** — the 3 screens a user touches daily. Everything else is
   secondary.
2. **Use Replit Design** (what the Designathon is showcasing) to generate the UI, or
   prototype visuals in Canva/Figma before prompting.
3. **Design for the store listing from day one**: your icon, 3–5 screenshots, and a one-line
   value proposition are marketing assets Apple/Google reviewers and users judge first.
4. **Paywall placement is a design decision**: RevenueCat's templated paywalls drop in — plan
   where the free tier ends (e.g., 3 free uses → subscribe).
5. Get live feedback at Designathon streams — that's exactly what the *Get Feedback on Your
   Design* session is for.

### Build on Replit
- Start from the official template: **RevenueCat Expo Replit framework**
  (https://github.com/RevenueCat/revenuecat-expo-replit-framework) — Expo + RevenueCat
  pre-wired for iOS, Android, and web.
- Replit's RevenueCat integration adds subscriptions/paywalls via prompt:
  https://docs.replit.com/core-concepts/monetization/revenuecat-subscriptions
- In development (Expo Go / Replit preview), purchases run in **test mode** — no real money.
  Real billing activates only after store publication.

---

## 3. Register as a Developer (Do This Immediately — Verification Takes Days)

### Apple App Store
| Item | Detail |
|---|---|
| Program | Apple Developer Program — https://developer.apple.com/programs/enroll/ |
| Cost | **$99/year** |
| Needs | Apple ID with two-factor auth; legal name matching government ID; D-U-N-S number only if enrolling as an organization (individual is fine to start) |
| Time | Usually 24–48h, can take longer |

Publishing flow: App Store Connect → create app record → upload build (Expo/EAS handles
this from Replit's framework) → TestFlight beta (optional but recommended) → fill in
screenshots, description, **privacy "nutrition label"**, age rating → submit for review.
Review typically takes 24–48 hours; common rejections are broken links, missing demo
accounts for reviewers, and vague app descriptions.

### Google Play
| Item | Detail |
|---|---|
| Console | https://play.google.com/console/signup |
| Cost | **$25 one-time** (no renewal) |
| Identity | Government ID verification required |
| ⚠️ Key rule | **Personal accounts created after Nov 13, 2023 must run a closed test with 12 testers opted in continuously for 14 days before production release** |

**This 14-day rule is your critical path for Shipaton.** Budget it into the timeline:
upload your closed-testing build by early September at the latest. Recruit the 12 testers
from friends/family/Threads followers, or tester-exchange communities. Organization
accounts (with a D-U-N-S number) are exempt from the 12-tester rule.

### Samsung Galaxy Store
| Item | Detail |
|---|---|
| Portal | Seller Portal — https://seller.samsungapps.com/ |
| Cost | **Free** |
| Steps | Create a Samsung account → register in Seller Portal → request **Commercial Seller** status (required to distribute Android apps, even free ones) |
| Verification | Government ID (individual) or business registration docs; the name must exactly match your ID and financial info |
| Docs | https://developer.samsung.com/galaxy-store/prepare.html |

Samsung accepts the same Android APK/AAB you build for Google Play, has far less
competition, and **counts as a qualifying store for Shipaton** — a useful fallback if the
Google Play 14-day test threatens your deadline.

### Monetization (all stores)
1. Create a free RevenueCat account → one project, attach App Store + Play Store apps.
2. Define products (e.g., `monthly_pro` $4.99, `annual_pro` $39.99) in App Store
   Connect/Play Console, mirror them in RevenueCat, group into an "entitlement."
3. Use RevenueCat's paywall templates; the Replit integration wires the SDK for you.
4. RevenueCat is free up to $2.5K MTR — no cost at hackathon scale.

---

## 4. Shipaton Timeline (Today = Aug 7)

| Dates | Milestone |
|---|---|
| Aug 7–9 | Lock the idea; register **Apple ($99)**, **Google ($25)**, **Samsung (free)** today — verification runs in parallel |
| Aug 10–17 | Build MVP on Replit from the Expo+RevenueCat template; design icon/screenshots |
| Aug 18–24 | Integrate paywall, test purchases in sandbox; TestFlight build up |
| Aug 25 – Sep 8 | **Start Google Play closed test (12 testers × 14 days)**; iterate from feedback |
| Sep 8–15 | Submit to App Store review; Samsung Seller Portal submission |
| Sep 15–25 | Public release on at least one store; fix review rejections |
| Sep 26–30 | Devpost submission with demo video; post #BuildInPublic recap |

---

## 5. Selling on Gumroad (Fix the Selam CPA Store First)

Your automated weekly report (Aug 3) shows: **10 products, 8 published, 0 sales, zero
covers on every product, no free lead magnet, LAUNCH40 discount code unused.** The
diagnosis is distribution, not product. In priority order:

### Step 1 — Make listings sellable (1 evening)
- **Upload covers to every product** — image-less listings kill conversion. Priority:
  Quarterly Tax Planner ($19), Freelancer Kit ($29), Tax Mastery Bundle ($67).
  Make covers in Canva (1280×720): bold title, price anchor, your Selam CPA branding.
- Publish the two stuck drafts (Monthly Bookkeeper Checklist $29, ChatGPT Prompts $17) or
  delete them.
- Rewrite descriptions to lead with the outcome ("Never miss a quarterly deadline") not the
  contents.

### Step 2 — Build the funnel (1 evening)
- **Publish the free Tax Deadline Cheat Sheet at $0** — it's your email-capture front door.
  Gumroad collects buyer emails even on free products.
- Add an upsell from the free product to the $19 Quarterly Tax Planner.

### Step 3 — Drive traffic (ongoing, ~30 min/day)
This is the "4-App System" from the Threads post you screenshotted (Claude → Canva →
Gumroad → Threads), applied to your store:
- Put the **LAUNCH40 code** to work: post the discounted Quarterly Tax Planner link
  ($19 → ~$11.40) where freelancers gather — Reddit r/freelance, LinkedIn, niche
  newsletters, and your own Threads account.
- Post helpful tax/bookkeeping content daily on Threads with the Gumroad link in your
  profile; the screenshotted thread is the template (value posts → product link in final
  post).
- Cross-promote from selamcpa.com: add a "Free Tax Cheat Sheet" banner linking to Gumroad.
- Don't push the $97/$197 bundles to cold traffic — sell those to the email list the free
  product builds.

### Step 4 — Connect the two tracks
The mobile app you ship for Shipaton and the Gumroad store reinforce each other: the app's
free tier can promote the cheat sheet; every Gumroad buyer email is a beta-tester
candidate for the Google Play 12-tester requirement; and #BuildInPublic posts on Threads
market both.

---

## 6. Link Index

**Shipaton / events**
- Shipaton official: https://www.shipaton.com/ · Devpost: https://revenuecat-shipaton-2026.devpost.com/
- Prep codelab: https://revenuecat.github.io/codelabs/shipaton-2026-prep.html
- Your Luma event page (replay): https://luma.com/gyzypv4l
- HackerNoon Shipaton writing contest ($2,500 extra): https://contests.hackernoon.com/shipaton-writing-contest

**Build**
- Replit × RevenueCat partner page: https://replit.com/partners/revenuecat
- Expo + RevenueCat template: https://github.com/RevenueCat/revenuecat-expo-replit-framework
- Replit RevenueCat docs: https://docs.replit.com/core-concepts/monetization/revenuecat-subscriptions

**Stores**
- Apple Developer Program: https://developer.apple.com/programs/enroll/
- Google Play Console signup: https://play.google.com/console/signup
- Samsung Seller Portal: https://seller.samsungapps.com/ · Guide: https://developer.samsung.com/galaxy-store/prepare.html

**Sell**
- Gumroad dashboard: https://gumroad.com/dashboard
