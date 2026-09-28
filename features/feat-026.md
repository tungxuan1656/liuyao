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

- [ ] Canonical result breakpoint is explicitly chosen and code/spec agree.
- [ ] Drawer dismissal contract matches intended V1 UX.
- [ ] Automatic-casting contract agrees with feat-024.
- [ ] feat-009 and feat-010 acceptance state matches recorded evidence and merged state.
- [ ] feat-012 waivers remain distinct from verified passes; no record claims uncollected evidence.
- [ ] `git diff --check` and documentation verification pass.

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

- State: todo
- Evidence: Issue #32 confirmed; contract decisions remain proposed.
- Dependency check: feat-024 and feat-025 are prerequisites.
- Next: Verify dependencies, then select the feature for implementation.
