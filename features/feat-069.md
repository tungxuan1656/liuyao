# feat-069 — Review and improve quẻ 05–08 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 05 Thủy Thiên Nhu; 06 Thiên Thủy Tụng; 07 Địa Thủy Sư; 08 Thủy Địa Tỷ.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 05 · Sơ (1).
- [x] 05 · Nhị (2).
- [x] 05 · Tam (3).
- [x] 05 · Tứ (4).
- [x] 05 · Ngũ (5).
- [x] 05 · Thượng (6).
- [x] 06 · Sơ (1).
- [x] 06 · Nhị (2).
- [x] 06 · Tam (3).
- [x] 06 · Tứ (4).
- [x] 06 · Ngũ (5).
- [x] 06 · Thượng (6).
- [x] 07 · Sơ (1).
- [x] 07 · Nhị (2).
- [x] 07 · Tam (3).
- [x] 07 · Tứ (4).
- [x] 07 · Ngũ (5).
- [x] 07 · Thượng (6).
- [x] 08 · Sơ (1).
- [x] 08 · Nhị (2).
- [x] 08 · Tam (3).
- [x] 08 · Tứ (4).
- [x] 08 · Ngũ (5).
- [x] 08 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and improve one quẻ at a time.
2. Repair material content findings and check affected source passages.
3. Verify all twenty-four positions before closing the feature.

## Verify

- `./init.sh` passed 100% (181 core tests + 97 knowledge tests; knowledge suite ran in 2.15s).
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed: 381 records; 381 ready; 4 supplied books verified against SHA-256 fingerprints.
- Independent reviewer validated schema, references, line counts, and Vietnamese prose across all four hexagrams.

## Handoff

- State: done.
- Evidence: Full repository verification passed via `./init.sh`. All 4 hexagrams and 24 hào positions reviewed and updated with Chu Hy, Trình Di, Nguyễn Hiến Lê, and Phan Bội Châu perspectives.
- Dependencies: See [feature index](../feature_index.json).
- Next: Select and activate `feat-070` (Review and improve quẻ 09–12 and all twenty-four hào).
