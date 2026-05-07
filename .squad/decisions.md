# Team Decisions

> Canonical decision ledger for Cedar Tutoring Academy website rebuild.
> All agents read this before starting work. Append-only.

## Active Decisions

### 2026-05-07T11:10:33.863-05:00: Owner Action Brief — P0 launch blockers prioritization
**By:** Morpheus (Lead/Architect)
**Status:** APPROVED
**Decision:** Use the report's existing P0 launch blockers as the owner-facing launch brief and recommended fix order. Treat P1 items as post-P0/pre-announcement improvements, and P2/P3 items as launch-quality or post-launch polish rather than the first owner escalation.
**Rationale:** The owner needed a concise, business-readable summary without changing the underlying audit. The existing report already identifies the five P0 blockers and separates P1/P2/P3 work, so the brief should surface those findings without introducing unsupported claims.

### 2026-05-04T19:26:14.937-05:00: Markdown files with YAML frontmatter as canonical content source
**By:** Trinity (Frontend Engineer)
**Status:** APPROVED
**Decision:** Adopt Markdown files with YAML frontmatter as the canonical content source for Cedar marketing pages, programs, test prep pages, and site metadata.
**What changed:**
- Each page section has its own Markdown file (e.g., `content/pages/home/hero.md`, `content/pages/about/story.md`)
- Reusable collections live in clearly named Markdown files tied to the owning page/domain (e.g., `content/pages/reviews/testimonials.md`)
- Content loaders read from filesystem with `gray-matter`, validate with Zod, parse body with `remark`
- Legacy JSON files under `content/` removed post-migration
**Why:**
- Editors update copy in component-level files without navigating large JSON objects
- Directory structure maps cleanly to rendered site structure
- Markdown body copy easier to scan and edit than nested JSON
- Type safety and static-export compatibility preserved
**Trade-offs:**
- Loader logic more sophisticated (parses Markdown body instead of static JSON)
- Repeated structured data (filters, testimonials, pricing, nav trees) still in frontmatter arrays for type safety
**Validation:** `npm run build` ✅ | `npm run lint` ⚠️ (pre-existing unrelated issue in ralph-triage.js)

### 2026-05-03T15:51:16.373-05:00: Reviews grade-level filtering derived from testimonial relation text
**By:** Trinity (Frontend Engineer)
**Status:** APPROVED
**Decision:** The Reviews page derives its grade-level filter (`elementary`, `middle-school`, `high-school`, `all-ages`) from each testimonial's existing `relation` text instead of adding a new dedicated `gradeLevel` field to `content/collections/testimonials.json`.
**Why:**
- Avoids duplicating information already present in the testimonial content model
- Keeps the testimonial schema lean while still supporting meaningful filters on the all-reviews page
- Preserves backwards compatibility for homepage/program/test-prep testimonial consumers
**Trade-off:** If content needs more granular or editor-controlled review segmentation later, the team may still choose to add an explicit `gradeLevel` field in Phase 2.
**Impact:** All testimonials map cleanly to review filters without schema extension. Reduces JSON file size and maintenance burden.

### 2026-05-07T10:13:08.554-05:00: User directive — parents/guardians as primary audience
**By:** Shaeel Afsar (via Copilot)
**Status:** APPROVED
**Decision:** Whenever designing/UX/UI, ensure the team is always thinking from the target audience perspective; for this site, treat parents/guardians choosing tutoring for their child as the primary audience.
**Why:** User request — captured for team memory

### 2026-05-07T10:22:32.063-05:00: PRD-ready review synthesis — launch blockers P0
**By:** Morpheus (Lead/Architect)
**Status:** APPROVED
**Decision:** Do not mark the Cedar Tutoring Academy site PRD-ready or production-ready until P0 launch-readiness defects from `prd-ready-review-gpt.md` are fixed. The primary conversion funnel should use **Book a Free Assessment** as the canonical first step; **Free Trial** should be treated as a supporting offer unless the business intentionally chooses two separate funnels.
**Rationale:** Parents/guardians are making a trust-sensitive decision for their child. Broken conversion links, placeholder lead submission, missing privacy policy, wrong local SEO geography, and unfinished pricing/contact areas create avoidable distrust at high-intent moments.
**Required acceptance criteria:**
- Assessment form submits to a real owner-tested destination.
- `/admission` and `/admission/` redirect to `/book-assessment/`; stale Admission Form CTAs are removed.
- Privacy policy exists and is linked near data collection paths.
- Worth, IL / Chicago South Suburbs is the only local geography used in copy, metadata, and structured data.
- Pricing/contact pages no longer show unfinished blank sections.
- Mobile navigation exposes subject/test-prep child routes or an accessible intentional alternative.
- Production build passes final link, Lighthouse/Web Vitals, and axe launch gates.

### 2026-05-07T10:22:32.063-05:00: Final review deliverable approved
**By:** Mouse (Tester/QA)
**Status:** APPROVED
**Decision:** Approve `prd-ready-review-gpt.md` as the final deliverable for the user's PRD-ready review request.
**Basis:** File exists at repo root with exact required name. Parent/guardian target-audience mental model is explicit and central. Required lenses covered. Launch blockers and prioritized recommendations grounded in source notes. Raw appendices preserve three source-note artifacts verbatim.
**Gate implication:** This approval is for the review deliverable only. The deliverable correctly states the website should not launch until P0 blockers are resolved.

### 2026-05-07T11:31:02-05:00: Site-wide CTA standardization to "Book a Free Assessment"
**By:** Trinity (Frontend Dev) — Wave 1 P0 execution
**Status:** APPROVED
**Source:** combined-review.md P0 #2; converged Opus + GPT consensus
**Decision:** Site-wide primary CTA standardized as **"Book a Free Assessment"** linking to `/book-assessment/`. The **"Admission Form"** CTA wording is retired across the active site (content/ + src/).
**What changed:** `content/pages/home/cta.md` lines 4–6: "Admission Form" → "Book a Free Assessment", `/admission/` → `/book-assessment/` | `content/programs/_hub.md` lines 46–48: same CTA swap in finalCta.primaryCta | All CTA references now point to `/book-assessment/` endpoint
**Verification:** Grep across `src/` and `content/` confirms zero remaining instances of "Admission Form" text and zero remaining references to `/admission/` path in active code. The `/admission` and `/admission/` paths remain 404 by design — static export to GitHub Pages cannot do server-side redirects.
**Rationale:** Converged decision across Opus and GPT reviews. "Book a Free Assessment" is the canonical first step in the parent/guardian conversion funnel; all first-order CTAs must be consistent.

### 2026-05-07T11:31:02-05:00: Local SEO geography canonical phrasing
**By:** Trinity (Frontend Dev) — Wave 1 P0 execution
**Status:** APPROVED
**Source:** combined-review.md P0 #4; verified across src/ and content/
**Decision:** Local SEO geography canonical phrasing is **"Worth, IL and the South Suburbs of Chicago"** (or **"serving Worth, IL and the South Suburbs of Chicago"** in JSON-LD descriptions). All "Dallas-Fort Worth" references removed from active site code/content.
**What changed:** `src/lib/seo.ts` line 9: DEFAULT_DESCRIPTION updated to use "serving Worth, IL and the South Suburbs of Chicago" instead of "Dallas-Fort Worth" | `src/app/(marketing)/page.tsx` line 67: JSON-LD description aligned to "serving Worth, IL and the South Suburbs of Chicago"
**Verification:** Grep across `src/` and `content/` confirms zero remaining instances of "Dallas-Fort Worth" in any variant. SEO metadata validation: tsc --noEmit clean. Lint clean (9 pre-existing failures in unrelated files unchanged).
**Rationale:** Parent/guardians in the Worth, IL and Chicago South Suburbs area need accurate local geography in both visible copy and SEO metadata to build trust and ensure correct search indexing.

### 2026-05-07T11:31:02-05:00: Contact page — Cities we serve section status update
**By:** Scribe (Wave 1 P0 execution)
**Status:** VERIFIED-COMPLETE
**Source:** combined-review.md P0 #10; pre-session verification
**Note:** P0 #10 (Cities we serve section on Contact page) was already complete prior to this Wave 1 session. No edit required. `content/pages/contact-us/_page.md` already lists 15 cities; `src/app/(marketing)/contact-us/page.tsx` already renders the full cities list. The original review finding was based on a pre-fix snapshot. Capturing this note ensures Wave 1 execution correctly reflects current state and prevents duplicate analysis in future sessions.

### 2026-05-07T11:40:51-05:00: /pricing Page Strategy — Partial Pricing Disclosure Model
**By:** Morpheus (Lead/Architect)
**Status:** APPROVED
**Source:** WP live site extraction from https://cedartutoring.com/plans/
**Decision:** The new `/pricing` page uses a 3-tier comparison layout: As-Needed ($40/session), Family Plan ($699.99/$749.99/month contact-gated), and Academic Coaching (contact-gated). No blank containers. Page mirrors the live WP site's intentional partial-disclosure sales pattern.
**Rationale:** Parents/guardians need honest, real pricing tiers even if some say "Contact us" instead of dollar figures. Matches WP site discovery (prices are Elementor-rendered, not in HTML).
**Ambiguities resolved by Trinity Wave 2B:** Free trial scope, cancellation policy, sibling discounts, plan-switch policy, and academic coaching pricing flagged for Shaeel/Asmah confirmation post-merge.

### 2026-05-07T12:14:01-05:00: WP Pricing Data Extraction Results — Consolidated
**By:** Oracle (UX/Design Lead)
**Status:** APPROVED
**Source:** cedartutoring.com vision extraction (Playwright + Claude vision), verified against Morpheus curl-extraction
**Decision:** Live site pricing tiers confirmed as canonical source for new /pricing page:
- **As-Needed Tutoring:** $40/session (public)
- **Family Plan:** $699.99/month (5 sessions/week); $749.99/month (6 sessions/week)
- **Homework Help:** $419.99–$699.99/month (3–6 sessions/week)
- **Academic Coaching:** Contact for pricing (not published on WP)
**Caveat:** WP /homework/ page prices ($419.99–$699.99) are labeled "Homework Help," not "Academic Coaching." Trinity Wave 2B uses correct labeling.

### 2026-05-07T12:42:00-05:00: Wave 2A Implementation — Web3Forms integration + P0 fixes
**By:** Trinity (Frontend Dev)
**Status:** COMPLETE — pending review
**Change set:**
1. **book-assessment form:** Replaced TODO submit handler with real Web3Forms integration; env var `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` required; botcheck honeypot added; friendly error fallback if key missing.
2. **Navigation:** Removed "Free Trial" CTA from top nav to eliminate competing first-step (kept in footer as secondary path).
3. **Footer:** Removed broken `/blog` link.
4. **Privacy policy:** Created new `/privacy-policy` page with lawyer-review banner (amber) and full content sections; reusable child's privacy detail included.
5. **Home hero:** Changed H1 from "WELCOME TO CEDAR TUTORING ACADEMY!" to "Personalized tutoring that helps your child feel confident again" (parent-benefit framing per audience decision).
**Env Note:** Owner must set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` before deploy. Free tier: 250 submissions/month.
**Deferred:** Lawyer review of privacy policy; hero subheadline/CTA revision optional.

### 2026-05-07T12:42:00-05:00: Wave 2B Implementation — /pricing page full rebuild + sub-tier toggles
**By:** Trinity (Frontend Dev)
**Status:** READY FOR REVIEW — 4 FAQ items flagged for Shaeel/Asmah confirmation
**Change set:**
1. **Content:** `content/pages/pricing/_page.md` — Three tiers with YAML-managed sub-tiers (Family Plan: 5/6 week; Homework Help: 3/4/5/6 week).
2. **Schema:** Extended `PricingTier` interface with `PricingSubTier` + optional `subTiers[]` and `defaultSubTierIndex`.
3. **Component:** New Client Component `PricingCardInteractive.tsx` with `aria-pressed` pill toggles (keyboard/SR accessible); defaults: Family Plan → 5/week, Homework Help → 4/week.
4. **FAQ:** 4 answers written in good faith, all flagged for owner verification before launch.
**Flags for confirmation:**
- Plan switching allowed mid-month or only at billing start? Any fees?
- Free assessment includes subject test or only level evaluation?
- Additional sibling discounts beyond Family Plan?
- Cancellation policy: exact language, grace periods, monthly plan refunds?
**Validation:** tsc ✅, lint ✅ (baseline unchanged).

### 2026-05-07T12:36:00-05:00: Wave 2C Implementation — About/team cleanup (founder rename + placeholder removal)
**By:** Trinity (Frontend Dev)
**Status:** COMPLETE
**Change set:**
1. **Founder:** Renamed "Amina Rahman" → "Asmah" in `content/pages/about/team.md`; updated bio and portrait path to match story.md truth.
2. **Placeholders removed:** Deleted 3 fictional team entries (Nora Hassan, Omar Siddiqui, Sarah Khan) + their SVG portraits via `git rm`.
3. **Page body:** Rewrote for single-founder framing.
**Verification:** 0 remaining refs to Amina/Nora/Omar/Sarah in codebase. tsc ✅, lint ✅ (baseline unchanged).
**Note:** `asmah.svg` remains placeholder; owner will supply real photo pre-launch.

### 2026-05-07T14:00:00-05:00: Hosting target — migrate from GitHub Pages to Azure
**By:** Shaeel Afsar (via Coordinator)
**Status:** APPROVED
**Decision:** Production deploy will move from GitHub Pages to Azure (likely Azure Static Web Apps + Azure Functions). Shaeel works at Azure and gets ~$100/month free credit, which makes Azure cheaper than GitHub Pages Pro (Pro is required to keep this repo private while still publishing Pages).
**Why:**
- Repo can stay private without paying for GitHub Pages Pro
- Free Azure credit covers Static Web Apps + Functions for a low-traffic marketing site
- Functions are needed to host a Web3Forms relay (see related decision)
**Impact:**
- GitHub Pages remains the deploy target for now (until Azure is provisioned)
- Once Azure SWA is set up, we'll add `.github/workflows/azure-static-web-apps.yml` and retire `deploy-pages.yml`
- DNS / domain decision still pending — call out in pre-production checklist

### 2026-05-07T14:00:01-05:00: Web3Forms API key — never commit; relay through Azure Function
**By:** Shaeel Afsar (via Coordinator)
**Status:** APPROVED
**Decision:** The Web3Forms access key MUST NOT be committed to the repo or stored in any client-readable env var (`NEXT_PUBLIC_*`). For Azure migration we will add an Azure Function relay that holds the key in Function App settings (server-side only); the client form will POST to our Function URL, the Function adds the secret key, then forwards to api.web3forms.com.
**Why:**
- `NEXT_PUBLIC_` env vars are inlined into the client bundle at build time — anyone can view-source the deployed site and harvest the key
- Web3Forms' public-key model relies on origin checks + rate limits, but Shaeel does not want to accept that exposure
- Azure Functions free tier (1M executions/mo) easily covers a tutoring contact form
**Impact:**
- Until Azure Function relay is built, the form remains in graceful-fallback mode (shows phone + email instead of submitting). This is intentional — better than leaking the key to make GitHub Pages work.
- When Shaeel signs up at web3forms.com he will hold the key locally; coordinator will NOT receive it via chat.
- Future implementation: Azure Function `cedar-form-relay` accepts POST from same-origin, validates honeypot, calls Web3Forms with key from Function App settings.
- The current `BookAssessmentPageClient.tsx` Web3Forms wiring needs to be updated when relay is in place — endpoint changes from `https://api.web3forms.com/submit` to the Function URL, and the `access_key` field is dropped from the client payload.

### 2026-05-07T14:00:02-05:00: Privacy policy — stays generic for now
**By:** Shaeel Afsar (via Coordinator)
**Status:** APPROVED
**Decision:** The 10-section privacy policy at `/privacy-policy/` stays as-is, with the amber lawyer-review banner. No revision pass is needed before launch; a real lawyer review will happen when business operations require it (paid traffic, integrations with payment processors, etc.).
**Why:** Generic-but-accurate is sufficient for a low-risk static marketing site with a simple contact form. The amber banner sets expectations.
**Impact:**
- Pre-production checklist item "🔒 Privacy policy lawyer review" is downgraded from blocker to "post-launch / when business needs it"
- Banner stays until lawyer review happens

### 2026-05-07T14:00:03-05:00: /pricing FAQ — removed for now
**By:** Shaeel Afsar (via Coordinator)
**Status:** APPROVED
**Decision:** The FAQ section on /pricing is being removed entirely (4 placeholder Q&As) until real answers are available. Trinity is implementing the removal.
**What changed:** 
- Removed `faqEyebrow`, `faqItems` from `content/pages/pricing/_page.md` frontmatter
- Removed the 5th H2 section ("## Common questions before you enroll.") from markdown body
- Removed FAQ rendering block from `src/app/(marketing)/pricing/page.tsx`
- Removed `FAQAccordion` import from pricing/page.tsx
- Removed `Pricing — FAQ has at least 3 Q&A pairs` test from `tests/wave-2.spec.ts` (11 → 10 tests)
- Made schema fields `.optional()` in `src/lib/content/schemas.ts`
- Updated `src/types/content.ts` to make `faqSection` optional in `PricingPageContent`
**Why:** Placeholder copy hurts trust on a pricing page; better to have no FAQ than a fake one.
**Impact:**
- Schema for pricing page made `.optional()` for FAQ — re-adding is a content-only change later
- Wave 2 test count drops from 11 to 10 (FAQ test removed)
- Shaeel still owes 4 answers eventually (plan switching, free assessment scope, sibling discounts, cancellation policy) — tracked in pre-production checklist under "Deferred" rather than "Blocker"
**How to Re-Add:** Add YAML frontmatter + markdown H2 section back to `_page.md`, restore `FAQAccordion` rendering to page.tsx, and re-add test to wave-2.spec.ts (all schema fields still support it).

### 2026-05-07T14:00:04-05:00: Wave 2 Verdict — All verification points passed (Chromium)
**By:** Mouse (Tester/QA)
**Status:** APPROVED
**Decision:** Approve Wave 2 test suite for commit. All 11 verification points passed on Chromium. No real bugs found; three in-session test-authoring issues (strict-mode locator precision) were corrected and are NOT application defects.
**Verified:** Top Nav, Footer, Home Hero, Privacy Policy page, Pricing tiers (As-Needed/Family/Homework Help), Pricing FAQ ≥3 Q&As, About/Team, Book-Assessment form, Mobile viewport (375×812).
**Non-blocking caveats:** FAQ answers flagged for owner verification (plan switching, free assessment scope, sibling discounts, cancellation policy). `asmah.svg` is placeholder. Web3Forms key not provisioned (expected).

### 2026-05-07T14:00:05-05:00: Wave 2 Verdict — Firefox compatibility verified
**By:** Mouse (Tester/QA) — instance mouse-4
**Status:** APPROVED
**Decision:** Approve Wave 2 test suite for Firefox. All 11 verification points passed on Firefox. No real bugs found. No Chromium-specific APIs present in spec — already browser-agnostic.
**Browser testing:** Desktop Firefox + mobile Firefox projects added to `playwright.config.ts`. Added `firefox` and `mobile-firefox` device profiles.
**Note:** Two earlier strict-mode locator precision issues (from older spec revision) had already been fixed in current spec on disk by Mouse-3.
**Impact:** Test suite is cross-browser ready. `mobile-firefox` project added but not tested in this run; future use case available.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction

### 2026-05-07T14:31:00-05:00: Form Architecture — Azure SWA Managed Function + Resend
**By:** Morpheus (Lead/Architect)
**Status:** APPROVED
**Decision:** Use Azure Static Web Apps managed Azure Function as the form relay endpoint, sending assessment-request emails via Resend (email API) to `Info@cedartutoring.com`. Drop Web3Forms from the architecture entirely.
**What changes:**
- Form in `BookAssessmentPageClient.tsx` POSTs to `/api/submit-assessment` (same-origin Azure Function, auto-deployed with SWA)
- Azure Function validates honeypot + Origin header, reads `RESEND_API_KEY` from App Settings, calls Resend API
- No `NEXT_PUBLIC_*` env vars for form secrets — key lives exclusively in Azure Function App Settings
- Web3Forms dependency removed (no access key needed, no third-party form vendor)
- Resend free tier: 3,000 emails/month, 100/day — Cedar needs ~50/month
**Why:**
- Shaeel rejected exposing API keys to the browser (rules out Web3Forms public-key model)
- Azure SWA managed Functions are free (1M executions/mo) and same-origin (no CORS)
- Resend has the best DX for solo devs: simple API, instant account approval, auto DKIM/SPF
- SendGrid rejected: painful account approval for new accounts, overkill API complexity
- Web3Forms relay rejected: adds unnecessary vendor; Resend does everything directly
- Total cost: $0 (Azure free credit + Resend free tier)
- Setup time: ~2 hours
**Impact:**
- Trinity: implement `api/submit-assessment/index.ts` + update form client
- Mouse: test Function (POST → mock → assert payload, honeypot rejection, origin check)
- Pre-production checklist: add Azure SWA provisioning, Resend account, DNS, DKIM/SPF/DMARC verification
- Graceful-fallback mode (phone/email display) remains active until Function is deployed and tested
**Research:** Full analysis at `.squad/research/form-solutions-comparison.md`

### 2026-05-07T14:59:00-05:00: Azure Function Submit-Assessment Spec Locked
**By:** Morpheus (Lead/Architect)
**Status:** APPROVED (auto-approved — implements Wave 3 Azure SWA + Resend decision)
**Decision:** Architecture spec for `POST /api/submit-assessment` is locked at `.squad/specs/azure-function-submit-assessment.md`. All implementation decisions final:
- Payload schema matches `BookAssessmentPageClient.tsx` FormState exactly (camelCase fields)
- Validation order: honeypot → Origin → Content-Type → payload size → required fields → optional fields
- Response codes: 200/400/403/405/413/429/500/502
- No custom rate limiting (SWA built-in sufficient)
- No CAPTCHA (honeypot + Origin check sufficient)
- No data persistence (emails only; add Azure Table Storage in Phase 2 if needed)
- Two env vars: `RESEND_API_KEY` and `ALLOWED_ORIGINS`
**Impact:**
- Trinity: implement `api/submit-assessment/index.ts` + client rewire
- Mouse: test plan maps to spec §11 test hooks
- Shaeel: provision Azure SWA, Resend account, DNS cutover
- Pre-production checklist: updated with sequenced Azure tasks
- combined-review.md: Wave 3 section updated

### 2026-05-07T14:57:00-05:00: next.config.ts basePath Blocks Azure Deploy
**By:** Trinity (Frontend Engineer)
**Status:** FLAG — needs implementation before SWA first build
**Decision:** `next.config.ts` currently sets `basePath: '/cedar-tutoring-website'` when `NODE_ENV=production`. Since `next build` always runs with `NODE_ENV=production`, this will cause the first Azure SWA build to serve from `/cedar-tutoring-website/` path instead of domain root.
**Fix:** Gate basePath behind `DEPLOY_TARGET=github-pages` env var instead of `NODE_ENV`. Use option (b):
- Add `const deployTarget = process.env.DEPLOY_TARGET` check
- Apply basePath only when `deployTarget === 'github-pages'`
- Update `deploy-pages.yml` to set `env: DEPLOY_TARGET: github-pages`
- No change needed for Azure workflow
**Timing:** Must land on `main` before Azure SWA build can succeed
**Files:** `next.config.ts`, `deploy-pages.yml` (GitHub workflow)

### 2026-05-07T14:59:00-05:00: Azure Function Test Plan — 5 Open Questions from Mouse
**By:** Mouse (Tester/QA)
**Status:** RESOLVED (responses from Morpheus/Trinity in parallel decisions below)
**Questions:**
- Q1: Exact response body shapes → RESOLVED: use spec §6 shapes (errors as object, not array)
- Q2: Resend `from` and `subject` → RESOLVED: from = `"Cedar Tutoring Website <noreply@cedartutoring.com>"`, subject = `"Cedar Tutoring — New Assessment Request"`
- Q3: ALLOWED_ORIGINS match semantics → RESOLVED: exact string match on comma-separated list, no wildcards
- Q4: Resend 429 Retry-After behavior → RESOLVED: omit `Retry-After` from Function response (don't forward from Resend)
- Q5: Honeypot field name (`botcheck` vs `website`) → RESOLVED: confirmed `botcheck` (existing form unchanged)

### 2026-05-07T15:05:00-05:00: Morpheus Round 2 Cross-Review — Q1–Q5 Locked
**By:** Morpheus (Lead/Architect)
**Status:** LOCKED (single-round review, final)
**Decision:** All 5 Mouse questions answered; spec patched with Q1/Q4/Q5 corrections:
- Response envelopes: `{ success: bool, message: string, errors?: Record<string, string> }` (NOT array)
- Honeypot behavior: **200 silent discard** (NOT 400) — indistinguishable from success to deter bots
- Honeypot name: confirmed `botcheck`
- Resend 429: omit Retry-After forwarding (simplicity > complexity at Cedar volume)
- Form email: `from = "Cedar Tutoring Website <noreply@cedartutoring.com>"`, `subject = "Cedar Tutoring — New Assessment Request"`
- ALLOWED_ORIGINS: exact match, comma-separated, no wildcards
- Honeypot logged at INFO level (observability without disclosure to client)
**Patched files:** `.squad/specs/azure-function-submit-assessment.md` (honeypot to 200, Retry-After removed, field names camelCase throughout)

### 2026-05-07T15:06:00-05:00: Mouse Test Plan Requires 4 Mechanical Fixes
**By:** Morpheus (Cross-review) → Mouse (Action items)
**Status:** APPROVED WITH FIXES (structure and coverage solid; 4 fixes needed before code)
**Fixes required:**
1. Field names: All test fixtures use snake_case; spec uses camelCase. Update: `parent_name` → `parentName`, `parent_email` → `email` (not `parent_email`), `student_name` → `studentName`, `grade_level` → `gradeLevel`, `program_interests` → `programInterests`, `preferred_location` → `preferredLocation`, `additional_notes` → `additionalNotes`, `preferred_contact_method` → `preferredContactMethod`
2. Response shape: `errors` is object `{ fieldName: "message" }`, not array `[{ field, message }]`. Update all assertions in §1.3/1.4/1.9/2.3
3. additionalNotes max length: Test uses 5000/6000 chars; spec says 2000. Split §1.9 into two tests: (a) 2001 chars → 400 validation error, (b) payload > 16KB total → 413
4. Honeypot test §1.2: Already correct (recommends 200 silent discard); once spec is patched, no further change needed
**Impact:** Mouse can write test code once these fixes are in place. Spec is now locked with all answers.

### 2026-05-07T15:06:00-05:00: Trinity Spec Review — 3 Spec Gaps, 4 Test Plan Issues
**By:** Trinity (Frontend Engineer)
**Status:** NEEDS REVISIONS (3 fixes) + flagged issues (4 test plan fixes)
**Findings:**
1. Honeypot response code: Spec says 400; industry standard is 200 silent discard. Trinity recommends 200 (Morpheus implemented this fix in parallel)
2. Runtime spec gap: Node.js version and Azure Functions v3 vs v4 not specified. Recommend v4 (app.http() model) with Node 20 LTS
3. `additionalNotes` max length: Spec says 2000; test plan references 5000 (clarify in spec comments)
4. Form contract locked in table with camelCase field names, required/optional flags, max lengths, validation types. All match `BookAssessmentPageClient.tsx` exactly
5. `programInterests` is array (not comma-joined string as Web3Forms used)
6. basePath fix recommendation: Gate behind `DEPLOY_TARGET=github-pages` (option b), not removed entirely — needed for GitHub Pages fallback during DNS transition
7. Implementability: GO for payload/validation/response/Resend/env vars; blocked on honeypot behavior + runtime clarification
**Action:** Morpheus to clarify v3 vs v4 model preference in spec §10

### 2026-05-07T15:06:00-05:00: Azure Setup Guide & basePath Implications
**By:** Trinity (Frontend Engineer)
**Status:** APPROVED (Step 6 guide is complete; two minor gaps flagged)
**Gaps:**
1. Capture actual `ALLOWED_ORIGINS` value entered during provisioning (needed to verify Trinity's implementation)
2. Clarify whether Resend is using verified domain (`cedartutoring.com`) or fallback (`onboarding@resend.dev`) — affects `EMAIL_FROM` constant Trinity uses
**Otherwise:** Guide structure solid, hand-off checklist complete, pre-deployment verification steps clear
### 2026-05-07T16:48:29-05:00: User directive — Wave 3 paused
**By:** Shaeel (via Squad coordinator)
**What:** Wave 3 (Azure SWA + Resend form backend) is paused pending Shaeel's Azure provisioning. Continue Wave 4 / housekeeping / Wave-3-prep work that's safe to land independently. **Reminder owed:** when Shaeel signals "back on Wave 3" (or at start of any session where Azure has been provisioned), surface the Wave 3 resume checklist immediately.
**Why:** Shaeel needs to provision Azure SWA + sign up for Resend (out-of-band action). Team should not sit idle in the meantime, and assumption is Wave 3 spec stays locked.
# Wave 3 Paused — What Ships Now (2026-05-07)

**Author:** Morpheus (Lead/Architect)  
**Status:** APPROVED — ready for squad dispatch  
**Shaeel's directive:** Pause Wave 3 until Azure SWA + Resend provisioning unlocks. Continue safe work in parallel.

---

## Executive Summary

While Wave 3 (Azure SWA + Resend form backend) is paused, **four independent workstreams are safe to land now**:

1. **Housekeeping (git cleanup)** — Trinity owns, ~30 min, LOW RISK → ship first
2. **basePath env-gate** — Trinity owns, ~2 hours, LOW-MEDIUM RISK → ship second (accelerates Wave 3 when it resumes)
3. **Wave 4 P1 nav restructure** — Trinity owns, ~8 hours, MEDIUM RISK → ship third (touches every page, needs full QA)
4. **Wave 4 P1 mobile drawer fix** — Trinity owns, ~3 hours, LOW RISK → ship in parallel with nav (both navigation)

All other Wave 4 items require Asmah (photographer session, business expert review) or are blocked by basePath (housekeeping).

---

## Recommended First Batch (parallel)

| # | Item | Agent | Risk | Parallel | Why Now |
|---|------|-------|------|----------|---------|
| 1 | **Housekeeping: commit git items** (history.md, .gitignore, skills folder) | Trinity | LOW | ✓ | Unblocks the queue. Takes 30 min. |
| 2 | **basePath env-gate: `DEPLOY_TARGET=github-pages`** | Trinity | LOW-MED | ✓ | ~2 hours. Safety-nets Wave 3 implementation. When Shaeel provisions SWA, first build won't serve from `/cedar-tutoring-website/`. This is a pre-requisite for Wave 3 to land cleanly. Lands independently on main; GH Pages still works. |
| 3 | **Wave 4 P1 #15: nav restructure** (6 items, flat structure, Reviews added) | Trinity | MEDIUM | ⏳ after #2 | Large surface area (Header/nav on every page, multiple routes). Needs full Playwright pass after. Serialize after basePath to keep main stable. |
| 4 | **Wave 4 P1 #11: mobile drawer nested routes** (expose Programs/Test Prep children, fix test) | Trinity | LOW | ✓ parallel w/ #3 | Small, scoped. Fixes a known test failure (wave-2.spec.ts). Can go out in parallel as long as nav structure is locked. |

---

## basePath Env-Gate Decision: GO ✓

**Status:** APPROVED. Can land independently. No blocking changes needed. Safety-nets Wave 3 implementation.

### Current Blocker
- `next.config.ts` gates basePath on `NODE_ENV === 'production'`
- `next build` always runs with `NODE_ENV=production` → basePath always active
- First Azure SWA build will serve from `/cedar-tutoring-website/` instead of domain root → BROKEN

### Solution
Gate on `DEPLOY_TARGET=github-pages` instead:
- **Option (b) from decisions.md**: Use env var to distinguish deployment targets

### Implementation Brief for Trinity

**Files to change:**

1. **`next.config.ts`** (5 lines):
```typescript
// OLD:
const isProduction = process.env.NODE_ENV === "production";

// NEW:
const deployTarget = process.env.DEPLOY_TARGET || '';
const isGitHubPages = deployTarget === 'github-pages';
```
Replace the spread operator condition:
```typescript
// OLD:
...(isProduction ? { basePath: repoBasePath, assetPrefix: `${repoBasePath}/` } : {})

// NEW:
...(isGitHubPages ? { basePath: repoBasePath, assetPrefix: `${repoBasePath}/` } : {})
```

2. **`.github/workflows/deploy-pages.yml`** (1 line in build step):
```yaml
# In the "Build" step, change:
- name: Build
  run: npm run build

# To:
- name: Build
  run: npm run build
  env:
    DEPLOY_TARGET: github-pages
```

3. **No source code changes needed:**
   - `imagePath()` utility in `src/lib/image-path.ts` already handles dual-base pattern correctly
   - All image/link paths flow through `imagePath()` (verified via grep)
   - Calendly iframe does not depend on basePath (src is absolute URL)

### Local dev + SWA behavior:
- **Local `npm run dev`:** `DEPLOY_TARGET` unset → basePath disabled → serve from `/` ✓
- **Local `npm run build && npm start`:** `DEPLOY_TARGET` unset, `NODE_ENV=production` → basePath disabled → serve from `/` ✓
- **GH Pages CI:** `DEPLOY_TARGET=github-pages` → basePath enabled → `/cedar-tutoring-website/` ✓
- **Azure SWA build:** `DEPLOY_TARGET` unset (Azure CI won't set it) → basePath disabled → serve from `/` ✓

### Test plan:
1. Verify GH Pages still works after merge (rerun existing deploy workflow)
2. Verify local build works: `DEPLOY_TARGET='' npm run build` → no basePath in output
3. Verify GH Pages build works: `DEPLOY_TARGET=github-pages npm run build` → basePath in output
4. (Wave 3) Verify SWA build works: standard `npm run build` in SWA CI → no basePath ✓

### Risk: LOW-MEDIUM
- Mechanical change, well-tested in build system
- GH Pages behavior unchanged (CI always sets DEPLOY_TARGET)
- SWA behavior unlocked (no basePath, correct for domain root)
- Fallback: if SWA deploys wrong, just unset `DEPLOY_TARGET` in SWA build settings (a 30-second Azure Portal click)

---

## Full Ordered Shortlist

| # | Item | Agent | Risk | Parallel? | Blocker | Why This Position |
|---|------|-------|------|-----------|---------|-------------------|
| 1 | **Housekeeping: commit 5 git items** (morpheus/history.md, .gitignore dev-server.log, .squad/skills/ folder, playwright.config.ts investigation, wave-2.spec.ts investigation) | Trinity | LOW | ✓ | None | Clear the queue immediately. 30 min. Unblocks main for next PRs. |
| 2 | **basePath env-gate: `DEPLOY_TARGET=github-pages`** (next.config.ts + deploy-pages.yml) | Trinity | LOW-MED | ✓ | None | Safety-nets Wave 3. Can land now, no GH Pages breakage. Prerequisite for clean SWA handoff. ~2 hours (including local + CI test cycles). |
| 3 | **Wave 4 P1 #15: nav restructure** (6 items: logo-as-home, Programs/Test Prep flat, Reviews added, drop Free Trial from nav, 32px gaps, sentence-case) | Trinity | MEDIUM | ⏳ after #2 | Asmah confirmation on Free Trial removal (minor, already consensus but worth double-check) | Touches every page. Large surface area. Needs full Playwright pass after. Serialize AFTER basePath to keep main stable. ~8 hours (Trinity build + Trinity test + review). |
| 4 | **Wave 4 P1 #11: mobile drawer nested routes** (expose Programs/Test Prep child routes, fix wave-2.spec.ts test) | Trinity | LOW | ✓ parallel w/ #3 | nav structure (#3) must be locked first (drawer reflects nav hierarchy) | Small, scoped. Known failing test. Can ship in parallel once nav structure is locked. ~3 hours. |
| 5 | **Wave 4 P1 #17: sticky mobile CTA bar** ("Book a Free Assessment") | Trinity | LOW | ✓ independent | None | Complementary to mobile drawer fix. Low risk, high UX impact on mobile. Can ship anytime. ~2 hours. |
| 6 | **Wave 4 P1 #18: click-to-call icon in mobile nav** | Trinity | LOW | ✓ independent | None | Tiny feature. ~1 hour. Can ship anytime. |
| 7 | **Wave 4 P1 #30: subtle hover micro-interactions** (50ms scale on cards, 100ms button shift, 150ms nav underline) | Trinity | LOW | ✓ independent | None | Polish. Can ship anytime. ~2 hours. |
| 8 | **Wave 4 P1 #1–7 (copy/content-only):** FAQ re-add placeholder + sentence-case hero + business expert review + photographer session prep | Asmah | MEDIUM-HIGH | ⏳ blocked | Asmah availability + photographer scheduling | All require Asmah input/approval. Not actionable yet. Queue for after housekeeping + nav complete. |
| 9 | **Wave 4 P1 #25: Lighthouse + axe audit** (Performance ≥90, Accessibility ≥95) | Mouse | MEDIUM | ⏳ after #3–#7 | nav restructure complete (large change to the page) | Run after major nav/mobile changes to baseline performance. ~2 hours to capture + address criticals. |

---

## Recommended Dispatch Order (by phase)

### Phase 1: Housekeeping (30 min, LOW RISK) — go now
- **1:** Commit git items (Trinity)

### Phase 2: Wave 3 Safety-Net (2 hours, LOW-MEDIUM RISK) — go now
- **2:** basePath env-gate (Trinity)

### Phase 3: Nav Restructure (8 hours, MEDIUM RISK) — serialize after Phase 2
- **3:** Nav restructure (Trinity, includes Asmah confirmation on Free Trial)
- **4:** Mobile drawer nested routes (Trinity, parallel with #3)

### Phase 4: Mobile Polish (5 hours, LOW RISK) — parallel with Phase 3
- **5:** Sticky mobile CTA bar (Trinity)
- **6:** Click-to-call icon (Trinity)
- **7:** Hover micro-interactions (Trinity)

### Phase 5: Audit & Content (post-Trinity) — serialize after #3
- **9:** Lighthouse + axe audit (Mouse, after nav is stable)
- **8:** FAQ / content / photographer session (Asmah, whenever ready)

---

## Reminder When Wave 3 Resumes

> **When Shaeel signals "back on Wave 3":**
> 
> "Wave 3 is unblocked. Recap: basePath env-gate landed on main (basePath now guarded by `DEPLOY_TARGET=github-pages`). Azure SWA builds will serve from domain root, not `/cedar-tutoring-website/`. Resend account + domain verification ready? If yes, Trinity scaffolds `api/submit-assessment/index.ts`, rewires `BookAssessmentPageClient.tsx`, updates `.env.local.example`. Mouse runs the test plan. Follow `azure-setup-guide.md` for Shaeel's provisioning steps. First build should be clean."

---

## Key Decisions Locked

1. **basePath env-gating:** Approved for independent land. Prerequisite for Wave 3.
2. **Nav structure:** Consensus locked (logo-as-home, 6 items flat, Reviews added, Free Trial → inside-funnel only). Asmah to confirm Free Trial removal minor reversal.
3. **Mobile drawer:** Must reflect final nav structure; test must be updated; ship in parallel with nav.
4. **Wave 3 sequencing:** basePath lands first; then SWA provisioning can proceed cleanly.

---

## Blockers / Open Items

- **Asmah free-trial nav removal confirmation** (minor — already consensus, but Shaeel had earlier kept it. Worth a 30-second async check before Trinity builds nav).
- **Shaeel's Azure SWA + Resend provisioning** (out of scope for this shortlist, but critical path for Wave 3 resume).
- **Photographer session scheduling** (Asmah owns, not urgent for code ship).

---

## Appendix: Why These 4 Workstreams Are Safe

✓ **Housekeeping:** Pure cleanup. No code logic changes. No merge conflicts.  
✓ **basePath env-gate:** Gated by env var (no default behavior change for local/SWA). GH Pages behavior identical (we always set DEPLOY_TARGET in CI).  
✓ **Nav restructure:** Scoped to Header + routes. Touches every page but no form/API changes. Can test in isolation. Large, but independent of Wave 3.  
✓ **Mobile drawer:** Affects drawer nested nav only. Small surface area. Fixes known test failure.  

❌ **Form backend (Wave 3):** Needs `RESEND_API_KEY` + `ALLOWED_ORIGINS` from Azure SWA Application Settings (Shaeel task).  
❌ **FAQ re-add:** Needs Asmah to confirm real answers (not actionable yet).  
❌ **Photographer session:** Needs Asmah to schedule (not actionable yet).
# basePath Env-Gate Decision — Trinity Summary (2026-05-07)

**Author:** Trinity (Frontend Dev)  
**Commit:** 18d15ec — build: env-gate basePath behind DEPLOY_TARGET=github-pages  
**Status:** SHIPPED to main

## Decision

`next.config.ts` previously gated `basePath: '/cedar-tutoring-website'` and `assetPrefix` on `process.env.NODE_ENV === 'production'`. Since `next build` always runs with `NODE_ENV=production` regardless of deploy target, this meant every production build — including future Azure SWA builds — would incorrectly set basePath, causing the site to serve from `/cedar-tutoring-website/` instead of domain root on SWA.

The gate was switched to `process.env.DEPLOY_TARGET === 'github-pages'`. The GH Pages CI workflow (`deploy-pages.yml`) now sets `DEPLOY_TARGET=github-pages` in the build step `env:` block, preserving existing behavior. Azure SWA builds (which do not set this variable) will correctly produce no basePath, enabling domain-root serving.

**Before:**
```typescript
const isProduction = process.env.NODE_ENV === "production";
...(isProduction ? { basePath: repoBasePath, assetPrefix: `${repoBasePath}/` } : {})
```

**After:**
```typescript
const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";
...(isGitHubPages ? { basePath: repoBasePath, assetPrefix: `${repoBasePath}/` } : {})
```

## Sharp Edge — Follow-up Required

`src/lib/image-path.ts` still uses `NODE_ENV === 'production'` to compute the image basePath string. This helper will misbehave on Azure SWA (prepending `/cedar-tutoring-website` to image URLs on a domain-root deployment). This needs a follow-up commit to align it with `DEPLOY_TARGET === 'github-pages'` before Wave 3 goes live.

---

# Session 2026-05-07: Wave 3 Pause + Free Trial / Book Assessment Merge

**Status:** All decisions locked. Trinity dispatched for implementation. Calendly integration post-form-submit, form-first UX, and two Shaeel constraints (no duplicate data via prefill, Calendly as removable component) codified.

---

## Deploy Target: GitHub Pages (Until Wave 3 Ready)

**Directive:** Continue deploying to GitHub Pages until Azure SWA is provisioned AND Wave 3 (form backend + Resend) is fully shipped and verified live.

**Rationale:** Azure provisioning is async (Shaeel-side action). Do not break the live site while waiting.

**Mechanism:** The `basePath` env-gate (committed in 18d15ec + follow-up image-path.ts sync) preserves this. The GH Pages CI workflow sets `DEPLOY_TARGET=github-pages` in the build step, which keeps basePath active. Local dev and future Azure SWA builds (which do not set this variable) correctly omit basePath, enabling domain-root serving.

**No premature DNS cutover, no GH Pages workflow retirement, no private-repo flip** until Wave 3 is live on SWA.

---

## Free Trial vs Book Assessment: Anti-Drift Catch + UX Analysis

**Wave 1 P0 #2 decision (locked 2026-05-07):** Site-wide primary CTA standardized as **"Book a Free Assessment"** linking to `/book-assessment/`. The "Admission Form" wording is retired.

**Problem flagged by Morpheus (Architecture):** The current two-page model (Free Trial + Book Assessment) violates P0 #2 by maintaining two equally visible entry points, fragmenting lead tracking and creating parent-side UX confusion. Both pages exist with competing CTAs (nav shows Free Trial; hero shows Book Assessment), but Cedar's ops team is not deliberately running a dual-funnel strategy. Result: Calendly bookings have zero assessment context; form submissions have no calendar availability. Asmah must check two places (Calendly + email) for new leads.

**UX analysis by Oracle:** Parent-facing fatigue is real. Both CTAs promise the same outcome ("book a free tutoring thing"); neither signals a difference in experience. From the parent's perspective, having two equally prominent pathways creates cognitive load (Hick's Law: choice complexity increases decision time and error likelihood). For a trust-driven service like tutoring, clarity + consistency build trust; two confusing CTAs undermine professionalism.

**Consensus:** Both Oracle (UX) and Morpheus (IA) recommend merge. This fixes the drift, restores P0 #2, and clears Wave 4 nav restructuring path.

---

## Merge Decision: APPROVED (Form-First, Calendly Post-Submit)

**Shaeel directive (locked 2026-05-07):**

1. **Merge approved.** `/free-trial` and `/book-assessment` collapse into a single canonical page at `/book-assessment/`.
   - `/free-trial` becomes a permanent 301 redirect to `/book-assessment` (preserves SEO + existing inbound links).
   - "Free Trial" removed from primary nav.
   - Hero secondary CTA across the site unifies to "Book Free Assessment" (per Wave 1 P0 #2 — drift now corrected).

2. **Form-first, Calendly post-submit.**
   - Above the fold: form. Calendly does NOT render until form is submitted.
   - After successful form submit: optional Calendly section appears with prefilled data (parent name, email, student name, grade, program interests, location) so parents who want to grab a slot immediately can, without re-entering info.
   - Form success state stands alone (green checkmark, thank-you message, what-happens-next reassurance) — Calendly is purely additive below it.

### Constraint A: No Duplicate Data Entry

**Implementation rule:** Use `react-calendly` `<InlineWidget />` `prefill` prop to map form fields to Calendly custom questions:
```tsx
<InlineWidget
  url="..."
  prefill={{
    name: `${parentName}`,
    email: parentEmail,
    customAnswers: {
      a1: studentName,
      a2: gradeLevel,
      // map remaining form fields to Cedar's Calendly event type custom questions
    }
  }}
/>
```
After form submit (success state), pass form values into Calendly as prefill. If Cedar's Calendly event type doesn't have matching custom questions yet, Trinity leaves a TODO + pings Asmah via test plan to align. Basic name/email prefill honors the constraint; richer prefill is incremental.

### Constraint B: Calendly Is Transitional — Keep It Removable

**Implementation rule:** Keep the post-submit Calendly section as a **self-contained, isolated component** (one component, one import, one JSX section). When Wave 3 Resend backend is live and Cedar has internal scheduling, removing Calendly must be a single-component delete + props change, NOT a refactor. Do NOT couple Calendly's render state to the form's success state in a way that requires Calendly to exist for "form submitted" UX to work.

---

## Page Structure (Merged `/book-assessment`)

**Fold-by-fold reference:** Oracle's mockup (`oracle-merged-book-assessment-mockup.md`, archived) details each section. TL;DR:

1. **Hero:** "Let's Find the Right Fit for Your Child" + warm tutor-student photo + "Start Assessment" CTA (scrolls to form).
2. **Form (primary):** 7 fields (parent name, email, phone, student name, grade, program interests, location, notes, contact preference). Validation + "No Credit Card" reassurance below submit.
3. **Calendly (post-submit only):** Appears after form success. Copy: "Or pick a time now." Prefilled. Optional fallback: "We'll reach out within 24 hours if you skip this."
4. **Context + Social Proof:** How assessments work + testimonials + FAQ (existing content reused).

**Why form-first:** Forms should come early to capture intent. Respects parent time. Real fields (name, email, phone) signal trust. Contact preference dropdown reduces friction (no surprise phone call if they prefer email).

**Why Calendly post-submit:** Psychologically crucial for intent-shown parents. Gives both lead types a path (instant bookers + deliberate planners). Operational clarity: Cedar's system gets form data + calendar event (if booked) OR form data + scheduled callback (if Calendly skipped).

---

## Wave 3 Impact: ZERO

This is content/UX reorg, not backend change. Form payload schema, Azure Function design, Resend integration — all unchanged. The merged form fields = current form fields. Adding Calendly post-submit is purely a render concern, not a backend concern.

---

## Build / Dispatch

- **Trinity (sonnet 4.6):** Implementing merged page now. Estimate ~4.5–6 hours. Full structure per Oracle mockup; prefill logic per Constraint A; self-contained Calendly component per Constraint B.
- **Mouse (sonnet 4.6):** Queued. Runs after Trinity confirms green local build to update Playwright test coverage (Wave 2 / Wave 4 scope).
- **Scribe:** Running in parallel with Trinity to flush 5 pending inbox files (this entry) into decisions.md.

---

## Session 2026-05-07 (continued): Calendly-only pivot + Wave 3 rescope

**Timeline:** 2026-05-07 17:30–17:50  
**Agents:** Shaeel (coordinator), Morpheus (architect), Trinity (in-flight), Mouse (parallel QA), Scribe (merge + logs)

### Pivot Trigger: Duplicate-Fields Bug

While testing the merged `/book-assessment` page with Calendly inline embed, Shaeel discovered duplicate form fields: Cedar's assessment form rendered above Calendly's own booking form. When a parent selected a slot on Calendly's widget, Calendly presented its booking form (name, email, custom questions) *in addition to* Cedar's form, creating UX friction despite prefill attempts.

**Shaeel's directive:** Drop Cedar's form entirely on `/book-assessment`. Use Calendly alone until Wave 3 (Calendly phase-out).

### Implementation: Calendly-only Path

- **`/book-assessment`** page becomes Calendly-only: inline Calendly embed + hero copy, What to Expect, social proof, FAQ sections (per Oracle mockup) — no form rendering
- **Form code preservation:** `BookAssessmentPageClient.tsx` remains in repo as scaffolding for future Wave 3 custom form, marked dormant with TODO comment
- **Nav/CTA unification:** Site-wide CTA standardization to "Book Free Assessment" → `/book-assessment` still ships (per Wave 1 P0 #2)
- **Redirect:** `/free-trial` → 301 to `/book-assessment` still ships
- **Asmah's workflow:** Calendly event type already captures intake questions via custom questions field; no operational friction

### Wave 3 Rescoped: Full Calendly Replacement

Morpheus clarified: Wave 3 shifts from "form backend only" to **atomic replacement of both form + calendar together.**

**Rationale:** Intermediate state (form but still Calendly calendar) recreates the duplicate-fields wart. Replacing both as a unit keeps intake flow coherent.

**New scope:**
- Custom form (Azure Function, Resend backend, honeypot validation) — unchanged contract
- Custom calendar (TBD approach: build, OSS lib, or self-hosted SaaS)
- Both ship together; Wave 3 pause continues until calendar architecture is decided

**Five open questions surfaced:**
1. Custom calendar implementation approach (build vs OSS vs SaaS)
2. Availability & sync strategy (Asmah's current workflow + Google Calendar integration mapping)
3. Concurrent slot booking prevention (database transactions, optimistic/pessimistic concurrency)
4. Reminder email automation (24h before, day-of; Resend templates + cron or Azure Logic Apps)
5. Data storage & migration (Azure Table Storage, CosmosDB, PostgreSQL; Calendly booking cutover strategy)

**Anti-drift verification:** Calendly-only intermediate state honors Wave 1 P0 #2 (canonical CTA `/book-assessment`). When Wave 3 ships, same URL endpoint serves custom form + calendar; no CTA redirect needed.

### Implementation Commits

- **1c0d348** (initial form-first merge, superseded for `/book-assessment` route only): CTA unification, nav cleanup, `/free-trial` redirect survive; form-first rendering discarded
- **fe9f9ab** (Wave 3 spec rescope): Updated `.squad/specs/azure-function-submit-assessment.md` with rescope decision + 5 open questions; updated `combined-review.md` Wave 3 section and `azure-setup-guide.md` context
- **fb3c5f7** (Calendly-only pivot): `/book-assessment` renders Calendly-only + sections; `BookAssessmentPageClient.tsx` dormant; form code preserved for Wave 3

**Deployment:** GitHub Pages run 25526377501 verified Calendly-only shape live.

### What Survives from Form-First Build

- CTA unification work (site-wide "Book Free Assessment" → `/book-assessment`)
- Nav cleanup (remove "Free Trial" from primary + mobile nav)
- `/free-trial` → `/book-assessment` redirect
- Footer updates
- Page structure + sections (hero, What to Expect, social proof, FAQ)
- Azure Function spec, Resend integration contract, honeypot validation logic — Wave 3 foundation

### Learnings

When product UX hits a dead-end (duplicate-fields bug), prefer pivot-in-place over revert: rescope the current work to drop the problematic component, preserve supporting work that remains valid. The form-first merge shed the form rendering but kept the CTA unification, nav restructure, and page structure — substantial work that advances the site even on the Calendly-only path.
