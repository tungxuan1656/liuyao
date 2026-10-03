# feat-090 — Audit BPCT applications — Litigation spirits agriculture state conflict and flight

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- Intended group ledgers under docs/reviews/knowledge/; enumerate every assigned inventory unit.

## Non-goals

New interpretation, calendar, or UI behavior.

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
- [ ] Decisions have current hashes, exact locators, findings, and reviewer identity; rejected units stay open.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Create the complete unit checklist for this group.
2. Review and commit each section/table checkpoint with current hashes and findings.
3. Verify all unit decisions and close only after rejected units are repaired.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
