# Azure Setup Guide — Cedar Tutoring Academy

> **Audience:** Shaeel — provisioning for the first time. Steps are Portal-only (no CLI required).
> **Last updated:** 2026-05-07

---

## What You're Building

Azure hosts both the static site and the Wave 3 backend. **Wave 3 is now scoped as the full Calendly replacement project** — custom assessment form + custom calendar/scheduling solution + Resend email backend, shipping together as a coherent intake replacement.

Two halves, one deployment:

- **Azure Static Web Apps (SWA):** hosts the Next.js static export (HTML/CSS/JS) from the `out/` directory. No server to manage.
- **Managed Azure Function** (in the `api/` folder of this repo): receives form POSTs at `/api/submit-assessment`, holds secrets server-side, sends email via Resend.

Both halves share the same domain (`cedartutoring.com`). Azure routes `/api/*` to the Function automatically. No CORS config. No separate Function App resource to provision.

---

## Before You Start

- [x] GitHub repo access
- [x] Azure subscription with free credit
- [ ] Access to cedartutoring.com DNS panel (Namecheap, Cloudflare, etc.)
- [ ] Email address for Resend signup
- [ ] `az` CLI — **optional.** All steps below use the Azure Portal.

> 💡 **Tip:** Portal-only is fine for this guide. CLI path: `az staticwebapp create` (see [Azure docs](https://learn.microsoft.com/en-us/cli/azure/staticwebapp)).

---

## Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com) → **Sign up** → verify email.
2. **Add your sending domain:**
   - Dashboard → **Domains** → **Add Domain** → enter `cedartutoring.com`
   - Resend shows DNS records (TXT for SPF + DKIM). Add them in your DNS panel now or after Step 4.
   - Status will show **Pending** until DNS propagates. Resend auto-checks — wait for **Verified**.
   > 💡 **Tip:** For initial testing before DNS is verified, Resend lets you use their shared sending domain (`onboarding@resend.dev`). The Function's `from` address can be swapped temporarily — just flag it so Trinity knows.
3. **Generate an API key:**
   - Dashboard → **API Keys** → **Create API Key**
   - Label: `cedar-prod`
   - Permission: **Sending access** (not Full access)
   - Click **Add**

> ⚠️ **Warning:** The key is shown exactly once. Copy it immediately. Save it in a password manager or local `.env.local` only. Do NOT paste it into chat. Do NOT commit it to the repo.

> ✅ **Done when:** You have an API key starting with `re_…`

📝 **Capture this:**
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Resend sender domain: [ ] cedartutoring.com Verified  [ ] Using resend.dev fallback
```

---

## Step 2: Provision Azure Static Web App

Open [portal.azure.com](https://portal.azure.com).

1. **Create a resource** → search **Static Web App** → **Create**
2. Fill in the basics:

   | Field | Value |
   |---|---|
   | Subscription | Your Azure subscription |
   | Resource Group | **Create new** → `cedar-prod-rg` |
   | Name | `cedar-tutoring` |
   | Plan type | **Free** |
   | Region | `East US 2` (CDN distributes content globally — region choice has minimal end-user impact) |

3. **Source: GitHub**
   - Click **Sign in with GitHub** → authorize Azure
   - Organization: your GitHub account
   - Repository: `cedar-tutoring-website`
   - Branch: `main`

4. **Build Details** → set **Build Preset** to **Custom**, then:

   | Field | Value |
   |---|---|
   | App location | `/` |
   | API location | `api` |
   | Output location | `out` |

5. Click **Review + Create** → **Create**

Azure immediately commits a workflow file to the repo (`.github/workflows/azure-static-web-apps-{name}.yml`) and kicks off a build.

> ⚠️ **Warning — first build will fail.** `next.config.ts` currently sets `basePath: '/cedar-tutoring-website'` in `NODE_ENV=production` (a GitHub Pages artifact). This causes the site to be served at `/cedar-tutoring-website/` instead of `/` on Azure. **Ping Trinity** to push a `next.config.ts` fix to `main` before the build can succeed. This is expected — do not retry the build yourself.

> ✅ **Done when:** The workflow file `azure-static-web-apps-{name}.yml` appears in `.github/workflows/` in the repo (even if the build is red — that's Trinity's fix to land).

📝 **Capture this:**
```
SWA hostname:           <something>.azurestaticapps.net
Workflow filename:      azure-static-web-apps-<something>.yml
```

---

## Step 3: Add Secrets to SWA App Settings

**Azure Portal → your SWA → Configuration → Application settings**

1. Click **+ Add**
   - Name: `RESEND_API_KEY`
   - Value: `re_…` (the key from Step 1)
   - Click **OK**

2. Click **+ Add**
   - Name: `ALLOWED_ORIGINS`
   - Value (replace `<swa-hostname>` with your actual hostname):
     ```
     https://cedartutoring.com,https://www.cedartutoring.com,https://<swa-hostname>.azurestaticapps.net
     ```
   - Click **OK**

3. Click **Save** at the top.

> 💡 **Tip:** These are server-only variables. Azure injects them into the Function runtime at execution time. They never appear in the browser, the client bundle, or the repo. The `NEXT_PUBLIC_` prefix is not used here.

> ✅ **Done when:** Both `RESEND_API_KEY` and `ALLOWED_ORIGINS` appear in the Application settings list with non-empty values.

📝 **Capture this:**
```
[ ] RESEND_API_KEY is set
[ ] ALLOWED_ORIGINS is set (includes SWA hostname + both cedartutoring.com variants)
```

---

## Step 4: Custom Domain

**Azure Portal → your SWA → Custom domains → + Add**

Do `www` first — it's simpler (CNAME). Apex second.

### `www.cedartutoring.com`

1. Enter `www.cedartutoring.com` → **Next**
2. Azure shows a CNAME to add in your DNS panel:
   ```
   Type:   CNAME
   Name:   www
   Value:  <swa-hostname>.azurestaticapps.net
   ```
3. Add it in your DNS panel. Return to Azure → **Validate**.

### `cedartutoring.com` (apex)

1. Enter `cedartutoring.com` → **Next**
2. Azure shows records for ownership verification + routing:

   | Type | Name | Value |
   |---|---|---|
   | TXT | `@` | Azure-provided ownership token |
   | ALIAS or ANAME | `@` | `<swa-hostname>.azurestaticapps.net` |

   > 💡 **Tip:** If your DNS provider doesn't support ALIAS/ANAME, Azure will offer an A record pointing to their IP as a fallback. Use whatever Azure displays — don't guess.

3. Add both records in your DNS panel. Return to Azure → **Validate**.

> ⚠️ **Warning:** DNS propagation can take up to 48 hours. Azure re-checks automatically. If it's still Pending after an hour, use `dig cedartutoring.com TXT` or `dig www.cedartutoring.com CNAME` from your terminal to verify the records propagated — then re-check in Portal.

> ✅ **Done when:** Both `cedartutoring.com` and `www.cedartutoring.com` show **Ready** in the Custom domains list.

📝 **Capture this:**
```
cedartutoring.com domain status:     [ ] Ready  [ ] Pending  [ ] Failed
www.cedartutoring.com domain status: [ ] Ready  [ ] Pending  [ ] Failed
```

---

## Step 5: GitHub Actions — What Changes

Azure auto-created `.github/workflows/azure-static-web-apps-{name}.yml` at provisioning. It runs on every push to `main`.

- **Do not edit the auto-created workflow file yet.** Let Trinity review it and land the `next.config.ts` fix first.
- **Keep `.github/workflows/deploy-pages.yml` for now.** Squad will retire it only after end-to-end testing on Azure is verified (form submits, email arrives, custom domain resolves correctly). Do not delete it yet.

> ⚠️ **Warning:** Both workflows will run on `main` pushes during the transition window. GitHub Pages will stay in sync temporarily. This is intentional — it's a safe parallel-run period.

---

## Step 6: After Provisioning — Tell Trinity

Hand Trinity these values so the Function can be wired and tested:

```
SWA hostname:             <name>.azurestaticapps.net
Workflow filename:        azure-static-web-apps-<name>.yml
RESEND_API_KEY set:       [ ] Yes
ALLOWED_ORIGINS set:      [ ] Yes
cedartutoring.com:        [ ] Ready  [ ] Pending  [ ] Failed
www.cedartutoring.com:    [ ] Ready  [ ] Pending  [ ] Failed
Resend sender domain:     [ ] cedartutoring.com verified  [ ] resend.dev fallback active
```

> ⚠️ **Warning:** Do NOT make the repo private until Trinity confirms the Function is wired, the form submits end-to-end, and an email arrives at `Info@cedartutoring.com`. Changing repo visibility mid-deployment breaks the SWA GitHub connection and requires re-authentication.

---

## Cost Reality Check

| Item | Cost |
|---|---|
| Azure Static Web Apps — Free plan | $0/month |
| Azure Managed Functions — 1M executions/month free | $0/month |
| Resend — 3,000 emails/month, 100/day free tier | $0/month |
| Cedar's actual volume | ~50 emails/month |
| **Total** | **$0/month** |

Azure free credit ($100/month) covers this entirely. SWA Free plan costs $0 even without credits.

---

## Troubleshooting

**Build fails: `out/` not produced**
- Verify `next.config.ts` still has `output: 'export'`:
  ```bash
  grep "output" next.config.ts
  ```

**Site builds but loads at `/cedar-tutoring-website/` instead of `/`**
- `next.config.ts` has `basePath: '/cedar-tutoring-website'` set for GitHub Pages. Trinity must remove (or condition) this before the Azure deploy works. Expected failure — ping Trinity.

**404 on `/api/submit-assessment`**
- API location in SWA build settings must be exactly `api` — no leading slash, no trailing slash. Check: **Azure Portal → SWA → Configuration → Build configuration**.

**Resend email lands in spam**
- The `cedartutoring.com` sender domain must be verified in Resend with SPF and DKIM TXT records added. Check Resend dashboard → Domains. If still unverified, emails will use Resend's shared domain and may hit spam filters.

**`npm ci` fails in the SWA build**
- `package-lock.json` must be committed. Verify:
  ```bash
  git ls-files package-lock.json
  ```
  If missing: `git add package-lock.json && git commit -m "chore: commit package-lock.json"`

**Custom domain stuck on "Validating" after 1+ hour**
- Re-check DNS records match Azure's displayed values exactly. Verify from terminal:
  ```bash
  dig www.cedartutoring.com CNAME
  dig cedartutoring.com TXT
  ```
