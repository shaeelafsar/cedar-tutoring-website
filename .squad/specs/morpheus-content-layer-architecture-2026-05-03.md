# Morpheus Content Layer Architecture Spec

> **Author:** Morpheus (Lead/Architect)
> **Requested by:** Shaeel
> **Timestamp:** 2026-05-03T15:09:52.334-05:00
> **Scope:** File-based content layer for the Cedar Tutoring Academy marketing site

---

## Executive Summary

Adopt a **JSON-first, MDX-where-it-helps** content layer rooted at `/content/`. JSON will hold structured, repeatable marketing content (heroes, cards, testimonials, FAQs, locations, pricing tiers, CTA blocks); MDX will be reserved for a small number of rich narrative bodies (primarily About, with optional future use for long-form trust pages). All content is loaded at build time through typed server-side helpers, validated with Zod, and rendered by existing React components without any runtime CMS or API dependency.

This keeps the site compatible with `output: 'export'`, GitHub Pages, TypeScript strict mode, and Cedar's small-business editing needs.

---

## Design Goals

1. **No hardcoded marketing copy inside TSX** except tiny UI-only labels.
2. **Keep editing simple** for a non-developer working in GitHub or VS Code.
3. **Stay static-first**: no runtime fetching, no CMS SDK, no database.
4. **Preserve component reuse**: pages consume content; components stay presentation-focused.
5. **Enforce type safety** with TypeScript interfaces + Zod parsing.
6. **Normalize all image paths through `imagePath()`** so production `basePath` works correctly on GitHub Pages.
7. **Avoid over-engineering**: this is a file-based CMS pattern, not a content platform.

---

## 1. Content Directory Structure

### Recommended `/content/` layout

```text
content/
├── site/
│   ├── settings.json
│   ├── navigation.json
│   └── footer.json
├── collections/
│   ├── testimonials.json
│   ├── team.json
│   ├── locations.json
│   └── pricing-tiers.json
├── pages/
│   ├── home.json
│   ├── programs-hub.json
│   ├── test-prep-hub.json
│   ├── about.json
│   ├── about.mdx
│   ├── faq.json
│   ├── locations.json
│   ├── pricing.json
│   ├── reviews.json
│   └── book-assessment.json
├── programs/
│   ├── reading.json
│   ├── math.json
│   ├── writing.json
│   ├── science.json
│   ├── arabic.json
│   └── homework-help.json
└── test-prep/
    ├── sat.json
    ├── act.json
    └── psat.json
```

### Organization rule

Use **both page-level and content-type organization**:

- `content/site/` = global site chrome and shared business metadata.
- `content/collections/` = reusable datasets used across multiple pages.
- `content/pages/` = page shell content (hero, intro, CTA, section ordering, section copy).
- `content/programs/` and `content/test-prep/` = route-backed collections where each file maps to one `[slug]` page.

### JSON vs MDX usage

**Use JSON for:**
- hero copy
- stats
- cards
- FAQs
- testimonials
- pricing tables
- team records
- location records
- CTA content
- navigation/footer links
- any section made of repeatable fields

**Use MDX for:**
- About page narrative/story content
- any future long-form editorial body that benefits from headings, emphasis, lists, and links inside prose

**Do not use MDX for:**
- testimonials
- FAQs
- pricing tiers
- location cards
- program metadata
- navigation

### Example file responsibilities

- `content/pages/home.json` → homepage hero, proof bar, section intros, steps, differentiators, final CTA
- `content/collections/testimonials.json` → all reviews/testimonials, with flags for homepage/reviews/program relevance
- `content/programs/math.json` → math detail page content and program card metadata
- `content/pages/about.json` → About hero, stats, values intro, CTA
- `content/pages/about.mdx` → About story body
- `content/collections/team.json` → founder/tutor bios
- `content/pages/pricing.json` + `content/collections/pricing-tiers.json` → pricing page shell + tier cards

---

## 2. TypeScript Types

### Location

Use and expand the existing `src/types/content.ts` as the canonical content contract file.

Also add runtime validation schemas in:

- `src/lib/content/schemas.ts`

### Recommended type model

```ts
export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export interface ContentImage {
  src: string; // always root-relative, e.g. "/images/programs/math-hero.jpg"
  alt: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface CtaBlock {
  heading: string;
  subtext: string;
  primaryCta: LinkItem;
  secondaryCta?: LinkItem;
  trustBullets?: string[];
}

export interface HeroContent {
  eyebrow?: string;
  heading: string;
  subtitle: string;
  primaryCta?: LinkItem;
  secondaryCta?: LinkItem;
  stats?: Array<{ value: string; label: string }>;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relation: string;
  location?: string;
  rating: number;
  badge?: string;
  featured?: boolean;
  programSlugs?: string[];
  testPrepSlugs?: string[];
  source?: "google" | "direct";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials?: string[];
  bio: string;
  image?: ContentImage;
}

export interface LocationContent {
  id: string;
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: Array<{ label: string; time: string }>;
  serviceAreas: string[];
  transportationAvailable?: boolean;
  mapUrl?: string;
  image?: ContentImage;
}

export interface PricingTier {
  id: string;
  name: string;
  priceLabel: string;
  cadence: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
}

export interface ProgramContent {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  iconName: string;
  grades: string;
  tags: string[];
  seo: SeoMeta;
  hero: HeroContent;
  problem: { heading: string; paragraphs: string[] };
  approach: { heading: string; paragraphs: string[]; bullets: string[] };
  outcomes: { heading: string; items: string[] };
  faq: FAQItem[];
  testimonialIds?: string[];
  relatedPrograms: string[];
  cta: CtaBlock;
}

export interface TestPrepContent {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  iconName: string;
  grades: string;
  seo: SeoMeta;
  hero: HeroContent;
  idealFor: string[];
  focusAreas: string[];
  format: string[];
  outcomes: string[];
  faq: FAQItem[];
  testimonialIds?: string[];
  relatedTests: string[];
  cta: CtaBlock;
}

export interface HomePageContent {
  seo: SeoMeta;
  hero: HeroContent;
  proofBar: Array<{ iconName: string; label: string }>;
  programsSection: { eyebrow: string; heading: string; subtitle: string };
  testimonialsSection: { eyebrow: string; heading: string; subtitle: string; featuredIds: string[] };
  howItWorks: { eyebrow: string; heading: string; steps: Array<{ number: string; title: string; description: string }> };
  whyCedar: { eyebrow: string; heading: string; subtitle: string; items: Array<{ iconName: string; title: string; description: string; checks: string[] }> };
  finalCta: CtaBlock;
}
```

### Type decisions

- Keep `iconName: string` rather than component references so content stays serializable.
- Keep raw image values as strings in content; transform them with `imagePath()` when used.
- Reuse `CtaBlock`, `HeroContent`, and `SeoMeta` across page and detail content to reduce drift.
- Evolve the current `ProgramPageData`, `Testimonial`, `FAQEntry`, and `Location` types rather than creating parallel duplicates.

---

## 3. Content Loading Strategy

### Decision

Use **typed helper functions with static imports** for JSON, and **direct route-level imports** for the few MDX files.

### Recommended loader structure

```text
src/lib/content/
├── schemas.ts
├── site.ts
├── pages.ts
├── programs.ts
├── testPrep.ts
├── collections.ts
└── images.ts
```

### Recommended import alias

Add a separate alias so content can live at repo root without awkward relative paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@content/*": ["./content/*"]
    }
  }
}
```

### JSON loading pattern

```ts
import homePageJson from "@content/pages/home.json";
import testimonialsJson from "@content/collections/testimonials.json";
import { homePageSchema, testimonialSchema } from "./schemas";

export function getHomePageContent(): HomePageContent {
  return homePageSchema.parse(homePageJson);
}

export function getTestimonials(): Testimonial[] {
  return testimonialSchema.array().parse(testimonialsJson);
}
```

### MDX loading pattern

Use direct imports where a page needs a prose body:

```tsx
import AboutBody from "@content/pages/about.mdx";
import { getAboutPageContent } from "@/lib/content/pages";
```

This keeps MDX simple and avoids inventing a custom MDX registry for only one or two pages.

### Why helpers instead of raw imports everywhere

Helpers give us one place to:

- validate content with Zod
- sort/filter collections
- derive featured testimonials
- resolve slug lookups
- normalize images through `imagePath()`
- keep TSX pages clean and predictable

### Image normalization rule

Content files must store image paths like:

```json
"src": "/images/team/founder.jpg"
```

Then content helpers or render adapters must call `imagePath()` before passing the path into `Image` or `img` props.

Recommended helper:

```ts
export function resolveContentImage(image?: ContentImage) {
  return image ? { ...image, src: imagePath(image.src) } : undefined;
}
```

### Runtime model

- All loaders run in **Server Components only**.
- No `fetch()` to local files.
- No route handlers for content.
- No client-side content loading.
- Everything is resolved at build time for static export.

---

## 4. Migration Plan

### A. `src/app/(marketing)/page.tsx` — Homepage

**Extract into content:**
- hero eyebrow, headline, subtitle, CTAs, stat tiles
- proof bar items
- testimonial section heading/subheading
- featured testimonial IDs
- programs section intro copy
- how-it-works steps
- why-Cedar cards
- final CTA copy

**Create:**
- `content/pages/home.json`
- `content/collections/testimonials.json`

**Component change:**
- Replace local arrays/constants with `getHomePageContent()`, `getFeaturedTestimonials()`, and `getPrograms()`.
- Keep rendering structure mostly intact.
- Keep icon resolution in TSX via `getIcon(content.iconName)`.

### B. `src/app/(marketing)/programs/page.tsx` — Programs Hub

**Extract into content:**
- hero heading/subtitle
- section intro copy
- final CTA copy

**Create:**
- `content/pages/programs-hub.json`

**Component change:**
- Read shell copy from `getProgramsHubPageContent()`.
- Keep card loop driven by `getAllPrograms()`.
- Delete page-level hardcoded copy after parity is confirmed.

### C. `src/app/(marketing)/programs/[slug]/page.tsx` — Program Detail

**Extract into content:**
- every program object currently living in `src/content/programs/data.ts`
- page SEO
- hero copy
- problem, approach, outcomes
- FAQs
- related programs slugs
- CTA copy

**Create:**
- `content/programs/reading.json`
- `content/programs/math.json`
- `content/programs/writing.json`
- `content/programs/science.json`
- `content/programs/arabic.json`
- `content/programs/homework-help.json`

**Component change:**
- Replace legacy `src/content/programs/data.ts` source with `src/lib/content/programs.ts`.
- Keep `generateStaticParams()` but source slugs from `getAllProgramSlugs()`.
- Optionally resolve testimonials through `testimonialIds`; otherwise inline them temporarily during migration and normalize later.

### D. `src/lib/constants.ts`

**Extract into content:**
- `NAV_ITEMS`
- `FOOTER_NAV`
- optional business display data if Shaeel should edit it outside TS

**Create:**
- `content/site/navigation.json`
- `content/site/footer.json`
- `content/site/settings.json`

**Component change:**
- Header/Footer use content loaders instead of importing hardcoded arrays.
- Keep truly technical constants in TS (`SITE_URL`, schema helpers, etc.) if they are not editor-facing.

### E. Legacy cleanup

After all pages are using the new loaders:

- remove or drastically shrink `src/content/programs/data.ts`
- remove page-local hardcoded arrays from TSX files
- update tests to assert rendered content from the new source of truth

### Recommended migration order

1. Create `content/` files and `src/lib/content/*` loaders.
2. Migrate homepage shell content.
3. Migrate programs hub shell content.
4. Split `src/content/programs/data.ts` into per-program JSON files.
5. Migrate navigation/footer.
6. Build remaining pages directly on the new content layer.
7. Delete legacy hardcoded content after visual parity check.

---

## 5. New Page Content Templates

## `/test-prep`

### Files
- `content/pages/test-prep-hub.json`
- `content/test-prep/sat.json`
- `content/test-prep/act.json`
- `content/test-prep/psat.json`

### Required fields
- hub hero + intro + CTA
- per-test slug, title, shortDescription, grades, seo, hero, idealFor, focusAreas, format, outcomes, faq, relatedTests, cta

### Sample hub content

```json
{
  "seo": {
    "title": "Test Prep | Cedar Tutoring Academy",
    "description": "SAT, ACT, and PSAT prep with strategy, practice, and confidence-building support in Plano, Texas."
  },
  "hero": {
    "eyebrow": "Test prep",
    "heading": "Test prep that builds scores without adding chaos.",
    "subtitle": "Cedar helps students prepare for SAT, ACT, and PSAT with targeted instruction, timed practice, and a plan families can actually follow."
  },
  "finalCta": {
    "heading": "Want a test prep plan that fits your student?",
    "subtext": "Book a free assessment and we will recommend the right starting point.",
    "primaryCta": { "label": "Book a Free Assessment", "href": "/book-assessment" }
  }
}
```

### Sample `content/test-prep/sat.json`

```json
{
  "slug": "sat",
  "title": "SAT Prep",
  "shortTitle": "SAT",
  "shortDescription": "Structured SAT prep focused on math, reading, timing, and test-day confidence.",
  "iconName": "target",
  "grades": "10–12",
  "seo": {
    "title": "SAT Prep | Cedar Tutoring Academy",
    "description": "SAT prep in Plano with targeted math and reading support, practice testing, and pacing strategies."
  },
  "hero": {
    "heading": "SAT prep with structure, strategy, and less guesswork.",
    "subtitle": "Students get focused support on score growth, timing, and confidence before test day."
  },
  "idealFor": ["Students aiming to raise composite scores", "Families who want a realistic prep plan"],
  "focusAreas": ["Digital SAT math", "Reading and writing", "Timing and pacing", "Practice review"],
  "format": ["Assessment-led starting point", "Small-group or targeted support", "Practice checkpoints"],
  "outcomes": ["Clear score goals", "Better pacing", "More confidence under time pressure"],
  "faq": [
    {
      "question": "When should my student start SAT prep?",
      "answer": "Most students benefit from starting several months before their target test date so there is time for skill-building and practice."
    }
  ],
  "relatedTests": ["psat", "act"],
  "cta": {
    "heading": "Ready to map out SAT prep?",
    "subtext": "Start with a free assessment and score-growth plan.",
    "primaryCta": { "label": "Book SAT Assessment", "href": "/book-assessment" }
  }
}
```

## `/about`

### Files
- `content/pages/about.json`
- `content/pages/about.mdx`
- `content/collections/team.json`

### Required fields
- hero
- trust stats
- values grid
- team intro
- final CTA
- MDX body for Cedar story / philosophy

### Sample `content/pages/about.json`

```json
{
  "seo": {
    "title": "About Cedar Tutoring Academy",
    "description": "Learn about Cedar's teaching philosophy, small-group model, and commitment to helping students grow with confidence."
  },
  "hero": {
    "eyebrow": "About Cedar",
    "heading": "A tutoring center built around clarity, care, and steady progress.",
    "subtitle": "Cedar exists to help students grow academically while making family life feel less stressful."
  },
  "stats": [
    { "value": "1:3", "label": "Student-to-tutor ratio" },
    { "value": "K–12", "label": "Grades supported" },
    { "value": "Plano", "label": "Local families served" }
  ],
  "values": [
    {
      "title": "Assessment before assumptions",
      "description": "We start with the student's real needs before recommending a plan."
    },
    {
      "title": "Progress parents can see",
      "description": "Families get thoughtful updates and practical next steps."
    }
  ],
  "finalCta": {
    "heading": "Want to see whether Cedar is the right fit?",
    "subtext": "Book a free assessment and talk through your child's goals.",
    "primaryCta": { "label": "Book a Free Assessment", "href": "/book-assessment" }
  }
}
```

### Sample `content/pages/about.mdx`

```mdx
## Why families choose Cedar

Families usually come to Cedar when school support is not quite enough, homework has become tense, or confidence has started to slip.

What they need is not more pressure. They need a plan, clear teaching, and a team that communicates well.

That is the role Cedar aims to fill.
```

## `/faq`

### Files
- `content/pages/faq.json`

### Required fields
- hero
- intro copy
- categories with items
- CTA

### Sample structure

```json
{
  "hero": {
    "eyebrow": "FAQ",
    "heading": "Common questions from Cedar families.",
    "subtitle": "Answers about programs, scheduling, transportation, pricing, and getting started."
  },
  "categories": [
    {
      "title": "Getting started",
      "items": [
        {
          "question": "How does the free assessment work?",
          "answer": "We learn where the student stands, what feels difficult, and what kind of support makes sense."
        }
      ]
    }
  ],
  "finalCta": {
    "heading": "Still have a question?",
    "subtext": "Reach out and we will help you find the right next step.",
    "primaryCta": { "label": "Book a Free Assessment", "href": "/book-assessment" }
  }
}
```

## `/locations`

### Files
- `content/pages/locations.json`
- `content/collections/locations.json`

### Required fields
- page hero
- intro copy
- location cards from collection
- service-area / transportation copy
- CTA

### Sample `content/collections/locations.json`

```json
[
  {
    "id": "plano",
    "name": "Plano Learning Center",
    "addressLine1": "3100 Independence Pkwy #311",
    "city": "Plano",
    "state": "TX",
    "zip": "75075",
    "phone": "(469) 757-2220",
    "hours": [
      { "label": "Mon–Thu", "time": "3:00 PM – 8:00 PM" },
      { "label": "Sat", "time": "10:00 AM – 2:00 PM" }
    ],
    "serviceAreas": ["Plano", "Frisco", "Allen", "Richardson"],
    "transportationAvailable": true,
    "mapUrl": "https://maps.google.com/?q=3100+Independence+Pkwy+Plano+TX"
  }
]
```

## `/pricing`

### Files
- `content/pages/pricing.json`
- `content/collections/pricing-tiers.json`

### Required fields
- hero
- reassurance copy
- tier list
- FAQ or notes
- CTA

### Sample `content/collections/pricing-tiers.json`

```json
[
  {
    "id": "starter",
    "name": "Starter Support",
    "priceLabel": "$XXX",
    "cadence": "/ month",
    "description": "A strong starting point for students who need steady weekly support.",
    "features": ["Assessment-led plan", "Small-group tutoring", "Progress updates"]
  },
  {
    "id": "most-popular",
    "name": "Momentum Plan",
    "priceLabel": "$XXX",
    "cadence": "/ month",
    "description": "For families who want stronger consistency and visible progress.",
    "features": ["More frequent sessions", "Priority scheduling", "Progress reviews"],
    "badge": "Most Popular",
    "highlighted": true
  }
]
```

## `/reviews`

### Files
- `content/pages/reviews.json`
- `content/collections/testimonials.json`

### Required fields
- hero
- aggregate proof copy
- filter copy by program/test-prep if desired
- CTA

### Sample structure

```json
{
  "hero": {
    "eyebrow": "Reviews",
    "heading": "What families say after working with Cedar.",
    "subtitle": "From calmer homework routines to stronger grades, here is the kind of progress families describe most often."
  },
  "highlights": [
    "5.0 Google rating",
    "122 reviews",
    "Common themes: confidence, communication, measurable progress"
  ],
  "finalCta": {
    "heading": "Ready to create your own success story?",
    "subtext": "Book a free assessment and see what the right support could look like.",
    "primaryCta": { "label": "Book a Free Assessment", "href": "/book-assessment" }
  }
}
```

## `/book-assessment`

### Files
- `content/pages/book-assessment.json`

### Required fields
- hero
- reassurance bullets
- expectations copy
- contact fallback copy
- privacy/consent copy
- post-form CTA block

### Sample structure

```json
{
  "hero": {
    "eyebrow": "Book assessment",
    "heading": "Start with a free assessment.",
    "subtitle": "Tell us about your student and we will recommend the right next step."
  },
  "reassuranceBullets": [
    "No-pressure conversation",
    "Response within 24 hours",
    "Built for K–12 and test prep families"
  ],
  "whatToExpect": [
    "We review current challenges and goals",
    "We recommend a program or next step",
    "We answer scheduling and logistics questions"
  ],
  "contactFallback": {
    "phone": "(469) 757-2220",
    "email": "info@cedartutoring.com"
  },
  "privacyNote": "By submitting this form, you agree to be contacted about your inquiry."
}
```

### Important note for form options

Form validation enums and any API-critical option lists should stay in TypeScript/Zod if they drive business logic. Editor-facing helper copy, reassurance text, and explanatory labels can live in JSON.

---

## 6. Content Editing Guide (Non-Developer Friendly)

## Where content lives

- **Homepage:** `content/pages/home.json`
- **Programs:** `content/programs/*.json`
- **Testimonials / reviews:** `content/collections/testimonials.json`
- **Pricing:** `content/pages/pricing.json` and `content/collections/pricing-tiers.json`
- **Locations:** `content/pages/locations.json` and `content/collections/locations.json`
- **About story:** `content/pages/about.mdx`
- **FAQ:** `content/pages/faq.json`

## How to edit a testimonial

1. Open `content/collections/testimonials.json`.
2. Find the testimonial entry you want to change.
3. Update the `quote`, `author`, `relation`, or `badge` fields.
4. Keep commas and quotation marks exactly in place.
5. Save the file and preview the site.

Example:

```json
{
  "id": "layla-home",
  "quote": "Cedar helped my daughter feel confident again.",
  "author": "Layla H.",
  "relation": "Parent of a 4th grader",
  "rating": 5,
  "badge": "Confidence growth",
  "featured": true
}
```

## How to add a new program

1. Copy an existing file in `content/programs/`, such as `math.json`.
2. Rename it to the new slug, for example `biology.json`.
3. Update `slug`, `title`, `shortTitle`, `shortDescription`, `hero`, `faq`, and `cta`.
4. Add the new slug to navigation only if the page should appear in the menu.
5. Make sure `slug` matches the intended URL.

## How to update pricing

1. Open `content/collections/pricing-tiers.json`.
2. Edit `priceLabel`, `cadence`, description, or feature bullets.
3. If a tier should be highlighted, set `"highlighted": true` and optionally add `"badge": "Most Popular"`.

## JSON file basics

- Text must be inside double quotes.
- Every line except the last in a list usually ends with a comma.
- Use square brackets `[]` for lists.
- Use curly braces `{}` for one content item.

## MDX file basics

MDX looks like Markdown:

- `## Heading` creates a section heading.
- Blank lines create paragraphs.
- `- item` creates a bullet list.
- `**text**` makes text bold.

Use MDX only when you are writing flowing page copy, not card data.

## Editing rule of thumb

- If the content looks like a **list, card, stat, FAQ, or form field**, it belongs in JSON.
- If the content looks like a **story or article section**, it belongs in MDX.

---

## 7. Technical Decisions

### Decision 1: Use JSON + MDX; reject YAML

**Chosen:** JSON for structured content, MDX for long-form narrative bodies.

**Why:**
- JSON is already well-supported by TypeScript and easy to validate.
- JSON is explicit and predictable for arrays/objects used by cards and sections.
- MDX gives us richer prose where needed without building a CMS framework.
- YAML is friendlier for some humans but more indentation-sensitive and less common in the existing codebase.

### Decision 2: Use static imports behind typed loaders

**Chosen:** content loaders in `src/lib/content/*` wrapping static JSON imports.

**Why:**
- best fit for `output: 'export'`
- no runtime I/O or API calls
- central validation and filtering
- easier page-level consumption than importing raw JSON in every route

**Not chosen:** direct raw imports everywhere. They are simple at first, but drift quickly and scatter validation logic.

### Decision 3: Keep dynamic routes fully static

For `/programs/[slug]` and future `/test-prep/[slug]`:

- `dynamicParams = false`
- `generateStaticParams()` reads slugs from content helpers
- `generateMetadata()` reads SEO fields from content helpers

This guarantees every route is known at build time and exported cleanly for GitHub Pages.

### Decision 4: Image handling convention

**Content files store root-relative public paths only.** Example:

```json
"src": "/images/team/founder.jpg"
```

**Rendering code must call `imagePath()`** before passing the value into image components. This keeps content environment-agnostic while still honoring production `basePath`.

### Decision 5: Keep page composition in TSX, not content-driven layouts

Content should provide **copy and structured data**, not arbitrary component trees.

That means:
- pages still own section order and rendering logic
- content files fill section props
- no attempt to build a generic block renderer or mini CMS engine

This keeps the system understandable for a small team.

### Decision 6: Minimal MDX surface area

If MDX support is not already enabled, add the minimal Next.js MDX configuration once and use it sparingly. Do not adopt Contentlayer, remote MDX, or a custom markdown pipeline for Phase 1.

### Decision 7: Base path and static export compatibility

This architecture is compatible with:
- `output: 'export'`
- `images.unoptimized: true`
- GitHub Pages deployment
- production `basePath: '/cedar-tutoring-website'`

Because:
- all content is available at build time
- no server runtime is required
- image paths are normalized through `imagePath()`
- dynamic routes are fully enumerated with `generateStaticParams()`

---

## Final Recommendation

Move the project to a **root-level `/content/` directory, JSON-first, helper-loaded, Zod-validated, with MDX reserved for About-style narrative copy**. This is the simplest architecture that fully removes hardcoded marketing content from TSX while staying static-export-safe, editor-friendly, and easy for Trinity and future contributors to implement incrementally.
