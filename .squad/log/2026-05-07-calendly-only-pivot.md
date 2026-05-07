# Session Log: 2026-05-07 Calendly-only Pivot

**Date:** 2026-05-07  
**Time:** 17:30–17:50Z  
**Coordinator:** Shaeel (directive)  
**Architects:** Morpheus (rescope decision)  
**Developers:** Trinity (pivot implementation, in-flight)  
**QA:** Mouse (test rescope, parallel)  
**Logger:** Scribe (decision merge + orchestration)

## Trigger

Shaeel discovered duplicate-fields UX bug during testing: Cedar's assessment form rendered above Calendly's booking form, creating friction. Directive: drop Cedar's form, use Calendly alone until Wave 3.

## Decisions

1. **Calendly-only `/book-assessment`** — Inline Calendly embed + supporting sections (hero, What to Expect, social proof, FAQ); no form rendering
2. **Form code preservation** — `BookAssessmentPageClient.tsx` stays in repo dormant; marked for Wave 3 custom form foundation
3. **Wave 3 rescope** — Shifts from "form backend only" to atomic replacement of both form + calendar together; 5 open questions surfaced

## Outcomes

- **Commits:** 1c0d348 (form-first, superseded), fe9f9ab (Wave 3 rescope), fb3c5f7 (Calendly-only pivot)
- **Deployment:** GitHub Pages run 25526377501 (Calendly-only shape verified live)
- **Spec updates:** `.squad/specs/azure-function-submit-assessment.md`, `combined-review.md`, `azure-setup-guide.md` updated with rescope rationale + 5 open questions
- **Test rescope:** Playwright coverage shifted from form validation to Calendly embed + redirect verification

## Anti-Drift

Calendly-only honors Wave 1 P0 #2 (canonical CTA `/book-assessment`). When Wave 3 ships, same URL endpoint serves custom form + calendar; no CTA redirect needed.

## Learnings

When product UX hits a dead-end, prefer pivot-in-place: rescope the current work to drop the problematic component, preserve supporting work that remains valid. Form-first merge shed the form rendering but kept CTA unification, nav restructure, page structure — substantial work that advances the site on any path.
