# feat-075 — Audit quẻ 29–32 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 29 Thuần Khảm; 30 Thuần Ly; 31 Trạch Sơn Hàm; 32 Lôi Phong Hằng.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 29 · Sơ (1).
- [ ] 29 · Nhị (2).
- [ ] 29 · Tam (3).
- [ ] 29 · Tứ (4).
- [ ] 29 · Ngũ (5).
- [ ] 29 · Thượng (6).
- [ ] 30 · Sơ (1).
- [ ] 30 · Nhị (2).
- [ ] 30 · Tam (3).
- [ ] 30 · Tứ (4).
- [ ] 30 · Ngũ (5).
- [ ] 30 · Thượng (6).
- [ ] 31 · Sơ (1).
- [ ] 31 · Nhị (2).
- [ ] 31 · Tam (3).
- [ ] 31 · Tứ (4).
- [ ] 31 · Ngũ (5).
- [ ] 31 · Thượng (6).
- [ ] 32 · Sơ (1).
- [ ] 32 · Nhị (2).
- [ ] 32 · Tam (3).
- [ ] 32 · Tứ (4).
- [ ] 32 · Ngũ (5).
- [ ] 32 · Thượng (6).
- [ ] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [ ] Inspect full passages/images; review each source error and exclusion.
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
