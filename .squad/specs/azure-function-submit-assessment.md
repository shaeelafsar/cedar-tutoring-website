# Architecture Spec: `POST /api/submit-assessment`

> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-05-07
> **Status:** LOCKED — Round 2 cross-review complete (2026-05-07). All Q1-Q5 answers integrated. Implement against this spec.
> **Implements:** Decision "Form Architecture — Azure SWA Managed Function + Resend" (decisions.md 2026-05-07T14:31:00)
> **Research:** `.squad/research/form-solutions-comparison.md`

---

## Overview

A single Azure Function, managed by Azure Static Web Apps, receives assessment-request form submissions from `BookAssessmentPageClient.tsx`, validates them server-side, and forwards a formatted email to `Info@cedartutoring.com` via the Resend API. The function lives in the repo at `api/submit-assessment/index.ts` and auto-deploys with the SWA.

---

## 1. Endpoint

```
POST /api/submit-assessment
```

- **Same-origin** with the static site (SWA managed Functions are served from the same hostname).
- No CORS headers needed — browser treats it as same-origin.
- Content-Type: `application/json`

---

## 2. Request Payload Schema

```typescript
interface AssessmentRequest {
  // Required fields
  parentName: string;       // max 200 chars
  email: string;            // valid email, max 254 chars
  phone: string;            // ≥10 digits when non-digit chars stripped, max 30 chars raw
  studentName: string;      // max 200 chars
  gradeLevel: string;       // must be one of VALID_GRADES (see §4)
  programInterests: string[]; // 1–10 items, each max 100 chars

  // Optional fields
  preferredLocation: string;       // max 200 chars, default "No preference"
  preferredContactMethod: string;  // one of "phone" | "email" | "either", default "either"
  additionalNotes: string;         // max 2000 chars

  // Anti-spam (required in payload, must be empty)
  botcheck: string;                // honeypot — must be ""
}
```

Total payload cap: **16 KB** (reject with 413 if exceeded).

### Field Mapping from Current Form (`BookAssessmentPageClient.tsx`)

| Client FormState field    | Payload field            |
|---------------------------|--------------------------|
| `parentName`              | `parentName`             |
| `email`                   | `email`                  |
| `phone`                   | `phone`                  |
| `studentName`             | `studentName`            |
| `gradeLevel`              | `gradeLevel`             |
| `programInterests`        | `programInterests`       |
| `preferredLocation`       | `preferredLocation`      |
| `preferredContactMethod`  | `preferredContactMethod` |
| `additionalNotes`         | `additionalNotes`        |
| (hidden input `botcheck`) | `botcheck`               |

**Dropped from client payload:** `access_key` (was Web3Forms key — no longer sent). `subject` and `from_name` are now server-side constants.

---

## 3. Validation Rules (Server-Side)

Validation runs **in order**. First failure returns immediately.

### 3a. Honeypot

- `botcheck` field must exist and be exactly `""` (empty string).
- If non-empty → **200** `{ "success": true, "message": "Assessment request submitted successfully." }` — **silent discard**. Do NOT call Resend. Log `"honeypot triggered"` at INFO level server-side.
- **Rationale (locked 2026-05-07):** Returning a real error code (400/403) tells the bot it was detected and encourages adaptation. A silent 200 makes the bot believe it succeeded. This is the industry-standard honeypot pattern. Observability is maintained via server-side logs.

### 3b. Origin Header

- Read the `Origin` (or `Referer` fallback) request header.
- Compare against the `ALLOWED_ORIGINS` environment variable (comma-separated list, e.g. `https://cedartutoring.com,https://www.cedartutoring.com,https://lively-dune-XXXXX.azurestaticapps.net`).
- **Match semantics (locked 2026-05-07): exact string equality.** No wildcards, no substring matching, no regex. Split `ALLOWED_ORIGINS` on `,`, trim whitespace, compare each entry verbatim against the request `Origin` header. Rationale: simplest and safest — no regex surprises, no accidental subdomain matching.
- If no match → **403** `{ success: false, message: "Forbidden." }`
- In development (`NODE_ENV !== 'production'` or when `ALLOWED_ORIGINS` is unset), skip this check to allow local testing.

### 3c. Content-Type

- Must be `application/json`. If not → **400** `{ success: false, message: "Invalid content type." }`

### 3d. Payload Size

- If `Content-Length` > 16384 bytes → **413** `{ success: false, message: "Payload too large." }`

### 3e. Required Fields

| Field              | Rule                                               |
|--------------------|-----------------------------------------------------|
| `parentName`       | Non-empty after trim, ≤200 chars                    |
| `email`            | Non-empty, matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, ≤254 chars |
| `phone`            | Non-empty, ≥10 digits when `\D` stripped, ≤30 chars raw |
| `studentName`      | Non-empty after trim, ≤200 chars                    |
| `gradeLevel`       | Must be one of `VALID_GRADES` (see §4)              |
| `programInterests` | Array, 1–10 items, each string ≤100 chars           |

### 3f. Optional Fields

| Field                    | Rule                                    |
|--------------------------|-----------------------------------------|
| `preferredLocation`      | String, ≤200 chars (default: "No preference") |
| `preferredContactMethod` | One of `"phone"`, `"email"`, `"either"` (default: `"either"`) |
| `additionalNotes`        | String, ≤2000 chars (default: `""`)     |

### 3g. XSS-Safe Handling

- All string fields: strip HTML tags via a simple regex (`/<[^>]*>/g` → `""`) before using in the email body.
- The email body uses a prebuilt HTML template with escaped values (use a helper like `escapeHtml()` for the Resend HTML payload).
- No user input is ever rendered as raw HTML.

### 3h. Validation Error Response

**400** with body:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "parentName": "Parent name is required.",
    "programInterests": "Select at least one program."
  }
}
```

The `errors` object keys match payload field names. This lets the client highlight specific fields.

---

## 4. Constants (Server-Side)

```typescript
const VALID_GRADES = [
  "Kindergarten",
  "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade",
  "6th Grade", "7th Grade", "8th Grade",
  "9th Grade", "10th Grade", "11th Grade", "12th Grade",
];

const EMAIL_SUBJECT = "Cedar Tutoring — New Assessment Request";
const EMAIL_FROM = "Cedar Tutoring Website <noreply@cedartutoring.com>";
const EMAIL_TO = "Info@cedartutoring.com";
```

**Note on `EMAIL_FROM`:** Requires `cedartutoring.com` domain to be verified in Resend. Until then, use Resend's default onboarding sender (`onboarding@resend.dev`) for testing only.

---

## 5. Resend Payload

```typescript
await resend.emails.send({
  from: EMAIL_FROM,           // "Cedar Tutoring Website <noreply@cedartutoring.com>"
  to: EMAIL_TO,               // "Info@cedartutoring.com"
  subject: EMAIL_SUBJECT,     // "Cedar Tutoring — New Assessment Request"
  reply_to: sanitized.email,  // parent's email so Asmah can reply directly
  html: buildEmailHtml(sanitized),
});
```

### Email HTML Structure

A clean, responsive HTML email containing:

```
Subject: Cedar Tutoring — New Assessment Request

📋 New Assessment Request

Parent/Guardian: {parentName}
Email: {email}
Phone: {phone}
Preferred Contact: {preferredContactMethod}

Student: {studentName}
Grade: {gradeLevel}
Programs: {programInterests joined with ", "}
Preferred Location: {preferredLocation}

Notes: {additionalNotes}

---
Submitted via cedartutoring.com
```

Keep the template simple — no heavy HTML; Asmah reads these on her phone. Inline CSS only (email client compat). The reply-to header lets Asmah tap "Reply" to respond directly to the parent.

---

## 6. Response Shapes

> **Locked 2026-05-07 (Round 2 cross-review).** All responses use `Content-Type: application/json`.
>
> **Canonical envelope:** `{ "success": boolean, "message": string, "errors"?: Record<string, string> }`
>
> The `errors` object (when present) uses **field names as keys** and error messages as values. This is an object, not an array. Rationale: client code can do `errors.parentName` without searching an array.

| Status | Condition | Body |
|--------|-----------|------|
| **200** | Email sent successfully | `{ "success": true, "message": "Assessment request submitted successfully." }` |
| **200** | Honeypot triggered (silent discard) | `{ "success": true, "message": "Assessment request submitted successfully." }` (identical to real success — by design) |
| **400** | Validation failure (missing/invalid fields, bad content-type) | `{ "success": false, "message": "Validation failed.", "errors": { "<fieldName>": "<error description>" } }` |
| **403** | Origin header mismatch | `{ "success": false, "message": "Forbidden." }` |
| **405** | Non-POST method | `{ "success": false, "message": "Method not allowed." }` — include `Allow: POST` response header |
| **413** | Payload > 16 KB | `{ "success": false, "message": "Payload too large." }` |
| **429** | Resend returns 429 (free-tier cap hit) | `{ "success": false, "message": "Rate limited — please try again later." }` — if Resend's response includes a `Retry-After` header, the Function MUST forward it verbatim to the client |
| **500** | Unhandled exception in Function | `{ "success": false, "message": "Internal server error." }` — log full error server-side, never expose to client |
| **502** | Resend API returns non-2xx (other than 429) | `{ "success": false, "message": "Unable to send — please call us at +1 708 890-4400 or email Info@cedartutoring.com" }` — log Resend's error response server-side |

> **Note on SWA-level 429:** Azure SWA also rate-limits at the CDN edge (DDoS protection). Those 429s never reach the Function and are not customizable. The 429 row above covers Resend's own rate limit only.

---

## 7. Environment Variables

| Variable | Location | Example | Notes |
|----------|----------|---------|-------|
| `RESEND_API_KEY` | SWA Application Settings (Azure Portal) | `re_xxxxxxxxxxxx` | **NEVER** in repo, `.env`, or client bundle. Server-only. |
| `ALLOWED_ORIGINS` | SWA Application Settings | `https://cedartutoring.com,https://www.cedartutoring.com` | Comma-separated. Include SWA preview URL during testing. |

**Local development:** Create a local `.env` (gitignored) with these vars for `func start` testing. The existing `.env.local.example` should be updated to reference `RESEND_API_KEY` instead of `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.

---

## 8. Security Posture

| Concern | Mitigation |
|---------|------------|
| **Client-side secrets** | None. `RESEND_API_KEY` is server-only (Function App Settings). No `NEXT_PUBLIC_*` env vars for form secrets. |
| **CORS** | Not needed — SWA managed Functions are same-origin. |
| **Origin validation** | Function checks `Origin`/`Referer` against `ALLOWED_ORIGINS`. |
| **Spam / bots** | Honeypot field (`botcheck` must be empty). SWA built-in DDoS protection. |
| **Rate limiting** | SWA Free tier includes built-in rate limiting (undocumented exact threshold, but sufficient for Cedar's ~50 submissions/month). If needed, Function can add a simple in-memory counter per IP (not required for launch). |
| **XSS** | All user input HTML-stripped and escaped before email template insertion. |
| **Payload size** | 16 KB cap enforced before parsing. |
| **Data at rest** | No data persisted. Submissions exist only as emails in the `Info@cedartutoring.com` inbox. If persistence is needed later, add Azure Table Storage (Phase 2). |

---

## 9. Rate Limiting Strategy

**Launch posture: rely on SWA built-in protection.**

Azure SWA Free tier includes DDoS mitigation and rate limiting at the edge. The exact threshold is not publicly documented but is designed for production static sites. For Cedar's volume (~50 submissions/month, <5/day), this is more than sufficient.

**If abuse is observed post-launch:**

1. Add an in-memory rate limiter in the Function (e.g., 10 submissions per IP per hour using a simple `Map<string, number[]>`). Note: Azure Functions cold-start resets the map, so this is a soft limit — acceptable for Cedar's threat model.
2. Escalate to Azure Front Door rate-limiting rules if sustained abuse occurs (unlikely for a tutoring site).

**Decision: do NOT add custom rate limiting at launch.** It adds complexity for a near-zero probability threat. Revisit if form abuse is observed.

---

## 10. File Structure

```
api/
  submit-assessment/
    index.ts          ← Function entry point (Trinity implements)
    function.json     ← Azure Functions binding config
package.json          ← Dependencies: @azure/functions, resend
```

### `function.json`

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["post"],
      "route": "submit-assessment"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

**Note:** `authLevel: "anonymous"` is correct — the Function is public-facing. Authentication is not needed for a contact form; spam protection is handled by honeypot + origin check.

---

## 11. Test Hooks (for Mouse)

Mouse's test plan should exercise these assertions against the deployed SWA preview URL:

| # | Test case | Expected |
|---|-----------|----------|
| 1 | POST valid payload → 200 + `{ success: true }` | Email arrives at test inbox |
| 2 | POST with non-empty `botcheck` → 200 (silent discard) | No email sent, response identical to success |
| 3 | POST with missing required field (`parentName: ""`) → 400 + field-level error | `errors.parentName` present |
| 4 | POST with invalid email format → 400 + field-level error | `errors.email` present |
| 5 | POST with invalid grade → 400 | `errors.gradeLevel` present |
| 6 | POST with oversized payload (>16 KB) → 413 | Rejected before parsing |
| 7 | POST from wrong Origin header → 403 | Rejected |
| 8 | GET /api/submit-assessment → 405 | Method not allowed |
| 9 | POST with `Content-Type: text/plain` → 400 | Rejected |
| 10 | POST valid payload, Resend returns error → 502 + fallback message | Graceful error with phone/email |
| 11 | Client form: submit with all fields → success state renders | E2E browser test |
| 12 | Client form: submit with empty fields → client-side validation errors | No network request made |

Tests 1–10 are API-level (Playwright `request` context or direct fetch). Tests 11–12 are browser-level (Playwright page context). Test 10 requires Resend to be down or a test double — Mouse decides approach.

---

## 12. Client-Side Changes Required

Trinity updates `BookAssessmentPageClient.tsx`:

1. **Remove** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` constant and its env var.
2. **Change** `fetch("https://api.web3forms.com/submit", ...)` to `fetch("/api/submit-assessment", ...)`.
3. **Remove** `access_key`, `subject`, `from_name` from the JSON body (these are now server-side constants).
4. **Keep** the `botcheck: ""` field in the body (honeypot still needed).
5. **Keep** the graceful-fallback error message showing phone + email on failure.
6. **Update** the response handling: the Function returns `{ success: boolean, message: string, errors?: Record<string, string> }`.
7. **Optionally** map `errors` from the 400 response to highlight specific form fields (nice-to-have, not required for launch).
8. **Remove** the `if (!WEB3FORMS_ACCESS_KEY)` guard — the Function is always available when deployed to SWA.

---

## 13. Migration Checklist (references pre-production-checklist.md)

1. ☐ Shaeel: Sign up for Resend, get API key
2. ☐ Shaeel: Provision Azure SWA (Free plan), link GitHub repo
3. ☐ **Trinity: Remove/guard `basePath: '/cedar-tutoring-website'` in `next.config.ts`** — MUST land on `main` before first successful SWA build. See `.squad/decisions/inbox/trinity-nextconfig-basepath-azure.md`.
4. ☐ Shaeel: Add `RESEND_API_KEY` + `ALLOWED_ORIGINS` to SWA Application Settings
5. ☐ Shaeel: Verify `cedartutoring.com` sending domain in Resend (DKIM/SPF)
6. ☐ Trinity: Scaffold `api/submit-assessment/index.ts` per this spec
7. ☐ Trinity: Rewire `BookAssessmentPageClient.tsx` (§12)
8. ☐ Trinity: Update `.env.local.example` (drop `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, add `RESEND_API_KEY`)
9. ☐ Mouse: Execute test plan (§11) against SWA preview deployment
10. ☐ Shaeel: DNS cutover — cedartutoring.com → SWA
11. ☐ Trinity: Retire `deploy-pages.yml` after cutover verified
12. ☐ Shaeel: Make repo private (post-cutover)
