## Learnings

### Project Context (seed)
- **Project:** Cedar Tutoring Academy website rebuild (WordPress → Next.js)
- **Owner:** Shaeel Afsar
- **Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript
- **Test stack:** Vitest, React Testing Library, Playwright, axe-core
- **Current site:** https://cedartutoring.com/

### Team Review Feedback (2026-05-02)
**Mouse's review did NOT approve spec as-is — identified 3 critical blockers (E2E env, Vitest setup, form determinism) + 5 concerns. Morpheus addressed all blockers in v1.1.**

**Morpheus's specification for Mouse:**
- E2E tests MUST run against `next build && next start`, not dev mode
- Form/API mocks via MSW with handlers for happy path + error cases
- Content fixtures for all MDX/JSON data (programs, testimonials, FAQ, locations, pricing)
- Typed content contracts published in Trinity spec ensure test data matches production contracts
- Vitest needs jsdom, @testing-library/user-event, and complete mocks for next/*, MDX imports

**Trinity's frontend requirements for Mouse:**
- Navigation mobile menu requires focus trap tests
- Carousel (Embla) needs keyboard navigation assertions
- All form inputs require sanitization/trimming tests
- Form retry recovery on network timeout
- All interactive components need accessibility snapshot tests

**Oracle's design requirements for Mouse:**
- Palette AA contrast validation (use axe-core)
- Visual regression at sm/md/lg/xl breakpoints
- Focus ring visibility tests for all interactive elements
- Hero image/photography alt text and responsive srcset checks

