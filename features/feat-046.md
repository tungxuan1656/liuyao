# feat-046 — Reviewed quẻ 49–52 and BPCT sentences 25–32

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

## Decision log

- **PBC Cấn heading** — Question: how should the repeated `51` heading at the Cấn body be represented? Decision: retain canonical `hexagram-52` from the quẻ name, diagram, and parallel source evidence; record the printed `51` as a source discrepancy, not an emendation. Alternatives: renumber the record to 51 or silently normalize the heading. Rationale: the supplied PBC contents on PDF 5 and body on PDF 493 repeat 51, while the section is Cấn and the other witnesses identify quẻ 52. Evidence: PBC PDFs 5/493; NHL PDF 294; NTT PDF 790; source-inventory crosswalk. Effect: update the catalog locator to PDF 5 and preserve stable quẻ 52 IDs.
- **BPCT verse attribution** — Question: who is credited for sentences 25–32? Decision: attribute verses to Lưu Bá Ôn as the supplied edition does, and commentary to Vương Hồng Tự; do not assert historical authorship. Alternatives: leave verses unattributed or attribute them to the commentator. Rationale: the supplied BPCT front matter separates these credits. Evidence: BPCT PDF 1, cited by `citation-bpct-front-phu-credits`. Effect: attribution is source-local; earlier feat-045 records remain unchanged.
- **Inventory registry binding** — Question: how to keep the audit registry valid after the source inventory changes? Decision: update only `inventory.sha256` to the exact new inventory bytes and increment `registryRevision` from 3 to 4. Alternatives: leave a stale hash or change projected audit units. Rationale: the approved feat-101 contract requires a paired exact-byte binding and revision. Evidence: `docs/design-docs/knowledge-model.md`, approved versioned audit contract. Effect: all units, mappings, counts, layer rosters, groups, and exclusions remain unchanged.
- **Manifest next batch** — Question: where should `manifest.nextBatch` point after this cohort? Decision: advance the navigation pointer to feat-047 (quẻ 53–56 and BPCT sentences 33–40). Alternatives: leave it pointing at completed feat-046 or add feat-047 content. Rationale: the manifest owns the next content batch and the selected range includes feat-047. Evidence: `packages/knowledge/data/README.md` and the feat-047 scope. Effect: navigation only; no feat-047 content or status changes.
- **PWA precache ceiling** — Question: how should the full build handle the 2,348,316-byte released asset? Decision: set `maximumFileSizeToCacheInBytes` to 2,424,832 bytes and update its comment, preserving existing precaching behavior. Alternatives: keep the 2,162,688-byte limit and block this release, or change caching behavior. Rationale: the user explicitly authorized this bounded increase; it leaves 76,516 bytes headroom for the measured asset. Evidence: local build measurement and user approval in this session. Effect: only the size ceiling and comment change; no other PWA setting changes.

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: done; PR #73 merged to `main` at `eb862ff2c5a734dbb8306a7258e1c93b6b5eda16`.
- Evidence: Final PR head `41e05a511de004390c5d56fbc34e310c10321e8d` passed GitHub `verify`, Cloudflare Pages, and GitGuardian. Fresh independent review returned `Merge verdict: OK with notes`, with no P0/P1/P2 findings. `./init.sh` passed format, lint/length, typecheck, build, package exports, and 461 tests. `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed with 187 records, 1,806 claims, and 1,833 citations. Review report: `feat-046-independent-review.md` in the session artifact store. The approved 2,424,832-byte PWA cap leaves 76,516 bytes for the measured asset. Four Fast Refresh, five source-map, sixteen font-reference, and large-chunk warnings remain; no direct browser/offline check was run. Corpus-wide review and certification remain separate and closed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Activate feat-047 on a new branch from updated `main`; continue the selected range in dependency order.
