# Cedar Tutoring Academy — Combined Review

> Comparing **`prd-ready-review-opus.md`** (Claude Opus 4.7) vs **`prd-ready-review-gpt.md`** (GPT-5.5 / Morpheus + Oracle + Mouse). Areas of agreement, disagreement, gaps, and a unified action list.

> **Note for the founder:** Items marked **🟡 NEEDS DECISION** below cannot move forward without your input. Items marked **🟢 READY** can be executed in parallel by the engineer/content writer.

---

## Honest preamble — where Opus was wrong

Opus framed the review around **aesthetic and mental-model issues** (voice, photos, nav cramming, founder contradiction). GPT-5.5's review framed it around **functional/launch-blocker issues** (broken routes, fake form, wrong-state SEO). GPT's framing is more correct for a pre-launch question. Verified findings GPT caught and Opus missed:

| GPT finding | Verified? | Why it matters |
|---|---|---|
| Assessment form is a placeholder — line 264 has `// TODO: Replace this placeholder success state` | ✅ Confirmed in `src/app/(marketing)/book-assessment/BookAssessmentPageClient.tsx` | Parents who think they booked an assessment **did not** — the lead vanishes. Single biggest business risk on the site. |
| `/admission` and `/admission/` return 404, but "Admission Form" CTAs link to them | ✅ Confirmed (curl 404; CTA in `content/pages/home/cta.md` + `content/programs/_hub.md`) | High-intent CTA sends parents to dead pages |
| `/privacy-policy` returns 404 but is linked from the footer | ✅ Confirmed (curl 404; link in `content/site/metadata.md:97`) | Form collects parent + student info; missing privacy policy is a legal/compliance gap |
| `/blog` returns 404 | ✅ Confirmed | If linked anywhere, breaks trust |
| "Dallas-Fort Worth" hardcoded in SEO meta and home JSON-LD for an Illinois business | ✅ Confirmed in `src/lib/seo.ts:9` AND `src/app/(marketing)/page.tsx:67` | Local SEO tells Google Cedar serves Texas. Wrong audience, wrong region, breaks the local-trust premise of the entire site |

**These five findings are launch-blockers in the real sense — the site cannot ship to paid traffic until they're fixed.** Opus's findings are real but they're all *polish* problems on top of a site that has actual functional defects underneath.

---

## Where the two reviews agree

These are findings both reviewers reached independently. High confidence — act on these first.

| Theme | Opus | GPT | Consensus |
|---|---|---|---|
| **Plans/Pricing page is the weakest** | "Single weakest page" — no comparison table | "Large blank sections; high-intent decision page looks incomplete" | **P0 — fix or shrink** |
| **CTA wording is inconsistent** | "Book a Free Assessment / Free Trial / Try a free trial / Admission Form / Call Cedar" | "Admission Form, Free Trial, Book a Free Assessment compete without hierarchy" | **P0 — pick one primary CTA, hierarchy for the rest** |
| **Two CTAs cannibalize** (Free Trial vs Book a Free Assessment) | Same finding | Same finding | **P0 — Book a Free Assessment is primary; Free Trial is offer-inside-funnel only** |
| **Hero copy is generic / shouty** ("WELCOME TO CEDAR TUTORING ACADEMY!") | "Replace with sentence-case positioning" | "Use parent-outcome language: *Personalized tutoring that helps your child feel confident again*" | **P0 — rewrite to outcome-led sentence case** |
| **Navigation is crowded at desktop** | "8 items, 24px gap, cramped at 1280px — Programs dropdown + drop Home" | "A little crowded; recommended model: Home / Programs / Test Prep / Why Cedar / Reviews / Pricing / Contact" | **P1 — converge on 6 items, see "Disagreement" below** |
| **"Plans" label is vague** | "Plans page never shows plans" | "'Plans' is concise but slightly vague — try Pricing or Plans & Pricing" | **P1 — rename to Pricing** |
| **"Academic Programs" is formal** | (implicit — recommended Programs dropdown) | "Programs or Tutoring Programs scans faster" | **P1 — rename to Programs** |
| **All-caps / legacy hero copy on interior pages** | "PREP PROGRAMS FOR THE ACT and SAT, In Search Of Excellence" | Same | **P1 — sentence case throughout** |
| **No real photos / human warmth gap** | "No real human faces; team uses illustrated SVGs" | "Tutor/staff credibility needs strengthening" | **P1 — commission photographer (Opus shot list)** |
| **Contact page has empty cities-served section** | "Empty-looking subsection" | "No visible city list — unfinished impression" | **P0 — fill or remove** |
| **No map embed / hours on contact** | Same | Same | **P1 — add Google Maps + hours** |
| **Mobile pricing has excessive empty space** | "Long page sets wrong expectation" | "Most visible mobile production-polish issue" | **P0 — same fix as plans table** |
| **Site is more modern/premium than legacy WordPress, but not yet "premium"** | "Launch-ready, not premium-ready" | "Approve the direction, but do not launch until P0 issues are fixed" | **Consensus verdict: direction approved, blockers must close before launch** |

---

## Where the reviews disagree (or weight differently)

| Topic | Opus | GPT | Resolution |
|---|---|---|---|
| **Programs in nav: dropdown vs flat** | After back-and-forth with founder, landed on "Programs ▾ dropdown wins" because grouping is real and matches parent mental model | Recommends flat: Programs / Test Prep as siblings | **GPT's flat model wins** for two reasons: (1) Test Prep is a high-intent direct-search term; burying it under Programs hurts visibility; (2) flat is simpler to implement and accessibility-test. **Final nav: Home (or logo only) / Programs / Test Prep / Why Cedar / Reviews / Pricing / Contact + CTA**. |
| **Drop "Home" from nav** | Yes — modern best practice | GPT's recommended model keeps Home | **Opus stance wins.** Logo-as-home is the modern default; redundant Home link wastes a slot. Minor stylistic call. |
| **Add "Reviews" to nav** | Did not recommend | Recommends adding | **GPT wins.** 5.0 / 122 reviews is Cedar's strongest sales asset; promoting Reviews to nav surfaces it earlier in the journey. |
| **Free Trial as nav item** | Founder pushed back; Opus agreed to keep it | GPT recommends moving it to a benefit inside the assessment funnel | **GPT's stance is sharper.** Two competing CTAs hurts conversion (both reviews agree). The "free trial" message survives in copy and on the booking flow; removing the standalone nav link reduces decision fatigue. **Recommend founder reconsider** — or test both. |
| **Founder-name contradiction (Asmah vs Amina)** | Opus's #1 P0 finding | GPT did not flag this directly | **Opus wins on this one.** The site self-contradicts about who founded it; that's worse than a placeholder team page. |
| **Severity framing** | "70% then upgraded to 'launch-ready not premium-ready'" — aesthetic frame | "Do not launch until P0 conversion/trust issues fixed" — functional frame | **GPT's framing is correct** for a pre-launch decision. Opus's framing is correct for a *post-launch* polish review. Both are useful; GPT's blocks shipping. |
| **Mobile drawer nested nav** | Did not flag | GPT P1: drawer doesn't expose child routes; existing test fails | **GPT correct.** Opus didn't audit the drawer's child routes. |
| **Home page hero CTA** | "Hero copy is generic" but didn't audit which button is primary | GPT: "Primary CTA in hero is 'Why Cedar?' — should be 'Book a Free Assessment'" | **GPT correct.** Conversion-first CTA above the fold. |

---

## Findings unique to each review (worth keeping)

### Unique to Opus

- **Founder self-contradiction** — `about/story.md` says "founded by Asmah", `about/team.md` says "Amina Rahman, Founder". Real reviews thank Asmah. This is a credibility crack.
- **Yellow stat ribbon clashes with hero gradient** on home — visual integration suggestion
- **5-card programs grid is awkward 3-2 layout** on home — orphan row
- **Photographer shot list** (6 shots, 2-hour session) — operational deliverable for the photo P0
- **Body type 16–17px is at the floor for senior parents** — bump to 18px on long-form pages
- **Click-to-call icon missing from mobile nav**
- **Sticky mobile CTA bar** recommendation
- **Per-city landing pages** for SEO (Oak Lawn, Burbank, etc.)
- **EducationalOrganization schema verified present**, recommend layering LocalBusiness
- **WordPress vs current build comparison table** — settles the implicit rebuild question

### Unique to GPT

- 🔴 **Assessment form is a placeholder** (verified — `// TODO` on line 264) — **single most important finding in either review**
- 🔴 **`/admission/`, `/privacy-policy/`, `/blog/` all 404** — verified
- 🔴 **"Dallas-Fort Worth" hardcoded** in `src/lib/seo.ts` and `src/app/(marketing)/page.tsx` — verified
- 🔴 **Privacy policy is linked from footer but doesn't exist** — legal/compliance gap when collecting student data
- **Mobile drawer doesn't expose child program/test-prep routes** — Playwright test failing
- **Existing mobile-nav test fails** because drawer text changed ("Where Learning Takes Root" → "Strengthening Academic Abilities Efficiently and Effectively") without updating the test
- **`Book Assessment` page lacks JSON-LD** while `/free-trial` has service schema — inconsistent
- **Cedar Red has no defined role** — recommend restraining to brand accents only
- **Outcome-led copy examples** (e.g., "For homework stress," "For reading confidence," "For test anxiety") on program cards
- **Testimonial takeaway labels** ("More confidence," "Real score improvement") for faster scanning
- **"Cities we serve" empty section** on Contact (separate from Locations)
- **Run Lighthouse + axe + final link-check on `next build && next start`** before launch
- **Verify Calendly URL, owner access, availability, notifications, and fallback** as a launch-readiness gate

---

## Final consensus action list

Numbered roughly by *combined severity* (business impact × evidence strength), not by the order each report listed them.

### P0 — Launch blockers. Site cannot go to paid traffic until these close.

| # | Action | Effort | Status | Source |
|---|---|---|---|---|
| 1 | **Wire the assessment form to Azure SWA managed Function + Resend.** `POST /api/submit-assessment` (same-origin Function) validates honeypot + Origin, sends email via Resend to `Info@cedartutoring.com`. No client-side secrets. Spec: `.squad/specs/azure-function-submit-assessment.md`. Research: `.squad/research/form-solutions-comparison.md`. Web3Forms dropped. | ~2h (Function + client rewire) | 🟢 DECISION LOCKED — Azure SWA + Resend | GPT → Morpheus |
| 2 | **Replace all "Admission Form" CTAs with "Book a Free Assessment".** Update `content/pages/home/cta.md` and `content/programs/_hub.md`. Note: site is statically exported to GitHub Pages — server-side 301 redirects aren't available; use a static `/admission/index.html` with `<meta http-equiv="refresh">` to `/book-assessment/`, or simply delete the route and trust the link replacement. | ~30 min | 🟢 READY | GPT (verified) |
| 3 | **Create the privacy policy page** and link it from form pages, footer, and metadata. Standard parent/student data policy; can use a generic template adapted to Cedar specifics. Also ensures the existing footer link in `content/site/metadata.md:97` stops 404'ing. | Half day (drafting + page) | 🟡 NEEDS LEGAL REVIEW once drafted | GPT (verified) |
| 4 | **Fix all "Dallas-Fort Worth" references.** Edit `src/lib/seo.ts:9` and `src/app/(marketing)/page.tsx:67`. Replace with "Worth, IL and the South Suburbs of Chicago." Re-grep entire repo to confirm no other instances. | ~15 min | 🟢 READY | GPT (verified) |
| 5 | **Resolve the founder identity contradiction.** Either `about/story.md` (says "Asmah") or `about/team.md` (says "Amina Rahman") is wrong. Real Google reviews thank Asmah by name. | 15 min once confirmed | 🟡 NEEDS OWNER CONFIRMATION (Asmah) | Opus |
| 6 | **Fix or remove the broken `/blog` footer link.** Currently in `content/site/metadata.md:99`. Either build a Blog landing page (months of work) or remove the footer entry. | ~5 min (remove) | 🟡 NEEDS DECISION (build vs remove) | GPT (verified) |
| 7 | **Build a real Plans comparison on `/pricing`.** 3-tier table at minimum: As-needed hourly, Family monthly, Test Prep packages. Use "starting at" pricing if business can't commit to fixed numbers. Remove the blank container sections. | 4–6h (design + content) | 🟡 NEEDS PRICING DECISION | Both |
| 8 | **Unify CTA wording.** Primary = "Book a Free Assessment" everywhere. Secondary = "Try a Free Trial" inside funnels only. Tertiary = "Call Cedar". Note: the founder previously kept "Free Trial" as a top-nav item — this consensus moves it inside-funnel. | 4–6h across content files | 🟡 NEEDS OWNER CONFIRMATION (reverses earlier decision) | Both |
| 9 | **Replace ALL CAPS / institutional hero copy** with outcome-led sentence-case headlines, starting with the home hero (recommended: "Personalized tutoring that helps your child feel confident again"). Also: `content/pages/home/hero.md`, `content/pages/test-prep/_hub.md`, `content/programs/_hub.md`. | Few hours (rewriting) + owner approval | 🟡 NEEDS COPY APPROVAL | Both |
| 10 | **Fix Contact page's empty "Cities we serve" section.** Add real city list (Worth, Burbank, Oak Lawn, Evergreen Park, Chicago, Justice, Hickory Hills, Chicago Ridge, Oak Forest — already in `content/site/metadata.md:33–47`) or remove the section. | ~30 min | 🟢 READY | Both |

### P1 — Pre-launch polish. Should close before launch announcement / paid ads.

11. **Restore mobile drawer nested nav** so Programs and Test Prep expose child routes. Update or fix the failing Playwright test. *(GPT.)*
12. **Compress the 10-reason Why Us list** to 4–6 grouped value props with icons + paragraph. *(Opus.)*
13. **Commission the photographer session** (6-shot list in Opus review) — founder portrait, center exterior + interior, session in progress, team group, individual headshots. Replace illustrated SVG portraits. *(Opus.)*
14. **Rename "Plans" → "Pricing", "Academic Programs" → "Programs"** in nav. *(Both reviews.)*
15. **Final navigation:** Logo / Programs / Test Prep / Why Cedar / Reviews / Pricing / Contact / [CTA]. Drop "Home" (logo replaces). Inter-link gap 32px. **Note:** drops "Free Trial" from nav (folded into CTA hierarchy in P0 #8) — needs founder reconfirmation since the previous decision was to keep it. *(Hybrid: Opus on logo-as-home + 32px gap; GPT on flat structure + Reviews promotion.)*
16. **Add Google Map embed + hours** to `/contact-us` and `/locations`. *(Both reviews.)*
17. **Sticky mobile CTA bar** ("Book a Free Assessment") visible on scroll. *(Opus.)*
18. **Click-to-call icon in mobile nav** alongside the existing CTA. *(Opus.)*
19. **Standardize phone number formatting** (pick one, use SITE_CONFIG everywhere). *(Opus.)*
20. **Differentiate hero treatment per page** — vary gradient + add a page-relevant visual element. Drop breadcrumbs once heroes are differentiated. *(Opus.)*
21. **Pre-fill or preselect Calendly event** when entering the booking flow from a specific program page. *(Opus.)*
22. **Add parent-pain-state cues to program cards** ("For homework stress," "For test anxiety," "For reading confidence"). *(GPT.)*
23. **Layer `LocalBusiness` JSON-LD** alongside existing `EducationalOrganization`. Add `geo`, `openingHours`, `aggregateRating`. *(Opus.)*
24. **Add JSON-LD to Book Assessment page** (Service or Action schema for the lead form). *(GPT.)*
25. **Run Lighthouse + axe against `next build && next start`** on mobile before launch; capture and address criticals. *(GPT.)*
26. **Verify Calendly availability + owner notification settings** end-to-end. *(GPT.)*

### P2 — Post-launch polish. Quality bar, not blockers.

27. **Pick one heading capitalization style** (recommend sentence case) and apply globally. *(Opus.)*
28. **Consolidate eyebrow pills** — keep only on top section per page. *(Opus.)*
29. **Add testimonial takeaway labels** ("More confidence," "Flexible scheduling," "Real score improvement"). *(GPT.)*
30. **Subtle hover micro-interactions** — 50ms scale on cards, 100ms button shift, 150ms nav underline. *(Opus.)*
31. **Lower or remove Reveal animation** on primary content (reviews, plan tiers, FAQ list) to eliminate fast-scroll flicker. *(Opus.)*
32. **Add tutor-credibility copy** — concise qualifications, vetting, supervision reassurance. *(GPT.)*
33. **Add urgency signaling** for time-bound programs (summer enrollment, fall start). *(Opus.)*
34. **60-second video tour** of the Worth, IL center (phone-shot is fine). *(Opus.)*
35. **Per-city landing pages** for local SEO (`/locations/oak-lawn/`, etc.). *(Opus.)*
36. **Bump body type to 18px** on long-form pages for older-parent readability. *(Opus.)*
37. **Define restrained Cedar Red usage rule** — accents only, never primary. *(GPT.)*
38. **Slightly increase logo size / spacing** in header for brand recall. *(GPT.)*

---

## Suggested execution order

**Wave 1 — start immediately, no decisions blocking** (🟢 READY):
- P0 #2 (Admission CTAs replaced) — 30 min
- P0 #4 (Dallas-Fort Worth → Worth, IL) — 15 min
- P0 #10 (Cities served on Contact) — 30 min

These three close in roughly an hour and remove three of the most embarrassing user-facing defects.

**Wave 2 — request founder decisions in parallel:**
- P0 #1: ✅ form backend decided — Azure SWA + Resend (see Wave 3)
- P0 #5: confirm founder name and team listing accuracy
- P0 #6: build a Blog or remove the footer link?
- P0 #7: pricing tier values to publish (or "starting at" ranges)?
- P0 #8: confirm Free Trial moves from nav to inside-funnel
- P0 #9: approve the new home-hero copy
- P0 #3: privacy-policy template draft for legal review

**Wave 3 — full Calendly replacement** (rescoped 2026-05-07 per coordinator-pivot-calendly-only.md):
- Wave 3 is now the atomic replacement of Calendly's entire booking experience (form + custom calendar + Resend backend), not just the form backend.
- Rationale: Calendly-only was an intermediate state; replacing both form + calendar together avoids the duplicate-fields UX wart and keeps intake coherent.
- Three deliverables ship TOGETHER:
  1. Custom assessment form (scaffolded in `BookAssessmentPageClient.tsx` — ready, dormant)
  2. Custom calendar/scheduling solution (NEW — needs design + implementation, TBD on OSS vs. build vs. self-hosted SaaS approach)
  3. Resend email backend via Azure Function (spec: `.squad/specs/azure-function-submit-assessment.md`)
- P0 #1: Wire assessment form to Azure SWA managed Function + Resend (form-side work, unchanged from prior Wave 3 spec)
  - Trinity: scaffold `api/submit-assessment/index.ts`, rewire `BookAssessmentPageClient.tsx` to POST `/api/submit-assessment`, remove `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
  - Mouse: test plan against SWA preview deployment (API-level + browser E2E)
  - Shaeel: provision Azure SWA, Resend account, DNS cutover, add env vars to SWA Application Settings
- **Unblock criteria changed:** "Cedar ready to phase out Calendly + Resend ready + Azure provisioned + custom calendar plan/architecture agreed"
- **Prior status note (2026-05-07 08:00):** Wave 3 was paused pending form + backend completion. Now rescoped as full Calendly replacement; pause continues until calendar architecture is decided.
- Retire `deploy-pages.yml` workflow AFTER cutover verified end-to-end
- Make repo private (post-cutover only)

**Wave 4 — P1 polish** after all P0 close. P1 #11 (mobile drawer) and P1 #15 (nav restructure) are the largest remaining items.

---

## What the comparison actually tells us

1. **GPT's review is more correct for the launch question the founder asked.** It found 5 verified launch-blocking defects (placeholder form, broken admission CTAs, missing privacy policy, wrong-state SEO, broken `/blog`). Opus didn't audit functional behavior — only design and content surface — so it ranked aesthetic problems above functional ones.

2. **Opus's review is more correct for the *post*-launch polish question.** It went deeper on visual hierarchy, typography voice, photography strategy, founder self-contradiction, and design-system specifics. After GPT's P0 list closes, Opus's findings are what raise the site from "launch-ready" to "premium."

3. **The two reviews are highly complementary.** They agree on roughly 14 findings (CTA chaos, Plans page, hero shouting, nav crowding, generic hero, no real photos, etc.), disagree on 8 mostly-minor stance items, and each surface unique findings the other missed. Combined coverage is materially better than either alone.

4. **Single most important takeaway:** the founder should **not** ship to paid traffic until the assessment form actually delivers leads (P0 #1). Every dollar of ads spent before that fix is a parent who thought they reached Cedar but didn't.

5. **For the next sprint:** work the consensus P0 list (10 items). Treat the GPT-unique items (1–4, 6) as functional engineering tasks and the Opus-unique items (5, 9 wording rewrites) as content tasks. Both can ship in parallel.
