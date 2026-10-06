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

- [x] Quẻ 53: all six positions and each supplied commentary layer.
- [x] Quẻ 54: all six positions and each supplied commentary layer.
- [x] Quẻ 55: all six positions and each supplied commentary layer.
- [x] Quẻ 56: all six positions and each supplied commentary layer.
- [x] BPCT sentences 33–40: each numbered passage and its notes.
- [x] Replace the four legacy quẻ without changing stable IDs.
- [x] Review full passages, diagrams, attribution, discrepancies, and exclusions before release.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

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

- **Workbox file-size limit** — Question: how to handle the 2,615,592-byte integrated asset exceeding the 2,424,832-byte cap? Decision: raise the cap to 2,686,976 bytes (2 MiB + 576 KiB), leaving 71,384 bytes of headroom. Alternatives: block feat-047 release or alter caching behavior. Rationale: the user explicitly authorized a cap above 2 MiB; this is the smallest 64-KiB-aligned limit with at least 64 KiB reserve for the measured asset. Evidence: user authorization in this session and the measured production build. Effect: only the Workbox maximum and matching comment change; precaching and other PWA behavior remain unchanged. This approval does not establish a limit for later batches.
- **CI test timeouts** — Question: how to address exact-head CI timing out the corpus generator and audit-gate tests? Decision: raise only their test limits from 40 to 60 seconds and 20 to 30 seconds. Alternatives: leave the failing limits or reduce test coverage. Rationale: repeated GitHub runs measured 43.8–50.4 seconds and 18.6–20.2 seconds, while assertions and workloads passed locally. Evidence: exact-head GitHub CI logs, prior successful PR timings, and passing post-change tests. Effect: no test assertions or production behavior changed; future corpus growth remains a runtime watch item.

## Handoff

- State: done and merged to `main` in PR #74 at `6d9a7a00e0063e65629ddb3604bab7f4664f79ca`.
- Evidence: Final PR head `08efc247ca2559591e5de8d04f7238c38a70e4f1` passed GitHub `verify`, Cloudflare Pages and GitGuardian. Fresh independent reviews at `0843ebbe5de22a33ec5c5e6350afb78d1aaa7ebf` and `08efc247ca2559591e5de8d04f7238c38a70e4f1` returned `OK WITH NOTES`, with no P0/P1/P2 findings. Reports: `feat-047-final-independent-review.md` and `feat-047-ci-timeout-review.md` in the session artifact store. `./init.sh` passed with 472 tests; `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed with 192 records, 2,017 claims and 2,123 citations. Coverage is 56/64 quẻ and 336/384 line positions; wider audit and certification gates remain open. Existing Fast Refresh, source-map, font-reference and large-chunk warnings remain; no direct browser/offline test was run. The Workbox cap leaves 71,384 bytes for the measured asset; later batches require a new measured decision.
- Dependencies: See [feature index](../feature_index.json).
- Next: Start selected feat-048 from updated `main`; measure the built asset before making any further PWA limit change.
