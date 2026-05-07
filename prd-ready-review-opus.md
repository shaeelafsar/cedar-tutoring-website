# Cedar Tutoring Academy — Production-Readiness Review

> **Reviewer's instruction:** assess from three lenses only — **parent (target audience)**, **business owner**, **UX/designer**. Avoid the developer lens. Optimize for: simplicity, modernity, premium feel, concise nav, brand-themed coloring, *justified* clutter (only what helps conversion), and production-ready polish.

---

## ⚠️ Critical fact-finding (read this first)

The site contradicts itself about who founded Cedar.

- `content/pages/about/story.md` (line 15) reads: *"Cedar Tutoring Academy® was founded by **Asmah** to give local families..."*
- `content/pages/about/team.md` (lines 6–13) lists the founder as: *"**Amina Rahman** — Founder & Academy Director"*
- Real Google reviews on the site (`content/pages/reviews/testimonials.md`) repeatedly thank **Asmah** by name.

So the same site presents two different founders. The team page also uses **illustrated SVG portraits** (no photos), and three of the four listed names ("Amina Rahman," "Nora Hassan," "Omar Siddiqui," "Sarah Khan") read as plausible but unverified — none appear in the real review corpus.

**Action required before any cosmetic work ships:** confirm with Asmah whether the team listing is real (then commission photos) or placeholder (then either replace with real names + real photos or remove the team section entirely until both are ready). Shipping the site with this contradiction is a real credibility risk — a parent who notices it will distrust everything else on the page.

---

## TL;DR — Production readiness: **launch-ready, not premium-ready**

Three readiness bands:

| Band | Definition | Cedar today |
|---|---|---|
| **Ship-ready** | No errors, mobile works, booking works, content present | ✅ Yes |
| **Launch-ready** | Plus: trust signals real, brand consistent, IA sensible | ✅ Yes |
| **Premium-ready** | Plus: deliberate aesthetic, real photography, unified voice, internal facts consistent | ❌ Not yet |

The site has a solid foundation. Information architecture is sensible. Trust signals (5.0 Google rating, 122 reviews, free trial, no contracts) are surfaced strongly and repeatedly. The Calendly booking is real and working. Mobile is responsive throughout. Brand colors (Cedar blue + warm orange/gold) are consistent.

To move from launch-ready to premium-ready, five themes need a focused sprint:

1. **Internal-facts trust gap** — the Asmah/Amina contradiction (see callout above) and illustrated-portrait-only team page. Largest single credibility risk on the site.
2. **Voice inconsistency** — copy switches between ALL CAPS, Title Case With Random Caps, and sentence case across the same flow. Premium sites pick one voice and hold it.
3. **Conversion confusion** — "Free Trial" link, "Book a Free Assessment" button, and "Try a free trial" buttons do the same thing in different wording. Visitors hesitate when CTAs aren't unified.
4. **Plans page doesn't sell** — the page titled "Plans" never shows plans. Parents shopping for a tutoring service need a comparison; they get prose about flexibility.
5. **Navigation cramming** — 8 top-level nav items at 24px gap on a 1280px laptop. Fix in a single PR (Programs dropdown, drop "Home").

None of these are catastrophic. All are fixable in a focused sprint.

**Already in good shape (verified):**
- ✅ Favicon, sitemap.xml, robots.txt all return 200
- ✅ OpenGraph tags present (og:title, og:description, og:image, og:url, og:type, og:site)
- ✅ Twitter Card tags present (twitter:card, twitter:title, twitter:description, twitter:image)
- ✅ JSON-LD structured data present (`@type: EducationalOrganization` with nested `PostalAddress`)
- ✅ Canonical URL points to `cedartutoring.com` (correct production domain)

The only SEO refinement worth considering: layer a `LocalBusiness` schema alongside `EducationalOrganization` for stronger local-search signals.

---

## Perspective 1 — The Parent (target audience)

> *"My kid is struggling. A friend mentioned Cedar. I have 30 seconds to decide if I trust this enough to call."*

### What earns trust immediately

- **The 5.0 Google rating tile** in the home hero. Specific, verifiable, and high. This is the single strongest element on the site.
- **"122 published reviews / 10+ years"** stat ribbon on the Reviews page. Volume + tenure.
- **Real review excerpts** with first names + last initials + city. Reads like real local parents, not testimonials manufactured by an agency.
- **"Free trial · no contracts · no enrollment fees · no diagnostic fees"** repeated as conviction. The repetition is doing work — it sounds confident, not desperate.
- **"Teacher-owned, not a franchise"**. This is the single best piece of differentiation copy on the site. Parents know what Sylvan/Kumon feel like; this signals "we care more."
- **Worth, IL address + phone in plain text in nav and footer**. Local trust requires "I can drive there if I need to."

### What erodes trust or wastes attention

- **No real photos of real humans, AND the site self-contradicts about its own founder.** `about/story.md` says Cedar was founded by Asmah; `about/team.md` says it was founded by Amina Rahman. Real Google reviews thank Asmah by name. A parent who hits the About page sees two different founders introduced as the same person — that single observation will undo every other trust signal on the site.
- **No photo of the physical center.** The Locations page describes Worth, IL but shows nothing. Parents who consider visiting want to see a clean space, a desk, a smiling teacher — not just a map pin.
- **"Plans" page contains no plans.** A parent clicking "Plans" expects to compare A vs B vs C. They get one $40/hr line plus prose about flexibility. They leave to ask the question elsewhere — likely Google for competitor pricing.
- **Two competing CTAs.** "Free Trial" in nav and "Book a Free Assessment" button. They appear to be the same thing, but worded differently. Decision fatigue costs conversions.
- **Hero copy on home is generic.** "WELCOME TO CEDAR TUTORING ACADEMY!" is shouting and tells a parent nothing about *why* they should care. The 3-second hero question is not "what is this" — they already know — it's "why is this better than the place down the road?"
- **Why Us shows a 10-item numbered list** of value props at uniform weight. Hard to scan, hard to remember. A parent walks away with no single durable claim.
- **All CAPS shouting** appears in the home hero ("WELCOME TO CEDAR TUTORING ACADEMY!"), Test Prep ("PREP PROGRAMS FOR THE ACT and SAT"), and pill labels everywhere. Reads as 2010s small-business voice. Modern premium = soft sentence case.

### What a parent wishes the site did

- Show me the actual tutor's face who would teach my child
- Show me the room my child will sit in
- Tell me what a session looks like (a photo, a 30-second loop, anything visual)
- Compare your prices clearly so I don't have to call to get them
- Tell me what makes you better than the franchise — in *one* sentence I'll remember, not 10 cards

### Accessibility (still a parent concern)

A working parent in their 40s–60s reading this site at night on a phone — that's the median visitor. Modest but real audit findings:

- **Body text** is 16–17px on most pages — adequate but at the floor of "comfortable" for older readers. Consider 18px body on long-form pages (About, Why Us, FAQ).
- **CTA buttons** appear to meet WCAG AA contrast against their gradient backgrounds, but the orange-on-blue on the home stat ribbon should be checked at the actual rendered colors.
- **Click-to-call missing on mobile.** The mobile header has "Book a Free Assessment" but no tap-to-call. For local businesses, the second mobile CTA should always be a phone icon — it's a one-tap action many parents prefer to a calendar.
- **Focus states on nav links** were not visually evident in screenshots — should be confirmed with keyboard-only navigation.
- **Illustrated portraits have alt text** ("Illustrated portrait card for Amina Rahman") which is good. When portraits become real photos, alt text should describe the person and role, not the format.

---

## Perspective 2 — The Business Owner (Asmah)

> *"Every page that doesn't lead to a phone call or a Calendly booking is a wasted page. Every section that doesn't build trust is wasted scroll."*

### What's working for revenue

- **Calendly embed is live and functional.** Friction from "interested" to "appointment" is one click. This is genuinely premium — most local-business sites still send you to a contact form.
- **Free trial as conversion lever.** Two free sessions, no card, no contract is a strong unlock — the business is essentially saying "let our work convince you."
- **Trust pyramid on home is well-ordered.** Hero → 5.0 rating → real reviews → programs → why us → final CTA. The order matches how a parent decides.
- **Footer phone is clickable** with `tel:` href. Mobile parents can call in one tap.
- **"Book a Free Assessment" CTA is on every page** in the nav, the footer, and at the bottom of every page.

### Where conversion leaks

- **The two-CTA problem mentioned above.** Pick "Book a Free Assessment" everywhere, sunset "Free Trial" as a nav item but keep it as a marketing message ("two free sessions" can stay in copy).
- **Pricing opacity.** Parents who can't find clear pricing on the site call competitors first. The Plans page should show: As-needed ($40/hr), Family Plan (X hours/month for $Y), Test Prep packages, Summer packages. Even rough ranges build trust.
- **No urgency.** No "Summer enrollment closing June 15," no "Limited slots for fall" — even when true. Local tutoring is highly seasonal; the calendar is the most natural urgency lever.
- **Program → booking is generic.** A parent on the Test Prep page who clicks "Free Trial" gets dropped on a Calendly with three event types unrelated to test prep. The link should pre-fill or at least visually preselect the relevant event.
- **No phone above the fold on most pages.** The header has "Book a Free Assessment" but not a click-to-call. For local businesses, a parent on mobile who's halfway convinced often prefers calling. Add a click-to-call icon to the mobile nav.
- **The team page uses illustrated portraits**, which (a) likely don't match real tutors and (b) read as placeholder or template. Parents converting on this page want to *meet* the people. Real headshots would meaningfully lift the Why Us → Booking funnel.
- **No reviews on the home page above the fold.** They appear in section #2, which is good — but the home hero would convert harder if the 5.0 / 122-review proof tile sat *next to* the hero copy, not below it as a separate yellow ribbon.

### Where the business owner is *over*-investing

- **The 10-reason "Top reasons parents choose Cedar" section.** Three or four reasons, each with one icon and one paragraph, would convert better than ten one-liners. This isn't a checklist; it's a brand pitch.
- **The "Tutoring plans that fit different seasons" subsection** under Plans takes a lot of vertical space to say very little. Tighten or replace with the actual comparison table.

### Discovery — can a Worth, IL parent actually find this site?

The site has the SEO scaffolding in place (verified — favicon, sitemap, OpenGraph, Twitter cards, canonical, EducationalOrganization JSON-LD all present). The remaining gaps are local-search specific:

- **Layer `LocalBusiness` schema** alongside `EducationalOrganization` — Google uses LocalBusiness for the Map pack. Include `geo` (latitude/longitude), `openingHours`, `telephone`, `aggregateRating` (you have a 5.0/122 — surface it in JSON-LD).
- **Verify Google Business Profile** is linked to the live cedartutoring.com domain and that the 5.0 rating + 122 reviews appear in the Map pack for "tutoring near Worth IL."
- **Add a sitemap submission step** to Google Search Console after each deploy (or automate it).
- **Each city in the served-area list** ("Worth, Burbank, Oak Lawn...") could become a thin landing page (`/locations/oak-lawn/`, etc.) with neighborhood-specific copy. Standard local-SEO play; turns each city name into a search hook.

These are P1/P2 — the foundation is correct. They unlock additional traffic rather than fix anything broken.

---

## Perspective 3 — The UX / Designer

> *"Production-ready means deliberate. Every decision visible on the page should look like someone meant for it to be there. No accidental detail."*

### Aesthetic strengths

- **Card system is consistent.** Same border radius, same shadow, same internal padding. Across all pages.
- **Color palette is restrained.** Cedar blue (gradient), warm gold/orange for CTAs, charcoal footer. Three colors, one accent. Good restraint.
- **Spacing is generous.** Not crammed at the section level — only at the nav level.
- **Mobile responsive.** No horizontal scrolling, no overflow, no awkward stacking.
- **Footer is clean and scannable.** Four-column structure with clear groupings. Good information density without clutter.
- **The icon set on program cards** (Arabic, Math, Reading, Science, Writing, ACT, PSAT, SAT) uses a coherent linework style. Visually unified.

### Aesthetic weaknesses (priority order)

1. **Navigation cramming at 1280px.** 8 top-level items, 24px between-link gap. Industry norm is 5–7 items at 32–48px. Fix: Programs dropdown + drop "Home" → 5 items, gap 32px. *(Already discussed; ready to ship.)*
2. **Typography voice splits in three.**
   - ALL CAPS shout: "WELCOME TO CEDAR TUTORING ACADEMY!"
   - Title Case With Random Caps: "In Search Of Excellence? See How We Can Help You"
   - Sentence case: "Why Cedar?", "Common questions before you enroll."
   Pick one. Sentence case is the modern premium standard (Stripe, Linear, Apple, Notion). The ALL CAPS hero copy especially reads as dated.
3. **Hero treatment is identical across every page.** Same blue gradient, same breadcrumb, same h1, same subhead. By page 4 the visitor's eye stops registering it. Each top-level page should have a distinct hero element: a real photo on About/Locations, an icon collage on Programs, a tutor portrait on Why Us, a calendar visual on Free Trial.
4. **No real human faces anywhere.** Premium feel for a service business comes from visible humans. Even one well-shot photo on the About page (founder + center interior) would lift the entire site's trust feel.
5. **The yellow stat ribbon on home** ("5.0 Google Rating · 2:1 Student-to-Tutor Ratio · $27–$40/hr · Free Diagnostics · Worth, IL") feels visually disconnected from the gradient blue hero above it — it looks like a separate billboard pasted in. Better: integrate stats into the hero card, or use a subtle white card on a soft tint.
6. **The "10 reasons" cards** are visually busy. 10 small numbered cards = checklist energy. Modern premium = 4–6 generous cards with icon + heading + paragraph each.
7. **Nothing animates.** No subtle button hover lift, no scroll-driven progress, no parallax. The site is static-looking next to modern peers (Mathnasium and Kumon both have hover states; the cleanest reference is something like Outschool or Khan Academy). Some restraint is good — don't add motion for its own sake — but a 50ms button-lift on hover and a 100ms image scale on card hover would feel materially more polished.
8. **OpenGraph / Twitter / favicon all already correct (verified).** Removing this from the worry list. The only refinement: layer `LocalBusiness` schema alongside `EducationalOrganization` (covered under Discovery).
9. **CTA wording inconsistency** at the surface treatment level (separate from the two-CTA conversion problem). Different buttons say: "Book a Free Assessment" / "Book a free assessment" / "Free Trial" / "Try a free trial" / "Book free assessment" / "Admission Form" / "Call Cedar". Pick a primary verb and noun and use them everywhere.
10. **Phone number formatting drifts.** "+1 708 890-4400", "+1 708 890–4400" (em-dash), "Call +1 708 890-4400". Pick one and apply globally.
11. **The breadcrumb under every hero** repeats info already in the URL and the page title — drop it. (Reinforces P1 #12: differentiating heroes per page makes breadcrumbs redundant orientation.)
12. **Pill eyebrows ("• PLANS", "• WHY CEDAR", "• FREE TRIAL", "• GET STARTED")** are everywhere — same pill style on every section above every heading. Premium sites use eyebrows sparingly so they feel intentional. Halve the count.
13. **Footer phone formatting** uses a small icon + number with a tight stack. Could use one more px of breathing room and a slight color contrast bump (white-on-charcoal at 80% opacity is too subtle for senior parents).

---

## Per-page findings (the high-impact ones)

### `/` Home
- ✅ Trust pyramid order (rating → reviews → programs → why us → CTA) is well-judged
- ⚠️ Hero copy "WELCOME TO CEDAR TUTORING ACADEMY!" is generic and shouty. Replace with positioning: *"Personalized tutoring for South Suburbs families — built on relationships, not contracts."* (or similar)
- ⚠️ 5.0 / 2:1 / KG-High School cards in hero don't include the strongest signal: "122 Google reviews"
- ⚠️ Yellow stat ribbon below hero clashes visually with gradient blue above
- ⚠️ Programs grid has 5 cards in a 3-2 layout; the orphaned 2 on row 2 looks unbalanced. Either go 4 + 1 highlighted, or go 6 (add Test Prep as a card), or go a 3-row vertical list.

### `/programs` Academic Programs
- ✅ Five program cards are well-constructed with grade level + short description + Learn more
- ⚠️ The hero ("In Search Of Excellence?") has Title Case With Random Caps, dated voice. Sentence case: *"How Cedar helps your child get ahead in every subject."*
- ⚠️ The "Programs list" eyebrow repeats "Academic Programs" content above it — redundant
- ⚠️ Consider adding a 6th card for "Test Prep" or grouping K–12 by grade band for parents who think in terms of "elementary support" vs "high school subject mastery"

### `/test-prep`
- ✅ Three card grid (ACT / PSAT / SAT) is clean and well-balanced
- ⚠️ All-caps hero ("PREP PROGRAMS FOR THE ACT and SAT") — change to sentence case
- ⚠️ Body copy under "Why Our Test Preps Works" has typos/awkwardness ("Test Preps Works"). This page reads like the original content was copied without editing.
- ⚠️ No visible tutor photo / no specific test prep trainer mentioned. Test prep is a personality-driven service.

### `/summer-programs`
- ✅ Bright premise ("blends fun, field trips, and STEM learning")
- ⚠️ Two visually empty content gaps under "Summer plans" and "Educational fields explored" headings. They're populated by Reveal animation but the pacing is thin — sections appear underweight
- ⚠️ No photo of past summer activities. Summer camps live or die on parent-visible-fun signals
- ⚠️ No dates / enrollment deadline / capacity. Summer programs are inherently time-bound; the site doesn't reflect that

### `/why-us`
- ⚠️ Empty-feeling "How Cedar Compares" section with just an eyebrow + heading + subhead. Real comparison table missing
- ⚠️ 10-item list of reasons is cognitively heavy; consolidate to 4–6 grouped value props with icons
- ⚠️ Final CTA card is the cleanest moment on the page; pull that energy upward

### `/free-trial`
- ✅ Calendar widget loads, fills, and works on mobile + desktop (this was fixed earlier this session)
- ✅ Three event types render correctly (2 Free Learning Sessions / Phone Consultation / In-Office Consultation)
- ⚠️ "Pick the track that fits your child today" and "What happens after you book" sections feel visually empty when scrolled past quickly — the Reveal opacity:0 → 1 transition causes a brief flicker. Consider lowering `amount` to 0.05 or removing Reveal from these sections (they're primary content, not decoration)
- ⚠️ The calendar event picker shows Cedar's Calendly events in a generic Calendly style; consider replacing with a single direct-booking event for the most common case ("2 Free Learning Sessions") and link out to the others as alternatives — reduces choice paralysis

### `/pricing` (Plans)
- 🔴 **The single weakest page.** Parents come here to shop and find one $40/hr line item plus prose. No comparison table, no monthly tier, no test prep package pricing, no summer pricing
- ⚠️ FAQ section at bottom is good (8 questions answered) but isn't a substitute for plan transparency

### `/contact-us`
- ✅ Three-card layout (Address / Phone / Email) with icons — clean and clear
- ✅ Cities-served list signals "we serve your neighborhood"
- ⚠️ No map embed. A simple Google Maps iframe would dramatically improve "I can drive there" trust
- ⚠️ No "Hours" anywhere. After-school families need to know when the center is open

### `/book-assessment`
- ✅ Form is now on the right (xl:order-2) — improvement from prior version
- ✅ "What to expect" 4-step list is clear and reduces booking anxiety
- ✅ Testimonials inside the form page reinforce trust at the moment of decision
- ✅ FAQ at bottom answers exactly the questions parents have right before submitting

### `/reviews`
- ✅ 5.0 / 122 / 10+ trust ribbon is properly placed at top
- ✅ Filter UI (All / Reading / Math / Writing / Science / Homework / SAT / ACT) is a thoughtful touch — parents can find reviews matching their child's situation
- ⚠️ The reviews list itself reveals slowly with the Reveal animation; on this specific page, instant render would be better since the reviews ARE the content
- ⚠️ Review cards could use slightly more visual hierarchy — name, rating, source logo (Google G), date

### `/about`
- ✅ Stat ribbon ("10+ Years / 2:1 Ratio / 9 Programs / 2 Free trial sessions") is strong opening
- 🔴 **Self-contradicting founder.** Story page says Asmah; team page says Amina Rahman. Resolve before any other About-page work. (See top callout.)
- 🔴 **Team section uses illustrated SVG portraits.** Replace with real photos + verified names, or remove the section until both are ready.
- ⚠️ The Reveal animation on "What makes Cedar feel different" causes a brief opacity flicker if scrolled past quickly. User-perceived issue, not a layout bug.

### `/faq`
- ✅ Cleanest content page on the site. 18 well-written FAQs grouped by category. Filter UI works.
- ⚠️ Hero feels heavy compared to the lightweight content below — consider a smaller hero band

### `/locations`
- ✅ Honest description: "Worth, IL location and nearby service areas"
- ⚠️ No photo of the center, no map embed, no street view link — three obvious additions for a "Locations" page
- ⚠️ Empty-looking comparison subsection ("Our Worth, IL location and nearby service areas") needs the table or list it implies

---

## Brand consistency check

| Element | State | Action |
|---|---|---|
| Logo | Used in nav + footer | ✅ |
| Primary color (Cedar blue) | Hero gradients + buttons + accents | ✅ |
| CTA color (warm orange/gold) | Primary buttons + section ribbons | ✅ |
| Charcoal footer | Consistent across pages | ✅ |
| Typography (serif headings + sans body) | Consistent | ✅ |
| ALL CAPS headlines | Used inconsistently — some pages yes, others no | 🔴 Pick one (recommend: drop ALL CAPS) |
| Capitalization style for headings | Mix of Title Case + sentence case | 🔴 Pick one (recommend: sentence case) |
| CTA button text | "Book a Free Assessment" vs "Free Trial" vs "Try a free trial" vs "Book free assessment" | 🔴 Unify wording |
| Phone number format | Drift between "-" and "–" | ⚠️ Standardize |
| Eyebrow pills above sections | Used on nearly every section | ⚠️ Halve |
| Real photography | None | 🔴 Add at least 3 (founder, center interior, session in progress) |

---

## Prioritized fix plan

### P0 — production blockers (ship before calling the site "done")

1. **Resolve the founder contradiction first** (see top callout). Confirm with Asmah whether the team listing is real or placeholder. This is the only finding in the report that actively damages trust — every other P0 is *additive* polish.
2. **Replace illustrated team portraits** with real photos of real Cedar tutors, OR remove the team section until photos are available. Pairs with #1.
3. **Unify CTA wording** to "Book a Free Assessment" across the entire site. Sunset the standalone "Free Trial" link in primary nav (keep "two free sessions" as marketing copy on the booking flow).
4. **Build a real Plans comparison** on `/pricing` showing at minimum: As-needed hourly, Family monthly, Test Prep packages. *Acknowledged tradeoff:* full price transparency can lock the business into headline numbers — a "starting from $40/hr" + range table is the compromise. Even a 3-tier table with "starting at" prices builds more trust than today's prose.
5. **Replace ALL CAPS hero copy** site-wide with sentence-case headlines that say something specific about the page topic.
6. **Fix navigation cramming** — Programs dropdown + drop "Home" → 5 items + gap 32px. *(Already designed in prior conversation.)*
7. **Add at least 3 real photos** — see shot list below.

#### Photographer shot list (2-hour session, one Saturday morning)

| # | Shot | Use | Notes |
|---|---|---|---|
| 1 | **Founder portrait** (Asmah), waist-up, soft natural light | About page hero, footer signature, og:image | Shoot indoor near a window, neutral background |
| 2 | **Center exterior** with signage | Locations page, Contact page | Daylight, no cars in frame, square + 16:9 crops |
| 3 | **Center interior** (open space showing desks + bookshelf) | Home page mid-section, Locations page | Wide angle, no students for privacy |
| 4 | **Tutor + student** in session (one student over 18 OR with consent + face partially turned) | Programs page hero, Why Us section, Free Trial page | Posed but natural, books open, laptop visible |
| 5 | **Tutor team group photo** (all teaching staff together) | About > Team section header | Replaces the illustrated portraits |
| 6 | **Individual tutor headshots** (one per active tutor) | Team grid below the group photo | Match aspect ratio + lighting across all |

If commissioning is a multi-week blocker: ship interim with shots 1, 2, 3 only (founder + building + space — all shootable in one hour with a phone) and gate shots 4–6 behind the proper session.

### P1 — premium polish

8. **Pick one heading capitalization style** (recommend sentence case) and apply globally.
9. **Compress the 10-reason Why Us list** to 4–6 grouped value props with icons + paragraph each.
10. **Consolidate eyebrow pills** — keep them only on top section per page, remove from secondary sections.
11. **Add a sticky mobile CTA bar** ("Book a Free Assessment") that's always visible at the bottom of the screen on mobile.
12. **Standardize phone number formatting** — pick "(708) 890-4400" or "+1 708 890-4400" and apply everywhere (use the SITE_CONFIG constant only).
13. **Differentiate hero treatment per page** — at minimum, vary the gradient direction and add a page-relevant visual element (icon collage on Programs, calendar mock on Free Trial, photo on About/Locations). Drop breadcrumbs once heroes are differentiated.
14. **Add Google Map embed + hours** to `/contact-us` and `/locations`.
15. **Pre-fill Calendly event** when a visitor clicks a free-trial CTA from a specific program page (e.g., test-prep page → Calendly with phone consultation about test prep).
16. **Layer `LocalBusiness` JSON-LD schema** alongside the existing `EducationalOrganization` — adds Map-pack signals (`geo`, `openingHours`, `telephone`, `aggregateRating`).
17. **Click-to-call icon in mobile nav** (next to the existing CTA button) — one-tap parent action.

### P2 — delight & long-tail

18. **Subtle hover micro-interactions** — 50ms scale on cards, 100ms color shift on buttons, 150ms underline animation on nav links.
19. **Add urgency signaling** for time-bound programs — summer enrollment dates, fall start, limited slots if true.
20. **Add a 60-second video tour** of the center on About — even shot on a phone, real footage of real space outperforms any photo.
21. **Lower or remove the Reveal animation** on primary content blocks (reviews, plan tiers, FAQ list). Decorative motion is fine; primary-content motion creates a brief flicker on fast-scroll users that reads as "still loading."
22. **Per-city landing pages** (`/locations/oak-lawn/`, etc.) for local SEO.
23. **Bump body type to 18px** on long-form pages (About, Why Us, FAQ) for the parent demographic.

## Mobile per-page check

Spot-checked at iPhone 13 width (390px). Each row notes the worst-case issue, not all issues.

| Page | Renders cleanly | Touch-target adequate | Specific mobile concern |
|---|:-:|:-:|---|
| `/` Home | ✅ | ✅ | Yellow stat ribbon stacks awkwardly under hero |
| `/programs` | ✅ | ✅ | None notable |
| `/test-prep` | ✅ | ✅ | None notable |
| `/summer-programs` | ✅ | ✅ | Long page — no sticky CTA means parents scroll back up to book |
| `/why-us` | ⚠️ | ✅ | 10-reason list reads as 10 stacked cards on mobile — even more tiring than on desktop |
| `/free-trial` | ✅ | ✅ | Calendly iframe fills correctly (verified earlier this session) |
| `/pricing` | ⚠️ | ✅ | One $40/hr line on a long page sets the wrong expectation; parents scroll past expecting more |
| `/contact-us` | ✅ | ✅ | Phone card should have larger touch target — currently relies on the linked text |
| `/book-assessment` | ✅ | ✅ | Form long; no progress indicator |
| `/about` | ⚠️ | ✅ | Illustrated portraits look more obviously placeholder on mobile (small format, soft edges) |
| `/faq` | ✅ | ✅ | None notable |
| `/reviews` | ✅ | ✅ | Reveal animation on review cards is visible on slow-scroll — minor flicker |
| `/locations` | ⚠️ | ✅ | Empty space where a map would naturally sit |

**Cross-page mobile observations:**
- No floating sticky CTA on any page — parents on long pages have to scroll back to top to find a booking button
- Mobile nav drawer is clean and functional (verified earlier)
- Hero gradient + breadcrumb + h1 + subhead pattern eats ~60% of the first viewport on every page; consider compressing on mobile only

---

## Cedar's new build vs the legacy WordPress site

The implicit question behind the rebuild: was it worth doing this from scratch instead of staying on WordPress? Honest comparison from the visitor's perspective only:

| Dimension | Old WordPress site | Current build | Winner |
|---|---|---|---|
| **Mobile experience** | Theme-default responsive, often inconsistent | Tailored mobile layouts, audited per page | New |
| **Booking flow** | Likely a Calendly plugin embedded in a page | Native Calendly embed with proper container sizing (after fixes) | Tie (same end result) |
| **Trust signals on home** | Reviews via plugin | Real review excerpts + 5.0 stat tile + Google source attribution | New |
| **Plans / pricing clarity** | Often a long blog-styled page | Currently weakest page on the new site (no comparison) | Old (probably) |
| **Page speed (perceived)** | Plugin-heavy WP can feel slow | Static export, fast load | New |
| **Navigation** | Theme nav, often verbose | Cleaner but still cramped (8 items) | Slight new |
| **Editing cadence** | WordPress admin — anyone can edit | Markdown files + git deploy | Old (for non-developer editors) |
| **Premium aesthetic** | Theme-bound, hard to elevate | Headroom to feel premium, not yet there | New (potential) |
| **Plugins (Google reviews / forms / calendars)** | Drag-and-drop plugins | Custom-built or absent | Old |
| **Long-term maintenance** | WP updates / plugin compatibility | Static site, near-zero ongoing maintenance | New |

**Net:** The new build wins on speed, mobile, aesthetic ceiling, and maintenance. WordPress wins on editing convenience and plugin breadth. For a site updated rarely (which the founder confirmed earlier this session), the new build is the right choice — but the *premium ceiling* it unlocks is only realized once the P0 list ships. Right now the new site is roughly tied with what a well-themed WordPress site would deliver. After P0, it should clearly surpass it.

---

## Production-ready answer

> **Is the site production-ready? Launch-ready, yes. Premium-ready, not yet.**

The site can go live tomorrow without embarrassment. Trust signals are real, the booking system works, mobile is fine, SEO scaffolding is in place. But "premium-ready" — *deliberate aesthetic, real photography, unified voice, internally consistent facts* — requires the P0 list above.

The single most urgent change is **resolving the Asmah/Amina founder contradiction** (top callout). Until that's resolved, every cosmetic improvement is built on a credibility crack.

The single highest-leverage *positive* change is **commissioning a 2-hour photographer session** with the shot list above. It moves the site from "convincingly designed website" to "this is a real local place run by real people." For a tutoring business, that's the entire ballgame.
