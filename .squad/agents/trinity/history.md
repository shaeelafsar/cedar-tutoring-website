## Recent Work

**Previous entries (Markdown migration, Google reviews, content polish, documentation, WordPress migration, Wave 1 P0 fixes) archived to history-archive.md.**

### Wave 2 Batch A — P0 fixes and Form Integration (2026-05-07T12:42:00-05:00)
**Status:** ✅ COMPLETED — P0 items verified and form integration wired for Web3Forms relay

### Wave 2 Batch B — /pricing page rebuild (2026-05-07T12:32:14-05:00)
**Status:** ✅ COMPLETED — Three pricing tiers with sub-tier toggle, live pricing data, FAQ section

### Azure Setup Guide Authored (2026-05-07T14:50:02.947-05:00)
**Status:** ✅ COMPLETED — 6-step Portal-only checklist for Shaeel to provision Azure SWA + Resend
- Wrote `azure-setup-guide.md` at repo root
- Filed `.squad/decisions/inbox/trinity-nextconfig-basepath-azure.md` flagging basePath blocker

### Azure Function Spec Cross-Review (2026-05-07T14:50:02.947-05:00)
**Status:** ✅ COMPLETED — Reviewed Morpheus spec against form code, form contract locked
- Verified form fields: 10 fields (9 inputs + 1 honeypot), all camelCase
- Honeypot confirmed: `botcheck`
- Spec verdict: NEEDS REVISIONS (3 issues: honeypot 200 vs 400, runtime not specified, additionalNotes length clarification)
- Test plan issues: 4 fixes needed (field names snake_case → camelCase, response shapes, length, honeypot behavior)
- basePath recommendation: Option (b) — gate behind `DEPLOY_TARGET=github-pages`

### Wave 3 Spec/Guide/Test-Plan Trio Locked (2026-05-07T19:50:02Z)
**Status:** COMPLETE — Single-round cross-review done. All 5 open questions resolved.

**Cross-agent sync:**
- Azure setup guide: APPROVED — user-facing 6-step checklist ready for Shaeel
- Test plan: APPROVED WITH 4 FIXES (field names, response shapes, additionalNotes max length, honeypot behavior clarification)
- Spec: LOCKED with honeypot 200 silent discard confirmed, response envelope finalized, all decisions from Q1-Q5 implemented

**Ready for implementation:** Trinity to write `api/submit-assessment/index.ts`, Mouse to write test code, Shaeel to provision.

## Learnings

- **Framer Motion `whileInView` + screenshot tools (2026-05-07):** Every section wrapped in `<Reveal>` (or any `motion.*` component with `whileInView`) starts at `opacity: 0`. Static screenshot tools (Playwright full-page without scroll, Oracle's audit tool) capture pages without triggering scroll events, so ALL below-fold Reveal-wrapped content appears blank. This is NOT a rendering bug — content is in the DOM and visible to real users who scroll. Oracle's 4 flagged blank sections (about team, summer fields, reviews grid, locations cards) were ALL this artifact. Diagnosis method: source-check if the section uses `<Reveal>` → artifact; if it doesn't → real bug.
- **`/reviews` ReviewsGrid filter default (2026-05-07):** Default state is `Object.fromEntries(groups.map(g => [g.id, g.options[0].id]))`. Both groups' first option is `id: "all"` so default shows all 18 reviews. The "empty grid" in Oracle's screenshot was the Framer Motion artifact (cards use `motion.article whileInView`), not a filter bug.
- **`/faq` FaqExplorer filter wiring (2026-05-07):** `activeCategory` state initialized to `categories[0]` (was "All" → 18 items). Changed to `categories.includes("General") ? "General" : categories[0]` to default to the most-focused first category. Filter logic: "All" bypasses filter; any other category filters `item.category === activeCategory`. Correct behavior verified in build.
- **`/why-us` reasons grouping pattern (2026-05-07):** 10 flat reasons regrouped into 3 themes at render-time in page.tsx without touching content. Pattern: define `{ theme, indices }` array as a constant co-located in the section JSX, then map over it to render group headers + sub-lists using the original `whyUsContent.reasons.items[idx]` values. Numbers kept (1-indexed per original position) so readers can still reference "reason 7." Content file unchanged.

- **User-facing setup checklists pattern:** Lead with "two halves" mental model (host + backend). Pre-flight checklist before steps. Use `📝 Capture this:` blocks with blank fill-ins. Callout admonitions for warnings/done-conditions/tips. Troubleshooting at end.
- **Azure SWA gotchas:**
  1. basePath must not be NODE_ENV=production-gated (SWA builds always run production)
  2. API location must be exactly `api` (no slashes)
  3. First SWA build fires immediately — likely fails before config fix lands
  4. Both deploy-pages.yml and azure-static-web-apps-*.yml coexist until E2E verified
  5. Custom domain: do www (CNAME) before apex (ALIAS/ANAME + TXT)
  6. App Settings are server-only — never NEXT_PUBLIC_*

- **Form contract locked:** All 10 fields camelCase, types/required/max-length finalized against BookAssessmentPageClient.tsx
- **programInterests:** Array in new payload (not comma-joined as Web3Forms used)
- **Honeypot field:** botcheck confirmed (no form changes needed)
- **Azure Functions v4 preferred:** app.http() inline registration model, Node 20 LTS

- **basePath env-gate (2026-05-07):** Gated `basePath`/`assetPrefix` in `next.config.ts` behind `process.env.DEPLOY_TARGET === 'github-pages'` instead of `NODE_ENV === 'production'`. The GH Pages workflow (`deploy-pages.yml`) now sets `DEPLOY_TARGET=github-pages` in its build step env. Both behaviors verified locally: unset → no basePath (correct for Azure SWA); set → basePath active (GH Pages preserved). **Sharp edge:** `src/lib/image-path.ts` still gates its basePath string on `NODE_ENV === 'production'` — this is a straggler that will misbehave on Azure SWA (images will get wrong prefix). Needs a follow-up commit to align it with the new `DEPLOY_TARGET` gate.
- image-path.ts gate brought in sync with next.config.ts — both now key on DEPLOY_TARGET=github-pages.

- **`NEXT_PUBLIC_` env rule (2026-05-07):** Any env var read in client-side code (including `src/lib/*.ts` modules imported by Client Components) **must** be prefixed `NEXT_PUBLIC_`. Non-prefixed vars are stripped from the client JS bundle at build time — they resolve to `undefined` on the client even if set correctly on the server. The root cause of the basePath 404: `image-path.ts` used `process.env.DEPLOY_TARGET` which was `undefined` during client hydration, producing a bare `/images/…` path that didn't match the server-rendered `/cedar-tutoring-website/images/…`. Fix: rename to `NEXT_PUBLIC_DEPLOY_TARGET` everywhere (image-path.ts, next.config.ts, deploy-pages.yml). `NEXT_PUBLIC_*` vars are inlined at build time and available on both server and client — no divergence possible. **Rule now codified in team decisions (2026-05-07T19:02:14-05:00).**

- **`uppercase` className regression cause (2026-05-07):** When introducing a new JSX element (like the thematic h3 headers in /why-us) by copy-adapting from an existing styled element, Tailwind utility classes in the source carry over verbatim. The `uppercase` class on the eyebrow label was inherited this way. Cedar's rule: `uppercase` is eyebrow-only. Detection grep: `grep -rn "uppercase" src/` — review every hit against the eyebrow-only rule; any `h2`/`h3`/`h4`/`button`/`a` tag that has `uppercase` outside a dedicated eyebrow/badge/chip context is a violation. **Rule now codified in team decisions (2026-05-07T19:02:14-05:00).**

---

## Wave 3 Pause & Phase 3 Context (2026-05-07)

- **Wave 3 paused** by Shaeel (Azure SWA + Resend provisioning out-of-band; spec locked; ready to ship when provisioning done)
- **Morpheus produced ordered shortlist:** 4 independent workstreams
  - Phase 1: Housekeeping (f59034b ✓)
  - Phase 2: basePath env-gate (18d15ec + d89d835 ✓) — prereq for Wave 3 Azure SWA deploy
  - Phase 3: Nav restructure (~8h, MEDIUM risk, serialize after Phase 2) + mobile drawer fix (~3h, can parallel)
  - Phase 4: Mobile polish (CTA bar, click-to-call, micro-interactions)
- **Phase 3 blockers:** Asmah Free Trial nav confirmation (minor), **Shaeel nav structure decision** (logo-as-home, 6-item flat nav, Reviews added, Free Trial removed from main nav)
- **basePath GO:** Ready to land independently; both local dev and GH Pages behavior verified; Azure SWA will serve from domain root ✓

---

## Session 2026-05-07 (continued): Form-first → Calendly-only Pivot (17:30–17:50Z)

**Lesson:** When product UX hits a dead-end, prefer pivot-in-place over revert.

Shaeel discovered duplicate-fields bug: Cedar's form above Calendly's form created friction. Rather than revert the entire form-first merge, Shaeel pivoted to Calendly-only `/book-assessment` while preserving the supporting work (CTA unification, nav cleanup, page structure). Form code (`BookAssessmentPageClient.tsx`) stays in repo dormant as Wave 3 custom form foundation.

**What survived:**
- Site-wide CTA standardization to "Book Free Assessment" → `/book-assessment` (Wave 1 P0 #2)
- Nav cleanup (removed "Free Trial" from primary + mobile nav)
- `/free-trial` → `/book-assessment` redirect
- Page structure + sections (hero, What to Expect, social proof, FAQ)
- Footer reference updates
- Azure Function spec, Resend integration contract, honeypot validation — all Wave 3 foundation

**Commits:** 1c0d348 (form-first, superseded for `/book-assessment` only), fe9f9ab (Wave 3 rescope docs), fb3c5f7 (Calendly-only pivot)

**Deployment:** GitHub Pages run 25526377501 (Calendly-only shape verified live)

- **Next.js App Router favicon + branding audit (2026-05-09T10:39:20-05:00):** App Router serves browser/app icons from co-located files in `src/app/`: root `favicon.ico` for legacy tabs, `icon.svg`/`icon.png` for modern icons, and `apple-icon.png` for iOS. Cedar's canonical source logo is `public/images/logos/cedar-logo-original.jpg` (1915×1061 JPEG). Use `src/lib/branding.ts` as the code source of truth for logo path/alt/intrinsic dimensions and `public/og-image.png` as the canonical social preview image. Header logo pattern: `next/image` with intrinsic `240×133`, rendered at `h-10 w-auto md:h-14`, above the fold with `priority`, explicit `sizes`, and branded alt text `Cedar Tutoring Academy`.
