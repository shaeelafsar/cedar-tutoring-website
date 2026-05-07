## Summary

**Web-design specialist executing framework-grounded UX/UI audit for Cedar Tutoring Academy website (May 7).** Applied Nielsen heuristics, Krug, CCD Attention Ratio, Hick's Law, IA (Rosenfeld/Morville), Halvorson Content Audit, WCAG 2.1 AA, Gestalt+Fitts frameworks. Captured 40 Playwright screenshots (20 pages × 2 viewports) to assess design coherence, accessibility, and user expectations. Verdict: site is NOT bloated; repetition is intentional per design intent. Found 1 P0 (duplicate intro on /pricing) and 4 visual-rendering bugs missed by smoke testing (team images /about, fields /summer-programs, reviews grid /reviews, map /locations). Screenshots stored in `.squad/agents/oracle/screenshots/` (do not commit — large PNGs). Findings feed into Wave 3 fix priorities and post-deployment regression testing.

## Learnings

### UX/UI Bloat & Repetition Audit (2026-05-07T18:22:39-05:00)

**Request:** Shaeel wanted a comprehensive bloat and repetition audit across all pages — identify what to trim, merge, or dedupe.

**Key Findings:**
1. **CTA density is appropriate** — 3-5 CTAs per page (hero + inline + closing) is standard conversion pattern. Exception: /book-assessment has 10 (self-referential bloat).
2. **Testimonial reuse is conservative** — Only 7 testimonials used across site. Home shows 3, /reviews shows all 18. Program pages show 1-2 relevant ones. No bloat detected.
3. **Cross-page structural repetition is intentional:**
   - "finalCta" section on 9 pages → standard conversion pattern, keep
   - "trustBullets" vary per page context (not copy-paste)
   - Process sections differ between programs vs test-prep
4. **Content overlap between /why-us and Home "Why Cedar":**
   - Home has 4-item "Why Cedar" section with comparison table
   - /why-us has expanded version with full competitor comparison + 10 reasons list
   - **Verdict:** NOT duplicate — Home teases, /why-us delivers. Keep both.
5. **FAQ overlap:**
   - /faq has 18 items across 5 categories
   - Program/test-prep detail pages have 2-3 page-specific FAQ items
   - /book-assessment has 4 assessment-specific FAQ items
   - **Verdict:** No duplication — each FAQ is contextually relevant
6. **Page size rankings (KB):** /reviews (186K), /faq (100K), /why-us (98K), /about (85K). Reviews is largest due to 18 testimonial cards — acceptable for a dedicated reviews page.

**P0 Recommendation:** Trim /book-assessment redundant "Book" CTAs (10→5) and self-referential copy.

**P1 Recommendations:**
- Consider removing Home "Why Cedar" comparison table (just keep 4-item differentiator list) since /why-us has the full comparison
- /free-trial page could be simplified since /book-assessment now covers same user intent

**Inventory for future reference:**
- 9 pages with finalCta closing sections
- 10 pages with trustBullets in CTAs
- 18 testimonials total (7 reused across 2-3 pages each)
- 5 process/enrollment flows (Programs detail, Test-prep detail, Home "How It Works", /book-assessment "What to Expect", /free-trial "What happens after")

---

### Merged /book-assessment Mockup — Concrete UX Structure (2026-05-07T17:12:53-05:00)

**Request:** Shaeel asked for a fold-by-fold walkthrough of what the merged Free Trial + Book Assessment page would look like. Needed: concrete sections, real copy, parent journeys, failure-mode mitigations, and time estimate.

**Decision (Oracle):** 
- **Form-first structure:** Assessment intake form is primary (captures student context), Calendly widget embeds post-submit as optional fast-track (rewards form completion, gives parents speed choice).
- **Section order (hero to footer):** Hero ("Let's Find the Right Fit") → Form → Success State + Calendly (conditional) → "What to Expect" (reassurance) → Testimonials → FAQ.
- **Parent journeys:** Journey A (Deliberate) fills form, waits for Cedar callback (most parents). Journey B (Impulse) fills form, optionally grabs Calendly slot for immediate booking (fast-track). Both capture context.
- **Failure mitigations:** Post-submit Calendly avoids visual clutter (form and Calendly never compete). Wave 2 Calendly fix applies to merged page (responsive iframe). 301 redirect from `/free-trial/` preserves SEO.
- **Time estimate:** Trinity: 4.5–6 hours (success state UI, Calendly integration, redirect, testing).

**Deliverable:** `.squad/decisions/inbox/oracle-merged-book-assessment-mockup.md` — Full page structure with copy, journeys, and implementation notes.

**Status:** Ready for Shaeel approval (form-first vs Calendly-first choice) + Morpheus IA review + Trinity implementation.


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

### Free Trial vs Book Assessment — CTA Consolidation Recommendation (2026-05-07T17:05:22-05:00)

**Context:** Shaeel asked whether Wave 4 nav having both "Free Trial" (Calendly direct-book) and "Book Assessment" (form + callback) creates sign-up fatigue/UX confusion.

**Analysis:** YES—dual entry points violate conversion best practices. Both promise same parent outcome but fragment into different experiences (sync Calendly vs async form). Current: home secondary = "Free Trial", header = "Book a Free Assessment" (hidden primary), Wave 4 plans to drop Free Trial from nav. Result: Hick's Law choice paralysis + inconsistent messaging = lower conversion.

**Recommendation:** **Option B—Merge to one canonical path.** Consolidate to "Book a Free Assessment" → `/book-assessment/`, embed Calendly within form (post-submit or optional fast-track). Free Trial page 301-redirects. Home page secondary CTA changes to "Book a Free Assessment". Reduces choice friction, aligns Wave 4 plan, simplifies parent mental model.

**Status:** Decision approved. Awaiting Shaeel + Morpheus synthesis (Morpheus evaluating same question from content-strategy/IA angle). Deliverable: `.squad/decisions/inbox/oracle-free-trial-vs-book-assessment.md`

---

## Session 2026-05-07 (continued): Form-First Mockup Superseded by Calendly-Only Pivot (17:30–17:50Z)

**Lesson:** Design thinking must remain flexible when product reality (UX friction) overtakes design assumptions.

### Pivot Context

Shaeel's form-first mockup (Oracle recommendation: "Free Trial / Book Assessment merge with assessment form to capture parent deliberation") met a real product wart during testing: duplicate-fields UX bug (Cedar's form above Calendly's form). Rather than attempt a three-tier form redesign (form + Calendly embed + post-submit logic), Shaeel pivoted to **Calendly-only** until Wave 3 (custom form + custom calendar replacement).

### What Was Right in the Mockup

- **Page structure:** Hero copy, What to Expect section, social proof (testimonials), FAQ section → **SURVIVES** on Calendly-only `/book-assessment`
- **Section ordering:** Intentional fold sequencing to build parent confidence before booking → **SURVIVES**
- **Supporting content:** Context about assessment process, tutor match criteria, post-assessment workflow → **SURVIVES**

### What Got Rethought

- **Form vs Calendly-only:** Oracle's hypothesis (form deliberately captures parent decision-making) was valid theory, but Calendly's UX created implementation friction. Shaeel's call: Calendly-only removes the wart; Calendly's no-credit-card-required framing + free assessment copy handles most of Oracle's anxiety-capture concern
- **Intake funneling:** Oracle designed form as deliberate friction point (70% who fill a form commit more). Calendly replaces form friction with "book directly" simplicity. Tradeoff: fewer richer fields vs faster conversion
- **Custom questions:** Oracle's form captured program interest, location, additional notes. Calendly's custom questions field (configurable by Asmah in Calendly UI) can provide same data without code changes

### Mockup Artifacts

Oracle's `/book-assessment` mockup remains a valid reference for page structure + section copy. The form rendering layer was the transient piece; the architectural shape (hero → context → booking widget → proof → FAQ) survives Calendly-only pivot.

**Commits:** fb3c5f7 (Calendly-only pivot preserves Oracle's section structure, discards form layer)


---

### Framework-Grounded UX/UI Bloat & Repetition Audit (2026-05-07T18:45:00-05:00)

**Request:** Comprehensive audit of page structure, CTA density, cross-page repetition, and design quality using explicitly cited UX frameworks.

**Frameworks Applied:**
- web-design-reviewer skill (project-specific) — visual inspection via Playwright screenshots
- Nielsen's 10 Usability Heuristics (#4 Consistency, #8 Aesthetic/Minimalist)
- Krug's "Don't Make Me Think" — scannability + clarity
- CCD Attention Ratio (Oli Gardner) — CTAs-to-goal ratio
- Hick's Law — choice overload
- Information Architecture (Rosenfeld/Morville) — cross-page redundancy
- Halvorson Content Audit — quantitative inventory + ROT
- Gestalt principles — proximity, similarity
- WCAG 2.1 AA — accessibility gates
- Fitts's Law — CTA target sizing

**Screenshot Inventory:** 40 screenshots captured (20 pages × 2 viewports: 1440×900 desktop, 390×844 mobile). Total size: ~30MB. Saved to `.squad/agents/oracle/screenshots/`.

**Quantitative Findings:**
- Total pages audited: 20
- Pages with finalCta sections: 10
- Pages with trustBullets: 9
- Total testimonials in collection: 18 (reused across 5-6 pages)
- Total FAQ items (site-wide): ~24 categories, 18 on /faq + page-specific FAQs
- Average CTAs per page: 3-5 (hero + inline + closing)
- Attention Ratio outliers: /book-assessment (simplified to ~5:1), /pricing (5:1), /home (6:1)

**Key Cross-Cutting Findings:**
1. **FinalCta repetition is intentional** — standard conversion pattern (Nielsen #4 Consistency)
2. **Pricing page hero text duplication** — same sentence appears in hero subtitle AND intro section (ROT: Redundant)
3. **Why-Us vs Home Why-Cedar overlap** — Home teases, /why-us delivers; NOT redundant per IA principles
4. **Test-prep detail pages are lean** — minimal section bloat; contextual FAQs; proper attention ratio
5. **Reviews page has empty-feeling filter section** — Gestalt figure/ground concern; reviews content loads lazily

**P0 Recommendations:**
- TRIM: Pricing page redundant intro sentence (exact duplicate of hero)
- KEEP: finalCta pattern across all pages (Nielsen #4)

**P1 Recommendations:**
- Consider adding reviews count badge to /reviews filter area to reduce figure/ground confusion
- /about page team section images appear blocked in screenshot (verify image loading)

**Status:** Audit complete. Report delivered. No code changes made (Oracle: specs only).
