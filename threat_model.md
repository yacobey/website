# Threat Model

## Project Overview

Selam CPA is a production full-stack web application for a CPA firm. It uses a React/Vite frontend, an Express/TypeScript backend, Drizzle ORM with PostgreSQL/Neon, Stripe for payments, OpenAI for chatbot and content generation, and SendGrid for email notifications. The application serves public marketing content, collects customer leads and job applications, exposes a paid AI agent flow, and includes intended admin/SEO/content-management capabilities.

Production entry is the Express server in `server/index.ts`, with most HTTP routes defined in `server/routes.ts`, payment-specific routes in `server/payment-router.ts`, and shared database schemas in `shared/schema.ts`. The browser client is untrusted. Only vulnerabilities reachable in production are in scope. Development-only mockups, screenshots, root-level documentation files, `dist/`, and other non-runtime artifacts should usually be ignored unless production reachability is demonstrated.

Assumptions for this threat model:
- Replit deployment TLS terminates traffic in production.
- `NODE_ENV` is `production` in deployed environments.
- The mockup sandbox is not deployed to production.

## Assets

- **Administrative capabilities and content-management functions** — SEO settings, content schedule data, backups, restore operations, social posting, blog publishing, calculator creation, and operational task triggers. Compromise would let an attacker alter site content, disrupt operations, or misuse connected services.
- **Customer and applicant personal data** — contact submissions, career applications, email notification subscriptions, purchase history, user progress, and recommendations. These records contain names, email addresses, phone numbers, freeform notes, and other business-sensitive data.
- **Payment integrity and purchase state** — Stripe checkout sessions, payment intents, product access decisions, and agent-access cookies. Compromise could let attackers underpay, misroute payments, or claim paid access illegitimately.
- **Application secrets and service credentials** — `DATABASE_URL`, `SESSION_SECRET`, `STRIPE_SECRET_KEY`, `OPENAI_API_KEY`, `SENDGRID_API_KEY`, `BLOG_TASK_TOKEN`, and admin credentials. Exposure or misuse would enable direct compromise of infrastructure or third-party services.
- **Brand and site integrity** — public pages, blog content, SEO metadata, robots/sitemap controls, and chatbot responses. Tampering would directly affect search performance, lead generation, and business reputation.
- **Server-side network position and resources** — the backend can reach internal and third-party network destinations and can trigger expensive external API calls. That makes outbound request features and unauthenticated compute-heavy routes security-relevant.

## Trust Boundaries

- **Browser to API boundary** — all client requests cross from an untrusted browser into the Express API. Authentication, authorization, pricing rules, and input validation must be enforced server-side.
- **API to database boundary** — route handlers in `server/routes.ts` and `server/storage.ts` can read and write sensitive business data in PostgreSQL. Any broken access control at the API layer exposes the database-backed records behind it.
- **API to Stripe boundary** — `server/payment-router.ts` and Stripe payment-intent creation use secret API credentials and control charge amounts, checkout configuration, and entitlement decisions.
- **API to OpenAI / SendGrid boundary** — the backend forwards user-controlled content to external services and can spend money or expose user data through those integrations.
- **Public to intended admin boundary** — the app has an intended distinction between public pages and administrative functions such as SEO/content management, backups, and social posting. That boundary must be enforced on the server, not only in the frontend.
- **Public to user-specific data boundary** — endpoints that expose purchases, progress, and recommendations are keyed by user identifiers and must be scoped to the requesting user.
- **External scheduler to task endpoint boundary** — automated publishing routes rely on a bearer/query token and are intended for machine-to-machine use, not anonymous public access.
- **API to outbound network boundary** — server-side features that connect to user-supplied hosts can become SSRF or internal reconnaissance primitives if not constrained.

## Scan Anchors

- **Production entry points:** `server/index.ts`, `server/routes.ts`, `server/payment-router.ts`, `server/routes-performance.ts`
- **Highest-risk code areas:** auth/admin logic in `server/routes.ts` and `client/src/hooks/useAuth.ts`; payment logic in `server/payment-router.ts` and `/api/create-payment-intent`; data access in `server/storage.ts`; outbound request logic in `server/ssl-validator.ts`
- **Public vs intended protected surfaces:** most `/api/*` routes are publicly reachable; intended admin UI lives in `client/src/pages/admin-login.tsx` and `client/src/pages/seo-dashboard.tsx`; paid agent status uses `server/payment-router.ts`
- **Usually dev-only / low-priority areas:** root markdown guides, screenshots, `dist/`, and static docs unless a route or import proves production use

## Threat Categories

### Spoofing

This project has an intended admin boundary and a paid-user boundary, but the backend must not trust the browser to prove either one. Admin sessions, payment-backed entitlements, and task invocations must be validated with unpredictable, server-verified credentials on every protected request. Default credentials, client-generated tokens, or frontend-only checks are not acceptable because they let attackers impersonate administrators or paid users.

Required guarantees:
- All admin or operator actions MUST require server-validated authentication.
- Administrative credentials MUST come from securely managed secrets and MUST NOT fall back to guessable defaults.
- Session or access tokens MUST be signed or otherwise integrity-protected and MUST be verified on every protected request.
- Machine-triggered task endpoints MUST reject unauthenticated callers and SHOULD avoid credentials in URLs where practical.

### Tampering

The browser can send arbitrary JSON, route parameters, and payment metadata. This matters especially for payment creation, content-management routes, SEO controls, backups/restores, and social-posting actions. The server must derive sensitive state from trusted server-side records, not from client-supplied amounts, price identifiers, or role indicators.

Required guarantees:
- Payment amounts, products, and entitlements MUST be determined server-side from an allowlist or authoritative catalog.
- Content-management and SEO mutation routes MUST require server-side authorization before modifying data.
- User-controlled route parameters and bodies MUST be validated for both type and authorization context before use.
- State-changing routes MUST be protected against anonymous tampering even when input validation succeeds.

### Information Disclosure

The application stores multiple categories of PII and business-sensitive records: contact submissions, career applications, email subscriptions, purchase history, and user progress. These datasets must not be returned to arbitrary callers or to users who merely know another person's email address. Operational endpoints should also avoid leaking internal state, excessive diagnostics, or unnecessary service details.

Required guarantees:
- API endpoints that return PII or user-linked records MUST require an authenticated, authorized caller.
- User-specific records MUST be filtered by the authenticated subject on the server, not by a user-controlled identifier alone.
- Sensitive operational responses and logs MUST avoid exposing unnecessary personal data or internal details.
- Public endpoints MUST return only the minimum fields needed by the client.

### Denial of Service

Several routes can consume external-service quota or server/network resources, including chat generation, payment setup, and outbound SSL checks. Even with broad API rate limiting in `server/index.ts`, expensive routes still need careful scoping and bounded work. Unauthenticated callers should not be able to trigger unbounded outbound requests, high-cost third-party calls, or large-scale data scraping.

Required guarantees:
- Expensive or externally billed routes SHOULD have tighter rate limits and authorization where appropriate.
- Outbound network requests MUST use strict destination validation and bounded timeouts.
- Public endpoints that enumerate large sensitive datasets MUST not be anonymously scrapeable.
- Resource-intensive state changes SHOULD be restricted to authenticated operators.

### Elevation of Privilege

The most important application-specific risk is broken access control: anonymous users reaching intended admin functionality, or one user reaching another user's records by changing an email address or object ID. Because the main route file mixes public marketing endpoints with administrative and user-specific data endpoints, every sensitive handler must explicitly enforce privilege checks.

Required guarantees:
- Admin-only routes MUST enforce server-side privilege checks independently of the frontend.
- User-specific routes MUST bind access to the authenticated user identity and MUST NOT trust email addresses or record IDs supplied by the caller alone.
- Payment-backed access decisions MUST be based on verified Stripe state associated with the authenticated user or signed session.
- Security reviews should treat any route in `server/routes.ts` that reads or mutates contacts, career applications, SEO data, content schedules, backups, restore state, social posting, recommendations, or payment state as high priority unless explicit server-side authorization is present.
