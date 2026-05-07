# Keeping Teams Productive While a Dependency Blocks (Dependency-Blocking Patterns)

**Author:** Morpheus (Lead/Architect)  
**Context:** Cedar Tutoring project (Wave 3 pause on Azure SWA provisioning)  
**Date:** 2026-05-07  
**Status:** Extractable pattern

When a critical feature is blocked by external dependency (e.g., cloud provisioning, stakeholder approval, third-party API), team productivity can stall. This skill describes how to identify independent work, pre-land prerequisites, and maintain momentum without scope creep.

---

## The Problem

**Scenario:** Wave 3 (form backend on Azure SWA + Resend) is paused until Shaeel provisions Azure account and signs up for Resend. Trinity, Oracle, and Mouse have capacity, but Wave 3 work is blocked.

**Naive response:** "Let's work on Wave 4 instead" (leads to context switching, schedule fragmentation).

**Better response:** "Find what MUST land before Wave 3, find what's INDEPENDENT of Wave 3, and find what would UNBLOCK Wave 3 fastest."

---

## The Framework

### 1. Inventory the Blockers

List everything that is blocked and who controls it:

| What's Blocked | Who Controls | Timeline | Type |
|---|---|---|---|
| Azure SWA build | Shaeel (provisioning task) | unknown | external |
| Resend account + domain verify | Shaeel (signup + DNS task) | unknown | external |
| Form backend implementation | Trinity (depends on ↑↑) | blocked | derived |
| Form backend testing | Mouse (depends on Trinity) | blocked | derived |

### 2. Find Prerequisites That Unblock

**Question:** What can we land now that makes Wave 3 implementation faster/cleaner when it resumes?

**Answer:** Dependencies and env-gating.

**Cedar example:** `DEPLOY_TARGET=github-pages` env var gates `basePath` in `next.config.ts`. This is a prerequisite for Azure SWA (which must NOT use basePath). Landing it now means:
- SWA build doesn't break on first deploy
- Trinity doesn't have to debug "why is the site serving from `/cedar-tutoring-website/`?"
- Reduces merge conflicts / rework once Wave 3 resumes

**Pattern:** Look for **config-time decisions** that affect downstream systems (Node env vars, build flags, deployment conditionals). These almost always can land before the dependent work.

### 3. Find Independent Work

**Question:** What backlog items don't depend on the blocked wave, don't depend on prerequisites, and add value?

**Answer:** Use dependency graph analysis (or simple ask: "does this require Azure? Resend? form backend?").

**Cedar example:** Wave 4 P1 polish (nav restructure, mobile drawer, hover effects) is independent of Wave 3. It can ship in parallel.

**Process:**
```
For each backlog item:
  IF blocked_by(Wave3 OR Azure OR Resend) THEN skip
  IF blocked_by(unfinished_prerequisite) THEN queue_after_prerequisite
  ELSE ship_now_or_parallel
```

### 4. Dispatch in Dependency Order

**Phase 1: Housekeeping** (clear technical debt, unblock PR queue)
```
- Commit git items (untracked files, dangling branches)
- Run all existing tests
- Fix any broken local dev setup
```

**Phase 2: Prerequisites** (safety-net for dependent work)
```
- Env vars / config gates for upstream waves
- Type definitions for APIs being built
- Test infrastructure if complex
- Any change that would be risky to land AFTER dependent code
```

**Phase 3: Independent work** (parallelizable)
```
- Ship as many non-blocking items as possible in parallel
- Large refactors (nav restructure) serial after prerequisites to keep main stable
- Small Polish (hover effects, click-to-call) can go in parallel
```

**Phase 4: Audit / validation** (after Phase 3 stabilizes)
```
- Perf/A11y testing (Lighthouse, axe)
- Integration testing (once deployment target is locked)
- Stakeholder review
```

### 5. Communicate the Plan

**Rule:** Never ship Phase 3 work without explaining Phase 2 prerequisites to the team. Prerequisite work looks "unrelated" until you connect the dots.

**Cedar shortlist example:**
```
Phase 2: basePath env-gate
  Why: Azure SWA's first build must not use basePath (breaks domain-root serving).
  This lands independently, keeps GH Pages working, and becomes a prerequisite for 
  Wave 3 implementation. Ships before nav restructure to keep main clean.
```

---

## Anti-Patterns to Avoid

### ❌ "Let's just skip the blocker and build what we can"
**Problem:** Yields scope creep and rework. You end up building Wave 4 features that conflict with Wave 3 config, then backpedal.

**Fix:** Actively seek prerequisites. Prerequisite work is unglamorous but highest-leverage.

### ❌ "Let's build Wave 4 in parallel without landing prerequisites first"
**Problem:** Main branch becomes cluttered, merges become complex, and when Wave 3 resumes, you have to coordinate three large PRs instead of one clean sequence.

**Fix:** Land prerequisites first (low risk), then invite parallel Phase 3 work (still gated by prerequisites).

### ❌ "Let's wait for the blocker instead of finding independent work"
**Problem:** Team velocity drops to zero. Morale hits. Stakeholders see idle time.

**Fix:** Inventory blockers, find prerequisites, find independent work, and dispatch. Velocity rarely goes to zero if you look harder.

### ❌ "Everything depends on everything, so we're blocked"
**Problem:** Mental model error. 90% of the time, you're conflating "depends on approval" with "depends on code."

**Fix:** Separate human dependencies (approvals, external tasks) from technical dependencies (config, API contracts). You can land code while waiting for approvals, as long as the code is conditioned on the approval (e.g., `if DEPLOY_TARGET==github-pages`).

---

## Checklist for Dependency-Blocked Situations

- [ ] **Inventory blockers.** List what's blocked, who owns it, timeline.
- [ ] **Identify external tasks.** Separate cloud provisioning, third-party signups, stakeholder approvals. Create tracking for each.
- [ ] **Find prerequisites.** Env vars, type defs, config gates that MUST land before dependent work. Estimate effort.
- [ ] **Find independent work.** Backlog items with no dependency on the blocked wave. Use the filter: "does this require [blocked thing]?"
- [ ] **Dispatch in phases.** Housekeeping → prerequisites → independent (parallel) → audit.
- [ ] **Communicate the plan to the team.** Explain why prerequisites land before Phase 3, so the work doesn't look random.
- [ ] **Measure velocity.** Track parallel work completion rate. If it's low, revisit the dependency graph — you may have misclassified something.

---

## When This Pattern Works Best

✓ **Microservices teams:** Phase 2 prerequisites (API contracts, message schemas) often unblock Phase 3 work.

✓ **Cloud migrations:** Infrastructure config gates (env vars, deployment targets) almost always have independent frontend/API work downstream.

✓ **Hardware-dependent projects:** Device provisioning is blocked externally; firmware/software work often isn't.

✓ **Teams waiting on stakeholder approvals:** Separate "needs approval" (human) from "needs code" (technical). Often you can land code that runs conditionally on the approval.

---

## References

- **Cedar Wave 3 pause case study:** `.squad/decisions/inbox/morpheus-wave3-paused-shortlist.md`
- **Related skill:** "basePath env-gating for dual-deployment targets" (TBD)

