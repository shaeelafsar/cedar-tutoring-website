# Cedar Tutoring Academy — PRD-Ready / Pre-Launch Website Review

**Review date:** 2026-05-07T10:22:32.063-05:00  
**Requested by:** Shaeel Afsar  
**Prepared by:** Morpheus — Lead/Architect  
**Audience lens:** Parents/guardians choosing tutoring for their child, with business-owner, UX/design, QA, SEO, and production-readiness review lenses.

---

## Owner Action Brief

**Final launch verdict:** Do not launch publicly yet. The site direction is approved and near launch-ready, but the P0 conversion and trust issues must be fixed first.

### Top 5 launch blockers and business impact

| Priority | Blocker | Business impact |
| --- | --- | --- |
| 1 | Assessment form is not wired to a real submission destination | Parents may believe they contacted Cedar while no lead reaches the owner. |
| 2 | Stale “Admission Form” CTAs and `/admission/` broken path | High-intent families hit a broken enrollment path, damaging trust and losing conversions. |
| 3 | Missing privacy policy while collecting family/student information | Families are asked for sensitive information without the expected legal/trust reassurance. |
| 4 | Incorrect Dallas-Fort Worth local SEO/geography references | Local accuracy is undermined for a Worth, IL business and may weaken parent confidence. |
| 5 | Pricing page has blank/unfinished-looking sections | Parents evaluating cost may interpret the business as not fully ready or professionally maintained. |

### Recommended fix order

1. Make the assessment form production-real and owner-tested.
2. Replace all “Admission Form” CTAs with **Book a Free Assessment** and redirect `/admission` paths.
3. Create and link the privacy policy near forms and legal/footer areas.
4. Correct all Worth, IL / Chicago South Suburbs SEO, metadata, schema, and copy references.
5. Remove or complete unfinished pricing sections before any public launch or paid traffic.

### What can wait

- **After P0 blockers, before launch announcement:** CTA hierarchy, navigation labels/mobile nested navigation, contact service-area gap, pricing-language consistency, and outcome-led hero/headline rewrites.
- **After launch-readiness blockers:** reviews IA, tutor/staff credibility copy, testimonial scanability, logo/red/copy polish, and richer local SEO content.

---

## Executive verdict: not production-ready / not PRD-ready yet

**Verdict: Approve the direction, but do not launch until the P0 conversion and trust issues are fixed.**

The Cedar Tutoring Academy rebuild is close to the right product: it is modern, warm, local, and substantially more trustworthy than a dated WordPress-style tutoring site. The best pages already communicate the owner’s preferred taste: simple, modern, aesthetic, premium-feeling, logo/color themed, concise enough to navigate, and persuasive without chaotic clutter. Parents can understand the core offer, see strong social proof, find programs, review pricing, contact the center, and start the assessment/trial path.

The site is not yet PRD-ready because several issues break trust at high-intent moments: a stale **Admission Form** CTA points to a 404, the assessment form appears to be a placeholder that does not persist/send leads, local SEO includes an incorrect Dallas-Fort Worth reference, pricing/contact pages include visibly unfinished blank sections, mobile nested navigation has regressed, and privacy/broken-route gaps remain. These are not reasons to rethink the whole site; they are launch-readiness defects that should be fixed surgically before go-live.

**Launch posture:** The brand and page system are strong enough to continue. The business should treat this as **near launch-ready after a focused P0/P1 polish sprint**, not as ready for public traffic today.

---

## Target audience mental model

Parents and guardians are not browsing a tutoring website for entertainment. They are usually anxious, time-constrained, and trying to decide whether Cedar can safely and effectively help their child. Their decision flow is:

1. **“Can they help my child’s exact problem?”**  
   Parents scan for subject, grade level, test prep, confidence, homework stress, falling grades, enrichment, or learning gaps.

2. **“Can I trust them with my child?”**  
   They look for real local presence, reviews, tutor credibility, safety, warmth, and signs that Cedar is not a faceless franchise.

3. **“What happens if I start?”**  
   They need a predictable, low-pressure process: form, phone call, assessment, trial, schedule, plan, and next steps.

4. **“Can this work for our schedule and budget?”**  
   They want price clarity, hours, location, remote/in-person options, transportation details if relevant, and no surprise fees.

5. **“What should I click now?”**  
   They need one obvious primary next step, plus a phone/contact fallback.

### Where the site helps that decision

- The homepage proof cards quickly show **KG–High School**, **2:1 ratio**, and **5.0 Google rating**.
- Reviews are substantial, parent-relevant, and filterable.
- The Book Assessment page clearly explains a low-risk path and is the strongest conversion surface.
- Pricing is refreshingly transparent for the category.
- The footer, contact, locations, and local copy reinforce that Cedar is a real Worth, IL tutoring center.
- The blue/orange brand system and rounded card language feel friendly, premium, and consistent.

### Where the site frustrates that decision

- “Admission Form” conflicts with “Book a Free Assessment” and leads to a broken route.
- “Free Trial” and “Book a Free Assessment” compete without a clear hierarchy.
- Pricing and contact pages contain blank/unfinished-looking areas exactly when parents are most serious.
- Some copy still feels migrated from an older brochure site rather than rewritten for a modern parent journey.
- Incorrect geography in structured data can make local parents question accuracy.
- Mobile navigation does not expose child program/test-prep routes clearly enough for direct mobile visitors.

---

## What is working well

- **Overall brand direction is right.** Cedar blue, orange CTA accents, dark navy proof sections, rounded cards, and logo-themed styling create a warm, modern, premium local-service feel.
- **Homepage first impression is credible.** The hero, proof cards, testimonials, program cards, and trust content make the site feel real and professionally rebuilt.
- **The Book Assessment page is strong.** It explains the process, reduces obligation anxiety, uses good form layout, and provides reassurance through process steps, FAQs, and parent proof.
- **Reviews are a major asset.** A 5.0 rating with 122 reviews is one of Cedar’s strongest sales levers and is used well on the reviews page.
- **Local trust is visible.** Address, phone, email, hours, service area, and Worth, IL presence are discoverable.
- **The site is broadly functional.** Reviewed core routes returned 200, no obvious browser console/runtime failures were observed, primary content had one H1, sitemap/robots exist, and the mobile layout generally avoids overflow.
- **Pricing transparency is valuable.** “No contracts,” “no hidden fees,” family options, and hourly pricing help parents feel less trapped.
- **The tone is more parent-centered than the old-site pattern.** The rebuild feels like a real business with a clearer path to start.

---

## Launch-blocking issues

### P0. Assessment form must submit to a real destination

The Book Assessment form appears to validate and show success, but Morpheus notes it is still a placeholder and does not send/persist the lead. This is the highest business risk: a parent could believe they submitted while Cedar receives nothing.

**Required fix:** Wire the form to a production-ready submission path with owner-tested notification delivery, persistence/backup, spam protection, error state, and confirmation copy that only appears after successful delivery.

### P0. Broken conversion links and stale `/admission/` path

“Admission Form” appears in high-intent CTA areas and points to `/admission/`, which redirects/404s. This breaks the enrollment journey and recreates the old-site trust problem.

**Required fix:** Replace all “Admission Form” CTAs with **Book a Free Assessment** and route to `/book-assessment/`. Add permanent redirects from `/admission` and `/admission/` to `/book-assessment/`.

### P0. Missing privacy policy while collecting family/student information

The assessment form collects parent and student information. A privacy policy route is referenced but `/privacy-policy` returns 404.

**Required fix:** Create and link a privacy policy before launch, especially near forms and footer/legal areas.

### P0. Incorrect local SEO geography

Home/shared SEO or JSON-LD copy references **Dallas-Fort Worth**, while Cedar is in Worth, IL and serves the Chicago South Suburbs.

**Required fix:** Replace all incorrect geography with Worth, IL / Chicago South Suburbs language across metadata, structured data, page copy, sitemap-relevant descriptions, and social previews.

### P0/P1. Pricing page unfinished visual/content state

Large blank sections on the Pricing/Plans page make a high-intent decision page look incomplete.

**Required fix:** Add real pricing/plan content or remove unfinished containers. Keep the page compact, clear, and confidence-building.

---

## High-priority UX/UI improvements

1. **Make “Book a Free Assessment” the canonical first step.** Use it as the main CTA in header, hero, page CTA panels, footer, program pages, and broken legacy CTA replacements.
2. **Clarify the role of the Free Trial.** If both remain, explain the difference: assessment = personalized plan; free trial = experience two sessions. Ideally present the trial as a benefit within the assessment funnel.
3. **Rewrite the homepage hero to be outcome-led.** Replace “WELCOME TO CEDAR TUTORING ACADEMY!” with parent/student outcome language such as: “Personalized tutoring that helps your child feel confident again.”
4. **Remove empty-looking sections.** Premium UI depends on intentional density. Blank pricing/contact areas look unfinished even if technically harmless.
5. **Tighten migrated copy.** Replace broad legacy phrasing with parent-situation copy: homework stress, math gaps, reading confidence, test anxiety, catching up, enrichment, schedule pressure.
6. **Surface proof faster and more specifically.** Use short review takeaway labels such as “More confidence,” “Real score improvement,” “Flexible scheduling,” and “Homework is calmer.”
7. **Strengthen tutor/staff credibility.** Parents trust reviews, but also need concise reassurance about tutor qualifications, training, supervision, and child-centered approach.

---

## Navigation and conversion-funnel findings

### Current strengths

- Desktop navigation is understandable and compact enough to use.
- Header CTA is consistently visible.
- Footer deep links help without crowding the header.
- Contact options and assessment CTA appear repeatedly.

### Key issues

- The top navigation is a little crowded for a first-time parent: Home, Academic Programs, Test Prep, Summer Programs, Why Us, Free Trial, Plans, Contact Us, plus CTA.
- “Plans” is concise but less direct than “Pricing” or “Plans & Pricing.”
- “Academic Programs” is accurate but slightly formal; “Programs” or “Tutoring Programs” scans faster.
- Reviews are a major conversion asset but are not prominent enough in primary IA.
- Mobile drawer currently exposes top-level links but not child program/test-prep links, reducing cross-shopping from subject pages.
- Free Trial and Book Assessment compete as separate first steps.

### Recommended navigation model

- Home
- Programs
- Test Prep
- Why Cedar
- Reviews
- Pricing
- Contact
- Primary CTA: **Book a Free Assessment**

Move Summer Programs into Programs or seasonal promotion unless it is the current campaign. Keep Free Trial as an offer inside conversion sections unless the business intentionally wants two separate funnels.

---

## Brand, logo, color, and premium aesthetic findings

### What supports the desired taste

- The site is simple, modern, warm, and generally uncluttered.
- Cedar blue is the dominant system color and aligns with the logo.
- Orange works well for primary CTAs and proof-strip emphasis.
- Dark navy testimonial/footer areas add premium contrast.
- Rounded cards, soft shadows, and pale blue icon containers create a friendly educational tone.
- The logo/colors are meaningfully themed throughout the site instead of appearing only in the header.

### What still needs polish

- Logo presence is slightly small/minimal in the header; modestly increasing size or spacing would strengthen brand recall.
- Cedar red appears in logo/card stripes but lacks a defined role. Keep it restrained for tiny brand accents, not primary CTAs or reassurance copy.
- Some interior page heroes feel less premium than the homepage and assessment page.
- All-caps headings and legacy phrases can feel shouty or old-site-like.
- Large blank containers undermine the premium aesthetic more than color or spacing issues do.

---

## Mobile/responsive findings

### Working well

- Mobile pages generally stack cleanly without obvious horizontal overflow.
- Mobile homepage flow is persuasive: hero → proof → programs → outcomes → trust → CTA.
- The hamburger menu is present, reachable, and labeled.
- Assessment form remains readable and touch-friendly on smaller screens.
- Footer remains useful and trust-building.

### Needs attention

- Mobile drawer does not expose nested child routes for Programs/Test Prep, which hurts subject comparison and accessibility.
- Existing mobile nav tests fail because expected drawer copy/structure differs from the current implementation.
- The drawer logo/home link may need a clearer accessible name.
- Mobile pricing has excessive empty vertical space.
- Mobile contact page appears sparse near the top and pushes practical contact details too far down.
- Mobile testimonials may be horizontally scrollable; ensure the cue is clear and there is no page-level horizontal overflow.

---

## Accessibility, SEO, performance, and production-polish findings

### Accessibility

- Positive: checked pages had one H1, no missing image alt attributes were observed, the assessment form has visible labels and validation messages, and the hamburger button has an accessible label.
- Required: confirm mobile drawer nested navigation/accessibility, ensure logo links have accessible names, test keyboard focus through drawer/FAQ/form controls, and run a final axe pass.

### SEO

- Positive: major pages have metadata/canonicals, robots and sitemap exist, sitemap includes major launch routes, and structured data exists on important pages.
- Required: remove Dallas-Fort Worth references, fix long/overbroad meta descriptions, verify structured data validity, add schema for the primary lead/assessment path if appropriate, and ensure deferred/broken routes are not promoted.

### Performance

- Local dev interaction felt fast, but dev transfer size is not production evidence.
- Required: run Lighthouse/Web Vitals against `next build && next start`, especially mobile, before launch.

### Production polish

- Verify Calendly URL, owner access, availability, notifications, and fallback behavior.
- Verify all external/social links and Google Maps embed accuracy.
- Resolve `/blog` if referenced: either remove until content exists or create an intentional noindex/coming-soon strategy.
- Ensure every internal CTA, footer link, sitemap URL, and metadata URL returns 200 or redirects intentionally.

---

## Recommended pre-launch fix plan, grouped by severity/business impact

### P0 — Must fix before any public launch or paid traffic

1. **Make the assessment form real.** Owner receives test lead; lead is persisted or backed up; spam/error handling exists.
2. **Fix `/admission/` and all stale “Admission Form” CTAs.** Replace with Book a Free Assessment and redirect legacy path.
3. **Create/link privacy policy.** Required because family/student information is collected.
4. **Remove incorrect Dallas-Fort Worth SEO/local-business references.** Align all metadata and schema to Worth, IL / Chicago South Suburbs.
5. **Remove high-intent unfinished states.** Pricing page must not show blank plan/included sections.

### P1 — High business impact before launch announcement

1. **Clarify CTA hierarchy.** Primary = Book a Free Assessment; secondary = Try a Free Trial; tertiary = Call Cedar; informational = Learn More.
2. **Simplify navigation labels.** Use Programs, Test Prep, Why Cedar, Reviews, Pricing, Contact.
3. **Restore/redesign mobile nested navigation.** Expose child program/test-prep pages accessibly.
4. **Fix Contact page empty city/service-area area.** Add accurate cities or remove the section.
5. **Resolve pricing inconsistency.** Decide whether public language is `$40/hr`, `$27–$40/hr`, “starting at,” or another approved model; apply everywhere.
6. **Rewrite the hero and key interior page headlines.** Make them parent-outcome-led and less all-caps/generic.

### P2 — Strongly recommended for launch quality

1. **Elevate reviews in the IA or homepage routing.** Reviews are one of the strongest parent trust assets.
2. **Add tutor/staff credibility language.** Concise qualifications, vetting/training, and supervision reassurance.
3. **Add parent problem-state cues to program cards.** Help parents self-identify faster.
4. **Curate testimonials for scanability.** Add takeaway labels or shorter selected quotes.
5. **Verify external links, maps, Calendly, phone, and email behavior.** No placeholders.
6. **Run final Lighthouse, axe, and link-check gates on production build.** Capture results for launch signoff.

### P3 — Polish after launch-readiness blockers

1. Slightly increase logo/header brand presence.
2. Define restrained Cedar Red usage rules.
3. Continue polishing legacy copy and grammar on secondary pages.
4. Add richer local SEO content only after core conversion defects are fixed.

---

## Concise PRD-ready checklist

- [ ] Assessment form sends a real test submission to the owner and only shows success after delivery.
- [ ] `/admission` and `/admission/` redirect to `/book-assessment/`; no “Admission Form” CTAs remain.
- [ ] Privacy policy exists and is linked near form/footer/legal areas.
- [ ] No Dallas-Fort Worth references remain in copy, metadata, or structured data.
- [ ] Pricing page has no blank/unfinished content sections.
- [ ] Contact page shows useful address, phone, email, hours, and service-area content without empty gaps.
- [ ] Primary CTA hierarchy is consistent across header, hero, cards, footer, and forms.
- [ ] Mobile nav exposes program/test-prep child links or an intentional accessible alternative.
- [ ] Navigation labels are parent-direct: Programs, Test Prep, Reviews, Pricing, Contact.
- [ ] Pricing/rate claims are consistent sitewide.
- [ ] Calendly, phone, email, maps, and external/social links are verified.
- [ ] All internal links return 200 or intentionally redirect.
- [ ] Sitemap/robots/canonicals reflect only intended launch routes.
- [ ] Structured data validates and reflects Worth, IL / Chicago South Suburbs.
- [ ] Final production Lighthouse/Web Vitals and axe checks pass with no critical launch issues.
- [ ] Homepage first two scrolls answer fit, trust, cost/risk, and next step.

---

## Reviewer/source notes

### Oracle — UX/Design verdict

Oracle’s verdict is **Approve with required launch fixes**. The visual direction is right and several surfaces feel warm, premium, and parent-friendly, but broken/outdated CTAs, blank pricing/contact sections, and uneven legacy copy prevent a fully production-ready impression.

### Mouse — QA verdict

Mouse’s verdict is **Approve with launch-blocking fixes**. The site loads broadly well across checked routes, has strong form validation and visible trust assets, but the stale `/admission/` path, mobile navigation regressions, wrong-region structured data, and final production accessibility/performance gates must be resolved.

### Morpheus — Lead/Architect verdict

Morpheus’s verdict is **near launch-ready, but not PRD-ready until conversion plumbing, broken-launch links, and parent mental-model clarity are tightened**. The highest architectural/business concern is that the primary lead path must be production-real, not just visually complete.

---

# Appendix — Raw source notes

The following source notes are pasted verbatim from the three review artifacts and are intentionally not rewritten.

## Appendix A — `.squad/reviews/oracle-prd-ready-review-notes.md`

```markdown
# Oracle UX/Design PRD-Ready Review Notes

**Reviewer:** Oracle — UX/Design  
**Requested by:** Shaeel Afsar  
**Review date:** 2026-05-07T10:22:32.063-05:00  
**Target:** Local running site at `http://127.0.0.1:3000`  
**Scope:** Parent/guardian decision journey, desktop and mobile UX/design, visual identity, trust, navigation, conversion readiness, production polish.  
**Output for:** Morpheus synthesis into `prd-ready-review-gpt.md`.

---

## Executive UX verdict

Cedar is close to a credible, modern launch, and the strongest surfaces already communicate warmth, trust, and local professionalism. The homepage, book-assessment page, program cards, testimonials, blue/orange brand usage, and footer treatment feel meaningfully better than a dated local-service website. A parent can generally understand what Cedar offers, see social proof, and find a next step.

However, I would not call the site fully production-ready yet from a parent decision-making perspective. The main blockers are not visual taste; they are confidence leaks in the conversion path: a visible **Admission Form** CTA points to a 404, pricing has large blank/unfinished content space, contact has a large empty “cities served” section, and several pages still use older/plain copy structures that feel less premium than the best surfaces. These issues create the impression of “almost done” rather than “ready to trust with my child.”

**Overall verdict:** **Approve with required launch fixes.** The brand direction is right. The site needs a final conversion-polish pass before going live.

---

## Parent mental-model observations

Parents/guardians arriving at a tutoring site are usually not browsing casually. Their mental model is closer to:

1. **“Can they help my child’s exact problem?”**
   - Subject, grade level, test prep, academic confidence, struggling vs enrichment.
2. **“Are they trustworthy with children?”**
   - Real local center, reviews, qualified tutors, safety, warmth, not a faceless franchise.
3. **“Will this be stressful or easy to start?”**
   - Cost, scheduling, assessment, trial, phone number, location, what happens next.
4. **“Do other families like mine get results?”**
   - Testimonials, outcomes, 5.0 Google rating, specific proof.
5. **“What should I click now?”**
   - Book assessment, free trial, call, contact.

The site does well on emotional trust once a parent reaches testimonials and the assessment page. The biggest UX mismatch is that parents expect the path from “I’m interested” to “I can talk to Cedar” to be frictionless and consistent. Seeing “Admission Form” while the header says “Book a Free Assessment,” or encountering large blank sections on pricing/contact, interrupts trust at exactly the wrong moment.

---

## Main journey assessment

### Journey tested

- Home page first impression.
- Header navigation: Academic Programs, Test Prep, Summer Programs, Why Us, Free Trial, Plans, Contact Us, Book a Free Assessment.
- Parent conversion path: Home → program/service confidence → reviews/proof → pricing/contact reassurance → book assessment/free trial/call.
- Mobile hamburger menu and mobile vertical scan.
- Book assessment form layout and trust panels.

### What works well

- **Hero establishes brand quickly.** Logo, blue gradient, orange CTA, and rating/proof strip give a polished first impression.
- **The homepage puts reviews early.** This is correct for local tutoring. Parents often need proof before reading program details.
- **The book-assessment page is the strongest conversion surface.** It clearly explains no obligation, contact timing, process steps, FAQs, and parent proof.
- **Mobile nav is concise and branded.** The drawer feels more premium than a generic link list and gives quick access to the assessment CTA and phone number.
- **Footer is strong.** It repeats location/contact, service links, and a final assessment CTA in a polished dark panel.

### What weakens confidence

- **“Admission Form” is an outdated CTA and leads to a 404.** This is the highest-risk UX issue because it appears in the homepage/program CTA path and breaks the enrollment mental model.
- **Pricing and contact include large empty/underbuilt sections.** Parents interpret blank space as unfinished or broken, especially near cost/contact decisions.
- **Some language still feels old-site generic.** Examples: “In Search Of Excellence? See How We Can Help You,” “PREP PROGRAMS FOR THE ACT and SAT,” and long page-hero paragraphs read more like legacy brochure copy than a refined modern local brand.
- **CTA vocabulary is inconsistent.** “Book a Free Assessment,” “Admission Form,” “Free Trial,” “Claim your free sessions,” and “Plans” all have valid roles, but the hierarchy needs clearer rules.

---

## Page/section-level findings

### Global header and navigation

**Strengths**
- Desktop nav is straightforward and compact.
- Primary CTA “Book a Free Assessment” is consistently visible in the header.
- Logo appears in the expected place and uses real Cedar colors.

**Findings**
- **Navigation label “Plans” is concise but slightly vague.** Parents think in terms of price/cost/options. “Pricing” or “Plans & Pricing” would be clearer.
- **Free Trial and Book Assessment compete.** Both are persuasive, but the parent may not know which to choose. If both remain, add a stronger distinction: assessment = custom learning plan; free trial = experience sessions.
- **Logo is visually small on desktop.** It is recognizable but could use slightly more presence to strengthen brand recall.

### Homepage

**Strengths**
- The above-the-fold blue gradient, proof cards, and orange proof strip feel modern and intentional.
- Testimonials directly after hero are an excellent parent-first choice.
- Program cards are clean and scannable.
- “Why Cedar?” reinforces non-franchise, 2:1 ratio, experienced tutors, and results — all parent-relevant.

**Findings**
- **Hero headline is generic and shouty.** “WELCOME TO CEDAR TUTORING ACADEMY!” is clear but not parent-outcome-led. It feels less premium than the surrounding design.
  - Better direction: “Personalized tutoring that helps your child feel confident again.”
- **Primary CTA in hero is “Why Cedar?” instead of conversion-first.** For a ready-to-go-live site, the strongest CTA should likely be “Book a Free Assessment” or “Start with a Free Assessment,” with “Why Cedar?” secondary.
- **CTA near bottom says “Admission Form” and points to `/admission/`, which is a 404.** This is a launch blocker.
- **Program cards are visually polished, but the page could better answer “which program is right for my child?”** A small parent-oriented line per subject would help: “For homework stress,” “For reading confidence,” “For test anxiety,” etc.
- **Testimonials are compelling but dense.** The dark section looks premium, but quote length should be curated so the proof is easier to scan.

### Academic Programs hub

**Strengths**
- Program cards are clean, consistent, and use brand-color top accents effectively.
- Grid is easy to scan on desktop and mobile.
- The page feels calmer and less cluttered than a typical local tutoring page.

**Findings**
- **Hero copy is too long and slightly legacy.** Parents arriving here want to identify a subject quickly, not read a broad institutional paragraph.
- **“Programs list” is functional but not premium.** A more parent-facing heading would feel stronger: “Find the right support for your child.”
- **Bottom CTA again says “Admission Form,” creating inconsistency and 404 risk.** Replace with “Book a Free Assessment.”

### Program detail pages

**Strengths**
- Detail pages provide enough substance for parents comparing subjects.
- FAQ/testimonial/related options structure supports decision-making.
- CTA sections are consistent and visually strong.

**Findings**
- Some program-detail copy is long and explanatory before it becomes emotionally specific. Parents need earlier reassurance: “If your child avoids math homework, falls behind after one missed concept, or feels anxious before tests, this is for you.”
- Detail pages should consistently surface grade levels and session expectations near the top.

### Test Prep hub

**Strengths**
- Clear ACT/SAT/PSAT grouping.
- Test prep naturally maps to parent urgency and outcomes.

**Findings**
- **Headline/copy feels less refined than the homepage.** “PREP PROGRAMS FOR THE ACT and SAT” and “Why Our Test Preps Works” feel grammatically and aesthetically rough.
- Parent mental model for test prep is outcome-driven: score goals, pacing, confidence, timeline, practice tests. Those should appear earlier and more visually.

### Why Us page

**Strengths**
- This page contains the right trust themes: individualized needs, non-franchise, methods, comparison.
- It supports parents who need reassurance before contacting.

**Findings**
- The page is long, and some content overlaps with homepage “Why Cedar?” messaging. It should be curated to avoid repetition fatigue.
- Best use: become the “trust proof” page, with more specific differences and fewer generic claims.

### Free Trial page

**Strengths**
- “Two free tutoring sessions, no strings attached” is a strong offer.
- The page reduces risk and helps parents try Cedar without commitment.

**Findings**
- Free trial must be clearly positioned relative to assessment. If the parent asks, “Should I book free trial or assessment?” the answer should be obvious.
- If the calendar embed loads slowly or appears blank in any environment, add a polished fallback card above the embed so the page never looks empty.

### Pricing / Plans page

**Strengths**
- Transparent statement of $40/hour as-needed tutoring is valuable.
- No hidden fees/no contracts message fits parent needs.
- FAQ content is relevant.

**Findings**
- **Large blank vertical area under “Tutoring plans that fit different seasons of school.”** This looks like missing pricing cards or broken content. On mobile it creates a long, confusing scroll with no value.
- **“What every family gets at Cedar” card has large empty space.** It reads like an unfinished component.
- Parents come to pricing with high intent; the page should be compact, specific, and reassuring. Blank space here can directly reduce conversions.

### Contact page

**Strengths**
- Contact cards for address, phone, email, and hours are clear on desktop.
- Local Worth, IL presence builds trust.
- CTA at bottom is visually strong.

**Findings**
- **Mobile contact page hides phone/email/hours too far down or appears visually sparse at the top.** The screenshot shows only address before a very large blank area, making contact feel incomplete.
- **“Cities we serve” section has no visible city list.** This creates another unfinished impression. Either add a real list/grid or remove the section until content exists.
- Contact page should be one of the most practically useful pages; it needs a denser top section on mobile.

### Book Assessment page

**Strengths**
- This is the best-designed page in the site.
- The layout answers parent concerns: no obligation, free assessment, personalized plan, call within 24 hours, process steps, testimonials, FAQs.
- Desktop two-column layout feels professional and conversion-focused.
- Mobile stacks logically: form first, then reassurance/proof.
- Form fields are visually clear with strong touch targets.

**Findings**
- The form card is strong, but ensure successful submission gives a warm confirmation state with next-step timing.
- “Preferred location” asks parents to choose before they may understand options; consider helper text if options are complex.
- The left illustration is polished, but on mobile appearing after the form is acceptable; the form-first order is right.

---

## Mobile-specific findings

### What works

- Mobile homepage is readable and follows a persuasive sequence: hero → proof → programs → outcomes → why Cedar → CTA.
- Mobile nav drawer is clean, branded, and easy to use.
- Touch targets generally appear generous.
- Cards stack well, with good padding and rounded corners.
- Footer remains usable and trust-building.

### Issues

1. **Mobile pricing page has excessive empty vertical space.** This is the most visible mobile production-polish issue.
2. **Mobile contact page has a large blank gap after the address card.** Phone/email/hours should be immediately available without a dead zone.
3. **Mobile homepage hero is text-heavy above the first CTA.** It works, but could be more parent-outcome-led and less institutional.
4. **Mobile testimonials are horizontally scrollable.** This is engaging, but parents may miss extra quotes unless there is a clear visual cue. Keep, but ensure snap/card widths do not cause page-level horizontal overflow.
5. **Header logo/menu area is minimal.** Functional, but slightly more brand presence could improve perceived quality.

---

## Design-system and brand consistency findings

### Strong brand patterns

- Cedar blue is now the dominant system color and feels aligned with the logo.
- Cedar orange works well for primary CTAs and proof-strip emphasis.
- Dark navy footer/testimonial treatments give premium contrast.
- Rounded cards, soft shadows, and pale blue icon containers create a friendly education tone.
- Newsreader-style headings plus clean sans body copy create a warm/professional hierarchy.

### Consistency gaps

- **Cedar red is still mostly decorative in card top stripes and logo, not meaningfully integrated into the broader identity.** This is acceptable if intentionally restrained, but the palette should define where red is allowed so it does not become random.
- **CTA labels need a stricter system.** Recommended hierarchy:
  - Primary conversion: **Book a Free Assessment**
  - Secondary low-risk: **Try a Free Trial**
  - Direct contact: **Call Cedar**
  - Informational: **Learn More**
  - Avoid: **Admission Form**
- **Interior page hero copy varies in polish.** Some pages feel premium; others feel like migrated WordPress copy placed into a modern shell.
- **Large empty component containers break the design-system promise.** Premium UI depends on intentional density; empty cards/sections feel unfinished even if technically correct.

---

## Accessibility and usability notes

- Contrast appears generally strong across blue/orange/dark surfaces, but final automated contrast checks should run after all content changes.
- Focusable controls appear to have adequate visual styling in the design system, but final keyboard review should include mobile drawer, FAQ accordions, form radios/checkboxes, and CTA links.
- Parent-facing language should avoid all-caps headline patterns where possible; all caps can reduce readability and feel less warm.
- Touch targets in main CTAs are strong. Smaller nav links are acceptable in desktop header but should remain at least 44px effective height on mobile.

---

## Top 10 priority improvements

### 1. Replace all “Admission Form” CTAs and remove `/admission/` dependency

- **Severity:** Critical / Launch blocker
- **Where:** Homepage final CTA, Programs hub final CTA, any repeated CTA component using “Admission Form.”
- **Issue:** The CTA points to `/admission/`, which returns 404. The label also feels bureaucratic and outdated.
- **Recommendation:** Use **“Book a Free Assessment”** and link to `/book-assessment/`.
- **Expected business impact:** Prevents high-intent parents from hitting a dead end; protects trust and conversion.

### 2. Fix Pricing/Plans page blank content sections

- **Severity:** Critical / Launch blocker
- **Where:** `/pricing/`
- **Issue:** Large empty areas under plan options and included information make the page look unfinished.
- **Recommendation:** Either add real pricing/plan cards or remove the empty sections and make the page concise: $40/hour, family plan info, booking notice, included benefits, FAQ, CTA.
- **Expected business impact:** Pricing visitors are high-intent; clarity here can directly improve assessment bookings.

### 3. Fix Contact page empty “Cities we serve” area and mobile contact density

- **Severity:** High
- **Where:** `/contact-us/`
- **Issue:** Desktop and mobile show a section title with little/no useful content; mobile has a large blank gap after address.
- **Recommendation:** Add city chips/list (Worth, Chicago Ridge, Palos, Oak Lawn, Orland Park, etc. if accurate) or remove the section. On mobile, show phone/email/hours immediately after address.
- **Expected business impact:** Improves practical trust and reduces frustration for parents trying to call/visit.

### 4. Make homepage hero outcome-led rather than institution-led

- **Severity:** High
- **Where:** Homepage hero
- **Issue:** “WELCOME TO CEDAR TUTORING ACADEMY!” is clear but generic and less emotionally resonant.
- **Recommendation:** Use parent/student outcome language, e.g. **“Personalized tutoring that helps your child feel confident again.”** Keep Cedar name visible in support copy.
- **Expected business impact:** Stronger first 5 seconds; better alignment with parent anxiety and hope.

### 5. Standardize CTA hierarchy across the site

- **Severity:** High
- **Where:** Global header, hero CTAs, page CTA panels, footer, program cards.
- **Issue:** Book Assessment, Free Trial, Admission Form, Plans, Contact, and Call compete without a consistent decision model.
- **Recommendation:** Define rules: primary = Book a Free Assessment; secondary = Try a Free Trial; tertiary = Call Cedar; informational = Learn More.
- **Expected business impact:** Reduces decision friction and increases confidence in the next step.

### 6. Tighten migrated/legacy copy on interior page heroes

- **Severity:** Medium-High
- **Where:** Programs, Test Prep, some detail pages.
- **Issue:** Several pages have long, generic, or grammatically rough hero copy.
- **Recommendation:** Rewrite hero sections to answer: who this is for, what problem it solves, what outcome parents can expect.
- **Expected business impact:** Raises perceived quality and keeps parents from bouncing on interior landing pages.

### 7. Add visible proof/outcome cues closer to subject cards

- **Severity:** Medium
- **Where:** Programs hub and program detail pages.
- **Issue:** Program cards describe subjects but do not always map to parent pain points.
- **Recommendation:** Add short parent-oriented cues: “For homework stress,” “For reading confidence,” “For test anxiety,” “For catching up before fall.”
- **Expected business impact:** Helps parents self-identify faster and click the right program.

### 8. Curate testimonial density for faster scanning

- **Severity:** Medium
- **Where:** Homepage testimonial section, assessment proof cards.
- **Issue:** Reviews are persuasive but sometimes text-heavy.
- **Recommendation:** Lead each review card with a bold takeaway label, e.g. “More confidence,” “Flexible scheduling,” “Real score improvement.”
- **Expected business impact:** Parents absorb proof faster, especially on mobile.

### 9. Increase logo/brand presence slightly in mobile and desktop header

- **Severity:** Medium-Low
- **Where:** Header.
- **Issue:** Logo is present but visually small relative to the premium identity work elsewhere.
- **Recommendation:** Slightly increase logo size or add stronger spacing so it feels intentional, not squeezed.
- **Expected business impact:** Improves brand recall and local legitimacy.

### 10. Define a restrained Cedar Red usage rule

- **Severity:** Low-Medium
- **Where:** Design system / components.
- **Issue:** Red appears in logo/card stripes but has no obvious semantic role.
- **Recommendation:** Use Cedar Red only for brand accents such as multi-color stripes, featured badges, and tiny emphasis marks — not positive reassurance copy or primary CTAs.
- **Expected business impact:** Preserves brand distinctiveness without introducing alarm/error connotations.

---

## Specific language examples

### Homepage hero

Current direction:
> WELCOME TO CEDAR TUTORING ACADEMY!

Suggested direction:
> Personalized tutoring that helps your child feel confident again.

Support copy:
> Cedar helps K–12 students strengthen reading, math, writing, science, and test-taking skills with patient tutors, small-group attention, and a clear plan for progress.

CTA pair:
- Primary: **Book a Free Assessment**
- Secondary: **Try Two Free Sessions** or **See Why Parents Choose Cedar**

### Programs hub heading

Current:
> Programs list

Suggested:
> Find the right academic support for your child.

Support copy:
> Explore Cedar’s tutoring options by subject and grade level, then start with a free assessment so we can match your child with the right plan.

### Pricing page

Suggested concise top message:
> Simple tutoring options with no contracts or hidden fees.

Suggested supporting bullets:
- $40/hour for as-needed tutoring
- Monthly family plans available
- 48-hour notice to reserve sessions
- Free diagnostic assessment included

### Contact page

Suggested “cities served” if accurate:
> Families visit Cedar from Worth, Chicago Ridge, Oak Lawn, Palos Hills, Bridgeview, Orland Park, and nearby South Suburbs.

If exact cities are not confirmed, remove the section until content is ready.

---

## Final launch-readiness recommendation

The site has the right visual foundation and several genuinely strong parent-facing surfaces, especially the homepage trust flow and book-assessment page. Before launch, prioritize removing broken/outdated CTAs, tightening pricing/contact empty states, and standardizing the conversion language. Once those are fixed, Cedar will feel not just modern, but trustworthy enough for a parent to take the next step.
```

## Appendix B — `.squad/reviews/mouse-prd-ready-review-notes.md`

```markdown
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
```

## Appendix C — `.squad/reviews/morpheus-prd-ready-review-notes.md`

```markdown
# Morpheus PRD-Ready Website Review Notes

**Reviewer:** Morpheus — Lead/Architect  
**Requested by:** Shaeel Afsar  
**Review timestamp:** 2026-05-07T10:22:32.063-05:00  
**Review target:** Local running site at `http://127.0.0.1:3000`  
**Scope:** Business/content/navigation findings for later synthesis into `prd-ready-review-gpt.md`.

## Executive readiness verdict

**Verdict: Near launch-ready, but not PRD-ready until conversion plumbing, broken-launch links, and parent mental-model clarity are tightened.**

The site already feels substantially more modern, premium, calm, and trustworthy than a typical local tutoring website. The visual system is cohesive, the Cedar blue/orange brand shows up consistently, the mobile experience does not overflow, and the main promise — caring local tutoring with strong parent trust signals — is visible. From a parent perspective, the site communicates warmth, affordability, and credibility better than the old WordPress pattern.

However, the current site still has several launch blockers from a business-owner and customer-acquisition standpoint:

1. **The primary assessment form is a front-end placeholder.** Submitting the form shows success but does not send the lead anywhere.
2. **Several live links route to 404s**, including `/admission`, `/privacy-policy`, and `/blog`.
3. **The navigation is functional but a little crowded and internally inconsistent**, with both “Free Trial” and “Book a Free Assessment” competing as first-step CTAs.
4. **Some content remains migrated rather than strategically rewritten**, especially program hub/detail copy with generic or old-site phrasing.
5. **SEO/local-business data has a serious geography mismatch**: shared SEO copy references “Dallas-Fort Worth students” even though Cedar is in Worth, IL and serves Chicago South Suburbs.

If these are fixed, I would be comfortable calling the site launch-ready for Phase 1 informational use.

## Visitor mental-model map

Parents/guardians choosing tutoring are not browsing like designers or engineers. Their sequence is closer to:

### 1. “Is this for my child?”

They first scan for grade level, subject fit, learning situation, and whether Cedar helps children like theirs.

**Current support:**
- Homepage stat cards immediately say `KG–High School`, `2:1`, and `5.0 Google rating`.
- Programs cover math, science, reading, writing, Arabic, ACT/SAT/PSAT, and summer support.
- FAQ addresses K–12, in-person/remote options, homework help, progress tracking, pricing, scheduling, and transportation.

**Gap:**
- The homepage and programs hub still lead with broad institutional copy (“In Search Of Excellence?” / “Cedar is here to cater to your child's needs”) instead of parent-situation copy like: “Math grades slipping?”, “Homework taking too long?”, “Reading confidence low?”, “ACT/SAT coming up?”
- Parents may need faster routing by need state, not only by academic subject.

### 2. “Can I trust these people with my child?”

Parents look for credibility, warmth, safety, reviews, teacher quality, and local legitimacy.

**Current support:**
- 5.0 rating and 122 Google reviews are strong trust assets.
- Reviews page is rich and filterable.
- About page gives a relationship-first local academy story.
- Contact and Locations pages reinforce a physical Worth, IL center.
- “Teacher-owned, not a franchise” is a strong differentiator.

**Gap:**
- Staff/tutor credibility is still somewhat abstract. Parents would benefit from clearer tutor qualifications, vetting/training, and supervision language.
- Reviews are strong, but the homepage could convert better by tying review snippets to parent fears: confidence, grades, homework battles, test prep, communication.

### 3. “What exactly happens if I start?”

Parents need the process to feel low-risk and predictable.

**Current support:**
- Book Assessment page explains form → call → free 30-minute assessment → custom learning plan.
- Free Trial page explains two free sessions and no payment/no card.
- FAQ answers common process questions.

**Gap:**
- There are two competing entry concepts: “Free Trial” and “Free Assessment.” They are both good offers, but their relationship is unclear. A parent may wonder: Do I book an assessment first? Do I schedule two sessions? Are these separate offers? Which should I choose?
- Homepage primary CTA is “Why Cedar?” rather than the owner’s strongest conversion action.

### 4. “Can this work for our schedule and budget?”

Parents need price range, no hidden fees, hours, location, and logistics.

**Current support:**
- Pricing page states $40/hr, family plans, no contracts, no hidden fees, free diagnostics.
- Location page mentions after-school/Saturday availability and transportation support for qualifying nearby families.
- Contact page lists address, phone, email, hours, and cities served.

**Gap:**
- Pricing language still mixes `$27–$40/hr` in Why Cedar comparison with `$40/hr` on Plans. That inconsistency may create distrust or phone-call friction.
- Transportation is mentioned but not in primary navigation; if it is a meaningful differentiator locally, it may deserve a short FAQ/section rather than a separate top-level page.

### 5. “What is the easiest next step?”

Parents need one obvious low-pressure action.

**Current support:**
- Header CTA consistently says “Book a Free Assessment.”
- Final CTAs appear across pages.
- Contact phone is visible in footer/contact/assessment page.

**Gap:**
- Main hero’s primary CTA sends to “Why Cedar?” instead of directly to assessment/free trial.
- Assessment form currently does not submit to a real backend or third-party integration, making the primary conversion path non-production-ready.

## Navigation/content strategy findings

### What works well

- **Primary nav is understandable:** Home, Academic Programs, Test Prep, Summer Programs, Why Us, Free Trial, Plans, Contact Us.
- **Header CTA is clear:** “Book a Free Assessment” is parent-friendly and low-risk.
- **The IA mostly matches Phase 1 informational scope:** core marketing pages exist and are statically routable.
- **Footer gives useful program/test-prep deep links** without crowding desktop nav.
- **Mobile nav is usable and does not horizontally overflow.** The mobile homepage screenshot shows the content stacks cleanly and touch targets appear large enough.

### What is strategically weak

#### 1. Top navigation is slightly too crowded for a parent’s first visit

There are 8 primary text links plus the CTA. For a local tutoring center, this risks making the site feel more complex than the actual buying journey.

**Recommended strategic nav:**
- Home
- Programs
- Test Prep
- Why Cedar
- Reviews
- Pricing
- Contact
- CTA: Book Free Assessment

Move “Summer Programs” into Programs or seasonal CTA placement unless it is a current high-priority campaign. Keep “Free Trial” as a conversion offer inside CTA sections, pricing, and assessment flow rather than a competing nav item.

#### 2. “Academic Programs” may be too formal

Parents are more likely to think “Tutoring Programs” or simply “Programs.” “Academic Programs” sounds institutional and slightly heavier.

#### 3. “Plans” is less direct than “Pricing”

The page title and nav say “Plans,” but parents are scanning for cost. “Pricing” or “Pricing & Plans” is clearer.

#### 4. The conversion offer hierarchy needs one canonical first step

Right now:
- Header says “Book a Free Assessment.”
- Homepage hero primary says “Why Cedar?” and secondary says “Free Trial.”
- Homepage final CTA uses “Admission Form” and links to a missing `/admission/` route.
- Programs hub final CTA also links to missing `/admission/`.
- Free Trial page uses Calendly plus final CTA to assessment.

**Recommendation:** Make “Book a Free Assessment” the canonical first step everywhere. Treat “Two free trial sessions” as a benefit/offer within that flow, not a separate competing path unless the business intentionally wants two funnels.

#### 5. Program pages need more parent-situation specificity

The program pages have useful base content but some copy still reads like legacy migration rather than polished conversion copy. Examples:
- Math: “At Cedar, we offer qualified math tutors...” is clear but generic.
- Science: “Science is an integral part of learning...” is broad.
- Arabic: content is more distinctive but needs careful tone review for parent confidence and clarity.

Each program should answer, above the fold or early:
- Who this is for
- Common signs your child may need help
- What Cedar does in sessions
- What parents will notice changing
- How to start

#### 6. Reviews deserves more visibility in primary IA

For this business, **reviews are a major sales asset**. A 5.0 average from 122 Google reviews should not be hidden behind homepage section/footer paths only. Parents comparing tutoring centers rely heavily on social proof.

## Conversion and business-owner findings

### Strong conversion assets already present

- “Book a Free Assessment” is clear and low-risk.
- “Two free sessions” is a powerful trial offer.
- 2:1 ratio is an unusually concrete differentiator.
- “No contracts,” “no enrollment fees,” and “no diagnostic fees” reduce friction.
- Physical address and local service-area list support legitimacy.
- Pricing is unusually transparent for the category.
- Reviews volume and 5.0 rating are persuasive.

### Conversion risks

#### Placeholder lead form is a launch blocker

The Book Assessment form validates locally and shows a “Request received” success state, but the code still contains a TODO to replace the placeholder with a real submission integration. This is the highest business-risk issue because paid/organic traffic could generate zero actual leads while making the parent think they submitted successfully.

#### Calendly URL may be generic/unverified

Free Trial uses `https://calendly.com/cedartutoring`. This must be confirmed as the correct active scheduling link with availability, notification routing, owner access, and fallback behavior before launch.

#### Broken admission CTA damages trust

Homepage and Programs hub still link to `/admission/`, which returns 404 locally. This is especially risky because “Admission Form” appears in final CTAs, where intent is high.

#### Privacy policy missing while forms collect child/family information

The assessment form collects parent name, email, phone, student name, grade level, program interest, location, and notes. A privacy policy link currently exists in content metadata but `/privacy-policy` returns 404. Even if not displayed in the current footer component, a privacy policy should exist before collecting family data.

#### CTA language is inconsistent

Current terms include:
- Book a Free Assessment
- Free Trial
- Admission Form
- Contact Us
- Plans
- Claim your free sessions

The owner’s funnel should use consistent language so staff can also answer calls consistently.

### Business-owner opportunities

1. **Use Cedar’s local/non-franchise positioning more boldly.** “Teacher-owned, not a franchise” is a real differentiator and should be present earlier in the homepage, not only in Why Cedar.
2. **Turn the pricing comparison into a confidence builder, not a competitor attack.** The current comparison is useful but should be careful with named competitors and price claims. If any claim cannot be maintained, anonymize competitor columns or add “typical local chain ranges.”
3. **Add a “what parents get after the assessment” promise.** Parents should know they will receive a recommendation, schedule fit, subject plan, and no-pressure next step.
4. **Prioritize phone conversion for local-service buyers.** The header could include phone on desktop or a call button on mobile because many local tutoring decisions happen by phone.

## Production-readiness gaps

### Launch blockers

1. **Assessment form does not submit anywhere.** It shows success without persistence or notification.
2. **Broken internal routes:** `/admission`, `/privacy-policy`, and `/blog` return 404.
3. **Old CTA still points to `/admission/`.** Found in homepage CTA and programs hub final CTA content.
4. **SEO geography mismatch:** shared SEO default description and homepage structured-data description reference Dallas-Fort Worth students while the business is in Worth, IL / Chicago South Suburbs.
5. **Privacy policy is missing while lead capture exists.** This is a trust/compliance gap.

### Important pre-launch fixes

1. **Unify CTA funnel around one first step.** Decide whether assessment or free trial is primary.
2. **Resolve pricing inconsistency:** `$27–$40/hr` in comparison vs `$40/hr` in Plans.
3. **Confirm external business links:** Facebook/Instagram/YouTube/LinkedIn values include generic or likely placeholder links in metadata.
4. **Confirm Google Maps embed accuracy.** The contact page has a hard-coded embed URL with placeholder-like timestamp and coordinates; verify it resolves to Cedar’s real business listing.
5. **Add/update sitemap exclusions if any routes are deferred.** Sitemap currently includes live Phase 1 pages, which is good; footer/content metadata still references missing deferred routes.
6. **Review all meta descriptions for local intent and concise length.** The homepage description is 267 characters, likely too long for search snippets.

### Content polish gaps

1. **Homepage H1 has odd rendered punctuation/line break:** Playwright extracted `WELCOME TO CEDAR TUTORING ACADEMY\n!`.
2. **Some headings are all-caps legacy style.** They work visually but can feel less premium and less parent-conversational.
3. **Program hub copy mentions History Tutoring but no History route/card appears.** Either add History or remove from copy.
4. **Programs hub says “Reading & Writing Tutoring” as a combined homepage card while detail routes are separated.** Clarify whether reading/writing are separate services or one literacy offer.
5. **About page is strong but not in primary nav.** If “Why Us” owns trust, About can stay footer-only; otherwise parent trust may benefit from “About” visibility.

## Top priority improvements

### P0 — Make assessment form real

**Severity:** Critical  
**Business impact:** Lost leads, false success confirmations, owner never receives inquiries.  
**Recommended action:** Wire the form to a production-ready service/API with email notification, spam protection, storage/backup, error state, and owner-tested delivery. Do not launch paid traffic or announce the site until this is verified end-to-end.

### P0 — Remove or fix broken launch links

**Severity:** Critical  
**Business impact:** Trust damage at high-intent moments; parents may abandon after hitting 404.  
**Recommended action:** Replace `/admission/` CTAs with `/book-assessment`; create `/privacy-policy`; remove `/blog` until content exists or create a simple coming-soon/noindex route only if strategically necessary.

### P0 — Fix local SEO geography mismatch

**Severity:** Critical  
**Business impact:** Search engines and social previews may associate Cedar with the wrong geography; local SEO trust is weakened.  
**Recommended action:** Replace Dallas-Fort Worth language with Worth, IL / Chicago South Suburbs everywhere, including default SEO description and structured data descriptions.

### P1 — Clarify the primary conversion funnel

**Severity:** High  
**Business impact:** Split attention and lower conversion rate.  
**Recommended action:** Make “Book a Free Assessment” the canonical CTA. Present “two free trial sessions” as a benefit after/within assessment unless Cedar intentionally maintains two separate booking flows.

### P1 — Simplify primary navigation

**Severity:** High  
**Business impact:** Parents decide faster when the navigation matches their mental model.  
**Recommended action:** Use concise parent-first labels: Programs, Test Prep, Why Cedar, Reviews, Pricing, Contact. Move Summer Programs into Programs or seasonal promotion. Remove Free Trial from top nav if assessment is canonical.

### P1 — Make parent problem states visible earlier

**Severity:** High  
**Business impact:** Better relevance for anxious parents; stronger perceived fit.  
**Recommended action:** Add homepage/program copy that maps to real triggers: falling grades, homework stress, reading confidence, math gaps, test anxiety, needing structure, schedule pressure.

### P1 — Resolve pricing/rate consistency

**Severity:** High  
**Business impact:** Inconsistent price claims can reduce trust and increase phone objections.  
**Recommended action:** Decide the public pricing language: exact `$40/hr`, range `$27–$40/hr`, or “starting at.” Apply consistently across Pricing, Why Cedar, homepage, FAQ, and structured data if applicable.

### P2 — Strengthen staff/tutor credibility

**Severity:** Medium  
**Business impact:** Parents may trust reviews but still want confidence in who teaches their child.  
**Recommended action:** Add concise tutor qualification/vetting/training language, ideally with 2–3 staff/teacher credibility cards if assets exist.

### P2 — Elevate reviews in navigation or homepage hierarchy

**Severity:** Medium  
**Business impact:** Social proof is one of the strongest conversion levers for local tutoring.  
**Recommended action:** Add Reviews to primary nav or strengthen homepage review routing with “Read 122 Google reviews.”

### P2 — Audit external/social links and map embed

**Severity:** Medium  
**Business impact:** Placeholder links and inaccurate maps weaken local-business credibility.  
**Recommended action:** Verify all social URLs, Google Business Profile links, map embeds, and phone/mail links before launch.

### P3 — Polish legacy wording and headings

**Severity:** Low-to-medium  
**Business impact:** Improves premium feel and reduces “migrated WordPress copy” impression.  
**Recommended action:** Rewrite all-caps/generic headings into concise parent-centered language while preserving SEO terms.

## Suggested launch-readiness acceptance criteria

Before PRD-ready signoff, Cedar should meet these criteria:

- Assessment form sends a test submission to the owner and shows a real success state only after successful delivery.
- Every internal navigation, CTA, footer, sitemap, and metadata link returns 200 or is intentionally external.
- The primary CTA language is consistent across header, hero, page sections, and footer.
- Local SEO references Worth, IL / Chicago South Suburbs only; no Dallas-Fort Worth references remain.
- Pricing/rate claims are consistent across all pages.
- Privacy policy exists and is linked near any form collecting family/student details.
- Homepage answers the parent’s first questions within the first two scrolls: fit, trust, cost/risk, and next step.
- Reviews and local credibility are surfaced prominently enough for a skeptical parent to feel safe calling.

## Notes for synthesis with Oracle and Mouse

- Oracle should evaluate whether the current visual design has enough warmth/humanity without photography and whether the blue hero system feels premium across all pages or too repetitive.
- Mouse should verify lead form persistence, error states, link integrity, SEO metadata, structured data validity, and mobile navigation behavior.
- Morpheus recommendation: synthesize around the theme **“almost ready, but conversion and trust plumbing must be production-real before launch.”**
```
