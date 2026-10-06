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

- [x] Quẻ 57: all six positions and each supplied commentary layer.
- [x] Quẻ 58: all six positions and each supplied commentary layer.
- [x] Quẻ 59: all six positions and each supplied commentary layer.
- [x] Quẻ 60: all six positions and each supplied commentary layer.
- [x] BPCT sentences 41–48: each numbered passage and its notes.
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

- **Workbox file-size limit** — Question: how to handle the measured 2,872,385-byte integrated asset exceeding the 2,686,976-byte cap? Decision: raise the cap to 2,949,120 bytes (2 MiB + 832 KiB), leaving 76,735 bytes of headroom. Alternatives: block feat-048 release or alter caching behavior. Rationale: the user explicitly authorized this bounded increase; the value is the smallest 64-KiB-aligned limit that provides at least 64 KiB of reserve. Evidence: user approval in this session and the measured production build. Effect: only the Workbox maximum and matching comment changed; precaching and all other PWA behavior remain unchanged. The repository-wide rule in `AGENTS.md` now permits future measured increases for knowledge-driven bundle growth without separate approval.

## Handoff

- State: done; merged to `main` in PR #75 at squash commit `b662861d63ac65f167ed871f93cd890f5f7fface`.
- Evidence: Exact-head fresh independent reviews at `378ea75e0131ecb9f47208fa940a7f6bb81b599e` and `3d3a1770f5e97f9be4863007020ed8eb99b6d7bc` returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed with 482 tests; corpus `--check-books --check` passed with 197 records, 2,207 claims and 2,392 citations; package-export checks passed. Corpus-wide specialist audit and certification remain open.
- Dependencies: See [feature index](../feature_index.json).
- Next: Continue with selected feat-049.
