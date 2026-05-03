# Wireframe Design Review

> **Reviewer:** Oracle (UX/Design Lead)  
> **Date:** 2026-05-02  
> **Scope:** All 12 HTML wireframes in `.squad/wireframes/`  
> **Verdict:** ✅ **APPROVE WITH CHANGES**

---

## Executive Summary

**Overall Assessment:** The wireframes demonstrate strong strategic thinking and address virtually all critical issues identified in the site audit. The parent-first information architecture is well-executed, CTAs are appropriately placed, and trust signals (122 five-star reviews, proof bars) are consistently leveraged. The layouts successfully shift Cedar from a "tutoring template" to a "serious academic partner" positioning.

**Recommendation:** Approve for implementation with 3 blocking issues and 8 minor concerns to address before or during code phase. No wireframe requires rejection or fundamental restructuring.

**Strengths:**
- Every page has clear user journey intent and conversion path
- Social proof (122 reviews, 5.0 rating) consistently prominent
- UX annotations explain rationale—excellent documentation for Trinity
- Responsive breakpoint strategy embedded in CSS comments
- Site audit problems systematically resolved

---

## Per-Page Reviews

### 1. Homepage (`homepage.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Hero answers "who, what, why, next step" in 5 seconds ✓
- ProofBar (5.0 rating, K-12, 1:3 ratio, transport) immediately below hero ✓
- Programs grid enables quick self-identification ✓
- "How It Works" 4-step process reduces enrollment uncertainty ✓
- "Why Cedar" block surfaces buried differentiators from testimonials ✓
- Testimonial section uses 3-card layout (not overwhelming carousel) ✓
- Final CTA appears after proof—earned ask pattern ✓

**Issues:**
- 🟢 *Nice-to-have:* Footer wireframe is minimal—ensure Trinity implements full 4-column footer per spec

**Recommendations:**
- None blocking. Homepage is strong.

---

### 2. Book Assessment (`book-assessment.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Multi-step form reduces cognitive load ✓
- Reassurance panel beside form addresses abandonment anxiety ✓
- "What Happens Next" section removes black-box uncertainty ✓
- Value proposition section helps parents self-qualify ✓
- Contact alternatives (call/email) respect different preferences ✓
- Mobile note indicates reassurance panel moves above form ✓

**Issues:**
- 🟡 *Concern:* Form wireframe shows 6 fields in Step 1 area—spec says single-page form, not multi-step. **Clarify decision: single-page or multi-step?** If multi-step, update trinity-frontend-spec.md.
- 🟢 *Nice-to-have:* Consider adding "estimated time: 2 minutes" near form start

**Recommendations:**
- Resolve form structure decision before implementation
- Ensure honeypot field and consent checkbox are in final implementation per API contract

---

### 3. Programs Hub (`programs.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Filtering bar (All/Catch Up/Stay On Track/Get Ahead/Test Prep) enables parent self-sorting ✓
- 6 program cards with grades, pain points, and category tags ✓
- Individual program detail layout included in same wireframe—smart reference ✓
- "How Cedar Is Different" section prevents pure-listing fatigue ✓
- Related Programs cross-sell supports long-term engagement ✓
- Final CTA catches decision fatigue with assessment redirect ✓

**Issues:**
- 🟡 *Concern:* Detail layout shows 4-step process (Assess → Plan → Teach → Measure) which is good, but outcomes section has only 3 cards. Consider 4 for visual balance.
- 🟢 *Nice-to-have:* Grade band secondary filters mentioned in note but not wireframed—decide scope

**Recommendations:**
- Confirm filtering is in Phase 1 scope or deferred
- Ensure all 6 programs (Math, Reading, Writing, Science, Arabic, Homework Help) have MDX content ready

---

### 4. Test Prep Hub (`test-prep.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Hero promises "strategy, confidence, score growth"—not fear-based ✓
- 3 exam cards (SAT, ACT, PSAT) enable quick comparison ✓
- Score improvement stats section leaves room for real data ✓
- 4-step method (Diagnostic → Plan → Tutoring → Mock Testing) builds credibility ✓
- Scheduling section addresses family calendar concerns ✓
- Testimonials + FAQ hybrid addresses both trust and planning ✓
- "Book a Diagnostic Test" CTA matches expert positioning ✓

**Issues:**
- 🟡 *Concern:* Stats section uses placeholder language ("use credible ranges once real data is approved"). **Ensure Shaeel provides real outcome data before launch** or remove section.

**Recommendations:**
- Coordinate with content team on real score improvement data
- Consider linking to individual SAT/ACT/PSAT detail pages from cards

---

### 5. About Us (`about.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Hero pairs mission overview with immediate proof stats ✓
- Photo placeholder for founder/team humanizes brand ✓
- Mission + Values section clarifies Cedar's "why" ✓
- 4 differentiator cards (Personalized, Confidence, Communication, Convenience) ✓
- Staff credibility section with avatar + credential chips ✓
- Center photo band makes facility tangible ✓
- Trust signals section converts abstract claims to concrete proof ✓
- Testimonial preview with varied parent voices ✓
- Dual CTA (Assessment + Programs) supports both ready and browsing users ✓

**Issues:**
- 🟢 *Nice-to-have:* Staff section shows 3 featured tutors—confirm real staff content will be available

**Recommendations:**
- Coordinate staff photos and bios before launch
- Ensure center photos are captured

---

### 6. Testimonials (`testimonials.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- **122 Five-Star Reviews** prominently displayed with large 5.0 rating ✓
- Filter bar by program (Reading, Math, Test Prep, Homework Help, Transportation) ✓
- Search functionality placeholder supports specific concern lookup ✓
- 6 testimonial cards with badges, quotes, and parent context ✓
- Grid layout chosen over carousel—correct for dedicated proof page ✓
- Google review integration placeholder for authenticity ✓
- Review themes panel (Reading Growth, Confidence, etc.) aids scanning ✓
- CTA converts proof-built confidence into action ✓

**Issues:**
- None identified

**Recommendations:**
- Implement filtering as client-side interaction
- Ensure testimonials.json has sufficient variety for each filter category

---

### 7. FAQ (`faq.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Search field with example queries aids direct lookup ✓
- Category tabs (Programs, Logistics, Pricing, Enrollment) ✓
- Accordion-style Q&A keeps dense content compact ✓
- Secondary category preview encourages deeper browsing ✓
- "Still have questions?" CTA with contact options ✓
- Sidebar with counts (placeholder) aids orientation ✓

**Issues:**
- 🟢 *Nice-to-have:* Mobile note mentions tabs wrap—ensure touch targets remain adequate

**Recommendations:**
- Ensure faq.json has minimum 4-5 entries per category
- Consider defaulting first accordion open per spec

---

### 8. Packages & Pricing (`packages.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Hero explains assessment-first pricing model ✓
- 3-step process (Assess → Recommend → Start) ✓
- 3 pricing tiers (Starter, Growth, Accelerator) with clear positioning ✓
- "Most Popular" highlight on Growth plan ✓
- Comparison table supports analytical parents ✓
- "What's Included" section reinforces value beyond price ✓
- Pricing FAQ addresses commitment, flexibility, customization ✓
- Final CTA reduces pressure with "We'll Recommend a Plan" ✓

**Issues:**
- 🔴 **BLOCKER:** Pricing shows `$XXX / month` placeholders. **Real pricing or explicit "contact for pricing" decision required before launch.** Empty pricing undermines trust.
- 🟡 *Concern:* Sibling discount and transportation eligibility mentioned as placeholders—ensure content team provides specifics

**Recommendations:**
- **Resolve pricing display strategy with Shaeel immediately**
- If pricing is confidential, reframe section as "Plans Overview" without dollar amounts

---

### 9. Locations (`locations.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Hero with service area map placeholder ✓
- Quick logistics strip (hours, directions, contact, transport) ✓
- 3 location cards with full detail (address, phone, email, hours, directions) ✓
- Each card has map placeholder, hours table, and dual CTAs ✓
- "What to Expect on Your First Visit" reduces uncertainty ✓
- Parent-friendly details (parking, check-in, visit time) ✓
- Cross-link to Transportation page ✓

**Issues:**
- 🟡 *Concern:* Wireframe shows 3 locations (Plano, Frisco, Allen) as examples. **Confirm actual location count with Shaeel**—current site mentions one location primarily.

**Recommendations:**
- Verify actual number of locations before implementation
- Ensure Google Maps embed works within performance budget

---

### 10. Transportation (`transportation.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Hero leads with parent pain point, not feature ✓
- Overview strip explains who/coverage/schedule/confirmation ✓
- 3 route cards (Plano, Frisco, Allen/McKinney) with schools, timing, options ✓
- 4-step pickup/dropoff process builds predictability ✓
- Safety features section addresses trust concern directly ✓
- Parent reassurance panel mirrors form pattern ✓
- FAQ section handles edge cases (outside route, schedule changes) ✓

**Issues:**
- 🟡 *Concern:* Route details are placeholder examples. **Verify actual service routes with operations team.**

**Recommendations:**
- Coordinate with Shaeel on real transportation routes and schools served
- This page addresses a major audit finding—execution quality critical

---

### 11. News & Events (`news-events.html`)
**Verdict:** ✅ APPROVE WITH CAUTION

**Strengths:**
- Hero reframes as "proof of activity" not just content archive ✓
- Category filters (Cedar News, Parent Tips, Student Events, Testing Dates) ✓
- Featured story + recent posts sidebar ✓
- Posts grid enables mixed content types ✓
- Event calendar placeholder with upcoming list ✓
- Newsletter CTA keeps page conversion-aware ✓

**Issues:**
- 🔴 **BLOCKER:** Site audit explicitly flagged News & Events as "direct trust killer" with lorem ipsum. **This page must NOT launch with placeholder content.** If Cedar cannot produce real news/events content, **defer this page from Phase 1** or redirect to homepage.
- 🟡 *Concern:* Editorial content requires ongoing maintenance—confirm Cedar has content production capacity

**Recommendations:**
- **Decision required: Include in Phase 1 only if real content is ready at launch**
- Alternative: Launch as "Updates" page with 3-4 foundational posts, add calendar later

---

### 12. Contact (`contact.html`)
**Verdict:** ✅ APPROVE

**Strengths:**
- Hero provides both form path and quick contact details ✓
- Quick contact box (call, email, response time) visible above fold ✓
- Form with subject dropdown routes inquiries efficiently ✓
- Reassurance panel beside form ✓
- Location info + office hours split for scan speed ✓
- Map embed with visit planning details ✓
- Secondary support links (Transportation, Locations, News) ✓
- Final CTA with dual paths ✓

**Issues:**
- 🟢 *Nice-to-have:* Form shows "Phone number (optional)"—spec says phone is required for AssessmentForm, optional for ContactForm. Verify ContactForm spec alignment.

**Recommendations:**
- Ensure ContactForm implementation uses correct validation (phone optional per this wireframe)
- Phone field should remain optional for general contact form per spec

---

## Cross-Cutting Issues

### 1. Navigation Consistency
**Status:** ✅ Adequate with minor variance

- Homepage, Book Assessment, Programs, Test Prep wireframes use one nav style
- About, Testimonials, FAQ, Packages use a different nav grouping
- Locations, Transportation, News, Contact use a third pattern

**Recommendation:** Trinity should implement a single consistent Header component per spec. Wireframe nav variations are acceptable for reference purposes.

### 2. Footer Consistency
**Status:** 🟡 Concern

- Footer implementations vary across wireframes (some minimal, some with columns)

**Recommendation:** Implement full 4-column footer per architecture blueprint on all pages.

### 3. CTA Consistency
**Status:** ✅ Strong

- Primary CTA is consistently "Book Assessment" or "Book Diagnostic" (test prep)
- Secondary CTAs appropriately vary by page context
- CTA placement follows "after proof" pattern on most pages

### 4. ProofBar Usage
**Status:** 🟡 Concern

- Homepage has explicit ProofBar section
- Some interior pages (About, Testimonials) surface stats in hero
- Other pages (Contact, FAQ) don't prominently feature the 122 reviews

**Recommendation:** Consider adding a subtle trust indicator (e.g., "5.0 ★ from 122 families") to all page headers or a persistent element.

### 5. Responsive Strategy
**Status:** ✅ Strong

- Every wireframe includes CSS media queries
- Mobile intent notes explain responsive behavior
- Consistent breakpoint at ~820-900px

---

## Site Audit Resolution Check

| Audit Issue | Status | Notes |
|-------------|--------|-------|
| Broken `/admission/` page | ✅ Resolved | Replaced with Book Assessment wireframe |
| Broken `/test/` page | ✅ Resolved | Redirected via architecture redirects map |
| Empty `/locations/` | ✅ Resolved | Full locations wireframe with 3 example cards |
| Empty `/packages/` | ⚠️ Partially | Wireframe complete but pricing placeholders remain |
| Lorem ipsum in News & Events | ⚠️ Risk | Good wireframe, but real content required |
| Buried value proposition | ✅ Resolved | Homepage hero answers key questions in 5 seconds |
| Transportation underexplained | ✅ Resolved | Dedicated page with routes, process, safety |
| Missing FAQ | ✅ Resolved | Full FAQ wireframe with categories, search |
| Missing About/Why Cedar | ✅ Resolved | Comprehensive About page with mission, staff, photos |
| SEO generic/repetitive | ➖ N/A | Handled in implementation, not wireframe scope |

---

## Prioritized Recommendations

### 🔴 Blockers (Must Fix Before Code)

1. **Pricing Decision** — Resolve whether real prices appear on Packages page or if page becomes "Plans Overview" with consultation model. Empty `$XXX` placeholders will damage trust.

2. **News & Events Content** — Decide: (a) include in Phase 1 with real content ready at launch, or (b) defer/redirect. Do NOT launch with placeholder content.

3. **Form Structure Alignment** — Confirm Book Assessment form is single-page (per spec) or multi-step (per wireframe). Update relevant spec if multi-step is chosen.

### 🟡 Concerns (Fix During Implementation)

4. **Location Count Verification** — Confirm actual number of Cedar locations (wireframe shows 3; verify accuracy)

5. **Transportation Routes** — Verify actual service routes, schools, and timing with operations

6. **Test Prep Stats** — Coordinate real score improvement data or remove placeholder section

7. **Staff Content** — Ensure staff photos and bios are available for About page

8. **Pricing Specifics** — Gather sibling discount, transportation eligibility, and add-on details

### 🟢 Nice-to-Haves (Polish)

9. Consider ProofBar or trust badge on all page headers

10. Add "Estimated time: 2 minutes" to form pages

11. Ensure mobile touch targets on FAQ category tabs

---

## Final Notes for Trinity

**Handoff Quality:** Excellent. Every wireframe includes:
- Section labels with eyebrows
- UX rationale annotations
- Token/typography notes
- Mobile behavior comments
- Clear component boundaries

**Implementation Priority:** Recommend building in this order:
1. Homepage (anchor page)
2. Book Assessment (conversion goal)
3. Programs + Test Prep (service explanation)
4. About + Testimonials (trust building)
5. Locations + Transportation + Contact (logistics)
6. FAQ + Packages (decision support)
7. News & Events (only if content ready)

---

**Review Complete.**

*— Oracle, UX/Design Lead*
