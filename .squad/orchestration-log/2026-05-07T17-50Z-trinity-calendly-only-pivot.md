# Orchestration Log: trinity-calendly-only-pivot

**Date:** 2026-05-07T17:50Z  
**Agent:** Trinity (claude-sonnet-4.6, background)  
**Task:** Pivot `/book-assessment` to Calendly-only after duplicate-fields bug discovery

## Summary

Pivoted from form-first merge to Calendly-only path. Discarded form rendering; preserved CTA unification, nav cleanup, and page structure. Form code (`BookAssessmentPageClient.tsx`) marked dormant for future Wave 3 custom form foundation.

## Outcome

**Status:** Complete, deployed to GitHub Pages  
**Deployment:** Run 25526377501  
**Commit:** fb3c5f7

**Deliverables:**
- `/book-assessment` renders Calendly-only embed + supporting sections (hero, What to Expect, social proof, FAQ)
- `BookAssessmentPageClient.tsx` preserved in repo with TODO comment marking it dormant for Wave 3
- CTA unification survived (site-wide "Book Free Assessment" → `/book-assessment`)
- Nav cleanup survived (removed "Free Trial" from primary + mobile nav)
- `/free-trial` → `/book-assessment` redirect active
- Footer reference updates active

## Rationale

Shaeel discovered duplicate-fields UX wart: Cedar's form above Calendly's form created friction despite prefill. Calendly-only eliminates the wart entirely while preserving Wave 3 as coherent Calendly replacement (form + calendar together).

## Cross-ref

See `.squad/decisions.md` "Session 2026-05-07 (continued): Calendly-only pivot + Wave 3 rescope" for full context.
