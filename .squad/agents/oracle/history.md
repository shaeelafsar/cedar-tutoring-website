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

### Wave 1 P0 Execution: CTA & Local SEO Standardization (2026-05-07T11:31:02-05:00)
**Status Update:** ✅ CLOSED (3 of 10 P0 items)  
Trinity closed P0 #2 (CTA standardization "Book a Free Assessment" → `/book-assessment/`), P0 #4 (local SEO "Worth, IL and the South Suburbs of Chicago"), and P0 #10 (contact cities status). All design review findings for these items have been implemented. Decisions captured in `.squad/decisions.md`. Oracle's UX findings for remaining P0 items (#1, #3, #5–#9) remain active for future waves.

### Synthesis: P0 Launch Blockers Approved (2026-05-07T10:22:32.063-05:00)
**Approved by:** Morpheus (Lead/Architect) + Mouse (Final Reviewer)  
Morpheus synthesized all Oracle/Mouse/Morpheus findings into `prd-ready-review-gpt.md` and proposed a decision: the site should not launch until P0 blockers are resolved, including real assessment-form submission, fixing stale `/admission/` CTAs, adding privacy policy, correcting local SEO to Worth, IL / Chicago South Suburbs only, removing unfinished pricing/contact sections, fixing mobile navigation, and passing production Lighthouse/axe gates. Mouse approved the final deliverable as meeting all quality and completeness criteria. Decision recorded in `.squad/decisions.md`.

### WP Pricing Extraction via Vision (2026-05-07T11:40:51-05:00)
**Task:** Extract actual pricing from live cedartutoring.com WP site using Playwright screenshots + vision capability.

**Extracted Pricing Data:**

| Tier | Price | Unit | Sessions/month | What's Included | Fine Print |
|------|-------|------|----------------|-----------------|------------|
| As-Needed Tutoring | $40 | per session | Pay-as-you-go | Book only sessions you need; 48-hour advance notice | No commitment required |
| Family Plan (5 sessions) | $699.99 | monthly | 5 sessions/week | Freedom to choose which child attends each day; 1 hour tutoring per day; mix and match between children | 48-hour advance notice required |
| Family Plan (6 sessions) | $749.99 | monthly | 6 sessions/week | Same as 5-session plan with additional day | 48-hour advance notice required |
| Academic Coaching | Contact | — | — | Elementary, middle, high school; math, reading, writing, science, Arabic | "More Info" CTA only; no price on WP site |
| Transportation | Contact | — | — | Drop-off service; free within 5-mile radius | "More Info" CTA only |

**Test Prep Pricing:** The /free-trial/ page mentions "COMPETITIVE MONTHLY PACKAGES" for Academic Coaching, Advancement & Test Prep, and Personalized Tutoring—but displays NO actual prices. Test prep pricing is gated behind "learn more" CTAs.

**Observations:**
- Only As-Needed Tutoring ($40/session) is visible on main /plans/ page
- Family Plan pricing ($699.99 & $749.99) is ONLY visible on /plans/family-plan/ sub-page in styled Elementor banner graphics (orange/green gradient bars with white text)
- Academic Coaching has NO visible pricing anywhere—gated behind consultation
- /plans/as-needed-tutoring/ and /plans/academic-coaching/ return 404
- No sibling-discount, cancellation, or rollover language visible on any page
- Free Trial: 2 free tutoring sessions offered across all programs

**Visual Design Notes for Trinity (new /pricing page direction):**
- WP site uses bold colored banner strips (orange/green gradients) with large white price text for Family Plan tiers
- Session counts displayed in large numbers on left side of banner (e.g., "5 SESSIONS", "6 SESSIONS")
- Price positioned on right side with "/MONTHLY" suffix
- Description text in smaller white font between session count and price
- Overall: high-contrast, bold, easy-to-scan pricing cards—recommend similar approach for new site
- Main /plans/ page uses simple card layout with image + title + description + red "More Info" CTA button

### Homework Help Pricing Extraction (2026-05-07T12:14:01-05:00)
**Task:** Vision-read pricing bubbles from https://cedartutoring.com/homework/ to extract "Academic Coaching" tiers previously not found.

**KEY FINDING:** The /homework/ page pricing is labeled **"Plans Available"** (NOT "Academic Coaching"). These are the **Homework Help / Personalized Tutoring** plans, which differ from the Family Plan pricing on /plans/family-plan/.

**Extracted from /homework/ (via Playwright + Vision):**

| Tier | Price | Unit | Sessions/week | Description |
|------|-------|------|---------------|-------------|
| 3 Sessions | $419.99 | monthly | 3 | "Your child will attend Cedar Tutoring 3 days per week, for one hour a day." |
| 4 Sessions | $549.99 | monthly | 4 | "Your child will attend Cedar Tutoring 4 days per week, for one hour a day." |
| 5 Sessions | $649.99 | monthly | 5 | "Your child will attend Cedar Tutoring 5 days per week, for one hour a day." |
| 6 Sessions | $699.99 | monthly | 6 | "Your child will attend Cedar Tutoring 6 days per week, for one hour a day." |

**Visual Design:** Same Elementor pricing-bubble pattern as Family Plan—orange/blue/green gradient banners, large white session count on left, description in center, price+"/MONTHLY" on right.

**Page Context:**
- Heading: "Plans Available"
- CTA: "Book a Free Consultation Now" (green button)
- Sidebar: FREE TRIAL promo, RECENT POSTS
- Benefits listed above pricing (numbered 5–10): school-aligned approach, improve weak spots, productive teacher ratio, boost confidence, tested programs, vastly experienced teachers

**⚠️ IMPORTANT LABEL DISCREPANCY:**
The WP page calls these **"Plans Available"** under the /homework/ URL, NOT "Academic Coaching." The previously captured "Academic Coaching" on /plans/ page was a different category (subjects: math, reading, writing, science, Arabic) with **no visible pricing** (gated behind "More Info" CTA).

**Recommendation for Shaeel:**
1. These /homework/ plans are likely the "Homework Help" or "Personalized Tutoring" tiers—NOT "Academic Coaching."
2. Note the price difference: /homework/ 5-session plan = $649.99/mo vs /plans/family-plan/ 5-session = $699.99/mo. Different products!
3. Suggest labeling these as "**Homework Help Plans**" or "**Personalized Tutoring**" on the new /pricing page, keeping "Academic Coaching" as a separate contact-gated category if it still exists.

---

## Wave 3 Pause & Phase 3 Dispatch (2026-05-07)

- **Wave 3 paused** by Shaeel pending Azure SWA + Resend provisioning (infrastructure provisioning is out-of-band; spec fully locked; ready to ship when Azure+Resend ready)
- **Morpheus Wave 3 pause shortlist:** 4 phases of safe work during pause
  - Phase 1 ✓: Housekeeping (f59034b)
  - Phase 2 ✓: basePath env-gate (18d15ec + d89d835) — prerequisite for Wave 3 SWA deployment
  - Phase 3 (pending Shaeel nav decision): Nav restructure + mobile drawer
  - Phase 4 (parallel with Phase 3): Mobile UX polish
- **Phase 3 gating:** Awaiting Shaeel confirmation on nav restructure (logo-as-home, 6-item flat nav, Reviews added, Free Trial moved to inside-funnel only). Minor: Asmah to confirm Free Trial nav removal (already consensus).
- **basePath GO decision:** Ready to ship independently. Safety-nets Wave 3 — both GitHub Pages and local dev verified. Azure SWA builds will correctly serve from domain root (no `/cedar-tutoring-website` prefix) ✓
