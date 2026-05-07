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
