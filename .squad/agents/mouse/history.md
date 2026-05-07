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

## Learnings

- **Test-plan structure for serverless Functions:** 5 mandatory layers (unit, integration, fixtures, mocking, out-of-scope)
- **Mocking strategy:** Prefer injectable fake client over `vi.mock` for external services. Fake records calls in array for assertions.
- **Honeypot field continuity:** Check existing form/test code for field names before planning — discrepancy surfaced as regression risk (botcheck vs website)
- **Azure SWA Function test environment:** Unit tests use Vitest `environment: 'node'` (not jsdom). Separate `api/vitest.config.ts`. Integration tests need `PLAYWRIGHT_BASE_URL` env var for preview URL.
- **Manual gates as test artifacts:** Email verification cannot be automated — document as explicit step with owner and time bound
