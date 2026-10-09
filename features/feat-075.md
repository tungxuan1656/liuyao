# feat-075 — Review and improve quẻ 29–32 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 29 Thuần Khảm; 30 Thuần Ly; 31 Trạch Sơn Hàm; 32 Lôi Phong Hằng.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

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
