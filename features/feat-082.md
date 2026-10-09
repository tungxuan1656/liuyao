# feat-082 — Review and improve quẻ 57–60 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 57 Thuần Tốn; 58 Thuần Đoài; 59 Phong Thủy Hoán; 60 Thủy Trạch Tiết.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 57 · Sơ (1).
- [ ] 57 · Nhị (2).
- [ ] 57 · Tam (3).
- [ ] 57 · Tứ (4).
- [ ] 57 · Ngũ (5).
- [ ] 57 · Thượng (6).
- [ ] 58 · Sơ (1).
- [ ] 58 · Nhị (2).
- [ ] 58 · Tam (3).
- [ ] 58 · Tứ (4).
- [ ] 58 · Ngũ (5).
- [ ] 58 · Thượng (6).
- [ ] 59 · Sơ (1).
- [ ] 59 · Nhị (2).
- [ ] 59 · Tam (3).
- [ ] 59 · Tứ (4).
- [ ] 59 · Ngũ (5).
- [ ] 59 · Thượng (6).
- [ ] 60 · Sơ (1).
- [ ] 60 · Nhị (2).
- [ ] 60 · Tam (3).
- [ ] 60 · Tứ (4).
- [ ] 60 · Ngũ (5).
- [ ] 60 · Thượng (6).
- [ ] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [ ] Inspect full passages/images; review each source error and exclusion.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Four parallel writers, one per quẻ file, with per-entry provenance tables and no length target.
2. Round 1 exhaustive review across all attributed entries against source texts.
3. Round 2 verification of corrections and high-risk passages.
4. Leader runs shared validation, verifies any image-dependent notes, and records evidence.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
