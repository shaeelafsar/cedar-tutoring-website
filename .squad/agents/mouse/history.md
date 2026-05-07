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

### Wave 2 Smoke Pass: All 11 checks passed (2026-05-07T12:50:00-05:00)
**Status:** ✅ APPROVED FOR COMMIT
Ran `tests/wave-2.spec.ts` (11 Playwright tests, chromium) against local dev server. All 11/11 passed in 2.8s.
- Nav: "Free Trial" absent; "Plans" → /pricing ✅
- Footer: No blog link; privacy policy link resolves ✅
- Home H1: "Personalized tutoring that helps your child feel confident again." ✅
- /privacy-policy/ page: exists, all sections present, legal counsel banner ✅
- /pricing/ As-Needed card: $40/session, CTA present ✅
- /pricing/ Family Plan: default $699.99, 6/week toggle → $749.99, back to $699.99 ✅
- /pricing/ Homework Help: 4 sub-tier toggles all correct ($419.99–$699.99) ✅
- Pricing FAQ: ≥3 Q&A pairs ✅
- /about/ Team: Asmah present; Amina/Nora/Omar/Sarah absent ✅
- /book-assessment/ form: renders with botcheck honeypot ✅
- Mobile 375×812: all 3 pricing cards visible with price + CTA ✅
Non-blocking caveats: FAQ answers need Asmah confirmation, asmah.svg placeholder, Web3Forms key not yet provisioned (graceful fallback confirmed). Full verdict in `.squad/decisions/inbox/mouse-wave2-verdict.md`.

### Playwright Patterns from Wave 2 Smoke Pass (2026-05-07T12:50:00-05:00)
**Spec:** `tests/wave-2.spec.ts` (11 tests, chromium, 2.8s total)

**Patterns that worked well:**
- `getByRole('article').filter({ hasText: 'Card Name' })` — reliable scoping for card components without CSS selectors
- `Promise.all([page.waitForURL(/pattern/), link.click()])` — avoids `net::ERR_ABORTED` when clicking links that trigger Next.js client routing
- `getByRole('button', { name: /toggle-label/ })` for `aria-pressed` pill toggles (PricingCardInteractive uses role=button with aria-pressed)
- `toBeAttached()` (not `toBeVisible()`) for asserting presence of hidden elements like the botcheck honeypot
- `getByRole('heading', { name: 'Exact Name', exact: true })` to avoid strict-mode violations when text appears in multiple contexts
- For headings that appear at multiple levels: add `{ level: 1 }` to `getByRole('heading', ...)` to pin to H1
- For FAQ questions rendered as accordion buttons: `getByRole('button', { name: /question text/i })` rather than `getByText()`

**Gotchas / Flaky-test lessons:**
- Next.js Turbopack dev server is unstable under Playwright load; server crashes if tests are run from a shell that exits before tests complete. Fix: start server & run tests in a single chained bash command so the server process stays alive.
- `getByText(/partial/i)` hits strict-mode violations on marketing pages where the same phrase appears in CTAs, FAQs, hero text, and footers. Always scope to a role (heading/button/link) or filter by containing article/section.
- Plans nav link renders with trailing slash (`/pricing/`) even though `metadata.md` declares `/pricing`. Use a regex `/^\/pricing\/?$/` or `toContainText` instead of exact attribute match.
- `page.goto: net::ERR_ABORTED; maybe frame was detached?` on link clicks = Next.js client-side router race. Fix: `Promise.all([waitForURL, click])`.

**Structure of `tests/wave-2.spec.ts`:**
- 8 `test.describe` blocks, each with one named test
- Each test uses `test.step()` for every logical sub-assertion
- `collectConsoleErrors(page)` helper set up as a listener at test start, asserted at end of each test
- Mobile viewport test uses `browser.newContext({ viewport: { width: 375, height: 812 } })` to override project default
- Pricing toggle tests: click button by name (e.g., `getByRole('button', { name: '6/week' })`), then assert price text appears in the scoped card article

### Wave 2 Firefox Re-Verification: All 11 checks passed (2026-05-07T13:00:00-05:00)
**By:** Mouse (mouse-4 instance)  
**Status:** ✅ APPROVED FOR COMMIT  
**Browser:** Firefox (Playwright bundled binary — NOT system Firefox)  
**Result:** 11/11 passed (5.6s)

**Why Cedar runs Firefox:** Shaeel Afsar does not have Chrome installed; Firefox is the preferred development browser for this project. Playwright bundles its own browser binaries, so no system Chrome/Firefox installation is required — `npx playwright install firefox` downloads the Playwright-managed Firefox build (~80MB).

**playwright.config.ts additions:**
```ts
{
  name: 'firefox',
  use: { ...devices['Desktop Firefox'] },
},
{
  name: 'mobile-firefox',
  use: {
    browserName: 'firefox',
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
    isMobile: false,   // Firefox does not support mobile emulation flags like Chrome
    hasTouch: true,
  },
},
```
Leave `chromium` and `mobile-chrome` projects intact.

**Firefox-specific Playwright caveats:**
- `isMobile: false` is required for Firefox — Firefox does not support Chromium-style mobile emulation, so `devices['Pixel 5']` or `isMobile: true` will error or silently misbehave.
- `NS_ERROR_CONNECTION_REFUSED` is Firefox's connection-refused error (vs Chrome's `net::ERR_CONNECTION_REFUSED`) — both mean the local server is not reachable, not a Firefox quirk.
- Firefox is slightly slower per test than Chromium (5.6s vs 2.8s for 11 tests) but shows no functional differences on this stack.
- No Chromium-only APIs were needed in `tests/wave-2.spec.ts`; the spec was already fully cross-browser.
- The two strict-mode locator violations from an earlier spec revision (`getByText(/free assessment/i)` and `getByText('Asmah')`) were already corrected in the spec on disk before this run.

**Dev server stability reminder (Firefox sessions):**
Turbopack dev server dies when its parent shell exits. Always start the server AND run tests in a single chained `&&` command so the process stays alive for the full Playwright run. Alternatively, use `playwright.config.ts` `webServer` option or `next build && next start`.

Full Firefox verdict in `.squad/decisions/inbox/mouse-wave2-verdict-firefox.md`.

### Wave 1 P0 Execution: CTA & Local SEO Standardization (2026-05-07T11:31:02-05:00)
**Status Update:** ✅ CLOSED (3 of 10 P0 items)  
Trinity closed P0 #2 (CTA standardization), P0 #4 (local SEO geography), and P0 #10 (contact cities status). Quality assurance: grep verification confirms zero retired text/paths; tsc --noEmit clean; pre-existing lint baselines maintained. Decisions captured in `.squad/decisions.md`. Mouse's remaining QA findings for P0 #1, #3, #5–#9 remain active for future waves.


**2026-05-07T14:32 — Morpheus: Form Architecture Approved (Azure SWA + Resend)**  
Form backend decided: Azure Static Web Apps managed Function + Resend email API. Mouse will test Function submissions (POST → payload validation, honeypot rejection, origin check). See `.squad/decisions.md` (2026-05-07T14:31:00) for full spec.
