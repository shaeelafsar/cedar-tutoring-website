# Visual Bug Triage

> Reusable investigation pattern for differentiating real rendering bugs from screenshot-tool artifacts.

## Confidence: high
## Domain: frontend, debugging, playwright, framer-motion
## Applicable: any Next.js / React site using scroll-triggered animations

## Pattern

When a screenshot audit flags a "blank section" or "missing content", use this 3-step triage before touching code:

### Step 1 — Source check (fastest, do first)

Inspect the page component for the flagged section:

- Does the section (or its parent) use `<Reveal>`, `motion.*` with `whileInView`, or any animation that starts at `opacity: 0`?
  - **YES → likely ARTIFACT.** Skip to Step 2 to confirm.
  - NO → likely REAL. Skip to Step 3.

### Step 2 — HTML probe (confirm artifact)

```bash
curl -s "https://your-site.example.com/page/" | grep -A 10 "section-keyword"
```

- Is the markup present? Does it reference the expected content (image src, text, etc.)?
  - YES → ARTIFACT confirmed. The content is in the DOM but invisible due to animation state.
  - NO → Escalate to Step 3.

### Step 3 — Live Playwright scroll test (confirm real bug)

Write a quick probe (or use scripts/smoke-deployed.mjs as template):

```js
await page.goto(url);
await page.waitForTimeout(3000);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2000);
await page.screenshot({ path: 'after-scroll.png', fullPage: true });
```

- If content appears after scroll → ARTIFACT (scroll-triggered animation).
- If content is still blank after scroll → REAL BUG (broken path, missing file, filter issue, etc.).

## Known artifact causes in this codebase

| Component | Behavior | Diagnosis |
|-----------|----------|-----------|
| `<Reveal>` | `whileInView` starts at `opacity:0, y:24` | Source: any `<Reveal>` wrapper |
| `motion.article` with `whileInView` | Same — review cards, location cards | Source: ReviewsGrid.tsx |
| `Calendly` / Google Maps embed | Needs JS load + network | Different — needs `waitForNetworkIdle` |

## Decision rules

| Finding | Action |
|---------|--------|
| ARTIFACT | Document in commit body. Do NOT change source. |
| REAL — broken image path | Fix the path or add the file. |
| REAL — empty filter default | Fix the default state. Don't redesign the filter. |
| REAL — missing embed (map, calendar) | STOP. Report to Shaeel — needs API key or Oracle design spec. |
| REAL — requires new content/images | STOP. Report to Shaeel — out of scope for this sprint. |

## Anti-patterns to avoid

- Don't add `opacity: 1 !important` CSS hacks to make screenshots work — this breaks the animation UX
- Don't change `whileInView` to `animate` unless Oracle explicitly requests it — that's a design decision
- Don't create churn (no-op code changes) to "document" artifacts — commit body note is sufficient

## References

- Framer Motion `whileInView` docs: https://www.framer.com/motion/scroll-animations/
- Reveal component: `src/components/shared/Reveal.tsx`
- Oracle screenshot audit: `.squad/agents/oracle/screenshots/`
