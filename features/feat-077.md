# feat-077 — Audit quẻ 37–40 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 37 Phong Hỏa Gia Nhân; 38 Hỏa Trạch Khuê; 39 Thủy Sơn Kiển; 40 Lôi Thủy Giải.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 37 · Sơ (1).
- [ ] 37 · Nhị (2).
- [ ] 37 · Tam (3).
- [ ] 37 · Tứ (4).
- [ ] 37 · Ngũ (5).
- [ ] 37 · Thượng (6).
- [ ] 38 · Sơ (1).
- [ ] 38 · Nhị (2).
- [ ] 38 · Tam (3).
- [ ] 38 · Tứ (4).
- [ ] 38 · Ngũ (5).
- [ ] 38 · Thượng (6).
- [ ] 39 · Sơ (1).
- [ ] 39 · Nhị (2).
- [ ] 39 · Tam (3).
- [ ] 39 · Tứ (4).
- [ ] 39 · Ngũ (5).
- [ ] 39 · Thượng (6).
- [ ] 40 · Sơ (1).
- [ ] 40 · Nhị (2).
- [ ] 40 · Tam (3).
- [ ] 40 · Tứ (4).
- [ ] 40 · Ngũ (5).
- [ ] 40 · Thượng (6).
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
