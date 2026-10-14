# feat-051 - Complete BPCT foundational chapters and front matter

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-050](task-feat-050.md), [feat-101](task-feat-101.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT PDF 1–76: front matter and Part I chapters 1–5.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Front matter and named textual layers.
- [x] Chapter 1: all basic definitions and diagrams.
- [x] Chapter 2: every Ca Quyết formula/table.
- [x] Chapter 3: Thông Huyền Phú and Túy Kim Phú.
- [x] Chapter 4: all 64 annotated boards.
- [x] Chapter 5: all eighteen discussions and inserted material.
- [x] Tables and diagrams use the implemented feat-101 evidence contract.
- [x] Reconcile existing selected records and attribution uncertainty; do not rewrite reviewed content without evidence.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md),
[implementation plan](../docs/plans/feat-051.md).

## Plan

1. Inventory uncaptured units in each chapter.
2. Review and commit one chapter checkpoint at a time.
3. Close every unit disposition and verify the combined group.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done and merged to `main` in PR #78 at `2d30586b7989c255209750b0bac23cd9efca30aa`.
- Evidence: Final independent review at `b98e555a476a130c5a3d83dab741555f547f3c36` returned
  OK WITH NOTES with no P0/P1/P2 findings. Exact-head `verify` run 37417899865, Cloudflare Pages,
  and GitGuardian passed. `./init.sh` passed with 363 knowledge and 181 core tests; corpus and
  package-export checks passed. Source review and certification gates remain closed; no corpus
  audit, efficacy claim, or rights certification is implied.
- Dependencies: feat-050 and feat-101 are done; see the feature index.
- Blockers: none for feat-051. Source ambiguities, missing labels/entries, unspecified authors,
  and non-authoritative historical assertions remain explicit limitations.
- Next: Continue with selected feat-052 from this updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — feat-051 merged

**State**: done and merged to `main` in PR #78 at `2d30586b7989c255209750b0bac23cd9efca30aa`.
**Done**: Published BPCT front matter and Part I chapters 1–5 (PDF 1–76), including all 64 annotated boards, all 18 chapter 5 discussions, and the distinct unnumbered postscript. Added 15 V2 records, 960 claims/citations, and dispositions for 196 assigned obligations while preserving earlier released records and citations.
**Evidence**: Exact-head independent reviews returned `OK WITH NOTES` with no P0/P1/P2 findings; final reviewed branch head `b98e555a476a130c5a3d83dab741555f547f3c36`. PR-head `verify` run 37417899865, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 544 tests (363 knowledge, 181 core); corpus `--check-books --check` and package-export checks passed. Knowledge test concurrency is capped at two workers after two CI runs exposed timeout/RPC contention; full verification and exact-head checks now pass.
**Coverage**: Workbox precaches all 18 assets; integrated main asset 4,413,242 bytes under the measured 4,456,448-byte cap, leaving 43,206 bytes. Corpus source review and certification remain incomplete; no full-corpus audit or certification is claimed.
**Blockers**: none for feat-051. Source ambiguities and unattributed layers remain explicitly recorded.
**Next**: Continue with selected feat-052 from updated `main`.

## Migration provenance

Migrated from [feat-051](../features/feat-051.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
