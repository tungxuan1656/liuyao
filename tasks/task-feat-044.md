# feat-044 - Reviewed quẻ 41–44 and BPCT sentences 12–16

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-097](task-feat-097.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete the next four quẻ and the paired BPCT passage group.

## Scope

**Intended work:**

- 41 Sơn Trạch Tổn; 42 Phong Lôi Ích; 43 Trạch Thiên Quải; 44 Thiên Phong Cấu: overviews and six lines in NHL, PBC, and NTT.
- BPCT Part I, chapter 6, sentences 12–16; PDF 81–82 are planning anchors.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Quẻ 41: all six positions and each supplied commentary layer are represented in attributed summaries; per-cell audit remains open.
- [x] Quẻ 42: all six positions and each supplied commentary layer are represented in attributed summaries; per-cell audit remains open.
- [x] Quẻ 43: all six positions and each supplied commentary layer are represented in attributed summaries; unresolved line-3 readings remain separate.
- [x] Quẻ 44: all six positions and each supplied commentary layer are represented in attributed summaries; printed discrepancies remain attributed.
- [x] BPCT sentences 12–16: each numbered passage has separate verse/commentary citations; source inspection found no attached notes.
- [x] Replace the four legacy quẻ without changing stable IDs; publish the authored IDs in the selected release.
- [x] Review full passages, diagrams, attribution, discrepancies, and exclusions before release.
- [x] Source-compared claims in quẻ 41–44 and BPCT 12–16 pass the corpus publication gate; the selected-unit inventory dispositions and coverage are current (broader audit discovery remains open).
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

The coordinator's final run passed generation, `./init.sh`, read-only format and lint checks, corpus validation with `--check-books --check`, and diff checks. It reported 416 tests passing (181 core, 235 knowledge).

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: complete and merged to `main` in PR #66 (`d14a7b49c03140c938a18acc655693cfa0a0c880`).
- Evidence: The five authored release IDs cover quẻ 41–44 and BPCT sentences 12–16. Ora-11 accepted P1–P4, and ora-12 accepted the final one-claim attribution-applicability correction with no blockers. Coordinator run `sh_10819f80b00103gkUOz5438OgP` passed generation, `./init.sh`, read-only format and lint checks, corpus `--check-books --check`, and diff checks. It reported 416 tests passing (181 core, 235 knowledge), 177 records, 1,395 claims, 1,265 citations, 44/64 quẻ, and 264/384 line positions. Four nonfatal web lint warnings and build font, sourcemap, and chunk warnings remain.
- Limits: Audit decisions remain absent and audit gates remain closed. Independent specialist approval, rights clearance, and certification are not complete. This batch does not claim any of them. The BPCT sentence 11 footnote was not moved into this batch.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Continue the selected knowledge sequence at feat-045; feat-078 is also merged.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-05 — feat-044 and feat-078 merged

**State**: Both features are done and merged to `main`.
**Done**: Confirmed feat-044 in PR #66 and feat-078 in PR #67. Their completion records now reflect the merged state; the feat-078 merge prerequisite no longer blocks feat-045.
**Evidence**: Main contains `d14a7b49c03140c938a18acc655693cfa0a0c880` (feat-044) and `52b0c19bdb42102e74048fa44dc26354ad1d8a40` (feat-078). Feature-specific acceptance and verification evidence remains in [feat-044](../features/feat-044.md) and [feat-078](../features/feat-078.md).
**Blockers**: Corpus-wide specialist review, rights clearance, and certification remain open; they do not block the next authoring feature.
**Next**: Continue the selected sequence at feat-045.

#### 2026-10-05 — feat-044 implementation finalized

**State**: done for implementation and local acceptance; exact-SHA review, PR, and merge remain pending.
**Done**: Completed full-source review and attribution-applicability follow-up for the authored quẻ 41–44 and BPCT 12–16 batch; recorded the feature as done without claiming merged delivery or audit completion.
**Evidence**: Coordinator run `sh_10819f80b00103gkUOz5438OgP` passed generation, `./init.sh`, format, lint, corpus `--check-books --check`, and diff checks; 416 tests passed (181 core, 235 knowledge). Full-source review and ora-11/ora-12 findings are recorded in [feat-044](../features/feat-044.md).
**Blockers**: Exact-SHA review and PR/merge remain. Audit decisions, audits 078/085, independent specialist approval, rights clearance, and certification remain incomplete.
**Next**: Coordinator commits the explicitly owned batch paths and requests exact-SHA review.

## Migration provenance

Migrated from [feat-044](../features/feat-044.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
