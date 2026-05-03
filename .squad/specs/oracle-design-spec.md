# Oracle — Design System Spec

> **Project:** Cedar Tutoring Academy Website Rebuild
> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-05-02
> **For:** Oracle (UX/Design Lead)
> **Skills to reference:** web-design-reviewer, premium-frontend-ui

---

## Brand Analysis (Current Site)

### What to Keep
- **Warmth:** The testimonials convey genuine care. The design should feel warm, not clinical.
- **Blue as brand color:** The current site uses blue extensively. Keep blue as the primary brand color — it conveys trust, professionalism, and calm.
- **Educational identity:** Cedar is a tutoring academy, not a daycare. The design should feel academically credible.

### What to Change
- **Ditch the childcare theme:** The current "Kidzcare" WordPress theme makes Cedar feel like a daycare, not a serious academic partner. Target audience is parents of K-12 students, not toddlers.
- **Remove visual clutter:** The current site has inconsistent spacing, competing visual elements, and template-style decorative flourishes that reduce trust.
- **Upgrade typography:** Move from generic web fonts to a clean, modern type system that conveys professionalism.
- **Replace stock photography:** Current imagery feels generic. Use real center photos where possible, or high-quality diverse education imagery.
- **Simplify color palette:** The current site uses too many competing colors. Establish a restrained, intentional palette.

### Visual Direction Summary
**Mood:** Calm, modern, trust-heavy, academically credible, parent-friendly.
**Not:** Childish, cluttered, template-driven, corporate-cold, or franchise-generic.

Think: the visual confidence of a top private school's website, with the warmth of a caring local business.

---

## Design Token Definitions

### Colors

```css
:root {
  /* Primary — Cedar Blue (hero backgrounds, CTAs, icons, borders) */
  --primary: 199 87% 43%;           /* #0d8ecf — Cedar logo blue */
  --primary-foreground: 0 0% 100%;
  /* ⚠️ CONTRAST: #0d8ecf is 3.48:1 on white — NOT text-safe for normal body text.
     Use as: background (white text on top ✅), icon fills, borders, hero gradients.
     For text on light backgrounds, darken to #0a7ab8 (~4.52:1 on white). */

  /* Secondary — Growth green (success states, checkmarks, credential icons — semantic only) */
  --secondary: 160 50% 40%;         /* #059669 — retained for success/outcome semantics */
  --secondary-foreground: 0 0% 100%;
  /* ✅ Text-safe on white (4.58:1). Use for checkmarks, credential chips, success badges. */

  /* Brand Red — Cedar Red (emphasis badges, featured indicators, brand accents) */
  --brand-red: 358 74% 49%;         /* #d92027 — Cedar logo red/figures */
  --brand-red-foreground: 0 0% 100%;
  /* ⚠️ CONTRAST: #d92027 is ~4.5:1 on white — borderline AA for text. Prefer as background.
     Use for: "Most Popular" badges, program card accent stripes, emphasis CTA elements.
     NOT a semantic error/destructive color — do not use for form error states. */

  /* Accent — Cedar Orange (highlights, badges, Proof Bar, attention — decoration only) */
  --accent: 38 97% 57%;             /* #ffa725 — Cedar logo orange/swoosh */
  --accent-foreground: 0 0% 10%;
  /* ❌ NOT text-safe on any light background (~2.x:1). Background/decoration only. */

  /* Neutral backgrounds */
  --background: 0 0% 100%;          /* White */
  --foreground: 222 47% 11%;        /* Near-black for text */
  --muted: 210 40% 96%;             /* Light gray sections */
  --muted-foreground: 215 16% 47%;  /* Gray text */

  /* Borders & cards */
  --border: 214 32% 91%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;

  /* Semantic */
  --destructive: 0 84% 60%;         /* Error red — form validation errors ONLY */
  --success: 142 71% 45%;           /* Success green */
  --warning: 38 92% 50%;            /* Warning amber */

  /* Ring/focus */
  --ring: 199 87% 43%;              /* Matches primary (Cedar Blue) */
}
```

**Guidance:** These tokens represent Cedar's actual brand palette. The key constraints:
- Primary (Cedar Blue) is for backgrounds and UI elements — **not text on light backgrounds**
- Secondary (green) is semantic only — success states, checkmarks, growth indicators
- Brand Red is for brand emphasis — featured badges, accent elements, NOT form errors
- Accent (Cedar Orange) is decoration-only — never text on light backgrounds
- The palette should feel restrained — no more than 3 dominant colors on any page

### Color-Usage Matrix (AA-Safe Pairings)

Every color must have documented safe usage. **Do not use a pairing not listed here for text.**

| Color | Hex | On White | On Muted (#F3F4F6) | Usage Rules |
|-------|-----|----------|---------------------|-------------|
| **Primary (Cedar Blue)** | `#0d8ecf` | ❌ 3.48:1 (NOT text-safe) | ❌ | **Background use only** for text contexts. CTA backgrounds (white text on top ✅), icon fills, borders, focus rings, hero gradients. **Never** as text color on light backgrounds. |
| **Primary (text-safe variant)** | `#0a7ab8` | ✅ 4.52:1 | ✅ 4.21:1 (large text/icons only) | Use ONLY when Cedar Blue must appear as text on light backgrounds (links in body text, active nav states). Not the default — prefer primary as background. |
| **Primary Foreground** | `#FFFFFF` | — | — | White text ON primary (#0d8ecf) backgrounds. ~4.7:1. ✅ |
| **Secondary (Semantic Green)** | `#059669` | ✅ 4.58:1 | ✅ 4.26:1 (large text/icons only) | Success badges, credential icons, feature checkmarks, growth indicators. Body text: white bg only. Icons/large text: white or muted. **Semantic use only — not decorative.** |
| **Brand Red (Cedar Red)** | `#d92027` | ✅ ~4.5:1 (borderline) | ✅ (large text/icons only) | "Most Popular" badges, program card accent stripes, emphasis brand elements. Prefer as background (white text on top). **NOT for form errors — use `--destructive` for that.** |
| **Accent (Cedar Orange)** | `#ffa725` | ❌ ~2.3:1 (NOT text-safe) | ❌ | **Background/decoration only:** Proof Bar background, star fill, highlight badges (with dark `--accent-foreground` text), borders. Never for text on light backgrounds. |
| **Accent Foreground** | `#1A1A1A` | — | — | Dark text rendered ON cedar orange backgrounds. |
| **Foreground** | `#1E293B` | ✅ 12.6:1 | ✅ 11.7:1 | Primary body text, headings. Safe everywhere on light backgrounds. |
| **Muted Foreground** | `#4B5563` | ✅ 7.45:1 | ✅ 5.91:1 | Secondary text, captions, metadata. |
| **Destructive** | `#DC2626` | ✅ 4.63:1 | ✅ 4.31:1 (large text only) | Form error text/icons on white. Error states only. |
| **Success** | `#16A34A` | ✅ 4.52:1 | — (white only) | Success text/icons on white. |
| **Warning** | `#F59E0B` | ❌ | ❌ | Background-only. Pair with dark foreground text. |

**Rules:**
1. **Never** use `--primary` (#0d8ecf) as text on white or muted backgrounds — contrast fails AA (3.48:1). Use the text-safe variant `#0a7ab8` for Cedar Blue text.
2. **Never** use `--accent` (#ffa725) or `--warning` as text on any light background.
3. `--brand-red` (#d92027) is borderline AA on white. Prefer as background (with white text). If used as text, white background only.
4. `--brand-red` is a **brand emphasis token**, not a semantic error token. Never use it for form validation errors — that is `--destructive`.
5. `--secondary` (#059669) is **semantic only** (success, checkmarks, credentials). Do not use it for decorative elements or brand accents.
6. Muted foreground was darkened to `#4B5563` to clear AA on muted backgrounds (was `#6B7280`, only 4.39:1 on muted).
7. All icon-only or large-text usage still requires 3:1 minimum.

### Typography

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Newsreader', 'Georgia', serif; /* Warm, academically credible display face */
}
```

**Display font recommendation:** Use **Newsreader** (Google Fonts, variable, free) for `heading-1` and `heading-2` — page heroes and section headings. It adds academic warmth and distinction without feeling stuffy. Inter remains the workhorse for body, labels, navigation, and UI. Alternative options: Fraunces (more playful), Lora (safe/classic), or Source Serif 4 (neutral serif). Oracle to make the final call, but the spec now requires a distinct display face — Inter-for-everything is not approved.

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `heading-1` | 3rem (48px) | 800 | 1.1 | Page heroes |
| `heading-2` | 2.25rem (36px) | 700 | 1.2 | Section headings |
| `heading-3` | 1.5rem (24px) | 600 | 1.3 | Card headings, subsections |
| `heading-4` | 1.25rem (20px) | 600 | 1.4 | Small headings |
| `body-lg` | 1.125rem (18px) | 400 | 1.6 | Hero subtitles, lead text |
| `body` | 1rem (16px) | 400 | 1.6 | Standard body text |
| `body-sm` | 0.875rem (14px) | 400 | 1.5 | Captions, metadata |
| `label` | 0.75rem (12px) | 600 | 1.4 | Eyebrow tags, badges |

**Mobile scaling:** Headings scale down ~25% at `< md` breakpoint. Body text stays consistent.

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `section-y` | 64px (md: 96px) | Vertical padding between page sections |
| `section-gap` | 48px (md: 64px) | Gap between section heading and content |
| `card-padding` | 24px (md: 32px) | Internal card padding |
| `stack-sm` | 8px | Small element spacing |
| `stack-md` | 16px | Medium element spacing |
| `stack-lg` | 24px | Large element spacing |
| `container-x` | 16px (md: 24px, lg: 32px) | Horizontal page padding |
| `container-max` | 1280px | Maximum content width |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card resting state |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Card hover state |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Elevated elements (modals, dropdowns) |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Buttons, badges |
| `radius-md` | 8px | Input fields |
| `radius-lg` | 12px | Cards |
| `radius-xl` | 16px | Large cards, hero sections |
| `radius-full` | 9999px | Avatars, pills |

### Breakpoints

| Token | Value |
|-------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## Component Visual Specs

### Navigation Bar
- **Height:** 64px (desktop), 56px (mobile)
- **Background:** White with subtle bottom border (`border-b border-border`)
- **Sticky:** Yes, with slight shadow on scroll
- **Logo:** Left-aligned, ~40px height
- **Nav links:** Center-aligned, `body` size, `foreground` color, `primary` on hover/active
- **CTA button:** Right-aligned, `primary` filled, `radius-sm`, stands out from nav links
- **Mobile:** Hamburger icon right, opens full-height drawer

### Hero Section
- **Height:** 500px (desktop), 400px (mobile)
- **Primary pattern (default):** Split-layout — content left (60%), subtle gradient/pattern right (40%). Use this for homepage and main hubs.
- **Secondary pattern (service pages):** Shorter hero (350px), solid muted background or subtle geometric pattern, no image. Use for interior pages.
- **Background:** Gradient overlay on image (dark-to-transparent from left) ensuring text readability. Minimum overlay opacity: 60% over any image.
- **Approved hero gradient:** `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]` — Cedar Blue family, warm sky tone. Replaces previous dark fintech gradient (#062a40 → #0a4a6e). Interior pages may use a more muted version: `from-[#0a5a8a] to-[#0d8ecf]`.
- **Headline:** `heading-1` (display font), white text (✅ on Cedar Blue gradient, high contrast), max 2 lines
- **Subtitle:** `body-lg`, `white/80`, max 3 lines
- **CTAs:** Primary + Outlined buttons, side-by-side at desktop, stacked at mobile
- **Decorative orbs:** Blurred gradient orbs (`pointer-events-none absolute`, `blur-3xl opacity-20`) add visual depth. Homepage: 2-3 orbs at `sm:block` (hidden on mobile for performance). Interior pages: 1-2 smaller orbs. Color: use Cedar Blue and Cedar Orange for orb gradients.
- **Feel:** Warm, inviting, academically confident — not dark/corporate. Cedar is a caring local tutoring center.
- **Do not:** Use the old dark fintech gradient (#062a40). Mix split-layout and full-overlay patterns. Show decorative orbs on mobile (performance + clutter).

### Program Cards
- **Layout:** Vertical card with icon top, title, 2-line description, arrow/link indicator
- **Background:** `card` with `shadow-sm`, `radius-lg`
- **Hover:** Lift (`translateY(-2px)`) + `shadow-md`
- **Icon:** 48×48, `primary` color or brand-consistent illustration
- **Grid:** 3 across at desktop, 2 at tablet, 1 at mobile

### Testimonial Cards
- **Layout:** Quote text (regular weight, not italic — italic reduces readability), star rating, author name + relation, optional highlight badge
- **Background:** `muted` background or white with subtle border
- **Radius:** `radius-lg`
- **Quote marks:** Large decorative `"` in `primary` color (subtle, background)
- **Rating:** 5 stars in `accent` (amber) — accent is safe as fill color, not text
- **Author:** `body-sm`, `muted-foreground`
- **Display modes:**
  - **Grid (default for Reviews page and 3+ testimonials):** 2-col at `md`, 3-col at `lg`. More scannable and trustworthy on desktop.
  - **Carousel (for homepage section and space-constrained contexts):** Use Embla via shadcn. 1 visible on mobile, 2 at `md`, 3 at `lg`.
  - **Rule of thumb:** If showing ≥6 testimonials, use grid. If showing 3-5 in a narrow section, use carousel.

### Pricing Cards
- **Layout:** Title, description, feature list, CTA button
- **Highlighted tier:** `primary` border, slightly larger, "Most Popular" badge
- **Features:** Checkmark icons in `secondary` (green) + feature text
- **CTA:** Primary button for highlighted, secondary/outline for others
- **Grid:** 3 across at desktop (if 3 tiers), stacked at mobile

### Form Fields
- **Input:** `radius-md`, `border`, 44px height (touch-friendly), `body` size
- **Focus:** `ring-2 ring-primary` (2px ring in primary color)
- **Error:** Red border + error message below in `destructive` color
- **Label:** `body-sm`, `foreground`, above input with `stack-sm` gap
- **Placeholder:** `muted-foreground`, italic

### Buttons
| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `primary` | `primary-foreground` (white) | none | darken 10% |
| Outlined | transparent | `primary` | `primary` border | fill with primary, text white |
| Ghost | transparent | `muted-foreground` | none | `muted` background |

**Button States (Tailwind tokens):**

| State | Tailwind Classes |
|-------|-----------------|
| Default (Primary) | `bg-primary text-primary-foreground rounded-md px-6 py-3 font-medium text-base` |
| Hover (Primary) | `hover:bg-primary/90` |
| Focus (Primary) | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| Active (Primary) | `active:bg-primary/80 active:scale-[0.98]` |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` |
| Loading | Spinner icon replaces text, `aria-busy="true"`, pointer-events disabled |
| Default (Outlined) | `border-2 border-primary text-primary bg-transparent rounded-md px-6 py-3 font-medium` |
| Hover (Outlined) | `hover:bg-primary hover:text-primary-foreground` |
| Default (Ghost) | `text-muted-foreground bg-transparent rounded-md px-6 py-3 font-medium` |
| Hover (Ghost) | `hover:bg-muted hover:text-foreground` |

- **Padding:** `px-6 py-3` (md), `px-4 py-2` (sm)
- **Radius:** `radius-sm`
- **Font:** `body`, weight 500

### Process Steps
- **Layout:** Horizontal at desktop with connecting line, vertical timeline at mobile
- **Step circle:** 48×48, `primary` background (filled, Cedar Blue), white number — **always filled, never bordered variant**
- **Connecting line:** 2px, `primary/40` color (increased from /20 for visibility)
- **Title:** `heading-4` below circle
- **Description:** `body-sm`, `muted-foreground`
- **Mobile spacing:** `space-y-6` between stacked steps (minimum)

### Card Variants (Shared Spec)

All cards share a base pattern. Variants differ in content and emphasis.

| Variant | Base Classes | Hover Classes | Content |
|---------|------------|---------------|---------|
| **ProgramCard** | `bg-card rounded-xl shadow-sm border border-border p-6` | `hover:shadow-md hover:-translate-y-0.5 transition-all duration-200` | Icon, title, description, grade badge, arrow |
| **TestimonialCard** | `bg-muted rounded-xl p-6` (or `bg-card border border-border`) | No lift (static content) | Quote, stars, author, highlight badge |
| **PricingCard** | `bg-card rounded-xl shadow-sm border border-border p-8` | `hover:shadow-md` | Title, features, CTA |
| **PricingCard (highlighted)** | `bg-card rounded-xl shadow-md border-2 border-primary p-8 relative` | `hover:shadow-lg` | + "Most Popular" badge |
| **LocationCard** | `bg-card rounded-xl shadow-sm border border-border p-6` | — | Map, address, hours, phone |

### Form Field States (Tailwind tokens)

| State | Tailwind Classes |
|-------|-----------------|
| Default | `w-full h-11 rounded-md border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground placeholder:italic` |
| Focus | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-primary` |
| Error | `border-destructive ring-destructive/20 focus-visible:ring-destructive` |
| Disabled | `opacity-50 cursor-not-allowed bg-muted` |
| Label | `text-sm font-medium text-foreground mb-1.5 block` |
| Error message | `text-sm text-destructive mt-1.5 flex items-center gap-1` (with AlertCircle icon) |
| Help text | `text-sm text-muted-foreground mt-1.5` |

### SectionHeading Spec
- **Default classes:** `text-center` or `text-left` based on `alignment` prop
- **Eyebrow tag:** `text-xs font-semibold uppercase tracking-widest text-primary mb-3`
- **Title:** `text-3xl md:text-4xl font-bold tracking-tight text-foreground` (use display font)
- **Subtitle:** `text-lg text-muted-foreground mt-4 max-w-2xl mx-auto` (centered) or `max-w-none` (left)

### PageHero Spec
- **Container:** `relative w-full min-h-[350px] md:min-h-[500px] flex items-center`
- **Overlay:** `absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/20` (over image)
- **Content wrapper:** `relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24`
- **Title:** `text-4xl md:text-5xl lg:text-6xl font-bold text-white` (display font)
- **Subtitle:** `text-lg md:text-xl text-white/80 mt-4 max-w-2xl`
- **Breadcrumbs:** `text-sm text-white/70 mb-4` with `>` separators
- **Decorative orbs (required, hidden on mobile):** 1-2 blurred gradient circles (`absolute pointer-events-none hidden sm:block rounded-full blur-3xl opacity-15`). Interior pages use smaller orbs (300px diameter) vs. homepage (400px). Use Cedar Blue and Cedar Orange as orb gradient colors. This is not optional — a flat hero without orbs is below quality bar.
- **Background gradient:** Use Cedar Blue family — `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]` for full-color heroes. Muted variant: `from-[#0a5a8a] to-[#0d8ecf]` for interior pages.

### BreadcrumbNav Spec
- **Container:** `flex items-center gap-2 text-sm text-muted-foreground`
- **Link:** `hover:text-foreground transition-colors`
- **Separator:** `text-border` (chevron-right icon, 14px)
- **Current page:** `text-foreground font-medium` (not a link)

### ProofBar Spec
- **Container:** `bg-muted py-4 border-y border-border`
- **Inner:** `max-w-7xl mx-auto px-4 flex items-center justify-between gap-6 overflow-x-auto`
- **Item:** `flex items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground min-h-[44px]` ← minimum 44px touch target required on mobile
- **Divider:** `w-px h-6 bg-border hidden md:block`

### Footer Spec
- **Background:** `bg-foreground` (dark) with `text-muted` (light text)
- **Layout:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16`
- **Brand column:** Logo, tagline, phone, email
- **Nav columns:** Programs, Test Prep, Company (About, Reviews, FAQ, Contact)
- **Bottom bar:** `border-t border-white/10 py-6 text-sm text-muted-foreground`

### FAQAccordion Spec
- **Container:** `w-full max-w-3xl mx-auto divide-y divide-border`
- **Trigger:** `flex items-center justify-between w-full py-4 text-left font-medium text-foreground hover:text-primary`
- **Content:** `pb-4 text-muted-foreground leading-relaxed`
- **Icon:** ChevronDown, `transition-transform duration-200 data-[state=open]:rotate-180`

### CTASection Spec (Required on All Final CTAs)

Every page must end with a `CTASection`. This is the conversion moment — it must be visually compelling on every page, not just the homepage.

- **Purpose:** Final conversion call-to-action at the bottom of every page
- **Container:** `relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc] py-16 px-8 md:px-12 text-white` — always use the gradient container
- **Decorative circles:** 2 `absolute pointer-events-none rounded-full opacity-10` circles for depth (one large behind, one medium offset)
- **Heading:** `text-3xl md:text-4xl font-bold text-white` (display font), max 2 lines
- **Subtext:** `text-lg text-white/80 mt-4 max-w-xl`
- **Primary CTA button:** Filled white button with Cedar Blue text (`bg-white text-primary hover:bg-white/90`)
- **Secondary CTA:** Phone number link in ghost style (`text-white/80 hover:text-white`)
- **Trust bullets (optional):** 2-4 brief reassurance items with checkmark icons (`✓ text-white/70 text-sm`)
- **Layout:** `flex flex-col md:flex-row items-center justify-between gap-8`
- **This pattern is mandatory.** A plain white background with a single button does not meet the quality bar for this site.

### Tutor/Staff Credibility Card (New)
- **Purpose:** Show tutor qualifications to build trust on About page and optionally Homepage
- **Layout:** Card with photo (rounded, 80×80), name, title/role, qualification chips (e.g., "Certified Teacher", "M.Ed.", "5+ Years")
- **Chips:** `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary`
- **Grid:** 2-col at `md`, 3-col at `lg`

### Form Reassurance Panel (New)
- **Purpose:** Reduce anxiety next to conversion forms (assessment, contact)
- **Placement:** Sidebar (desktop) or above-form strip (mobile) on `/book-assessment` and contact sections
- **Content items (icon + text):**
  - 🕐 "We respond within 24 hours"
  - 🔒 "Your information is private and secure"
  - ✅ "No obligation — just a free assessment"
  - 📞 "Prefer to call? (555) 123-4567"
- **Style:** `bg-muted rounded-xl p-6 space-y-4`, each item: `flex items-start gap-3 text-sm text-muted-foreground`

### Center/Facility Photo Band (New)
- **Purpose:** Make the business feel real and tangible
- **Placement:** About page, optionally Locations page
- **Layout:** Full-bleed image band (or 2-3 image grid) of the actual center, classrooms, entrance
- **Overlay:** Optional subtle gradient with a quote or tagline
- **Height:** 300px (mobile), 400px (desktop)
- **Fallback:** If no real photos yet, use a muted background with an illustrated pattern and a note that real photos are planned

---

## Page Layout Wireframe Descriptions

### Homepage Flow (top to bottom)

1. **Hero** — Full-width, gradient-over-image. Headline left, possibly a soft illustration/image right. Two CTAs.
2. **Proof Bar** — Narrow strip, `muted` background, 5-6 trust metrics in a row with icons.
3. **Programs Section** — White background. Section heading "Academic Programs" + 6 program cards in 3×2 grid.
4. **How It Works** — `muted` background. 4-step horizontal process with connecting lines.
5. **Why Cedar** — White background. 4 differentiator blocks (icon + heading + text) in 2×2 grid.
6. **Testimonials** — `muted` background. Carousel of testimonial cards. Google review badge.
7. **Final CTA** — `primary` background (dark blue). White text. Heading + button. High contrast, stands out.

**Visual rhythm:** Alternate between white and `muted` backgrounds to create natural section separation without heavy borders.

### Service Page Flow

1. **Hero** — Shorter than homepage (350px). Breadcrumbs above. Page title + subtitle. No image needed (or subtle background pattern).
2. **Problem Section** — White. "Does your child struggle with...?" Parent pain points in a scannable list.
3. **Approach Section** — `muted`. How Cedar teaches this subject. 3 key methods.
4. **Process** — White. 4-step ProcessSteps component.
5. **Outcomes** — `muted`. "What parents can expect" — icon + text list.
6. **Testimonials** — White. 2-3 relevant testimonials.
7. **FAQ** — `muted`. Accordion with 4-6 questions.
8. **Related Programs** — White. 2-3 ProgramCards.
9. **CTA** — `primary` background. "Book a [Subject] Assessment."

### About Page Flow

1. **Hero** — Secondary pattern (short, muted background). "Why Cedar" heading.
2. **Mission** — White. Mission statement, brand story, founding context.
3. **Approach** — `muted`. Teaching philosophy, 3-4 differentiator blocks (icon + heading + text).
4. **Staff Credibility** — White. Tutor/Staff Credibility Cards (2-3 featured tutors with qualification chips).
5. **Center Photo Band** — Full-bleed facility photos.
6. **Trust Signals** — `muted`. Safety, credentials, care-based positioning (shield icons + text).
7. **Testimonials** — White. 3-4 curated testimonials in grid.
8. **CTA** — `primary` background. "See Our Programs" or "Book Assessment".

### Reviews Page Flow

1. **Hero** — Secondary pattern. "What Parents Say" heading.
2. **Rating Overview** — White. Large aggregate display: "5.0" + 5 stars + "122+ reviews" + Google badge.
3. **Testimonials Grid** — `muted`. Full grid of testimonial cards, 3-col at `lg`. Paginated or show-more (not carousel here).
4. **CTA** — `primary` background. "Ready to join these families?"

### FAQ Page Flow

1. **Hero** — Secondary pattern. "Frequently Asked Questions".
2. **Category Tabs** — White. Horizontal tab bar: Programs | Logistics | Pricing | Enrollment.
3. **FAQ Accordion** — Accordion groups per selected category.
4. **CTA** — `muted`. "Still have questions? Contact us" with phone + email.

### Pricing Page Flow

1. **Hero** — Secondary pattern. "Plans & Pricing" heading.
2. **How It Works** — White. Brief explainer: "Every plan starts with a free assessment."
3. **Plan Comparison** — `muted`. PricingCard grid (layout assumes 2-3 tiers, but should flex to whatever Cedar offers).
4. **What's Included** — White. Checkmark list of inclusions across all plans.
5. **FAQ** — `muted`. Pricing-specific accordion.
6. **CTA** — `primary` background. "Book Free Assessment — We'll Recommend a Plan".

### Locations Page Flow

1. **Hero** — Secondary pattern. "Our Location" heading.
2. **Location Details** — White. LocationCard with static map image (links to Google Maps), address, hours, phone, service area.
3. **Center Photo Band** — Facility photos (reuse Center/Facility Photo Band module).
4. **What to Expect** — `muted`. First visit info, parking, drop-off instructions.
5. **Transportation** — White. Brief + link to full Transportation page.
6. **CTA** — `primary` background. "Book a Visit" or "Book Assessment".

### Transportation Page Flow

1. **Hero** — Secondary pattern. "Free Transportation" heading.
2. **Overview** — White. Free within service radius, how it works.
3. **Process** — `muted`. Pickup/drop-off procedure, timing, safety.
4. **Service Area** — White. Static map image or list of areas served.
5. **Safety** — `muted`. Adult supervision, procedures, parent communication.
6. **FAQ** — White. Transportation-specific accordion.
7. **CTA** — `primary` background.

### Book Assessment Page Flow

1. **Hero** — Secondary pattern. "Book Your Free Assessment" heading, supportive subtitle.
2. **Form + Reassurance** — White. Two-column at desktop: AssessmentForm (left, 60%), Form Reassurance Panel (right, 40%). Stacked on mobile (reassurance above form).
3. **What Happens Next** — `muted`. 3-step process after form submission (icons + text).
4. **Contact Alternative** — White. Phone + email for those who prefer calling.

---

## Additional Design Tokens

### Transitions & Animations

| Token | Value | Usage |
|-------|-------|-------|
| `transition-fast` | `150ms ease` | Hover states, focus rings |
| `transition-base` | `200ms ease` | Card lifts, color changes |
| `transition-slow` | `300ms ease-out` | Mobile nav slide, accordion expand |
| `transition-reveal` | `600ms ease-out` | Scroll-reveal animations |

### Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | `0` | Default stacking |
| `z-raised` | `10` | Cards on hover |
| `z-dropdown` | `20` | Nav dropdowns |
| `z-sticky` | `30` | Sticky header |
| `z-overlay` | `40` | Backdrop/scrim |
| `z-modal` | `50` | Mobile nav drawer, dialogs |

### Overlay / Scrim

| Token | Value | Usage |
|-------|-------|-------|
| `scrim-light` | `rgba(0,0,0,0.3)` | Backdrop behind mobile nav |
| `scrim-dark` | `rgba(0,0,0,0.6)` | Backdrop behind dialogs |
| `hero-overlay` | `linear-gradient(to right, rgba(30,41,59,0.7), rgba(30,41,59,0.2))` | Hero image overlay |

### Content Width Constraints

| Token | Value | Usage |
|-------|-------|-------|
| `max-w-prose` | `65ch` | Paragraph text max-width |
| `max-w-hero-copy` | `640px` | Hero headline/subtitle |
| `max-w-section-heading` | `720px` | Section heading + subtitle |
| `container-max` | `1280px` | Page content max-width |

---

## Trust-Building Visual Elements

### Review Badge
- Floating or inline component showing: Google logo + "5.0" + 5 stars + "122+ reviews"
- Links to Google Business page
- Used in: ProofBar, Reviews page, Footer

### Credentials Display
- Section or badge showing: "Certified Teachers", "Background Checked", "First Aid Trained"
- Use shield/badge icons in `secondary` (green) color
- Placement: About page, Footer, occasionally in hero support

### Safety Indicators
- Icon-based strip: "Safe Drop-off", "Background Checked Staff", "Small Groups", "Parent Communication"
- Used on: Transportation page, About page, homepage

### Progress Tracking Visual
- Simple graphic showing: assessment → growth → results
- Communicates that Cedar measures and reports progress
- Used on: Homepage "How It Works", About page

### Star Ratings
- Always use `accent` (amber) filled stars
- Show numerical rating alongside (e.g., "5.0 ★★★★★")
- Consistent sizing across all instances

---

## Photography & Imagery Direction

### Preferred Imagery
- **Real photos first:** Center facility, tutoring sessions (with permission), happy students working
- **Diverse representation:** Families of different backgrounds (Cedar serves a diverse community)
- **Warm lighting:** Natural, warm tones — not harsh fluorescent or overly staged
- **Action shots:** Tutors working with students, not posed headshots
- **Age-appropriate:** Show K-12 range, not just young children

### What to Avoid
- Generic stock photos of smiling faces with no context
- Overly corporate/sterile imagery
- Childcare/daycare-style imagery (playground, finger painting)
- Any imagery that feels template-purchased

### If Real Photos Unavailable
- Use high-quality illustrations (consistent style) for program icons
- Use abstract geometric patterns for hero backgrounds
- Use solid color + typography for OG images
- Plan a photo shoot for Phase 1.5

---

## Accessibility Visual Requirements

### Contrast Ratios
- **Normal text (< 18px):** Minimum 4.5:1 against background
- **Large text (≥ 18px bold or ≥ 24px):** Minimum 3:1
- **UI components and graphics:** Minimum 3:1 against adjacent colors
- **Test all color combinations** before finalizing palette

### Focus States
- All interactive elements must have visible focus indicators
- Use `ring-2 ring-primary ring-offset-2` pattern (2px ring with 2px offset)
- Focus must be visible in both light and dark contexts
- Never use `outline: none` without providing an alternative

### Touch Targets
- Minimum 44×44px for all interactive elements on mobile
- Buttons: minimum height 44px with adequate padding
- Links in text: adequate spacing between multiple links
- Form inputs: 44px minimum height

### Motion
- Respect `prefers-reduced-motion` media query
- All animations should be disabled or simplified when reduced motion is preferred
- No content should depend on animation to be understood

### Color Independence
- Never convey information by color alone
- Error states: red color + icon + text message
- Success states: green color + icon + text message
- Links: color + underline (or other visual indicator beyond color)

---

## Key Design Principles

1. **Trust over flash.** Every design choice should make Cedar feel more credible. Avoid gimmicks.
2. **Clarity over decoration.** White space is a feature. Let content breathe.
3. **Consistency over variety.** Use the same patterns repeatedly. Parents should feel oriented on every page.
4. **Warmth over coldness.** Cedar is a caring local business. The design should feel approachable and human.
5. **Scannable over dense.** Parents are busy. They scan, they don't read. Design for scanning.
6. **Conversion over browsing.** Every page should move the parent one step closer to booking.

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-05-02 | 1.0 | Initial design system spec |
| 2026-05-02 | 1.1 | **Post-review updates:** Added AA-safe color-usage matrix with corrected contrast ratios (darkened secondary to `#059669`, muted-foreground to `#4B5563`, success to `#16A34A`; documented accent as background-only). Added Newsreader display font recommendation. Clarified hero as two distinct patterns (split-layout for hubs, short/muted for interior). Changed testimonial quote text to regular weight (not italic). Added testimonial grid vs carousel usage rules. Added button state tokens with full Tailwind classes (hover, focus, active, disabled, loading). Added card variant table. Added form field state tokens. Added component specs for SectionHeading, PageHero, BreadcrumbNav, ProofBar, Footer, FAQAccordion. Added Tutor/Staff Credibility Card module. Added Form Reassurance Panel module. Added Center/Facility Photo Band module. Added page layout flows for About, Reviews, FAQ, Pricing, Locations, Transportation, Book Assessment. Added transition/animation tokens, z-index scale, overlay/scrim tokens, content-width constraints. Aligned button variants with Trinity spec (renamed secondary → outlined). |
| 2026-05-03 | 1.2 | **Brand color alignment + UX review updates (Morpheus Architecture Review):** Updated `--primary` from #2563eb to Cedar Blue (#0d8ecf, `hsl(199 87% 43%)`). Updated `--accent` from #f59e0b to Cedar Orange (#ffa725, `hsl(38 97% 57%)`). Added `--brand-red` token for Cedar Red (#d92027, `hsl(358 74% 49%)`). Retained `--secondary` green (#059669) for semantic success/outcome states. Rewrote color-usage matrix to reflect Cedar palette; documented Cedar Blue as NOT text-safe on white (3.48:1); added text-safe variant #0a7ab8 (4.52:1); added Brand Red row. Updated hero section guidance: replaced dark fintech gradient with Cedar Blue family gradient; made decorative orbs required on all heroes (scaled by context); added interior-page orb spec. Updated PageHero spec with decorative orb requirements and Cedar Blue gradient values. Added CTASection module spec (mandatory gradient-container pattern for all final CTAs). Updated ProofBar spec: added `min-h-[44px]` touch target requirement. Updated ProcessSteps spec: filled circles canonical (never bordered); connecting line opacity `primary/40`; mobile spacing `space-y-6`. |
