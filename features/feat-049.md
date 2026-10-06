# feat-049 — Reviewed quẻ 61–64 and BPCT sentences 49–56

## Goal

Complete the next four quẻ and the paired BPCT passage group.

## Scope

**Intended work:**

- 61 Phong Trạch Trung Phu; 62 Lôi Sơn Tiểu Quá; 63 Thủy Hỏa Ký Tế; 64 Hỏa Thủy Vị Tế: overviews and six lines in NHL, PBC, and NTT.
- BPCT Part I, chapter 6, sentences 49–56; PDF 92–94 are planning anchors.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Quẻ 61: all six positions and each supplied commentary layer.
- [ ] Quẻ 62: all six positions and each supplied commentary layer.
- [ ] Quẻ 63: all six positions and each supplied commentary layer.
- [ ] Quẻ 64: all six positions and each supplied commentary layer.
- [ ] BPCT sentences 49–56: each numbered passage and its notes.
- [ ] Replace the four legacy quẻ without changing stable IDs.
- [ ] Review full passages, diagrams, attribution, discrepancies, and exclusions before release.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active on `feat/049-reviewed-que-61-64-bpct-49-56`, based on `main` at `a55197d470c960b0a7b638aab519553559daa8d3`.
- Evidence: feat-048 is merged and marked done; the selected batch authorizes feat-049. No implementation verification has run.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect source pages for quẻ 61 and BPCT sentences 49–56, then implement only this feature.
