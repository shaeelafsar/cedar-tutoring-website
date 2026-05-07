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
