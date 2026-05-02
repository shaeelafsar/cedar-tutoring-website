# Mouse — Testing Spec

> **Project:** Cedar Tutoring Academy Website Rebuild
> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-05-02
> **For:** Mouse (QA Engineer)
> **Skills to reference:** webapp-testing, playwright-typescript instructions, playwright-explore-website

---

## Testing Strategy Overview

### Test Pyramid

```
         ┌───────────┐
         │   E2E     │  ← Playwright (critical user journeys)
         │  (few)    │
        ┌┴───────────┴┐
        │ Integration  │  ← Vitest + Testing Library (component interactions)
        │  (moderate)  │
       ┌┴─────────────┴┐
       │    Unit        │  ← Vitest (utilities, validators, helpers)
       │   (many)      │
       └───────────────┘
```

| Layer | Tool | What | Count (est.) |
|-------|------|------|--------------|
| Unit | Vitest | Utility functions, validators, metadata helpers, content parsers | ~30 tests |
| Integration | Vitest + React Testing Library | Component rendering, props behavior, accessibility | ~50 tests |
| E2E | Playwright | Full user journeys, forms, navigation, responsive | ~25 tests |
| Visual | Playwright screenshots | Layout regression across breakpoints | ~15 snapshots |
| SEO | Playwright + custom assertions | Meta tags, structured data, sitemap, redirects | ~20 tests |
| Performance | Lighthouse CI | Core Web Vitals thresholds | Per-page |
| Accessibility | axe-core + Playwright | WCAG 2.1 AA compliance | Per-page |

---

## Test Infrastructure Setup

### Dependencies

```json
{
  "devDependencies": {
    "vitest": "^3.x",
    "@vitejs/plugin-react": "^4.x",
    "@testing-library/react": "^16.x",
    "@testing-library/jest-dom": "^6.x",
    "@testing-library/user-event": "^14.x",
    "@playwright/test": "^1.50+",
    "axe-playwright": "^2.x",
    "@axe-core/playwright": "^4.x",
    "lighthouse": "^12.x",
    "msw": "^2.x",
    "@vitest/coverage-v8": "^3.x"
  }
}
```

### File Structure

```
tests/
├── e2e/
│   ├── homepage.spec.ts
│   ├── programs.spec.ts
│   ├── test-prep.spec.ts
│   ├── enrollment.spec.ts
│   ├── navigation.spec.ts
│   ├── redirects.spec.ts
│   ├── seo.spec.ts
│   ├── accessibility.spec.ts
│   ├── about.spec.ts
│   ├── reviews.spec.ts
│   ├── pricing.spec.ts
│   ├── transportation.spec.ts
│   ├── error-pages.spec.ts
│   ├── smoke.spec.ts
│   ├── link-check.spec.ts
│   └── launch-verification.spec.ts
├── unit/
│   ├── validators.test.ts
│   ├── metadata.test.ts
│   ├── structured-data.test.ts
│   ├── redirects.test.ts
│   └── utils.test.ts
├── integration/
│   ├── components/
│   │   ├── Header.test.tsx
│   │   ├── Footer.test.tsx
│   │   ├── AssessmentForm.test.tsx
│   │   ├── ContactForm.test.tsx
│   │   ├── TestimonialCarousel.test.tsx
│   │   ├── ProgramCard.test.tsx
│   │   ├── FAQAccordion.test.tsx
│   │   └── ProcessSteps.test.tsx
│   └── pages/
│       ├── homepage.test.tsx
│       └── programs.test.tsx
├── mocks/
│   ├── handlers.ts             # MSW request handlers
│   ├── server.ts               # MSW server setup for Vitest
│   └── browser.ts              # MSW browser setup (if needed for E2E)
├── fixtures/
│   ├── testimonials.json
│   ├── programs.json
│   └── faq.json
├── setup.ts                     # Vitest setup file
└── playwright.config.ts
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
  /* Use production build for E2E tests, not dev server.
     Dev mode misses production-only build errors, metadata, caching, and asset behavior.
     For local dev convenience, `npm run dev` can be used via BASE_URL override. */
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000, // Build can take up to 2 minutes
  },
});
```

> **Note on CI:** In CI, prefer running Playwright against the Vercel preview URL instead of a local build. Set `BASE_URL` to the preview URL and omit `webServer`. The `webServer` config above is the local development/fallback.

### Vitest Configuration (Next.js 15 App Router)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/app/**/layout.tsx', 'src/app/**/page.tsx'],
    },
    css: false,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

### Vitest Setup File

```typescript
// tests/setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Auto-cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/navigation (App Router)
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock next/font
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter', variable: '--font-sans', style: { fontFamily: 'Inter' } }),
  Newsreader: () => ({ className: 'newsreader', variable: '--font-display', style: { fontFamily: 'Newsreader' } }),
}));

// Mock MDX content imports (if using direct imports)
vi.mock('@/content/programs/*.mdx', () => ({
  default: () => null,
  frontmatter: {},
}));
```

### MSW Server Setup

```typescript
// tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### Form/API Mocking Strategy

All form submissions POST to Next.js API routes (`/api/assessment`, `/api/contact`). Tests must be deterministic — never hit real email/notification services.

**Unit/Integration tests (Vitest + MSW):**

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Happy path: assessment form
  http.post('/api/assessment', async ({ request }) => {
    const body = await request.json();
    // Validate honeypot (simulate server behavior)
    if (body.honeypot) {
      return HttpResponse.json({ success: false, message: 'Spam detected' }, { status: 400 });
    }
    return HttpResponse.json({
      success: true,
      message: 'Assessment booked successfully',
      referenceId: 'TEST-REF-001',
    });
  }),

  // Happy path: contact form
  http.post('/api/contact', async () => {
    return HttpResponse.json({
      success: true,
      message: 'Message sent successfully',
      referenceId: 'TEST-REF-002',
    });
  }),
];

// Error handler overrides (use per-test via server.use())
export const errorHandlers = {
  assessment500: http.post('/api/assessment', () =>
    HttpResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  ),
  assessmentTimeout: http.post('/api/assessment', async () => {
    await new Promise(resolve => setTimeout(resolve, 10_000));
    return HttpResponse.json({ success: true, message: 'Late response' });
  }),
  assessmentValidation: http.post('/api/assessment', () =>
    HttpResponse.json({
      success: false,
      message: 'Validation failed',
      errors: { email: 'Invalid email format', phone: 'Invalid phone number' },
    }, { status: 422 })
  ),
};
```

**Integration test wiring:**
```typescript
// In test files that need API mocking:
import { server } from '../mocks/server';
import { errorHandlers } from '../mocks/handlers';
import { beforeAll, afterEach, afterAll } from 'vitest';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Override for error scenario:
test('shows error on server failure', async () => {
  server.use(errorHandlers.assessment500);
  // ... render form, submit, assert error message
});
```

**E2E tests (Playwright):**
- E2E tests run against the real production build (via `next build && next start`).
- API routes in E2E should use **test-mode behavior**: set `TESTING=true` env var in webServer config so API routes skip email sending and return deterministic responses.
- The API route handler checks `process.env.TESTING` and short-circuits:

```typescript
// In /api/assessment/route.ts:
if (process.env.TESTING === 'true') {
  // Skip email notification, return success immediately
  return NextResponse.json({ success: true, message: 'Test mode', referenceId: 'E2E-REF' });
}
```

**External service mocking:** Phase 1 has no external services beyond email (sent from API routes). When email provider is added, use MSW to intercept the provider's API in integration tests. E2E tests skip email via the `TESTING` env flag above.

---

## Per-Page Test Cases

### Homepage (`/`)

| Test | Type | What to verify |
|------|------|----------------|
| Hero renders | E2E | H1 visible, CTA buttons present and clickable |
| ProofBar displays metrics | E2E | All trust indicators visible (rating, reviews, grades) |
| Program cards link correctly | E2E | Each card links to correct program page |
| Testimonials display | E2E | At least 3 testimonials visible, star ratings shown |
| CTA buttons navigate | E2E | "Book Assessment" navigates to `/book-assessment` |
| Responsive layout | E2E | Mobile: stacked cards, hamburger nav. Desktop: grid layout |
| SEO meta | SEO | Correct title, description, OG tags |
| Structured data | SEO | LocalBusiness + AggregateRating schemas present and valid |
| Performance | Perf | LCP < 1.5s, CLS < 0.05 |
| Accessibility | A11y | No axe violations, proper heading hierarchy |

### Programs Hub (`/programs`)

| Test | Type | What to verify |
|------|------|----------------|
| All program cards render | E2E | 6 cards: Math, Reading, Writing, Science, Arabic, Homework Help |
| Cards link to detail pages | E2E | Each card navigates to correct `/programs/[slug]` |
| Breadcrumbs correct | E2E | Home > Programs |
| Page loads without errors | E2E | No console errors, no broken images |
| Meta tags unique | SEO | Title/description differ from homepage |

### Individual Program Pages (`/programs/[slug]`)

| Test | Type | What to verify |
|------|------|----------------|
| Correct content renders | E2E | H1 matches program name, content sections present |
| FAQ accordion works | E2E | Click question → answer expands. Click again → collapses. |
| CTA navigates to assessment | E2E | "Book Assessment" link works |
| Related programs show | E2E | At least 2 related program cards displayed |
| Breadcrumbs correct | E2E | Home > Programs > [Program Name] |
| Unique metadata | SEO | Title includes program name and "Cedar Tutoring" |

### Test Prep Pages (`/test-prep`, `/test-prep/sat`, etc.)

| Test | Type | What to verify |
|------|------|----------------|
| Hub shows all test options | E2E | SAT, ACT, PSAT cards present |
| Individual pages have unique content | E2E | SAT page has SAT-specific content, not generic |
| Cross-links work | E2E | SAT page links to ACT and PSAT |
| Process steps render | E2E | 4-step diagnostic process visible |

### Book Assessment (`/book-assessment`)

| Test | Type | What to verify |
|------|------|----------------|
| Form renders all fields | E2E | All required fields present with labels |
| Empty submission blocked | E2E | Submit without filling → validation errors appear |
| Individual field validation | E2E | See form testing matrix below |
| Successful submission | E2E | Fill all fields → submit → success message appears |
| Error handling | E2E | Simulate API failure → error message shown |
| Keyboard navigation | A11y | Can tab through all fields and submit |
| Mobile form usability | E2E | Form fields full-width, touch-friendly on mobile |

### Locations (`/locations`)

| Test | Type | What to verify |
|------|------|----------------|
| Address displayed | E2E | Full address text visible |
| Phone is clickable | E2E | Phone number has `tel:` link |
| Map displays | E2E | Map element/image present |
| Hours shown | E2E | Operating hours visible |

### FAQ (`/faq`)

| Test | Type | What to verify |
|------|------|----------------|
| Accordion functionality | E2E | Questions clickable, answers reveal/hide |
| Multiple categories | E2E | All FAQ sections present |
| FAQ structured data | SEO | FAQPage schema valid in page source |

### About (`/about`)

| Test | Type | What to verify |
|------|------|----------------|
| Page loads with content | E2E | H1 visible, mission/approach sections present |
| Trust signals display | E2E | Credentials and safety indicators visible |
| Staff credibility cards | E2E | At least one tutor/staff card with name and qualifications |
| CTA navigates | E2E | "Book Assessment" or "See Programs" link works |
| Unique metadata | SEO | Title includes "About" and "Cedar Tutoring" |
| Accessibility | A11y | No axe violations |

### Reviews (`/reviews`)

| Test | Type | What to verify |
|------|------|----------------|
| Aggregate rating displays | E2E | "5.0" rating and star icons visible |
| Testimonial grid renders | E2E | At least 5 testimonial cards in grid layout |
| Google review badge | E2E | Link to Google Business page present |
| AggregateRating schema | SEO | AggregateRating structured data valid |
| CTA navigates | E2E | Conversion CTA links to `/book-assessment` |

### Pricing (`/pricing`)

| Test | Type | What to verify |
|------|------|----------------|
| Page loads with content | E2E | H1 visible, pricing model explanation present |
| Pricing cards render | E2E | At least 1 pricing tier card visible |
| Features listed | E2E | Checkmark feature list items present |
| CTA navigates | E2E | "Book Assessment" CTA links correctly |
| FAQ accordion | E2E | Pricing-specific FAQ expands/collapses |
| Unique metadata | SEO | Title includes "Pricing" |

### Transportation (`/transportation`)

| Test | Type | What to verify |
|------|------|----------------|
| Page loads with content | E2E | H1 visible, service overview present |
| Service area info | E2E | Service area or radius information displayed |
| Safety section | E2E | Safety procedures section present |
| FAQ accordion | E2E | Transportation-specific FAQ works |
| CTA navigates | E2E | "Book Assessment" link works |

### Error Pages

| Test | Type | What to verify |
|------|------|----------------|
| 404 page renders | E2E | Navigate to `/nonexistent-page` → custom 404 with helpful message and link home |
| 404 has correct status | E2E | Response status code is 404 |
| Error boundary works | E2E | (Manual/integration) Error boundary renders fallback UI, not a blank page |

### Robots & Sitemap

| Test | Type | What to verify |
|------|------|----------------|
| robots.txt accessible | SEO | GET `/robots.txt` returns 200, contains `Allow: /`, `Disallow: /api/`, sitemap reference |
| sitemap.xml accessible | SEO | GET `/sitemap.xml` returns 200, contains all marketing page URLs |
| sitemap excludes old URLs | SEO | Does NOT contain `/admission`, `/news-events`, `/academic-programs` |

---

## Critical User Journey Tests

### Journey 1: Parent Discovers → Explores → Books (Happy Path)

```typescript
test('Parent discovery to booking journey', async ({ page }) => {
  await test.step('Land on homepage', async () => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /book.*assessment/i })).toBeVisible();
  });

  await test.step('Explore programs', async () => {
    await page.getByRole('link', { name: /programs/i }).first().click();
    await expect(page).toHaveURL('/programs');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/program/i);
  });

  await test.step('View specific program', async () => {
    await page.getByRole('link', { name: /math/i }).click();
    await expect(page).toHaveURL('/programs/math');
  });

  await test.step('Navigate to book assessment', async () => {
    await page.getByRole('link', { name: /book.*assessment/i }).first().click();
    await expect(page).toHaveURL('/book-assessment');
  });

  await test.step('Fill and submit form', async () => {
    await page.getByLabel(/parent name/i).fill('Jane Smith');
    await page.getByLabel(/email/i).fill('jane@example.com');
    await page.getByLabel(/phone/i).fill('(555) 123-4567');
    await page.getByLabel(/grade/i).selectOption('5');
    await page.getByLabel(/math/i).check();
    await page.getByRole('button', { name: /submit|book/i }).click();
    await expect(page.getByText(/thank you|success/i)).toBeVisible();
  });
});
```

### Journey 2: Parent Checks Logistics

```typescript
test('Parent logistics verification journey', async ({ page }) => {
  await test.step('Check location', async () => {
    await page.goto('/locations');
    await expect(page.getByText(/address/i)).toBeVisible();
  });

  await test.step('Check transportation', async () => {
    await page.goto('/transportation');
    await expect(page.getByText(/5.mile/i)).toBeVisible();
  });

  await test.step('Check pricing', async () => {
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
```

### Journey 3: Parent Evaluates Trust

```typescript
test('Parent trust evaluation journey', async ({ page }) => {
  await test.step('Read reviews', async () => {
    await page.goto('/reviews');
    await expect(page.getByText(/5\.0/)).toBeVisible();
    await expect(page.locator('[data-testid="testimonial-card"]')).toHaveCount({ minimum: 5 });
  });

  await test.step('Check FAQ', async () => {
    await page.goto('/faq');
    const firstQuestion = page.getByRole('button').first();
    await firstQuestion.click();
    // Answer should be revealed
    await expect(page.locator('[data-state="open"]')).toBeVisible();
  });

  await test.step('Read about Cedar', async () => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
```

---

## Form Testing Matrix

### Assessment Form Fields

| Field | Valid Input | Invalid Input | Expected Error |
|-------|-----------|---------------|----------------|
| Parent Name | "Jane Smith" | "" | "Name is required" |
| Parent Name | "J" | single char | "Name must be at least 2 characters" |
| Email | "jane@example.com" | "jane@" | "Please enter a valid email" |
| Email | — | "" | "Email is required" |
| Phone | "(555) 123-4567" | "123" | "Please enter a valid phone number" |
| Phone | "5551234567" | "abc" | "Please enter a valid phone number" |
| Student Grade | "5" (selected) | none selected | "Please select a grade" |
| Subjects | ["Math"] checked | none checked | "Please select at least one subject" |
| Preferred Schedule | "Afternoon" | — | (optional, no error) |
| Message | "My child needs help" | 501+ chars | "Message must be under 500 characters" |

### Form Interaction Tests

| Scenario | Steps | Expected |
|----------|-------|----------|
| Blur validation | Tab through fields without filling | Errors appear on blur for required fields |
| Submit validation | Click submit with empty form | All required field errors shown simultaneously |
| Clear error | Field has error → user types valid input | Error disappears |
| Submit loading | Submit valid form | Button shows loading state, prevents double-submit |
| API success | Valid submission, API returns 200 | Success message, form hidden |
| API failure | Valid submission, API returns 500 | Error message, form still visible, retry possible |
| Network error | Valid submission, network disconnected | Error message with retry option |

---

## SEO Test Checklist

### Per-Page Meta Tags (all pages)

```typescript
test('SEO meta tags are correct', async ({ page }) => {
  await page.goto('/programs/math');

  await test.step('Title tag', async () => {
    await expect(page).toHaveTitle(/math.*tutor/i);
    const title = await page.title();
    expect(title.length).toBeLessThanOrEqual(60);
  });

  await test.step('Meta description', async () => {
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(50);
    expect(desc!.length).toBeLessThanOrEqual(160);
  });

  await test.step('Open Graph tags', async () => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  });

  await test.step('Canonical URL', async () => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /cedartutoring\.com/);
  });
});
```

### Structured Data Validation

```typescript
test('Structured data is valid', async ({ page }) => {
  await page.goto('/');
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  
  for (const script of scripts) {
    const data = JSON.parse(script);
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBeTruthy();
  }

  // Homepage should have LocalBusiness
  const hasLocalBusiness = scripts.some(s => s.includes('LocalBusiness'));
  expect(hasLocalBusiness).toBe(true);
});
```

### Sitemap Validation

```typescript
test('Sitemap is valid', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  
  const body = await response.text();
  expect(body).toContain('<urlset');
  expect(body).toContain('https://cedartutoring.com/');
  expect(body).toContain('/programs');
  expect(body).toContain('/test-prep');
  expect(body).toContain('/book-assessment');
  // Should NOT contain old/removed URLs
  expect(body).not.toContain('/admission');
  expect(body).not.toContain('/news-events');
});
```

### Redirect Tests

```typescript
test.describe('301 Redirects from old WordPress URLs', () => {
  const redirects = [
    { from: '/admission', to: '/book-assessment' },
    { from: '/test', to: '/test-prep' },
    { from: '/test-pre', to: '/test-prep' },
    { from: '/academic-programs', to: '/programs' },
    { from: '/sciences', to: '/programs/science' },
    { from: '/writing', to: '/programs/writing' },
    { from: '/math', to: '/programs/math' },
    { from: '/reading', to: '/programs/reading' },
    { from: '/events', to: '/' },
    { from: '/events/locations', to: '/locations' },
    { from: '/news-events', to: '/' },
    { from: '/packages', to: '/pricing' },
    { from: '/psat', to: '/test-prep/psat' },
    { from: '/sat', to: '/test-prep/sat' },
    { from: '/act', to: '/test-prep/act' },
  ];

  for (const { from, to } of redirects) {
    test(`${from} → ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      expect(response.headers()['location']).toContain(to);
    });
  }
});
```

---

## Performance Test Thresholds

| Metric | Target | Tool |
|--------|--------|------|
| LCP (Largest Contentful Paint) | < 1.5s | Lighthouse CI |
| FID (First Input Delay) / INP | < 100ms | Lighthouse CI |
| CLS (Cumulative Layout Shift) | < 0.05 | Lighthouse CI |
| TTFB (Time to First Byte) | < 200ms | Playwright timing |
| Total page weight | < 500KB (initial load) | Network tab analysis |
| JavaScript bundle | < 100KB (gzipped, initial) | Build analysis |
| Performance score | ≥ 95 | Lighthouse |
| Accessibility score | ≥ 95 | Lighthouse |
| SEO score | 100 | Lighthouse |

### Performance Test Implementation

```typescript
test('Homepage meets performance thresholds', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  
  const metrics = await page.evaluate(() => {
    return new Promise(resolve => {
      new PerformanceObserver(list => {
        const entries = list.getEntries();
        resolve({
          lcp: entries.find(e => e.entryType === 'largest-contentful-paint')?.startTime,
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  });
  
  // LCP should be under 1.5 seconds
  expect(metrics.lcp).toBeLessThan(1500);
});
```

---

## Accessibility Test Checklist

### Automated (axe-core via Playwright)

```typescript
import AxeBuilder from '@axe-core/playwright';

test('Homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

Run axe-core scan on every page. Zero tolerance for violations.

### Manual/Semi-Automated Checks

| Check | How to test | Standard |
|-------|-------------|----------|
| Keyboard navigation | Tab through entire page | All interactive elements reachable, logical order |
| Skip link | Tab from page load | "Skip to main content" link appears first |
| Focus visible | Tab through elements | Clear focus ring on all focusable elements |
| Screen reader | Test with VoiceOver/NVDA | Headings, landmarks, alt text all read correctly |
| Heading hierarchy | Inspect DOM | h1 → h2 → h3, no skipped levels |
| Landmark regions | Inspect DOM | header, main, footer, nav landmarks present |
| Image alt text | Audit all `<img>` | Descriptive, not "image.jpg" or empty for decorative |
| Form labels | Check all inputs | Every input has associated `<label>` |
| Color contrast | axe-core + manual | 4.5:1 for normal text, 3:1 for large |
| Reduced motion | Enable `prefers-reduced-motion` | Animations disabled/simplified |
| Zoom | Zoom to 200% | No content cut off, layout remains usable |
| Touch targets | Inspect on mobile | All buttons/links ≥ 44×44px |

---

## Cross-Browser/Device Matrix

### Browsers (must pass all E2E tests)

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest | P0 |
| Safari | Latest | P0 |
| Firefox | Latest | P1 |
| Edge | Latest | P1 |
| Chrome Android | Latest | P0 |
| Safari iOS | Latest | P0 |

### Devices (responsive visual checks)

| Device | Viewport | Priority |
|--------|----------|----------|
| iPhone 13/14 | 390×844 | P0 |
| iPhone SE | 375×667 | P1 |
| iPad | 768×1024 | P0 |
| iPad Pro | 1024×1366 | P1 |
| Desktop 1080p | 1920×1080 | P0 |
| Desktop 1440p | 2560×1440 | P1 |
| Pixel 5 | 393×851 | P0 |

### Visual Regression Strategy

Capture screenshots at key breakpoints (mobile, tablet, desktop) for:
- Homepage hero section
- Program cards grid
- Navigation (open and closed states)
- Footer layout
- Assessment form
- FAQ accordion (open and closed)

Use Playwright's `toHaveScreenshot()` for baseline comparison. Update baselines intentionally when design changes.

---

## CI/CD Integration

### Test Execution Order in Pipeline

```
1. Type check (tsc --noEmit)           — 10s
2. Lint (eslint)                        — 15s
3. Unit tests (vitest)                  — 20s
4. Build (next build)                   — 60s
5. E2E tests (playwright --chromium)    — 120s
6. Deploy preview
7. E2E against preview (all browsers)   — 300s
8. Accessibility scan                   — 60s
9. Performance audit (Lighthouse CI)    — 120s
```

### When to Run What

| Trigger | Tests to run |
|---------|-------------|
| Every PR | Unit + Integration + E2E (Chrome only) + Accessibility |
| Merge to main | Full browser matrix + Performance + Visual regression |
| Nightly | Full suite + Performance baseline tracking |
| Pre-launch | Full suite + Manual accessibility audit + Cross-device verification |

---

## Key Testing Principles

1. **Test the parent journey, not implementation details.** Assert on visible text, accessible roles, and URLs — not CSS classes or internal state.
2. **Every broken page from the audit gets a regression test.** The old site had `/admission` and `/test` returning 500. Our tests guarantee that never happens again.
3. **Forms are the highest-risk area.** The assessment form IS the conversion point. Test it exhaustively: validation, submission, error handling, keyboard access, mobile usability.
4. **SEO tests prevent silent regressions.** Meta tags, structured data, and redirects are invisible to visual review. Automated tests catch when someone accidentally removes or breaks them.
5. **Performance budgets are enforced in CI.** If a PR degrades LCP or bundle size past thresholds, the build fails.

---

## Smoke Test Suite

A fast, minimal suite that runs on every preview deploy and PR. Catches catastrophic regressions in < 30 seconds.

```typescript
// tests/e2e/smoke.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  const criticalPages = ['/', '/programs', '/test-prep', '/book-assessment', '/about', '/reviews', '/faq', '/locations', '/pricing', '/transportation'];

  for (const path of criticalPages) {
    test(`${path} loads without errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.getByRole('heading', { level: 1 })).toBeAttached();
      await expect(page.getByRole('navigation')).toBeAttached();
      expect(consoleErrors).toEqual([]);
    });
  }

  test('Primary CTA is reachable from homepage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /book.*assessment/i }).first().click();
    await expect(page).toHaveURL('/book-assessment');
    await expect(page.getByRole('form')).toBeAttached();
  });
});
```

---

## Link Checking Tests

Verify no broken internal links, missing images, or failed network requests.

```typescript
// tests/e2e/link-check.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Link Integrity', () => {
  test('Homepage has no broken internal links', async ({ page }) => {
    await page.goto('/');
    const links = await page.getByRole('link').all();
    const internalHrefs: string[] = [];

    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('/api')) {
        internalHrefs.push(href);
      }
    }

    // Deduplicate
    const uniqueHrefs = [...new Set(internalHrefs)];
    for (const href of uniqueHrefs) {
      const response = await page.request.get(href);
      expect(response.status(), `Broken link: ${href}`).toBeLessThan(400);
    }
  });

  test('No broken images on homepage', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth, `Broken image: ${src}`).toBeGreaterThan(0);
    }
  });
});
```

---

## Launch-Day Verification Suite

Run this against the production URL after DNS cutover. Covers everything that could go wrong during launch.

```typescript
// tests/e2e/launch-verification.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Launch Verification', () => {
  test('Homepage loads on production domain', async ({ page }) => {
    await page.goto('https://cedartutoring.com');
    await expect(page).toHaveURL(/cedartutoring\.com/);
    await expect(page.getByRole('heading', { level: 1 })).toBeAttached();
  });

  test('www redirects to apex domain', async ({ request }) => {
    const response = await request.get('https://www.cedartutoring.com', { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers()['location']).toContain('cedartutoring.com');
  });

  test('HTTPS is enforced', async ({ request }) => {
    const response = await request.get('http://cedartutoring.com', { maxRedirects: 0 });
    expect([301, 308]).toContain(response.status());
  });

  test('All WordPress redirects work in production', async ({ request }) => {
    const redirects = [
      { from: '/admission', to: '/book-assessment' },
      { from: '/test', to: '/test-prep' },
      { from: '/academic-programs', to: '/programs' },
      { from: '/packages', to: '/pricing' },
      { from: '/sat', to: '/test-prep/sat' },
    ];
    for (const { from, to } of redirects) {
      const response = await request.get(`https://cedartutoring.com${from}`, { maxRedirects: 0 });
      expect(response.status(), `Redirect failed: ${from}`).toBe(301);
      expect(response.headers()['location']).toContain(to);
    }
  });

  test('Sitemap is accessible in production', async ({ request }) => {
    const response = await request.get('https://cedartutoring.com/sitemap.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('https://cedartutoring.com/');
  });

  test('Robots.txt is accessible in production', async ({ request }) => {
    const response = await request.get('https://cedartutoring.com/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('Sitemap:');
    expect(body).not.toContain('Disallow: /');
  });

  test('Assessment form renders and is interactive', async ({ page }) => {
    await page.goto('https://cedartutoring.com/book-assessment');
    await expect(page.getByRole('form')).toBeAttached();
    await expect(page.getByLabel(/parent name/i)).toBeAttached();
    await expect(page.getByRole('button', { name: /submit|book/i })).toBeAttached();
  });

  test('No console errors on critical pages', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    for (const path of ['/', '/programs', '/book-assessment']) {
      await page.goto(`https://cedartutoring.com${path}`);
    }
    expect(errors).toEqual([]);
  });
});
```

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-05-02 | 1.0 | Initial testing spec |
| 2026-05-02 | 1.1 | **Post-review updates:** Changed Playwright `webServer` from `npm run dev` to `npm run build && npm run start` (production build for E2E). Added note on using Vercel preview URL in CI. Expanded Vitest config with jsdom globals, `@vitest/coverage-v8`, CSS disable, proper setup file. Added complete Vitest setup file with mocks for `next/navigation`, `next/image`, `next/link`, `next/font`, and MDX imports. Added `@testing-library/user-event` and `msw` to dependencies. Added full MSW-based form/API mocking strategy with request handlers, error overrides, and E2E test-mode approach. Added test coverage for About, Reviews, Pricing, Transportation pages. Added 404/error page tests. Added robots.txt and sitemap validation tests. Added smoke test suite (all critical pages load, no console errors, primary CTA reachable). Added link checking tests (broken internal links, broken images). Added launch-day verification suite (production domain, HTTPS, www redirect, redirects, sitemap, robots, form rendering, console errors). Added `ContactForm.test.tsx` to integration test file list. |
