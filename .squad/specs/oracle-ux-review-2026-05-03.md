# Oracle — UX/Design Review

> **Date:** 2026-05-03  
> **Reviewer:** Oracle (UX/Design Lead)  
> **Skills applied:** web-design-reviewer, premium-frontend-ui, penpot-uiux-design

---

## Executive Summary

The Cedar Tutoring Academy website rebuild is a **significant improvement** over the original WordPress site — it feels modern, professional, and conversion-focused. The homepage, in particular, demonstrates strong visual hierarchy, thoughtful section rhythm, and polished motion elements. However, there's a **critical brand color misalignment**: the site uses a design-system palette (#2563eb blue, #059669 green) rather than Cedar's actual extracted logo colors (#0d8ecf sky blue, #d92027 red, #ffa725 orange). The biggest opportunities are: (1) aligning to true Cedar brand colors, (2) bringing more of the homepage's visual polish to interior pages, and (3) elevating the mobile experience from "good" to "delightful."

---

## Color Palette Assessment

### Current Implementation vs. Cedar Brand Colors

| Color Role | Current CSS Value | Cedar Logo Color | Status |
|------------|------------------|------------------|--------|
| **Primary** | `#2563eb` (Tailwind Blue 600) | `#0d8ecf` (Sky Blue) | ❌ **Mismatch** |
| **Secondary** | `#059669` (Green/Emerald) | `#d92027` (Cedar Red) | ❌ **Completely different** |
| **Accent** | `#f59e0b` (Amber) | `#ffa725` (Cedar Orange) | ⚠️ Close but not exact |

### Assessment

**🔴 Critical Issue: The site does not use Cedar's actual brand colors.**

The original design spec (oracle-design-spec v1.1) defined a generic "trust blue + growth green + warm amber" palette inspired by education industry conventions. However, the owner specifically requested that the **actual logo colors** from cedartutoring.com be used:

- **Cedar Blue (#0d8ecf):** A lighter, friendlier sky blue — should be the primary color
- **Cedar Red (#d92027):** From the logo figures — entirely absent from current implementation
- **Cedar Orange (#ffa725):** From the logo swoosh/ACADEMY text — close but not identical

### Balance & Saturation

- **Too much gradient-heavy teal/dark blue** in heroes — feels more corporate tech than friendly education
- **Good use of orange** in the Proof Bar — this is the most on-brand section currently
- **No red anywhere** — losing a key brand differentiator
- **White space balance is good** — sections breathe, not too cluttered, not too sparse
- **Alternating white/muted backgrounds** work well for visual rhythm

### WCAG Contrast Compliance

| Current Pairing | Contrast Ratio | Status |
|-----------------|---------------|--------|
| Primary (#2563eb) on white | 5.17:1 | ✅ AA Pass |
| Muted foreground (#4b5563) on muted (#f3f4f6) | 5.91:1 | ✅ AA Pass |
| White text on gradient hero | ~8-12:1 | ✅ Excellent |
| Accent (#f59e0b) as fill | N/A (not text) | ✅ Appropriate use |

**Note:** If switching to Cedar Blue (#0d8ecf), new contrast checks needed — this lighter blue will have lower contrast on white (~3.48:1), so it may need to be used primarily on dark backgrounds or with adjusted variants.

---

## Desktop Review (1440px)

### Homepage

#### Hero Section
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- **Visual Hierarchy:** Excellent. Clear headline, supporting subtitle, dual CTAs, and stat cards create a compelling above-the-fold experience.
- **Typography:** The display font (`font-heading`) creates distinction. The underline accent on "personal" is a nice touch.
- **Spacing:** Generous padding (`pt-14 pb-12 sm:py-24 md:py-28 lg:py-36`) feels premium.
- **Decorative Elements:** The blurred gradient orbs and subtle ring shapes add depth without distraction — this is premium-frontend-ui craftsmanship.
- **Color:** The gradient (#062a40 → #0a4a6e → primary) is well-executed but **not Cedar's brand blue**. It feels more like a fintech gradient than an education center.

**Improvements:**
- Shift gradient to use Cedar Blue (#0d8ecf) as the dominant color
- Consider a warmer, friendlier gradient that incorporates subtle orange or keeps things lighter

#### Proof Bar
**Rating: ⭐⭐⭐⭐⭐ (5/5)**

- Uses accent orange (`bg-accent`) as background — **the most on-brand section**
- Horizontal scroll on mobile with pill styling is smart
- Icons and labels are scannable
- This section demonstrates proper brand color usage

#### Programs Section
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- **Cards:** Clean design with gradient top bar, icon, grade badge, and outcome preview
- **Grid:** Responsive 3-col at lg, 2-col at md, 1-col at sm
- **Hover States:** Subtle lift + shadow feels appropriate
- **Typography:** Clear hierarchy within cards

**Improvements:**
- The gradient bar (primary → secondary → accent) could be simplified — three colors feels busy
- Consider using Cedar Orange or Cedar Red as accent elements on cards

#### How It Works Section
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Light blue tint (`bg-primary/5`) creates nice section differentiation
- Numbered step circles are visually strong
- Connecting line on desktop adds flow
- Cards have good hover interaction

**Improvements:**
- The connecting line could be more visible (currently `primary/20` is very subtle)
- Consider using Cedar Orange for the small accent bars at card bottoms

#### Why Cedar Section
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- **Layout:** 2x2 grid with alternating stripe colors (primary/secondary) is effective
- **Content:** Features with checkmarks communicate value well
- **Visual Balance:** Good use of icons and text hierarchy

**Improvements:**
- The secondary green stripes should be Cedar Red or a Cedar Blue variant
- Could benefit from slightly more visual interest (the cards feel plain compared to Programs cards)

#### Testimonials Section
**Rating: ⭐⭐⭐⭐⭐ (5/5)**

- **Dark background** creates excellent contrast and visual break
- **Gradient accent line** at card top adds polish
- **Star ratings** use accent orange — appropriate
- **Avatar initials** with gradient background feel personal
- **Mobile snap-scroll** is well-implemented

This section demonstrates the visual polish the entire site should aspire to.

#### Final CTA Section
**Rating: ⭐⭐⭐⭐⭐ (5/5)**

- **Gradient container** stands out from surrounding content
- **Decorative circles** add depth
- **Dual CTAs** (primary + phone) offer conversion flexibility
- **Trust bullets** with checkmarks reduce friction

---

### Programs Hub

#### PageHero
**Rating: ⭐⭐⭐☆☆ (3/5)**

- Uses the same gradient as homepage hero — consistent but lacks the decorative polish
- No blurred orbs, no subtle rings — feels flat compared to homepage
- Breadcrumbs are subtle and appropriate

**Improvements:**
- Add some of the decorative elements from homepage hero
- Consider a shorter hero height here since there's no imagery

#### Programs Grid
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Clean card design with hover state showing bottom gradient bar
- Good use of primary/secondary gradient on hover
- Icons and grade badges are clear

**Improvements:**
- The hover gradient could incorporate Cedar Orange
- Consider a subtle background pattern or tint to avoid "plain white page" feeling

#### Why Cedar Section
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Good content cards with clear hierarchy
- Light muted background creates section break

#### CTA Section
**Rating: ⭐⭐⭐☆☆ (3/5)**

- Functional but plain compared to homepage CTA
- Just a heading, text, and button on white background
- Lacks the visual confidence of the homepage final CTA

**Improvements:**
- Apply the gradient container treatment from homepage CTA
- Add trust bullets or reassurance elements

---

### Program Detail Page (Reading)

#### Content Flow
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Good section alternation (white → muted → white → muted)
- Problem/Approach/Process/Outcomes flow is logical
- FAQ accordion is clean and accessible

#### Process Steps
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Horizontal layout at desktop with connecting line works well
- Step numbers are visually clear

**Improvements:**
- The step circles feel lighter/thinner than homepage (border vs filled) — inconsistent
- Consider matching the homepage step card style

#### Testimonials
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Clean card layout with stars and author info
- Badge placement is good

**Improvements:**
- These testimonial cards feel different from homepage testimonials (white bg vs dark section) — could use more visual punch

#### Final CTA
**Rating: ⭐⭐⭐☆☆ (3/5)**

- Plain primary button on white — not as compelling as homepage CTA
- Misses opportunity for conversion emphasis

---

## Mobile Review (390px iPhone, 360px Samsung)

### Homepage (Mobile)

#### Hero Section
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Text scales appropriately (`text-[2.125rem]` → responsive)
- Stat cards maintain 3-col layout — compact but readable
- CTAs stack vertically — appropriate
- Decorative elements are hidden at `sm:block` — good performance choice

**Improvements:**
- Headline could be slightly larger on mobile for impact
- The stat card text (11px) is at the readability edge — consider 12px minimum

#### Proof Bar (Mobile)
**Rating: ⭐⭐⭐⭐⭐ (5/5)**

- Horizontal scroll with pill-style items is excellent
- Pills have `bg-black/8` tint for visual separation
- Touch targets are adequate (items are ~40px+ height)

#### Programs Section (Mobile)
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Cards are `max-w-md mx-auto` centered — appropriate
- Single column layout works
- Touch targets are adequate

**Improvements:**
- Some text could benefit from slightly more line-height for mobile readability
- Consider larger "Learn more" links for easier tapping

#### How It Works (Mobile)
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Vertical layout is appropriate
- Cards stack well
- Step numbers remain prominent

**Improvements:**
- Cards could have slightly more spacing between them on mobile

#### Why Cedar (Mobile)
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Cards stack vertically
- Side stripe adapts well
- Checkmark lists remain readable

#### Testimonials (Mobile)
**Rating: ⭐⭐⭐⭐⭐ (5/5)**

- Snap-scroll carousel is perfect for mobile
- `min-w-[85%]` card width shows partial next card — encourages scrolling
- Touch/swipe feels native

#### Final CTA (Mobile)
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Gradient container scales well
- CTAs stack vertically
- Trust bullets in 2-col grid work

**Improvements:**
- Trust bullet icons could be slightly larger on mobile

### Touch Target Compliance

| Element | Measured | Minimum | Status |
|---------|----------|---------|--------|
| Header hamburger button | 44px | 44px | ✅ Pass |
| Mobile nav links | 44px (min-h-11 py-3) | 44px | ✅ Pass |
| Footer links | 44px (min-h-11) | 44px | ✅ Pass |
| CTA buttons | 48px+ | 44px | ✅ Pass |
| Program cards | Full card tappable | 44px | ✅ Pass |
| Proof bar items | ~40px | 44px | ⚠️ Borderline |

---

### Programs Hub (Mobile)
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Cards stack cleanly
- Grade badges are readable
- "Learn more" arrows provide clear affordance

### Program Detail (Mobile)
**Rating: ⭐⭐⭐⭐☆ (4/5)**

- Process steps go vertical — appropriate
- FAQ accordion works well on touch
- Testimonial cards stack

---

## Spec Alignment Check

### Comparing Implementation vs. oracle-design-spec.md

| Spec Item | Implemented | Notes |
|-----------|-------------|-------|
| Colors: Primary #2563eb | ✅ Yes | But should be Cedar Blue #0d8ecf |
| Colors: Secondary #059669 | ✅ Yes | But should be Cedar Red #d92027 |
| Colors: Accent #f59e0b | ✅ Yes | Close to Cedar Orange #ffa725 |
| Typography: Newsreader for headings | ✅ Yes | `font-heading` applied to h1/h2 |
| Typography: Inter for body | ✅ Yes | Via `font-sans` |
| Spacing: Section padding 64-96px | ✅ Yes | `py-14 sm:py-20 md:py-24` |
| Border radius tokens | ✅ Yes | `rounded-xl`, `rounded-2xl` used consistently |
| Shadow tokens | ✅ Yes | `shadow-sm`, `hover:shadow-md` |
| Hero: Split layout pattern | ⚠️ Partial | Homepage is centered, not split 60/40 |
| Hero: 500px desktop height | ⚠️ No | Homepage uses auto height with padding |
| ProofBar | ✅ Yes | Implemented with horizontal scroll |
| ProcessSteps with connecting line | ✅ Yes | Desktop has `lg:block` connecting line |
| Testimonial cards | ✅ Yes | Dark section with gradient accent |
| FAQAccordion | ✅ Yes | Radix-based, clean styling |
| Footer 4-column | ✅ Yes | Dark bg, proper columns |
| Button states (hover, focus, active) | ✅ Yes | All interactive states present |
| Focus rings | ✅ Yes | `focus-visible:ring-2` pattern |
| prefers-reduced-motion | ⚠️ Unknown | Not verified in code review |

### Items NOT Implemented from Spec

1. **Tutor/Staff Credibility Cards** — Not present on any page
2. **Form Reassurance Panel** — Assessment form page not reviewed
3. **Center/Facility Photo Band** — No real photos used
4. **Google Review Badge component** — Only text references to reviews
5. **PricingCard with highlighted tier** — Pricing page not reviewed
6. **LocationCard with static map** — Locations page not reviewed

---

## Findings Summary

### 🟢 What's Working Well

1. **Homepage visual polish** — Decorative blurred orbs, gradient hero, dark testimonial section, and final CTA all demonstrate premium-frontend-ui principles
2. **Section rhythm** — Alternating white/muted backgrounds create clear visual breaks without heavy borders
3. **Typography hierarchy** — Display font (Newsreader) for headings, Inter for body creates appropriate contrast
4. **Mobile adaptations** — Snap-scroll testimonials, horizontal proof bar, vertical step layouts all work well
5. **Card consistency** — Program cards, testimonial cards, and feature cards follow consistent patterns
6. **Hover states** — Lift animations (`hover:-translate-y-1`) and shadow transitions feel polished
7. **Touch targets** — Most interactive elements meet 44px minimum
8. **Footer** — Dark, professional, well-organized with clear CTAs
9. **Proof Bar** — Most on-brand section using Cedar Orange effectively

### 🟡 Recommended Improvements

1. **Align to Cedar brand colors** — Replace current palette with extracted logo colors (#0d8ecf, #d92027, #ffa725)
2. **Bring homepage polish to interior pages** — PageHero on Programs/Detail pages lacks the decorative depth of homepage hero
3. **Interior page CTAs** — Apply the gradient container treatment from homepage to all final CTAs
4. **Process steps consistency** — Homepage uses filled circles, detail page uses bordered circles — unify
5. **Add Cedar Red accents** — The red from the logo isn't used anywhere — add as accent for important elements
6. **Proof Bar touch targets** — Increase mobile item height slightly (currently ~40px, target 44px)
7. **Mobile stat card text** — Increase from 11px to 12px minimum
8. **Add more photography** — Current site is illustration/gradient heavy — real photos would add warmth
9. **Review testimonial card styling** — Consider using dark card treatment from homepage on interior pages

### 🔴 Must-Fix Issues

1. **Brand Color Misalignment** — The site uses #2563eb instead of Cedar Blue #0d8ecf, and completely lacks Cedar Red #d92027. This is the single biggest issue — the site doesn't match the logo.

2. **No Cedar Red (#d92027)** — This brand color is entirely absent. Consider using it for:
   - Accent elements on critical CTAs
   - Badge backgrounds
   - Hover states
   - "Highlighted" tier indicators

3. **Hero gradient feels tech-corporate** — The dark teal (#062a40) to blue gradient feels more like a SaaS product than a friendly tutoring center. Should feel warmer, more inviting.

---

## Recommended Design Changes

### 1. Update Color Palette to Match Cedar Brand

**What:** Replace the current design-system colors with Cedar's actual extracted brand colors.

**Why:** The owner explicitly requested the site use Cedar's logo colors. Current implementation uses generic Tailwind colors that don't match the logo.

**Section:** `globals.css` `:root` variables

**Approach:**
```css
/* Update to Cedar brand colors */
--primary: #0d8ecf;           /* Cedar Blue (sky blue) */
--primary-foreground: #ffffff;

--secondary: #d92027;          /* Cedar Red (from logo figures) */
--secondary-foreground: #ffffff;

--accent: #ffa725;            /* Cedar Orange (from logo swoosh) */
--accent-foreground: #1a1a1a;
```

**Important:** Cedar Blue (#0d8ecf) has lower contrast on white (~3.48:1). Use it primarily as:
- Background colors (with white text)
- Icon fills
- Border accents
- For text on light backgrounds, darken to ~#0a7ab8

### 2. Warm Up Hero Gradients

**What:** Adjust hero gradients to feel friendlier and more aligned with Cedar's brand.

**Why:** Current gradient (#062a40 → #0a4a6e → blue) feels corporate/fintech. Cedar is a warm, caring tutoring center.

**Section:** Homepage hero, PageHero component

**Approach:**
- Use Cedar Blue (#0d8ecf) as the dominant hero color
- Consider a gradient from Cedar Blue to a lighter sky tone
- Or incorporate subtle orange/warm tints
- Example: `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]`

### 3. Add Cedar Red as Accent Color

**What:** Introduce Cedar Red (#d92027) throughout the site as an accent.

**Why:** This is a key brand color from the logo figures that's completely missing.

**Sections:** CTA buttons (alternate variant), highlighted badges, important indicators

**Approach:**
- Create a `destructive` or `emphasis` variant using #d92027
- Use for "Book Now" buttons that need extra emphasis
- Use for "Popular" badges on pricing
- Use sparingly — red draws strong attention

### 4. Bring Homepage Polish to Interior PageHero

**What:** Add decorative elements (blurred orbs, subtle rings) to the PageHero component on interior pages.

**Why:** Homepage hero has beautiful depth; interior pages feel flat in comparison.

**Section:** `PageHero` component

**Approach:**
- Add 1-2 blurred gradient orbs (smaller than homepage)
- Add subtle border circles
- Use `pointer-events-none absolute` positioning
- Maintain shorter height for interior pages

### 5. Unify CTA Section Treatment

**What:** Apply the homepage gradient-container CTA pattern to all final CTA sections.

**Why:** Homepage CTA is compelling and conversion-focused; interior page CTAs are plain.

**Sections:** Programs Hub CTA, Program Detail CTA, all other page final CTAs

**Approach:**
- Wrap CTA content in a `rounded-2xl bg-gradient-to-br` container
- Add decorative circles
- Include trust bullets where appropriate
- Maintain the dual-CTA pattern (primary + phone)

### 6. Increase Mobile Typography Baseline

**What:** Increase minimum text size on mobile from 11px to 12px.

**Why:** 11px text (stat card labels) is at the accessibility edge for readability.

**Section:** Homepage stat cards, any other 11px text

**Approach:**
- Change `text-[11px]` to `text-xs` (12px)
- Verify all mobile body text is at least 14px (text-sm)

### 7. Unify Process Step Styling

**What:** Make homepage and detail page process steps match visually.

**Why:** Homepage uses filled circles with gradient; detail page uses bordered circles. Inconsistent.

**Sections:** Homepage `ProcessSteps`, Program Detail steps

**Approach:**
- Decide on one style (filled gradient is more impactful)
- Apply consistently across all instances

---

## Appendix: Screenshot Reference

Screenshots captured 2026-05-03 at 11:50 AM CDT:

| File | Viewport | Page |
|------|----------|------|
| `desktop-homepage.png` | 1440×900 | Homepage full scroll |
| `desktop-programs-hub.png` | 1440×900 | Programs hub |
| `desktop-program-detail.png` | 1440×900 | Reading program detail |
| `mobile-iphone-homepage.png` | 390×844 | Homepage (iPhone 14) |
| `mobile-iphone-programs-hub.png` | 390×844 | Programs hub |
| `mobile-iphone-program-detail.png` | 390×844 | Reading program detail |
| `mobile-samsung-homepage.png` | 360×800 | Homepage (Samsung Galaxy) |

---

*Review completed by Oracle (UX/Design Lead) on 2026-05-03. This document should be used by Trinity (Frontend) to prioritize design refinements and by the project owner to provide feedback on brand color direction.*
