# Skill: Project Distillation into Greenfield AI Prompt

## What This Skill Does

Synthesizes an entire in-progress web project into a single, self-contained, copy-pasteable
prompt that a greenfield AI agent (Cursor, Claude Code, Copilot, GPT, etc.) could use to
produce a substantively equivalent result from scratch — without access to any existing code,
files, or team context.

Used when: the owner or team needs to hand off the project to another agent, onboard a new
developer quickly, or produce a portable spec that outlives the current toolchain.

---

## When to Apply

- Owner asks "what would you tell another AI to build this?"
- Team is handing off to a different tool or agent
- Project has accumulated significant tribal knowledge that isn't in any single document
- Need a portable spec that captures both the "what" and the "why we made these choices"

---

## The Distillation Method

### Step 1: Inventory the non-obvious decisions

Read the decisions ledger and history files. Separate:
- **Table-stakes choices** (use TypeScript, use Tailwind) — mention briefly, don't over-explain
- **Non-obvious decisions** (why Azure SWA over Cloudflare Pages, why partial pricing disclosure)
  — these need rationale because a fresh agent will make the opposite choice without it
- **Gotchas from experience** (real bugs/surprises) — these earn the most words per character;
  they represent debugging hours the next agent doesn't have to repeat

### Step 2: Order by priority for the receiving agent

1. **Business reality first.** An agent that starts with the business context makes better
   tradeoffs than one that starts with the stack. Audience, tone, and constraints set the frame.
2. **IA next.** Routes and nav are structural. Getting these wrong costs rework.
3. **Stack and content model.** Cover with rationale, not just enumeration.
4. **Form / backend architecture.** Spell out field names, response envelopes, env vars, and
   bot-detection behavior explicitly — these are the highest-entropy section.
5. **Quality bar and constraints.** What does "done" look like? What must NOT be built?
6. **Gotchas.** Real lessons learned, not generic best practices.
7. **Delivery order.** How should the agent sequence its work?

### Step 3: Calibrate length

- Target 600–1200 words. Long enough for quality, short enough to paste.
- Use markdown headings so the receiving agent can navigate and skip sections it already knows.
- Bullet lists for enumerables (routes, tech stack, gotchas).
- Prose for rationale (why Azure SWA, why partial pricing).
- No emoji in the prompt — defeats the professional tone the prompt is trying to establish.

### Step 4: Include explicit NOT-TO-DO section

AI agents over-build for small business clients. Without an explicit "what NOT to build"
section, a receiving agent will add a CMS, login system, analytics, or payment rail that the
business didn't ask for and doesn't need.

### Step 5: Add an escape hatch

End with: "If you need clarification on the business, the brand voice, or any decision, ask
before assuming." This prevents the receiving agent from hallucinating owner preferences.

---

## What a Distillation Prompt CANNOT Capture

1. **Actual brand assets.** Real photos, logo files, and brand colors in hex. The prompt can
   instruct; it cannot supply the files.
2. **Real content.** Testimonial text, actual pricing numbers, founder bio copy. Instruct the
   receiving agent to request these; don't invent them.
3. **Accumulated owner conversations.** Decisions made over multiple sessions (e.g., "Free
   Trial stays inside the funnel") are hard to fully transfer. Include the most consequential
   ones in the prompt; accept that some context will surface as questions.
4. **Tribal knowledge below the decision threshold.** Small style choices, component naming
   conventions, folder structure preferences — these will differ from the original implementation.
   That's acceptable; the goal is functional equivalence, not byte-for-byte reproduction.

---

## Template Structure (copy and adapt)

```
# Prompt: Build [Project Name]

## Business Context
[who, what, where, audience, tone, scale]

## Information Architecture
[pages table, nav spec, footer requirements]

## Tech Stack
[table: layer | choice | rationale]

## Content Model
[how content is stored, parsed, validated]

## Form / API Architecture
[endpoint, validation rules, env vars, bot defense, response envelope]

## Deploy Target
[primary choice with rationale; name alternatives and explain tradeoffs]

## Quality Bar
[what "done" looks like: photos, reviews, a11y, mobile, performance]

## What NOT to Build
[explicit list — essential for small business projects]

## Gotchas
[real bugs/surprises from building this; numbered list]

## How to Deliver
[work sequencing: content → schemas → pages → form → tests → ship]

If you need clarification on the business, the brand voice, or any decision, ask before assuming.
```

---

## Platform-Specific Calibration: Code-Writing AI vs. Site-Builder AI

The same project may require entirely different distillation prompts depending on the receiving AI's platform context. A code-writing agent (Cursor, Claude Code, Copilot, GPT in a dev environment) consumes API contracts, Zod schemas, env var names, deploy targets, and technical Gotchas. A site-builder AI (WordPress AI, Wix AI, Squarespace AI) consumes brand voice, visual direction, page-by-page content intent, plugin guidance, and CTA placement — it does not process deploy pipelines or camelCase response envelopes. When distilling for a site-builder AI: drop all stack/API/deploy content; add visual/aesthetic direction, photography style, plugin restraint guidance (WP AI over-installs), form field descriptions (the builder picks the plugin), and Calendly/widget embed instructions. Keep the business identity, geography guardrail, canonical CTA, sitemap, pricing rules, and NOT-to-build section — those are platform-agnostic. The order also shifts: site-builder prompts should open with brand and visual feel before IA, because the AI's first decisions are about theme/color/layout, not routes.

## Cedar-Specific Instance

See Morpheus history entry: `### Project Distillation into Greenfield AI Prompt (2026-05-07T15:45:09-05:00)`

The Cedar prompt was delivered as a chat-side artifact (not saved to file) per Shaeel's
task instructions. It covered: Cedar Tutoring Academy business context, 15-route IA, Next.js
static export stack, markdown content model, Azure SWA + Resend form architecture, 5 real
gotchas, and delivery sequencing.
