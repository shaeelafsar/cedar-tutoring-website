## Recent Work

**Foundational context archived to history-archive.md (2026-05-07T16:50:00Z). This file tracks active work from Wave 1 P0 execution onward.**

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
