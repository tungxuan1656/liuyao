# task-review-and-improve-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight - Review and improve BPCT applications — Litigation spirits agriculture state conflict and flight

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight](task-complete-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- Review the assigned concepts, examples, and tables; record material content findings.

## Non-goals

New interpretation, calendar, or UI behavior. No unrelated refactors, record splits, ID or
route changes, or edits outside the assigned group.

## Acceptance

- [ ] Chapter 27 — Từ Tụng: every passage, condition, example, and note.
- [ ] Chapter 28 — Quỷ Thần: every passage, condition, example, and note.
- [ ] Chapter 29 — Chủng Tác: every passage, condition, example, and note.
- [ ] Chapter 30 — Lục Súc: every passage, condition, example, and note.
- [ ] Chapter 31 — Tàm Tang: every passage, condition, example, and note.
- [ ] Chapter 32 — Quốc Triều: every passage, condition, example, and note.
- [ ] Chapter 33 — Chinh Chiến: every passage, condition, example, and note.
- [ ] Chapter 34 — Tị Loạn: every passage, condition, example, and note.
- [ ] Chapter 35 — Đào Vong: every passage, condition, example, and note.
- [ ] Preserve reported outcomes as attributed claims; reconcile reused rules and explicit exclusions.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality and agent execution gate](../docs/product-specs/knowledge-quality.md#agent-execution-gate),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Identify the useful explanations and tables in this group.
2. Review each section/table and record its material content findings.
3. Resolve every gate finding: repair supported defects, then re-verify the final revision.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: Not executed.
- Next: Confirm dependencies, select this feature, then inspect its first unit.
- Blockers: not evaluated until owner selection and dependency check.
