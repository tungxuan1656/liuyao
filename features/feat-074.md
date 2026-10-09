# feat-074 — Review and improve quẻ 25–28 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 25 Thiên Lôi Vô Vọng; 26 Sơn Thiên Đại Súc; 27 Sơn Lôi Di; 28 Trạch Phong Đại Quá.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 25 · Sơ (1).
- [ ] 25 · Nhị (2).
- [ ] 25 · Tam (3).
- [ ] 25 · Tứ (4).
- [ ] 25 · Ngũ (5).
- [ ] 25 · Thượng (6).
- [ ] 26 · Sơ (1).
- [ ] 26 · Nhị (2).
- [ ] 26 · Tam (3).
- [ ] 26 · Tứ (4).
- [ ] 26 · Ngũ (5).
- [ ] 26 · Thượng (6).
- [ ] 27 · Sơ (1).
- [ ] 27 · Nhị (2).
- [ ] 27 · Tam (3).
- [ ] 27 · Tứ (4).
- [ ] 27 · Ngũ (5).
- [ ] 27 · Thượng (6).
- [ ] 28 · Sơ (1).
- [ ] 28 · Nhị (2).
- [ ] 28 · Tam (3).
- [ ] 28 · Tứ (4).
- [ ] 28 · Ngũ (5).
- [ ] 28 · Thượng (6).
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
