# Morpheus Historical Context Archive

**Archived:** 2026-05-07T16:50:00Z  
**Reason:** history.md exceeded 15KB threshold (16696 bytes). Foundational/completed work moved here; recent execution retained in history.md.

---

## Foundation Phase (2026-05-02 through 2026-05-03)

### Project Context & Architecture Blueprint
- **Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript
- **Rendering:** SSG for all marketing pages
- **Content storage:** File-based (MDX, JSON) with future CMS flexibility
- **Deployment:** Vercel (CDN edge, preview deploys)
- **Phase 2 seams:** Auth.js v5, Prisma + PostgreSQL, portal route group
- **SEO:** Per-page metadata, JSON-LD, dynamic sitemap/robots
- **Redirects:** Full 301 map from WordPress URLs in middleware
- **Testing:** Vitest (unit/integration) + Playwright (E2E, SEO, accessibility)

### Spec Review Resolution (2026-05-02)
Addressed 7 blockers and ~15 concerns from Trinity, Oracle, and Mouse spec reviews.

**Outcomes:**
- Architecture Blueprint v1.1: typed content contracts, form API contracts, spam protection (honeypot + rate limit, no CAPTCHA), privacy/consent requirements, static programs hub, single-page assessment form
- Trinity Frontend Spec v1.1: standardized nav breakpoint to `lg`, CTAButton variants clarified (primary/outlined/ghost), dual-CTA support added, LucideIcon props standardized, FormField.type tightened, LocationCard.hours structured, Embla Carousel recommended, prefers-reduced-motion documented, form contracts defined
- Oracle Design Spec v1.1: AA-safe color matrix (darkened secondary, muted-foreground, success), accent background-only, Newsreader display font, hero pattern docs, testimonial specs, all page layouts documented, transition/animation tokens, z-index scale
- Mouse Testing Spec v1.1: Playwright webServer updated to build+start, Vitest config expanded for App Router, MSW-based form/API mocking, coverage for About/Reviews/Pricing/Transportation, 404/error/robots/sitemap tests, smoke and link-check suites, launch-day verification suite

### Team Review Status (2026-05-02)
- **Trinity** ⚠️ 2 blockers found, approved stack
- **Oracle** ⚠️ 2 blockers found, approved trust-first direction
- **Mouse** ❌ 3 blockers found, spec v1.1 published with fixes

### Oracle UX Review & Brand Alignment (2026-05-03)
- **Cedar Blue** (#0d8ecf) set as primary (text-safe variant: #0a7ab8 for light backgrounds, 4.52:1 AA contrast)
- **Cedar Orange** (#ffa725) set as accent (was #f59e0b)
- **Cedar Red** (#d92027) introduced as `--brand-red` (NOT replacing green secondary; semantic distinction preserved)
- **Design consistency:** CTASection mandatory on all pages (gradient-container treatment), PageHero gets `decorative` prop with blurred gradient orbs, ProcessSteps uses filled circles only
- **Rejected:** Photography in Phase 1 (no assets), replacing secondary with Cedar Red (semantic conflict)
- **Spec versions:** oracle-design-spec.md → v1.2, trinity-frontend-spec.md → v1.2

### Trinity: Programs/Test Prep Content Migration (2026-05-03)
**Status:** ✅ COMPLETE
- Created 5 content files: programs-hub.json, test-prep-hub.json, sat.json, act.json, psat.json
- Added `TestPrepPageContent` interface with `detailPage` shell pattern
- Implemented `loadTestPrepPage()` loader with Zod validation
- Static export unblocked for test-prep routes; built with 0 TypeScript errors

### PRD-Ready Website Review (2026-05-07)
- **Review artifact:** `prd-ready-review-gpt.md` (parent/guardian launch-readiness analysis)
- **Key findings:**
  - Visually/content-wise near launch-ready, but NOT PRD-ready until critical conversion + link issues fixed
  - `/book-assessment` form has placeholder success behavior (no real submission integration)
  - Broken routes: `/admission/`, `/privacy-policy/`, `/blog/` return 404
  - Legacy CTA content still links to `/admission/` from homepage/programs
  - Local SEO: Dallas-Fort Worth geography mismatch (Cedar serves Worth, IL + Chicago South Suburbs)
  - Parent mental model: fit, trust, process clarity, schedule/budget, one obvious first step
  - Canonical funnel recommendation: "Book a Free Assessment" as primary, "two free trial sessions" as supporting offer unless business wants two separate funnels

### Team Decisions Synthesized (2026-05-07)
1. **Parent/Guardian Primary Audience** (user directive via Copilot): All design/UX/UI thinking must center on parents/guardians choosing tutoring for their child
2. **P0 Launch Blockers** (Morpheus synthesis + Mouse approval): Site should not launch until P0 blockers fixed (assessment form persistence, broken CTA routes, privacy policy, local SEO, pricing/contact sections, mobile nav, CTA hierarchy, production Lighthouse/axe/link gates)
3. **Owner Action Brief** (Morpheus priority distillation): Five P0 blockers as immediate priorities; P1/P2/P3 framed as post-P0 improvements

---

**Summary:** Foundation and architectural alignment complete. Spec v1.1/v1.2 published with all blocker resolutions. PRD review synthesized. Team decisions on audience and launch readiness captured. Ready for Wave 1 execution (CTA standardization, local SEO fix) and Wave 2 implementation (Web3Forms, pricing page, team cleanup).

---

## Wave 1 & Wave 3 Execution Phase (2026-05-07)

**Archived:** 2026-05-08T20:46:56Z  
**Reason:** history.md exceeded 15KB (18248 bytes). Wave 1 P0 execution + Wave 3 rescope work moved here; Wave 3-paused shortlist retained in active history.

### Wave 1 P0 Execution (2026-05-07)
Trinity closed P0 #2 (CTA standardization to "Book a Free Assessment"), P0 #4 (local SEO geography to "Worth, IL and the South Suburbs of Chicago"), and P0 #10 (contact cities section verification). All "Admission Form" wording and `/admission/` paths retired. Grep verification confirms zero remaining instances.

### Form Solutions Architecture & Azure SWA Recommendation (2026-05-07)
Researched 5 form handling categories: mailto, embedded widgets, hosted services, serverless relay, headless builders. Recommended Azure Static Web Apps + Functions + Resend over alternatives. Key finding: Azure SWA managed Functions auto-deploy same-origin (no CORS), free tier includes 1M executions/month.

### Cross-Review & Q1-Q5 Lock-in (2026-05-07 14:50–16:00Z)
- **Trinity's azure-setup-guide.md:** APPROVED — 6-step user-facing checklist
- **Mouse's test-plan-azure-function.md:** APPROVED WITH 4 FIXES (camelCase fields, response object not array, 2000 char limit on additionalNotes, honeypot 200 silent discard)
- **Morpheus's azure-function-submit-assessment.md:** SPEC LOCKED with all 5 open questions resolved (response envelope, ALLOWED_ORIGINS exact match, Resend email format, Retry-After forwarding, honeypot field name)
- **Decision:** Honeypot triggers 200 silent discard (industry standard)

### Wave 3 Rescope: Form + Calendar Atomic Replacement (2026-05-07 17:30Z)
Shaeel discovered duplicate-fields UX bug (Cedar form + Calendly form). Directive: drop Cedar form, use Calendly alone for now.

**Rescope decision:** Replace both form + calendar together in Wave 3 (not intermediate state). New scope preserves form spec contract, adds custom calendar (TBD: build vs OSS vs self-hosted SaaS).

**Five open questions for Wave 3 expanded scope:**
1. Custom calendar implementation approach (build, OSS library, Cal.com-style SaaS)
2. Availability & sync strategy (Google Calendar API, iCal, manual entry)
3. Concurrent slot booking prevention (DB transactions, pessimistic locking, optimistic concurrency)
4. Reminder email automation (Resend + cron, Azure Logic Apps, scheduled Function)
5. Data storage & migration (Azure Table Storage, CosmosDB, PostgreSQL)

**Concurrent decision:** Calendly-only path preserves Wave 1 P0 #2 unification. `/book-assessment` now Calendly-only; form code preserved dormant for Wave 3 foundation.

**Commits:** fe9f9ab (Wave 3 rescope spec), fb3c5f7 (Calendly-only pivot)

### Project Distillation Prompt (2026-05-07 15:45Z)
Synthesized entire Cedar project into 900-word greenfield AI prompt covering: business reality, IA, tech stack, content model, form architecture, deploy reasoning, quality bar, gotchas, delivery order. Business-first ordering forces receiving agent to internalize audience constraints before coding. "What NOT to build" section included (prevents AI over-building for small business). Corrected location to Worth, IL / Chicago South Suburbs (was Frisco TX — the P0 SEO bug).

### WordPress AI Variant Prompt (2026-05-07 15:57Z)
Produced second distillation targeting WordPress.com AI builder (not code-writing agent). Dropped all Next.js-specific noise; added visual/aesthetic direction (warm greens, earthy gold), photography guidance (real photos, no stock), plugin restraint, Calendly embed instruction, native form fields, footer hours, tel/mailto/maps links. Preserved business identity, geography, CTAs, partial pricing model, review authenticity rule.

### Wave 3 Paused — Safe Work Shortlist (2026-05-07 20:18Z)
Shaeel paused Wave 3 pending Azure provisioning. Identified four safe parallel workstreams:
1. **Housekeeping (git cleanup)** — Trinity, ~30 min, LOW RISK
2. **basePath env-gate** — Trinity, ~2 hours, LOW-MEDIUM RISK, PREREQUISITE FOR WAVE 3 — gate on DEPLOY_TARGET=github-pages (not NODE_ENV)
3. **Wave 4 P1 nav restructure** — Trinity, ~8 hours, MEDIUM RISK, serialize after basePath
4. **Wave 4 P1 mobile drawer** — Trinity, ~3 hours, LOW RISK, parallel with nav

**basePath decision:** GH Pages CI sets DEPLOY_TARGET=github-pages (basePath active); local dev/SWA unset (basePath disabled). Changes: next.config.ts (3 lines), deploy-pages.yml (1 env var).

**Learnings:**
- Rescope decisions must surface pre-work blockers early
- Public-key form services keep coming up despite appearing "less secure" — they're not traditional secrets; defense is rate limiting + honeypots + origin checks, not key secrecy
- Azure SWA managed Functions pattern is killer for static-site solo devs: drop `api/` folder, auto-deploy, same-origin routes, free tier generous
