# Test Plan — Azure Function: `api/submit-assessment`

> **Author:** Mouse (Tester/QA)
> **Date:** 2026-05-07T14:50:02.947-05:00
> **Status:** DRAFT — pending Morpheus spec (`azure-function-submit-assessment.md`)
> **Function owner:** Trinity (implementation TBD — Azure SWA not yet provisioned)
> **Reviewed against:** `.squad/research/form-solutions-comparison.md`, `.squad/decisions.md` (2026-05-07T14:31:00)

---

## 0. Context & Scope

Wave 3 introduces `api/submit-assessment/index.ts` — an Azure Static Web Apps managed Azure Function that:

1. Receives a `POST /api/submit-assessment` from the `/book-assessment` page (`BookAssessmentPageClient.tsx`)
2. Rejects bots (honeypot check) and disallowed origins
3. Validates the payload
4. Calls Resend's email API to deliver assessment requests to `Info@cedartutoring.com`
5. Returns a structured JSON response the client uses to show success/error UI

**Morpheus's spec (`azure-function-submit-assessment.md`) does not yet exist** as of this writing. This test plan is authored against the architectural intent in `.squad/research/form-solutions-comparison.md` and the approved architectural decision (`.squad/decisions.md`, 2026-05-07T14:31:00). Open questions for Morpheus and Trinity are collected in §7.

---

## 1. Unit Tests

> **Test runner:** Vitest (recommended — see §6)
> **File location:** `api/submit-assessment/submit-assessment.unit.test.ts`
> **Language:** TypeScript

Unit tests exercise the Function handler in isolation. Resend's client is replaced by a fake (see §4). No network calls. No Azure runtime required.

---

### 1.1 Happy Path — Valid Payload

**Scenario:** All required fields present and valid, honeypot empty, Origin is allowed.

**Pre-conditions:**
- `RESEND_API_KEY` is set in the test environment (can be any non-empty string; the fake client ignores it)
- `ALLOWED_ORIGINS` includes `https://cedartutoring.com`

**Input:**
```
POST /api/submit-assessment
Origin: https://cedartutoring.com
Content-Type: application/json

{
  "parent_name": "Asmah Khan",
  "parent_email": "asmah.khan@example.com",
  "phone": "708-555-0100",
  "student_name": "Zara Khan",
  "grade_level": "5th Grade",
  "program_interests": ["Math"],
  "preferred_location": "Worth, IL",
  "additional_notes": "Needs help with fractions.",
  "preferred_contact_method": "email",
  "botcheck": ""
}
```

**Assertions:**
- Response status: `200`
- Response body: `{ "success": true }` (exact shape TBD — see §7, Q1)
- Fake Resend client was called exactly once
- Resend call `from` field: a Cedar sending address (e.g., `assessments@cedartutoring.com` — exact value TBD, see §7 Q2)
- Resend call `to` field: `["Info@cedartutoring.com"]`
- Resend call `reply_to` field: `"asmah.khan@example.com"` (parent email)
- Resend call `subject` field: contains `"Assessment Request"` or `"Cedar Tutoring"` (exact wording TBD — see §7 Q2)
- Resend call `html` field: contains parent name, student name, grade level, and program interest (smoke check, not exact match)

---

### 1.2 Honeypot Field Non-Empty — Silent Rejection

**Scenario:** Bot fills the `botcheck` hidden field with a non-empty string.

**Recommended behavior: Return `200` with success body but do NOT call Resend.**

**Rationale for 200 over 400/403:**
Returning a real error code tells the bot it has been detected and encourages it to adapt (try blank fields, try other techniques, try faster). A silent `200` makes the bot believe it succeeded; it moves on. This is the industry-standard "honeypot 200 silent discard" pattern. The downside is zero observability, which is mitigated by server-side logging in the Function itself (log the discard at INFO level without exposing it to the caller).

**Input:** Valid payload (see 1.1) with `"botcheck": "spam.example.com"`

**Assertions:**
- Response status: `200`
- Response body: `{ "success": true }` (same as happy path — indistinguishable to caller)
- Fake Resend client was called **zero times**
- (Optional) Function logs contain a "honeypot triggered" entry (if Trinity adds structured logging — see §7 Q5)

---

### 1.3 Missing Required Field — 400 with Error Detail

Three sub-cases. Each asserts the same pattern.

#### 1.3a Missing `parent_name`

**Input:** Happy-path payload with `parent_name` removed (or `""`)

**Assertions:**
- Status: `400`
- Body: `{ "errors": [{ "field": "parent_name", "message": "<non-empty string>" }] }` (exact message wording TBD — see §7 Q1)
- Fake Resend: **not called**

#### 1.3b Missing `parent_email`

**Input:** Happy-path payload with `parent_email` removed (or `""`)

**Assertions:**
- Status: `400`
- Body: `{ "errors": [{ "field": "parent_email", "message": "<non-empty string>" }] }`
- Fake Resend: **not called**

#### 1.3c Missing `student_name`

**Input:** Happy-path payload with `student_name` removed (or `""`)

**Assertions:**
- Status: `400`
- Body: `{ "errors": [{ "field": "student_name", "message": "<non-empty string>" }] }`
- Fake Resend: **not called**

**Note on multi-field validation:** If the Function validates all fields at once and returns multiple errors in a single `errors` array (recommended), add a combined test: send payload with all three missing → assert `errors` has length 3 and contains entries for all three fields.

---

### 1.4 Invalid Email Format — 400

**Input:** Happy-path payload with `parent_email: "not-an-email"`

**Assertions:**
- Status: `400`
- Body: `{ "errors": [{ "field": "parent_email", "message": "<non-empty string>" }] }`
- Fake Resend: **not called**

---

### 1.5 Missing Origin Header — 403

**Input:** Valid payload, no `Origin` header in the request

**Assertions:**
- Status: `403`
- Body: `{ "error": "Forbidden" }` (exact shape TBD — see §7 Q1)
- Fake Resend: **not called**

---

### 1.6 Origin Not in ALLOWED_ORIGINS — 403

**Input:** Valid payload, `Origin: https://evil.example.com`

**Assertions:**
- Status: `403`
- Body: `{ "error": "Forbidden" }`
- Fake Resend: **not called**

**Note:** The exact semantics of ALLOWED_ORIGINS (substring match vs. exact match) is an open question — see §7 Q3. Tests should be written against whichever the spec declares.

---

### 1.7 Resend Client Throws 5xx — Function Returns 502

**Scenario:** Resend's API returns a 5xx server error (e.g., Resend outage).

**Setup:** Configure fake Resend to throw an error with HTTP status 500.

**Input:** Valid happy-path payload

**Assertions:**
- Response status: `502` (Bad Gateway — the upstream is Resend, not us)
- Body: `{ "error": "Email service temporarily unavailable" }` (exact message TBD — see §7 Q1)
- No unhandled exception escapes the handler (Function returns a proper HTTP response, not a 500 from the Azure runtime)

---

### 1.8 Resend Client Throws 429 — Function Returns 429 with Retry Hint

**Scenario:** Resend's API returns a 429 Too Many Requests (daily or monthly free-tier limit hit).

**Setup:** Configure fake Resend to throw an error with HTTP status 429.

**Input:** Valid happy-path payload

**Assertions:**
- Response status: `429`
- Response body contains a human-readable message (e.g., `{ "error": "Service rate limited — please try again later" }`)
- Response includes a `Retry-After` header (value TBD — Resend's 429 response may supply one; see §7 Q4)
- Fake Resend: **not called again** (handler does not retry internally)

---

### 1.9 Oversized Payload — 413

**Scenario:** The `additional_notes` field contains more than 5,000 characters.

**Input:** Happy-path payload with `additional_notes` set to a 6,000-character string (e.g., `"a".repeat(6000)`)

**Assertions:**
- Response status: `413`
- Body: `{ "errors": [{ "field": "additional_notes", "message": "Notes must be 5,000 characters or fewer" }] }` (exact cap and message TBD — see §7 Q1)
- Fake Resend: **not called**

**Note:** If the Function enforces a total request body size limit at the Azure runtime level (e.g., 4 MB), this test may be less meaningful for small oversizes. The 5,000-char field cap is a functional validation limit, not a raw byte limit. Clarify with Trinity/Morpheus what the actual enforced cap is.

---

### 1.10 Wrong HTTP Method — 405

**Input:** `GET /api/submit-assessment` (or PUT, PATCH, DELETE)

**Assertions:**
- Response status: `405` (Method Not Allowed)
- Response includes `Allow: POST` header
- Body: `{ "error": "Method not allowed" }` (exact shape TBD — see §7 Q1)
- Fake Resend: **not called**

---

## 2. Integration Tests (Playwright)

> **Test runner:** Playwright (already in repo)
> **File location:** `tests/submit-assessment.spec.ts`
> **Target environment:** Live Azure SWA **preview deployment** (not dev server)
> **Browser:** Firefox (project preference per `.squad/agents/mouse/history.md`) + Chromium for CI

These tests exercise the full request path: browser form → SWA CDN → Azure Function → Resend → response → client UI. Resend is the **real** Resend client in integration tests; the function is deployed with a real (staging) `RESEND_API_KEY`.

---

### 2.1 Happy Path — Full Form Submission

**Pre-conditions:**
- SWA preview deployment is live at `PLAYWRIGHT_BASE_URL` (set in CI)
- `RESEND_API_KEY` is set in SWA Application Settings (staging key, or a real key pointed at a test inbox)
- `/book-assessment` page renders and the form is interactive

**Steps:**
1. `page.goto('/book-assessment')`
2. Fill `parent_name`: `"Asmah Khan"`
3. Fill `parent_email`: `"asmah.khan@example.com"`
4. Fill `phone`: `"708-555-0100"`
5. Fill `student_name`: `"Zara Khan"`
6. Select `grade_level`: `"5th Grade"`
7. Check program interest: `"Math"`
8. Click submit button

**Assertions (Playwright-verifiable):**
- Success UI is shown: `await expect(page.getByRole('heading', { name: /assessment request received/i })).toBeAttached()` (exact heading text TBD — see §7 Q1)
- Form inputs are no longer visible (or submit button is gone)
- No console errors from the form handler

**Manual gate (cannot be Playwright-automated):**
- ✋ **MANUAL CHECK REQUIRED:** Email arrives at `Info@cedartutoring.com` within 2 minutes.
  - Expected subject: `"Cedar Tutoring — Free Assessment Request"` (verify exact subject)
  - Expected `reply-to`: `asmah.khan@example.com`
  - Expected body contains: "Asmah Khan", "Zara Khan", "5th Grade", "Math"
- This gate MUST be performed by Shaeel or Asmah before declaring Wave 3 complete.

---

### 2.2 Honeypot Triggered — Success UI, No Email

**Steps:**
1. `page.goto('/book-assessment')`
2. Fill all required fields (valid)
3. `await page.evaluate(() => { document.querySelector('input[name="botcheck"]').value = 'spam.example.com'; })`
4. Submit form

**Assertions (Playwright-verifiable):**
- Success UI is shown (indistinguishable from happy path — by design)

**Manual gate:**
- ✋ **MANUAL CHECK REQUIRED:** No email arrives at `Info@cedartutoring.com`. Wait 2 minutes after submission. If email arrives, the honeypot rejection is broken — this is a P0 bug.

---

### 2.3 Direct API: Malformed Payload → 400

**Steps:**
```
const response = await page.request.post('/api/submit-assessment', {
  headers: {
    'Content-Type': 'application/json',
    'Origin': process.env.PLAYWRIGHT_BASE_URL,
  },
  data: {
    parent_name: '',
    parent_email: '',
    student_name: '',
  },
});
```

**Assertions:**
- `expect(response.status()).toBe(400)`
- `const body = await response.json();`
- `expect(body).toHaveProperty('errors')`
- `expect(Array.isArray(body.errors)).toBe(true)`
- `expect(body.errors.length).toBeGreaterThan(0)`
- Each error item has `field` and `message` properties

---

### 2.4 Direct API: Disallowed Origin → 403

**Steps:**
```
const response = await page.request.post('/api/submit-assessment', {
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://evil.example.com',
  },
  data: { /* valid payload */ },
});
```

**Assertions:**
- `expect(response.status()).toBe(403)`
- `const body = await response.json();`
- `expect(body).toHaveProperty('error')`

---

## 3. Test Data Fixtures

> Provided as TypeScript-ish pseudocode. Not real code — do not create these files until the Function is implemented.

```typescript
// fixtures/assessment-submissions.ts (pseudocode)

/** VALID — Realistic Cedar parent/student scenario */
const validSubmission = {
  parent_name: "Asmah Khan",
  parent_email: "asmah.khan@example.com",
  phone: "708-555-0100",
  student_name: "Zara Khan",
  grade_level: "5th Grade",
  program_interests: ["Math"],
  preferred_location: "Worth, IL",
  additional_notes: "Zara needs help with fractions and long division.",
  preferred_contact_method: "email",
  botcheck: "",              // honeypot must be empty
};

/** INVALID — Missing parent_email */
const missingEmail = {
  ...validSubmission,
  parent_email: "",
};

/** INVALID — Bad email format */
const badEmail = {
  ...validSubmission,
  parent_email: "not-an-email",
};

/** HONEYPOT — Valid payload but bot-filled hidden field */
const honeypotSubmission = {
  ...validSubmission,
  botcheck: "spam.example.com",
};

/** OVERSIZED — notes field at 6,000 chars (exceeds 5,000-char cap) */
const oversizedNotes = {
  ...validSubmission,
  additional_notes: "a".repeat(6000),
};

/** MISSING REQUIRED — parent_name blank */
const missingParentName = {
  ...validSubmission,
  parent_name: "",
};

/** MISSING REQUIRED — student_name blank */
const missingStudentName = {
  ...validSubmission,
  student_name: "",
};
```

---

## 4. Mocking Strategy

### Approach: Small Fake Resend Client

Do **not** use `vi.mock('resend')` directly on the npm module. Instead, inject the Resend client as a dependency into the handler function. This makes the handler testable without any module-level mocking magic.

**Recommended pattern:**

```typescript
// pseudocode — not actual code

// The handler accepts a Resend-compatible client as a parameter or via DI
type ResendClient = {
  emails: {
    send: (payload: ResendEmailPayload) => Promise<ResendSendResponse>;
  };
};

// In tests, replace with a fake:
function makeFakeResendClient() {
  const calls: ResendEmailPayload[] = [];
  return {
    client: {
      emails: {
        send: async (payload: ResendEmailPayload) => {
          calls.push(payload);
          return { id: "fake-email-id" };
        },
      },
    },
    calls,  // exposed for assertions
    reset: () => calls.splice(0, calls.length),
  };
}
```

**Assertion pattern:**
```typescript
// pseudocode

const { client: fakeResend, calls } = makeFakeResendClient();
// ... call handler with fakeResend injected ...

expect(calls).toHaveLength(1);
expect(calls[0].to).toContain("Info@cedartutoring.com");
expect(calls[0].reply_to).toBe("asmah.khan@example.com");
expect(calls[0].subject).toMatch(/assessment/i);
expect(calls[0].html).toContain("Zara Khan");
```

**For error scenarios** (1.7, 1.8), extend `makeFakeResendClient` to accept an optional `throws` option:
```typescript
// pseudocode
function makeFakeResendClient({ throws }: { throws?: Error } = {}) {
  return {
    client: {
      emails: {
        send: async () => {
          if (throws) throw throws;
          return { id: "fake-email-id" };
        },
      },
    },
  };
}

// 5xx scenario:
const resend5xx = makeFakeResendClient({
  throws: Object.assign(new Error("Resend error"), { statusCode: 500 }),
});

// 429 scenario:
const resend429 = makeFakeResendClient({
  throws: Object.assign(new Error("Rate limited"), { statusCode: 429 }),
});
```

**Why this pattern over `vi.mock`:**
- Handler is unit-testable without reimporting the module after mock setup
- Fake is explicit, readable, and doesn't rely on Vitest's module graph internals
- Works cleanly if Trinity decides to swap Resend for another email provider in the future

---

## 5. What Is NOT Tested

The following items are explicitly out-of-scope for this test plan. We trust the platform; we test our code.

| Out of scope | Why |
|---|---|
| **Actual Resend API uptime** | Platform concern. Resend's SLA is their responsibility. Our 502 test (§1.7) covers our error-handling code only. |
| **Azure Function cold-start performance** | Infrastructure concern. Not a correctness test. Lighthouse/perf audits handle cold-start budget. |
| **Azure SWA routing infrastructure** | Platform concern. The SWA routing table (`staticwebapp.config.json`) is not application code; trust Azure's own tests. |
| **DNS resolution for `cedartutoring.com`** | Infrastructure/ops. Covered by Morpheus's pre-production checklist (DKIM/SPF/DMARC, domain verification). |
| **Email deliverability** | Once Resend is called correctly, deliverability is Resend's responsibility. Our happy-path test (§1.1) verifies "Resend was called with the right payload". Whether the email lands in Asmah's inbox is a manual gate (§2.1). |
| **Resend's email rendering in client email apps** | Out of scope. No visual regression on email HTML in Outlook/Gmail/Apple Mail. |
| **DKIM/SPF/DMARC configuration** | Infrastructure. Verified once by Shaeel/Asmah via Resend dashboard after domain verification. |
| **SWA GitHub Actions deploy workflow** | CI/CD concern, not application logic. |
| **`RESEND_API_KEY` rotation** | Security ops, not test-plan scope. |
| **Resend free-tier daily cap (100 emails/day)** | Operational monitoring concern. Cedar's expected volume (~50/month) is well under the cap. |

---

## 6. Test Runner Recommendations

### Unit Tests: Vitest

**Recommendation:** Vitest for all unit tests targeting the Function handler.

**Rationale:**
- Trinity's codebase is TypeScript; Vitest has zero-config TypeScript support
- Vitest is compatible with the existing Playwright + Next.js test toolchain (no Jest conflict)
- The Function is a standalone Node.js module; Vitest's Node environment is the correct test environment (not jsdom)
- Fast (Vite-native HMR in watch mode)
- API mirrors Jest — low ramp-up cost

**Vitest config note for Functions:** Place unit tests under `api/` and configure a separate `vitest.config.ts` for the `api/` workspace (or a `test.environment: 'node'` override block) so Function tests do not inherit the browser/jsdom environment from the Next.js app tests.

**Suggested Vitest config (pseudocode):**
```typescript
// api/vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.unit.test.ts'],
  },
});
```

### Integration / E2E Tests: Playwright

**Recommendation:** Reuse the existing Playwright setup in `tests/`. No new E2E runner needed.

- Add `tests/submit-assessment.spec.ts` (see §2)
- Run in CI against the SWA preview deployment URL (passed as `PLAYWRIGHT_BASE_URL` env var)
- Reuse existing `playwright.config.ts` browser projects (firefox + chromium)
- `page.request.post` calls (§2.3, §2.4) use Playwright's APIRequestContext — no extra HTTP client needed

### CI Execution Order

```
1. Deploy SWA preview (GitHub Actions azure-static-web-apps.yml)
2. Run unit tests: `vitest run` (in api/ directory)
3. Run E2E tests: `playwright test tests/submit-assessment.spec.ts --project=firefox`
```

Unit tests should run before E2E (fail fast if handler logic is broken).

---

## 7. Open Questions for Morpheus / Trinity

Morpheus's spec (`azure-function-submit-assessment.md`) does not exist yet. The following questions must be answered before test code is written. **These questions are the delta between this plan and actionable test code.**

---

**Q1 — Exact response body shapes**

The test plan uses assumed shapes:
- `200 success: { "success": true }`
- `400 validation error: { "errors": [{ "field": string, "message": string }] }`
- `403 forbidden: { "error": "Forbidden" }`
- `405 method not allowed: { "error": "Method not allowed" }`
- `413 payload too large: { "errors": [{ "field": "additional_notes", "message": string }] }`
- `502 upstream error: { "error": "Email service temporarily unavailable" }`

**Q for Morpheus/Trinity:** What are the exact response body contracts? Must be locked before tests can be written. If the shape changes post-spec, unit tests for error cases will need updating.

---

**Q2 — Resend `from` address and email subject**

The form currently uses `"Cedar Tutoring — Free Assessment Request"` as the subject (see `BookAssessmentPageClient.tsx` line 282). The `from` address is unknown.

**Q for Trinity:** What is the `from` address (e.g., `assessments@cedartutoring.com`? `noreply@cedartutoring.com`?) and the canonical subject line? Both must be specified in the Function implementation so unit tests can assert exact values.

---

**Q3 — ALLOWED_ORIGINS semantics and list**

**Q for Morpheus:** What is the complete `ALLOWED_ORIGINS` list?
- `https://cedartutoring.com` (production)
- `https://*.azurestaticapps.net` (SWA preview deployments)?
- `http://localhost:3000` (local dev)?

More critically: **exact string match or prefix/substring/regex match?** This determines the unit test inputs for §1.6. Substring match against a wildcard like `*.azurestaticapps.net` requires a different assertion than exact equality.

---

**Q4 — Resend 429 `Retry-After` header passthrough**

**Q for Trinity:** When Resend returns a 429, does the Function:
(a) Forward Resend's own `Retry-After` header value to the client?
(b) Return a hardcoded `Retry-After` value?
(c) Omit `Retry-After` and just return the 429 body?

This determines whether §1.8 asserts on a `Retry-After` response header.

---

**Q5 — Honeypot field name: `botcheck` vs `website`**

**⚠️ Discrepancy to resolve:** The existing form (`BookAssessmentPageClient.tsx`) uses `botcheck` as the honeypot input name (confirmed by `tests/wave-2.spec.ts` line 278: `input[name="botcheck"]`). The task brief for this test plan references a `website` field as the honeypot.

**Q for Trinity:** Will the Azure Function check `botcheck`, `website`, or both? If Trinity adds a new field named `website` for the Function, the client form must add the corresponding hidden input, and `tests/wave-2.spec.ts` may need updating to also assert `input[name="website"]` is present and empty.

**Mouse's recommendation:** Retain `botcheck` as the honeypot field name for continuity with the existing form and passing wave-2 test. Only rename if there's a specific reason.

---

## 8. Implementation Readiness Checklist

Once Morpheus's spec is published and Trinity implements the Function, verify all of the following before this test plan produces runnable test code:

- [ ] Response body shapes documented in Morpheus spec (Q1)
- [ ] `from` address and subject line confirmed (Q2)
- [ ] `ALLOWED_ORIGINS` list and match semantics defined (Q3)
- [ ] `Retry-After` behavior on 429 confirmed (Q4)
- [ ] Honeypot field name (`botcheck` vs `website`) resolved (Q5)
- [ ] Azure SWA provisioned and preview deployment URL known (for integration tests)
- [ ] Resend account created, staging API key available for CI (integration tests)
- [ ] `api/submit-assessment/index.ts` exists and accepts injected Resend client (for unit testability)
- [ ] Vitest added to `api/` workspace dependencies (`pnpm add -D vitest` in `api/`)

---

*Mouse out. Tests ship when the Function does.*
