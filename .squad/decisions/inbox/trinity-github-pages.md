# Trinity — GitHub Pages deployment setup

- Enabled Next.js static export with `output: "export"` and `images.unoptimized: true`.
- Added `trailingSlash: true` for GitHub Pages-compatible deep links.
- Applied `basePath` and `assetPrefix` for production builds so the site resolves under `/cedar-tutoring-website` while local dev stays root-based.
- Added a GitHub Actions workflow that builds `out/`, adds `.nojekyll`, uploads the Pages artifact, and deploys on pushes to `main`.
- Static export audit found no API routes, server actions, or SSR-only data hooks blocking GitHub Pages deployment.
- Pre-existing navigation/footer links still point to routes that do not exist yet (`/book-assessment`, `/privacy`, `/terms`, plus several marketing pages like `/about` and `/faq`), so those links will still land on the static 404 page until implemented.
