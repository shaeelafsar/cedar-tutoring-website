# Cedar Tutoring Academy Website

[![Deploy to GitHub Pages](https://github.com/shaeelafsar/cedar-tutoring-website/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/shaeelafsar/cedar-tutoring-website/actions/workflows/deploy-pages.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black)
![React 19](https://img.shields.io/badge/React-19-149eca)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8)

Marketing website for **Cedar Tutoring Academy**, a Plano, Texas tutoring center offering K–12 tutoring, homework help, and test prep.

- **Live site:** https://shaeelafsar.github.io/cedar-tutoring-website/
- **Framework:** Next.js 16 static export
- **UI stack:** React 19, Tailwind CSS v4, TypeScript, shadcn/ui
- **Content model:** Markdown files with YAML frontmatter in `content/`

## Project overview

This repository powers Cedar's public-facing website. It is designed so developers can work in a modern Next.js codebase while non-technical editors can update most page content in Markdown.

The site includes:
- Homepage and core marketing pages
- Programs and test-prep landing pages
- Pricing, FAQ, locations, and reviews pages
- A manual Google Reviews sync script for refreshing review content
- Static deployment to GitHub Pages on every push to `main`

## Quick start

### 1. Clone the repository

```bash
git clone https://github.com/shaeelafsar/cedar-tutoring-website.git
cd cedar-tutoring-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. (Optional) create local environment variables

You only need this for the Google Reviews sync script.

```bash
cp .env.local.example .env.local
```

Then add your Google Places values:

```env
GOOGLE_PLACES_API_KEY=your-api-key-here
GOOGLE_PLACE_ID=your-place-id-here
```

### 4. Start the local dev server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Create a production build

```bash
npm run build
```

## Project structure

```text
.
├── content/                # Editable marketing content (Markdown + YAML frontmatter)
├── public/                 # Static images and assets
├── scripts/                # One-off maintenance scripts
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Shared UI and page components
│   ├── lib/                # Utilities, content loaders, helpers
│   ├── hooks/              # Custom React hooks
│   └── types/              # Shared TypeScript types
├── tests/                  # Playwright end-to-end tests
├── .github/workflows/      # GitHub Actions, including Pages deployment
└── out/                    # Generated static export output after build
```

### Key directories

| Path | Purpose |
| --- | --- |
| `content/site/metadata.md` | Business details, navigation, footer links, contact info |
| `content/pages/**` | Marketing page sections such as home, about, FAQ, pricing, reviews, locations |
| `content/programs/**` | Programs hub and individual program pages |
| `content/pages/test-prep/**` | Test prep hub and SAT/ACT/PSAT pages |
| `src/lib/content/` | Markdown loaders, parsing, and Zod validation |
| `scripts/fetch-google-reviews.ts` | Manual sync for Google Reviews content |
| `tests/` | Playwright tests for mobile UX and navigation |

## Development commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local Next.js dev server |
| `npm run build` | Build the production static export |
| `npm run lint` | Run ESLint across the repository |
| `npm run start` | Start the built app after a production build |
| `npx playwright test --project=mobile-chrome` | Run end-to-end tests |
| `npx tsx scripts/fetch-google-reviews.ts --dry-run` | Preview Google Reviews sync changes |
| `npx tsx scripts/fetch-google-reviews.ts` | Write fetched Google Reviews into `content/` |

## Deployment

The site deploys automatically to **GitHub Pages**.

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger: every push to `main`
- Build output: static files in `out/`
- Host URL: `https://shaeelafsar.github.io/cedar-tutoring-website/`

Deployment flow:
1. GitHub Actions checks out the repository
2. Installs dependencies with `npm ci`
3. Runs `npm run build`
4. Uploads `out/` as the Pages artifact
5. Deploys the site to GitHub Pages

## Content editing

Most page copy lives in the `content/` directory, so many updates do **not** require touching React code.

Common examples:
- Homepage headlines and CTA text
- FAQ questions and answers
- Programs and test prep page copy
- Pricing cards
- Testimonials and reviews
- Navigation links and contact info

For the full editor guide, see **[`content/README.md`](content/README.md)**.

## Environment variables

Use `.env.local` for local-only secrets and script configuration.

Current use:
- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`

These are used by the Google Reviews sync script in `scripts/`.

Notes:
- `.env.local` is not committed
- normal content editing does **not** require these variables
- for GitHub Pages, the site itself is statically built and does not require runtime secrets

## Tech stack details

- **Next.js 16.2.4** with the App Router
- **React 19.2.4**
- **TypeScript** with strict typing
- **Tailwind CSS v4** for styling
- **shadcn/ui** and custom shared components for UI primitives
- **Zod** for content validation
- **gray-matter + remark** for Markdown content parsing
- **Playwright** for end-to-end testing
- **GitHub Actions + GitHub Pages** for CI/CD and hosting

## Contributing

Basic workflow:
1. Create a branch from `main`
2. Make focused changes
3. Run the relevant checks locally
4. Open a pull request

Recommended before submitting:

```bash
npm run build
npm run lint
npx playwright test --project=mobile-chrome
```

Content contributors should avoid renaming files, changing frontmatter field names, or changing IDs/slugs unless a developer is involved. If you are only changing copy, work inside `content/` and preview locally.

## License

No open-source license file is currently included in this repository. Unless the owner adds one, treat the project as private/proprietary.
