## Recent Work

**Foundational context archived to history-archive.md (2026-05-07T16:50:00Z). This file tracks active work from Wave 1 P0 execution onward.**

### WordPress AI Prompt Variant (2026-05-07T15:57:23-05:00)
**By:** Morpheus (Lead/Architect)
**Requested by:** Shaeel
**Status:** COMPLETE — chat-side deliverable only (no file saved per instructions)

Produced a second distillation prompt for Cedar — this time targeting WordPress AI (the site-builder AI inside WP admin / WordPress.com), NOT a code-writing agent. This is a fundamentally different deliverable from the prior Next.js greenfield prompt.

**Calibration applied vs. the prior code-writing AI prompt:**
- DROPPED: Next.js, Zod, static export, basePath, Azure SWA, Azure Functions, Resend, camelCase API contracts, response envelopes, Tailwind, shadcn, Radix, Markdown content model, deploy target alternatives, GitHub Pages, and the 5 technical Gotchas list (all Next.js-specific noise for a WP AI builder).
- ADDED: Visual/aesthetic direction (warm greens, earthy gold), photography style guidance (real photos, no generic stock), plugin guidance (WP AI over-installs — explicit restraint requested), Calendly inline embed instruction (owner already uses it), form fields via native/plugin form (not a coded endpoint), footer hours block, phone/address/email as tel:/maps/mailto links.
- PRESERVED: Business identity, Worth IL geography guardrail, canonical "Book a Free Assessment" CTA, sitemap (15 pages), partial pricing disclosure rule, real-Google-reviews-only rule, NOT-to-build section, and escape hatch.

**Key insight:** WordPress AI is content-and-design-led. It does not consume API contracts or deploy config. The receiving context is a page/block builder, not a compiler. Prompts for WP AI should read like a brand brief + content brief, not a technical spec.

### Round 2 Cross-Review: Spec, Guide, Test Plan Lock-in (2026-05-07T14:50:02-05:00)
**By:** Morpheus (Lead/Architect)
**Status:** COMPLETE — all artifacts reviewed, spec patched, decisions locked

**Trinity's azure-setup-guide.md:** APPROVED. Guide is well-structured, Resend steps complete, basePath blocker already surfaced in Step 2 warning. No substantive edits needed.

**Mouse's test-plan-azure-function.md:** APPROVED WITH 4 REQUIRED FIXES filed to `.squad/decisions/inbox/morpheus-mouse-test-plan-fixes.md`:
1. Field names must be camelCase (not snake_case) to match spec
2. `errors` response shape is object `{ field: message }`, not array `[{ field, message }]`
3. §1.9 (413 test) needs splitting: 2000-char field cap → 400, 16KB total cap → 413
4. §1.8 (429 test) needs Retry-After sub-cases per Q4

**Q1-Q5 answers locked** in `.squad/decisions/inbox/morpheus-roundtwo-decisions-q1-q5.md`:
- Q1: Keep `{ success, message, errors? }` envelope (not `{ ok, error }`)
- Q2: `from: "Cedar Tutoring Website <noreply@cedartutoring.com>"`, `subject: "Cedar Tutoring — New Assessment Request"`
- Q3: ALLOWED_ORIGINS = exact string match, no wildcards
- Q4: Forward Resend's Retry-After header if present
- Q5: Honeypot field = `botcheck` (confirmed everywhere)

**Additional decision:** Honeypot triggers 200 silent discard (not 400). Spec §3a and §11 updated.

**basePath blocker:** Added to pre-production-checklist.md as Trinity-owned 🔴 blocker under Azure SWA Provisioning, sequenced before first SWA build. Spec §13 migration checklist also updated.

### Wave 1 P0 Execution: CTA & Local SEO Standardization (2026-05-07T11:31:02-05:00)
**Executed by:** Trinity (Frontend Dev)  
**Status:** ✅ CLOSED (3 of 10 P0 items)  
Trinity closed P0 #2 (CTA standardization), P0 #4 (local SEO geography), and P0 #10 (contact cities status). All "Admission Form" wording retired across content/ + src/; canonical CTA is "Book a Free Assessment" → `/book-assessment/`. All "Dallas-Fort Worth" references replaced with "Worth, IL and the South Suburbs of Chicago" in metadata and visible copy. Contact cities section verified complete. Grep verification confirms zero remaining instances of retired text/paths. tsc --noEmit clean. Decisions captured in `.squad/decisions.md`.

### WP Pricing Extraction: /plans/ Research (2026-05-07T11:40:51-05:00)
**By:** Morpheus (Lead/Architect)  
**Status:** COMPLETE — research only. Trinity to implement once Shaeel approves proposed structure.

**Confirmed pricing tiers (live WP site):**
- **As-Needed Tutoring:** $40/hour (only hard price published)
- **Family Plans:** NOT PUBLISHED (monthly; "Book a Free Consultation Now")
- **Academic Coaching:** NOT PUBLISHED ("affordable monthly package")
- **Test Prep (SAT/ACT):** NOT PUBLISHED ("competitive monthly packages")

**Pattern:** Partial pricing disclosure model — entry-level rate public, monthly/package rates gated behind consultation. This is deliberate sales tactic. New /pricing page should respect this intent rather than override it with invented numbers.

### Form Solutions Research & Architecture Recommendation (2026-05-07T14:27:00-05:00)
**By:** Morpheus (Lead/Architect)
**Status:** PROPOSED — awaiting owner approval
**Deliverable:** `.squad/research/form-solutions-comparison.md`
**Decision inbox:** `.squad/decisions/inbox/morpheus-form-architecture.md`

Researched all five categories of form handling for static sites (hosted public-key services, embedded widgets, mailto, serverless relay, headless builders). Recommended Azure SWA managed Function + Resend over Web3Forms relay, SendGrid, Google Forms, Microsoft Forms, and custom SMTP. Addresses Shaeel's questions about Microsoft Forms, Google Forms, and "design our own form against Google API."

## Learnings

### Practical hierarchy of form solutions for static sites
1. **Mailto / static contact info** — zero effort, zero UX
2. **Embedded third-party widget** (Google/MS Forms iframe) — 5 min setup, breaks brand
3. **Hosted form service with public key** (Web3Forms, Formspree) — 30 min setup, key is public by design
4. **Serverless function relay → email API** — 2 hours setup, secrets server-side, full control ← sweet spot for any dev with a serverless host
5. **Full headless form backend** — 4-8 hours, overkill unless form needs are complex

### Azure SWA + same-origin Functions pattern
Azure Static Web Apps' managed Functions feature is the killer pattern for static-site solo devs: drop an `api/` folder in your repo, Functions auto-deploy with the site, routes are same-origin (no CORS), free tier includes 1M executions/month. No separate Function App resource needed. This collapses the "I need a backend for my static site" problem into "add a folder."

### Why public-key form services keep coming up despite being "less secure"
Web3Forms/Formspree public keys are not traditional API secrets — they're designed to be exposed. The real defense is rate limiting + honeypots + origin checks, not key secrecy. A harvested key lets an attacker send spam submissions to *your* inbox (annoying but not a data breach). For most solo devs, this tradeoff is fine. Shaeel's preference for server-side secrets is a stronger-than-necessary posture, but it costs nothing extra given Azure migration, so it's the right call.

### Anti-drift audit findings for Azure SWA + Resend migration (2026-05-07T14:50:02-05:00)
1. **Wave 3 scope is consistent with original plan.** Wave 3 was always "execute on form backend decision" — Azure SWA + Resend is that decision, not scope expansion.
2. **No scope creep from Azure migration.** The migration replaces GitHub Pages hosting (a pre-existing need) and solves the form backend (P0 #1) in one move. It does NOT introduce new features.
3. **Web3Forms references needed cleanup** in combined-review.md P0 #1, pre-production-checklist.md (Form Hardening section), and `.env.local.example`. All updated.
4. **GitHub Pages references retired** from pre-production-checklist.md DNS section (CNAME file, GitHub Pages IPs, Let's Encrypt). Replaced with SWA equivalents.
5. **hCaptcha dependency dropped.** Web3Forms hCaptcha was in the checklist — not needed with Azure Function honeypot + Origin validation. No new CAPTCHA service introduced (honeypot is sufficient for Cedar's threat model).
6. **Wave 4 (P1 polish) is unaffected** by Azure migration — nav restructure, mobile drawer, photographer session, etc. remain as-is.
7. **No new agents needed for Wave 3.** Trinity implements, Mouse tests, Shaeel provisions. Morpheus wrote the spec.

### Architecture spec pattern for serverless form endpoints
When writing specs for team consumption (Trinity implements, Mouse tests): lock every decision (payload schema, validation order, response codes, env var names, file paths). Don't leave "TBD" in a single-round spec — it becomes a blocker. Include a test hooks section that maps 1:1 to what the tester needs to assert.

### Free Trial vs Book Assessment — IA/Funnel Analysis (2026-05-07T17:05:00-05:00)
**By:** Morpheus (Lead/Architect)
**Requested by:** Shaeel
**Status:** COMPLETE — Analysis + recommendation delivered
**Output:** `.squad/decisions/inbox/morpheus-free-trial-vs-book-assessment.md`

**Question:** "Free Trial allows customer to book via Calendly and Book Assessment just lets them fill out a form — wouldn't this create sign-up fatigue or confusion for the end user?"

**Findings:**
1. **Operational gap:** Free Trial (Calendly) and Book Assessment (form) exist as two separate funnels with different destinations (Calendly calendar vs Info@ inbox). No evidence Cedar's team is deliberately running a two-funnel strategy; appears vestigial.
2. **Architectural drift:** Wave 1 P0 #2 locked "Book a Free Assessment" as the canonical CTA and said Free Trial should be inside-funnel only. Current nav exposes both top-level, violating that decision.
3. **Lead quality & ops inefficiency:** Calendly bookings arrive with zero assessment context (what program? what grade?); form submissions arrive without calendar availability. If both feed to the same person, Cedar must choose between fast scheduling (Calendly) or contextual intake (form), not both.
4. **SEO cannibalization:** Two near-identical pages competing for "Cedar free [X]" keywords.

**Recommendation:** **Option B — Merge** into single canonical "Book a Free Assessment" page with optional paths: Calendly inline (for calendar-first parents) + form below (for context-first parents). Both lead to same outcome (assessment + conversation). Clears IA, fixes Wave 1 P0 #2 drift, makes Wave 4 nav restructure clean (no top-nav Free Trial icon).

**Wave 3 impact:** None — form spec unchanged, Azure Function unaffected. Merge is a UX/content reorganization, not a backend change.

**Owner decision needed:** Should merged page offer Calendly first or form first? Architecture answer is B either way.

### Wave 3 Spec/Guide/Test-Plan Trio Locked (2026-05-07T19:50:02Z)
**Status:** COMPLETE — Single-round cross-review done. All 5 open questions resolved. All 3 outputs approved/locked (with 4 test plan mechanical fixes noted).

**Cross-agent sync:**
- Trinity's azure-setup-guide.md: APPROVED — user-facing 6-step checklist ready for Shaeel
- Mouse's test-plan-azure-function.md: APPROVED WITH 4 FIXES (field name camelCase, response shapes object not array, additionalNotes 2000 not 5000, honeypot 200 not 400)
- Morpheus's azure-function-submit-assessment.md: SPEC LOCKED with honeypot 200 silent discard confirmed as industry standard

**Decisions locked:** Honeypot 200, response envelope finalized, ALLOWED_ORIGINS exact match, Resend email details locked, Q1-Q5 all answered.

**Ready for:** Trinity implementation, Mouse test code, Shaeel provisioning (no blockers remain).

### Project Distillation into Greenfield AI Prompt (2026-05-07T15:45:09-05:00)
**By:** Morpheus (Lead/Architect)
**Requested by:** Shaeel
**Status:** COMPLETE — chat-side deliverable only (no file saved per instructions)

Synthesized the entire Cedar project into a single 900-word copy-pasteable prompt a greenfield AI agent could use to rebuild the site from scratch. Covered: business reality, IA (routes + nav), tech stack with rationale, content model (markdown + Zod), form architecture (Azure SWA + Resend + honeypot), deploy target reasoning (SWA vs GitHub Pages vs Cloudflare), quality bar, what-not-to-do, five real gotchas, and delivery order.

**Pattern extracted to:** `.squad/skills/project-distillation-prompt/SKILL.md`

**Key distillation choices:**
- Business-first ordering (not stack-first) — forces the receiving agent to internalize audience constraints before writing a line of code
- "What NOT to build" section included — AI agents over-build for small business clients without explicit guardrails
- Gotchas section is highest-value: represents actual debugging hours, not generic best practices
- Calibrated length: ~900 words (within 600-1200 target) using headed sections so the receiving agent can navigate
- Corrected location: Worth, IL / South Suburbs of Chicago (NOT Frisco TX which was the P0 SEO bug we fixed)

### Wave 3 Paused — What Ships Now (2026-05-07T20:18:00-05:00)
**By:** Morpheus (Lead/Architect)  
**Status:** APPROVED — shortlist ready for squad dispatch

Shaeel paused Wave 3 pending Azure SWA + Resend provisioning. Analyzed remaining backlog to find safe, independent work.

**Four workstreams approved to ship in parallel:**
1. **Housekeeping** (git cleanup) — Trinity, ~30 min, LOW RISK
2. **basePath env-gate** — Trinity, ~2 hours, LOW-MEDIUM RISK → PREREQUISITE FOR WAVE 3
3. **Wave 4 P1 nav restructure** — Trinity, ~8 hours, MEDIUM RISK → serialize after basePath
4. **Wave 4 P1 mobile drawer fix** — Trinity, ~3 hours, LOW RISK → parallel with nav

**basePath Decision: GO** ✓
- Gate on `DEPLOY_TARGET=github-pages` (not `NODE_ENV`)
- GH Pages CI sets DEPLOY_TARGET=github-pages → basePath active (current behavior preserved)
- Local dev / SWA → DEPLOY_TARGET unset → basePath disabled (correct for SWA domain root)
- Changes: `next.config.ts` (3 lines), `deploy-pages.yml` (1 env var line)
- No source code changes needed (`imagePath()` utility already handles dual-base correctly)
- Risk: LOW-MEDIUM (mechanical change, well-tested in build system, fallback exists)

**When Wave 3 Resumes:** Shaeel signals → Trinity scaffolds Form backend, Mouse tests. First SWA build will be clean (basePath already landed as critical prerequisite).

**Output:** `.squad/decisions/inbox/morpheus-wave3-paused-shortlist.md` — full ordered backlog with dispatch phases.

