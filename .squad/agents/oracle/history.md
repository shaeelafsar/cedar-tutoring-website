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

### Typography Casing Audit (2026-05-07T19:02:00-05:00)

**By:** Oracle (UX/Design) — responding to user report "some fonts are all capitalized"

**Method:** Source grep (uppercase, tracking-) + Playwright visual inspection (14 pages, computed styles)

**Findings:**
- 50+ uppercase elements detected across site
- 95% are **intentional eyebrows/badges/nav labels** — KEEP
- 1 pattern is **inconsistent**: why-us theme h3 headings ("Personalized Learning", "Real Results", "No-Strings Affordability") use `uppercase` but function as subheadings, not eyebrows

**Casing Rule Codified:**
- Eyebrows: `text-xs font-semibold/bold uppercase tracking-[0.12em+]` — KEEP
- Nav group titles: `text-sm font-semibold uppercase tracking-wider` — KEEP  
- Badges: `text-xs font-bold uppercase` — KEEP
- Table headers: `text-xs font-bold uppercase tracking-[0.12em]` — KEEP
- h2/h3/h4 headings: Sentence case — NEVER uppercase
- Buttons: Sentence case — NEVER uppercase

**Fix Required:**
- `src/app/(marketing)/why-us/page.tsx:166` — remove `uppercase` from theme h3 class

**Frameworks Applied:**
- Bringhurst (Elements of Typographic Style): ALL CAPS for short labels only
- Nielsen #4: Consistency across similar elements
- Cedar brand: Warm/family voice conflicts with heavy uppercase

**Artifacts:**
- Screenshots: `.squad/agents/oracle/screenshots/typography-*.png`
- Decision: `.squad/decisions/inbox/oracle-typography-rule.md` → **MERGED to .squad/decisions.md (2026-05-07T19:02:14-05:00)**
- Skill: `.squad/skills/typography-audit/SKILL.md`

**Status:** Rule now codified in team decisions. Trinity fixed `/why-us` h3 in commit 6bb4f39. Pattern available for future audits and code review gates.
