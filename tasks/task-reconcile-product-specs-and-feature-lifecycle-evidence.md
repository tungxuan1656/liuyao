# task-reconcile-product-specs-and-feature-lifecycle-evidence - Reconcile product specs and feature lifecycle evidence

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-preserve-automatic-casting-evidence-and-align-ux-contract](task-preserve-automatic-casting-evidence-and-align-ux-contract.md), [task-add-web-release-flow-regression-coverage](task-add-web-release-flow-regression-coverage.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Restore agreement between canonical V1 behavior, implementation, and feature completion evidence.

## Scope

- Decide and document the canonical result breakpoint, then align code and spec.
- Align compact result dismissal requirements with intended V1 UX.
- Align automatic-casting UI contract with task-preserve-automatic-casting-evidence-and-align-ux-contract's decision.
- Reconcile task-knowledge-browser and task-settings acceptance state with recorded evidence.
- Preserve task-quality-hardening waived items as distinct from verified passes.

## Non-goals

- Claim uncollected evidence or alter unrelated product requirements.

## Acceptance

- [x] Canonical result breakpoint is explicitly chosen and code/spec agree.
- [x] Drawer dismissal contract matches intended V1 UX.
- [x] Automatic-casting contract agrees with task-preserve-automatic-casting-evidence-and-align-ux-contract.
- [x] task-knowledge-browser and task-settings acceptance state matches recorded evidence and merged state.
- [x] task-quality-hardening waivers remain distinct from verified passes; no record claims uncollected evidence.
- [x] `git diff --check` and documentation verification pass.

## Relevant docs

- [GitHub issue #32](https://github.com/tungxuan1656/liuyao/issues/32) — canonical acceptance source
- `docs/product-specs/ui-layout.md`
- `task-knowledge-browser`
- `task-settings`
- `task-quality-hardening`

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
- Evidence: User chose the implemented 900px breakpoint and close-button/Escape/scrim dismissal. The canonical UI layout now agrees with those choices and task-preserve-automatic-casting-evidence-and-align-ux-contract's per-line panel without claiming swipe or coin animation. task-knowledge-browser and task-settings checkboxes were reconciled against their original PR evidence: their repository checks are recorded as passed, while incomplete F08/F09 task evidence remains unchecked. task-quality-hardening's waived F11 checks remain unchecked. `git diff --check` and targeted Prettier documentation checks passed on 2026-09-28. PR integration remains pending.
- Dependency check: task-preserve-automatic-casting-evidence-and-align-ux-contract and task-add-web-release-flow-regression-coverage are prerequisites.
- Next: Integrate the PR and confirm issue #32 closed after merge.
