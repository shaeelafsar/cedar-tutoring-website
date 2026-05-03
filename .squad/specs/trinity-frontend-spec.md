# Trinity — Frontend Implementation Spec

> **Project:** Cedar Tutoring Academy Website Rebuild
> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-05-02
> **For:** Trinity (Senior React Frontend Engineer)
> **Skills to reference:** expert-react-frontend-engineer, premium-frontend-ui, nextjs-tailwind instructions

---

## Overview

You are building a conversion-focused tutoring website for parents. Every component serves one of these goals:
1. **Communicate** — What Cedar offers, who it's for
2. **Prove** — Social proof, results, trust signals
3. **Guide** — Move parents toward booking an assessment
4. **Inform** — Answer logistics questions (location, pricing, schedule)

All pages are Server Components by default. Only add `'use client'` when the component genuinely needs browser APIs, event handlers, or state.

---

## Component Inventory

### Layout Components

#### `Header`
- **Type:** Client Component (mobile menu state)
- **Props:** None (reads nav config from constants)
- **Behavior:** Sticky on scroll. Logo left, nav center, CTA right. Collapses to hamburger at `lg` breakpoint. Active link indicator based on current path.
- **Responsive:** Full nav at `lg+`. Hamburger + Sheet drawer at `< lg`.
- **Children:** Logo, NavLink[], CTAButton, MobileNav

#### `Footer`
- **Type:** Server Component
- **Props:** None
- **Behavior:** 4-column grid: brand column (logo + tagline + contact), navigation columns (Programs, Test Prep, Company), bottom bar (copyright + privacy links).
- **Responsive:** 4 columns at `lg`, 2 at `md`, stacked at `sm`.

#### `MobileNav`
- **Type:** Client Component
- **Props:** `{ isOpen: boolean; onClose: () => void }`
- **Behavior:** Full-height Sheet/Drawer from right. Contains all nav links + CTA. Trap focus when open. Close on route change.
- **Responsive:** Only rendered below `lg` breakpoint.

#### `NavLink`
- **Type:** Client Component (needs `usePathname`)
- **Props:** `{ href: string; label: string; children?: NavLink[] }`
- **Behavior:** Active state styling when current path matches. Dropdown for children on hover (desktop) or accordion (mobile).

---

### Shared Business Components

#### `CTAButton`
- **Type:** Server Component (or Client when used in interactive context)
- **Props:** `{ variant: 'primary' | 'outlined' | 'ghost'; size: 'sm' | 'md' | 'lg'; href: string; children: React.ReactNode; fullWidth?: boolean }`
- **Behavior:** Renders as `<Link>` (internal) or `<a>` (external). Primary = filled brand color, Outlined = primary-colored border + text (was "secondary"), Ghost = no border, muted text. Responsive sizing.
- **Responsive:** `fullWidth` at mobile, inline at desktop.

#### `PageHero`
- **Props:** `{ title: string; subtitle: string; backgroundImage?: string; ctas?: { label: string; href: string; variant: 'primary' | 'outlined' }[]; breadcrumbs?: { label: string; href: string }[]; decorative?: boolean }`
- **Behavior:** Full-width hero section with gradient overlay on image. Title + subtitle + optional CTAs (supports dual CTAs for homepage). Breadcrumbs rendered above title.
- **Background gradient:** Use Cedar Blue family — `from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc]`. Never the old dark fintech gradient.
- **Decorative orbs:** When `decorative={true}` (default), render 1-2 `pointer-events-none absolute hidden sm:block rounded-full blur-3xl opacity-15` orb elements. Homepage uses 2-3 larger orbs (400px); interior pages use 1-2 smaller orbs (300px). Use Cedar Blue + Cedar Orange for orb gradient colors. Set `decorative={false}` only if explicitly needed.
- **Responsive:** Taller at desktop (500px), shorter at mobile (350px). Text size scales down. CTAs side-by-side at desktop, stacked at mobile.

#### `ProofBar`
- **Props:** `{ items: { iconName: string; label: string; value: string }[] }`
- **Behavior:** Horizontal row of trust indicators. Separated by subtle dividers. `iconName` is a Lucide icon name string (resolved at render time, not a component reference — safe for JSON-sourced data). Examples: "5.0 ★ Google Rating", "122+ Reviews", "K-12 Grades", "1:3 Ratio", "Free Transport".
- **Responsive:** Horizontal scroll at mobile, full row at desktop. Alternatively, 2×3 grid at mobile.

#### `TestimonialCard`
- **Props:** `{ quote: string; author: string; relation: string; rating: number; highlight?: string }`
- **Behavior:** Card with quote text, star rating, author name + relation (e.g., "Parent of 3rd grader"). Optional highlight badge (e.g., "Reading Growth").
- **Responsive:** Full-width card on mobile, fixed-width in grid/carousel at desktop.

#### `TestimonialCarousel`
- **Type:** Client Component (interaction)
- **Props:** `{ testimonials: Testimonial[]; autoPlay?: boolean }`
- **Behavior:** Horizontal carousel with dots navigation. Auto-advances every 6s. Pause on hover/focus. Swipe-enabled on touch devices.
- **Implementation:** Use Embla Carousel (via shadcn/ui carousel primitive). Lightweight, accessible, touch-friendly. Do not use heavier alternatives (Swiper, Slick).
- **Responsive:** 1 card visible on mobile, 2 at `md`, 3 at `lg`.

#### `ProgramCard`
- **Props:** `{ title: string; description: string; iconName: string; href: string; grades?: string; tags?: string[] }`
- **Behavior:** Card linking to program detail page. `iconName` is a Lucide icon name string (resolved via a lookup map, not a component reference). Title, 2-line description, grade badge, arrow indicator.
- **Responsive:** Full-width stack on mobile, 2-col at `md`, 3-col at `lg`.

#### `ProcessSteps`
- **Props:** `{ steps: { number: number; title: string; description: string; iconName: string }[] }`
- **Behavior:** Horizontal stepped layout (1 → 2 → 3 → 4) with connecting line. Each step: number badge, icon, title, description.
- **Step circle style:** Always filled — `bg-primary text-white` (Cedar Blue background, white number). **Never** use the bordered/outline variant. Filled circles are the only approved style.
- **Connecting line:** `border-t-2 border-primary/40` — use 40% opacity, not 20% (increase visibility).
- **Mobile spacing:** `space-y-6` between vertically stacked steps.
- **Responsive:** Horizontal at `lg`, vertical timeline at `< lg`.

#### `FAQAccordion`
- **Type:** Client Component (Radix accordion)
- **Props:** `{ items: { question: string; answer: string }[]; defaultOpen?: number }`
- **Behavior:** Single-expand accordion. Smooth height animation. First item optionally open by default.

#### `ReviewStars`
- **Props:** `{ rating: number; max?: number; size?: 'sm' | 'md' | 'lg' }`
- **Behavior:** Renders filled/empty star icons. Supports half-stars via fractional rating.

#### `CTASection`
- **Type:** Server Component
- **Props:** `{ heading: string; subtext?: string; primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string }; trustBullets?: string[] }`
- **Behavior:** Final conversion section at the bottom of every page. Always renders the gradient-container treatment — no exceptions. Heading + subtext + primary CTA button + optional secondary CTA (phone link) + optional trust bullets.
- **Visual spec:** `relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a5a8a] via-[#0d8ecf] to-[#2ea8dc] py-16 px-8 md:px-12 text-white`. Two decorative `absolute pointer-events-none rounded-full opacity-10` circles for depth.
- **Primary button:** `bg-white text-primary font-semibold hover:bg-white/90` (white-filled with Cedar Blue text on the gradient background)
- **Secondary CTA:** Ghost link `text-white/80 hover:text-white` — typically phone number: `tel:` link
- **Trust bullets:** Each is `flex items-center gap-2 text-sm text-white/70` with a CheckCircle icon in `text-white/50`
- **Layout:** `flex flex-col items-center text-center md:text-left md:flex-row md:items-center md:justify-between gap-8`
- **This component is required on all pages.** Do NOT implement per-page ad-hoc CTAs — always use this component.
- **Responsive:** Centered column on mobile, split row on desktop.

#### `LocationCard`
- **Props:** `{ name: string; address: string; phone: string; hours: { label: string; time: string }[]; mapUrl: string; image?: string }`
- **Behavior:** Card with location details + embedded static map image (links to Google Maps). Phone number is a clickable `tel:` link. Hours rendered as a list of day/time rows (structured for display and JSON-LD generation).

#### `PricingCard`
- **Props:** `{ title: string; description: string; features: string[]; cta: { label: string; href: string }; highlighted?: boolean }`
- **Behavior:** Pricing tier card. Highlighted variant has accent border/background. Feature list with checkmarks.

#### `SectionHeading`
- **Props:** `{ title: string; subtitle?: string; alignment?: 'left' | 'center'; tag?: string }`
- **Behavior:** Consistent section heading with optional subtitle and eyebrow tag (e.g., "OUR PROGRAMS"). Anchor ID auto-generated from title.

#### `BreadcrumbNav`
- **Props:** `{ items: { label: string; href: string }[] }`
- **Behavior:** Renders accessible breadcrumb with `aria-label="Breadcrumb"`. Last item is current page (not linked). Structured data via BreadcrumbList schema.

#### `StructuredData`
- **Props:** `{ data: Record<string, unknown> }`
- **Behavior:** Renders `<script type="application/ld+json">` with serialized JSON-LD. Used in layout and page components.

---

### Form Components

#### `AssessmentForm`
- **Type:** Client Component
- **Props:** `{ onSuccess?: () => void }`
- **Fields:**
  | Field | Type | Validation | Required |
  |-------|------|-----------|----------|
  | parentName | text | min 2 chars | Yes |
  | email | email | valid email format | Yes |
  | phone | tel | valid US phone | Yes |
  | studentGrade | select | K-12 options | Yes |
  | subjects | multi-select | at least 1 | Yes |
  | preferredSchedule | select | Morning/Afternoon/Evening/Flexible | No |
  | message | textarea | max 500 chars | No |
- **Behavior:** Single-page form with inline validation. Shows field errors on blur. Submit button disabled until valid. Loading state during submission. Success: show confirmation message + next steps. Error: show retry message.
- **Submission:** POST to `/api/assessment` (see architecture-blueprint.md § Form API Contracts for request/response types)
- **Spam protection:** Hidden honeypot field + server-side rate limiting (5 per 15 min per IP). No CAPTCHA.
- **Privacy:** Consent checkbox required. Links to privacy policy. Copy: "I agree to Cedar Tutoring Academy's privacy policy and consent to being contacted about my inquiry."
- **Success state:** Green checkmark, "Thank you! We'll contact you within 24 hours to schedule your free assessment." + list of what to expect.
- **Error state:** Red alert, "Something went wrong. Please try again or call us at [phone]."

#### `ContactForm`
- **Type:** Client Component
- **Props:** `{ variant?: 'full' | 'compact' }`
- **Fields:** name, email, phone (optional), subject (select — see CONTACT_SUBJECT_OPTIONS in architecture-blueprint.md), message
- **Submission:** POST to `/api/contact`
- **Spam/privacy:** Same honeypot + rate limiting + consent pattern as AssessmentForm.
- **Behavior:** Simpler form for general inquiries. Same validation/submission/error pattern as AssessmentForm.

#### `FormField`
- **Type:** Client Component
- **Props:** `{ label: string; name: string; type: 'text' | 'email' | 'tel' | 'select' | 'multiselect' | 'textarea' | 'checkbox'; error?: string; required?: boolean; placeholder?: string; options?: { value: string; label: string }[] }`
- **Behavior:** Wrapper that renders label, input/select/textarea, error message. Accessible via `htmlFor` + `aria-describedby` for errors.

---

## Design Token Consumption

Components consume Oracle's design tokens via Tailwind classes. The token → class mapping:

```
colors.brand.primary    → bg-primary, text-primary, border-primary
colors.brand.secondary  → bg-secondary, text-secondary
colors.accent           → bg-accent, text-accent
colors.muted            → bg-muted, text-muted-foreground
spacing.section         → py-16 md:py-24 (section padding)
spacing.container       → max-w-7xl mx-auto px-4 md:px-6 lg:px-8
radius.card             → rounded-lg or rounded-xl
shadow.card             → shadow-sm hover:shadow-md
typography.heading      → font-bold tracking-tight
typography.body         → text-base leading-relaxed
```

All colors reference CSS custom properties so Oracle can adjust the palette without code changes:
```css
/* globals.css — Cedar brand palette (v1.2) */
:root {
  --primary: 199 87% 43%;           /* Cedar Blue #0d8ecf — backgrounds, CTAs, icons, borders */
  --primary-foreground: 0 0% 100%;  /* White text on primary bg */
  --secondary: 160 50% 40%;         /* Semantic green #059669 — success, checkmarks (NOT decorative) */
  --secondary-foreground: 0 0% 100%;
  --brand-red: 358 74% 49%;         /* Cedar Red #d92027 — emphasis badges, featured indicators */
  --brand-red-foreground: 0 0% 100%;
  --accent: 38 97% 57%;             /* Cedar Orange #ffa725 — Proof Bar, decoration (NOT text) */
  --accent-foreground: 0 0% 10%;
  /* ... neutrals unchanged */
}
```

**Critical constraint for Trinity:** `--primary` (#0d8ecf) FAILS WCAG AA as text on white (3.48:1). **Never** use it as a text color on light backgrounds. Use `text-primary` only on dark/primary backgrounds. For Cedar Blue text on light backgrounds (links, active nav states), use the safe variant `#0a7ab8` directly via `text-[#0a7ab8]` or a utility class.

---

## Page-by-Page Implementation Guide

### Homepage (`/`)

```
<PageHero>                    — Headline, subtitle, CTA buttons, hero image (decorative orbs: 2-3 large)
<ProofBar>                    — Trust metrics row
<Section: Programs Overview>  — SectionHeading + 6× ProgramCard in grid
<Section: How It Works>       — SectionHeading + ProcessSteps (4 steps, filled circles, space-y-6 mobile)
<Section: Why Cedar>          — SectionHeading + differentiator cards (4× icon + text, primary-blue side stripes)
<Section: Testimonials>       — SectionHeading + TestimonialCarousel
<CTASection>                  — Gradient container: "Book Your Free Assessment" + phone link + trust bullets
```

### Programs Hub (`/programs`)

```
<PageHero>                    — "Academic Programs" heading, subtitle (decorative orbs: 1-2 smaller)
<Section: All Programs>       — Static grid of ProgramCard[] (no filtering in Phase 1; grid of all 6 programs)
<Section: How Cedar is Different> — Differentiators relevant to programs
<CTASection>                  — "Not sure which program? Book an assessment" + phone link
```

### Individual Program Page (e.g., `/programs/reading`)

```
<PageHero>                    — Program-specific hero with breadcrumbs (decorative orbs: 1-2 smaller)
<Section: The Problem>        — Parent pain points this program solves
<Section: Our Approach>       — How Cedar teaches this subject
<Section: Process>            — ProcessSteps (assess → plan → teach → measure, filled circles)
<Section: Outcomes>           — What parents can expect (bullet list with icons)
<Section: Testimonials>       — 2-3 program-specific testimonials (with gradient accent top stripe)
<Section: FAQ>                — FAQAccordion with program-specific questions
<Section: Related Programs>   — 2-3 ProgramCard for related subjects
<CTASection>                  — "Book a [Subject] Assessment" + phone link + 2-3 trust bullets
```

### Test Prep Hub (`/test-prep`)

```
<PageHero>                    — "Test Prep" heading (decorative orbs: 1-2 smaller)
<Section: Overview>           — Why test prep matters, Cedar's approach
<Section: Programs>           — Cards for SAT, ACT, PSAT with key differences
<Section: Cedar's Method>     — ProcessSteps (diagnostic → plan → practice → review, filled circles)
<Section: Results>            — Score improvement stats or testimonials
<CTASection>                  — "Book a Diagnostic Test" + phone link
```

### Individual Test Prep Page (e.g., `/test-prep/sat`)

```
<PageHero>                    — "SAT Prep" with breadcrumbs (decorative orbs: 1-2 smaller)
<Section: Why SAT Matters>    — Brief context
<Section: Cedar's SAT Program> — What's included, format, timeline
<Section: Process>            — ProcessSteps specific to SAT prep (filled circles)
<Section: FAQ>                — FAQAccordion (when to start, how long, etc.)
<CTASection>                  — "Book SAT Diagnostic" + phone link + trust bullets
```

### About (`/about`)

```
<PageHero>                    — "Why Cedar" heading (decorative orbs: 1-2 smaller)
<Section: Mission>            — Mission statement + brand story
<Section: Approach>           — Teaching philosophy, what makes Cedar different
<Section: Trust>              — Safety, credentials, care-based positioning
<Section: Testimonials>       — 3-4 curated testimonials (with gradient accent top stripe on cards)
<CTASection>                  — "See Our Programs" or "Book Assessment" + phone link
```

### Reviews (`/reviews`)

```
<PageHero>                    — "What Parents Say" heading (decorative orbs: 1-2 smaller)
<Section: Rating Overview>    — AggregateRating display (5.0 stars, 122+ reviews)
<Section: Testimonials Grid>  — Full grid of testimonial cards (paginated or load-more)
<CTASection>                  — "Ready to join these families?" + phone link
```

### FAQ (`/faq`)

```
<PageHero>                    — "Frequently Asked Questions" (decorative orbs: 1-2 smaller)
<Section: Categories>         — Tabbed or sectioned FAQ: Programs, Logistics, Pricing, Enrollment
<FAQAccordion>               — Per-category accordion groups
<CTASection>                  — "Still have questions?" + phone link + email (lighter variant acceptable here)
```

### Locations (`/locations`)

```
<PageHero>                    — "Our Location" (decorative orbs: 1-2 smaller)
<Section: Location Details>   — LocationCard with map, address, hours, phone, service area
<Section: What to Expect>     — First visit info, parking, drop-off
<Section: Transportation>     — Brief + link to transportation page
<CTASection>                  — "Book a Visit" or "Book Assessment" + phone link
```

### Transportation (`/transportation`)

```
<PageHero>                    — "Transportation" heading (decorative orbs: 1-2 smaller)
<Section: Overview>           — Free within 5-mile radius, how it works
<Section: Process>            — Pickup/drop-off procedure, timing, safety (ProcessSteps, filled circles)
<Section: Service Area>       — Map or list of areas served
<Section: Safety>             — Adult supervision, procedures, communication
<Section: FAQ>                — Transportation-specific questions
<CTASection>                  — "Book Assessment" + phone link (transportation discussed during enrollment)
```

### Pricing (`/pricing`)

```
<PageHero>                    — "Plans & Pricing" heading (decorative orbs: 1-2 smaller)
<Section: How It Works>       — Explain pricing model (assessment-first, tailored plans)
<Section: Plan Comparison>    — PricingCard[] showing tier structure (highlighted tier uses --brand-red badge)
<Section: What's Included>    — Bullet list of inclusions across all plans
<Section: FAQ>                — Pricing-specific FAQ (payment methods, refunds, siblings)
<CTASection>                  — "Book Free Assessment — We'll Recommend a Plan" + phone link
```

### Book Assessment (`/book-assessment`)

```
<PageHero>                    — "Book Your Free Assessment" heading, supportive subtitle
<Section: Form>               — AssessmentForm component
<Section: What Happens Next>  — 3-step process after form submission
<Section: Contact Alternative> — Phone number + email for those who prefer calling
```

---

## Animation & Interaction Specs

| Element | Interaction | Spec |
|---------|-------------|------|
| Page sections | Scroll reveal | Fade-in + translate-y(20px) on viewport entry. `transition: 600ms ease-out`. Use Intersection Observer. |
| Cards | Hover | `transform: translateY(-2px)` + shadow increase. `transition: 200ms ease`. |
| CTA buttons | Hover | Slight scale (1.02) + shadow. `transition: 150ms`. |
| Mobile nav | Open/close | Slide from right, 300ms ease-out. Backdrop fade. |
| Accordion | Expand | Height animation via Radix primitives (built-in). |
| Carousel | Slide | Transform-based slide with 400ms ease. |
| Form fields | Focus | Ring color change via Tailwind `focus-visible:ring-2 ring-primary`. |
| Form fields | Error | Shake animation (subtle, 300ms) + red border. |
| Success state | Appear | Fade-in + scale from 0.95 to 1. |

**Implementation:** Use CSS transitions (Tailwind classes) for simple hover/focus states. Use Intersection Observer for scroll reveals — do not add Framer Motion unless Oracle requires complex choreography. Prefer CSS-only animations.

**Carousel:** Use Embla Carousel (via shadcn/ui carousel primitive). Lightweight, accessible, lazy-loaded.

**`prefers-reduced-motion` behavior:** When the user has `prefers-reduced-motion: reduce` enabled:
- All scroll-reveal animations: instant (no fade/translate, content appears immediately)
- Card hover lifts: disabled (hover still changes shadow, but no transform)
- Carousel auto-advance: paused permanently (manual navigation only)
- Mobile nav slide: instant open/close (no slide animation)
- Form field shake on error: disabled (red border + error text only)
- Success state scale: disabled (instant appear)

Implement via a utility class or Tailwind `motion-reduce:` variant:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Responsive Breakpoints (Mobile-First)

```
sm:  640px   — Small tablets
md:  768px   — Tablets
lg:  1024px  — Desktop
xl:  1280px  — Wide desktop
2xl: 1536px  — Ultra-wide (max container width)
```

**Mobile-first approach:** Default styles target mobile. Layer up with `sm:`, `md:`, `lg:` prefixes.

**Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` on all section wrappers.

**Key responsive behaviors:**
- Navigation: hamburger below `lg`, full nav at `lg+`
- Grids: 1 col → 2 col at `md` → 3 col at `lg`
- Hero: full-bleed at all sizes, text sizing scales
- Process steps: vertical timeline (mobile) → horizontal (desktop)
- Footer: stacked (mobile) → 4-column grid (desktop)

---

## Image/Media Handling

| Context | Component | Sizing | Loading | Format |
|---------|-----------|--------|---------|--------|
| Hero background | `next/image` fill | viewport width, 500px height | priority (eager) | WebP |
| Program cards | `next/image` | 64×64 icon or 400×300 thumbnail | lazy | WebP/SVG |
| Testimonial avatars | `next/image` | 48×48 rounded | lazy | WebP |
| Location map | Static image or iframe | 100% width, 400px height | lazy | — |
| Team photos | `next/image` | 300×300 square | lazy | WebP |
| Logo | SVG `<Image>` | height: 40px auto-width | eager | SVG |
| OG images | Static files | 1200×630 | — | PNG/JPG |

**All images:** Use `sizes` prop to specify responsive behavior. Never serve oversized images.

---

## Key Implementation Notes

1. **Server Components by default.** Only mark `'use client'` when the component needs interactivity, state, or browser APIs.
2. **No prop drilling.** If data needs to flow deep, pass it as children or use composition.
3. **shadcn/ui as the primitive layer.** Use their Button, Card, Sheet, Accordion, Dialog. Don't rebuild from scratch.
4. **Accessibility is non-negotiable.** Every interactive element must be keyboard navigable. Every image must have alt text. Every form field must have a label.
5. **Content comes from typed imports.** Programs from MDX, testimonials from JSON, metadata from TypeScript. Components receive typed props — they never fetch content. All content types are defined in `src/types/content.ts` (see architecture-blueprint.md § Typed Content Contracts). Form option lists (subjects, grades, schedules) are defined in `src/types/forms.ts`.
6. **One CTA per page section, one primary CTA per page.** Keep the parent journey directional.

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-05-02 | 1.0 | Initial frontend spec |
| 2026-05-02 | 1.1 | **Post-review updates:** Fixed nav breakpoint to `lg` consistently. Renamed CTAButton `secondary`/`outline` variants to `outlined`/`ghost` (clear visual distinction). Added dual-CTA support to PageHero (`ctas` array). Changed `LucideIcon` component props to `iconName: string` on ProofBar, ProgramCard, ProcessSteps (safe for JSON content). Tightened `FormField.type` to union of allowed values. Changed `LocationCard.hours` from `string` to structured `{ label, time }[]`. Fixed Programs hub to static grid (no filtering). Added Embla Carousel recommendation. Added `prefers-reduced-motion` behavior to animation spec. Added form contract details (endpoint, spam protection, privacy/consent). Referenced typed content contracts from architecture-blueprint. |
| 2026-05-03 | 1.2 | **Brand color alignment + UX review updates (Morpheus Architecture Review):** Updated Design Token Consumption CSS block to Cedar brand palette (`--primary` Cedar Blue, `--accent` Cedar Orange, new `--brand-red` Cedar Red token). Added critical constraint: `--primary` (#0d8ecf) is NOT text-safe on white — documented text-safe variant #0a7ab8. Updated PageHero spec: added `decorative?: boolean` prop (default `true`), decorative orb rendering guidance, Cedar Blue gradient specification. Updated ProcessSteps spec: filled circles canonical (never bordered); connecting line `primary/40`; mobile `space-y-6`. Added `CTASection` shared component spec (gradient container, dual CTA, trust bullets, mandatory on all pages). Updated all per-page implementation guides to use `<CTASection>` instead of ad-hoc `<Section: CTA>` entries; added orb notes to PageHero calls; added filled-circles note to ProcessSteps calls; added brand-red note to PricingCard highlighted tier. |
