## Learnings

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

