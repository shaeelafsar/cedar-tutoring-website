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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
