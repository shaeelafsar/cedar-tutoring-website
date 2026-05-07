# Wave 3 Deferred Tests

**Created:** 2026-05-07  
**Author:** Mouse (QA specialist)  
**Context:** `/book-assessment` pivoted to Calendly-only. `BookAssessmentPageClient.tsx` is
Wave 3 scaffolding — present in the repo but not mounted on any route. These tests cannot be
written until the form backend (Azure Function + Resend) and custom calendar are ready to ship
together as a coherent Calendly phase-out.

See `.squad/decisions/inbox/coordinator-pivot-calendly-only.md` for the pivot rationale.

---

## Deferred Test Cases

### 1. Form submission — happy path
**When:** User fills all required fields (parentName, childName, grade, email, phone, programInterest)
and submits the form.  
**Expected:** POST to `api/submit-assessment`; Resend dispatches confirmation email; success state
renders ("We'll be in touch within 24 hours").  
**Blocked by:** Azure Function + Resend provisioning; `BookAssessmentPageClient.tsx` mounted on
`/book-assessment`.

### 2. Honeypot field (bot-spam guard)
**When:** A bot fills `input[name="website"]` (the honeypot field) and submits.  
**Expected:** Server returns `200` with `{ ok: false, botDetected: true }` (silent discard, no
email sent).  
**Blocked by:** Same as #1. Also: confirm honeypot field name once spec patch is merged
(open question from Wave 3 spec review — `botcheck` vs `website`).

### 3. Resend email receipt verification (manual gate)
**When:** Happy path form submission in CI.  
**Expected:** Asmah receives a confirmation email at `hello@cedartutoringacademy.com` within
~30 seconds.  
**Blocked by:** Resend API key provisioned in Azure SWA environment variables; no way to
automate email inbox inspection without a test email provider (Mailosaur / Resend sandbox mode).  
**Owner when ready:** Asmah confirms receipt; document as explicit manual gate in CI runbook.

### 4. Field validation — required fields missing
**When:** User submits the form with empty required fields.  
**Expected:** Inline validation errors appear per field; no network request is made.  
**Blocked by:** Form not mounted.

### 5. Field validation — invalid email
**When:** User enters `not-an-email` in the email field and submits.  
**Expected:** Email field shows validation error; form is not submitted.  
**Blocked by:** Form not mounted.

### 6. additionalNotes max-length (2000 chars)
**When:** User enters 2000 characters in the additionalNotes textarea and submits.  
**Expected:** Form submits successfully.  
**When (over limit):** User enters 2001+ characters.  
**Expected:** Server returns `{ ok: false, errors: { additionalNotes: "..." } }`.  
**Blocked by:** Form not mounted + Azure Function.  
**Note:** Two separate tests needed — 2000 chars (valid boundary) and 2001 chars (invalid boundary).
Spec says max is 2000; previous test plan draft used 5000/6000 — use 2000 per confirmed spec.

### 7. Response envelope shape assertions
**When:** API returns error response.  
**Expected:** `errors` is an **object** `{ fieldName: "message" }` (not an array).  
**Note:** This was a required fix from the Wave 3 spec cross-review (mouse-4). Ensure all
fixture assertions use object shape before writing tests.

### 8. Form submit — network error / Azure Function down
**When:** The Azure Function is unavailable (simulate by blocking the API route).  
**Expected:** UI shows a user-friendly error ("Something went wrong. Please try again or call us.");
no unhandled crash.  
**Blocked by:** Form not mounted + Azure Function.

### 9. Custom calendar (post-Calendly phase-out)
**When:** Wave 3 ships its own scheduling solution.  
**Expected:** Calendar renders without Calendly; slot selection flows into form submission.  
**Blocked by:** Custom calendar not designed yet.

### 10. Form payload validation — camelCase field names
**When:** Azure Function integration tests (Playwright against SWA preview deployment).  
**Expected:** All fixture fields use camelCase: `parentName`, `email`, `childName`, `grade`,
`programInterest`, `additionalNotes`.  
**Note:** Field name mismatch (snake_case vs camelCase) was a required fix from Wave 3 spec review.

---

## Re-enable Criteria

All deferred tests above unblock when **all** of the following are true:

1. **Cedar is ready to phase out Calendly** (Shaeel's call)
2. **Azure SWA provisioned** (see `azure-setup-guide.md`)
3. **Resend API key set** in Azure environment variables
4. **Custom calendar plan confirmed** (or Calendly replaced with another solution)
5. **`BookAssessmentPageClient.tsx` is imported** on the `/book-assessment` route

At that point, Wave 3 implementation ships **form + Resend backend + custom calendar** as a
single coherent replacement. The Azure Function spec (`.squad/specs/azure-function-submit-assessment.md`)
remains the contract for that work.

---

## What IS tested now (Calendly-only state)

- `/book-assessment` H1 heading → `tests/book-assessment.spec.ts`
- Calendly embed container (`.cedar-calendly-host`) in DOM → `tests/book-assessment.spec.ts`
- Supporting sections (What to Expect, social proof, FAQ) → `tests/book-assessment.spec.ts`
- No form rendered (regression guard) → `tests/book-assessment.spec.ts`
- Mobile viewport embed loads → `tests/book-assessment.spec.ts`
- `/free-trial` redirects to `/book-assessment` → `tests/free-trial-redirect.spec.ts`
- Calendly widget init + no JS errors → `tests/free-trial-booking.spec.ts`
- Home hero secondary CTA "Book Free Assessment" → `/book-assessment` → `tests/wave-2.spec.ts`
- Footer has no "Free Trial" link → `tests/wave-2.spec.ts`
- Nav has no "Free Trial" link → `tests/wave-2.spec.ts`
