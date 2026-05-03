## Learnings

### Project Context (seed)
- **Project:** Cedar Tutoring Academy website rebuild (WordPress → Next.js)
- **Owner:** Shaeel Afsar
- **Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript
- **Current site:** https://cedartutoring.com/ (WordPress + Elementor)
- **Goal:** Modern, fast, SEO-optimized informational site. Future: customer portal.
- **Site has:** 17+ pages including services, locations, testimonials (122 Google reviews, 5.0 rating)

### Architecture Decisions (2026-05-02)
- **Rendering:** All marketing pages are SSG (static site generation) for max performance and zero server cost
- **Content storage:** File-based (MDX for programs, JSON for testimonials/FAQ/locations) — swappable to CMS later
- **Project structure:** `src/` directory with App Router, route group `(marketing)` for public pages
- **Forms:** React Hook Form + Zod validation, POST to API routes, email notification
- **Deployment:** Vercel (native Next.js, CDN edge, preview deploys)
- **Phase 2 seams:** Auth via Auth.js v5, DB via Prisma + PostgreSQL, route group `(portal)` for authenticated pages
- **SEO:** Per-page metadata exports, JSON-LD structured data components, dynamic sitemap/robots
- **Redirects:** Full 301 map from WordPress URLs handled in middleware.ts + next.config.ts
- **Testing:** Vitest (unit/integration) + Playwright (E2E, SEO, accessibility, visual)
- **9 development slices:** Foundation → Homepage → Programs → Test Prep → Trust → Logistics → Enrollment → SEO Polish → Launch

### Spec Review Resolution (2026-05-02)
Addressed 7 blockers and ~15 concerns from Trinity, Oracle, and Mouse spec reviews.

**Architecture Blueprint (v1.1):**
- Added typed content contracts (TypeScript interfaces for all MDX/JSON data shapes)
- Added full form API contracts (request/response types, option lists, Zod-based validation)
- Added spam protection strategy (honeypot + rate limiting, no CAPTCHA)
- Added privacy/consent requirements for forms
- Fixed programs hub to static grid (no client-side filtering in Phase 1)
- Fixed assessment form to single-page (resolved multi-step contradiction)

**Trinity Frontend Spec (v1.1):**
- Standardized nav breakpoint to `lg` (was inconsistently `md`/`lg`)
- Renamed CTAButton variants to `primary`/`outlined`/`ghost` (resolved secondary/outline confusion)
- Added dual-CTA support to PageHero
- Changed LucideIcon component props to `iconName: string` (safe for JSON content)
- Tightened FormField.type to union of allowed input types
- Changed LocationCard.hours to structured array (display + schema generation)
- Added Embla Carousel recommendation (lightweight, via shadcn)
- Added full `prefers-reduced-motion` behavior spec for all animations
- Added form contract details (endpoint, spam, privacy, consent)
- Referenced typed content contracts from architecture blueprint

**Oracle Design Spec (v1.1):**
- Added AA-safe color-usage matrix with corrected contrast ratios
- Darkened secondary (#059669), muted-foreground (#4B5563), success (#16A34A) to pass AA
- Documented accent as background-only (never for text)
- Added Newsreader display font recommendation
- Clarified hero into two distinct patterns (split-layout and short/muted)
- Changed testimonial text to regular weight (not italic)
- Added testimonial grid vs carousel usage rules
- Added button state tokens with full Tailwind classes
- Added card variant table, form field state tokens
- Added specs for SectionHeading, PageHero, BreadcrumbNav, ProofBar, Footer, FAQAccordion
- Added Tutor/Staff Credibility Card, Form Reassurance Panel, Center/Facility Photo Band modules
- Added page layout flows for all missing pages (About, Reviews, FAQ, Pricing, Locations, Transportation, Book Assessment)
- Added transition/animation tokens, z-index scale, overlay/scrim tokens, content-width constraints

**Mouse Testing Spec (v1.1):**
- Changed Playwright webServer from `npm run dev` to `npm run build && npm run start`
- Expanded Vitest config for App Router (globals, coverage, mocks for next/*)
- Added complete Vitest setup file with all Next.js module mocks
- Added MSW-based form/API mocking strategy with handlers and error overrides
- Added test coverage for About, Reviews, Pricing, Transportation pages
- Added 404/error page and robots.txt/sitemap tests
- Added smoke test suite, link checking tests, launch-day verification suite

### Team Review Status (2026-05-02)
- **Trinity** ⚠️ Found 2 blockers (form contracts, content contracts), approved stack
- **Oracle** ⚠️ Found 2 blockers (palette AA safety, design handoff incomplete), approved trust-first direction
- **Mouse** ❌ Did NOT approve, found 3 blockers (E2E environment, Vitest setup, form determinism)
- **Morpheus action:** Specs v1.1 published with all blocker fixes + concern resolutions

### Oracle UX Review + Alignment (2026-05-03)
Oracle completed a comprehensive UX/design review of the current website implementation. Key findings and architectural decisions:

**Brand color alignment (critical):**
- Site was using generic Tailwind blue (#2563eb) instead of Cedar's logo blue (#0d8ecf)
- `--primary` updated to Cedar Blue (#0d8ecf). **CRITICAL CONSTRAINT: fails AA on white (3.48:1) — never use as text on light backgrounds. Text-safe variant: #0a7ab8 (4.52:1).**
- `--accent` updated to Cedar Orange (#ffa725, was #f59e0b)
- Cedar Red (#d92027) introduced as `--brand-red` token — NOT replacing `--secondary`. Green secondary stays for semantic success/outcome states. This distinction is architecturally important: replacing green with red would break the UX convention that green = success/positive.

**Design consistency decisions:**
- `CTASection` is now a mandatory shared component — all pages use gradient-container treatment for final CTAs. No ad-hoc per-page CTA sections.
- `PageHero` gets `decorative` prop (default `true`) — all heroes render blurred gradient orbs. Interior pages: 1-2 smaller orbs; homepage: 2-3 larger.
- `ProcessSteps` always uses filled circles (Cedar Blue bg, white number). Bordered/outline variant removed.

**Rejected recommendations:**
- Photography: rejected for Phase 1. No assets. Phase 1.5 photo shoot planned.
- Replacing `--secondary` with Cedar Red: rejected (semantic conflict with success states).

**Spec versions after alignment:**
- oracle-design-spec.md → v1.2
- trinity-frontend-spec.md → v1.2
- morpheus-alignment-review-2026-05-03.md created (decisions record)
- decisions/inbox/morpheus-ux-alignment.md created (for decision ledger)

### Key File Paths
- `.squad/specs/architecture-blueprint.md` — Master architecture document
- `.squad/specs/trinity-frontend-spec.md` — Frontend implementation spec (v1.2)
- `.squad/specs/oracle-design-spec.md` — Design system spec (v1.2)
- `.squad/specs/mouse-testing-spec.md` — Testing spec
- `.squad/specs/oracle-ux-review-2026-05-03.md` — Oracle's UX review (input to alignment)
- `.squad/specs/morpheus-alignment-review-2026-05-03.md` — Architecture alignment review + verdicts
- `.squad/decisions/inbox/morpheus-ux-alignment.md` — Decision records for ledger
- `.squad/site-audit.md` — Comprehensive site audit (input for all decisions)

### Trinity: Programs/Test Prep Content Migration (2026-05-03)
**Status:** COMPLETE ✅

Trinity executed Slice 4 (Programs + Test Prep migration to content layer):
- **Content files created (5):**
  - `content/pages/programs-hub.json` — Programs overview hub shell
  - `content/pages/test-prep-hub.json` — Test prep hub shell  
  - `content/test-prep/sat.json`, `act.json`, `psat.json` — Detail page content
- **Type system:** Added `TestPrepPageContent` interface with shared `detailPage` shell pattern
- **Loaders:** Implemented `loadTestPrepPage()` in `src/lib/content/test-prep.ts` with Zod validation
- **Static routes:** All test-prep routes (`/test-prep`, `/test-prep/sat/act/psat`) generate at build time
- **Build status:** ✅ Passed with 0 TypeScript errors, all static params generated

**Decision record:** Trinity — Programs/Test Prep Content Shell Decision (2026-05-03)
- Hub and detail page copy stored together in typed JSON via `detailPage` objects
- Removes remaining hardcoded copy from TSX, keeps shared route templates maintainable
- Content-driven pattern validated with Zod at build time

**Impact:** Static export unblocked for test-prep routes. Ready for design review and copy approval.
