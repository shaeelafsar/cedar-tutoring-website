# Cedar Content Editing Guide

This folder controls most of the words shown on the Cedar Tutoring Academy website.

If you are only updating copy, pricing, FAQs, testimonials, or navigation links, this is usually the only folder you need.

## 1) How the content folder is organized

- `content/site/metadata.md`  
  Controls site-wide details like the business name, phone number, email, address, main navigation, and footer links.

- `content/pages/home/`  
  Controls the homepage, one section per file.

- `content/programs/`  
  Controls the Programs page and each individual program page.

- `content/pages/test-prep/`  
  Controls the Test Prep page and each test-prep detail page.

- `content/pages/about/`  
  Controls the About page sections.

- `content/pages/reviews/`  
  Controls the Reviews page and the reusable testimonial library.

- `content/pages/pricing/_page.md`  
  Controls the entire Pricing page, including pricing cards and pricing FAQ.

- `content/pages/faq/_page.md`  
  Controls the entire FAQ page.

- `content/pages/locations/_page.md`  
  Controls the Locations page and location cards.

- `content/pages/book-assessment/`  
  Controls the Book Assessment page and trust panel.

## 2) Frontmatter vs. markdown body

Every content file has **2 parts**:

1. **YAML frontmatter** at the top (between `---` lines)  
   This holds structured fields like buttons, prices, FAQ items, testimonial lists, and navigation links.
2. **Markdown body** underneath  
   This holds page headings, paragraphs, and section text.

Example:

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

- `eyebrow`, `primaryCta.label`, and `primaryCta.href` are **frontmatter fields**
- The `#` heading and paragraph are the **markdown body**

## 3) File-to-page mapping

| File | What it controls on the site |
| --- | --- |
| `content/site/metadata.md` | Business name, phone, email, address, top navigation, footer links |
| `content/pages/home/hero.md` | Homepage top headline, subheadline, hero buttons, hero stats |
| `content/pages/home/proof-bar.md` | Small badge row under the homepage hero |
| `content/pages/home/testimonials.md` | Homepage testimonial section heading + which testimonials are featured |
| `content/pages/home/programs.md` | Homepage programs section heading |
| `content/pages/home/how-it-works.md` | Homepage “How it works” steps |
| `content/pages/home/why-cedar.md` | Homepage “Why Cedar” reasons/cards |
| `content/pages/home/cta.md` | Homepage final call-to-action section |
| `content/programs/_hub.md` | `/programs` page hero + section intro + final CTA |
| `content/programs/math.md` | `/programs/math` page |
| `content/programs/reading.md` | `/programs/reading` page |
| `content/programs/writing.md` | `/programs/writing` page |
| `content/programs/science.md` | `/programs/science` page |
| `content/programs/arabic.md` | `/programs/arabic` page |
| `content/programs/homework-help.md` | `/programs/homework-help` page |
| `content/pages/test-prep/_hub.md` | `/test-prep` page hero + intro + final CTA |
| `content/pages/test-prep/sat.md` | `/test-prep/sat` page |
| `content/pages/test-prep/act.md` | `/test-prep/act` page |
| `content/pages/test-prep/psat.md` | `/test-prep/psat` page |
| `content/pages/about/hero.md` | About page hero |
| `content/pages/about/stats.md` | About page stats strip |
| `content/pages/about/story.md` | About page story, mission, and values list |
| `content/pages/about/values.md` | About page differentiator cards |
| `content/pages/about/team.md` | About page team cards and bios |
| `content/pages/about/cta.md` | About page final CTA |
| `content/pages/reviews/_page.md` | Reviews page hero, stats, filters, final CTA |
| `content/pages/reviews/testimonials.md` | All reusable testimonials used across the site |
| `content/pages/pricing/_page.md` | Pricing page hero, pricing cards, all-plan notes, pricing FAQ |
| `content/pages/faq/_page.md` | FAQ page hero, categories, FAQ answers, final CTA |
| `content/pages/locations/_page.md` | Locations page hero, location cards, hours, service areas |
| `content/pages/book-assessment/_page.md` | Book Assessment hero, steps, booking FAQ |
| `content/pages/book-assessment/trust.md` | Trust signals panel on the booking page |

## 4) Common editing tasks

### Change the homepage headline

Edit: `content/pages/home/hero.md`

Before:

```md
# Personalized tutoring that helps Plano students catch up, keep up, and feel confident again.
```

After:

```md
# Personalized tutoring that helps Plano students feel capable, prepared, and less stressed after school.
```

### Add a new FAQ

Edit: `content/pages/faq/_page.md`

Add a new item inside `faqItems:`

```yaml
faqItems:
  - category: "Scheduling"
    question: "Do you offer Saturday tutoring?"
    answer: "Yes. Cedar offers Saturday sessions at the Plano center based on availability."
```

Tip: keep the indentation exactly like the other FAQ items.

### Add or remove a testimonial

Edit: `content/pages/reviews/testimonials.md`

Add a new item inside `testimonials:`

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

To remove a testimonial, delete that whole block.

**Important:** if a testimonial ID is used somewhere else (for example in homepage featured testimonials), remove that ID there too.

### Update pricing

Edit: `content/pages/pricing/_page.md`

Example:

```yaml
pricingTiers:
  - id: "individual-sessions"
    name: "As-Needed Tutoring"
    priceLabel: "$40"
    cadence: "per 60-minute session"
```

You can safely change:

- `name`
- `priceLabel`
- `cadence`
- `description`
- items under `features`

### Add a new program

This is the most advanced content task.

1. Copy one of the existing files in `content/programs/`.
2. Rename it, for example: `content/programs/study-skills.md`
3. Update the content values inside it.
4. If you want it in the menu, also update `content/site/metadata.md`.

Safe fields to change in the copied file:

- `slug`
- `title`
- `shortTitle`
- `shortDescription`
- `grades`
- `faq`
- page text in the markdown body

For a new program icon, use one of the existing safe icon names already used by programs:

- `book-open`
- `calculator`
- `pen-tool`
- `flask-conical`
- `languages`
- `book-marked`

If you are unsure, duplicate a similar program file and only change the text.

### Change navigation links

Edit: `content/site/metadata.md`

Example:

```yaml
navigation:
  - label: "Programs"
    href: "/programs"
```

You can:

- change a label
- change a link
- add a new navigation item
- remove a navigation item

The same file also controls footer links under `footerNav:`.

### Update contact info

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

Update these values if the phone, email, or address changes.

## 5) What is safe to change?

**Safe to change:**

- Headings and paragraphs
- Button labels
- Prices
- FAQ questions and answers
- Testimonials
- Team bios
- Hours, address, phone, email
- Items inside lists and arrays

**Do not change unless a developer tells you to:**

- Frontmatter field names like `component`, `seo`, `primaryCta`, `faqItems`, `testimonialIds`, `iconName`, `slug`, `href`
- File names and folder names
- Program/Test Prep section labels like `## Problem`, `## Approach`, `## Outcomes`, `## Ideal For`, `## Focus Areas`, `## Format`
- Testimonial `id` values that are already being used somewhere else, unless you also update every place that references them
- Component names in quotes such as `component: "Hero"`

## 6) Tips

- Keep indentation consistent. YAML spacing matters.
- Put text with punctuation inside quotes if you are unsure.
- Reuse existing examples. If one file already does what you want, copy its pattern.
- Navigation + contact info live in **one place**: `content/site/metadata.md`.
- All testimonials live in **one place**: `content/pages/reviews/testimonials.md`.
- If you remove a program or test-prep page, also remove any navigation links pointing to it.
- The program icon list is limited. For the safest result, reuse one of the existing icon names listed above.
- To preview changes locally, run:

```bash
npm run dev
```

Then open `http://localhost:3000`.

- To do a final site check before publishing, run:

```bash
npm run build
```

If the build passes, the content format is valid.

## 7) Quick rule of thumb

If you are changing **words, prices, links, testimonials, FAQs, or contact details**, you are probably safe.

If you are changing **field names, file names, IDs, icon names, or page structure**, pause and ask a developer.
