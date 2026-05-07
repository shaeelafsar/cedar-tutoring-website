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
- **Founder name is Asmah (not Amina Rahman):** `content/pages/about/team.md` previously listed "Amina Rahman" as Founder & Director — a placeholder name. Corrected to `Asmah` per story.md and owner decision (Wave 2 P0 #5). Portrait renamed from `amina-rahman.svg` → `asmah.svg` (still a placeholder SVG; owner will supply real photo pre-launch).
- **Web3Forms integration pattern:** POST to `https://api.web3forms.com/submit` with `Content-Type: application/json`; body must include `access_key`, `subject`, `from_name`, and all form fields, plus `botcheck: ""` (native honeypot). Check `response.ok && data.success` for success. Key stored as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (inlined at build time — deploy must have it set in environment). If key is missing at runtime, surface a friendly error referencing phone + email rather than crashing.
- **Dedicated submitError state for API failures:** When a form has both field-level validation errors and possible API/network failures, use a separate `submitError: string | null` state rather than repurposing a field's error slot. Show it in its own role="alert" banner above the form.
- **Privacy policy pattern for this codebase:** No content loader needed — render JSX directly in the Server Component page file. Use `PageHero` + `Reveal` for consistent shell. Import `SITE_CONFIG` for real contact details. Add a pending-legal-review banner (`bg-amber-50`) until lawyer signs off. Use `prose prose-slate` Tailwind class for readable long-form text.
- **Hero heading lives in Markdown body H1, not frontmatter:** `content/pages/home/hero.md` heading is parsed via `parseMarkdownPage()` from the `# H1` line in the body — `eyebrow` is a separate frontmatter field. Update the `# H1` to change the hero headline; leave `eyebrow` alone.
- **`metadata` export vs `generateMetadata` for static pages:** Static marketing pages with no dynamic data can use `export const metadata: Metadata = buildPageMetadata(...)` (plain export) rather than `export async function generateMetadata()`. Both are valid; use whichever other pages in the route group use for consistency.
- **Team page is single-member:** Placeholder teammates Nora Hassan, Omar Siddiqui, and Sarah Khan were removed; Asmah is the only real team member. Team page body copy updated to reflect single-founder framing. Layout left as-is (single-card grid is acceptable per task brief).

### Wave 2 Batch B — /pricing page rebuild (2026-05-07T12:32:14-05:00)
**Status:** ✅ COMPLETED

- Rebuilt `/pricing` page with three real pricing tiers (As-Needed Tutoring $40/session, Family Plan $699.99–$749.99/month, Homework Help $419.99–$699.99/month) matching cedartutoring.com exactly. No Academic Coaching tier (per user decision).
- Added sub-tier toggle interaction: `PricingCardInteractive.tsx` is a `'use client'` pill-button segmented control inside each monthly plan card; the page.tsx remains a Server Component.
- Extended `PricingTier` interface and `pricingTierSchema` with optional `subTiers: PricingSubTier[]` and `defaultSubTierIndex: number` fields to hold the session-count variants in YAML frontmatter.
- Data source: `content/pages/pricing/_page.md` frontmatter (YAML) — consistent with the markdown-first content convention. Kept 5 H2 sections in the markdown body for backwards-compat with `getPricingPageContent()` loader.
- FAQ answers (4 questions) written with best-effort accuracy; 4 placeholders flagged in `trinity-wave2b-pricing.md` for owner confirmation.
- Validation: `npx tsc --noEmit` ✅; `npm run lint` ✅ (only pre-existing unrelated failures).

## Learnings

- **Pricing card sub-tier pattern:** Server Component loads all tier data from markdown frontmatter (including `subTiers` array). For cards with `subTiers`, render `PricingCardInteractive` (Client Component) — pass typed props, manage `useState` for selectedIndex client-side. For static cards, render inline JSX in the Server Component.
- **Content data source for pricing:** `content/pages/pricing/_page.md` YAML frontmatter holds the full tier/sub-tier/price/FAQ/CTA data. The markdown body needs exactly 5 H2 sections for the `getPricingPageContent()` loader to not throw on section index reads.
- **Sub-tier schema extension:** Add `pricingSubTierSchema` (sessionsPerWeek: number, price: string) and make `subTiers`/`defaultSubTierIndex` optional on `pricingTierSchema` — no breaking change to existing content that doesn't have these fields.
- **Schema-as-optional pattern for deferred content:** When removing a content section that may be re-added later, make its schema fields `.optional()` rather than deleting them. This way the future re-add is purely a content-layer change (editing `_page.md`) — no schema, type, or code changes needed. Applied to `faqEyebrow`, `faqItems` in `pricingPageFrontmatterSchema` and `faqSection` in `pricingPageContentSchema` + `PricingPageContent` interface when removing the pricing FAQ on 2026-05-07.

## Cross-team updates

- **Azure migration target (2026-05-07):** Production deploy will move from GitHub Pages to Azure Static Web Apps + Functions (decision: coordinator). Free Azure credit covers low-traffic marketing site. Functions will host Web3Forms relay (secrets managed server-side). GitHub Pages remains staging target until Azure provisioned. Remember: Functions free tier = 1M executions/month, plenty for contact form.

