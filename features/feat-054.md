# feat-054 — Complete BPCT applications — Housing boats and Xướng Gia

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 231–269; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 20 — Gia Trạch: all passages, conditions, examples, and notes.
- [ ] Chapter 20 supplement — Tân Tăng Gia Trạch: all passages, conditions, examples, and notes.
- [ ] Chapter 21 — Châu Thuyền: all passages, conditions, examples, and notes.
- [ ] Chapter 22 — Xướng Gia: all passages, conditions, examples, and notes.
- [ ] Preserve question-specific roles, qualifications, and translator disagreements.
- [ ] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Map existing claims and uncovered sections.
2. Review and commit each chapter/supplement checkpoint.
3. Reconcile reused terms, exclusions, and group coverage.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
