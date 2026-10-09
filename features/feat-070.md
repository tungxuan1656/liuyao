# feat-070 — Review and improve quẻ 09–12 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 09 Phong Thiên Tiểu Súc; 10 Thiên Trạch Lý; 11 Địa Thiên Thái; 12 Thiên Địa Bĩ.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 09 · Sơ (1).
- [ ] 09 · Nhị (2).
- [ ] 09 · Tam (3).
- [ ] 09 · Tứ (4).
- [ ] 09 · Ngũ (5).
- [ ] 09 · Thượng (6).
- [ ] 10 · Sơ (1).
- [ ] 10 · Nhị (2).
- [ ] 10 · Tam (3).
- [ ] 10 · Tứ (4).
- [ ] 10 · Ngũ (5).
- [ ] 10 · Thượng (6).
- [ ] 11 · Sơ (1).
- [ ] 11 · Nhị (2).
- [ ] 11 · Tam (3).
- [ ] 11 · Tứ (4).
- [ ] 11 · Ngũ (5).
- [ ] 11 · Thượng (6).
- [ ] 12 · Sơ (1).
- [ ] 12 · Nhị (2).
- [ ] 12 · Tam (3).
- [ ] 12 · Tứ (4).
- [ ] 12 · Ngũ (5).
- [ ] 12 · Thượng (6).
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
