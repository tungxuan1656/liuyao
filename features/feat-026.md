# feat-026 — Reconcile product specs and feature lifecycle evidence

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

- State: done
- Evidence: User chose the implemented 900px breakpoint and close-button/Escape/scrim dismissal. The canonical UI layout now agrees with those choices and feat-024's per-line panel without claiming swipe or coin animation. Feat-009 and feat-010 checkboxes were reconciled against their original PR evidence: their repository checks are recorded as passed, while incomplete F08/F09 task evidence remains unchecked. Feat-012's waived F11 checks remain unchecked. `git diff --check` and targeted Prettier documentation checks passed on 2026-09-28. PR integration remains pending.
- Dependency check: feat-024 and feat-025 are prerequisites.
- Next: Integrate the PR and confirm issue #32 closed after merge.
