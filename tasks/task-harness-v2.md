# task-harness-v2 - Install suitable skills and migrate the legacy harness

- Status: done
- Owner: Codex (migration); Product Owner (approval)
- Required to start: user approval received for installation and complete migration
- Required to integrate/release: acceptance below

## Scope and non-goals

Install missing stack-appropriate guidance. Move all 105 legacy entries to task-local state, repair live routes, and make verification check-only.
Preserve original feature, index, progress, and plan evidence. Do not activate product work, change domain/runtime behavior, install browser binaries, or commit.

## Acceptance

- [x] Reuse adequate existing/global skills; install only inspected missing selections with default Skills CLI behavior.
- [x] Migrate every indexed title, status, start dependency, scope, acceptance, and latest handoff without guessing new gates.
- [x] Preserve 84 historical `done` and 21 `todo` states; name owners and preserve waivers and supersessions.
- [x] Route live state to tasks; keep roadmap navigation free of mirrored status and dependencies.
- [x] Freeze legacy history; remove the global active-task limit and file-count plan threshold.
- [x] Verify migration invariants, links, formatting, Bash failure/cwd behavior, and full check coverage without modifying source.
- [x] Record independent review and final verification results.

## Sources and plan

[Harness v2 migration](../.agents/skills/harness/references/migration-v2.md),
[verification](../docs/development.md).

1. Inspect stack, skills, consumers, and historical state.
2. Install reviewed missing guidance and migrate state/routes while preserving history.
3. Verify mapped evidence, check-only behavior, and the full workflow; review and close this task.

## Handoff

- Evidence (2026-10-13): installed `git-commit` and `vercel-react-best-practices` match inspected upstream instructions; existing/global guidance is reused. Python checks passed for all 105 titles, statuses, start dependencies, scopes, acceptance text/checkboxes, handoff presence, frozen legacy hashes, local link paths and heading anchors. Original 84 done/21 todo states remain unchanged.
- Verification: `./init.sh` passed all seven sequential checks, including 181 core and 107 knowledge tests and validation of 381 ready records. A temporary assert-based shell self-check confirmed invocation from `/tmp`, exact command order, immediate stop on an injected failure, exit-code 37 propagation, and no false success. No product source, dependencies, or historical state were rewritten.
- Review: independent read-only review covered live routes, command coverage, all task metadata and representative handoffs. It found one same-day progress-selection defect; the selector was repaired across affected tasks, regression assertions passed, and follow-up review closed the finding. Exhaustive acceptance/hash/link comparisons are parent-run evidence, not a claim of exhaustive independent review.
- Caveats: the successful build still reports sourcemap/module-directive and chunk-size warnings. Browser/offline runtime behavior and domain correctness were not re-audited; no runtime behavior changed. Historical completion evidence is imported, not re-executed.
- Final check (2026-10-13): post-review `./init.sh`, migration assertions, `bash -n init.sh`, and `git diff --check` passed. All 1,017 snapshotted tracked/non-ignored source files were byte-identical before and after the full workflow; only ignored build/test outputs may change.
- Blockers: none.
- Next: none; migration complete. Future work uses `tasks/index.md` and task-local state, not frozen legacy trackers.
