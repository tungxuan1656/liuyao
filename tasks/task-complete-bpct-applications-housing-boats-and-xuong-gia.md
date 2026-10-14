# task-complete-bpct-applications-housing-boats-and-xuong-gia - Complete BPCT applications — Housing boats and Xướng Gia

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-complete-bpct-applications-loss-travel-study-marriage-and-household-members](task-complete-bpct-applications-loss-travel-study-marriage-and-household-members.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 231–269; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Chapter 20 — Gia Trạch: all passages, conditions, examples, and notes.
- [x] Chapter 20 supplement — Tân Tăng Gia Trạch: all passages, conditions, examples, and notes.
- [x] Chapter 21 — Châu Thuyền: all passages, conditions, examples, and notes.
- [x] Chapter 22 — Xướng Gia: all passages, conditions, examples, and notes.
- [x] Preserve question-specific roles, qualifications, and translator disagreements.
- [x] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm the supplied BPCT edition fingerprint and inspect the complete source passages for PDF 231–269, including page-boundary images.
2. Map the four assigned inventory units and their source layers before authoring; preserve prior records and unresolved audit obligations.
3. Author source-compared summaries for chapters 20, the chapter 20 supplement, 21, and 22, with claim-specific citations and tests.
4. Reconcile inventory, expected-unit registry, release manifest, generated projection, and next batch; measure the rebuilt web asset and adjust only the Workbox file limit if needed.
5. Run required local gates, inspect the full diff, and record review evidence and handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #81 merged to `main`.
- Evidence: Exact-head independent review OK; full local workflow passed3,093 tests; corpus validation, package exports, prior-content preservation and all18 precache entries verified. Remote required checks passed at the reviewed head.
- Blockers: none for this cohort. 185 child discoveries and4 parent obligations remain unresolved for task-review-and-improve-bpct-applications-housing-boats-and-xuong-gia; global source-review, audit and certification obligations remain open. No efficacy, safety advice or rights clearance claimed.
- Next: Continue with selected task-complete-bpct-applications-illness-remedies-and-absent-travellers (BPCT PDF270–301) after recording this completion.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — task-complete-bpct-applications-housing-boats-and-xuong-gia merged

**State**: done and merged to `main` in PR #81 at `7a9ceec25f5032f193149eab5894c768f126f4de`; reviewed PR head `f8530256ce39960ef64660f05b6e8a56eb929547`.
**Done**: Added four source-compared BPCT Part I records for chapter 20 housing, its supplement, chapter 21 boats, and chapter 22 Xướng Gia (PDF 231–269): 494 claims/citations and 185 mapped child obligations. Preserved overlapping folios, actual layer boundaries, source gaps and uncertainties, and unresolved task-review-and-improve-bpct-applications-housing-boats-and-xuong-gia audit obligations. Corrected the historical task-complete-bpct-applications-loss-travel-study-marriage-and-household-members handoff sentence in `docs/references/book-sources.md`.
**Evidence**: Independent exact-head review returned `OK`, no P0–P2 findings. PR-head CI run 37447755511/job 112216577067, Cloudflare Pages, and GitGuardian passed. Parent `./init.sh` passed 3,093 tests (181 core, 2,912 knowledge); corpus freshness and package exports passed. Integrated asset 7,112,047 bytes under the 7,340,032-byte Workbox cap; all 18 precache entries remain. All 231 prior released records and 5,366 citations remain semantically unchanged. The independent review's initial path attribution error was corrected in its addendum; the verdict remained OK.
**Coverage**: 185 children and four parent obligations remain unresolved for task-review-and-improve-bpct-applications-housing-boats-and-xuong-gia. Global source-review, audit, and certification obligations remain open. No efficacy, safety advice, rights clearance, or corpus certification is claimed.
**Blockers**: none for task-complete-bpct-applications-housing-boats-and-xuong-gia.
**Next**: Continue with selected task-complete-bpct-applications-illness-remedies-and-absent-travellers from updated `main`.
