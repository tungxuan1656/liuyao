# feat-048 — Reviewed quẻ 57–60 and BPCT sentences 41–48

## Goal

Complete the next four quẻ and the paired BPCT passage group.

## Scope

**Intended work:**

- 57 Thuần Tốn; 58 Thuần Đoài; 59 Phong Thủy Hoán; 60 Thủy Trạch Tiết: overviews and six lines in NHL, PBC, and NTT.
- BPCT Part I, chapter 6, sentences 41–48; PDF 89–92 are planning anchors.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Quẻ 57: all six positions and each supplied commentary layer.
- [ ] Quẻ 58: all six positions and each supplied commentary layer.
- [ ] Quẻ 59: all six positions and each supplied commentary layer.
- [ ] Quẻ 60: all six positions and each supplied commentary layer.
- [ ] BPCT sentences 41–48: each numbered passage and its notes.
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

## Decision log

- **Workbox file-size limit** — Question: how to handle the measured 2,872,385-byte integrated asset exceeding the 2,686,976-byte cap? Decision: raise the cap to 2,949,120 bytes (2 MiB + 832 KiB), leaving 76,735 bytes of headroom. Alternatives: block feat-048 release or alter caching behavior. Rationale: the user explicitly authorized this bounded increase; the value is the smallest 64-KiB-aligned limit that provides at least 64 KiB of reserve. Evidence: user approval in this session and the measured production build. Effect: only the Workbox maximum and matching comment changed; precaching and all other PWA behavior remain unchanged. This approval applies to feat-048 only and does not establish a ceiling for later batches.

## Handoff

- State: active; source components and integration are committed on `feat/048-reviewed-que-57-60-bpct-41-48` at `b1613e7310ae6073cfdd72b715d4a2b22ad1d66b`.
- Evidence: `./init.sh` passed with 482 tests; `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed with 197 records, 2,207 claims and 2,392 citations. Independent source review and publication remain.
- Dependencies: See [feature index](../feature_index.json).
- Next: Complete a fresh independent review, address findings, then publish one PR and verify exact-head CI before merge.
