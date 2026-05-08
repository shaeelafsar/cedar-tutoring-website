# SKILL: Click-Through Smoke Testing

**Owner:** Mouse (QA)  
**Created:** 2026-05-07T19:02:14-05:00  
**Script:** `scripts/smoke-clickthrough.mjs`

---

## Problem This Solves

Route-load-only smoke tests (load page, check h1, check footer) create **false confidence**. They cannot detect:
- CTAs with raw `href="/pricing"` that miss Next.js basePath injection → navigates to 404
- `<link rel="preload">` with wrong path → silent console error on every page  
- Client-side env vars unavailable after hydration producing wrong asset URLs
- Mobile hamburger nav broken or links inside it missing basePath
- Broken images that appear in a screenshot but have `naturalWidth=0`

**A static screenshot or route-load check will never catch any of these.**

---

## Canonical Check List (9 checks per route)

| # | Check | Tool | What it catches |
|---|-------|------|----------------|
| 1 | HTTP 200 + loads | `page.goto()` response status | Hard 404/500 |
| 2 | h1 present, non-empty | `page.locator('h1').count()` | Blank/broken pages |
| 3 | Header nav hrefs contain basePath | `evaluateAll` on `header a[href]` | Raw hrefs missing prefix |
| 4 | Footer nav hrefs contain basePath | Same on `footer a[href]` | Same |
| 5 | CTA click-through | Collect hrefs matching `/book|assess|trial|contact|enroll|start|begin|schedule/i`; navigate to each internal one; verify HTTP 200 + h1 | Dead CTAs, wrong hrefs |
| 6 | Dead-link HEAD sweep | `fetch(url, { method: 'HEAD' })` on all unique internal hrefs | 404 links |
| 7 | Image naturalWidth > 0 | `page.evaluate(() => document.images)` after `networkidle` | Broken images |
| 8 | Scroll-to-bottom + screenshot | `window.scrollTo(0, scrollHeight)` → wait 800ms → screenshot | whileInView reveal bugs |
| 9 | Mobile hamburger opens + nav links ok | 375×812 viewport; click hamburger; verify sheet has links with basePath | Mobile nav failures |

---

## basePath Pattern (GitHub Pages)

For a Next.js site deployed at `shaeelafsar.github.io/cedar-tutoring-website`:
- `basePath = "/cedar-tutoring-website"`
- Every internal `<a href>` must contain this prefix after Next.js Link injection
- Raw `href="/pricing"` skips injection → **lands on GitHub root 404**
- `DEPLOY_TARGET` (without `NEXT_PUBLIC_`) is unavailable client-side → `imagePath()` returns wrong path → second broken preload injected at hydration
- **Fix pattern:** Use `NEXT_PUBLIC_` prefix for any env var consumed by client components

---

## CTA Classification

```
internal-abs    → href starts with BASE URL        → navigate + verify
internal-path   → href starts with BASE_PATH       → navigate + verify
tel:            → telephone link                    → record, skip
mailto:         → email link                        → record, skip
external        → different origin                  → record, skip
calendly        → calendly.com or Calendly trigger  → record, skip
button-nolink   → <button> with no href             → record, may need JS interaction
```

---

## False Positive Filter

The following console errors are **not real app bugs** — filter them:
```regex
/cookie.*has been rejected.*cross-site|samesite|calendly|stripe|datadog|segment|hotjar|googletagmanager|gtag|analytics/i
```
Next.js link prefetch `ERR_ABORTED` events appear in `requestfailed` but NOT in `page.on('console')` — they are normal prefetch cancellations. **Do not flag them.**

---

## Script Usage

```bash
# Against live GitHub Pages deploy
node scripts/smoke-clickthrough.mjs

# Results saved to:
# .squad/agents/mouse/last-smoke-clickthrough.json   (full structured results)
# .squad/agents/mouse/screenshots/smoke-{route}-{vp}-{top|bottom}.png
```

---

## Lessons from First Real Run (2026-05-07)

1. **All 20 sitemap routes: clean** — basePath bug from pricing-page era is fixed. No CTA dead links.
2. **One residual P1:** `<link rel="preload" href="/images/logos/cedar-logo-original.jpg">` fires HTTP 404 on every page. Root: `DEPLOY_TARGET` not `NEXT_PUBLIC_`. Logo visually renders; pure console noise.
3. **Mobile: all passing** — hamburger, nav links, no h-scroll.
4. **Sitemap has 20 routes** — `/free-trial` (redirect) and `/privacy-policy` excluded from sitemap, both accessible and functional.
5. `naturalWidth` check missed logo preload 404 because `<img>` itself loads from correct path — the 404 comes from the injected `<link>` tag, not the image element. **Lesson:** Add `page.on('response')` 404 sweep as a separate check from image naturalWidth.

---

## Upgrade Path for Next Run

- Add `page.on('response', resp => { if(resp.status() === 404) ... })` to capture resource-level 404s (catches preload links, not just img elements)
- Add Calendly embed verification for `/book-assessment` (already in old smoke-deployed.mjs — port to this script)
- Add `free-trial` redirect verification (wait for URL change to `/book-assessment`)
