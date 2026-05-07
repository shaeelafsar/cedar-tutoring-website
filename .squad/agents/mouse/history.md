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

### Review Approval (2026-05-02T15:50)
**Status:** ✅ APPROVED  
Mouse's v1.1 test spec received unanimous approval from Trinity and Oracle review teams. All v1.0 blockers resolved. All concerns addressed. Mouse was the only REJECT on v1.0—all issues now fixed. Specs locked. Team advancing to wireframe phase.

### PRD-ready QA review (2026-05-07T10:22:32.063-05:00)
- Reviewed local site at `http://127.0.0.1:3000` across desktop/mobile key marketing, program, test prep, trust, contact, free-trial, and assessment routes.
- Wrote QA synthesis notes to `.squad/reviews/mouse-prd-ready-review-notes.md`; did not create or edit `prd-ready-review-gpt.md`.
- Launch blockers found: stale `Admission Form` CTAs to `/admission/` returning 404; mobile nested navigation regression on program child routes; home JSON-LD incorrectly references Dallas-Fort Worth instead of Worth, IL / South Suburbs of Chicago.
- Existing Playwright mobile suite result during review: 25 passed, 2 failed, both in `tests/mobile-nav.spec.ts` around drawer brand text and missing active Programs child expansion.

### Final PRD-ready deliverable review (2026-05-07T10:22:32.063-05:00)
- **Verdict:** APPROVE `prd-ready-review-gpt.md` as the final review deliverable.
- Verified the file exists at repo root with the exact required name and preserves all three source-note appendices verbatim.
- The synthesis correctly centers the parent/guardian mental model and covers simplicity, modern/premium/aesthetic feel, concise navigation, logo/color theming, persuasive density vs clutter, production readiness, business-owner lens, and UX/designer lens.
- Launch-gate implication: approval of the deliverable does **not** mean the website is launch-ready; the deliverable correctly identifies P0 blockers around assessment form plumbing, stale `/admission/` CTAs, missing privacy policy, incorrect Dallas-Fort Worth local SEO, and unfinished high-intent page states.

### Team Decision: Parent/Guardian Primary Audience (2026-05-07T10:13:08.554-05:00)
**Captured by:** Coordinator (Copilot Directive)  
Shaeel Afsar captured a team directive: whenever designing/UX/UI, ensure the team is always thinking from the target audience perspective. For Cedar, treat parents/guardians choosing tutoring for their child as the primary audience. This directive is now recorded in `.squad/decisions.md` for team reference.

### Team Decision: P0 Launch Blockers Synthesis Approved (2026-05-07T10:22:32.063-05:00)
**Decision owners:** Morpheus (synthesis) + Mouse (final verdict: APPROVED)  
Final deliverable `prd-ready-review-gpt.md` approved as complete and accurate. Morpheus and Mouse aligned that the site should not launch until P0 blockers are resolved: real assessment-form submission, fixing stale `/admission/` CTAs, adding privacy policy, correcting local SEO to Worth, IL / Chicago South Suburbs only, removing unfinished sections, fixing mobile navigation, and passing production gates. Decision recorded in `.squad/decisions.md`.

### Session Work: Owner Action Brief Review & Approval (2026-05-07T11:10:33.863-05:00)
**By:** Mouse (sync reviewer gate)  
**Morpheus spawn:** Owner Action Brief distilled from `prd-ready-review-gpt.md`  
**Verdict:** APPROVED  
Mouse reviewed Morpheus's concise owner action brief: surfaces five P0 launch blockers as immediate priorities and frames P1/P2/P3 work as post-P0 improvements. Brief is business-readable, top-priority focused, and consistent with full audit appendices. Decision captured in `.squad/decisions.md` by Scribe.

