# feat-086 — Audit BPCT applications — Weather life career and wealth

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- Intended group ledgers under docs/reviews/knowledge/; enumerate every assigned inventory unit.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 7 — Thiên Thời: every passage, condition, example, and note.
- [ ] Niên Thời — unnumbered: every passage, condition, example, and note.
- [ ] Chapter 9 — Thân Mệnh: every passage, condition, example, and note.
- [ ] Chapter 10 — Cầu Danh: every passage, condition, example, and note.
- [ ] Chapter 11 — Sĩ Hoạn: every passage, condition, example, and note.
- [ ] Chapter 12 — Cầu Tài: every passage, condition, example, and note.
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
