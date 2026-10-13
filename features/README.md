# Frozen legacy execution history

`features/`, root `feature_index.json`, and root `progress.md` are read-only pre-Harness-v2 history.
Their contents, IDs, acceptance snapshots, review evidence, and historical provenance remain unchanged.
Do not follow their old lifecycle instructions, use the old template, change statuses, or append progress blocks.

## Current ownership and mapping

- [Task navigation](../tasks/index.md) replaces the status index and routes all 105 migrated records.
- `features/feat-NNN.md` maps to `tasks/task-feat-NNN.md`; the original `feat-NNN` identifier is retained.
- Each task owns current status, start dependencies, acceptance, evidence, blockers, and next action.
- Product Owner ownership is retained; implementation ownership is assigned when work is selected.
- Old `depends_on` edges remain required-to-start gates. No undocumented integration gate or relaxed dependency was invented.
- [Knowledge delivery roadmap](../tasks/knowledge-roadmap.md) replaces the frozen `features/knowledge-roadmap.md`.
- Original plan paths under `docs/plans/` remain available. Task state and current canonical policy override historical lifecycle instructions.

Historical `done` states preserve the owner's recorded closure, waivers, supersessions, and delivery caveats.
Migration does not certify those old checks, assert current PR/merge status, or activate pending work.
Use original feature, plan, and progress records only for detailed historical evidence, never as a second writable tracker.
