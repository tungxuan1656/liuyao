# feat-073 — Audit quẻ 21–24 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 21 Hỏa Lôi Phệ Hạp; 22 Sơn Hỏa Bí; 23 Sơn Địa Bác; 24 Địa Lôi Phục.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 21 · Sơ (1).
- [ ] 21 · Nhị (2).
- [ ] 21 · Tam (3).
- [ ] 21 · Tứ (4).
- [ ] 21 · Ngũ (5).
- [ ] 21 · Thượng (6).
- [ ] 22 · Sơ (1).
- [ ] 22 · Nhị (2).
- [ ] 22 · Tam (3).
- [ ] 22 · Tứ (4).
- [ ] 22 · Ngũ (5).
- [ ] 22 · Thượng (6).
- [ ] 23 · Sơ (1).
- [ ] 23 · Nhị (2).
- [ ] 23 · Tam (3).
- [ ] 23 · Tứ (4).
- [ ] 23 · Ngũ (5).
- [ ] 23 · Thượng (6).
- [ ] 24 · Sơ (1).
- [ ] 24 · Nhị (2).
- [ ] 24 · Tam (3).
- [ ] 24 · Tứ (4).
- [ ] 24 · Ngũ (5).
- [ ] 24 · Thượng (6).
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
