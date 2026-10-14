# task-reviewed-que-61-64-and-bpct-sentences-49-56 - Reviewed quẻ 61–64 and BPCT sentences 49–56

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reviewed-que-57-60-and-bpct-sentences-41-48](task-reviewed-que-57-60-and-bpct-sentences-41-48.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #76 at squash commit `c6357316a47d10ae9c1c143f2291d5bd0f9836fc`.
- Evidence: Fresh exact-head independent review at `27d685ac1c8d4f0cfa5b3f6be4989c759e6101a7` returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 493 tests; corpus check passed with 202 records, 2,398 claims and 2,662 citations; package-export and precache checks passed.
- Blockers: none for task-reviewed-que-61-64-and-bpct-sentences-49-56. Full-corpus audit and certification remain open; contact-sheet review does not claim individual full-size inspection of every classical page.
- Next: Continue with selected task-complete-bpct-chapter-6-sentences-57-69. No corpus audit or certification approval is claimed.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — task-reviewed-que-61-64-and-bpct-sentences-49-56 merged

**State**: done and merged to `main` in PR #76 at `c6357316a47d10ae9c1c143f2291d5bd0f9836fc`.
**Done**: Added source-compared quẻ 61–64 and BPCT chapter 6 sentences 49–56, registered 64 reviewed hexagrams, retired remaining legacy entities, and recorded source limitations. Raised only the measured Workbox per-file cap; all 18 entries remain precached.
**Evidence**: Exact-head independent review returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 493 tests; corpus validation passed with 202 records, 2,398 claims, and 2,662 citations. Package-export and service-worker inclusion checks passed. See [task-reviewed-que-61-64-and-bpct-sentences-49-56](task-reviewed-que-61-64-and-bpct-sentences-49-56.md).
**Coverage**: 64/64 quẻ and 384/384 positions have selected source-compared coverage. Corpus audit and certification remain open; contact-sheet review is not full-size inspection of every classical page.
**Blockers**: none for task-reviewed-que-61-64-and-bpct-sentences-49-56.
**Next**: Continue with selected task-complete-bpct-chapter-6-sentences-57-69 from updated `main`.

#### 2026-10-06 — task-reviewed-que-61-64-and-bpct-sentences-49-56 completed local acceptance and verification

- Historical status: done; independent branch acceptance review remains the handoff gate, not corpus certification.
- Result: Final classical authoring slots complete: 64 quẻ and 384 positions have selected source-compared coverage. BPCT 49–56 preserves all numbered verse/commentary layers and notes 10–11; actual absent commentary and source limitations remain explicit.
- Commit: Implementation `0bd626a7406f7e26b01e820f54ac8afef21574ee`.
- Evidence: Final `./init.sh` passed all checks and 493 tests (181 core + 312 knowledge). `validate:corpus --check-books --check`, format freshness, package-export comparison of five records/191 claims, SW precache inclusion, 153 documentation routes and final diff checks passed. All 197 prior released records and 2,392 prior citations remain semantically unchanged. Worktree had no unrelated changes.
- Offline: `index-DtlSMMtK.js` is 3,113,895 bytes; cap 3,211,264; 97,369-byte reserve. All 18 assets stay precached and other PWA settings stay unchanged.
- Limitations: Contact-sheet review is not full-size review of every classical page. Missing/ambiguous text, unlocated NHL reference, uncredited PBC note and author alternatives are retained without repair. Audit/verification/certification gates stay closed; no full corpus or efficacy approval claimed.
- Next: Independent acceptance review of task-reviewed-que-61-64-and-bpct-sentences-49-56; then user selection of task-complete-bpct-chapter-6-sentences-57-69, BPCT chapter 6 sentences 57–69 (PDF 94–100).
