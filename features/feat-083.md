# feat-083 — Review and improve quẻ 61–64 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 61 Phong Trạch Trung Phu; 62 Lôi Sơn Tiểu Quá; 63 Thủy Hỏa Ký Tế; 64 Hỏa Thủy Vị Tế.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 61 · Sơ (1).
- [ ] 61 · Nhị (2).
- [ ] 61 · Tam (3).
- [ ] 61 · Tứ (4).
- [ ] 61 · Ngũ (5).
- [ ] 61 · Thượng (6).
- [ ] 62 · Sơ (1).
- [ ] 62 · Nhị (2).
- [ ] 62 · Tam (3).
- [ ] 62 · Tứ (4).
- [ ] 62 · Ngũ (5).
- [ ] 62 · Thượng (6).
- [ ] 63 · Sơ (1).
- [ ] 63 · Nhị (2).
- [ ] 63 · Tam (3).
- [ ] 63 · Tứ (4).
- [ ] 63 · Ngũ (5).
- [ ] 63 · Thượng (6).
- [ ] 64 · Sơ (1).
- [ ] 64 · Nhị (2).
- [ ] 64 · Tam (3).
- [ ] 64 · Tứ (4).
- [ ] 64 · Ngũ (5).
- [ ] 64 · Thượng (6).
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
