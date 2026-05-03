# Cedar Tutoring Academy — Site Audit & Rebuild Guide

> **Purpose:** This document is the team's north star for the website rebuild. Every critique here represents a problem to solve. Every suggestion represents an opportunity to improve. All team members should read this before starting work.
>
> **Audited:** 2026-05-02
> **Audited by:** Morpheus (Lead/Architect)
> **Site:** https://cedartutoring.com/

## Executive Summary

Cedar has the raw ingredients of a strong local tutoring brand: credible parent reviews, a broad service offering, clear evidence that families trust the team with their children, and several differentiators that matter deeply to parents—affordability, schedule flexibility, small-group/individual attention, transportation, and safety. The testimonials especially are powerful. They surface the real brand promise better than the marketing copy does: Cedar helps children catch up, gain confidence, improve reading and math performance, and feel cared for.

The current site, however, undersells Cedar at nearly every strategic layer. Above the fold, the value proposition is not immediate enough, several important pages are thin or broken, and the information architecture feels like a mix of live content, abandoned templates, and unfinished placeholders. Parents comparing Cedar with Kumon, Mathnasium, or private tutors would likely leave with unanswered questions: What grades do you serve? How do I enroll? How much does it cost? What happens in the first session? Where are you located? How quickly will I see progress? Why Cedar instead of another option nearby?

From a rebuild perspective, this is not a “polish the homepage” problem. It is a positioning, structure, and trust-conversion problem. The next site should make Cedar feel like a serious, caring, measurable academic partner for families—not like a legacy WordPress site with tutoring content pasted into a childcare theme. The rebuild should center the parent journey: understand the offer in 5 seconds, compare programs quickly, see proof, verify logistics, and book an assessment without friction.

## What Cedar Does Well (Keep These)

- **Strong social proof:** The homepage reviews are the strongest asset on the site. Parents mention reading gains, confidence gains, flexibility, professionalism, affordability, safety, and even school-meeting support.
- **Real, parent-relevant differentiators:** Small teacher-to-student ratio, tailored instruction, affordable plans, flexible scheduling, transportation, and safety procedures are all compelling.
- **Broad academic coverage:** Cedar can support core K–12 tutoring plus SAT/ACT prep, Arabic, and enrichment.
- **Care-based positioning:** The testimonials make Cedar feel warm, attentive, and trustworthy rather than transactional.
- **Outcome language exists:** Several pages mention grade improvement, confidence, test performance, and skill-building. Those themes should stay, but become sharper and more credible.
- **Local-business authenticity:** Cedar feels like a real center serving real families, not a generic franchise. That should be amplified.

## Critical Issues (Must Fix in Rebuild)

1. **Broken pages in the enrollment path**
   - `/admission/` returns HTTP 500.
   - `/test/` returns HTTP 500.
   - Any parent who hits a broken “admission” page loses trust immediately.

2. **Placeholder and near-empty pages create a low-trust impression**
   - `/psat/`, `/locations/`, `/events/`, `/events/locations/`, and `/packages/` are effectively empty or reduced to generic template headings.
   - `/news-events/` still contains lorem ipsum and irrelevant childcare-template content.

3. **The homepage does not communicate the offer fast enough**
   - The page contains lots of useful information, but it opens with feature blocks instead of a crisp parent-facing promise.
   - Parents need to know in seconds: who Cedar serves, what problems it solves, what makes it different, and what to do next.

4. **Cedar’s true differentiators are buried in testimonials instead of positioned intentionally**
   - Safety procedures, flexibility, affordability, school coordination, and measurable progress are powerful but not elevated as primary selling points.

5. **SEO is generic and repetitive**
   - Most pages use the same meta description.
   - Many pages have weak title patterns like “Reading - Cedar Tutoring Academy” instead of search-oriented titles.
   - Several pages have missing or weak H1 structure.

6. **The site architecture feels unfinished and inconsistent**
   - There is both `/locations/` and `/events/locations/`.
   - The academic programs page links to additional live program pages (`/math/`, `/writing/`, `/sciences/`) that were not surfaced in the provided sitemap.
   - This suggests orphaned or poorly surfaced content.

7. **Visual/design language feels dated and template-driven**
   - Legacy WordPress theme styling, stock-photo-heavy presentation, inconsistent spacing, and cluttered layout reduce confidence.
   - Parents choosing tutoring are buying trust; dated visuals work against that.

8. **Technical bloat is significant**
   - Typical pages load roughly **59 script tags** and **42–47 stylesheets**.
   - Plugin stack includes Elementor, Jet plugins, Popup Maker, Contact Form 7, review plugins, menu plugins, and more.
   - This is classic legacy WordPress/Elementor overhead.

9. **Analytics are not properly configured**
   - Homepage source explicitly states MonsterInsights is installed but **not authenticated/configured**, meaning the site likely lacks reliable GA tracking.

10. **The live site exposes legacy/deprecated implementation choices**
    - IE conditional comments and `html5shiv.js` are still present.
    - Homepage viewport includes `user-scalable=no`, which is an accessibility problem.
    - XML-RPC is enabled.

## Page-by-Page Analysis

### Homepage
**Current State:** A long, content-heavy homepage with solid proof points, multiple service summaries, and an unusually strong review section. Technically, it still runs on a legacy WordPress theme with Yoast/Elementor/plugin bloat and old browser fallbacks.

**Content Critique:**
- The copy contains real value, but it is not sequenced well for conversion.
- The opening blocks (“One-To-One Instructions,” “Active Learning,” “Unparalleled Results”) are benefits, but they do not immediately answer the parent’s first question: **“Is this the right tutoring place for my child?”**
- The strongest trust content is the review section. It includes specific parent concerns: reading growth, tutor quality, safety, flexibility, affordability, and communication.
- The site title—“Affordable Tutoring, Guaranteed Results”—is stronger than much of the visible on-page copy.
- CTA clarity is weak. The page needs one primary action repeated consistently.

**Suggestions:**
- Replace the current opening with a parent-first hero:
  - **Headline:** “K–12 Tutoring and Test Prep That Builds Skills, Confidence, and Results.”
  - **Support line:** “Personalized tutoring in reading, math, writing, science, SAT/ACT prep, and more—with flexible scheduling, caring teachers, and measurable progress.”
  - **Primary CTA:** “Book a Free Assessment”
  - **Secondary CTA:** “Explore Programs”
- Add a fast proof bar directly under the hero: grades served, small-group ratio, parent review rating, transportation availability, and service area.
- Turn long testimonial walls into a curated proof section with 4–6 high-signal quotes.
- Add a clear “How it works” section: assess → match → plan → progress reviews.
- Surface Cedar’s strongest differentiators intentionally: affordability, safety, flexibility, real teachers, progress tracking.
- Remove duplicate/weak headings like “What Other Parents / Think of Cedar / What Other Parents Think of Cedar.”

### Academic Programs
**Current State:** A hub page with brief snippets and image links to subject pages. It appears incomplete and structurally weak.

**Content Critique:**
- The page works more like a loose gallery than a real programs hub.
- Copy is thin and uneven. Reading copy is inserted directly into the page, while other services are only hinted at.
- The page links to additional live subject pages (`/math/`, `/writing/`, `/sciences/`) that should be part of the main site plan.
- There is no explanation of how programs differ by age, need, format, or goal.

**Suggestions:**
- Rebuild this as the main **Programs** hub.
- Include cards for Math, Reading, Writing, Science, Test Prep, Arabic, Homework Help, and Enrichment.
- For each card, show: who it’s for, common problems solved, outcomes, and CTA.
- Add filtering by age group or need: “Catch up,” “Stay on track,” “Get ahead,” “Test prep.”
- Make this page the bridge between interest and deeper program pages.

### Reading
**Current State:** One of the better-developed service pages. It explains the need for reading support across elementary, middle, and high school.

**Content Critique:**
- The structure is sensible, but the copy is generic and repetitive.
- It speaks about reading in broad educational terms rather than parent pain points.
- It lacks specifics on assessment, program format, progress measurement, frequency, and expected outcomes.
- There is no visible trust layer specific to reading.

**Suggestions:**
- Reframe around parent concerns: struggling fluency, low comprehension, avoidance, school frustration, falling behind grade level.
- Add a process section: reading assessment, skill-gap diagnosis, customized plan, progress updates.
- Add concrete outcomes: confidence, fluency, comprehension, vocabulary, school performance.
- Add reading-specific testimonials and FAQs.
- Use stronger CTA language: “Book a Reading Assessment.”

### SAT
**Current State:** A long SAT page with strong intent but overly verbose, repetitive, and sometimes clumsy copy.

**Content Critique:**
- The page uses high emotion (“dream college,” “fear of losing”) but needs more precision and credibility.
- Benefits are repeated and some points overlap.
- Grammar and phrasing issues reduce authority.
- There is not enough practical information on timelines, diagnostics, score improvement process, practice testing cadence, and who this program is best for.

**Suggestions:**
- Rewrite for clarity and authority.
- Show a simple prep framework: diagnostic test → study plan → targeted tutoring → timed practice → review.
- Replace generic “10 benefits” lists with a tighter list of outcomes and deliverables.
- Add FAQs parents/students actually have: when to start, how long prep takes, whether Cedar helps with weak sections only, how homework/practice works.
- Cross-link strongly with ACT and a unified Test Prep hub.

### ACT
**Current State:** Similar to SAT: long-form copy, clear intent, but weak editing and too much repetition.

**Content Critique:**
- The page explains the exam but does not efficiently answer why Cedar is the right prep option.
- Copy quality issues (“studnets,” awkward phrasing) reduce professionalism.
- The program descriptions are usable, but the page feels inflated rather than sharp.

**Suggestions:**
- Mirror the SAT rewrite approach.
- Position Cedar as a strategy + skill-building partner, not just a general tutor.
- Explain diagnostic testing, section targeting, pacing, and schedule flexibility.
- Use concise modules instead of dense paragraphs.
- Add outcome proof and a stronger CTA.

### Test Prep (`/test-pre/`)
**Current State:** A general SAT/ACT page with broad messaging about tailored prep and low teacher-to-student ratio.

**Content Critique:**
- This page overlaps heavily with SAT and ACT pages.
- It contains some of the strongest differentiator language on the site—especially tailored plans and 1:3 ratio—but it still reads like generic marketing copy.
- The overlap creates duplication rather than a clear funnel.

**Suggestions:**
- Keep this page only if it becomes the central **Test Prep hub**.
- Position it as the top-level page for SAT, ACT, and PSAT.
- Move exam-specific details to child pages.
- Surface Cedar’s strongest proof here: customized prep, teacher quality, scheduling, and measurable progress.

### PSAT
**Current State:** Effectively empty. The live page exists but offers no meaningful content.

**Content Critique:**
- This looks unfinished and damages trust.
- If a parent clicks PSAT and sees no substance, they may assume Cedar is not serious about test prep.

**Suggestions:**
- Either build a real PSAT page or 301 redirect it to the Test Prep hub until it is ready.
- If kept, explain why PSAT matters: early diagnostics, scholarship pathways, readiness for SAT.

### Arabic
**Current State:** A unique service page with emotionally warm positioning, but the copy is abstract and loosely structured.

**Content Critique:**
- This page is one of Cedar’s clearest differentiators, yet it is under-positioned.
- The copy leans philosophical (“respond to life’s problems”) when parents likely need practical answers: who it is for, what level, what skills, what format, and what outcomes.
- “Learning Arabic Cannot Get Easier Than This” is too generic to carry the page.

**Suggestions:**
- Clarify audience: heritage learners, beginners, school support, Quranic reading support, conversational Arabic, literacy support—whatever actually applies.
- Break the offer into levels and goals.
- Show what children will learn: reading, writing, vocabulary, speaking, comprehension.
- Make this page a standout specialty page, not a generic text block.

### Cooking
**Current State:** A very short enrichment page with encoding problems and minimal structure.

**Content Critique:**
- This page feels disconnected from the core tutoring brand.
- Copy is brief and repetitive.
- Text encoding issues (`Cedaru00ae`, `u2026`) immediately make the page feel unpolished.
- There is no schedule, age range, safety/process detail, or booking CTA.

**Suggestions:**
- Decide strategically whether cooking belongs in the main navigation.
- If yes, reposition it under **Enrichment** or **Camps/Workshops**.
- Add age range, learning outcomes, class format, schedule, and registration CTA.
- Fix the encoding and rewrite the page cleanly.

### Locations
**Current State:** Effectively empty despite being a high-intent utility page.

**Content Critique:**
- A parent looking for address, hours, map, parking, and service area gets almost nothing.
- This is a severe conversion miss because “Where are you located?” is a basic pre-enrollment question.

**Suggestions:**
- Build a real locations page with address, embedded map, hours, parking/drop-off notes, phone, and areas served.
- Add center photos and “what to expect on arrival.”
- Include transportation coverage if relevant.

### Events / Locations (`/events/locations/`)
**Current State:** Duplicate-feeling child page with little to no meaningful content.

**Content Critique:**
- This page confuses the architecture.
- Having a second locations URL under `/events/` suggests leftover template structure rather than deliberate IA.

**Suggestions:**
- Remove or redirect this URL.
- Keep only one authoritative Locations destination.

### Events
**Current State:** Another effectively empty page with a generic template heading.

**Content Critique:**
- If Cedar does not actively run events, this page should not exist publicly.
- Empty event pages make the brand look abandoned.

**Suggestions:**
- Either remove it from the public site or rebuild it as a real events/camps/workshops calendar.
- Do not keep placeholder event architecture in the live rebuild.

### News & Events
**Current State:** The most visibly broken content page in the site experience. It contains lorem ipsum, irrelevant “Kidzcare” language, fake contact details, and mismatched organizer content.

**Content Critique:**
- This page is a direct trust killer.
- It signals template residue and poor quality control.
- Parents seeing fake event names, countdown timers, and placeholder Australian address/phone content would reasonably question the professionalism of the business.

**Suggestions:**
- Remove from the site immediately unless Cedar is prepared to publish real news/events.
- If retained, rebuild from scratch with real updates, actual event posts, and genuine contact/location info.
- No placeholder content should survive into the rebuild.

### Packages
**Current State:** Essentially empty; the WP API exposes only “Book a Free Consultation Now.”

**Content Critique:**
- Pricing and package structure are high-intent topics.
- An empty packages page frustrates parents who are trying to qualify themselves before contacting Cedar.

**Suggestions:**
- Decide whether Cedar wants transparent pricing, pricing ranges, or a consultation-led pricing model.
- At minimum, the page should explain how plans work: assessment, recommended frequency, factors that affect pricing, and what is included.
- If exact pricing cannot be public, explain the packaging logic clearly.

### Admission
**Current State:** Broken. Returns HTTP 500.

**Content Critique:**
- This is a launch-blocker issue.
- A broken admission page communicates operational unreliability at the exact moment trust must peak.

**Suggestions:**
- Replace with a clean **Enroll / Book Assessment** page.
- Ask only for the minimum viable information up front.
- Show next steps after submission so parents know what happens next.

### Transportation
**Current State:** A real page, but extremely thin. It mentions home drop-off and free transportation within a 5-mile radius.

**Content Critique:**
- Transportation is one of Cedar’s best differentiators, but the page barely explains it.
- Parents care about safety, eligibility, timing, supervision, handoff procedure, and service area.

**Suggestions:**
- Expand this into a serious logistics page.
- Include radius/service area, pickup/drop-off process, safety policy, timing windows, fees, and how to request transportation.
- Add trust-building detail: adult supervision, communication, and release procedures.

### Test
**Current State:** Broken. Returns HTTP 500.

**Content Critique:**
- This appears to be a stray or unfinished page and should not be publicly accessible.

**Suggestions:**
- Remove, redirect, or fix immediately.
- If it has no business purpose, exclude it from the new IA entirely.

## Additional Live Pages Discovered During Audit

The Academic Programs page links to subject pages that should be accounted for in the rebuild even though they were not included in the provided sitemap list:

- `/math/`
- `/writing/`
- `/sciences/`

These pages are more complete than several of the listed utility pages and should either be folded into the new Programs architecture or retained as first-class service pages with consistent navigation and CTA strategy.

## Content Strategy Recommendations

### Keep
- Parent testimonials with concrete outcomes.
- Cedar’s positioning around personal attention, flexibility, affordability, and confidence-building.
- Reading/math/test-prep outcome language where it is specific and credible.

### Rewrite
- Homepage hero and above-the-fold messaging.
- SAT, ACT, Test Prep, and Arabic pages for clarity, authority, and parent relevance.
- Transportation page to make logistics trustworthy and legible.
- All CTA language sitewide for consistency.

### Consolidate
- SAT + ACT + PSAT under a coherent Test Prep architecture.
- Locations into one authoritative page.
- Events/News pages unless Cedar has an actual content operation.
- Packages + Admission into a clearer enrollment flow if separate pages are unnecessary.

### Remove or Redirect
- `/test/`
- `/events/locations/`
- Any empty placeholders that are not immediately rebuilt
- `/news-events/` unless rebuilt with real content

### Create
- **Why Cedar / About** page with mission, approach, staff quality, and trust signals.
- **Book a Free Assessment / Enroll** page.
- **Reviews / Results** page with curated proof.
- **FAQ** page answering parent objections.
- Potential **Service Area / Transportation** detail page if logistics are a major sales driver.

### Message Strategy for Rebuild
The copy should stop talking like a school brochure and start talking like a high-trust service business for parents. Lead with:
- what Cedar helps with,
- who it serves,
- what makes it different,
- how it works,
- why parents trust it,
- what the next step is.

## Information Architecture Recommendations

### Proposed Top-Level Navigation
- Home
- Programs
- Test Prep
- Locations
- Pricing / Packages
- Reviews
- About
- Book Assessment

### Proposed Programs Structure
- Programs (hub)
  - Reading
  - Math
  - Writing
  - Science
  - Homework Help / Academic Support
  - Arabic
  - Enrichment (only if strategically important)

### Proposed Test Prep Structure
- Test Prep (hub)
  - SAT Prep
  - ACT Prep
  - PSAT Prep

### Utility / Trust / Conversion Structure
- Locations
- Transportation
- FAQ
- Reviews / Results
- Book Assessment / Enroll

### User Flow Recommendation
1. Parent lands on homepage or program page.
2. Parent immediately understands age range, services, and Cedar’s differentiators.
3. Parent sees proof (reviews, results, trust markers).
4. Parent checks logistics (location, schedule, transportation, pricing approach).
5. Parent books an assessment or consultation.
6. Parent receives a clear follow-up sequence.

### IA Principles for Rebuild
- One clear page for each real business need.
- No duplicate or placeholder URLs.
- Every page should answer one job clearly and end with one next step.
- Strong cross-linking between related services, logistics, and enrollment.

## SEO Recommendations

### On-Page SEO
- Write unique titles and meta descriptions for every page.
- Stop reusing the same generic description across most pages.
- Use one clear H1 per page.
- Build semantically clean H2/H3 sections around real search intent.
- Add location modifiers where relevant.

### Content SEO
- Create pages around actual parent search language:
  - reading tutor for elementary students
  - math tutoring near me
  - SAT prep tutoring
  - Arabic tutoring for kids
  - after-school tutoring with transportation
- Add FAQ sections to major pages.
- Publish real local proof and outcomes where possible.

### Technical SEO
- Remove or redirect broken and thin URLs.
- Use proper canonicals and 301s during rebuild.
- Improve internal linking between homepage, programs, reviews, and enrollment pages.
- Add richer schema: LocalBusiness/EducationalOrganization, FAQ, and Review where appropriate.
- Ensure XML sitemap only contains real, indexable pages.

### Specific SEO Findings from Audit
- Homepage contains **two meta descriptions** in source.
- Homepage includes Yoast-generated schema, but structured data is basic and not enough for full local-service differentiation.
- Many pages have weak titles and non-differentiated metadata.
- Several pages have missing H1s or skeletal content.
- Alt attributes often exist, but many are poor-quality file names rather than descriptive accessibility/SEO text.

## Design & UX Recommendations

### Visual Direction
- Move toward a calm, modern, trust-heavy design.
- Use generous whitespace, fewer template flourishes, and clearer visual hierarchy.
- Replace generic/stale stock imagery with real center, staff, and student environment photography if possible.

### UX Improvements
- Make the primary CTA persistent and obvious.
- Use scannable content blocks instead of long paragraphs.
- Add comparison-ready content for parents evaluating alternatives.
- Show process, proof, and logistics near the top of pages.

### Trust-Building Elements to Add
- Review rating and curated testimonials
- Tutor credentials or “real teachers” positioning
- Progress-tracking process
- Safety/transportation reassurance
- Clear contact info and location details
- FAQ addressing cost, schedule, and expectations

### Mobile / Accessibility Notes
- Homepage viewport uses `user-scalable=no`, which should be removed.
- Rebuild should prioritize readable type, stronger spacing, clear tap targets, and fast mobile load.
- Ensure all images have meaningful alt text.
- Form flows should be short, obvious, and accessible.

## Technical Recommendations

### Current Technical Findings
- Legacy WordPress theme appears to be **Kidzcare**, which is mismatched with Cedar’s current brand maturity.
- Source still contains **IE conditional comments** and **html5shiv.js** references.
- Pages commonly load about **59 scripts** and **42–47 stylesheets**.
- Plugin references include Elementor, Jet plugins, Popup Maker, Contact Form 7, reviews plugins, menu plugins, call-now button, and more.
- MonsterInsights is installed but not configured.
- Homepage source contains a **site designer UI panel** snippet, suggesting non-essential tooling bleeding into production output.

### Security / Header Findings
Present:
- `x-frame-options: SAMEORIGIN`
- `x-content-type-options: nosniff`
- `x-xss-protection: 1; mode=block`
- basic CSP: `upgrade-insecure-requests;`

Missing or weak relative to a modern production site:
- `Strict-Transport-Security`
- `Referrer-Policy`
- `Permissions-Policy`
- a meaningful, restrictive CSP

### Rebuild Direction
- Move to a leaner architecture with a strict content model and far fewer runtime dependencies.
- Avoid page-builder/plugin sprawl.
- Optimize images aggressively.
- Use a clean analytics setup from day one.
- Validate all redirects and remove dead URLs before launch.
- Keep CMS/editor experience simple and structured so content quality stays high.

## Competitive Positioning Recommendations

Parents comparing Cedar with Kumon, Mathnasium, Sylvan, or private tutors are usually evaluating four things:
- **Results** — Will my child improve?
- **Fit** — Will this work for my child specifically?
- **Convenience** — Is scheduling/logistics manageable?
- **Trust** — Are these people safe, caring, and competent?

### What Cedar Seems to Do Better Than It Says
- Personalized attention
- Flexible scheduling
- Affordable access
- Strong care and communication
- Transportation convenience
- A welcoming environment
- Confidence-building, not just worksheet completion

### Where Cedar Is Currently Underselling Itself
- It does not prominently claim its safety/logistics strengths.
- It does not clearly contrast itself with one-size-fits-all franchises.
- It does not package its “real teachers + tailored support + flexibility + affordability” story into one memorable value proposition.
- It does not make enough of the proof already available in reviews.

### Positioning Direction for Rebuild
Cedar should present itself as:
**A high-care, high-accountability tutoring academy that gives families personalized academic support without franchise rigidity.**

## Priority Matrix

### P0 — Launch Blockers
- Fix/remove `/admission/` and `/test/` 500 pages.
- Remove or redirect empty placeholder pages (`/psat/`, `/events/`, `/events/locations/`, `/locations/`, `/packages/`) unless rebuilt properly.
- Remove `/news-events/` placeholder/template content.
- Create a real enrollment/assessment flow.
- Define and ship a clear parent-first homepage hero and CTA.
- Establish analytics correctly.

### P1 — Important
- Rebuild Programs architecture.
- Consolidate Test Prep pages into a coherent hub structure.
- Create a real Locations page.
- Expand Transportation into a trust-building logistics page.
- Rewrite service-page copy for clarity, authority, and parent relevance.
- Add Reviews/Results and FAQ pages.
- Replace generic metadata and weak heading structure.

### P2 — Nice-to-Have
- Build a real Events/Workshops section if Cedar truly needs it.
- Add curated case studies or before/after progress stories.
- Add staff introductions and center photography.
- Add filtered program finder by grade level / goal.
- Publish lightweight thought-leadership or parent resources if content capacity exists.

## Final Direction for the Team

- **For Trinity:** Build for clarity, trust, and conversion first. Every page should make the next step obvious.
- **For Oracle:** The current site feels warmer in testimonials than in design. The rebuild should make the whole experience feel as trustworthy as the reviews already do.
- **For Mouse:** Test the parent journey ruthlessly: landing page comprehension, program comparison, location/pricing discovery, form completion, and broken-link coverage.

The rebuild should not aim to make the existing site prettier. It should aim to make Cedar unmistakably credible, easier to understand, and easier to choose.
