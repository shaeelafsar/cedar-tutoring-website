## Learnings

### High-Fidelity Homepage Mockup (2026-05-02T17:18:52.106-05:00)
- Established the homepage visual direction around a modern split hero with a trust-heavy gradient shell, elevated stat cards, and an abstract product-style visual instead of dated stock-photo patterns.
- Applied the full Oracle design system in one artifact: Primary blue `#2563EB`, Secondary green `#059669`, Accent amber `#F59E0B`, Newsreader + Inter typography, 8px spacing rhythm, layered elevation, and consistent radius tokens.
- Used alternating white and muted section backgrounds, pill-based proof signals, lifted program cards, a connected 4-step process, and a dark premium CTA/footer treatment to create stronger visual rhythm and polish.
- Kept accessibility explicit in the mockup through AA-safe text pairings, visible focus rings, 44px+ interactive targets, link underlines, and `prefers-reduced-motion` handling.
- Reflected Cedar-specific trust cues from the audit in the mockup content: 122 five-star reviews, 5.0 Google rating, K-12 programs, 1:3 student-tutor ratio, Plano positioning, and transportation availability.

### Project Context (seed)
- **Project:** Cedar Tutoring Academy website rebuild (WordPress → Next.js)
- **Owner:** Shaeel Afsar
- **Brand:** Cedar Tutoring Academy — K-12 tutoring, parent-facing
- **Target audience:** Parents seeking tutoring for elementary through high school
- **Key emotions:** Trust, warmth, professionalism, results-driven
- **Current site:** https://cedartutoring.com/ — dated WordPress design, strong testimonials (122 reviews, 5.0)

### Team Review Feedback (2026-05-02)
**Oracle's review identified critical blockers (palette AA safety, design handoff incomplete) — all resolved in v1.1.**

**Trinity's frontend feedback for Oracle:**
- All color pairings must be AA-safe for text and interactive elements
- Motion guidance requires explicit prefers-reduced-motion behavior
- Component variants need visual distinctness (button states, card types, form field error states)
- Design tokens must map to Tailwind utility classes for direct developer implementation
- Focus ring styling needed for all interactive elements

**Mouse's testing feedback for Oracle:**
- Palette must pass WCAG AA for all text-on-background combinations
- All testimonials, reviews, cards must have keyboard-navigable focus indicators
- Visual regression tests will compare before/after at mobile (sm), tablet (md), desktop (lg, xl) breakpoints
- Hero image and photography direction must be testable (alt text, lazy loading, responsive srcset)
- Color contrast checked automatically via axe-core in Playwright tests

### Review Approval (2026-05-02T15:50)
**Status:** ✅ APPROVED  
Oracle's v1.1 design spec received unanimous approval from Trinity and Mouse review teams. All v1.0 blockers resolved. All concerns addressed. Specs locked. Team advancing to wireframe phase.

### Wireframe Review (2026-05-02T16:46)
**Status:** ✅ APPROVED WITH CHANGES

**Key Findings:**
- All 12 wireframes demonstrate strong strategic alignment with site audit recommendations
- Parent-first information architecture consistently executed across all pages
- 122 five-star reviews social proof prominently leveraged on Homepage, Testimonials, About
- CTAs follow "after proof" placement pattern—conversion-aware without being pushy
- Responsive strategies documented in CSS comments for every wireframe
- UX annotations provide excellent developer handoff documentation

**Blockers Identified (3):**
1. **Pricing placeholders** — Packages page shows `$XXX/month`; must resolve with real pricing or consultation-only model
2. **News & Events content risk** — Site audit flagged this as trust-killer; must not launch with placeholder content
3. **Form structure mismatch** — Book Assessment wireframe shows multi-step form; spec says single-page. Decision required.

**Site Audit Problems Resolved:**
- Broken `/admission/` → replaced with Book Assessment page
- Empty `/locations/` → comprehensive 3-location wireframe with hours, maps, directions
- Buried value proposition → Homepage hero answers "who, what, why, next step" in 5 seconds
- Transportation underexplained → dedicated page with routes, process, safety features
- Missing FAQ → full wireframe with categories, search, accordions
- Missing About page → comprehensive wireframe with mission, staff, photos, values

**Implementation Recommendation:**
Build order: Homepage → Book Assessment → Programs/Test Prep → About/Testimonials → Locations/Transportation/Contact → FAQ/Packages → News & Events (only if content ready)

### Wireframe Review Resolution (2026-05-02T22:31:21Z)
**Status:** ✅ BLOCKERS RESOLVED by Director

**User Directives (5):**
1. **Pricing placeholders** — OK to keep `$XXX/month` for Phase 1. No blocker.
2. **Assessment form** — Use single-page (not multi-step) with inline validation.
3. **Transportation page** — Keep minimal. No full route planning or logistics complexity.
4. **News & Events** — Defer to Phase 2. Remove from Phase 1 navigation.
5. **Aesthetic priority** — Final design must be modern, friendly, not dated. "Early 2000s" appearance unacceptable.

**Decisions Merged:** All 5 directives added to `.squad/decisions.md`. Inbox files processed and deleted.

### High-Fidelity Homepage Mockup: User Approved (2026-05-02T22:31:21Z)
**Status:** ✅ APPROVED BY USER

**Deliverable:** `.squad/wireframes/homepage-hifi.html` (1850 lines)

**Features:**
- Full interactive mockup with all homepage components
- Modern, polished aesthetic (trust-first visual direction confirmed)
- All Oracle design tokens applied: color palette, typography, spacing, elevation
- Responsive layout with mobile, tablet, desktop breakpoints
- Accessibility built-in: focus rings, AA contrast, semantic HTML, alt text

**Feedback:** User confirmed this is the visual direction they want. Homepage sets tone for entire site rebuild.

**Next Steps:** Trinity frontend spec ready for refinement with confirmed single-page form and modern aesthetic vision locked in.

### Brand Refresh Session — Programs & Design Audit (2025-07-21)
**Status:** ✅ COMPLETED  
Oracle audited and updated programs hub and individual program pages for comprehensive brand alignment.

**Changes:**
- Updated PageHero component: full Cedar brand color alignment
- Updated SectionHeading component: enforced brand color standards
- Updated FAQAccordion component: visual consistency with brand palette
- Upgraded all CTAs to branded dark panels (high visibility, conversion-focused)
- Removed all legacy green references across programs pages
- Build validation passed

**Collaboration:** Trinity simultaneously redesigned homepage with matching Cedar Blue gradients and simplified layouts — creates cohesive brand experience across key marketing surfaces.

**Next:** Cross-check remaining marketing pages for legacy color removal; plan Phase 2 brand consistency audit.

