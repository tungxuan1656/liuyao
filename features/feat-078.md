# feat-078 — Audit quẻ 41–44 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 41 Sơn Trạch Tổn; 42 Phong Lôi Ích; 43 Trạch Thiên Quải; 44 Thiên Phong Cấu.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 41 · Sơ (1).
- [ ] 41 · Nhị (2).
- [ ] 41 · Tam (3).
- [ ] 41 · Tứ (4).
- [ ] 41 · Ngũ (5).
- [ ] 41 · Thượng (6).
- [ ] 42 · Sơ (1).
- [ ] 42 · Nhị (2).
- [ ] 42 · Tam (3).
- [ ] 42 · Tứ (4).
- [ ] 42 · Ngũ (5).
- [ ] 42 · Thượng (6).
- [ ] 43 · Sơ (1).
- [ ] 43 · Nhị (2).
- [ ] 43 · Tam (3).
- [ ] 43 · Tứ (4).
- [ ] 43 · Ngũ (5).
- [ ] 43 · Thượng (6).
- [ ] 44 · Sơ (1).
- [ ] 44 · Nhị (2).
- [ ] 44 · Tam (3).
- [ ] 44 · Tứ (4).
- [ ] 44 · Ngũ (5).
- [ ] 44 · Thượng (6).
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
