# task-reviewed-que-57-60-and-bpct-sentences-41-48 - Reviewed quẻ 57–60 and BPCT sentences 41–48

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reviewed-que-53-56-and-bpct-sentences-33-40](task-reviewed-que-53-56-and-bpct-sentences-33-40.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #75 at squash commit `b662861d63ac65f167ed871f93cd890f5f7fface`.
- Evidence: Exact-head fresh independent reviews at `378ea75e0131ecb9f47208fa940a7f6bb81b599e` and `3d3a1770f5e97f9be4863007020ed8eb99b6d7bc` returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed with 482 tests; corpus `--check-books --check` passed with 197 records, 2,207 claims and 2,392 citations; package-export checks passed. Corpus-wide specialist audit and certification remain open.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Continue with selected task-reviewed-que-61-64-and-bpct-sentences-49-56.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — task-reviewed-que-57-60-and-bpct-sentences-41-48 merged

**State**: done and merged to `main` in PR #75 at `b662861d63ac65f167ed871f93cd890f5f7fface`.
**Done**: Added reviewed quẻ 57–60 and BPCT chapter 6 sentences 41–48, updated source inventory and release coverage, retired four legacy records, and retained offline precaching. Added the repository rule for measured Workbox per-file limit increases driven by knowledge growth.
**Evidence**: Exact-head independent reviews returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 482 tests; corpus `--check-books --check` passed with 197 records, 2,207 claims, and 2,392 citations; package-export checks passed. See [task-reviewed-que-57-60-and-bpct-sentences-41-48](task-reviewed-que-57-60-and-bpct-sentences-41-48.md).
**Coverage**: 60/64 quẻ and 360/384 line positions. Corpus-wide specialist audit and certification remain open.
**Blockers**: none for task-reviewed-que-57-60-and-bpct-sentences-41-48.
**Next**: Continue with selected task-reviewed-que-61-64-and-bpct-sentences-49-56 from updated `main`.
