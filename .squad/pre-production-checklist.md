# Cedar Tutoring — Pre-Production Checklist

_Last updated: 2026-05-07 by Coordinator_

Everything that must be true before this site replaces cedartutoring.com.

## 🔑 Third-Party Accounts & API Keys

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | **Web3Forms** account + access key | Asmah | 🔴 blocker | Sign up at web3forms.com (free, 250 submissions/mo). Access key goes into env var `WEB3FORMS_ACCESS_KEY`. Wires up `/book-assessment/` form. |
| [ ] | **Calendly** — verify free-trial embed authenticates against the real Cedar Calendly account | Asmah | 🟡 | Currently embedded on `/free-trial/`. WP version may have used native Calendly plugin auth. Confirm event types load and bookings hit the right inbox. |
| [ ] | **Google Analytics 4** property + Measurement ID | Asmah | 🟡 | Need GA4 property created. Measurement ID gets dropped into Next.js layout. |
| [ ] | **Google Search Console** verification + sitemap submission | Asmah / Trinity | 🟡 | Required for SEO. Trinity can wire the verification meta tag once Asmah grabs it. |
| [ ] | **Email inbox** for form submissions (info@ or book@cedartutoring.com) | Asmah | 🔴 blocker | Web3Forms forwards to ONE email. Confirm it exists, is monitored, and won't bounce. |

## 🌐 Domain & DNS

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | Decide cutover domain (cedartutoring.com vs. subdomain during soft-launch) | Asmah | 🔴 blocker | Currently live at `shaeelafsar.github.io/cedar-tutoring-website/`. |
| [ ] | Add `CNAME` file to repo root with the chosen domain | Trinity | 🟢 | Triggered by Asmah's domain decision. |
| [ ] | Update DNS A/CNAME records to point at GitHub Pages | Asmah | 🔴 blocker | GitHub Pages instructions: A records to GitHub IPs, or CNAME to `shaeelafsar.github.io`. |
| [ ] | Update `basePath` in `next.config.ts` if root domain (drop `/cedar-tutoring-website`) | Trinity | 🟢 | Once custom domain is set. |
| [ ] | Verify HTTPS via GitHub Pages (auto-issued via Let's Encrypt) | Asmah | 🟢 | After DNS propagates. |
| [ ] | Plan WordPress redirects: `/admission/` → `/book-assessment/`, `/plans/` → `/pricing/`, `/homework/` → `/pricing/`, etc. | Asmah | 🟡 | If keeping the WP host briefly, set up 301s. If killing it, no redirects possible. |

## 📜 Legal & Content Review

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | **Privacy Policy** — generic template (Trinity) | Trinity | 🟢 | Wave 2 task. |
| [ ] | **Privacy Policy** — lawyer review | Asmah | 🟡 | Per Wave 2 decision: launch with generic, lawyer reviews post-launch. |
| [ ] | Terms of Service (if collecting payments) | Asmah | ⚪ | Only if adding online payments. |
| [ ] | Parent reviews — written permission to quote names + child grades on `/reviews/` | Asmah | 🔴 blocker | Liability — must have signed permissions before launch. |
| [ ] | Final copy pass on home hero + about/story + pricing fine-print | Asmah | 🟡 | Especially the new hero copy: "Personalized tutoring that helps your child feel confident again." |
| [ ] | Confirm pricing matches what Asmah charges today | Asmah | 🔴 blocker | Vision-extracted from WP: As-Needed $40/sess, Family Plan $699.99/$749.99 monthly, Homework Help $419.99–$699.99 monthly. Must match her actual rates. |

## 📞 Business Info Accuracy

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | Phone number(s) on Contact + footer | Asmah | 🔴 blocker | Confirm current. |
| [ ] | Physical address (Worth, IL) | Asmah | 🔴 blocker | Confirm street + zip. |
| [ ] | Hours of operation | Asmah | 🟡 | If listed anywhere. |
| [ ] | Social media URLs in footer | Asmah | 🟡 | Confirm live IG/FB/etc handles. |
| [ ] | Cities served list (already wired) | — | 🟢 done | Worth, IL + South Suburbs of Chicago. |

## 🎨 Brand Assets

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | High-res logo (favicon + Open Graph images) | Asmah | 🟡 | For social share previews. |
| [ ] | Real team photos to replace SVG portraits | Asmah | ⚪ | Currently 1 placeholder for Asmah; other 3 placeholder teammates being removed in Wave 2. |
| [ ] | OG image for home + key landing pages | Trinity | 🟢 | Once logo is final. |

## 🛡️ Form Hardening

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | Web3Forms hCaptcha enabled in production | Trinity | 🟢 | Toggle in Web3Forms dashboard + add hCaptcha widget to form. |
| [ ] | Honeypot field on form (anti-bot) | Trinity | 🟢 | Web3Forms has built-in support. |
| [ ] | Rate-limit / spam check (Web3Forms native) | Trinity | 🟢 | Verify in dashboard. |
| [ ] | Test end-to-end form submission to real inbox | Asmah + Trinity | 🔴 blocker | Send a test booking, confirm email lands. |

## 🔍 SEO & Indexability

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | `robots.txt` allows indexing on production domain | Trinity | 🟢 | Currently `*` allow. |
| [ ] | `sitemap.xml` generated and submitted to GSC | Trinity | 🟢 | Next.js can auto-generate. |
| [ ] | JSON-LD LocalBusiness schema on home (already done) | — | 🟢 done | Wave 1: now says "Worth, IL and the South Suburbs of Chicago". |
| [ ] | Google Business Profile linked / verified | Asmah | 🟡 | Out of scope for code, but critical for local SEO. |
| [ ] | Open Graph + Twitter Card meta tags | Trinity | 🟢 | Verify on production with Facebook Sharing Debugger. |

## 🧪 Pre-Launch QA

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | Mouse runs Playwright smoke pass on live URL | Mouse | 🟢 | After all Wave 2 work merges. |
| [ ] | Mobile responsiveness pass (375px → 1440px) | Mouse | 🟢 | All pages. |
| [ ] | Lighthouse: Performance ≥ 90, Accessibility ≥ 95 | Mouse | 🟢 | Goal, not blocker. |
| [ ] | Test booking form submission from production URL | Asmah + Trinity | 🔴 blocker | Smoke test before announcing. |
| [ ] | Test Calendly free-trial flow from production URL | Asmah | 🔴 blocker | End-to-end. |
| [ ] | All nav links resolve (no 404s) | Mouse | 🟢 | Already covered in Wave 1 verification. |

## ❓ Open Questions Still Pending

- Family Plan "5 sessions / 6 sessions" units — is that per-week (matches WP visual) or per-month? Mirroring WP exactly avoids the question.
- Test Prep pricing — no number on live WP. Show "Contact for pricing" or pull from a price list Asmah maintains?
- "Personalized Tutoring" mentioned on `/free-trial/` — is that a 4th distinct tier, or just marketing language for As-Needed?
