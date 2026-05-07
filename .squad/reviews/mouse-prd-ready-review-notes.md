# Mouse QA / Playwright PRD-Ready Review Notes

**Reviewer:** Mouse — Tester/QA  
**Date:** 2026-05-07T10:22:32.063-05:00  
**Target:** http://127.0.0.1:3000  
**Audience lens:** Parents/guardians choosing tutoring for a child; business owner launch readiness; UX/design polish.

## QA verdict

**Verdict: APPROVE WITH LAUNCH-BLOCKING FIXES.**

The site is visually much closer to launch quality than the old experience: it feels modern, warm, local, and trust-forward. The main parent journey is understandable: learn what Cedar offers, see proof/reviews, compare plans, then book a free assessment or trial. Desktop and mobile pages loaded cleanly with no observed runtime errors, no missing image alt attributes, no obvious horizontal overflow, and working form validation on the assessment page.

However, I would not ship until the stale `/admission/` conversion path and mobile navigation regressions are fixed. Those issues directly affect trust at the moment a parent is ready to act.

## Routes/pages checked

Desktop and mobile were checked across:

- `/`
- `/programs`
- `/programs/math`
- `/programs/reading`
- `/programs/writing`
- `/programs/science`
- `/programs/arabic`
- `/test-prep`
- `/test-prep/sat`
- `/test-prep/act`
- `/test-prep/psat`
- `/why-us`
- `/pricing`
- `/reviews`
- `/about`
- `/locations`
- `/contact-us`
- `/faq`
- `/free-trial`
- `/book-assessment`
- `/summer-programs`
- `/robots.txt`
- `/sitemap.xml`
- `/admission/` as a suspected legacy conversion route

## Playwright/browser observations

### What is working well

- **All primary reviewed routes returned 200** on desktop and mobile.
- **No browser console errors, page errors, or failed first-party requests** were observed during the crawl of the checked routes.
- **Primary content hierarchy exists**: each checked page had one H1.
- **Visual identity is consistent**: blue gradient, yellow accent, Cedar logo, rounded cards, and friendly education-focused copy carry through the site.
- **Home page first impression is strong**: hero is simple, premium enough, and immediately communicates tutoring + confidence. The proof cards help parents quickly understand rating, ratio, and grade range.
- **Trust-building pages are substantial**: reviews, about, why-us comparison, pricing, FAQ, and contact/location pages answer real parent questions.
- **Book assessment page is the strongest conversion page**: clear “free / no obligation / personalized plan” framing, parent-friendly explanation, contact reassurance, and a full but not overwhelming form.
- **Assessment form validation works**: submitting empty shows inline, human-readable corrections for parent name, email, phone, student name, grade, and program interest.
- **Free Trial page embeds Calendly and provides fallbacks**: if the calendar does not load, parents can open Calendly directly or call.
- **Contact details are easy to find**: phone, email, address, service areas, and hours are visible.
- **Sitemap and robots are present** and include the major launch routes.

### Parent mental-model observations

- A parent can answer the major questions: “Do they tutor my child’s subject?”, “Can I trust them?”, “How much does it cost?”, “Where are they?”, and “How do I start?”
- The repeated free trial / assessment language is persuasive without feeling predatory.
- Reviews page is especially useful because it filters by program and grade level, matching how parents compare situations similar to their child.
- Pricing page is easy to find as “Plans,” but “Plans” may be slightly less direct than “Pricing” for parents scanning quickly.
- The site still has some legacy/WordPress-style phrasing in spots, especially big headline capitalization and copy such as “In Search Of Excellence?” This is not a blocker, but it slightly weakens the otherwise premium modern feel.

## Responsive/mobile findings

### Positive

- Mobile hero renders without clipping or horizontal overflow at 390px width.
- Mobile pages preserve the same visual system and CTAs.
- The hamburger button is present, reachable, and labelled “Open navigation menu.”
- The assessment page keeps the form readable on smaller screens.

### Problems

1. **Mobile drawer currently exposes only top-level links, not section child links.**
   - On `/programs/math/`, opening the drawer showed: Home, Academic Programs, Test Prep, Summer Programs, Why Us, Free Trial, Plans, Contact Us, Book a Free Assessment, phone, email.
   - It did **not** expose child program links or an expanded “Programs” section.
   - Business impact: a parent who lands directly on a subject page cannot easily jump to Reading/Science/Writing without backing out through the hub.

2. **Mobile drawer no longer matches expected branded copy from existing tests.**
   - Existing test expected “Where Learning Takes Root.” Drawer currently says “Strengthening Academic Abilities Efficiently and Effectively.”
   - This may be an intentional copy update, but test failure means the team needs either a test update or product decision.

3. **There are invisible/empty links in drawer structure from a text perspective.**
   - The logo home link appears as an empty text link in the drawer audit. It may be visually clear, but accessible naming should be confirmed from the image alt/aria label.

## Accessibility findings

### Positive

- H1 count is correct on checked pages.
- No missing image `alt` attributes were observed in the automated crawl.
- Assessment form fields have visible labels and inline validation messages.
- Hamburger button has an accessible label.
- No empty buttons were found except the expected icon buttons, which had aria labels where checked.

### Needs attention

- **Mobile nested navigation/accessibility regression:** missing expandable child-route navigation affects keyboard/screen-reader users and direct mobile visitors.
- **Validate drawer logo link accessible name:** one home logo link surfaced as empty in drawer link extraction. If the link is only an image, ensure the image alt or `aria-label` clearly says “Cedar Tutoring Academy home.”
- **Run axe before launch** on the final production build. This review used Playwright inspection and targeted checks, not a full axe pass.

## SEO/readiness findings

### Positive

- Major pages have titles, meta descriptions, and canonical URLs.
- `robots.txt` allows crawling and points to the sitemap.
- `sitemap.xml` includes the key marketing routes, program routes, and test-prep routes.
- No old `/admission/` URL appeared in the sitemap.
- Structured data exists on important pages such as home, pricing, reviews, locations, FAQ, summer programs, contact, and free trial.

### Problems

1. **Home structured data has a wrong-region phrase.**
   - Home JSON-LD description says Cedar offers tutoring “in the Dallas-Fort Worth area,” while the site and address are Worth, IL / South Suburbs of Chicago.
   - Business impact: local SEO and trust issue. A parent in Illinois may question whether the site is accurate.

2. **Legacy `/admission/` URL still appears in CTA content and returns 404 after redirect.**
   - Found “Admission Form” pointing to `/admission/` from content.
   - Requesting `/admission` redirects to `/admission/`, then returns 404.
   - Business impact: launch blocker. This recreates the exact kind of broken conversion page the rebuild was supposed to eliminate.

3. **Book Assessment lacks JSON-LD while Free Trial has service schema.**
   - Not a blocker, but adding LocalBusiness/EducationalOrganization action/service schema for the primary lead form would improve readiness.

## Performance/readiness findings

- Local dev load felt fast in browser interaction.
- Measured development-page transfer was about 1.15 MB, mostly scripts, but this includes Next dev tooling and should not be treated as production Lighthouse evidence.
- Recommendation: run Lighthouse/Web Vitals against `next build && next start` before launch, especially mobile. Current findings are functional/UX readiness, not a final production performance audit.

## Existing Playwright test result

Command run: `npx playwright test --project=mobile-chrome --reporter=line`

Result: **25 passed, 2 failed.**

Failures:

1. `tests/mobile-nav.spec.ts` — mobile drawer expected “Where Learning Takes Root,” but current drawer text is “Strengthening Academic Abilities Efficiently and Effectively.”
2. `tests/mobile-nav.spec.ts` — expected active program child navigation with “Collapse Programs” on `/programs/math/`; no such button was present.

These failures align with the mobile navigation findings above.

## Top priority fixes before launch

### 1. Fix stale `/admission/` conversion route and CTAs

- **Severity:** Critical / launch blocker
- **Evidence:** “Admission Form” CTA points to `/admission/`; `/admission` redirects to `/admission/`, then 404s.
- **Business impact:** A parent who is ready to enroll hits a dead page. This damages trust and directly loses leads.
- **Recommended fix:** Replace all “Admission Form” CTAs with “Book a Free Assessment” or equivalent and point them to `/book-assessment/`. Add a permanent redirect from `/admission` and `/admission/` to `/book-assessment/`.

### 2. Restore or redesign mobile nested navigation intentionally

- **Severity:** High
- **Evidence:** Active program child route did not show child program links or a “Collapse Programs” control in the drawer; existing mobile nav test fails.
- **Business impact:** Mobile parents comparing subjects have a shallower, less useful navigation path, especially if they enter from search on a subject page.
- **Recommended fix:** Reintroduce expandable Programs/Test Prep groups on mobile, or update the product/test expectation with an intentional alternate design that still exposes subject-level links clearly.

### 3. Fix wrong local SEO region in home structured data

- **Severity:** High
- **Evidence:** Home JSON-LD says “Dallas-Fort Worth area,” while the business is Worth, IL / South Suburbs of Chicago.
- **Business impact:** Confusing local signal for search engines and parents; undermines local credibility.
- **Recommended fix:** Replace with “Worth, IL and the South Suburbs of Chicago” or similar.

### 4. Resolve mobile nav test/copy mismatch

- **Severity:** Medium-High
- **Evidence:** Existing test expects “Where Learning Takes Root”; drawer now uses “Strengthening Academic Abilities Efficiently and Effectively.”
- **Business impact:** CI/test suite cannot be trusted as launch-ready until expectations match intended product copy.
- **Recommended fix:** Decide preferred brand line, then update either the drawer copy or the test.

### 5. Make parent-facing labels more direct where possible

- **Severity:** Medium
- **Evidence:** Header uses “Plans” instead of “Pricing”; some headlines still read like older marketing copy, e.g. “In Search Of Excellence? See How We Can Help You.”
- **Business impact:** Slight extra cognitive load for a parent scanning quickly.
- **Recommended fix:** Prefer direct labels: “Pricing,” “Tutoring Programs,” “Book Free Assessment.” Polish large headline casing/copy for a more premium, modern feel.

### 6. Add final production Lighthouse + axe gate

- **Severity:** Medium
- **Evidence:** This review used local dev browser checks; production build performance/a11y still needs final validation.
- **Business impact:** A slow or inaccessible mobile site will reduce parent confidence and lead conversion.
- **Recommended fix:** Run Lighthouse and axe against `next build && next start` before launch; capture mobile scores and fix any critical accessibility violations.

## Final QA note

Cedar is close: the experience now feels real, local, trustworthy, and designed for parents rather than just assembled from generic content. The launch blockers are not broad design problems; they are conversion/readiness defects that should be fixed surgically before go-live.
