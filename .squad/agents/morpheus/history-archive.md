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
