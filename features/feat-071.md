# feat-071 — Audit quẻ 13–16 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 13 Thiên Hỏa Đồng Nhân; 14 Hỏa Thiên Đại Hữu; 15 Địa Sơn Khiêm; 16 Lôi Địa Dự.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 13 · Sơ (1).
- [ ] 13 · Nhị (2).
- [ ] 13 · Tam (3).
- [ ] 13 · Tứ (4).
- [ ] 13 · Ngũ (5).
- [ ] 13 · Thượng (6).
- [ ] 14 · Sơ (1).
- [ ] 14 · Nhị (2).
- [ ] 14 · Tam (3).
- [ ] 14 · Tứ (4).
- [ ] 14 · Ngũ (5).
- [ ] 14 · Thượng (6).
- [ ] 15 · Sơ (1).
- [ ] 15 · Nhị (2).
- [ ] 15 · Tam (3).
- [ ] 15 · Tứ (4).
- [ ] 15 · Ngũ (5).
- [ ] 15 · Thượng (6).
- [ ] 16 · Sơ (1).
- [ ] 16 · Nhị (2).
- [ ] 16 · Tam (3).
- [ ] 16 · Tứ (4).
- [ ] 16 · Ngũ (5).
- [ ] 16 · Thượng (6).
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
