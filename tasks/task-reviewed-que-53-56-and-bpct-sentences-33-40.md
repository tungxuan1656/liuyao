# task-reviewed-que-53-56-and-bpct-sentences-33-40 - Reviewed quẻ 53–56 and BPCT sentences 33–40

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reviewed-que-49-52-and-bpct-sentences-25-32](task-reviewed-que-49-52-and-bpct-sentences-25-32.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done and merged to `main` in PR #74 at `6d9a7a00e0063e65629ddb3604bab7f4664f79ca`.
- Evidence: Final PR head `08efc247ca2559591e5de8d04f7238c38a70e4f1` passed GitHub `verify`, Cloudflare Pages and GitGuardian. Fresh independent reviews at `0843ebbe5de22a33ec5c5e6350afb78d1aaa7ebf` and `08efc247ca2559591e5de8d04f7238c38a70e4f1` returned `OK WITH NOTES`, with no P0/P1/P2 findings. Reports: `task-reviewed-que-53-56-and-bpct-sentences-33-40-final-independent-review.md` and `task-reviewed-que-53-56-and-bpct-sentences-33-40-ci-timeout-review.md` in the session artifact store. `./init.sh` passed with 472 tests; `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed with 192 records, 2,017 claims and 2,123 citations. Coverage is 56/64 quẻ and 336/384 line positions; wider audit and certification gates remain open. Existing Fast Refresh, source-map, font-reference and large-chunk warnings remain; no direct browser/offline test was run. The Workbox cap leaves 71,384 bytes for the measured asset; later batches require a new measured decision.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Start selected task-reviewed-que-57-60-and-bpct-sentences-41-48 from updated `main`; measure the built asset before making any further PWA limit change.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — task-reviewed-que-53-56-and-bpct-sentences-33-40 merged

**State**: done and merged to `main` in PR #74 at `6d9a7a00e0063e65629ddb3604bab7f4664f79ca`.
**Done**: Added source-compared quẻ 53–56 and BPCT chapter 6 sentences 33–40, citations, attribution, source discrepancies, inventory routes, cohort tests, generated outputs, and legacy retirement. Applied the user-authorized Workbox cap adjustment for this measured cohort and raised two test-only timeouts after exact-head CI exposed limits under runner load.
**Evidence**: Final PR head `08efc247ca2559591e5de8d04f7238c38a70e4f1` passed GitHub `verify`, Cloudflare Pages, and GitGuardian. Fresh independent review at both integration and final PR heads returned `OK WITH NOTES`, with no P0/P1/P2 findings. `./init.sh` passed with 472 tests; corpus `--check-books --check` passed with 192 records, 2,017 claims, and 2,123 citations. See [task-reviewed-que-53-56-and-bpct-sentences-33-40](task-reviewed-que-53-56-and-bpct-sentences-33-40.md); review reports `task-reviewed-que-53-56-and-bpct-sentences-33-40-final-independent-review.md` and `task-reviewed-que-53-56-and-bpct-sentences-33-40-ci-timeout-review.md` remain in the session artifact store.
**Coverage**: 56/64 quẻ, 336/384 line positions. Full-corpus specialist review and certification remain separate open gates.
**Blockers**: none for task-reviewed-que-53-56-and-bpct-sentences-33-40. The 2,686,976-byte Workbox cap leaves 71,384 bytes for this cohort; no authorization for later cap changes is inferred.
**Next**: Continue at task-reviewed-que-57-60-and-bpct-sentences-41-48 from updated `main`; measure the integrated asset and obtain authorization before any further cap increase.
