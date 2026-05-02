# Team Decisions

> Canonical decision ledger for Cedar Tutoring Academy website rebuild.
> All agents read this before starting work. Append-only.

## Active Decisions

### 2026-05-02: Stack selection
**By:** Shaeel Afsar
**What:** Next.js 15 + React 19 + Tailwind CSS + TypeScript + shadcn/ui
**Why:** Popular, well-supported, future-proof, easy to debug. Industry standard for modern marketing/business sites.

### 2026-05-02: Phase 1 scope — informational only
**By:** Shaeel Afsar
**What:** Phase 1 is an informational website only. No customer portal, no auth, no payments.
**Why:** Build the foundation first. Customer portal (login, scheduling, payments) is a future phase.

### 2026-05-02: Expert React Frontend Engineer skill
**By:** Shaeel Afsar
**What:** Install github/awesome-copilot Expert React Frontend Engineer as a skill for Trinity.
**Why:** Deep React 19.2 patterns, Server Components, Actions API, accessibility, performance optimization.

### 2026-05-02: Static Site Generation for all marketing pages
**By:** Morpheus (Lead/Architect)
**What:** Every page in Phase 1 is statically generated at build time.
**Why:** Zero server cost, sub-100ms TTFB from CDN edge, maximum Core Web Vitals scores, simplest deployment model. Content updates trigger rebuild via CI.
**Trade-off:** Content changes require a deploy (typically < 2 min on Vercel). Acceptable given low content velocity in Phase 1.

### 2026-05-02: File-based content (MDX + JSON), no CMS in Phase 1
**By:** Morpheus (Lead/Architect)
**What:** Program content in MDX files, structured data (testimonials, FAQ, locations) in JSON files.
**Why:** Version-controlled, type-safe, zero external dependencies, simple for a finite content set. CMS adds cost and complexity not justified until content editing frequency demands it.
**Evolution:** Migrate to Sanity.io when non-developer content editing is needed (Phase 2+).

### 2026-05-02: Route group `(marketing)` with shared layout
**By:** Morpheus (Lead/Architect)
**What:** All public pages live under a `(marketing)` route group sharing Header + Footer layout.
**Why:** Clean separation for when Phase 2 adds `(portal)` route group with different layout (authenticated, sidebar nav).

### 2026-05-02: Full 301 redirect map from WordPress URLs
**By:** Morpheus (Lead/Architect)
**What:** 15+ redirects from old WordPress paths to new clean URLs, handled in middleware.
**Why:** Preserves SEO equity, prevents 404s for bookmarked pages, maintains Google index continuity during migration.

### 2026-05-02: Vercel for hosting
**By:** Morpheus (Lead/Architect)
**What:** Deploy to Vercel with preview deploys on PRs, production on `main` branch.
**Why:** Native Next.js platform, zero-config deployment, global CDN, free tier sufficient for Phase 1 traffic, scales for Phase 2.

### 2026-05-02: React Hook Form + Zod for forms
**By:** Morpheus (Lead/Architect)
**What:** Assessment form uses React Hook Form for state management, Zod for validation schemas.
**Why:** Type-safe validation shared between client and API routes, minimal bundle impact, excellent DX.

### 2026-05-02: 9-slice development plan
**By:** Morpheus (Lead/Architect)
**What:** Work broken into 9 independently shippable slices: Foundation → Homepage → Programs → Test Prep → Trust → Logistics → Enrollment → SEO Polish → Launch.
**Why:** Each slice produces a working, deployable site. Dependencies flow forward. Team can parallelize within slices.

### 2026-05-02: Phase 2 seams designed but not implemented
**By:** Morpheus (Lead/Architect)
**What:** Authentication (Auth.js v5), database (Prisma + PostgreSQL), payments (Stripe), and portal routing are architecturally planned with clear insertion points, but zero implementation in Phase 1.
**Why:** Avoid over-engineering Phase 1 while ensuring Phase 2 doesn't require a rewrite.

### 2026-05-02T17:18:03-05:00: Assessment form structure — single-page
**By:** Shaeel Afsar
**What:** Assessment form will be single-page with inline validation (not multi-step).
**Why:** User directive. Simpler to implement, meets user expectations.
**Resolves:** Oracle wireframe review blocker #3 (form structure).

### 2026-05-02T17:18:03-05:00: Pricing display strategy — use placeholders
**By:** Shaeel Afsar
**What:** Packages page uses `$XXX / month` placeholders. No real pricing required for Phase 1.
**Why:** User confirmed pricing placeholders are acceptable. Avoids premature commitment to pricing model.
**Resolves:** Oracle wireframe review concern (pricing display).

### 2026-05-02T17:18:03-05:00: News & Events deferred to Phase 2
**By:** Shaeel Afsar
**What:** News & Events page is deferred. Remove from Phase 1 navigation.
**Why:** Content readiness not addressed; user treating as deferred concern. Prevents trust issue from lorem ipsum.
**Resolves:** Oracle wireframe review concern (News & Events).

### 2026-05-02T17:18:03-05:00: Transportation page — minimal scope
**By:** Shaeel Afsar
**What:** Transportation/logistics page kept minimal. No route planning, GPS guidance, or complex logistics.
**Why:** User directive: people have GPS. Not a differentiator for Cedar. Reduces scope bloat.

### 2026-05-02T17:18:03-05:00: Aesthetic priority — modern, not dated
**By:** Shaeel Afsar
**What:** Final website design MUST be aesthetic, modern, friendly, and easy to navigate. Reject "early 2000s" appearance.
**Why:** User prioritizing design quality and freshness over functionality minimalism. Core brand signal.
**Trade-off:** May require additional design iteration vs. minimal wireframes.

## Team Reviews

### 2026-05-02: Trinity frontend spec review
**Status:** ⚠️ Found 2 blockers, 7 concerns. Approved stack and delivery approach.
**Blockers:**
- Content model contracts missing (MDX/JSON schemas)
- Form contract gaps (endpoint, payload schema, privacy copy)
**Key concerns:**
- Navigation breakpoint conflicts (md vs lg cutoff)
- CTAButton variant ambiguity (secondary vs outline)
- Programs hub filtering decision needed
- Assessment form shape decision (single-page vs multi-step)
- Multiple prop types need tightening
- Motion accessibility guidance needed
- Performance: avoid unnecessary client weight

### 2026-05-02: Oracle design spec review
**Status:** ⚠️ Found 2 blockers, 5 concerns. Approved trust-first direction.
**Blockers:**
- Accessible palette not finalized (AA safety checks fail on secondary, accent, success colors)
- Design handoff incomplete (tokens, components, page templates missing)
**Key concerns:**
- Typography too generic
- Hero guidance too loose
- Testimonial carousel overuse
- Pricing tier assumptions premature
- Responsive strategy under-specified
- Photography direction needs shot list and crop guidance

### 2026-05-02: Mouse testing spec review
**Status:** ❌ Did NOT approve as-is. Found 3 blockers, 5 concerns. Approved test pyramid approach.
**Blockers:**
- E2E environment wrong for release gating (must run against `next build && next start`, not dev mode)
- Vitest setup incomplete for App Router (missing jsdom, @testing-library/user-event, next/* mocks)
- Form/API test determinism not defined
**Key concerns:**
- Coverage incomplete vs blueprint
- Test data strategy underspecified
- Cross-browser matrix lists Edge but config omits it
- Form coverage missing trimming, sanitization, retry logic, server validation parity
- SEO validation incomplete (missing sitemap, robots.txt, OG image checks)

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
