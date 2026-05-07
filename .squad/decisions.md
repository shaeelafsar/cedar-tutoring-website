# Team Decisions

> Canonical decision ledger for Cedar Tutoring Academy website rebuild.
> All agents read this before starting work. Append-only.

## Active Decisions

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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
