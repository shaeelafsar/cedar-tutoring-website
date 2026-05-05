# Cedar Tutoring Academy Website

## Google Reviews sync

Use the manual sync script to pull recent Google reviews into the Markdown content layer for the homepage and reviews page.

### 1. Create a Google Places API key

1. In Google Cloud, enable the **Places API** for the project you want to use.
2. Create an API key with Places API access.
3. Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

```env
GOOGLE_PLACES_API_KEY=your-api-key-here
GOOGLE_PLACE_ID=your-place-id-here
```

### 2. Find the Cedar Tutoring Academy Place ID

Use one of these options:

- Google Maps Place ID Finder: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
- Places API text search/details workflow in Google Maps Platform docs
- Existing Google Business Profile tooling if you already manage the listing

Copy the Place ID for Cedar Tutoring Academy into `.env.local`.

### 3. Run the sync

Preview changes without writing files:

```bash
npx tsx scripts/fetch-google-reviews.ts --dry-run
```

Write the fetched reviews into content:

```bash
npx tsx scripts/fetch-google-reviews.ts
```

The script:

- reads `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` from `.env.local`
- fetches recent Google reviews from the legacy Google Places Details endpoint
- preserves manually added testimonials
- refreshes homepage featured review IDs and reviews-page stats
- updates Markdown content under `content/pages/`
