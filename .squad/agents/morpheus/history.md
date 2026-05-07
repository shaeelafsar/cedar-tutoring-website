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
