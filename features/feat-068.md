# feat-068 — Audit quẻ 01–04 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 01 Thuần Càn; 02 Thuần Khôn; 03 Thủy Lôi Truân; 04 Sơn Thủy Mông.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 01 · Sơ (1).
- [ ] 01 · Nhị (2).
- [ ] 01 · Tam (3).
- [ ] 01 · Tứ (4).
- [ ] 01 · Ngũ (5).
- [ ] 01 · Thượng (6).
- [ ] 02 · Sơ (1).
- [ ] 02 · Nhị (2).
- [ ] 02 · Tam (3).
- [ ] 02 · Tứ (4).
- [ ] 02 · Ngũ (5).
- [ ] 02 · Thượng (6).
- [ ] 03 · Sơ (1).
- [ ] 03 · Nhị (2).
- [ ] 03 · Tam (3).
- [ ] 03 · Tứ (4).
- [ ] 03 · Ngũ (5).
- [ ] 03 · Thượng (6).
- [ ] 04 · Sơ (1).
- [ ] 04 · Nhị (2).
- [ ] 04 · Tam (3).
- [ ] 04 · Tứ (4).
- [ ] 04 · Ngũ (5).
- [ ] 04 · Thượng (6).
- [ ] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [ ] Inspect full passages/images; review each source error and exclusion.
- [ ] Càn/Khôn special passages pass separately; they never count as a seventh line.
- [ ] Decisions have current hashes, exact locators, findings, and reviewer identity; rejected units stay open.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and commit one quẻ ledger at a time.
2. Repair rejected units and recheck affected evidence.
3. Verify all twenty-four positions before closing the feature.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
