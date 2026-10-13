# feat-026 - Reconcile product specs and feature lifecycle evidence

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-024](task-feat-024.md), [feat-025](task-feat-025.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Restore agreement between canonical V1 behavior, implementation, and feature completion evidence.

## Scope

- Decide and document the canonical result breakpoint, then align code and spec.
- Align compact result dismissal requirements with intended V1 UX.
- Align automatic-casting UI contract with feat-024's decision.
- Reconcile feat-009 and feat-010 acceptance state with recorded evidence.
- Preserve feat-012 waived items as distinct from verified passes.

## Non-goals

- Claim uncollected evidence or alter unrelated product requirements.

## Acceptance

- [x] Canonical result breakpoint is explicitly chosen and code/spec agree.
- [x] Drawer dismissal contract matches intended V1 UX.
- [x] Automatic-casting contract agrees with feat-024.
- [x] feat-009 and feat-010 acceptance state matches recorded evidence and merged state.
- [x] feat-012 waivers remain distinct from verified passes; no record claims uncollected evidence.
- [x] `git diff --check` and documentation verification pass.

## Relevant docs

- [GitHub issue #32](https://github.com/tungxuan1656/liuyao/issues/32) — canonical acceptance source
- `docs/product-specs/ui-layout.md`
- `features/feat-009.md`
- `features/feat-010.md`
- `features/feat-012.md`

## Plan

1. Resolve intended V1 contracts and reconcile specs with implementation.
2. Correct feature completion records using evidence, preserving explicit waivers.

## Verify

- `git diff --check`
- Documentation verification (identify canonical command during implementation).

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done
- Evidence: User chose the implemented 900px breakpoint and close-button/Escape/scrim dismissal. The canonical UI layout now agrees with those choices and feat-024's per-line panel without claiming swipe or coin animation. Feat-009 and feat-010 checkboxes were reconciled against their original PR evidence: their repository checks are recorded as passed, while incomplete F08/F09 task evidence remains unchecked. Feat-012's waived F11 checks remain unchecked. `git diff --check` and targeted Prettier documentation checks passed on 2026-09-28. PR integration remains pending.
- Dependency check: feat-024 and feat-025 are prerequisites.
- Next: Integrate the PR and confirm issue #32 closed after merge.

## Migration provenance

Migrated from [feat-026](../features/feat-026.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
