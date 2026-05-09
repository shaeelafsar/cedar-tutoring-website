## Recent Work

**Previous entries (Wave 1 setup, initial test spec, team review feedback, PRD-ready review, final deliverable review) archived to history-archive.md.**

### PRD-ready QA review (2026-05-07T10:22:32.063-05:00)
**Status:** ✅ COMPLETE — Local site reviewed at http://127.0.0.1:3000 across all key routes
- Wrote synthesis notes to `.squad/reviews/mouse-prd-ready-review-notes.md`
- Launch blockers identified: stale Admission Form CTAs, mobile nav regressions, incorrect local SEO (Dallas-Fort Worth vs Worth IL)
- Existing Playwright mobile suite: 25 passed, 2 failed (mobile-nav.spec.ts drawer/expansion issues)

### Wave 3 Test Plan: Azure Function `api/submit-assessment` (2026-05-07T14:50:02.947-05:00)
**Status:** ✅ COMPLETE — test plan written, open questions filed
**Deliverable:** `.squad/specs/test-plan-azure-function.md`

**Plan covers:**
- 10 unit test scenarios (Vitest, fake Resend client, node environment)
- 4 integration/E2E tests (Playwright against SWA preview deployment)
- Test data fixtures (Cedar-realistic names/grades)
- Mocking strategy (injectable fake Resend client)
- Explicit out-of-scope list
- CI execution order (unit → deploy → E2E)

**5 open questions filed:** Response shapes, Resend from/subject, ALLOWED_ORIGINS semantics, Retry-After behavior, honeypot field name (potential wave-2 regression risk)

### Wave 3 Spec/Guide/Test-Plan Cross-Review (2026-05-07T19:50:02Z)
**Status:** ✅ COMPLETE — Test plan APPROVED WITH 4 FIXES required before test code writing

**Fixes required before implementation:**
1. Field names: All fixtures use snake_case; spec uses camelCase. Update all: parent_name → parentName, parent_email → email, etc.
2. Response shapes: errors is object `{ fieldName: "message" }`, not array. Update all assertions
3. additionalNotes max: Test uses 5000/6000 chars; spec says 2000. Split into two tests
4. Honeypot test: Already correct (recommends 200 silent discard); once spec patched, no further change needed

**Decisions locked:** Response envelope finalized, honeypot 200 confirmed, all Q1-Q5 answered by Morpheus

**Ready for:** Test code writing once Trinity confirms spec patches are merged

### Click-Through Smoke Test — Live Deploy (2026-05-07T19:02:14-05:00)

**Status:** ✅ COMPLETE — live site at b2b2979 / deploy #42 tested

**Script created:** `scripts/smoke-clickthrough.mjs` — 9-check mandatory protocol

**Results summary:**
- 20 routes from sitemap + 2 extras (free-trial, privacy-policy) = 22 total
- All pages: HTTP 200, h1 present, no broken nav links, no dead links, no broken images
- Mobile: all 20 routes pass — hamburger opens, nav links have basePath, no h-scroll
- **1 defect found (P1):** `<link rel="preload" href="/images/logos/cedar-logo-original.jpg">` missing basePath — fires 404 console error on every page. Root: `DEPLOY_TARGET` not `NEXT_PUBLIC_`; client-side hydration loses the env var; `next/image` injects a second wrong preload. Logo renders correctly — no user-visible impact.

**Routed to:** Trinity (via `.squad/decisions/inbox/mouse-smoke-clickthrough.md`)

**Status:** Methodology now codified in team decisions (2026-05-07T19:02:14-05:00). Defect fixed by Trinity in commit 6bb4f39. Script archived as reusable team asset.

**Polish Round Update (2026-05-07):** Trinity further consolidated by deleting legacy `scripts/smoke-deployed.mjs` and rebinding `npm run smoke:deployed` → click-through. Commit 2dd6163. **Smoke is now canonical; old route-load-only script permanently removed.** Ported Calendly embed and noAssessmentForm checks before deletion.

---

### Mobile Nav Drawer Test Fixes (2026-05-07T20:11:05-05:00)
**Status:** ✅ COMPLETE — 8/8 mobile-nav tests green across all 4 browser projects

**Which tests failed (all 4 browsers × 2 test titles = 8 failures):**
1. `Homepage - drawer shows branded navigation and quick contact actions`
2. `Programs child routes keep the current section expanded with active child link state`

**Root causes (all test drift, production code is correct):**
1. **Tagline string changed:** Test asserted `'Where Learning Takes Root'`; actual tagline is `'Strengthening Academic Abilities Efficiently and Effectively'` (updated in `content/site/metadata.md`)
2. **Contact info changed:** Phone was `(469) 757-2220`; now `+1 708 890-4400`. Email was `info@cedartutoring.com`; now `Info@cedartutoring.com` (capital I)
3. **Nav redesigned from expandable → flat:** Tests assumed `Expand Programs` / `Expand Test Prep` buttons and child links (Math, Reading, Homework Help) in the mobile drawer. The nav was redesigned to flat top-level links. No children in `navigation` YAML. No expand/collapse buttons rendered. Nav label also changed from `Programs` to `Academic Programs`.

**Fixes applied:**
- Test 1: Updated tagline assertion, phone, email. Added new step verifying all 7 flat nav links by `getByRole('link')`. Removed Expand/Collapse button assertions and child-link expand flow.
- Test 2: Renamed test (`Programs child routes show the parent nav link in the drawer`). Replaced Collapse/child assertions with a single assertion: `Academic Programs` link is present when navigating from `/programs/math`.

**Green count:** 175 passed; 5 pre-existing failures in `mobile-ux.spec.ts` and `wave-2.spec.ts` (unrelated, baseline unchanged)

**Skill extracted:** `.squad/skills/playwright-nav-drawer-tests/SKILL.md`

---

### 5 Baseline Playwright Failures Fixed (2026-05-08T15:31:16.293-05:00)
**Status:** ✅ COMPLETE — 180/180 passing across all 4 browser projects. Pushed to main (commit 3a74567).

**Classification: all 5 were test drift. No production bugs.**

| # | Test | Browser(s) | Root Cause | Fix Applied |
|---|------|-----------|------------|-------------|
| 1 | `mobile-ux.spec.ts:95` "Navigation is accessible on mobile" | chromium | No `setViewportSize` call; hamburger `aria-label="Open navigation menu"` is in DOM via `lg:hidden` so `.count() > 0` was true, but `display:none` at desktop → click timeout | Added `setViewportSize(375×812)` before goto; replaced attribute-selector with `getByRole('button', {name: 'Open navigation menu'})`; removed `waitForTimeout(500)` → `await expect([data-slot="sheet-content"][data-open]).toHaveCount(1)` |
| 2 | `mobile-ux.spec.ts:95` "Navigation is accessible on mobile" | firefox | Same as #1 | Same fix (setViewportSize applies per-test) |
| 3 | `wave-2.spec.ts:31` "Plans link exists; Free Trial absent" | mobile-chrome | Desktop nav uses `hidden lg:flex` → `display:none` on mobile → not in accessibility tree → `getByRole('navigation')` finds nothing → timeout | Detect viewport < 1024px; if mobile, click `Open navigation menu` and wait for `[data-slot="sheet-content"][data-open]`; then proceed — drawer's `Mobile navigation` is now the resolved nav role |
| 4 | `wave-2.spec.ts:31` "Plans link exists; Free Trial absent" | mobile-firefox | Same as #3 | Same fix |
| 5 | `mobile-ux.spec.ts:17` "Reviews (/reviews) loads and renders" | mobile-firefox | `fullPage: true` screenshot on Firefox/Gecko throws when page height > 32767px; Reviews page at 375px wide is extremely tall | Removed `fullPage: true` from all diagnostic screenshots in the loop — viewport-only capture is sufficient for diagnostics and has no browser height limit |

**New patterns added to SKILL.md:**
- `fullPage: true` + Firefox 32767px limit
- Mobile viewport drift: `display:none` desktop nav + accessibility tree exclusion
- `.count()` vs visibility trap (`.count()` resolves for DOM-present hidden elements; `.click()` will timeout)

**Final suite count: 180 passed, 0 failed**

---

## Learnings

- **Mobile nav drawer test drift checklist:** When a mobile nav drawer test fails, verify (1) tagline/branding strings in content files, (2) contact info in site config, (3) nav structure (flat vs expandable, label changes). See `.squad/skills/playwright-nav-drawer-tests/SKILL.md`.
- **`.count()` vs visibility trap:** `.count()` resolves to a positive number even for DOM-present but CSS-hidden elements. Never gate a `.click()` on `.count() > 0` alone — the element may be `display:none`. Use `getByRole` (which excludes accessibility-tree-invisible elements) or check `.isVisible()` before clicking.
- **`display:none` and the accessibility tree:** Playwright's `getByRole` excludes elements that are not in the accessibility tree. An element with `display:none` (e.g. from `hidden lg:flex`) is not accessible → `getByRole('navigation')` won't find it on mobile. Always scope role queries to elements that are actually rendered at the current viewport.
- **Mobile viewport drift pattern:** Tests that check desktop nav links MUST either (a) set the viewport to a desktop width so the desktop nav is visible, OR (b) handle the mobile case by opening the hamburger drawer first. `getByRole('navigation')` on a mobile viewport (< lg breakpoint) will find nothing if the desktop nav is `display:none`.
- **Firefox `fullPage: true` height limit:** Firefox/Gecko rejects `fullPage: true` screenshots when the page height exceeds 32767px. This can silently fail only on mobile-firefox with very long pages (e.g. Reviews at 375px wide). Remove `fullPage: true` from diagnostic screenshots; viewport-only capture has no limit and is sufficient for smoke diagnostics.
- **webServer config is missing from playwright.config.ts:** The Playwright config has no `webServer` block. Tests require a manually started dev server. This is a source of false "all tests fail" confusion when running without the server. Consider adding `webServer: { command: 'next dev', port: 3000, reuseExistingServer: true }` (Morpheus decision needed).
- **Click-through smoke vs route-load smoke:** Route-load-only smoke (h1, footer, console) creates false confidence. It cannot detect: CTAs with raw hrefs missing basePath, broken `<link rel="preload">` from client-side env var loss, or mobile nav regressions.
- **`naturalWidth` check ≠ preload 404:** `document.images[].naturalWidth` only catches `<img>` elements. `<link rel="preload" as="image">` firing a 404 is invisible to it. Add `page.on('response')` status=404 sweep as a separate check.
- **`NEXT_PUBLIC_` is mandatory for client components:** `DEPLOY_TARGET` without the prefix is stripped from the client bundle. Any env var consumed by a `"use client"` component must be `NEXT_PUBLIC_`. The `imagePath()` helper is called in the Header (client component) — so it needs `NEXT_PUBLIC_DEPLOY_TARGET`.
- **Prefetch `ERR_ABORTED` is not a bug:** Next.js Link prefetches routes in viewport; they show as `ERR_ABORTED` in requestfailed but do NOT surface as console errors. Safe to ignore.
- **Skill documented:** `.squad/skills/click-through-smoke/SKILL.md`
- **Test-plan structure for serverless Functions:** 5 mandatory layers (unit, integration, fixtures, mocking, out-of-scope)
- **Mocking strategy:** Prefer injectable fake client over `vi.mock` for external services. Fake records calls in array for assertions.
- **Honeypot field continuity:** Check existing form/test code for field names before planning — discrepancy surfaced as regression risk (botcheck vs website)
- **Azure SWA Function test environment:** Unit tests use Vitest `environment: 'node'` (not jsdom). Separate `api/vitest.config.ts`. Integration tests need `PLAYWRIGHT_BASE_URL` env var for preview URL.
- **Manual gates as test artifacts:** Email verification cannot be automated — document as explicit step with owner and time bound

---

## Wave 3 Pause & Deployment Context (2026-05-07)

- **Wave 3 paused** pending Shaeel's Azure SWA + Resend provisioning (spec locked; ships when infrastructure ready)
- **basePath env-gate landed:** `DEPLOY_TARGET=github-pages` now gates basePath and image-path helpers. Both GitHub Pages and local builds verified; Azure SWA will serve from domain root ✓
- **SWA test plan update:** Test against both build modes (DEPLOY_TARGET set for GH Pages CI, unset for local/SWA builds). Ensure image URLs, asset paths, and Calendly iframe render correctly on domain-root deployment (no `/cedar-tutoring-website` prefix).
- **Form backend prereq:** basePath env-gate is safety net for Wave 3 Function. First SWA build will now serve from domain root (not `/cedar-tutoring-website/`), enabling clean form submission routes.

### Visual Bug Triage Skill Created (2026-05-07T18:45:00-05:00)

**By:** Trinity (Frontend Engineer)

**Skill:** `.squad/skills/visual-bug-triage/SKILL.md`

**Purpose:** Methodology for distinguishing screenshot artifacts (animation/timing) from actual render bugs. Documented for team reuse in future audit follow-ups.

**Recommendation:** Always pair screenshot-based bug reports with scroll-into-view verification tests to validate render behavior before flagging as bugs.

## 2026-05-09 — Cross-Agent Update: Azure SWA went live

**Context:** Morpheus authored static-only Bicep IaC. Trinity tuned Azure SWA workflow and verified deployment. Both GitHub Pages and Azure SWA now deploy in parallel.

**Deployment:** `https://green-plant-0df01b610.7.azurestaticapps.net` (validation phase)

**Implication for Mouse:** Deployment landscape now includes Azure SWA parallel to GitHub Pages. Monitor for any changes to accessibility or rendering behavior between the two hosting platforms during cutover planning.
