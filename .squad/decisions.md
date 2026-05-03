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

### 2026-05-03: Cedar Blue as primary color
**By:** Morpheus (Lead/Architect)
**What:** Update `--primary` to Cedar Blue (#0d8ecf, `hsl(199 87% 43%)`).
**Why:** Owner-mandated brand alignment. Current #2563eb is generic Tailwind blue, not Cedar's logo color.
**Constraint:** Cedar Blue (#0d8ecf) has 3.48:1 contrast on white — FAILS WCAG AA for normal text. Use only as: CTA backgrounds (white text on top), icon fills, borders, hero gradients. For text on light backgrounds, use text-safe variant #0a7ab8 (~4.52:1).

### 2026-05-03: Cedar Orange as accent color
**By:** Morpheus (Lead/Architect)
**What:** Update `--accent` to Cedar Orange (#ffa725, `hsl(38 97% 57%)`).
**Why:** Owner-mandated brand alignment. Current #f59e0b is close but not the exact logo color.
**Constraint:** Background/decoration only — never text on light backgrounds. Proof Bar, star fills, highlight badges.

### 2026-05-03: Cedar Red as --brand-red token (NOT replacing --secondary)
**By:** Morpheus (Lead/Architect)
**What:** Introduce Cedar Red (#d92027) as a new `--brand-red` design token. `--secondary` green (#059669) is retained for semantic success/outcome states.
**Why:** Oracle recommended replacing `--secondary` with Cedar Red. This was rejected: `--secondary` carries semantic meaning (success checkmarks, credential chips, growth indicators) that red would violate (red = danger in UX). Cedar Red is a brand color, not a success indicator. Green stays semantic; red becomes brand accent.
**Usage of --brand-red:** "Most Popular" badges on pricing, program card accent stripes, emphasis brand elements. NOT for form validation errors (that is `--destructive`).

### 2026-05-03: Hero gradients updated to Cedar Blue family
**By:** Morpheus (Lead/Architect)
**What:** Approved gradient formula: `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]`. The old dark fintech gradient (#062a40 → #0a4a6e) is deprecated.
**Why:** Cedar is a warm, friendly tutoring center — not a SaaS fintech product. Cedar Blue gradient signals trustworthy education brand.

### 2026-05-03: Decorative orbs required on all PageHero instances
**By:** Morpheus (Lead/Architect)
**What:** PageHero renders decorative blurred orbs by default (`decorative={true}`). Homepage: 2-3 larger orbs (400px). Interior pages: 1-2 smaller orbs (300px). Hidden on mobile for performance.
**Why:** Interior page heroes were flat and inconsistent with homepage quality. Orbs are CSS-only, zero bundle impact.

### 2026-05-03: CTASection standardized as mandatory shared component
**By:** Morpheus (Lead/Architect)
**What:** All final CTA sections on all pages use the `CTASection` shared component with gradient-container, decorative circles, dual CTA (button + phone), and optional trust bullets. Per-page ad-hoc CTAs are not permitted.
**Why:** Interior page CTAs were rated 3/5 vs homepage 5/5. Standardizing on the gradient-container pattern raises conversion quality across the entire site.

### 2026-05-03: ProcessSteps — filled circles only
**By:** Morpheus (Lead/Architect)
**What:** ProcessSteps component always uses filled circles (Cedar Blue background, white number). The bordered/outline variant is removed.
**Why:** Homepage and detail page process steps were visually inconsistent. Filled circles are more visually impactful and consistent with the homepage.

### 2026-05-03: Photography deferred to Phase 1.5
**By:** Morpheus (Lead/Architect)
**What:** No photography (real or stock) in Phase 1. Gradient/illustration fallbacks as specced. Phase 1.5 photo shoot planned.
**Why:** No real assets exist. Stock photography would harm brand credibility (per oracle-design-spec.md). Out of Phase 1 scope.

### 2026-05-03: Oracle decision review — all 14 verdicts accepted
**By:** Oracle (UX/Design)
**Status:** AGREED — all 14 Morpheus alignment decisions accepted
**Summary:** Cedar Red as `--brand-red` (not replacing `--secondary`), hero gradient Cedar Blue range, Cedar Orange as `--accent`, PageHero decorative orbs default true, CTASection as universal shared component, ProcessSteps filled circles only, program card stripe Cedar Blue only, interior testimonials on muted background with gradient stripe (not full dark section), photography deferred to Phase 1.5, plus 4 additional design consistency points. All Oracle color constraints enforced: Cedar Blue NOT text-safe on white (use #0a7ab8 variant), Cedar Orange background/decoration only, Cedar Red emphasis/featured contexts only.

### 2026-05-03: Homepage Section Reordering & Mobile Testimonial Fix
**By:** Oracle (UX/Design) via Shaeel approval
**Status:** APPROVED
**What:** 
1. Fix horizontal scroll bug in testimonials on mobile by adding `max-w-[85%]` to cards + `break-words` to quote text
2. Reorder homepage sections: move Testimonials from position 6 to position 3 (after Proof Bar)
3. Remove "Why Cedar" section from Programs Hub (duplicates Homepage)
**Why:** Social proof is trust driver #1 for local service businesses. Mobile users rarely scroll to position 6. Removes cross-page redundancy.
**SEO Impact:** Neutral to positive (content preserved, engagement improves).
**Implementation:** Trinity (Frontend Engineer)
**Spec:** `.squad/specs/oracle-homepage-reorder-review-2026-05-03.md`

### 2026-05-03: Brand Implementation — Color Tokens & Component Standardization
**By:** Trinity (Frontend Engineer)
**Status:** COMPLETED
**What:** Implemented Oracle + Morpheus brand alignment:
1. Added `--primary-text` token (#0a7ab8) for AA-safe Cedar Blue text on light backgrounds
2. Standardized CTASection as universal final-CTA component (gradient, dual-CTA, trust bullets)
3. Applied Cedar Red as decorative accent in program-card top stripes (not replacing semantic green)
4. Updated PageHero with Cedar Blue gradient + lighter decorative orbs (interior pages parity with homepage)
**Impact:** Brand consistency across all marketing surfaces. No breaking changes.

### 2026-05-03: Mobile navigation hamburger — verified working
**By:** Mouse (QA)
**What:** The reported hamburger-menu failure on mobile is not reproducible in current Cedar codebase at 375x812 viewport.
**Evidence:** Playwright regression test (`tests/mobile-nav.spec.ts`) clicks "Open navigation menu" button, verifies sheet opens, passes locally with before/after screenshots.
**Code impact:** No code changes required; SheetTrigger + Base UI `render` already functioning.
**QA note:** Separate 404 issues found: `/about`, `/reviews`, `/pricing`, `/locations`, `/faq`, `/test-prep`, `/book-assessment` — navigation destinations not yet implemented.

### 2026-05-03: Mobile Navigation Drawer Premium Redesign
**By:** Oracle (UX/Design)
**Status:** APPROVED
**What:** Redesign mobile nav from plain white text-only menu to premium branded experience with icons, gradients, animations, and contact info.
**Redesign includes:**
1. Branded header (Logo + tagline on subtle blue gradient)
2. Iconography (Lucide icons for every nav item)
3. Visual hierarchy (Active states Cedar Blue, children styled distinctly)
4. Premium CTA (Cedar Orange button with calendar icon)
5. Contact footer (Phone and email for quick access)
6. Motion (Staggered entrance animation, Framer Motion)
7. Accessibility (44px touch targets, proper contrast, focus states)
**Why:** Current nav lacks brand presence; premium redesign reinforces Cedar's positioning on mobile.
**Development:** ~2-3 hours for Trinity; Framer Motion already in project.
**Spec:** `.squad/specs/oracle-mobile-nav-redesign-2026-05-03.md`

### 2026-05-03: GitHub Pages static export deployment
**By:** Trinity (Frontend Engineer)
**Status:** COMPLETED
**What:** 
1. Enabled static export with `output: "export"` and `images.unoptimized: true`
2. Added `trailingSlash: true` for deep link compatibility
3. Applied `basePath` and `assetPrefix` for production (site resolves under `/cedar-tutoring-website` on GitHub Pages; local dev stays root)
4. GitHub Actions workflow: builds `out/`, adds `.nojekyll`, uploads Pages artifact, deploys on `main` pushes
**Audit:** No API routes, server actions, or SSR-only hooks blocking GitHub Pages deployment.
**Open:** Pre-existing links still point to unimplemented routes (`/book-assessment`, `/privacy`, `/terms`, `/about`, `/faq`, etc.) — static 404 until implemented.

### 2026-05-03: Mobile Sheet trigger native button rendering
**By:** Trinity (Frontend Engineer)
**Status:** COMPLETED
**What:**
1. Replaced mobile `SheetTrigger` in `Header.tsx` with native button rendering + Tailwind classes (removed Base UI `render` prop)
2. Updated `src/components/ui/sheet.tsx` close control to direct button styling on `SheetPrimitive.Close`
3. Reworked header layout: mobile (left hamburger, centered logo, right CTA), desktop (left logo, centered nav, right CTA)
4. Mobile sheet opens from left to match trigger placement
**Why:** Improves real-device touch reliability on mobile.
**Related to:** Oracle mobile nav redesign spec (foundation for premium redesign).

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction

### 2026-05-03: Root-level /content/ file-based CMS pattern
**By:** Morpheus (Lead/Architect)
**Requested by:** Shaeel Afsar
**Status:** APPROVED
**What:** 
1. Adopt **JSON** as default format for structured marketing content.
2. **MDX** reserved for long-form narrative bodies (starting with About page).
3. Pages consume content through **typed server-side loaders** in `src/lib/content/*`.
4. Content contracts in `src/types/content.ts`, enforced with **Zod validation**.
5. All content image paths root-relative, normalized through `imagePath()` before rendering.
**Scope — Move into /content/:**
- Homepage shell content
- Programs hub shell content
- Program detail content
- Test prep detail content
- FAQ page content
- Pricing tiers
- Testimonials/reviews
- Locations
- Team bios
- Navigation/footer content
**Keep in TypeScript:**
- Rendering logic
- Component composition
- Icon resolution helpers
- API/form validation enums
- Technical constants
**Why:** 
- Removes hardcoded copy from TSX without CMS overhead
- Works cleanly with `output: 'export'` and GitHub Pages
- Editing approachable for small-business workflow
- Centralizes validation, filtering, slug handling
- Clean seam for future CMS if needs grow
**Consequences:**
- Cleaner TSX, better type safety, easier copy review, straightforward `generateStaticParams()`
- Trade-off: Copy edits still require commit/deploy, MDX requires minimal setup, file count increases
**Implementation:** Trinity (Frontend Dev) — content/site, content/collections, content/pages, content/programs, content/test-prep. Expand src/types/content.ts. Add src/lib/content/schemas.ts and typed loaders.

### 2026-05-03: Homepage program cards — reuse outcomes.items[0] for marketing line
**By:** Trinity (Frontend Engineer)
**Status:** IMPLEMENTATION DECISION
**What:** Homepage program cards reuse each program record's first `outcomes.items` entry for lower supporting line instead of adding separate home-only field.
**Why:** 
- Keeps homepage marketing copy fully content-driven with zero hardcoded TSX copy
- Avoids duplicating near-identical outcome messaging across `home.json` and `programs/*.json`
- Preserves Morpheus's shared `ProgramContent` contract without one-off extensions
**Impact:**
- Program detail pages and homepage cards share source-of-truth outcome language
- If future design needs distinct homepage-only line, team revisits schema intentionally
- No schema extension required for Phase 1

### 2026-05-03T15:51:16-05:00: Programs/Test Prep Content Shell Decision
**By:** Trinity (Frontend Engineer)
**Status:** APPROVED
**What:** Store hub-page copy and reusable detail-page shell copy together in `content/pages/programs-hub.json` and `content/pages/test-prep-hub.json` via typed `detailPage` objects.
**Why:** This removes the remaining marketing copy from TSX without scattering one-off JSON files across the repo, while keeping the shared route templates easy to maintain.
**Impact:** Future copy edits for programs and test prep stay centralized, static export remains build-time safe, and section headings/process/CTA language can evolve without touching React layout code.
