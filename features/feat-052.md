# feat-052 — Complete BPCT applications — Weather life career and wealth

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 101–165; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Chapter 7 — Thiên Thời: all passages, conditions, examples, and notes.
- [x] Niên Thời — unnumbered: all passages, conditions, examples, and notes.
- [x] Chapter 9 — Thân Mệnh: all passages, conditions, examples, and notes.
- [x] Chapter 10 — Cầu Danh: all passages, conditions, examples, and notes.
- [x] Chapter 11 — Sĩ Hoạn: all passages, conditions, examples, and notes.
- [x] Chapter 12 — Cầu Tài: all passages, conditions, examples, and notes.
- [x] Preserve question-specific roles, qualifications, and translator disagreements.
- [x] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md),
[implementation plan](../docs/plans/feat-052.md).

## Plan

1. Map the actual source units and compare existing claims.
2. Author and commit one chapter or unnumbered-section checkpoint at a time.
3. Reconcile every disposition and run the combined release checks.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Source Evidence

- Six source-compared V2 articles release941 new original summaries/citations. Coverage is
  224 records,4360 claims and4606 citations. The [source inventory](../docs/reviews/knowledge/source-inventory.md#feat-052-application-passage-dispositions)
  records399 children under the six unchanged parent intervals; registry revision36 keeps
  discovery/audit unresolved and binds exact inventory bytes.
- SHA256 `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`,
  467 pages verified. Full text101–165 and adjacent100/166, attribution1–3 read; contact
  sheets100–163 and individual1–3,137,143,164–166 inspected. Contact sheets are not
  individual-full-size review of every application page. No table/diagram occurs.
- Niên Thời remains unnumbered, chapter10's duplicate5 labels stay distinct, the thirty-item
  inserted lifetime essay stays uncredited, and attached notes/examples retain their own
  evidence. PDF155 continues chapter11's closing. Image165 is folio139 only; supervisor
  approved correcting the prior fragment assumption, with closing on164 and unchanged
  chapter12 parent156–165. See [Book sources](../docs/references/book-sources.md) for
  discrepancies, question roles and withheld authority.

## Verification Evidence

- Checkpoint commits and exact outcomes are in the [plan](../docs/plans/feat-052.md#checkpoint-evidence-and-review-handoff).
  Every checkpoint passed focused package tests and supplied-book corpus/freshness checks.
- Final focused1798 tests pass. `./init.sh` passes:181 core plus2161 knowledge tests,
  format/lint/length/typecheck/build and package exports. The knowledge test script remains
  `vitest run --maxWorkers=2`. Four existing React-refresh lint warnings and existing
  Vite sourcemap/chunk-size warnings do not fail checks.
- Explicit `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` and
  `pnpm --dir apps/web run check:package-exports` pass. Built public exports match all six
  articles/941 claims and941 new citations exactly. All218 prior released records and
  3665 prior citations remain semantically identical; old authored records byte-identical.
- Rebuilt integrated `index-D8w0dryh.js` is5,523,385 bytes. Old cap4,456,448 failed
  Workbox; measured per-file cap5,570,560 leaves47,175 bytes. Generated SW includes the
  main asset and all18 entries. All other PWA behavior is unchanged.
- Full diff, inventory hash and170 documentation routes checked. No PDFs, copied source
  passages/images or local PDF metadata/paths enter the release. Existing rejection-guard
  strings are not public source metadata. Audit/certification gates remain closed.

## Handoff

- State: active on `feat/052-bpct-applications-weather-life-career-wealth`, based on `main`
  at `599b08006e34cf255e147840dc8535318e652409`; local implementation/source comparison
  complete, independent acceptance review and merge pending.
- Evidence: tasks1–8 completed with chapter checkpoints and final reconciliation; no
  interpretation, calendar, classifier, UI, audit or certification behavior added.
- Limitations: generic front credits do not certify authorship of each verse. Uncredited
  essay author/translator, malformed words, missing separately printed Hán clause, divergent
  meaning/commentary/name forms and historical outcome reports remain qualified. No
  predictive efficacy, safety/medical/financial authority, coercive duties or source repair.
- Dependencies: See [feature index](../feature_index.json); parent owns index/progress state.
- Next: Independent acceptance review of the exact final branch HEAD, then merge.
  `nextBatch` points to feat-053 (BPCT PDF166–230) without activating it. No push/PR performed.
