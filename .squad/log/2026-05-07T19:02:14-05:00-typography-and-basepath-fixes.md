# Session Log: Typography Casing + Env-Var Fixes

**Date:** 2026-05-07T19:02:14-05:00  
**Agents:** Oracle (audit), Mouse (smoke), Trinity (fixes), Scribe (merge)

## Summary

Wave 3 testing loop identified 2 P0 defects. Oracle found typography casing regression; Mouse found logo preload 404. Trinity fixed both. Scribe merged 3 inbox decision entries into decisions.md.

## Work Items Completed

### 1. Typography Casing Rule (Oracle → Codified)
- Audit: 50+ uppercase-styled elements across 14 pages
- Finding: 1 inconsistency on `/why-us` h3 theme headers
- Rule: Uppercase only for eyebrows, nav titles, badges, table headers
- Status: Approved decision; fix shipped live

### 2. Logo Preload 404 (Mouse → Routed → Fixed)
- Smoke test: 22 routes, 1 P1 defect
- Root cause: `DEPLOY_TARGET` not `NEXT_PUBLIC_` → client-side undefined → next/image injects bare-path preload
- Rule: Client-readable env vars must use `NEXT_PUBLIC_` prefix
- Status: Approved decision; env-var rule now in playbook

### 3. Git Cleanup (Scribe)
- Merged 3 inbox files → decisions.md (57,699 bytes)
- Created 3 orchestration logs
- Updated agent histories (pending Task 5)
- Status: Ready for commit

## Decisions Merged

| Entry | Status | Impact |
|-------|--------|--------|
| oracle-typography-rule | APPROVED | Rule now codified; `/why-us` fixed |
| trinity-next-public-env-rule | APPROVED | Env-var pattern documented; logo preload fixed |
| mouse-smoke-clickthrough | APPROVED | Methodology canonical; script reusable |

## Artifacts

- Decisions: 3 entries merged (3,827 bytes added)
- Orchestration logs: 3 files created
- Session log: 1 file (this)
- Histories: Pending updates (cross-agent learnings)

## Next Steps (Queue)

- Update agent histories (Trinity, Oracle, Mouse)
- Check for history file summarization needs
- Git commit per explicit file list
- Git push origin/main
- Health report
