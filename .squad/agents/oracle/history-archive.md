# Oracle Agent History Archive

## UX/UI Bloat & Repetition Audit (2026-05-07T18:22:39-05:00)

**Request:** Comprehensive bloat and repetition audit across all pages.

**Key Findings:**
1. CTA density appropriate (3-5 per page standard); /book-assessment exception (10, self-referential)
2. Testimonial reuse conservative (7 of 18 used across site)
3. Cross-page structural repetition intentional (finalCta, trustBullets)
4. /why-us vs. Home "Why Cedar" — NOT duplicate (teaser vs. full version)
5. FAQ overlap — contextually relevant, not duplication
6. Page size rankings: /reviews (186K), /faq (100K), /why-us (98K), /about (85K)

**P0:** Trim /book-assessment redundant CTAs (10→5)
**P1:** Consider removing Home comparison table; /free-trial could simplify

---

## Merged /book-assessment Mockup — Concrete UX Structure (2026-05-07T17:12:53-05:00)

**Request:** Fold-by-fold walkthrough of merged Free Trial + Book Assessment page.

**Decision:** Form-first structure (intake form primary, Calendly post-submit optional fast-track).

**Section order:** Hero → Form → Success State + Calendly (conditional) → What to Expect → Testimonials → FAQ

**Parent journeys:**
- Journey A (Deliberate): Fill form, wait for Cedar callback
- Journey B (Impulse): Fill form, optionally grab Calendly slot

**Mitigations:** Clear next-step language, reassurance sections, testimonials, contextual FAQ

**P0 Recommendations:** TRIM pricing duplicate intro; KEEP finalCta pattern
**P1 Recommendations:** Add reviews count badge; verify /about team images loading

**Status:** Audit complete, report delivered, no code changes made.

---

## Visual Bug Triage Results (2026-05-07T18:45:00-05:00)

**By:** Trinity (Frontend Engineer)

**Verdict: All 4 Oracle-reported bugs = ARTIFACTS** (screenshot timing, not render bugs)
- Team images blurriness → Reveal + screenshot timing
- Form field color shift → whileInView + screenshot timing
- Reviews grid misalignment → Reveal timing
- Map placeholder → screenshot before mount

**Actions Taken:** Pricing intro dedup (P0), FAQ default "General" (P1), why-us 10→3 reasons (P1)

**Recommendation:** Pair screenshot audits with scroll-into-view tests going forward.

**Open:** /locations map needs live Google Maps embed (API key + spec required).
