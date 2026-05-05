# Trinity Decision Inbox — Markdown Content Layer Migration

- **Date:** 2026-05-04T19:26:14.937-05:00
- **Requested by:** Shaeel Afsar
- **Agent:** Trinity

## Proposed decision
Adopt Markdown files with YAML frontmatter as the canonical content source for Cedar marketing pages, programs, test prep pages, and site metadata.

## What changed
- Each page section now has its own Markdown file (for example `content/pages/home/hero.md`, `content/pages/home/cta.md`, `content/pages/about/story.md`).
- Reusable collections that still feed multiple surfaces now live in clearly named Markdown files tied to the page/domain that owns them (for example `content/pages/reviews/testimonials.md`, `content/pages/faq/_page.md`, `content/site/metadata.md`).
- Content loaders now read from the filesystem with `gray-matter`, validate frontmatter with Zod, and parse Markdown body content with `remark`-backed utilities.
- Legacy JSON files under `content/` were removed after migration.

## Why
- Editors can now update copy in a component-level file without navigating large JSON objects.
- The directory structure maps much more cleanly to the rendered site structure.
- Markdown body copy is easier to scan and edit than nested JSON strings.
- Type safety and static-export compatibility were preserved.

## Trade-offs
- Loader logic is more sophisticated because it now parses Markdown body sections instead of static JSON imports.
- Some repeated structured data (filters, testimonials, pricing tiers, nav trees) still lives in frontmatter arrays to keep component data typed and predictable.

## Validation
- `npm run build` ✅
- `npm run lint` ⚠️ still blocked by pre-existing `.squad/templates/ralph-triage.js` issues unrelated to the migration
