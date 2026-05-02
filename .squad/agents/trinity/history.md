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

