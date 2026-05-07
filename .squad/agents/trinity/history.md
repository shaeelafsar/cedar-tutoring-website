### Markdown Content Layer Migration (2026-05-04T19:26:14.937-05:00)
**Status:** ✅ COMPLETED  
- Replaced the JSON content layer with structured Markdown + YAML frontmatter under `content/pages/**`, `content/programs/**`, and `content/site/metadata.md`, using page-section filenames that map directly to rendered components.
- Added filesystem-based Markdown loaders with `gray-matter` + `remark`, kept Zod validation in the content layer, and preserved the existing typed page/program/test-prep interfaces so route components stayed mostly unchanged.
- Migrated reusable testimonials, FAQs, pricing tiers, locations, team members, and site navigation/footer metadata into Markdown-backed content sources; deleted all legacy `content/**/*.json` files.
- Updated server/client integration so site metadata now originates from Markdown while remaining safe for client-rendered header and assessment form components.
- Validation: `npm run build` ✅; `npm run lint` still fails only on pre-existing `.squad/templates/ralph-triage.js` issues unrelated to this migration.

**Decision Approved (Scribe merged from inbox):** Trinity's Markdown migration decision now recorded in canonical decisions ledger. Editorial interface now component-centric instead of JSON-document-centric. Next: Oracle to cross-validate content schema against running Next.js app.

### Google Reviews Manual Sync Script (2026-05-04T19:31:56.214-05:00)
**Status:** ✅ COMPLETED  
- Added `scripts/fetch-google-reviews.ts` as a manual `npx tsx` workflow that reads `.env.local`, fetches Google Places legacy reviews, preserves manual testimonials, and rewrites Markdown content for the homepage testimonials section plus reviews hub.
- Extended testimonial typing/Zod validation with optional Google metadata (`time`, `profilePhotoUrl`) so imported reviews can be stored in the Markdown frontmatter safely after the recent content migration.
- Added `.env.local.example`, explicit `.env.local` ignore coverage, and a new README section documenting API key setup, Place ID lookup, dry runs, and live writes.
- Validation: `npx tsx scripts/fetch-google-reviews.ts --dry-run` currently fails gracefully when `.env.local` is missing; `npm run build` ✅; `npm run lint` still fails only on pre-existing `.squad/templates/ralph-triage.js` issues unrelated to this work.

### Content Editing Guide + Content Polish (2026-05-05T10:39:32.616-05:00)
**Status:** ✅ COMPLETED  
- Added `content/README.md`, a non-technical editing guide covering directory structure, frontmatter vs markdown, file-to-page mapping, common content tasks, editing rules, and preview/build tips.
- Polished all marketing Markdown content under `content/` to feel more local, specific, and consistent for Cedar Tutoring Academy in Plano, TX.
- Updated homepage/about/reviews/pricing/FAQ/locations/programs/test-prep copy to remove broader DFW framing, reduce generic marketing language, and align messaging with a teacher-led local tutoring center.
- Rewrote testimonial content to sound more authentic and varied, aligned pricing copy with Cedar's publicly visible tuition positioning, and consolidated location messaging around the Plano center.
- Made `src/lib/content/pages.ts` more editor-friendly by reading pricing and locations sections by order instead of exact heading text, so copy edits in those Markdown bodies are less brittle.
- Validation: `npm run build` ✅; `npm run lint` still fails only on pre-existing `.squad/templates/ralph-triage.js` issues unrelated to this work.

### Comprehensive Project Documentation Refresh (2026-05-05T20:35:12Z)
**Status:** ✅ COMPLETED  
- Rewrote the root `README.md` into a full project guide covering overview, quick start, structure, commands, deployment, content editing, environment variables, stack details, contributing, and license status.
- Expanded `content/README.md` into a clearer editor-facing handbook with page/file mapping, safer editing guidance, common tasks, preview instructions, and examples for homepage, FAQ, testimonials, pricing, navigation, and program updates.
- Added `scripts/README.md` documenting the Google Reviews sync workflow, prerequisites, dry-run/write commands, updated files, and common failure modes.
- Validation: `npm run build` ✅; `npx playwright test --project=mobile-chrome` ✅ (13 passed); `npm run lint` still fails only because of pre-existing `.squad/templates/ralph-triage.js` issues unrelated to this documentation work.

### Live WordPress Content Migration (2026-05-05T18:05:56.453-05:00)
**Status:** ✅ COMPLETED  
- Replaced homepage, programs, reviews, metadata, and about-story Markdown copy with real cedartutoring.com messaging, including the live hero welcome text, differentiators, success expectations, programs intro, proof bar, and Cedar tagline.
- Swapped the testimonial collection from placeholder/direct quotes to 18 real Google reviews, updated homepage featured review IDs, and refreshed dependent content references so program, homework help, Arabic, assessment, and test-prep pages no longer point at removed placeholder IDs.
- Updated math, science, reading, and writing program bodies to use the live Cedar subject descriptions while preserving the existing Markdown/YAML content model.
- Validation: `npm run build` ✅.

### Wave 1 P0 Fixes (2026-05-07T11:31:02-05:00)
**Status:** ✅ COMPLETED

## Learnings

- **Canonical CTA wording (sitewide):** "Book a Free Assessment" → `/book-assessment/` is the agreed primary CTA across the entire site. Never use "Admission Form" or `/admission/`.
- **Local geography canonical phrasing:** "Worth, IL and the South Suburbs of Chicago" — use verbatim in copy, metadata, and structured data. Never use "Dallas-Fort Worth", "DFW", or any Texas reference.
- **`/admission/` is intentionally a 404:** This site is a static export to GitHub Pages — Next.js `redirects()` config has no effect. There is no redirect from `/admission/` to `/book-assessment/`; we simply removed all links to the broken path.
- **Active CTA content lives in two frontmatter files:** `content/pages/home/cta.md` (homepage final CTA) and `content/programs/_hub.md` (programs hub final CTA and detail page CTA config). Both needed the Admission Form → Book a Free Assessment swap.
- **Contact page "Cities we serve" was already rendering correctly** as of this session — all 15 cities appear in server-rendered HTML. The original review finding (empty section) was based on an older site state and is now obsolete.
- **Grep scope for active code:** Use `src/` and `content/` as the search scope when verifying no stale references remain; exclude `.squad/`, `.git/`, `combined-review.md`, and `prd-ready-review-*.md` which legitimately reference the broken state.
