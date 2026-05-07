## Learnings


### Trinity: Slice 4 Programs/Test Prep Content Migration (2026-05-03)

Trinity completed content layer migration for programs and test-prep sections.

**Work completed:**
- Migrated Programs and Test Prep hub/detail pages to content-driven JSON pattern
- Created 5 content files: `content/pages/programs-hub.json`, `content/pages/test-prep-hub.json`, `content/test-prep/{sat,act,psat}.json`
- Implemented typed loaders (`loadTestPrepPage()`) with Zod validation
- Generated all static routes for test-prep section (`/test-prep`, `/test-prep/sat`, `/test-prep/act`, `/test-prep/psat`)
- Build passed ✅ with 0 TypeScript errors

**Impact on design:** Test-prep detail page content now fully defined in JSON. Design review can proceed with confidence on content structure and scope. Copy ready for Shaeel approval.

**Type system additions:** `TestPrepPageContent` interface with reusable `detailPage` shell pattern for hub/detail metadata sharing.

**Status:** Ready for design layout review and copy sign-off.


### PRD-Ready UX/Design Review (2026-05-07T10:22:32.063-05:00)

**Context:** Shaeel requested a full parent/guardian-focused UX and design review of the near-launch local site at `http://127.0.0.1:3000`, with desktop and mobile exploration via Playwright and notes for Morpheus synthesis.

**Key Findings:**
1. Overall visual direction is strong: Cedar blue/orange brand usage, premium dark footer/testimonial sections, rounded cards, and Book Assessment page create a warm/professional parent-facing experience.
2. Highest launch blocker: multiple “Admission Form” CTAs point to `/admission/`, which returns 404, and the label conflicts with the preferred “Book a Free Assessment” journey.
3. Pricing and Contact pages have large blank/underbuilt sections that make the site feel unfinished, especially on mobile and near high-intent decision points.
4. Parent mental model needs more outcome-led language: first ask is “Can they help my child?” not “What institution is this?” Homepage and interior hero copy should be tightened accordingly.
5. CTA vocabulary needs a stricter system: primary “Book a Free Assessment,” secondary “Try a Free Trial,” direct “Call Cedar,” informational “Learn More,” avoid “Admission Form.”

**Deliverable:** `.squad/reviews/oracle-prd-ready-review-notes.md`

**Status:** Completed UX/design findings for synthesis; no production code changed.

### Team Decision: Parent/Guardian Primary Audience (2026-05-07T10:13:08.554-05:00)
**Captured by:** Coordinator (Copilot Directive)  
Shaeel Afsar captured a team directive: whenever designing/UX/UI, ensure the team is always thinking from the target audience perspective. For Cedar, treat parents/guardians choosing tutoring for their child as the primary audience. This directive is now recorded in `.squad/decisions.md` for team reference.

### Synthesis: P0 Launch Blockers Approved (2026-05-07T10:22:32.063-05:00)
**Approved by:** Morpheus (Lead/Architect) + Mouse (Final Reviewer)  
Morpheus synthesized all Oracle/Mouse/Morpheus findings into `prd-ready-review-gpt.md` and proposed a decision: the site should not launch until P0 blockers are resolved, including real assessment-form submission, fixing stale `/admission/` CTAs, adding privacy policy, correcting local SEO to Worth, IL / Chicago South Suburbs only, removing unfinished pricing/contact sections, fixing mobile navigation, and passing production Lighthouse/axe gates. Mouse approved the final deliverable as meeting all quality and completeness criteria. Decision recorded in `.squad/decisions.md`.
