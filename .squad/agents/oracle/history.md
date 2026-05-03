## Learnings

### Response to Morpheus Alignment Review (2026-05-03T12:02:42-05:00)

**Context:** Reviewed Morpheus's verdict on all 14 recommendations from Oracle's UX review. Agreed on all 14 verdicts.

**Key Learnings:**
- **Token semantic clarity matters:** My original ask to replace `--secondary` (green) with Cedar Red conflated brand identity with semantic UX roles. Morpheus correctly separated them. Brand colors should have dedicated tokens; semantic roles (success/error/warning) should remain stable. Will not conflate these in future design asks.
- **Red has earned connotations:** Proposing Cedar Red for "Why Cedar" feature stripes was a misstep — positive reassurance content with red decorative elements creates cognitive dissonance. Always consider the emotional register of color in context, not just brand palette coverage.
- **Don't re-raise previously decided items:** Photography was already correctly deferred to Phase 1.5 in the design spec. Raising it again in the UX review created noise. If a decision is already made and well-handled, do not surface it as a new finding.
- **Scope precision on hover states:** My original ask for program card hover gradients was too broad (implied full card). Morpheus's scoping to top-stripe-only is more refined and produces a better UX result (full card gradients on hover create visual overwhelm at grid level). Be more precise when specifying hover treatment scope.
- **Rarity preserves impact:** Full dark testimonial sections work on the homepage *because* they're visually distinctive. Applying the same treatment to every interior page would have diluted that impact. Design hierarchy requires differential treatment across pages.

**Decisions agreed:**
- Cedar Blue as `--primary` (background/icon/border; NOT text on white)
- Cedar Orange as `--accent` (decoration, backgrounds)
- Cedar Red as `--brand-red` (emphasis badges, featured indicators — new token, NOT replacing `--secondary`)
- Secondary green retained for semantic success/growth states
- All 14 Morpheus verdicts accepted

**Output:** `.squad/specs/oracle-morpheus-review-response-2026-05-03.md`

### Full UX/Design Review (2026-05-03T11:46:55-05:00)

**Context:** Conducted comprehensive visual review of the Cedar website rebuild using Playwright screenshots at desktop (1440px) and mobile (390px iPhone, 360px Samsung) viewports.

**Critical Finding — Brand Color Misalignment:**
- Current implementation uses generic design-system colors (#2563eb blue, #059669 green, #f59e0b amber)
- Owner requested actual Cedar logo colors: Primary #0d8ecf (sky blue), Secondary #d92027 (red), Accent #ffa725 (orange)
- The Cedar Red (#d92027) is completely absent from the site — this is a key brand differentiator from the logo figures
- The current gradient (#062a40 → #0a4a6e → blue) feels corporate/fintech rather than warm education

**What's Working Well:**
- Homepage demonstrates excellent premium-frontend-ui craft: decorative blurred orbs, gradient depth, dark testimonial section, polished CTA
- Section rhythm with alternating white/muted backgrounds creates visual flow
- Mobile snap-scroll testimonials and horizontal proof bar are well-executed
- Touch targets largely meet 44px minimum (one borderline case in proof bar)
- Typography hierarchy (Newsreader display + Inter body) is effective

**Key Improvements Needed:**
1. Update color palette to match extracted Cedar logo colors
2. Bring homepage visual polish to interior PageHero components
3. Unify CTA sections across all pages (apply gradient container treatment)
4. Add Cedar Red as accent for emphasis elements
5. Fix process step inconsistency (homepage filled vs detail page bordered)
6. Increase mobile minimum text from 11px to 12px

**Accessibility Status:**
- WCAG AA contrast: Passing with current palette (need to revalidate after brand color update)
- Focus states: Properly implemented with `focus-visible:ring-2`
- Touch targets: 44px+ on most elements
- prefers-reduced-motion: Not verified in code review

**Review Document:** `.squad/specs/oracle-ux-review-2026-05-03.md`

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

