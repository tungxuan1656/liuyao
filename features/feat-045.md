# feat-045 — Reviewed quẻ 45–48 and BPCT sentences 17–24

## Goal

Complete the next four quẻ and the paired BPCT passage group.

## Scope

**Intended work:**

- 45 Trạch Địa Tụy; 46 Địa Phong Thăng; 47 Trạch Thủy Khốn; 48 Thủy Phong Tỉnh: overviews and six lines in NHL, PBC, and NTT.
- BPCT Part I, chapter 6, sentences 17–24; PDF 82–85 are planning anchors.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Quẻ 45: all six positions and each supplied commentary layer.
- [ ] Quẻ 46: all six positions and each supplied commentary layer.
- [ ] Quẻ 47: all six positions and each supplied commentary layer.
- [ ] Quẻ 48: all six positions and each supplied commentary layer.
- [ ] BPCT sentences 17–24: each numbered passage and its notes.
- [ ] Replace the four legacy quẻ without changing stable IDs.
- [ ] Review full passages, diagrams, attribution, discrepancies, and exclusions before release.
- [ ] Source-compared claims in quẻ 45–48 and BPCT 17–24 pass the corpus publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Limits

Following the precedents in `feat-044` and `progress.md`, corpus-wide specialist review, rights clearance, and certification remain open in the broader audit track (`feat-078`, `feat-095`, `feat-096`); they do not block this authoring batch. This batch authors original Vietnamese summaries and structured facts without claiming full rights clearance or redistributing source books.

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

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
