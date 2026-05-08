## Summary

**Lead Architect for Cedar Tutoring Academy website rebuild (Next.js 15/React 19/Tailwind/TypeScript).** Currently managing Wave 3 pause pending owner calendar architecture decision. Wave 1 P0 execution complete (CTA + SEO standardization). Form backend spec locked with all 5 cross-agent questions resolved. Calendly-only interim path live on GitHub Pages. Azure SWA + Resend backend design complete; awaiting owner provisioning signal. basePath env-gate spec ready (Trinity-owned prerequisite for Wave 3 build).

**Foundational context archived to history-archive.md (2026-05-08T20:46:56Z).**

---

## Wave 3 Status: Paused, Ready to Resume

**Current state:** Calendly-only (form code preserved dormant for Wave 3 foundation)  
**Blockers:** Awaiting owner decision on 5 Wave 3 calendar architecture questions  
**Prerequisites:** basePath env-gate (Trinity's 2-hour task) sequenced before Wave 3 build  
**Spec readiness:** azure-function-submit-assessment.md locked; test plan approved with 4 mechanical fixes; azure-setup-guide.md approved

### Five Open Questions for Wave 3 Expanded Scope

1. **Custom calendar implementation approach** — Build from scratch? OSS library (React-big-calendar, Temporal, etc.)? Self-host Calendly-like SaaS (Cal.com)?
2. **Availability & sync strategy** — How does Asmah manage availability today? Will custom calendar need Google Calendar API, iCal, or manual entry?
3. **Concurrent slot booking prevention** — How to prevent race conditions? Database transactions? Pessimistic locking? Optimistic concurrency?
4. **Reminder email automation** — Replicate Calendly's reminders (24h before, day-of)? Use Resend templates + cron? Azure Logic Apps? Scheduled Function?
5. **Data storage & migration** — Where to persist bookings, availability, history? (Azure Table Storage, CosmosDB, PostgreSQL?) Migrate existing Calendly bookings as part of cutover?

### Shortlist for Parallel Work While Wave 3 Paused

1. **Housekeeping (git cleanup)** — Trinity, ~30 min, LOW RISK
2. **basePath env-gate** — Trinity, ~2 hours, LOW-MEDIUM RISK (PREREQUISITE FOR WAVE 3)
3. **Wave 4 P1 nav restructure** — Trinity, ~8 hours, MEDIUM RISK (serialize after basePath)
4. **Wave 4 P1 mobile drawer** — Trinity, ~3 hours, LOW RISK (parallel with nav)

**Wave 3 Resume Signal:** Shaeel signals calendar decision + provisioning start → Trinity scaffolds custom form/calendar backend, Mouse tests, deploy to SWA.

---

## Key Learnings

1. **Rescope decision pattern:** When product UX hits dead-end (duplicate-fields), pivot-in-place not revert. Wave 3 shed the form rendering (intermediate state was wart) but kept CTA unification, nav restructure, page structure — substantial work that survives intermediate state.

2. **Project distillation as team asset:** Synthesizing Cedar into 900-word greenfield prompt (business-first, what-NOT-to-build, gotchas) captured architecture knowledge for reuse. Business-first ordering + explicit guardrails prevent AI over-building for small business.

3. **Azure SWA managed Functions killer pattern:** For static-site solo devs, SWA + Functions is perfect fit: drop `api/` folder, auto-deploy same-origin, free 1M executions/month. Collapses "I need a backend" into "add a folder."

4. **Public-key form service model:** Web3Forms/Formspree keys are NOT traditional secrets. Defense is rate limiting + honeypots + origin checks, not key secrecy. Harvested key lets attacker spam *your* inbox (annoying, not breach). Shaeel's server-side-secrets posture is stronger-than-necessary but costs nothing extra given Azure migration.
