# feat-080 — Review and improve quẻ 49–52 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 49 Trạch Hỏa Cách; 50 Hỏa Phong Đỉnh; 51 Thuần Chấn; 52 Thuần Cấn.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 49 · Sơ (1).
- [ ] 49 · Nhị (2).
- [ ] 49 · Tam (3).
- [ ] 49 · Tứ (4).
- [ ] 49 · Ngũ (5).
- [ ] 49 · Thượng (6).
- [ ] 50 · Sơ (1).
- [ ] 50 · Nhị (2).
- [ ] 50 · Tam (3).
- [ ] 50 · Tứ (4).
- [ ] 50 · Ngũ (5).
- [ ] 50 · Thượng (6).
- [ ] 51 · Sơ (1).
- [ ] 51 · Nhị (2).
- [ ] 51 · Tam (3).
- [ ] 51 · Tứ (4).
- [ ] 51 · Ngũ (5).
- [ ] 51 · Thượng (6).
- [ ] 52 · Sơ (1).
- [ ] 52 · Nhị (2).
- [ ] 52 · Tam (3).
- [ ] 52 · Tứ (4).
- [ ] 52 · Ngũ (5).
- [ ] 52 · Thượng (6).
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
