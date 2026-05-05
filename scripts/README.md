# Scripts

This directory contains one-off maintenance scripts for the Cedar Tutoring Academy website.

## What is in this folder

| File | Purpose |
| --- | --- |
| `fetch-google-reviews.ts` | Fetches recent Google reviews and writes them into the Markdown content layer |

## Google Reviews fetch script

### What it does

`scripts/fetch-google-reviews.ts` is a manual sync utility for refreshing review content from Google Places.

It will:
- read credentials from `.env.local`
- fetch recent Google reviews for Cedar Tutoring Academy
- keep manually written testimonials intact
- replace only the Google-sourced testimonial entries
- refresh homepage featured review IDs for recent Google reviews
- update reviews-page stats such as total review count and average rating

### Files it updates

When run without `--dry-run`, the script writes to:
- `content/pages/reviews/testimonials.md`
- `content/pages/home/testimonials.md`
- `content/pages/reviews/_page.md`

## Prerequisites

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

From the project root:

```bash
cp .env.local.example .env.local
```

Add:

```env
GOOGLE_PLACES_API_KEY=your-api-key-here
GOOGLE_PLACE_ID=your-place-id-here
```

### 3. Get a Google Places API key

In Google Cloud:
1. Create or select a project
2. Enable the **Places API**
3. Create an API key with access to the Places API
4. Paste that key into `.env.local`

### 4. Get the Cedar business Place ID

You can get the Place ID using one of these methods:
- Google Maps Platform Place ID Finder
- Places API search/details workflow
- Existing Google Business Profile tooling

Paste the Place ID into `.env.local` as `GOOGLE_PLACE_ID`.

## How to run it

### Preview changes only

```bash
npx tsx scripts/fetch-google-reviews.ts --dry-run
```

Use this first to confirm the script can authenticate and to preview what would change.

### Write changes into content files

```bash
npx tsx scripts/fetch-google-reviews.ts
```

After writing changes, review the updated Markdown files and run:

```bash
npm run build
```

## Expected behavior

The script:
- ignores empty Google review text
- sorts Google reviews by newest first
- creates stable IDs in the format `google-author-name-timestamp`
- preserves manually curated testimonials with `source: "direct"`
- updates homepage featured IDs to include the newest Google reviews

## Common errors

### Missing `.env.local`

If `.env.local` does not exist, the script fails with a message telling you to copy `.env.local.example`.

### Missing API key or Place ID

If either value is blank, the script fails before making any content changes.

### Google Places API error

If the API key, Place ID, or API permissions are wrong, the script prints the Google error response and exits.

### No reviews returned

If Google does not return reviews with text, the script exits instead of writing empty content.

## Safety notes

- This is a **manual** script. It does not run automatically in production.
- `.env.local` should never be committed.
- Always prefer a dry run first.
- Review the resulting Git diff before committing.
