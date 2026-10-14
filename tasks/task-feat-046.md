# feat-046 - Reviewed quẻ 49–52 and BPCT sentences 25–32

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-045](task-feat-045.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete the next four quẻ and the paired BPCT passage group.

## Scope

**Intended work:**

- 49 Trạch Hỏa Cách; 50 Hỏa Phong Đỉnh; 51 Thuần Chấn; 52 Thuần Cấn: overviews and six lines in NHL, PBC, and NTT.
- BPCT Part I, chapter 6, sentences 25–32; PDF 85–87 are planning anchors.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Quẻ 49: all six positions and each supplied commentary layer.
- [x] Quẻ 50: all six positions and each supplied commentary layer.
- [x] Quẻ 51: all six positions and each supplied commentary layer.
- [x] Quẻ 52: all six positions and each supplied commentary layer.
- [x] BPCT sentences 25–32: each numbered passage and its notes.
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

- Historical state: done; PR #73 merged to `main` at `eb862ff2c5a734dbb8306a7258e1c93b6b5eda16`.
- Evidence: Final PR head `41e05a511de004390c5d56fbc34e310c10321e8d` passed GitHub `verify`, Cloudflare Pages, and GitGuardian. Fresh independent review returned `Merge verdict: OK with notes`, with no P0/P1/P2 findings. `./init.sh` passed format, lint/length, typecheck, build, package exports, and 461 tests. `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed with 187 records, 1,806 claims, and 1,833 citations. Review report: `feat-046-independent-review.md` in the session artifact store. The approved 2,424,832-byte PWA cap leaves 76,516 bytes for the measured asset. Four Fast Refresh, five source-map, sixteen font-reference, and large-chunk warnings remain; no direct browser/offline check was run. Corpus-wide review and certification remain separate and closed.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Activate feat-047 on a new branch from updated `main`; continue the selected range in dependency order.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-05 — feat-046 merged

**State**: done and merged to `main` in PR #73 at `eb862ff2c5a734dbb8306a7258e1c93b6b5eda16`.
**Done**: Added source-compared commentary for quẻ 49–52 and BPCT chapter 6 sentences 25–32, including citations, attribution, notes, discrepancies, legacy retirement, inventory routes, focused tests, and generated outputs. Applied the explicitly approved Workbox limit/comment change.
**Evidence**: Final PR head `41e05a511de004390c5d56fbc34e310c10321e8d` passed GitHub `verify`, Cloudflare Pages, and GitGuardian. Independent review: `Merge verdict: OK with notes`, no P0/P1/P2 findings. `./init.sh` passed with 461 tests; corpus `--check-books --check` passed with 187 records, 1,806 claims, and 1,833 citations. See [feat-046](../features/feat-046.md).
**Blockers**: none for feat-046. Corpus-wide specialist audit/verification and certification remain separate open gates.
**Next**: Continue with selected feat-047 from updated `main`.

## Migration provenance

Migrated from [feat-046](../features/feat-046.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
