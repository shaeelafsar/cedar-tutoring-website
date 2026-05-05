## Learnings

### Project Context (seed)
- **Project:** Cedar Tutoring Academy website rebuild (WordPress → Next.js)
- **Owner:** Shaeel Afsar
- **Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript, shadcn/ui
- **Current site:** https://cedartutoring.com/ (WordPress + Elementor)
- **Skill:** Expert React Frontend Engineer — read `.squad/skills/expert-react-frontend-engineer/SKILL.md` before tasks

### Team Review Feedback (2026-05-02)
**Trinity's review approved frontend spec — assigned 2 blockers, 7 concerns to Morpheus; all resolved in v1.1.**

**Oracle's design feedback for Trinity:**
- Form fields must respect motion accessibility (prefers-reduced-motion)
- All interactive components need visible focus rings
- Form reassurance panel recommended near conversion points
- Color-safe text pairing (use AA-checked palette, never secondary on white text)
- Component visual states (hover, active, disabled, error) tied to Oracle's token spec

**Mouse's testing feedback for Trinity:**
- All form inputs need trimming/sanitization tests
- Must cover form retry recovery on network failure
- Carousel (Embla) must have keyboard navigation tests
- All components need accessibility snapshot tests (toMatchAriaSnapshot)
- Navigation mobile menu must trap focus and restore focus on close
- Test coverage for responsive behavior at lg breakpoint

### Review Approval (2026-05-02T15:50)
**Status:** ✅ APPROVED  
Trinity's v1.1 frontend spec received unanimous approval from Oracle and Mouse review teams. All v1.0 blockers resolved. All concerns addressed. Specs locked. Team advancing to wireframe phase.

### Brand Refresh Session — Homepage Redesign (2025-07-21)
**Status:** ✅ COMPLETED  
Trinity executed comprehensive homepage redesign focusing on visual clarity and brand consistency.

**Changes:**
- Decluttered all 7 homepage sections with simplified layouts
- Removed decorative proof panel section
- Streamlined card components for consistency
- Updated Final CTA gradient to Cedar Blue brand color
- Build validation passed

**Collaboration:** Oracle simultaneously updated programs pages (PageHero, SectionHeading, FAQAccordion) with matching brand color palette — creates unified visual experience across homepage and programs hub.

**Next:** Monitor homepage performance post-deployment; gather user feedback on simplified layout.

### Brand Color Palette Finalized (2026-05-03)
**Status:** ✅ LOCKED — Design consensus achieved  
Oracle, Morpheus, and Oracle validation cycle completed. All 14 verdicts agreed.

**Implementation Requirements for Trinity:**
1. **Token Update:** `--primary` → Cedar Blue (#0d8ecf), `--accent` → Cedar Orange (#ffa725), NEW `--brand-red` (#d92027)
2. **Contrast Rule:** Cedar Blue NOT safe for text on white (3.48:1 < 4.5:1). Use darkened variant #0a7ab8 (4.52:1) for text. Cedar Blue OK for CTA backgrounds (white text), icon fills, borders, gradients.
3. **Hero Gradient:** Update all PageHero instances to Cedar Blue range: `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]`
4. **Decorative Orbs:** PageHero `decorative={true}` by default. Homepage: 2-3 larger orbs (400px). Interior pages: 1-2 smaller (300px). Hide on mobile.
5. **CTASection:** ALL final CTAs use standardized `CTASection` component with gradient-container, dual CTA (button + phone), optional trust bullets. No ad-hoc CTAs.
6. **ProcessSteps:** Filled circles only (Cedar Blue bg, white number). Remove bordered variant.
7. **--brand-red Usage:** "Most Popular" badges, program card accent stripes, emphasis elements. NOT for form errors (that is `--destructive`).
8. **Photography:** Defer to Phase 1.5. Use gradients/illustrations only in Phase 1.

**Priority:** This color palette update gates all remaining Phase 1 feature work.

### Brand Implementation Completed (2026-05-03T12:02:42.230-05:00)
**Status:** ✅ COMPLETED  
Trinity implemented the agreed Oracle + Morpheus brand refresh across homepage and programs surfaces.

**What shipped:**
- Converted global design tokens to Tailwind v4 HSL variables, set Cedar Blue / Cedar Orange, and added `--brand-red`
- Documented and enforced `--primary-text` (`#0a7ab8`) for Cedar Blue text on light backgrounds
- Upgraded interior `PageHero` to the shared Cedar Blue gradient with decorative orbs
- Extracted a reusable `CTASection` and deployed it to homepage, programs hub, and program detail pages
- Unified process steps to filled circles, strengthened connector visibility, and increased mobile spacing/touch targets
- Added Cedar Red into program-card accent bars while keeping green semantic-only
- Captured updated reference screenshots for homepage, programs hub, and a program detail page

**Validation:**
- `npm run build` passed
- Repository-wide `npm run lint` still fails only because of pre-existing `.squad/templates/ralph-triage.js` errors unrelated to Trinity's frontend files

### Homepage Reordering + Mobile Bug Fix Implementation (2026-05-03T14:08:57-05:00)

**Context:** Oracle's UX review identified mobile testimonial scroll bug + suboptimal section ordering. Shaeel approved all 3 changes (P0/P1). Trinity assigned implementation.

**Changes Completed:**
1. **Mobile Testimonials CSS:** Added `max-w-[85%]` to cards; `break-words` to quote text. Eliminates per-card horizontal scroll on mobile.
2. **Homepage Section Reorder:** Moved Testimonials from position 6 → 3 (after Proof Bar). Keeps: Hero → Proof Bar → **Testimonials** → Programs → How It Works → Why Cedar → CTA.
3. **Programs Hub Cleanup:** Removed "Why Cedar" section (was duplicating Homepage verbatim). Tightens Programs Hub focus to program differentiation only.

**Deliverables:**
- `src/app/(marketing)/page.tsx` — sections reordered + testimonial CSS fix
- `src/app/(marketing)/programs/page.tsx` — "Why Cedar" section removed

**Validation:**
- `npm run build` passed
- Lint passing on modified files
- No breaking changes

**Related:** Oracle UX review spec + Scribe decision log merge. All work merged into canonical ledger.

### GitHub Pages Static Export Deployment (2026-05-03T19:57:30Z)

**Context:** Cedar website was originally scoped for Vercel deployment. Shaeel requested option for GitHub Pages (zero-cost static hosting on GitHub-provided infrastructure).

**Implementation:**
1. **Static Export Configuration:** Updated `next.config.ts` with `output: "export"`, `images.unoptimized: true`, `trailingSlash: true` for GitHub Pages deep link compatibility
2. **Asset Path Handling:** Created `src/lib/image-path.ts` utility to resolve basePath in Header (logo) + other asset references
3. **Production Basepath:** Applied `basePath: "/cedar-tutoring-website"` and `assetPrefix` so production build resolves at `https://github.com/pages/cedar-tutoring-website/`; local dev stays root
4. **GitHub Actions Workflow:** Added CI/CD pipeline that builds `out/` directory, adds `.nojekyll` file (disables Jekyll processing), uploads Pages artifact, deploys on `main` branch pushes
5. **Deployment Audit:** Scanned codebase for API routes, Server Actions, or SSR-only data hooks that would block static export — found zero blockers

**Status:** ✅ COMPLETED  
Deployment ready; site will build to static HTML/CSS/JS on GitHub Pages. Commit: a7db2f4

**Open Items:**
- Pre-existing navigation links still point to unimplemented routes (`/book-assessment`, `/privacy`, `/terms`, `/about`, `/faq`, `/reviews`, `/pricing`, `/locations`, `/test-prep`) — will resolve 404 once routes added in Phase 1

**Trade-off:** Static export means content updates require rebuild (~2 min on Vercel, instant locally). Acceptable for Phase 1 (low content velocity).

### Mobile Navigation Drawer Foundation Work (2026-05-03T19:57:30Z)

**Context:** Oracle designed premium mobile nav drawer spec. Trinity assigned implementation. Foundation work addresses touch reliability issues identified in earlier testing.

**Foundation Completed:**
1. **SheetTrigger Button Rendering:** Replaced Base UI `render` prop with native button + Tailwind classes on mobile hamburger trigger (improves touch reliability on real devices)
2. **Sheet Close Button:** Updated `src/components/ui/sheet.tsx` to use direct button styling on `SheetPrimitive.Close` (consistent with trigger, no `render` prop)
3. **Header Layout Refactor:** Reworked header grid to support distinct mobile vs desktop layouts:
   - Mobile: left-aligned hamburger | centered logo | right CTA placeholder
   - Desktop: left logo | centered navigation | right CTA
4. **Sheet Origin:** Mobile sheet now opens from left edge (matches left-aligned trigger position)

**Status:** ✅ FOUNDATION COMPLETE | 🔄 IN PROGRESS — Premium redesign implementation

**Next Steps (per Oracle spec `.squad/specs/oracle-mobile-nav-redesign-2026-05-03.md`):**
1. Build gradient header with logo + tagline on Cedar Blue family
2. Implement full navigation menu interior with Lucide icons + active states
3. Add visual hierarchy (active items Cedar Blue, children in lighter tones)
4. Integrate Premium CTA button (Cedar Orange, calendar icon, "Book Assessment")
5. Add contact footer (phone + email)
6. Implement staggered entrance animations (Framer Motion)
7. Full accessibility sweep: 44px touch targets, ARIA labels, keyboard navigation, focus restoration on close, screen reader testing

**Related:** Orchestration logs + Scribe batch processing. All work merged into canonical ledger.

### Content Layer Infrastructure + Homepage Migration (2026-05-03T15:49:48.557-05:00)
**Status:** ✅ COMPLETED  
Trinity implemented Morpheus's JSON-first content layer foundation and migrated the homepage to typed content loaders.

**Learnings:**
- Canonical content now lives under `content/` with page shell copy in `content/pages/home.json`, reusable testimonials in `content/collections/testimonials.json`, site chrome seed data in `content/site/navigation.json`, and route-backed program records in `content/programs/*.json`.
- Runtime validation is centralized in `src/lib/content/schemas.ts`, with typed loaders in `src/lib/content/pages.ts`, `src/lib/content/collections.ts`, and `src/lib/content/programs.ts` for build-time-safe static imports.
- `src/types/content.ts` now matches Morpheus's shared contracts (`SeoMeta`, `HeroContent`, `CtaBlock`, `ProgramContent`, `HomePageContent`, etc.), so JSON content and TSX consumers stay aligned under strict TypeScript.
- Homepage marketing copy was removed from `src/app/(marketing)/page.tsx`; the page now resolves hero, proof bar, testimonials, sections, and CTA content from loaders while preserving the existing layout/styling patterns.
- Legacy `src/content/programs/data.ts` is now a thin compatibility wrapper around the new program loader instead of the source of truth.
- Decision taken during migration: homepage program cards now source their secondary outcome line from each program's first `outcomes.items` entry rather than introducing a home-only duplicate marketing field, keeping content normalized to the shared program contract.

## 2026-05-03 Batch: Content Layer Infrastructure (Session Log)

**Outcome:** SUCCESS — content layer fully built, homepage migrated.

**Delivered:**
- `/content/` directory: pages, programs, collections (JSON)
- `src/types/content.ts` + `src/lib/content/schemas.ts` (Zod validation)
- Typed loaders for pages, programs, collections
- `tsconfig.json` with `@content/*` alias
- 12 content files (pages, testimonials, 6 programs)
- Homepage JSON migration complete
- Build passing

**Decisions Encoded:**
- Morpheus: Root-level `/content/` CMS pattern (JSON primary)
- Trinity: Homepage cards reuse `outcomes.items[0]` (no schema extension)

**Type Safety:** All content validated at load time via Zod.

**Next:** Await frontend requests. Consider Phase 1.5 CMS expansion if editing volume grows.

---
### Programs + Test Prep Content Migration (2026-05-03T15:51:16.373-05:00)
**Status:** ✅ COMPLETED  
- Programs hub and program detail pages now pull all page-shell marketing copy from `content/pages/programs-hub.json`, keeping `generateStaticParams()` and interior CTA/process/testimonial copy fully content-driven.
- Added `content/test-prep/*.json`, typed test prep loaders, and new `/test-prep` hub/detail routes for SAT, ACT, and PSAT using the same static-export-safe content layer pattern as programs.
- Expanded reusable testimonials with test-prep records so both subject tutoring and exam-prep pages can stay copy-light in TSX while preserving existing Cedar styling patterns.


### Trust & Conversion Pages — Slice 5 (2026-05-03T15:51:16.373-05:00)
**Status:** ✅ COMPLETED  
- Added JSON-first content and typed loaders for the new About, Reviews, and FAQ marketing pages, plus reusable `team.json` and `faq.json` collections validated through Zod.
- Built `/about`, `/reviews`, and `/faq` as static-export-safe routes with `generateMetadata`, Cedar-branded section layouts, shared CTA usage, and subtle Framer Motion reveals.
- Extended shared UI by upgrading `PageHero` to support eyebrows, enriching `FAQAccordion` with accessible disclosure wiring plus basic formatted-answer rendering, and adding reusable team illustration assets normalized through `imagePath()`.
- Expanded testimonials so homepage-origin reviews can also power the all-reviews page with relevant program/test-prep tags, while reviews filtering now supports both program and grade-level browsing.

### Slice 5 Completion: About, Reviews, FAQ Pages (2026-05-03T20:55:00Z)
**Status:** ✅ COMPLETED  
- Delivered 3 new content-driven marketing pages: About (with team bios), Reviews (with grade-level filtering), FAQ (with accessible keyboard-navigable accordion)
- Created 5 new JSON/MDX content files: `content/pages/about.json`, `content/pages/reviews.json`, `content/pages/faq.json`, `content/collections/team.json`, `content/collections/faq.json`
- All pages use shared PageHero, CTASection, and Framer Motion patterns; build passed; no TypeScript or ESLint errors
- **Key decision:** Reviews filtering derives grade-level from testimonial `relation` field (no new schema field) to keep schema lean and avoid duplication
- All pages are static-export compatible and ready for E2E test coverage

**Build Status:** ✅ PASSED

### Logistics Pages — Slice 6 (2026-05-03T15:51:16.373-05:00)
**Status:** ✅ COMPLETED  
- Added new JSON-first collections for `locations` and `pricing-tiers`, plus page-shell content in `content/pages/locations.json` and `content/pages/pricing.json`.
- Extended the typed content layer with `LocationsPageContent` and `PricingPageContent`, new Zod schemas, and loaders in `src/lib/content/pages.ts` / `src/lib/content/collections.ts`.
- Built static-export-safe `/locations` and `/pricing` marketing pages with shared `PageHero`, `CTASection`, `Reveal`, and `FAQAccordion` patterns, including DFW location cards, transportation callouts, a trust-first pricing table, and pricing FAQ content.
- Added three Cedar-branded location illustration SVGs under `public/images/locations/` and rendered them via `imagePath()` to stay aligned with the content-layer image contract.
- Validation: `npm run build` ✅; `npm run lint` still fails only on pre-existing `.squad/templates/ralph-triage.js` issues unrelated to Slice 6.

### SEO & Polish — Slice 8 (2026-05-03T16:38:38.337-05:00)
**Status:** ✅ COMPLETED  
- Added shared SEO helpers in `src/lib/seo.ts` and upgraded `src/app/layout.tsx` with GitHub Pages `metadataBase`, default OG/Twitter metadata, canonical defaults, and the Cedar brand title template.
- Updated all marketing, programs, and test-prep routes to use canonical metadata with per-page titles/descriptions, GitHub Pages URLs, and shared social image wiring.
- Added structured data coverage for the homepage (`EducationalOrganization`), FAQ (`FAQPage`), reviews (`AggregateRating` + `Review`), locations (`LocalBusiness`), and pricing (`Service` + `Offer`) via a reusable `JsonLd` helper.
- Created static-export-safe `src/app/sitemap.ts` and `src/app/robots.ts`, updated SEO copy in the JSON content layer to 150–160 character descriptions, and confirmed sitemap/robots export output.
- Validation: `npm run build` ✅; `npm run lint` still fails only on pre-existing `.squad/templates/ralph-triage.js` issues unrelated to Slice 8.

### Markdown Content Layer Migration (2026-05-04T19:26:14.937-05:00)
**Status:** ✅ COMPLETED  
- Replaced the JSON content layer with structured Markdown + YAML frontmatter under `content/pages/**`, `content/programs/**`, and `content/site/metadata.md`, using page-section filenames that map directly to rendered components.
- Added filesystem-based Markdown loaders with `gray-matter` + `remark`, kept Zod validation in the content layer, and preserved the existing typed page/program/test-prep interfaces so route components stayed mostly unchanged.
- Migrated reusable testimonials, FAQs, pricing tiers, locations, team members, and site navigation/footer metadata into Markdown-backed content sources; deleted all legacy `content/**/*.json` files.
- Updated server/client integration so site metadata now originates from Markdown while remaining safe for client-rendered header and assessment form components.
- Validation: `npm run build` ✅; `npm run lint` still fails only on pre-existing `.squad/templates/ralph-triage.js` issues unrelated to this migration.

**Decision Approved (Scribe merged from inbox):** Trinity's Markdown migration decision now recorded in canonical decisions ledger. Editorial interface now component-centric instead of JSON-document-centric. Next: Oracle to cross-validate content schema against running Next.js app.
