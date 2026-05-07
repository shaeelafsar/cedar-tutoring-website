# Form Solutions for Static Sites — Research & Recommendation

> **Author:** Morpheus (Lead/Architect)
> **Date:** 2026-05-07
> **Audience:** Shaeel Afsar, Cedar Tutoring Academy team
> **Status:** RECOMMENDATION — pending owner approval

---

## TL;DR

**For Cedar specifically: use Azure Static Web Apps with its built-in managed Azure Function as a form relay, posting submissions to Resend (email API) which delivers to Info@cedartutoring.com.** This keeps every secret server-side (Function App settings), costs $0 within your existing Azure credit + Resend's free tier (100 emails/day, 3,000/month — Cedar will use maybe 50/month), and the Function endpoint is same-origin with the static site so there's no CORS configuration needed. It's roughly two hours of setup work, zero monthly cost, and you own the entire pipeline. No third-party form vendor required at all, though relaying through Web3Forms remains an option if you want their dashboard.

---

## How WordPress (and Other Dynamic CMSes) Actually Handle Forms

WordPress "just works" for forms because it ships with **PHP on the server and a MySQL database**. When a visitor submits a Contact Form 7 or WPForms form, the browser POSTs to the same server that rendered the page. PHP processes the submission server-side — it can read secrets from `wp-config.php`, validate inputs, write to the database, and call `wp_mail()` to send email — all without exposing anything to the browser.

The plugin ecosystem (Contact Form 7, WPForms, Gravity Forms, Ninja Forms) abstracts this further: drag-and-drop builders, spam filtering, file uploads, conditional logic, CRM integrations — all backed by that always-on server.

**Static sites lose this for free.** A statically exported Next.js site is just HTML/CSS/JS files served from a CDN. There is no server process to receive a POST, no database to write to, and no server-side environment to hold secrets. Every form submission must go _somewhere else_ — and that "somewhere else" is the core architectural question.

---

## The Five Real Categories of Form Handling for Static Sites

### 1. Hosted Form Services with Public Key

**Examples:** Web3Forms, Formspree, Getform, Basin, FormSubmit

**How it works:** You get an API key (or form endpoint URL) from the service. Your client-side form POSTs directly to their API with your key in the payload or URL. The service processes the submission, sends you an email, and optionally stores the data.

| Aspect | Detail |
|---|---|
| **Who hosts the secret** | The key is public by design — embedded in your HTML/JS. The service uses origin checks + rate limiting as the defense layer. |
| **Key exposure risk** | The key is visible in view-source. Anyone can submit to your form endpoint. Services mitigate with CAPTCHA, honeypots, rate limits. |
| **Cost** | Free tiers generous (Web3Forms: 250/mo, Formspree: 50/mo). Paid from $8-12/mo. |
| **Integration effort** | ~30 minutes. Add a hidden input with the key, POST to their URL. |
| **Where it shines** | Speed of setup. Zero backend. Great for prototypes, marketing sites, portfolios. |
| **Where it falls down** | Key is public (Shaeel's stated concern). Limited customization. Vendor lock-in on data. Some services have aggressive branding on free tier. |

**Cedar context:** This is the model Shaeel explicitly rejected. The existing Web3Forms wiring in `BookAssessmentPageClient.tsx` uses this pattern. The key concern is valid from a principle standpoint, though practically these services are designed for public keys.

---

### 2. Embedded Third-Party Form Widgets

**Examples:** Google Forms (iframe), Microsoft Forms (iframe), Typeform, JotForm, Tally

**How it works:** The third party hosts the entire form UI and backend. You embed it via iframe or link to it. The host owns everything — rendering, submission processing, data storage, email notification.

| Aspect | Detail |
|---|---|
| **Who hosts the secret** | The host. You don't handle any secrets. |
| **Key exposure risk** | None. No keys involved. |
| **Cost** | Google Forms: free. Microsoft Forms: free with Microsoft account (limited). Tally: free tier generous. Typeform/JotForm: free tier limited, paid from $25/mo. |
| **Integration effort** | ~5 minutes (paste iframe embed code). |
| **Where it shines** | Absolute fastest path. Zero security concerns. Good for internal/back-office forms. |
| **Where it falls down** | **Branding.** The form looks like Google/Microsoft/Typeform, not your site. Breaks visual brand. Limited styling control. Data lives in their ecosystem. UX friction (iframe scroll issues, mobile quirks). |

#### Microsoft Forms — Practical Reality

Microsoft Forms is part of the **Microsoft 365 / Office 365 ecosystem**. The free tier (personal Microsoft account) lets you create forms and embed them, but:
- **Heavy Microsoft branding** — header bar, color scheme, "Microsoft Forms" footer
- **Customization is extremely limited** — you can change the banner image and theme color, that's it
- **No CSS override** — iframe sandboxing prevents styling the embedded form to match your site
- **Data flows to OneDrive/Excel** — fine for internal use, awkward for a client-facing marketing site
- **Enterprise features** (branching, advanced analytics) require M365 Business/Education licenses

**Verdict for Cedar:** Not appropriate for a professional tutoring marketing site. The branding clash would undermine trust with parents.

#### Google Forms — Practical Reality

Google Forms is free and functional, but:
- **Default styling is unmistakably "Google Forms"** — purple header, Google fonts, Google branding
- **Custom themes are limited** — you can change header image and color, not much else
- **Embed via iframe** works but has scroll/sizing issues on mobile
- **Data flows to Google Sheets** — actually useful for a solo dev's data pipeline
- **Does NOT solve "your own form posts to Google's API"** — Google Forms does not expose a public submit API for arbitrary custom-designed forms

**The "design our own form against Google API" question:** YES, this creates the same secret-key problem. The Google Sheets API requires an API key or OAuth service account credentials. Google Apps Script can accept anonymous POSTs when deployed as a web app (the script URL itself becomes the auth), but:
- The URL is an easy abuse target without rate limiting
- It's an ugly `script.google.com/macros/s/...` URL
- Debugging is painful (Apps Script logs are limited)
- Cold-start latency can be 5-10 seconds
- You're dependent on Google's Apps Script runtime limits

Apps Script is a viable hack for truly minimal needs, but it's fragile and unprofessional for a client-facing site.

---

### 3. Mailto Links / Static Contact Page

**How it works:** No form submission at all. The page displays contact info (phone, email) and/or a `mailto:` link that opens the visitor's email client.

| Aspect | Detail |
|---|---|
| **Who hosts the secret** | N/A — no secrets involved. |
| **Key exposure risk** | None. |
| **Cost** | $0. |
| **Integration effort** | ~5 minutes. |
| **Where it shines** | Absolute simplest. Zero attack surface. Works offline. |
| **Where it falls down** | Terrible UX. Requires visitor to have an email client configured. No structured data capture. No analytics. Looks unprofessional for a business site. High friction = lost leads. |

**Cedar context:** This is essentially the current graceful-fallback mode — when Web3Forms key isn't set, the form shows phone + email. It's intentionally a stopgap, not a destination.

---

### 4. Serverless Function Relay

**Examples:** Azure Functions, Vercel Serverless Functions, Cloudflare Workers, Netlify Functions, AWS Lambda

**How it works:** Your custom-designed form POSTs to a serverless function you own. The function runs server-side — it can validate inputs, check honeypots, read secrets from environment variables, and forward the submission to an email service (Resend, SendGrid, Mailgun) or any API. The secret never touches the browser.

| Aspect | Detail |
|---|---|
| **Who hosts the secret** | You — in the function's environment variables / app settings. Server-side only. |
| **Key exposure risk** | **Zero.** The browser never sees the email API key. |
| **Cost** | Azure Functions: 1M free executions/mo. Vercel: 100K/mo free. Netlify: 125K/mo free. All far exceed Cedar's needs. Email service (Resend): 3,000 emails/mo free. |
| **Integration effort** | ~2 hours. Scaffold function, wire form endpoint, configure email service, deploy. |
| **Where it shines** | **Full control.** Custom validation, honeypot, rate limiting, custom email templates, structured data, no vendor branding, secrets stay server-side. Professional. |
| **Where it falls down** | Requires a serverless host (but Cedar is going Azure anyway). More setup than a hosted service. You own the maintenance (but it's ~zero for a simple relay). |

**Cedar context:** This is the recommended path. Azure Static Web Apps includes managed Functions — when your SWA project has an `api/` folder, Functions are auto-deployed and routes are same-origin. No separate Function App provisioning, no CORS configuration, no extra billing. This is the killer feature for static-site solo devs on Azure.

---

### 5. Headless Form Builders with Own Backend

**Examples:** Custom form + Resend/Plunk/Mailgun directly, Formik + custom API, Headless CMS form plugins

**How it works:** You build the form UI yourself and wire it to an email/data service through your own backend (which could be a serverless function, a traditional server, or a headless CMS's built-in form handler).

| Aspect | Detail |
|---|---|
| **Who hosts the secret** | You — on your server/function. |
| **Key exposure risk** | Zero (if backend is properly configured). |
| **Cost** | Varies. Email APIs have generous free tiers. Backend hosting may have costs. |
| **Integration effort** | Higher — 4-8 hours depending on complexity. |
| **Where it shines** | Maximum flexibility. CRM integrations, multi-step forms, file uploads, conditional logic. |
| **Where it falls down** | Overkill for simple contact forms. More code to maintain. |

**Cedar context:** The serverless function relay (category 4) IS this pattern, just scoped to Cedar's simple needs. If form needs grow (e.g., multi-step enrollment, document uploads, CRM integration), this category becomes relevant.

---

## Recommendation Matrix

| Solo dev situation | Recommended approach | Why |
|---|---|---|
| Truly minimal site, <5 forms/month, no integration needs | Mailto link or embedded Google Form iframe | Zero cost, zero setup, zero security concern |
| Marketing site with contact form, fine with public keys | **Hosted service with public key** (Web3Forms, Formspree) | Keys are designed to be public; rate-limiting + honeypots are the real defense |
| Has a serverless host already (Vercel/Netlify/Cloudflare/Azure) | **Serverless function relay → email service** (Resend or Plunk) | Secrets server-side, full control, cheap, professional |
| Going Azure anyway with free credit **(Cedar's situation)** | **Azure Static Web Apps + Azure Function relay → Resend** | Uses free credit, secret in Function App settings, same-origin routing, custom validation, $0 cost |
| Volume grows past 1k submissions/month or needs CRM/Zapier integration | Hosted form builder paid tier (Formspree, Basin, Tally Pro) OR HubSpot Forms | Saves dev time at the cost of monthly fee |

---

## Specific Cedar Recommendation — The "Do This" Section

### Recommended Architecture: Azure Static Web Apps + Managed Azure Function → Resend

The Function:
1. Accepts POST from same-origin (`/api/submit-assessment`)
2. Validates honeypot field (already wired in the current form)
3. Validates Origin header (matches Cedar's domain)
4. Reads the Resend API key from Function App settings (never in repo, never in client bundle)
5. Sends a formatted email to `Info@cedartutoring.com` via Resend's API
6. Returns success/error JSON to the client

### Request Flow

```
┌──────────┐     POST /api/submit-assessment     ┌─────────────────────┐
│  Browser  │ ──────────────────────────────────► │  Azure Function     │
│  (form)   │                                     │  (same-origin,      │
│           │ ◄────────────── JSON response ───── │   managed by SWA)   │
└──────────┘                                      └──────────┬──────────┘
                                                             │
                                                   validates honeypot
                                                   validates Origin
                                                   reads RESEND_API_KEY
                                                   from App Settings
                                                             │
                                                             ▼
                                                  ┌──────────────────────┐
                                                  │  Resend API          │
                                                  │  (sends email to     │
                                                  │  Info@cedartutoring)  │
                                                  └──────────────────────┘
```

### The SendGrid vs Web3Forms-Relay vs Resend Sub-Choice

| Option | Pros | Cons |
|---|---|---|
| **Web3Forms relay** (Function adds key, forwards to `api.web3forms.com`) | Keeps current wiring almost intact. Just swap the endpoint from client-direct to Function. Web3Forms dashboard for viewing submissions. | Still a third-party vendor in the chain. One more external dependency. |
| **SendGrid direct** (Function calls SendGrid API) | Well-known, enterprise-grade. | Account approval process is painful for new/small accounts — SendGrid frequently locks new accounts for "review" that can take days. Overkill for <50 emails/month. API is complex. |
| **Resend direct** ⭐ (Function calls Resend API) | **Best DX for solo devs.** Simple API (one POST call). Generous free tier (3,000/mo, 100/day). Instant account approval. Great docs. Built by devs, for devs. Handles DKIM/SPF/DMARC automatically. One less vendor than Web3Forms relay. | Newer company (founded 2023, stable as of 2026). Free tier includes Resend branding in email footer (removable on Pro $20/mo, but recipients likely won't notice for transactional assessment notifications). |

**Recommendation: Resend.** It cuts Web3Forms out entirely — one less vendor, simpler architecture, better DX. The free tier handles Cedar's volume with 60× headroom. If Shaeel later wants the Web3Forms submission dashboard, the Function can be trivially updated to relay there instead.

### Azure SWA Managed Functions — The Killer Feature

When an Azure Static Web Apps project has an `api/` folder at the repo root (or configured path), the Functions inside are:
- **Auto-deployed** alongside the static site via the same GitHub Actions workflow
- **Same-origin** — the Function is served from the same domain as the site (e.g., `cedartutoring.com/api/submit-assessment`), so there's no CORS configuration needed
- **Free** — included in the SWA Free plan (1M executions/month)
- **No separate Function App needed** — no extra Azure resource to provision, configure, or pay for

This is the single most important architectural detail. It means Cedar's form relay is not a separate service to manage — it's just another folder in the repo.

---

## Implementation Cost Estimate

| Item | Estimate |
|---|---|
| **Provision Azure SWA** | ~15 min (Azure Portal or `az staticwebapp create`) |
| **Create Resend account + API key** | ~10 min |
| **Scaffold `api/submit-assessment/` Function** | ~45 min (TypeScript, ~40 lines of code) |
| **Update `BookAssessmentPageClient.tsx`** to POST to `/api/submit-assessment` | ~15 min |
| **Configure SWA app settings** (add `RESEND_API_KEY`) | ~5 min |
| **Test end-to-end** | ~30 min |
| **Total setup time** | **~2 hours** |
| **Recurring cost** | **$0** (Azure free credit + Resend free tier) |
| **Maintenance** | ~zero (no servers, no database, no cron jobs) |

---

## Why NOT the Other Paths for Cedar

### Why not Microsoft Forms
Microsoft Forms is designed for internal surveys and M365 organizations, not client-facing marketing sites. The heavy Microsoft branding (header bar, "Microsoft Forms" footer, Microsoft color scheme) would look out of place on a tutoring academy site and undermine the professional brand Cedar is building. Customization is extremely limited — no CSS control, no way to match Cedar's design system. Data flows to OneDrive/Excel rather than email, which doesn't match the desired workflow (owner gets email notification of each assessment request).

### Why not Google Forms
Google Forms is free and functional, but the "unmistakably Google" styling breaks Cedar's brand. The iframe embed has well-known mobile sizing/scrolling issues. More importantly, the question "can we design our own form and post to Google's API?" leads right back to the same secret-key problem — the Google Sheets API requires credentials that would need to be in the browser or behind a relay. Google Apps Script deployed as a web app is a special-case workaround (the URL is the auth), but it's fragile, ugly, slow on cold start, and has no rate limiting. **That said:** if the Azure Function takes too long to set up and Shaeel needs forms working in 5 minutes, embedding a Google Form iframe is the fastest possible fallback. Just understand it's a temporary band-aid, not the production solution.

### Why not stick with Web3Forms public-key model
Shaeel explicitly stated he does not want to expose API keys to the browser. While Web3Forms' public-key model is defended by origin checks and rate limits (and is arguably fine for a low-traffic tutoring site), the owner has made a clear architectural decision. Respecting that constraint is the right call — it's his site, his risk tolerance, and the serverless relay costs nothing extra given the Azure migration.

### Why not custom SMTP (send directly from the Function via SMTP)
Email deliverability from a new domain/IP is genuinely hard. Without proper DKIM, SPF, and DMARC configuration — and without sender reputation — emails from a raw SMTP connection will land in spam or be rejected entirely. Services like Resend handle all of this automatically (they manage sending infrastructure with established reputation, auto-configure DKIM on your verified domain, and handle bounces/complaints). Rolling your own SMTP is solving a problem that's already been solved, and solving it worse.

---

## Closing Notes for the Team

1. **Once Shaeel confirms this path:**
   - **Trinity** owns the Function code (`api/submit-assessment/index.ts`) + form client rewiring in `BookAssessmentPageClient.tsx`
   - **Mouse** owns the test: POST to the function with mock Resend → assert email payload shape, honeypot rejection, origin validation
   - **Morpheus** owns the Azure SWA provisioning guidance and architecture review

2. **Pre-production checklist additions needed:**
   - [ ] Provision Azure Static Web App (Free plan)
   - [ ] Create Resend account, verify `cedartutoring.com` sending domain
   - [ ] Add `RESEND_API_KEY` to SWA Application Settings
   - [ ] DNS: point `cedartutoring.com` to Azure SWA custom domain
   - [ ] GitHub Actions: add `azure-static-web-apps.yml` workflow (replaces `deploy-pages.yml`)
   - [ ] Verify DKIM/SPF/DMARC for `cedartutoring.com` via Resend dashboard
   - [ ] End-to-end test: submit assessment form → email arrives at `Info@cedartutoring.com`

3. **Migration path from current state:**
   - Current: form is in graceful-fallback mode (no key → shows phone/email)
   - Step 1: Provision Azure SWA + Resend, deploy Function
   - Step 2: Update form to POST to `/api/submit-assessment`
   - Step 3: Test, verify email delivery
   - Step 4: Remove Web3Forms dependency from `package.json` (if any) and retire `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` env var reference
   - Step 5: Update `decisions.md` with final implementation decision
