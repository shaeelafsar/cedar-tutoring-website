# Cedar Content Editing Guide

This folder controls most of the text and structured marketing content on the Cedar Tutoring Academy website.

If you are updating **headlines, paragraphs, FAQs, pricing, testimonials, contact details, navigation links, or program copy**, you will usually work only in `content/`.

## Who this guide is for

This guide is written for:
- business owners or staff updating wording
- marketers refreshing offers or FAQs
- developers who need a content map for the site

## Quick rules before you edit

### Usually safe to change
- Headings and paragraphs
- Button labels
- FAQ questions and answers
- Testimonial quotes and names
- Pricing text
- Hours, phone, email, and address
- List items inside existing sections

### Usually **not** safe to change without a developer
- File names or folder names
- Frontmatter field names such as `component`, `seo`, `slug`, `href`, `primaryCta`, `faqItems`, `testimonialIds`, `iconName`
- Existing testimonial `id` values unless you also update every reference
- Existing program/test-prep `slug` values unless route links are updated too
- Section heading conventions inside program/test-prep templates if a developer told you those headings are required

## How the content folder is organized

| Path | What it controls |
| --- | --- |
| `content/site/metadata.md` | Business info, navigation, footer links, phone, email, address |
| `content/pages/home/` | Homepage sections |
| `content/programs/` | Programs hub and individual program pages |
| `content/pages/test-prep/` | Test Prep hub and individual SAT/ACT/PSAT pages |
| `content/pages/about/` | About page sections |
| `content/pages/reviews/` | Reviews page plus reusable testimonial library |
| `content/pages/pricing/_page.md` | Pricing page content, pricing tiers, pricing FAQ |
| `content/pages/faq/_page.md` | FAQ page content |
| `content/pages/locations/_page.md` | Locations page content, hours, service areas |
| `content/pages/book-assessment/` | Book Assessment page content and trust panel |

## How each file works

Each content file has two parts:

1. **YAML frontmatter** at the top between `---` lines
2. **Markdown body** below it

### Example

```md
---
eyebrow: "Plano, TX • K–12 tutoring & test prep"
primaryCta:
  label: "Book a Free Assessment"
  href: "/book-assessment"
---

# Personalized tutoring that helps Plano students catch up, keep up, and feel confident again.

From early reading to SAT prep, Cedar pairs students with caring local tutors...
```

In that example:
- `eyebrow` and `primaryCta` are structured fields used by the page component
- the `#` heading and paragraph are the visible page copy

## File-to-page mapping

### Site-wide content

| File | Used on |
| --- | --- |
| `content/site/metadata.md` | Header, footer, contact details, global business metadata |

### Homepage

| File | Controls |
| --- | --- |
| `content/pages/home/hero.md` | Top headline, subheadline, hero buttons, hero stats |
| `content/pages/home/proof-bar.md` | Trust badges below the hero |
| `content/pages/home/testimonials.md` | Homepage testimonial heading and featured testimonial IDs |
| `content/pages/home/programs.md` | Homepage programs section heading and intro |
| `content/pages/home/how-it-works.md` | Homepage process steps |
| `content/pages/home/why-cedar.md` | Homepage differentiators/cards |
| `content/pages/home/cta.md` | Homepage final CTA section |

### Programs

| File | URL |
| --- | --- |
| `content/programs/_hub.md` | `/programs` |
| `content/programs/math.md` | `/programs/math` |
| `content/programs/reading.md` | `/programs/reading` |
| `content/programs/writing.md` | `/programs/writing` |
| `content/programs/science.md` | `/programs/science` |
| `content/programs/arabic.md` | `/programs/arabic` |
| `content/programs/homework-help.md` | `/programs/homework-help` |

### Test Prep

| File | URL |
| --- | --- |
| `content/pages/test-prep/_hub.md` | `/test-prep` |
| `content/pages/test-prep/sat.md` | `/test-prep/sat` |
| `content/pages/test-prep/act.md` | `/test-prep/act` |
| `content/pages/test-prep/psat.md` | `/test-prep/psat` |

### Other marketing pages

| File | Controls |
| --- | --- |
| `content/pages/about/hero.md` | About page hero |
| `content/pages/about/stats.md` | About page stats strip |
| `content/pages/about/story.md` | Story, mission, values intro |
| `content/pages/about/values.md` | About page differentiator cards |
| `content/pages/about/team.md` | Team member cards and bios |
| `content/pages/about/cta.md` | About page final CTA |
| `content/pages/reviews/_page.md` | Reviews page hero, stats, filters, final CTA |
| `content/pages/reviews/testimonials.md` | Master testimonial library used across the site |
| `content/pages/pricing/_page.md` | Pricing page hero, tier cards, notes, FAQ |
| `content/pages/faq/_page.md` | FAQ page hero, categories, answers, CTA |
| `content/pages/locations/_page.md` | Location cards, hours, service areas |
| `content/pages/book-assessment/_page.md` | Booking page hero, steps, booking FAQ |
| `content/pages/book-assessment/trust.md` | Trust panel shown on the booking page |

## Common editing tasks

### 1. Change the homepage headline

Edit: `content/pages/home/hero.md`

Before:

```md
# Personalized tutoring that helps Plano students catch up, keep up, and feel confident again.
```

After:

```md
# Personalized tutoring that helps Plano students feel capable, prepared, and less stressed after school.
```

### 2. Update a hero button label

Edit the frontmatter in `content/pages/home/hero.md`.

Before:

```yaml
primaryCta:
  label: "Book a Free Assessment"
  href: "/book-assessment"
```

After:

```yaml
primaryCta:
  label: "Schedule a Free Assessment"
  href: "/book-assessment"
```

### 3. Add a new FAQ item

Edit: `content/pages/faq/_page.md`

Add a new item inside `faqItems:`.

```yaml
faqItems:
  - category: "Scheduling"
    question: "Do you offer Saturday tutoring?"
    answer: "Yes. Cedar offers Saturday sessions at the Plano center based on availability."
```

Tip: keep indentation exactly aligned with the other items.

### 4. Add or remove a testimonial

Edit: `content/pages/reviews/testimonials.md`

Add a new block inside `testimonials:`.

```yaml
- id: "math-3"
  quote: "Cedar helped our daughter slow down, ask better questions, and stop shutting down during math homework."
  author: "Sara M."
  relation: "Parent of a 6th grader"
  location: "Plano, TX"
  rating: 5
  badge: "More confidence"
  programSlugs:
    - "math"
  source: "direct"
```

To remove a testimonial, delete the whole block.

Important:
- if the testimonial ID is featured on the homepage, remove it there too
- do not casually rename existing `id` values

### 5. Change which testimonials appear on the homepage

Edit: `content/pages/home/testimonials.md`

Look for the `featuredIds:` list.

```yaml
featuredIds:
  - "math-1"
  - "reading-2"
  - "google-jane-doe-1735344000"
```

You can replace IDs in this list with other testimonial IDs that already exist in `content/pages/reviews/testimonials.md`.

### 6. Update pricing

Edit: `content/pages/pricing/_page.md`

Example fields you can safely change inside `pricingTiers:`:

```yaml
pricingTiers:
  - id: "individual-sessions"
    name: "As-Needed Tutoring"
    priceLabel: "$40"
    cadence: "per 60-minute session"
    description: "Flexible support for families who want occasional tutoring help."
    features:
      - "One-on-one support"
      - "Flexible scheduling"
```

Safe pricing edits:
- `name`
- `priceLabel`
- `cadence`
- `description`
- list items under `features`

### 7. Update team bios

Edit: `content/pages/about/team.md`

You can usually change:
- names
- roles/titles
- bio text
- credential text

Be careful not to change image keys or component field names unless a developer asks you to.

### 8. Update hours, address, phone, or email

Edit: `content/site/metadata.md`

Example:

```yaml
site:
  phone: "(469) 757-2220"
  email: "info@cedartutoring.com"
  address:
    street: "3100 Independence Pkwy #311"
    city: "Plano"
    state: "TX"
    zip: "75075"
```

### 9. Change navigation or footer links

Edit: `content/site/metadata.md`

Header links live under `navigation:` and footer links live under `footerNav:`.

Example:

```yaml
navigation:
  - label: "Programs"
    href: "/programs"
```

Safe edits:
- change a label
- change a link
- add a new item using the same structure
- remove an item

### 10. Add a new program page

This is a more advanced content task.

1. Duplicate a similar file from `content/programs/`
2. Rename the copy, for example `content/programs/study-skills.md`
3. Update the text and frontmatter values
4. If needed, add the new page to navigation in `content/site/metadata.md`

Safe fields to update in the copied file:
- `slug`
- `title`
- `shortTitle`
- `shortDescription`
- `grades`
- `faq`
- page copy in the Markdown body

For the safest result, reuse one of the icon names already in use.

## What is safe to change vs. what breaks things

| Safe changes | Risky changes |
| --- | --- |
| Rewriting copy | Renaming files |
| Updating buttons | Renaming frontmatter fields |
| Editing FAQs | Changing slugs without updating routes/links |
| Editing testimonial quotes | Renaming testimonial IDs that are referenced elsewhere |
| Updating pricing text | Changing `component` values |
| Updating hours/contact info | Inventing new field shapes that do not match nearby examples |

## How to preview changes locally

### Option 1: Local preview for editors or developers

From the project root:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Option 2: Final validation before publishing

```bash
npm run build
```

If the build passes, the site content format is valid enough for production.

## Troubleshooting tips

- **YAML indentation matters.** Keep spacing exactly aligned with nearby entries.
- **When in doubt, copy an existing pattern.** If one file already does what you need, reuse that structure.
- **Use quotes if punctuation looks risky.** This helps avoid YAML parsing mistakes.
- **Testimonials live in one place.** The main testimonial library is `content/pages/reviews/testimonials.md`.
- **Navigation and contact info live in one place.** Update `content/site/metadata.md`.
- **Featured testimonial IDs must exist.** If an ID is missing, the homepage or reviews page can break.
- **Slugs drive URLs.** Changing `slug: "math"` changes the page path for that item.

## Rule of thumb

If you are changing **words, prices, links, testimonials, FAQs, or contact details**, you are probably safe.

If you are changing **field names, file names, IDs, slugs, or page structure**, involve a developer.
