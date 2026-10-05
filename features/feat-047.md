# feat-047 — Reviewed quẻ 53–56 and BPCT sentences 33–40

## Goal

Complete the next four quẻ and the paired BPCT passage group.

## Scope

**Intended work:**

- 53 Phong Sơn Tiệm; 54 Lôi Trạch Quy Muội; 55 Lôi Hỏa Phong; 56 Hỏa Sơn Lữ: overviews and six lines in NHL, PBC, and NTT.
- BPCT Part I, chapter 6, sentences 33–40; PDF 87–90 are planning anchors.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Quẻ 53: all six positions and each supplied commentary layer.
- [ ] Quẻ 54: all six positions and each supplied commentary layer.
- [ ] Quẻ 55: all six positions and each supplied commentary layer.
- [ ] Quẻ 56: all six positions and each supplied commentary layer.
- [ ] BPCT sentences 33–40: each numbered passage and its notes.
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

- The user authorized raising the Workbox file-size rule above 2 MiB after the integrated asset measured 2,615,592 bytes and exceeded the existing 2,424,832-byte ceiling. The cap is now 2,686,976 bytes (2 MiB + 576 KiB), leaving 71,384 bytes of headroom. This is the smallest 64-KiB-aligned value that accommodates the measured asset with at least 64 KiB reserved. Only the cap and matching comment changed; precaching and all other PWA behavior remain unchanged. This approval applies to feat-047 and does not establish a ceiling for later batches.

## Handoff

- State: active on `feat/047-reviewed-que-53-56-bpct-33-40`; source authoring and integration are committed at `78eccf4a2830f63fa2ea69d3fe8acdc8372ca6f3`.
- Evidence: `./init.sh` passed with 472 tests; `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed with 192 records, 2,017 claims and 2,123 citations. Exact-head independent review and publication remain.
- Dependencies: See [feature index](../feature_index.json).
- Next: Complete independent review, address findings, then publish one PR and verify exact-head CI before merge.
