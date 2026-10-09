# feat-072 — Review and improve quẻ 17–20 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 17 Trạch Lôi Tùy; 18 Sơn Phong Cổ; 19 Địa Trạch Lâm; 20 Phong Địa Quan.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 17 · Sơ (1).
- [ ] 17 · Nhị (2).
- [ ] 17 · Tam (3).
- [ ] 17 · Tứ (4).
- [ ] 17 · Ngũ (5).
- [ ] 17 · Thượng (6).
- [ ] 18 · Sơ (1).
- [ ] 18 · Nhị (2).
- [ ] 18 · Tam (3).
- [ ] 18 · Tứ (4).
- [ ] 18 · Ngũ (5).
- [ ] 18 · Thượng (6).
- [ ] 19 · Sơ (1).
- [ ] 19 · Nhị (2).
- [ ] 19 · Tam (3).
- [ ] 19 · Tứ (4).
- [ ] 19 · Ngũ (5).
- [ ] 19 · Thượng (6).
- [ ] 20 · Sơ (1).
- [ ] 20 · Nhị (2).
- [ ] 20 · Tam (3).
- [ ] 20 · Tứ (4).
- [ ] 20 · Ngũ (5).
- [ ] 20 · Thượng (6).
- [ ] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [ ] Inspect full passages/images; review each source error and exclusion.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and improve one quẻ at a time.
2. Repair material content findings and check affected source passages.
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
