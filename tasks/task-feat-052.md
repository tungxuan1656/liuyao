# feat-052 - Complete BPCT applications — Weather life career and wealth

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-051](task-feat-051.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done and merged to `main` in PR #79 at `a01d4d3d94d91196cd8c220c435dd8e4a2e7e77a`.
- Evidence: Exact-head independent review of `9a8b9574f7b62fb2dae953386d44b42500fb84f4`
  returned OK WITH NOTES with no P0/P1/P2 findings. PR-head `verify` run 37423315939,
  Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 2,342 tests (2,161 knowledge,
  181 core); corpus `--check-books --check` and package-export checks passed. The source
  review and certification gates remain closed; no corpus audit or efficacy evidence is implied.
- Limitations: Generic front credits do not certify authorship of each verse. Uncredited
  essay author/translator, malformed words, missing separately printed Hán clause, divergent
  meaning/commentary/name forms and historical outcome reports remain qualified. No
  predictive efficacy, safety/medical/financial authority, coercive duties or source repair.
- Dependencies: See the feature index.
- Next: Continue with selected feat-053 from updated `main`. `nextBatch` points to feat-053
  (BPCT PDF166–230); no future feature was activated by this delivery.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — feat-052 merged

**State**: done and merged to `main` in PR #79 at `a01d4d3d94d91196cd8c220c435dd8e4a2e7e77a`.
**Done**: Published six BPCT application units: chapter 7 Thiên Thời, unnumbered Niên Thời, and chapters 9–12. Added 941 source-compared claims/citations and mapped 399 child dispositions beneath the existing six parent intervals. Corrected the chapter 12 close to PDF 164 and recorded PDF 165 as folio-only non-content.
**Evidence**: Exact-head independent review returned `OK WITH NOTES`, no P0/P1/P2 findings. PR-head `verify` run 37423315939, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 2,342 tests (2,161 knowledge, 181 core); corpus `--check-books --check` and package-export checks passed. Workbox cap is measured at 5,570,560 bytes for the 5,523,385-byte integrated asset; all 18 precache entries remain.
**Coverage**: Historical divination outcomes remain attributed claims, not efficacy evidence. Source review and certification gates remain open; contact-sheet inspection limits are recorded, and full-size inspection of every page is not claimed.
**Blockers**: none for feat-052; unattributed layers and source discrepancies remain explicitly documented.
**Next**: Continue with selected feat-053 from updated `main`.

## Migration provenance

Migrated from [feat-052](../features/feat-052.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
