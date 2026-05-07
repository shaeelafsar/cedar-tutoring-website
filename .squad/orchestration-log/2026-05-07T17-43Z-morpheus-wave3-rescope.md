# Orchestration Log: morpheus-wave3-rescope

**Date:** 2026-05-07T17:43Z  
**Agent:** Morpheus (claude-haiku-4.5, background)  
**Task:** Rescope Wave 3 spec docs to full Calendly replacement (form + custom calendar + Resend backend)

## Summary

Clarified Wave 3 scope expansion from "form backend only" to atomic replacement of both form + calendar together. Updated spec docs with rescope rationale, new unblock criteria, and 5 open questions for future pre-work.

## Outcome

**Status:** Complete  
**Commit:** fe9f9ab

**Files Updated:**
1. `.squad/specs/azure-function-submit-assessment.md` — Added "Wave 3 Scope (revised 2026-05-07)" section explaining three deliverables ship together, new unblock criteria, rationale
2. `.squad/specs/azure-function-submit-assessment.md` — Added §14 "Open Questions for Wave 3 Expanded Scope" surfacing 5 unanswered questions (calendar approach, availability sync, concurrency, reminders, persistence)
3. `combined-review.md` — Updated Wave 3 section to reflect rescope, new unblock criteria, appendix rescope date/status
4. `azure-setup-guide.md` — Added context in "What You're Building" section explaining Wave 3 as full Calendly replacement project

## Open Questions Surfaced

Wave 3 cannot unblock until these are decided:
1. Custom calendar implementation approach (build, OSS, or self-hosted SaaS)
2. Availability & sync strategy (current workflow mapping + Google Calendar integration)
3. Concurrent slot booking prevention (transactions, pessimistic/optimistic concurrency)
4. Reminder email automation (24h before, day-of; Resend templates + cron or Logic Apps)
5. Data storage & migration (Azure Table Storage, CosmosDB, PostgreSQL; Calendly booking cutover strategy)

## Anti-Drift Check

Verified Calendly-only intermediate state honors Wave 1 P0 #2 (canonical CTA `/book-assessment`). When Wave 3 ships, same URL endpoint serves custom form + calendar; no CTA redirect needed.

## Cross-ref

See `.squad/decisions.md` "Session 2026-05-07 (continued): Calendly-only pivot + Wave 3 rescope" for full context.
