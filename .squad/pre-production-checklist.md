# Cedar Tutoring — Pre-Production Checklist

_Last updated: 2026-05-07 by Morpheus (Lead/Architect)_

Everything that must be true before this site replaces cedartutoring.com.

## 🔑 Third-Party Accounts & API Keys

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | **Resend** account + API key | Shaeel | 🔴 blocker | Sign up at resend.com (free tier: 3,000 emails/month, 100/day). API key goes into Azure SWA Application Settings as `RESEND_API_KEY`. **NEVER commit to repo.** |
| [ ] | **Resend** domain verification (`cedartutoring.com`) | Shaeel | 🔴 blocker | Verify sending domain in Resend dashboard → adds DKIM/SPF records to DNS. Required so emails come from `noreply@cedartutoring.com` (not `onboarding@resend.dev`). |
| [ ] | **Calendly** — verify free-trial embed authenticates against the real Cedar Calendly account | Asmah | 🟡 | Currently embedded on `/free-trial/`. WP version may have used native Calendly plugin auth. Confirm event types load and bookings hit the right inbox. |
| [ ] | **Google Analytics 4** property + Measurement ID | Asmah | 🟡 | Need GA4 property created. Measurement ID gets dropped into Next.js layout. |
| [ ] | **Google Search Console** verification + sitemap submission | Asmah / Trinity | 🟡 | Required for SEO. Trinity can wire the verification meta tag once Asmah grabs it. |
| [ ] | **Email inbox** for form submissions (`Info@cedartutoring.com`) | Shaeel | 🔴 blocker | Resend delivers assessment-request emails here. Confirm it exists, is monitored, and won't bounce. |

## ☁️ Azure Static Web Apps Provisioning

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | **Trinity: Remove/guard `basePath: '/cedar-tutoring-website'` from `next.config.ts`** | Trinity | 🔴 blocker | GitHub Pages artifact. `next build` sets `NODE_ENV=production`, causing all paths to prefix with `/cedar-tutoring-website/`. Must land on `main` BEFORE Shaeel's first SWA build (Step 2 of `azure-setup-guide.md`). See `.squad/decisions/inbox/trinity-nextconfig-basepath-azure.md`. |
| [ ] | **Provision Azure SWA** (Free plan) pointing at the GitHub repo | Shaeel | 🔴 blocker | Azure Portal or `az staticwebapp create`. Links repo for auto-deploy via GitHub Actions. |
| [ ] | **Add `RESEND_API_KEY`** to SWA Application Settings | Shaeel | 🔴 blocker | Azure Portal → SWA → Configuration → Application Settings. Server-only; never visible to browser. |
| [ ] | **Add `ALLOWED_ORIGINS`** to SWA Application Settings | Shaeel | 🔴 blocker | Comma-separated: `https://cedartutoring.com,https://www.cedartutoring.com,https://<swa-preview-url>`. |
| [ ] | **Trinity: scaffold `api/submit-assessment/index.ts`** | Trinity | 🔴 blocker | Implement per `.squad/specs/azure-function-submit-assessment.md`. |
| [ ] | **Trinity: rewire `BookAssessmentPageClient.tsx`** | Trinity | 🔴 blocker | POST to `/api/submit-assessment`; remove `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; remove `access_key` from payload. |
| [ ] | **Trinity: update `.env.local.example`** | Trinity | 🟢 | Drop `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, add `RESEND_API_KEY` and `ALLOWED_ORIGINS`. |
| [ ] | **Mouse: test plan against SWA preview deployment** | Mouse | 🔴 blocker | API-level + browser E2E tests per spec §11. |

## 🌐 Domain & DNS

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | Decide cutover domain (cedartutoring.com vs. subdomain during soft-launch) | Shaeel | 🔴 blocker | SWA provides a preview URL (`*.azurestaticapps.net`) for testing before DNS cutover. |
| [ ] | **DNS cutover: cedartutoring.com (apex + www) → SWA hostname** | Shaeel | 🔴 blocker | Azure SWA custom domains: CNAME for `www`, TXT validation + A record for apex. Auto-TLS via SWA. |
| [ ] | ~~Update `basePath` in `next.config.ts`~~ | Trinity | 🟢 done | Covered by Azure SWA Provisioning blocker above (basePath removal). |
| [ ] | Verify HTTPS via SWA (auto-issued managed certificate) | Shaeel | 🟢 | After DNS propagates. SWA handles TLS automatically. |
| [ ] | Plan WordPress redirects: `/admission/` → `/book-assessment/`, `/plans/` → `/pricing/`, `/homework/` → `/pricing/`, etc. | Shaeel | 🟡 | If keeping the WP host briefly, set up 301s. If killing it, no redirects possible. |
| [ ] | **Retire `.github/workflows/deploy-pages.yml`** | Trinity | 🟡 | AFTER DNS cutover verified end-to-end. Do not remove before SWA is confirmed live. |
| [ ] | **Make repo private** | Shaeel | 🟡 | Post-cutover only. Azure SWA deploys from private repos on Free tier (unlike GitHub Pages). |

## 📜 Legal & Content Review

| | Item | Owner | Status | Notes |
|---|---|---|---|---|
| [ ] | **Privacy Policy** — generic template (Trinity) | Trinity | 🟢 done | Wave 2 task — completed. |
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
| [ ] | Honeypot field on form (anti-bot) | Trinity | 🟢 | Already wired as `botcheck` hidden input. Azure Function validates server-side. |
| [ ] | Origin header validation (anti-CSRF) | Trinity | 🟢 | Azure Function checks `Origin` against `ALLOWED_ORIGINS`. |
| [ ] | Rate limiting (SWA built-in) | — | 🟢 | SWA Free tier includes DDoS/rate-limiting at the edge. No custom code needed at launch. |
| [ ] | Test end-to-end form submission to real inbox | Shaeel + Trinity + Mouse | 🔴 blocker | Submit a test assessment request → email arrives at `Info@cedartutoring.com`. |

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
| [ ] | Mouse runs Playwright smoke pass on live SWA URL | Mouse | 🟢 | After Wave 3 merges. |
| [ ] | Mobile responsiveness pass (375px → 1440px) | Mouse | 🟢 | All pages. |
| [ ] | Lighthouse: Performance ≥ 90, Accessibility ≥ 95 | Mouse | 🟢 | Goal, not blocker. |
| [ ] | Test booking form submission from production SWA URL | Shaeel + Trinity | 🔴 blocker | Smoke test before announcing. |
| [ ] | Test Calendly free-trial flow from production URL | Asmah | 🔴 blocker | End-to-end. |
| [ ] | All nav links resolve (no 404s) | Mouse | 🟢 | Already covered in Wave 1 verification. |

## ❓ Open Questions Still Pending

- Family Plan "5 sessions / 6 sessions" units — is that per-week (matches WP visual) or per-month? Mirroring WP exactly avoids the question.
- Test Prep pricing — no number on live WP. Show "Contact for pricing" or pull from a price list Asmah maintains?
- "Personalized Tutoring" mentioned on `/free-trial/` — is that a 4th distinct tier, or just marketing language for As-Needed?

## ⏸️ Deferred

> FAQ section removed from `/pricing` on 2026-05-07; re-add when real answers are available.

The following FAQ questions were written as placeholders in Wave 2B and removed before launch because Shaeel/Asmah had not confirmed the actual policy details:

- **Plan switching** — Can customers switch plans mid-month or only at billing cycle start? Any fees?
- **Free assessment scope** — Does it include a subject test or only a level/gap evaluation?
- **Sibling discounts** — Are there additional discounts beyond the Family Plan's shared-session model?
- **Cancellation policy** — Exact language, grace periods, and refund treatment for monthly plans.

**How to re-add:** Once real answers are confirmed, add `faqEyebrow:` and `faqItems:` back to `content/pages/pricing/_page.md` frontmatter, and add the H2 section back to the markdown body. No schema or code changes needed — the schema is already permissive (`.optional()`).
