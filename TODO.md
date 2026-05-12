# TODO — Things to come back to

> Future Claude sessions: surface any unchecked item below to Yacob early in the conversation if he asks "what's pending" or "what should I work on next."

## Outstanding

- [ ] **Finish social posting automation** — See `SOCIAL_POSTING_SETUP.md`. Yacob deferred this on 2026-05-12 with intent to come back to it. Posts can't go live until: (1) Google Sheet content calendar built, (2) Make.com account + LinkedIn + Facebook Page scenarios configured, (3) end-to-end test post run. Estimated time: ~60 min once.

- [ ] **Build the 1099 Toolkit assets** — See `product/1099-toolkit/`. Sales page is live at `/1099-toolkit` once deployed; product files (3 Google Sheets, 2 PDFs) still need to be created from the specs. Then Stripe + Make.com delivery wired per `STRIPE_DELIVERY_SETUP.md`. Then launch per `LAUNCH_PLAN.md`.

- [ ] **Replace placeholder Stripe URL in sales page** — `client/src/pages/toolkit-1099.tsx` has `STRIPE_CHECKOUT = "https://buy.stripe.com/REPLACE_AFTER_STRIPE_SETUP"`. Update to real Stripe Payment Link after creating it.

- [ ] **Fill in placeholder links in delivery email** — `product/1099-toolkit/customer-delivery-email.md` has `REPLACE_WITH_COPY_LINK` and `REPLACE_WITH_PDF_LINK` markers. Update with real Google Drive `/copy` URLs once the customer files are built.

## Completed

- [x] Built `CLAUDE.md` working-context file via guided interview (2026-05-12)
- [x] Added marketing-agent section to `CLAUDE.md` (2026-05-12)
- [x] Drafted `SOCIAL_POSTING_SETUP.md` for LinkedIn + Facebook Page automation (2026-05-12)
- [x] Built 1099 Toolkit funnel: sales page, product specs, email drip, Stripe/Make.com setup guide, launch plan (2026-05-12)
- [x] Built advisory prompt library in `prompts/advisory/` — 5 CPA-flavored prompts (variance, scenario, narrative, cost driver, forecast challenge) (2026-05-12)

---

*This file is intentionally checked into git so reminders persist across sessions. Update it whenever you finish or add something.*
