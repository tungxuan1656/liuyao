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

- [x] Quẻ 61: all six positions and each supplied commentary layer.
- [x] Quẻ 62: all six positions and each supplied commentary layer.
- [x] Quẻ 63: all six positions and each supplied commentary layer.
- [x] Quẻ 64: all six positions and each supplied commentary layer.
- [x] BPCT sentences 49–56: each numbered passage and its notes.
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

## Source-comparison evidence

- Source inventory assigns NHL PDF 321–333, PBC 564–600 and NTT 895–936. All four local SHA-256 fingerprints match `packages/knowledge/data/sources.json`; no source edition metadata changed.
- Read complete extracted classical passages, diagrams, context, PBC supplements and attached NTT notes; visually inspected contact sheets covering all assigned pages. Contact-sheet inspection is not individual full-size inspection of every page. Focused individual images at NHL 331, NTT 911/912/930/933 and PBC 655 resolve specific limitations. BPCT full extracted context at 1–3, 91–95 and 403, and individual images at 1–3, 92–94 and 403, establish verse/commentary boundaries and notes 10–11.
- Four stable quẻ records replace the remaining legacy entities. All 24 positions contain NHL, PBC, Trình Di and Chu Hy selections; eight NTT numbered notes, named supplementary testimony, PBC PHỤ CHÚ and uncredited PBC endnote 21 stay separate. Missing Thoán/Tượng blocks and the empty Tiên Nho heading are not invented. The article keeps eight verses, eight commentaries, two attached notes and one separate dissent.
- Canonical discrepancy, alternative-reading and exclusion findings: [book sources](../docs/references/book-sources.md#quẻ-61-64-and-bpct-49-56-selected-comparison). Publication source comparison does not close feat-083/085 audit, full layer/remainder mapping, independent verification or certification.
- Manifest/release/legacy registration, source-inventory dispositions, expected-unit revision 7 and its inventory-byte hash are reconciled. BPCT 52's expected range now includes continuation PDF 93; all registry obligations, ownership, discovery and layer-roster states remain intact.
- `book-batch-sixteen.test.ts` adds 11 executed test cases covering all four figures, author layers, notes, missing layers, discrepancies, passage bounds and lossless public package projection. Existing corpus count tests advance to 202 records, 2,398 claims and 2,662 citations; earlier batch absence tests require a typed callback now that the legacy entity array is empty.

## Measured offline bundle

A fresh knowledge-package build followed by the web build measured `assets/index-DtlSMMtK.js` at
3,113,895 bytes (gzip 518.63 kB). This exceeds the former Workbox per-file cap of 2,949,120 bytes;
the integrated build correctly failed rather than silently excluding it. A preceding web-only build
used stale package `dist` and is not the measurement used for this decision.

Per the authorization in `AGENTS.md`, raise only `maximumFileSizeToCacheInBytes` to 3,211,264 bytes
(3 MiB + 64 KiB), the smallest 64-KiB-aligned cap allowing at least 64 KiB reserve. Measured headroom
is 97,369 bytes. The next build precaches all 18 entries including this exact main asset; glob patterns,
update prompt, cleanup, clientsClaim, skipWaiting and all other PWA behavior are unchanged.
No speculative cap increase, PDF caching, split-bundle behavior or new UI is introduced.

## Verification evidence

- Baseline `./init.sh`: passed 482 tests (181 core + 301 knowledge), no worktree drift.
- SHA-256 source checks and `validate:corpus --check-books --check`: baseline passed.
- Knowledge package tests: passed 312 tests; newly authored batch contributes 11 cases.
- Initial integration found typed `never[]` in empty legacy-array callbacks and the measured precache cap overflow. Both are bounded consequences of this batch and corrected; no unrelated failures were fixed.
- Final `./init.sh`: passed format/fix, ESLint, TypeScript length checks, type-check, production builds and 493 tests (181 core + 312 knowledge). Existing font-resolution, sourcemap and large-chunk warnings remain unchanged/non-blocking.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`: passed with 202 records, 2,398 claims, 2,662 citations, 64/64 quẻ and 384/384 positions. `pnpm format:check` and `git diff --check`: passed.
- Built public package-export check from `apps/web` using Node and `@liuyao/knowledge`: passed deep equality for all five new records' claims/conditions/attributions, six-line structures and discrepancies (191 new claims), 202 released records, 64 stable compatibility quẻ and no local PDF paths. Generated SW explicitly includes `assets/index-DtlSMMtK.js` at 3,113,895 bytes below the new cap.
- Prior generated 197 record objects and all 2,392 prior citation objects remain equal to initial HEAD; final semantic/diff inspection found no unrelated changes. All 153 local document routes in the changed feature/source/inventory documents resolve. Registry revision 7 binds inventory SHA-256 `6f0c22b08321ef9c0edf9811fcaebfd875fc20f77b63f0bb127fce74798084e5`.
- Implementation checkpoint: `0bd626a7406f7e26b01e820f54ac8afef21574ee` (`feat(knowledge): review que 61-64 and BPCT sentences 49-56`). No push or PR.

## Handoff

- State: done; merged to `main` in PR #76 at squash commit `c6357316a47d10ae9c1c143f2291d5bd0f9836fc`.
- Evidence: Fresh exact-head independent review at `27d685ac1c8d4f0cfa5b3f6be4989c759e6101a7` returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 493 tests; corpus check passed with 202 records, 2,398 claims and 2,662 citations; package-export and precache checks passed.
- Blockers: none for feat-049. Full-corpus audit and certification remain open; contact-sheet review does not claim individual full-size inspection of every classical page.
- Next: Continue with selected feat-050. No corpus audit or certification approval is claimed.
