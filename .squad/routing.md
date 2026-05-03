# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Architecture, site structure, content strategy | Morpheus | Page hierarchy, component architecture, SEO strategy |
| Frontend implementation, React components, pages | Trinity | Building pages, components, responsive layouts, animations |
| Design system, UX, visual identity, accessibility | Oracle | Color palette, typography, spacing, layout decisions, WCAG |
| Testing, QA, performance, SEO validation | Mouse | Unit tests, e2e tests, Lighthouse scores, cross-browser |
| Code review, quality gates | Morpheus | Review PRs, check quality, architectural alignment |
| Scope & priorities | Morpheus | What to build next, trade-offs, decisions |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Morpheus |
| `squad:morpheus` | Architecture/planning work | Morpheus |
| `squad:trinity` | Frontend implementation | Trinity |
| `squad:oracle` | Design/UX work | Oracle |
| `squad:mouse` | Testing/QA work | Mouse |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, **Morpheus** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Morpheus's review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn Mouse to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. Morpheus handles all `squad` (base label) triage.
8. **Design before implementation** — Oracle defines the design system/tokens before Trinity builds components.
