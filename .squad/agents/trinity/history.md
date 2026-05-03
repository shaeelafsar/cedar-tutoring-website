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

