# Skill: Next.js Environment Variables (NEXT_PUBLIC_ rule)

**Domain:** Next.js / TypeScript  
**Last updated:** 2026-05-07T19:02:14-05:00

---

## Core Rule

| Variable type | Prefix required | Available in |
|---|---|---|
| Flag/config read by client code | `NEXT_PUBLIC_` | Server + Client (inlined at build time) |
| Secret (API key, token, DB url) | No prefix | Server only (never exposed to client) |
| Build-time-only config (next.config.ts) | No prefix | Build process only |

**`NEXT_PUBLIC_` vars are inlined at build time.** Changing them post-build has no effect on a deployed static export.

---

## The failure mode to avoid

```ts
// ❌ WRONG — undefined on the client
const isGhPages = process.env.DEPLOY_TARGET === "github-pages";

// ✅ CORRECT — inlined at build time, available on both server + client
const isGhPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages";
```

Non-`NEXT_PUBLIC_` vars produce `undefined` during client hydration. This causes SSR/client mismatch, broken images, silent wrong behavior, and 404 console errors from `next/image` priority preloads.

---

## Checklist: adding a new env-controlled feature

- [ ] Identify every file that reads the env var
- [ ] For each file: is it reachable from a `'use client'` component or shared lib? → `NEXT_PUBLIC_` required
- [ ] Does the var contain a secret? → no `NEXT_PUBLIC_` (server-only)
- [ ] Update all setters consistently: CI workflow env blocks, `package.json` scripts, `.env.local.example`
- [ ] Build with var set; grep built `out/index.html` to confirm correct value embedded
- [ ] Build with var unset; confirm fallback is correct
- [ ] Run Playwright smoke tests; confirm no new failures

---

## How to audit existing violations

```bash
# Find all process.env reads in source
grep -rn "process\.env\." src/ --include="*.ts" --include="*.tsx" | grep -v "NEXT_PUBLIC_"

# Cross-check: are any of these files imported by a 'use client' module?
grep -rn "'use client'" src/ --include="*.tsx" -l
```

Any hit from the first grep that is transitively imported by a Client Component is a potential `NEXT_PUBLIC_` violation.

---

## Cedar project specifics

- `NEXT_PUBLIC_DEPLOY_TARGET=github-pages` — gates `basePath`/`assetPrefix` in `next.config.ts` and the `imagePath()` helper in `src/lib/image-path.ts`
- Set in `.github/workflows/deploy-pages.yml` build step env
- Never set for Azure SWA (correct: site serves from domain root, no basePath needed)
- Azure App Settings (server secrets) must never be `NEXT_PUBLIC_`
