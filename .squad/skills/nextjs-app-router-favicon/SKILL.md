---
name: "nextjs-app-router-favicon"
description: "Replace default Next.js App Router favicons and normalize site branding/social metadata from an existing logo asset."
domain: "nextjs-branding"
confidence: "low"
source: "observed"
---

## Context
Use this skill when a Next.js App Router site still shows the default favicon, needs a brand icon set, or needs logo/social-card metadata normalized. Only generate derivatives from an existing approved brand asset in the repository; do not invent or download a logo.

## Patterns
- Discover existing logo assets first (`public/`, `src/assets/`, `assets/`, `src/app/`) and record format, dimensions, byte size, and hash.
- Check App Router conventions in the app directory:
  - `app/favicon.ico` must live at the root app segment and is used for legacy browser favicon support.
  - `app/icon.svg` or `app/icon.png` supplies modern app icon links.
  - `app/apple-icon.png` supplies iOS home-screen icon links.
- Avoid manual `metadata.icons` unless the file conventions cannot express the desired output.
- Generate at least:
  - multi-size `favicon.ico` (16×16, 32×32, optionally 48×48)
  - `icon.svg` when practical
  - `apple-icon.png` at 180×180
  - optional `icon.png` at 32×32 for explicit raster fallback
- If social metadata is missing or points at an unsuitable file, create/reuse `public/og-image.png` at 1200×630 and reference it from `metadata.openGraph.images` and `metadata.twitter.images`.
- For logo `<Image>` usage, centralize path/alt/intrinsic dimensions in a branding constant, keep aspect ratio intact, add `priority` only for above-fold logo instances, and include explicit `sizes` matching rendered widths.

## Examples
```ts
export const BRAND_LOGO = {
  src: "/images/logos/cedar-logo-original.jpg",
  alt: "Cedar Tutoring Academy",
  width: 240,
  height: 133,
} as const;

export const BRAND_SOCIAL_IMAGE = "/og-image.png";
```

```tsx
<Image
  src={imagePath(BRAND_LOGO.src)}
  alt={BRAND_LOGO.alt}
  width={BRAND_LOGO.width}
  height={BRAND_LOGO.height}
  sizes="(min-width: 768px) 101px, 72px"
  className="h-10 w-auto md:h-14"
  priority
/>
```

## Anti-Patterns
- Do not leave the generated `src/app/favicon.ico` from the Next.js starter in place.
- Do not generate a brand/logo concept from scratch without owner input.
- Do not add duplicate manual `<link rel="icon">` tags when App Router file conventions cover the need.
- Do not use CSS that changes logo aspect ratio (`w-* h-*` without `w-auto`/`h-auto` safeguards).
- Do not use `placeholder="blur"` without a valid `blurDataURL`.
