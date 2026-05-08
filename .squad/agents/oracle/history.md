## Summary

**Web-design specialist executing framework-grounded UX/UI audit for Cedar Tutoring Academy website (May 7).** Applied Nielsen heuristics, Krug, CCD Attention Ratio, Hick's Law, IA (Rosenfeld/Morville), Halvorson Content Audit, WCAG 2.1 AA, Gestalt+Fitts frameworks. Captured 40 Playwright screenshots (20 pages × 2 viewports). Verdict: site is NOT bloated; repetition is intentional. Found 1 P0 (pricing duplicate intro) and 4 visual-rendering bugs (all ARTIFACTS per Trinity follow-up triage). Screenshots in `.squad/agents/oracle/screenshots/` (do not commit). Findings feed Wave 3 priorities.

**Historical entries archived** → `.squad/agents/oracle/history-archive.md`

## Learnings (Current)

### Visual Bug Triage Results (2026-05-07T18:45:00-05:00)

**By:** Trinity (Frontend Engineer) — follow-up on Oracle's 4 reported visual bugs

**Verdict: All 4 = ARTIFACTS** (screenshot timing, not render bugs)

1. **Team images blurriness (/about)** — Artifact (Reveal animation + screenshot timing)
2. **Form field color shift (/summer-programs)** — Artifact (whileInView animation + screenshot timing)
3. **Reviews grid misalignment (/reviews)** — Artifact (Reveal timing)
4. **Map placeholder (/locations)** — Artifact (screenshot taken before mount)

**Action Taken:**
- Applied P0: Pricing intro duplicate dedup
- Applied P1: FAQ default "All" → "General" (Hick's Law)
- Applied P1: why-us 10 reasons → 3 thematic groups
- Skipped: Reviews loading state (SSG synchronous, not applicable)

**Recommendation:** Pair screenshot audits with scroll-into-view tests to verify actual render behavior vs. animation/timing artifacts. Skill documented at `.squad/skills/visual-bug-triage/SKILL.md`.

**Open Question:** /locations map needs live Google Maps embed (requires API key + Oracle design spec).
