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
