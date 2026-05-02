# Cedar Tutoring Academy — Architecture Blueprint

> **Version:** 1.1
> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-05-02
> **Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · shadcn/ui
> **Phase:** 1 (Informational) — designed with Phase 2 (Portal) seams

---

## A. Project Structure

### Directory Layout (Next.js App Router)

```
cedar-tutoring-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (html, body, fonts, analytics)
│   │   ├── page.tsx                  # Homepage
│   │   ├── not-found.tsx             # Custom 404
│   │   ├── error.tsx                 # Global error boundary
│   │   ├── sitemap.ts               # Dynamic sitemap generation
│   │   ├── robots.ts                # Robots.txt generation
│   │   ├── manifest.ts              # Web manifest
│   │   │
│   │   ├── (marketing)/             # Route group: public marketing pages
│   │   │   ├── layout.tsx           # Marketing layout (nav + footer)
│   │   │   ├── about/
│   │   │   │   └── page.tsx         # About / Why Cedar
│   │   │   ├── programs/
│   │   │   │   ├── page.tsx         # Programs hub
│   │   │   │   ├── math/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── reading/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── writing/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── science/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── arabic/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── homework-help/
│   │   │   │       └── page.tsx
│   │   │   ├── test-prep/
│   │   │   │   ├── page.tsx         # Test Prep hub
│   │   │   │   ├── sat/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── act/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── psat/
│   │   │   │       └── page.tsx
│   │   │   ├── locations/
│   │   │   │   └── page.tsx         # Location(s) page
│   │   │   ├── transportation/
│   │   │   │   └── page.tsx
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx         # Packages / Pricing
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx         # Reviews / Results
│   │   │   └── faq/
│   │   │       └── page.tsx
│   │   │
│   │   ├── book-assessment/
│   │   │   └── page.tsx             # Enrollment form (outside marketing group for distinct layout)
│   │   │
│   │   └── api/                     # API routes (Phase 2 seam)
│   │       ├── contact/
│   │       │   └── route.ts         # Form submission handler
│   │       └── assessment/
│   │           └── route.ts         # Assessment booking handler
│   │
│   ├── components/                   # Shared components
│   │   ├── ui/                      # shadcn/ui primitives (auto-generated)
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── NavLink.tsx
│   │   ├── shared/                  # Reusable business components
│   │   │   ├── CTAButton.tsx
│   │   │   ├── ProofBar.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   ├── ProgramCard.tsx
│   │   │   ├── ProcessSteps.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── ReviewStars.tsx
│   │   │   ├── LocationCard.tsx
│   │   │   ├── PricingCard.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── PageHero.tsx
│   │   │   ├── BreadcrumbNav.tsx
│   │   │   └── StructuredData.tsx
│   │   └── forms/                   # Form components
│   │       ├── AssessmentForm.tsx
│   │       ├── ContactForm.tsx
│   │       └── FormField.tsx
│   │
│   ├── content/                     # Static content (MDX/JSON)
│   │   ├── programs/               # Per-program content files
│   │   │   ├── math.mdx
│   │   │   ├── reading.mdx
│   │   │   ├── writing.mdx
│   │   │   ├── science.mdx
│   │   │   ├── arabic.mdx
│   │   │   └── homework-help.mdx
│   │   ├── test-prep/
│   │   │   ├── sat.mdx
│   │   │   ├── act.mdx
│   │   │   └── psat.mdx
│   │   ├── testimonials.json       # Curated testimonials data
│   │   ├── faq.json                # FAQ entries
│   │   ├── locations.json          # Location data
│   │   └── site-metadata.ts        # Global SEO defaults
│   │
│   ├── lib/                         # Utilities and logic
│   │   ├── utils.ts                # General utilities (cn helper, etc.)
│   │   ├── metadata.ts            # SEO metadata helpers
│   │   ├── structured-data.ts     # JSON-LD schema generators
│   │   ├── constants.ts           # Site-wide constants
│   │   ├── redirects.ts           # 301 redirect map
│   │   └── validators.ts          # Zod schemas for form validation
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useMediaQuery.ts
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── content.ts             # Content model types
│   │   ├── forms.ts               # Form data types
│   │   └── seo.ts                 # SEO/metadata types
│   │
│   └── styles/
│       └── globals.css             # Tailwind directives + custom properties
│
├── public/
│   ├── images/
│   │   ├── hero/                   # Hero images (WebP + fallback)
│   │   ├── programs/              # Program-specific imagery
│   │   ├── team/                  # Staff photos
│   │   ├── center/               # Center/facility photos
│   │   └── logos/                 # Cedar logo variants
│   ├── fonts/                     # Self-hosted font files (if needed)
│   └── og/                        # Open Graph images
│
├── tests/                          # Test files (Playwright + Vitest)
│   ├── e2e/                       # Playwright E2E tests
│   └── unit/                      # Vitest unit tests
│
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration with design tokens
├── tsconfig.json
├── package.json
├── .env.local                     # Local environment variables (gitignored)
├── .env.example                   # Template for env vars
└── middleware.ts                   # Redirect handling, future auth seam
```

### Component Hierarchy

```
RootLayout
├── Analytics (GA4 script)
├── Fonts (next/font)
└── MarketingLayout (Header + Footer wrapper)
    ├── Header
    │   ├── Logo
    │   ├── DesktopNav (NavLink[])
    │   ├── CTAButton ("Book Assessment")
    │   └── MobileNav (Sheet/Drawer)
    ├── [Page Content]
    └── Footer
        ├── Logo + Tagline
        ├── Navigation columns
        ├── Contact info
        ├── Social links
        └── Legal/Copyright
```

### Content Strategy

**Phase 1: File-based content (MDX + JSON)**
- Program pages use MDX files in `src/content/programs/` — editable by developers, Shaeel can submit PRs
- Testimonials, FAQ, locations stored as JSON — structured, easy to update
- Site metadata centralized in TypeScript for type safety

**Typed Content Contracts**

All content files must conform to these TypeScript interfaces. Components consume these types — never raw untyped data.

```typescript
// src/types/content.ts

/** MDX frontmatter for program pages (math.mdx, reading.mdx, etc.) */
export interface ProgramFrontmatter {
  slug: string;                          // URL slug, e.g. "math"
  title: string;                         // Display name, e.g. "Math Tutoring"
  shortDescription: string;              // 1-2 sentence summary for cards (max 120 chars)
  icon: string;                          // Lucide icon name, e.g. "calculator"
  grades: string;                        // Grade range, e.g. "K-12"
  tags: string[];                        // Category tags, e.g. ["core", "stem"]
  relatedPrograms: string[];             // Slugs of related programs
  seo: {
    title: string;                       // Page <title>, max 60 chars
    description: string;                 // Meta description, 50-160 chars
    ogImage?: string;                    // OG image path (optional, falls back to default)
  };
  faq: { question: string; answer: string }[];
}

/** MDX frontmatter for test prep pages (sat.mdx, act.mdx, psat.mdx) */
export interface TestPrepFrontmatter {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  relatedTests: string[];               // Slugs of related test prep pages
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  faq: { question: string; answer: string }[];
}

/** Single testimonial entry in testimonials.json */
export interface Testimonial {
  id: string;                            // Unique ID, e.g. "t-001"
  quote: string;                         // Full testimonial text
  author: string;                        // Parent name, e.g. "Sarah M."
  relation: string;                      // Relationship, e.g. "Parent of 3rd grader"
  rating: number;                        // 1-5 star rating
  highlight?: string;                    // Optional badge text, e.g. "Reading Growth"
  program?: string;                      // Associated program slug (for filtering)
  featured: boolean;                     // Show on homepage
  source: 'google' | 'direct' | 'other';
}

/** FAQ entry in faq.json */
export interface FAQEntry {
  id: string;                            // Unique ID, e.g. "faq-pricing-001"
  category: 'programs' | 'logistics' | 'pricing' | 'enrollment' | 'test-prep';
  question: string;
  answer: string;                        // Supports basic markdown
  order: number;                         // Sort order within category
}

/** Location entry in locations.json */
export interface Location {
  id: string;
  name: string;                          // e.g. "Cedar Tutoring Academy — Main Center"
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;                        // Pre-formatted full address string
  };
  phone: string;                         // e.g. "(555) 123-4567"
  email: string;
  hours: {
    label: string;                       // e.g. "Monday - Friday"
    time: string;                        // e.g. "3:00 PM - 8:00 PM"
  }[];
  coordinates: { lat: number; lng: number };
  mapUrl: string;                        // Google Maps link
  serviceArea: string[];                 // Neighborhoods/cities served
  image?: string;                        // Facility photo path
}

/** Site-wide metadata defaults in site-metadata.ts */
export interface SiteMetadata {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  socialLinks: { platform: string; url: string }[];
  phone: string;
  email: string;
}
```

**Phase 2 evolution:** Migrate content to a headless CMS (Sanity or Contentful) when non-developer editing is required. The content layer is designed to be swappable — components consume typed data, not CMS-specific APIs.

**Why not CMS from day one?** Phase 1 is a finite content set unlikely to change weekly. File-based content is simpler to version, review, deploy, and type-check. CMS adds complexity and cost that isn't justified until content velocity demands it.

### Asset Strategy

- **Images:** WebP format with JPEG fallback. All served through `next/image` for automatic optimization, lazy loading, and responsive srcsets. Hero images preloaded.
- **Fonts:** Loaded via `next/font/google` (Inter for body, plus a display font TBD by Oracle). Font display: swap.
- **Icons:** Lucide React (consistent with shadcn/ui). No icon fonts.
- **Logo:** SVG in `/public/images/logos/`, multiple variants (full, mark, dark, light).

---

## B. Technical Architecture

### Rendering Strategy (SSR vs SSG)

| Page | Strategy | Rationale |
|------|----------|-----------|
| Homepage | SSG | Content changes infrequently. Maximum performance. |
| Program pages (math, reading, etc.) | SSG | Static content from MDX files. |
| Test Prep pages | SSG | Same as programs. |
| About, FAQ, Reviews | SSG | Static content. |
| Locations | SSG | Rarely changes. Rebuild on location update. |
| Transportation | SSG | Static informational. |
| Pricing | SSG | Content changes quarterly at most. |
| Book Assessment | SSG (shell) + Client form | Page structure is static; form is interactive client component. |
| API routes | Dynamic | Form submissions, future portal endpoints. |

**All marketing pages are statically generated at build time.** This gives sub-100ms TTFB, excellent Core Web Vitals, and zero server costs. Content updates trigger a rebuild via CI/CD.

### Data Fetching Strategy

**Phase 1:**
- No runtime data fetching for marketing pages
- Content is compiled at build time from MDX/JSON files
- Form submissions POST to API routes → forward to email/webhook
- No database required

**Phase 2 evolution:**
- Add Prisma + PostgreSQL for user data, sessions, scheduling
- API routes expand for auth, booking, payments
- Some pages become dynamic (dashboard, scheduling)
- Marketing pages remain static

### State Management

**Phase 1:** Minimal client state.
- Form state managed by React Hook Form + Zod validation
- Mobile nav open/close state (local useState)
- No global state management library needed

**Phase 2:** Add Zustand or React Context for authenticated user state, cart/booking state.

### Routing Strategy

**Dynamic routes:** None in Phase 1 (all pages are known at build time).

**Redirects (critical for SEO):** Handled in `middleware.ts` and `next.config.ts`:

```typescript
// src/lib/redirects.ts — 301 redirect map from old WordPress URLs
export const redirects = [
  { source: '/admission', destination: '/book-assessment', permanent: true },
  { source: '/test', destination: '/test-prep', permanent: true },
  { source: '/test-pre', destination: '/test-prep', permanent: true },
  { source: '/academic-programs', destination: '/programs', permanent: true },
  { source: '/sciences', destination: '/programs/science', permanent: true },
  { source: '/writing', destination: '/programs/writing', permanent: true },
  { source: '/math', destination: '/programs/math', permanent: true },
  { source: '/reading', destination: '/programs/reading', permanent: true },
  { source: '/events', destination: '/', permanent: true },
  { source: '/events/locations', destination: '/locations', permanent: true },
  { source: '/news-events', destination: '/', permanent: true },
  { source: '/packages', destination: '/pricing', permanent: true },
  { source: '/psat', destination: '/test-prep/psat', permanent: true },
  { source: '/sat', destination: '/test-prep/sat', permanent: true },
  { source: '/act', destination: '/test-prep/act', permanent: true },
  { source: '/cooking', destination: '/programs', permanent: true },
];
```

### API Layer Design

**Phase 1 (minimal):**
```
/api/contact     → POST: receives contact form, sends email notification
/api/assessment  → POST: receives assessment booking, sends email + creates lead
```

#### Form API Contracts

```typescript
// src/types/forms.ts

/** Subject options available for assessment form (single source of truth) */
export const SUBJECT_OPTIONS = [
  { value: 'math', label: 'Math' },
  { value: 'reading', label: 'Reading' },
  { value: 'writing', label: 'Writing' },
  { value: 'science', label: 'Science' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'homework-help', label: 'Homework Help' },
  { value: 'sat', label: 'SAT Prep' },
  { value: 'act', label: 'ACT Prep' },
  { value: 'psat', label: 'PSAT Prep' },
] as const;

export const GRADE_OPTIONS = [
  { value: 'K', label: 'Kindergarten' },
  { value: '1', label: '1st Grade' },
  { value: '2', label: '2nd Grade' },
  { value: '3', label: '3rd Grade' },
  { value: '4', label: '4th Grade' },
  { value: '5', label: '5th Grade' },
  { value: '6', label: '6th Grade' },
  { value: '7', label: '7th Grade' },
  { value: '8', label: '8th Grade' },
  { value: '9', label: '9th Grade' },
  { value: '10', label: '10th Grade' },
  { value: '11', label: '11th Grade' },
  { value: '12', label: '12th Grade' },
] as const;

export const SCHEDULE_OPTIONS = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
  { value: 'flexible', label: 'Flexible' },
] as const;

/** POST /api/assessment — Request body */
export interface AssessmentRequest {
  parentName: string;           // min 2 chars
  email: string;                // valid email
  phone: string;                // valid US phone
  studentGrade: string;         // value from GRADE_OPTIONS
  subjects: string[];           // values from SUBJECT_OPTIONS, min 1
  preferredSchedule?: string;   // value from SCHEDULE_OPTIONS
  message?: string;             // max 500 chars
  honeypot?: string;            // hidden field — reject if filled (spam trap)
  consent: boolean;             // must be true
}

/** POST /api/assessment — Response */
export interface AssessmentResponse {
  success: boolean;
  message: string;              // User-facing message
  referenceId?: string;         // Unique submission ID for tracking
  errors?: Record<string, string>; // Field-level errors from server validation
}

/** POST /api/contact — Request body */
export interface ContactRequest {
  name: string;                 // min 2 chars
  email: string;                // valid email
  phone?: string;               // optional
  subject: string;              // value from CONTACT_SUBJECT_OPTIONS
  message: string;              // min 10 chars, max 1000 chars
  honeypot?: string;            // hidden field — reject if filled
  consent: boolean;
}

export const CONTACT_SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'programs', label: 'Programs & Subjects' },
  { value: 'pricing', label: 'Pricing & Packages' },
  { value: 'scheduling', label: 'Scheduling' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'other', label: 'Other' },
] as const;

/** POST /api/contact — Response (same shape as assessment) */
export type ContactResponse = AssessmentResponse;
```

#### Spam Protection Strategy

1. **Honeypot field:** Hidden input (`<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off" />`). If filled, reject silently (bots fill all fields).
2. **Rate limiting:** API routes enforce per-IP rate limits (5 submissions per 15 minutes). Implemented via in-memory rate limiter in Phase 1; upgrade to Redis or Vercel KV if needed.
3. **Server-side validation:** All Zod schemas validated server-side (never trust client-only validation).
4. **No CAPTCHA in Phase 1:** Honeypot + rate limiting are less intrusive. Add Cloudflare Turnstile if spam becomes an issue.

#### Privacy & Consent Requirements

- **Consent checkbox:** Required on all forms. Copy: "I agree to Cedar Tutoring Academy's privacy policy and consent to being contacted about my inquiry."
- **Privacy policy link:** Must be present on every form and in the footer.
- **Data handling:** Form data is forwarded via email notification to Cedar team. No PII stored in any database in Phase 1.
- **Data retention:** Email notifications are the only record. No server-side data persistence.

**Phase 2 (expanded):**
```
/api/auth/[...nextauth]  → Authentication (NextAuth.js)
/api/users/              → User profile management
/api/bookings/           → Scheduling system
/api/payments/           → Payment processing (Stripe)
/api/students/           → Student records
```

### Authentication Preparation (Phase 2 Seam)

- `middleware.ts` already exists for redirects — add auth checks here later
- Route group `(portal)/` will be added in Phase 2 for authenticated pages
- NextAuth.js (Auth.js v5) is the planned auth solution
- No auth code ships in Phase 1, but the routing structure supports adding it without restructuring

### CMS Strategy

**Phase 1:** No CMS. Content lives in versioned files.
**Phase 2 recommendation:** Sanity.io (hosted, generous free tier, great DX, real-time preview, structured content modeling). Alternative: Contentful.

**Migration path:** Components already consume typed props. When CMS is added, swap the data source in server components — no component changes needed.

---

## C. Performance Strategy

### Image Optimization

- All images served through `next/image` component
- Format: WebP (auto-negotiated by Next.js)
- Responsive sizes: `sizes` prop configured per breakpoint
- Hero images: `priority={true}` for LCP optimization
- Below-fold images: native lazy loading (default)
- Max source dimensions: 2x display size for retina
- Placeholder: `blur` with auto-generated blurDataURL for local images

### Font Loading

```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
```

- Primary: Inter (or Oracle's recommendation) via `next/font`
- Display: `swap` to prevent FOIT
- Subset: `latin` only (reduces payload)
- Variable font where available (single file, full weight range)

### Bundle Splitting

- Server Components by default — zero client JS for static content
- Client Components only for: mobile nav toggle, form interactions, carousels, scroll animations
- Dynamic imports for heavy client components (carousel, map embed)
- shadcn/ui components are tree-shakeable (only import what's used)

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 1.5s | Static generation, priority hero image, font preload |
| FID/INP | < 100ms | Minimal client JS, no heavy hydration |
| CLS | < 0.05 | Explicit image dimensions, font-display: swap, no layout shifts |
| TTFB | < 200ms | Static pages served from CDN edge |

### Caching Strategy

- Static pages cached at CDN edge indefinitely (invalidated on deploy)
- Images cached with immutable headers + content hash in filename
- API routes: no-cache (dynamic)
- Revalidation: on-demand via deploy webhook (content changes trigger rebuild)

---

## D. SEO Strategy

### Metadata Management

Every page defines metadata via Next.js `generateMetadata`:

```typescript
// Example: src/app/(marketing)/programs/math/page.tsx
export const metadata: Metadata = {
  title: 'Math Tutoring for K-12 Students | Cedar Tutoring Academy',
  description: 'Personalized math tutoring from arithmetic to calculus. Small groups, real teachers, measurable progress. Serving families in [service area].',
  openGraph: {
    title: 'Math Tutoring for K-12 Students',
    description: '...',
    images: ['/og/math-tutoring.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

**Global defaults** defined in `src/content/site-metadata.ts` and applied in root layout.
**Per-page overrides** in each page file's `metadata` export.

### Structured Data Plan

| Schema | Pages | Purpose |
|--------|-------|---------|
| `LocalBusiness` + `EducationalOrganization` | All pages (in root layout) | Local search visibility |
| `FAQPage` | FAQ, service pages with FAQ sections | Rich results in SERP |
| `Review` / `AggregateRating` | Reviews page, homepage | Star ratings in search |
| `Service` | Each program page | Service-specific rich results |
| `BreadcrumbList` | All pages with breadcrumbs | Navigation rich results |

Implemented via `<StructuredData />` component rendering `<script type="application/ld+json">`.

### Sitemap Generation

```typescript
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/programs', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/test-prep', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/book-assessment', changeFrequency: 'monthly', priority: 0.8 },
    // ... all pages
  ];
  return pages.map(p => ({ ...p, url: `https://cedartutoring.com${p.url}`, lastModified: new Date() }));
}
```

### Robots.txt

```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://cedartutoring.com/sitemap.xml',
  };
}
```

### 301 Redirect Map

See routing section above. All old WordPress URLs redirect to their new equivalents. This preserves any existing link equity and prevents 404s for bookmarked/cached pages.

### Internal Linking Strategy

- Every program page links to: related programs, test prep (if relevant), book assessment CTA, reviews
- Every test prep page links to: other test prep pages, programs hub, book assessment
- Footer contains full site navigation
- Breadcrumbs on all pages below root
- "Related Programs" section on each service page
- Persistent header CTA ("Book Assessment") on every page

---

## E. Deployment & Infrastructure

### Hosting: Vercel (Recommended)

**Why Vercel:**
- Native Next.js platform (zero config)
- Global CDN with edge caching for static pages
- Automatic preview deployments on PR
- Built-in analytics and speed insights
- Generous free tier sufficient for Phase 1 traffic
- Scales seamlessly when Phase 2 adds dynamic features

**Alternative:** Netlify (comparable, but Vercel has tighter Next.js integration).

### CI/CD Pipeline

```yaml
# Triggered on push to main
Build & Deploy:
  1. Install dependencies (npm ci)
  2. Run type check (tsc --noEmit)
  3. Run linter (eslint)
  4. Run unit tests (vitest)
  5. Run build (next build)
  6. Run E2E tests against preview (playwright)
  7. Deploy to production (auto via Vercel)

# Triggered on PR
Preview:
  1. Steps 1-5
  2. Deploy preview URL
  3. Run E2E against preview
  4. Post preview URL as PR comment
```

### Environment Strategy

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| Development | local | localhost:3000 | Local development |
| Preview | PR branches | *.vercel.app | PR review |
| Staging | `staging` | staging.cedartutoring.com | Pre-production validation |
| Production | `main` | cedartutoring.com | Live site |

### Domain/DNS

- Primary: `cedartutoring.com`
- Redirect: `www.cedartutoring.com` → `cedartutoring.com` (canonical)
- DNS: Managed via Vercel or Cloudflare
- SSL: Automatic via Vercel (Let's Encrypt)
- Current WordPress site stays live until DNS cutover on launch day

### Analytics Setup

- **Google Analytics 4:** Installed via `next/script` with `strategy="afterInteractive"`
- **Vercel Analytics:** Built-in Web Vitals monitoring (free)
- **Google Search Console:** Connected for indexing monitoring
- **Conversion tracking:** GA4 events for: form submission, CTA clicks, phone clicks, page scroll depth

---

## F. Future-Proofing (Phase 2 Seams)

### Authentication

- `middleware.ts` has the redirect logic; auth checks are added here
- Route group `(portal)/` is created for authenticated pages
- Auth.js v5 (NextAuth) with credentials + Google provider
- Session stored in database (not JWT) for revocability

### Scheduling System

- New route: `/portal/schedule`
- API routes: `/api/bookings/`
- Integration: Calendly embed initially, then custom booking system
- Database: appointment slots, student-tutor assignments

### Payments

- Stripe integration via `/api/payments/` route handlers
- Stripe Customer Portal for subscription management
- Package selection flows in `/portal/billing`

### Database Readiness

- **ORM:** Prisma (type-safe, great DX, migration system)
- **Database:** PostgreSQL (via Supabase or Vercel Postgres)
- **When:** Not until Phase 2 requires user data persistence
- **Schema seeds:** User, Student, Appointment, Payment, Enrollment

### Future API Routes

```
/api/auth/[...nextauth]
/api/users/me
/api/students/
/api/students/[id]/progress
/api/bookings/
/api/bookings/[id]
/api/payments/checkout
/api/payments/webhook
/api/notifications/
```

---

## G. Development Slices

### Slice 1: Foundation
**Goal:** Project scaffold, design system, shared layout, deploy pipeline.
**Deliverables:**
- Next.js 15 project initialized with TypeScript, Tailwind, shadcn/ui
- Design tokens configured in `tailwind.config.ts` (from Oracle's spec)
- Root layout with fonts, analytics placeholder, metadata defaults
- Header component with navigation and mobile menu
- Footer component with full site navigation
- `middleware.ts` with redirect map
- CI/CD pipeline (type check, lint, build, deploy)
- Vercel project connected, preview deploys working
- ESLint + Prettier configured
- Base component library (Button, Card, Section wrappers from shadcn)

**Independently shippable:** Yes (blank site with navigation deploys correctly)

---

### Slice 2: Homepage
**Goal:** Convert the homepage into the highest-impact page on the site.
**Deliverables:**
- Hero section: headline, support line, primary/secondary CTAs, background image
- ProofBar: review rating, grades served, small-group ratio, transportation badge
- Programs overview: 6 program cards with icons, brief descriptions, links
- "How It Works" process section: 4 steps (Assess → Match → Plan → Progress)
- Testimonial section: 4-6 curated testimonials in carousel/grid
- Differentiators section: affordability, safety, flexibility, real teachers
- Final CTA section: "Book a Free Assessment"
- Homepage SEO: metadata, structured data (LocalBusiness, AggregateRating)

**Independently shippable:** Yes (single-page site with full conversion flow)

---

### Slice 3: Programs Hub + Service Pages
**Goal:** Build the academic programs section — hub + 6 individual pages.
**Deliverables:**
- Programs hub page with static program card grid (no client-side filtering in Phase 1)
- Individual pages: Math, Reading, Writing, Science, Arabic, Homework Help
- Each service page: PageHero, problem/solution framing, process section, outcomes, FAQ, CTA
- MDX content files for each program
- Cross-linking between related programs
- Breadcrumb navigation
- Per-page SEO metadata and Service structured data

**Independently shippable:** Yes (marketing site with homepage + programs)

---

### Slice 4: Test Prep Hub
**Goal:** Unified test prep section — hub + SAT/ACT/PSAT pages.
**Deliverables:**
- Test Prep hub page with comparison of SAT vs ACT vs PSAT
- SAT page: prep framework, deliverables, timeline, FAQ
- ACT page: same structure as SAT
- PSAT page: why it matters, early prep benefits, link to SAT
- Cross-links between test prep pages and programs
- Per-page SEO and FAQ structured data

**Independently shippable:** Yes

---

### Slice 5: Trust & Conversion Pages
**Goal:** Build the pages that close the decision: reviews, FAQ, about.
**Deliverables:**
- Reviews page: AggregateRating display, curated testimonials grid, link to Google Reviews
- FAQ page: accordion with categorized questions (programs, logistics, pricing, enrollment)
- About page: mission, approach, team quality, trust signals, history
- Review structured data
- FAQ structured data

**Independently shippable:** Yes

---

### Slice 6: Logistics Pages
**Goal:** Answer the "practical questions" parents have before enrolling.
**Deliverables:**
- Locations page: address, map embed, hours, photos, service area, contact
- Transportation page: radius, process, safety, eligibility, timing
- Pricing page: plan structure, what's included, comparison table, consultation CTA
- Location structured data (address, hours, geo)

**Independently shippable:** Yes

---

### Slice 7: Enrollment Flow
**Goal:** Build the primary conversion endpoint — Book Assessment form.
**Deliverables:**
- Book Assessment page with single-page form (not multi-step)
- Form fields: parent name, email, phone, student grade, subjects of interest, preferred schedule, message
- Client-side validation (Zod + React Hook Form)
- API route for form processing (email notification to Cedar team)
- Success state with next-steps messaging
- Error handling and retry
- Thank you / confirmation view

**Independently shippable:** Yes (full conversion funnel complete)

---

### Slice 8: SEO & Polish
**Goal:** Final SEO optimization, performance audit, accessibility pass.
**Deliverables:**
- All redirects verified working
- Sitemap validated (all pages present, no broken URLs)
- Structured data validated via Google Rich Results Test
- Performance audit: all pages pass Core Web Vitals
- Accessibility audit: all pages pass WCAG 2.1 AA
- Open Graph images generated for key pages
- Internal links audited (no orphan pages, no broken links)
- Mobile responsiveness verified across devices
- Cross-browser testing (Chrome, Safari, Firefox, Edge)

**Independently shippable:** Yes (site is launch-ready after this slice)

---

### Slice 9: Launch
**Goal:** DNS cutover, monitoring, post-launch validation.
**Deliverables:**
- Final staging review with stakeholder
- DNS cutover: cedartutoring.com points to Vercel
- SSL verification
- Google Search Console updated with new sitemap
- GA4 verified receiving data
- 301 redirects verified with live traffic
- Old WordPress site archived
- Monitoring alerts configured (uptime, error rates)
- Post-launch SEO check (indexing, rankings baseline)

**Independently shippable:** N/A (this IS the ship)

---

## Appendix: Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | SSG for all marketing pages | Max performance, zero server cost, CDN-edge delivery |
| Content storage | File-based (MDX + JSON) | Version-controlled, type-safe, simple for Phase 1 scope |
| Styling | Tailwind + shadcn/ui | Utility-first, consistent design system, accessible primitives |
| Forms | React Hook Form + Zod | Type-safe validation, excellent DX, minimal bundle |
| Deployment | Vercel | Native Next.js support, global CDN, preview deploys |
| Auth (Phase 2) | Auth.js v5 | Next.js native, flexible providers, database sessions |
| Database (Phase 2) | PostgreSQL + Prisma | Type-safe ORM, migrations, scales well |
| CMS (future) | Sanity.io (recommended) | Structured content, real-time preview, good free tier |
| Analytics | GA4 + Vercel Analytics | Conversion tracking + Web Vitals monitoring |
| Testing | Vitest + Playwright | Fast unit tests + reliable E2E coverage |

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-05-02 | 1.0 | Initial architecture blueprint |
| 2026-05-02 | 1.1 | **Post-review updates:** Added typed content contracts (TypeScript interfaces for ProgramFrontmatter, TestPrepFrontmatter, Testimonial, FAQEntry, Location, SiteMetadata). Added full form API contracts (AssessmentRequest/Response, ContactRequest/Response, subject/grade/schedule option lists). Added spam protection strategy (honeypot + rate limiting). Added privacy/consent requirements. Fixed programs hub to static grid (no filtering in Phase 1). Fixed assessment form to single-page (not multi-step). |
