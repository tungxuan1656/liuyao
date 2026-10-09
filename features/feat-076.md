# feat-076 — Review and improve quẻ 33–36 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 33 Thiên Sơn Độn; 34 Lôi Thiên Đại Tráng; 35 Hỏa Địa Tấn; 36 Địa Hỏa Minh Di.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 33 · Sơ (1).
- [ ] 33 · Nhị (2).
- [ ] 33 · Tam (3).
- [ ] 33 · Tứ (4).
- [ ] 33 · Ngũ (5).
- [ ] 33 · Thượng (6).
- [ ] 34 · Sơ (1).
- [ ] 34 · Nhị (2).
- [ ] 34 · Tam (3).
- [ ] 34 · Tứ (4).
- [ ] 34 · Ngũ (5).
- [ ] 34 · Thượng (6).
- [ ] 35 · Sơ (1).
- [ ] 35 · Nhị (2).
- [ ] 35 · Tam (3).
- [ ] 35 · Tứ (4).
- [ ] 35 · Ngũ (5).
- [ ] 35 · Thượng (6).
- [ ] 36 · Sơ (1).
- [ ] 36 · Nhị (2).
- [ ] 36 · Tam (3).
- [ ] 36 · Tứ (4).
- [ ] 36 · Ngũ (5).
- [ ] 36 · Thượng (6).
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
