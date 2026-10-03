# feat-061 — Complete Hệ Từ Thượng across NHL and PBC

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 334–362; PBC PDF 601–630; confirm twelve chapter boundaries.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Thượng chapters 1–6: both books and all named layers.
- [ ] Thượng chapters 7–12: both books and all named layers.
- [ ] Each chapter requires its own passage disposition; quoted NTT fragments do not create an absent appendix.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review chapters 1–6 and commit.
2. Review chapters 7–12 and commit.
3. Reconcile quẻ-level quotations, notes, and exclusions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
