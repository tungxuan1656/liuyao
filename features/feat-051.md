# feat-051 — Complete BPCT foundational chapters and front matter

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT PDF 1–76: front matter and Part I chapters 1–5.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Front matter and named textual layers.
- [ ] Chapter 1: all basic definitions and diagrams.
- [ ] Chapter 2: every Ca Quyết formula/table.
- [ ] Chapter 3: Thông Huyền Phú and Túy Kim Phú.
- [ ] Chapter 4: all 64 annotated boards.
- [ ] Chapter 5: all eighteen discussions and inserted material.
- [ ] Tables and diagrams use the implemented feat-101 evidence contract.
- [ ] Reconcile existing selected records and attribution uncertainty; do not rewrite reviewed content without evidence.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Inventory uncaptured units in each chapter.
2. Review and commit one chapter checkpoint at a time.
3. Close every unit disposition and verify the combined group.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
