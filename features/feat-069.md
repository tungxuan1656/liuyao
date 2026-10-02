# feat-069 — Audit quẻ 05–08 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 05 Thủy Thiên Nhu; 06 Thiên Thủy Tụng; 07 Địa Thủy Sư; 08 Thủy Địa Tỷ.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 05 · Sơ (1).
- [ ] 05 · Nhị (2).
- [ ] 05 · Tam (3).
- [ ] 05 · Tứ (4).
- [ ] 05 · Ngũ (5).
- [ ] 05 · Thượng (6).
- [ ] 06 · Sơ (1).
- [ ] 06 · Nhị (2).
- [ ] 06 · Tam (3).
- [ ] 06 · Tứ (4).
- [ ] 06 · Ngũ (5).
- [ ] 06 · Thượng (6).
- [ ] 07 · Sơ (1).
- [ ] 07 · Nhị (2).
- [ ] 07 · Tam (3).
- [ ] 07 · Tứ (4).
- [ ] 07 · Ngũ (5).
- [ ] 07 · Thượng (6).
- [ ] 08 · Sơ (1).
- [ ] 08 · Nhị (2).
- [ ] 08 · Tam (3).
- [ ] 08 · Tứ (4).
- [ ] 08 · Ngũ (5).
- [ ] 08 · Thượng (6).
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
