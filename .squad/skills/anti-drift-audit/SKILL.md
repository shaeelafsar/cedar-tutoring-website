# SKILL: Anti-Drift Audit for Architecture Decisions

## When to Use

Before incorporating a new architecture decision into an existing project plan, run this audit to ensure the decision doesn't silently expand or contract scope.

## Checklist

1. **Re-read the canonical plan** (e.g., `combined-review.md`) and identify which wave/phase the decision affects.
2. **Confirm the decision fits the original scope description.** If the wave said "wire form to a backend," then picking Azure Functions + Resend IS that scope, not an expansion. If the decision adds a new page, feature, or user flow that wasn't in the wave, that's drift.
3. **Search for stale references.** Grep for the old technology/vendor name across:
   - The canonical plan (combined-review, roadmap, etc.)
   - Pre-production checklists
   - `.env.local.example` and config files
   - Agent history files
   - Decision logs
4. **Check for dropped dependencies.** If the old approach required a third-party service (e.g., hCaptcha with Web3Forms), confirm whether the new approach still needs it or if it's been replaced by something built-in.
5. **Check adjacent waves.** Does the new decision affect Wave N-1 (already shipped) or Wave N+1 (upcoming)? If yes, flag it explicitly — don't silently edit past or future scope.
6. **Check for scope creep in the spec itself.** When writing the implementing spec, did you add features that weren't in the original wave scope? (e.g., "while we're at it, let's add rate limiting / CAPTCHA / data persistence"). If so, flag each addition and justify or defer it.
7. **Document findings.** Write a short bulleted "Anti-Drift Findings" list in your output so the team can verify.

## Output Template

```
### Anti-Drift Findings
- ✅ Wave N scope is consistent with original plan: [reason]
- ✅ No scope creep from [decision]: [reason]
- ⚠️ [Old vendor] references needed cleanup in: [file list]
- ⚠️ [Dependency] dropped because: [reason]
- ✅ Wave N±1 unaffected: [reason]
- ✅/⚠️ Spec additions: [list any features added beyond original scope, with justification]
```

## Anti-Pattern: Silent Scope Expansion

The most common drift pattern is: "Since we're migrating to X, let's also add Y." Unless Y was already in the wave scope, it's drift. Flag it, propose it for a future wave, and let the owner decide. Don't bundle it in silently.
