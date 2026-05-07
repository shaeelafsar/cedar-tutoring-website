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

### PRD-Ready Website Review (2026-05-07T10:22:32.063-05:00)
**Status:** COMPLETE — business/content/navigation notes written to `.squad/reviews/morpheus-prd-ready-review-notes.md`.

**Key findings:**
- Site is near launch-ready visually/content-wise, but not PRD-ready until critical conversion and launch-link issues are fixed.
- Highest business risk: `/book-assessment` form currently has placeholder success behavior and no real submission integration.
- Broken internal routes found during local Playwright review: `/admission`, `/privacy-policy`, and `/blog` return 404.
- Legacy CTA content still links to `/admission/` from homepage/programs final CTA content.
- Local SEO contains a geography mismatch: shared SEO/structured data references Dallas-Fort Worth while Cedar serves Worth, IL and Chicago South Suburbs.
- Parent mental model should prioritize fit, trust, process clarity, schedule/budget, and one obvious first step.
- Recommended canonical funnel: make “Book a Free Assessment” the primary first step and position “two free trial sessions” as a benefit within that flow unless the business intentionally wants two separate funnels.

**Useful paths:**
- `.squad/reviews/morpheus-prd-ready-review-notes.md` — Morpheus synthesis input.
- `.squad/reviews/morpheus-runtime-summary.json` — local route/status/content summary from Playwright review.
- `content/site/metadata.md` — primary nav/footer metadata; contains deferred footer links in frontmatter.
- `content/pages/home/cta.md` and `content/programs/_hub.md` — still point CTA hrefs to `/admission/`.
- `src/app/(marketing)/book-assessment/BookAssessmentPageClient.tsx` — form currently has placeholder submission TODO.
- `src/lib/seo.ts` and `src/app/(marketing)/page.tsx` — SEO/structured-data geography should be corrected before launch.


### PRD-Ready Final Review Synthesis (2026-05-07T10:22:32.063-05:00)
- Created final parent/guardian launch-readiness artifact: `prd-ready-review-gpt.md`.
- Key launch-readiness themes: site direction is strong and premium, but not PRD-ready until assessment form persistence, broken `/admission/` CTA/route, privacy policy, local SEO geography, pricing/contact unfinished sections, mobile nested navigation, CTA hierarchy, and production Lighthouse/axe/link gates are fixed.
- Recommended funnel principle: make **Book a Free Assessment** the canonical first step and treat free trial as a supporting offer unless the owner intentionally wants two separate conversion paths.

### Team Decision: Parent/Guardian Primary Audience (2026-05-07T10:13:08.554-05:00)
**Captured by:** Coordinator (Copilot Directive)  
Shaeel Afsar captured a team directive: whenever designing/UX/UI, ensure the team is always thinking from the target audience perspective. For Cedar, treat parents/guardians choosing tutoring for their child as the primary audience. This directive is now recorded in `.squad/decisions.md` for team reference.

### Team Decision: P0 Launch Blockers Synthesis + Approval (2026-05-07T10:22:32.063-05:00)
**Decision by:** Morpheus (synthesis) + Mouse (final verdict: APPROVED)  
Morpheus synthesized all Oracle/Mouse/Morpheus findings into `prd-ready-review-gpt.md` and proposed a binding decision: the site should not launch until P0 blockers are fixed. Primary funnel canonical step: "Book a Free Assessment"; treat "Free Trial" as supporting offer unless business wants two separate funnels. Mouse reviewed final artifact and approved it as complete and accurate. Decision recorded in `.squad/decisions.md`: three decisions captured (user directive, synthesis, and approval verdict).

### Session Work: Owner Action Brief Priority Synthesis (2026-05-07T11:10:33.863-05:00)
**By:** Morpheus (sync spawn)  
**Reviewed by:** Mouse (sync reviewer gate) — APPROVED  
Morpheus distilled `prd-ready-review-gpt.md` into a concise owner-facing action brief, surfacing five P0 launch blockers as immediate priorities and framing P1/P2/P3 work as post-P0 improvements. Mouse approved the brief as business-readable, focused, and consistent with full audit. Decision captured in `.squad/decisions.md` and merged by Scribe. Team now has canonical owner escalation path with clear fix order.

### Wave 1 P0 Execution: CTA & Local SEO Standardization (2026-05-07T11:31:02-05:00)
**Executed by:** Trinity (Frontend Dev)  
**Status:** ✅ CLOSED (3 of 10 P0 items)  
Trinity closed P0 #2 (CTA standardization), P0 #4 (local SEO geography), and P0 #10 (contact cities status). All "Admission Form" wording retired across content/ + src/; canonical CTA is "Book a Free Assessment" → `/book-assessment/`. All "Dallas-Fort Worth" references replaced with "Worth, IL and the South Suburbs of Chicago" in metadata and visible copy. Contact cities section verified complete. Grep verification confirms zero remaining instances of retired text/paths. tsc --noEmit clean. Decisions captured in `.squad/decisions.md`. Team should proceed to P0 #1, #3, #5–#9 in next waves.

### WP Pricing Extraction: /plans/ Research (2026-05-07T11:40:51-05:00)
**By:** Morpheus (Lead/Architect)  
**Status:** COMPLETE — research only. Trinity to implement once Shaeel approves proposed structure.

**What the live WP site actually publishes:**

The `/plans/` page is a static Elementor page with three service cards (not tabs, not modals — plain cards with a "More Info" button each). Each "More Info" routes to a dedicated sub-page. HTML was brotli-compressed but fully static — no JS-gated content.

#### Tier 1: As-Needed Tutoring
- **URL:** `/hourly-tutoring/`
- **Price:** **$40/hour** ← only hard price on the entire site
- **Commitment:** None. Reserve only sessions you need.
- **Booking lead time:** 48-hour notice before each session.
- **CTA on detail page:** "Book a Free Consultation Now"

#### Tier 2: Family Plans
- **URL:** `/family-plans/`
- **Price:** **NOT PUBLISHED** — no number anywhere on the page or sub-page
- **Description:** Purchase a block of monthly sessions usable any time within that month. Any registered child in the family can use the hours.
- **Commitment:** Monthly. Sessions expire at month end (implied by "within that month").
- **Booking lead time:** 48-hour notice before each session.
- **CTA on detail page:** "Book a Free Consultation Now" (no price — consultation gated)

#### Tier 3: Academic Coaching
- **URL:** `/homework`
- **Price:** **NOT PUBLISHED** — described only as "an affordable monthly package"
- **Description:** K-12. Math, reading, writing, science, Arabic. Homework help + independent learning skills. School-aligned curriculum approach. Individualized instruction.
- **Commitment:** Monthly package (implied recurring).
- **CTA on detail page:** "Book a Free Consultation Now" + "Plans Available" (links back to /plans/)

#### Bonus: Test Prep (SAT/ACT)
- **URLs:** `/sat/`, `/act/`
- **Price:** **NOT PUBLISHED** — referred to only as "competitive monthly packages" on the `/free-trial/` page
- **The three free-trial categories** (from `/free-trial/`) are: Academic Coaching, Advancement & Test Prep, Personalized Tutoring — each explicitly says "COMPETITIVE MONTHLY PACKAGES"

#### Transportation (Not a pricing tier)
- Appears as a fourth card on `/plans/`
- Free within 5-mile radius; fee presumably applies beyond that but not stated
- The "More Info" link is broken: `href="http://transportation"` — a WP misconfiguration

**Structural observation — Elementor patterns used:**
- Three-column Elementor grid (33% / 33% / 33%) at top of /plans/
- Each card: heading, paragraph copy, Elementor button widget ("elementor-button-danger" styling = red button)
- No pricing tables, no accordion/tabs, no JS-loaded content — all plain static HTML
- A fourth full-width row below the three cards holds the Transportation section
- All "More Info" buttons are standard anchor tags (not JS event handlers)

**Critical finding:** The WP site uses a **partial pricing disclosure model**: publish the entry-level hourly rate ($40), hide monthly/package rates behind consultation. This is a deliberate sales tactic — get parents on a call before quoting recurring spend. The new /pricing page should respect this intent rather than override it with invented numbers.

