# feat-079 — Audit quẻ 45–48 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 45 Trạch Địa Tụy; 46 Địa Phong Thăng; 47 Trạch Thủy Khốn; 48 Thủy Phong Tỉnh.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 45 · Sơ (1).
- [ ] 45 · Nhị (2).
- [ ] 45 · Tam (3).
- [ ] 45 · Tứ (4).
- [ ] 45 · Ngũ (5).
- [ ] 45 · Thượng (6).
- [ ] 46 · Sơ (1).
- [ ] 46 · Nhị (2).
- [ ] 46 · Tam (3).
- [ ] 46 · Tứ (4).
- [ ] 46 · Ngũ (5).
- [ ] 46 · Thượng (6).
- [ ] 47 · Sơ (1).
- [ ] 47 · Nhị (2).
- [ ] 47 · Tam (3).
- [ ] 47 · Tứ (4).
- [ ] 47 · Ngũ (5).
- [ ] 47 · Thượng (6).
- [ ] 48 · Sơ (1).
- [ ] 48 · Nhị (2).
- [ ] 48 · Tam (3).
- [ ] 48 · Tứ (4).
- [ ] 48 · Ngũ (5).
- [ ] 48 · Thượng (6).
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
