# feat-081 — Review and improve quẻ 53–56 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 53 Phong Sơn Tiệm; 54 Lôi Trạch Quy Muội; 55 Lôi Hỏa Phong; 56 Hỏa Sơn Lữ.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 53 · Sơ (1).
- [ ] 53 · Nhị (2).
- [ ] 53 · Tam (3).
- [ ] 53 · Tứ (4).
- [ ] 53 · Ngũ (5).
- [ ] 53 · Thượng (6).
- [ ] 54 · Sơ (1).
- [ ] 54 · Nhị (2).
- [ ] 54 · Tam (3).
- [ ] 54 · Tứ (4).
- [ ] 54 · Ngũ (5).
- [ ] 54 · Thượng (6).
- [ ] 55 · Sơ (1).
- [ ] 55 · Nhị (2).
- [ ] 55 · Tam (3).
- [ ] 55 · Tứ (4).
- [ ] 55 · Ngũ (5).
- [ ] 55 · Thượng (6).
- [ ] 56 · Sơ (1).
- [ ] 56 · Nhị (2).
- [ ] 56 · Tam (3).
- [ ] 56 · Tứ (4).
- [ ] 56 · Ngũ (5).
- [ ] 56 · Thượng (6).
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
