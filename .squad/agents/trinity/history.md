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

