# Branding favicon fix

**Date:** 2026-05-09T10:39:20-05:00
**By:** Trinity (Frontend Engineer)
**Status:** Proposed

## What was broken

The site still shipped the default Next.js favicon at `src/app/favicon.ico`. It was a 25,931-byte ICO whose SHA-256 hash matched both live deployments before this fix (`2b8ad2d33455a8f736fc3a8ebf8f0bdea8848ad4c0db48a2833bd0f9cd775932`), so browser tabs showed the default Next.js triangle instead of Cedar branding.

## What changed

Generated a Cedar icon set from the existing repo asset `public/images/logos/cedar-logo-original.jpg`:

- `src/app/favicon.ico` — legacy multi-size ICO (16×16, 32×32, 48×48)
- `src/app/icon.svg` — modern vector-file convention using the Cedar icon crop
- `src/app/icon.png` — 32×32 raster fallback
- `src/app/apple-icon.png` — 180×180 iOS home-screen icon
- `public/og-image.png` — 1200×630 social preview image

Added `src/lib/branding.ts` as the canonical code reference for the Cedar logo path, alt text, intrinsic dimensions, and social image path. Header logo rendering now consumes that source of truth and declares explicit `sizes` while preserving priority loading.

## Canonical assets

- Full logo source: `public/images/logos/cedar-logo-original.jpg` (1915×1061 JPEG)
- Browser/app icons: `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/icon.png`, `src/app/apple-icon.png`
- Social cards: `public/og-image.png`, referenced through `DEFAULT_OG_IMAGE` in `src/lib/seo.ts`

## Validation

- `npm run build` passes.
- Focused ESLint for changed source files passes.
- Local dev server returned 200 for `/icon.svg`, `/favicon.ico`, `/apple-icon.png`, and `/og-image.png` with the expected content types.
