# feat-056 — Complete BPCT applications — Litigation spirits agriculture state conflict and flight

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 302–364; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Chapter 27 — Từ Tụng: all passages, conditions, examples, and notes.
- [x] Chapter 28 — Quỷ Thần: all passages, conditions, examples, and notes.
- [x] Chapter 29 — Chủng Tác: all passages, conditions, examples, and notes.
- [x] Chapter 30 — Lục Súc: all passages, conditions, examples, and notes.
- [x] Chapter 31 — Tàm Tang: all passages, conditions, examples, and notes.
- [x] Chapter 32 — Quốc Triều: all passages, conditions, examples, and notes.
- [x] Chapter 33 — Chinh Chiến: all passages, conditions, examples, and notes.
- [x] Chapter 34 — Tị Loạn: all passages, conditions, examples, and notes.
- [x] Chapter 35 — Đào Vong: all passages, conditions, examples, and notes.
- [x] Preserve question-specific roles, qualifications, and translator disagreements.
- [x] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Map existing claims and uncovered sections.
2. Review and commit each chapter/supplement checkpoint.
3. Reconcile reused terms, exclusions, and group coverage.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- The existing acceptance scope is sufficient; keep the plan inline because this is one bounded knowledge-package cohort with no API, migration, or workspace changes.
- Preserve the source inventory's nine chapter boundaries (PDF 302–364); retain author and translator layers, and treat divination outcomes only as attributed source claims.
- Keep source audit and corpus certification gates open; chapter authoring does not certify the corpus or establish efficacy.

## Handoff

- State: implementation complete on the active branch; independent acceptance review, publication and merge remain pending. Feature index and progress are unchanged by the worker.
- Evidence: Nine released, source-compared chapter articles; 294 observed child units; 813 claim-specific layer citations. Chapter27: 36 units/104 claims;28:35/86;29:30/87;30:33/93;31:22/63;32:25/70;33:28/81;34:48/134;35:37/95. Full passage/layer locations and dispositions are in the [inventory register](../docs/reviews/knowledge/source-inventory.md#feat-056-litigation-spirits-agriculture-state-conflict-and-flight-passage-register); source differences and limits are in [Book sources](../docs/references/book-sources.md#feat-056-source-comparison).
- Source inspection: Complete extracted text and all63 images PDF302–364 checked, plus301/365 and credits1–3;302–315 individually,316–363 in full-resolution page pairs,364 individually. Supplied467-page BPCT SHA256 unchanged. No assigned tables/diagrams;365 boards are Part II, outside this cohort. Printed folios overlap/restart;315/316 jumps272→275 without evidence of missing PDF pages. Original/reading, separately printed Vietnamese meaning, commentary and29 notes/glosses retain distinct claims.
- Decisions: Preserve29's two23 labels as23a/23b and35's absent5, not corrected numbering. Retain incomplete27/6 and35/17 without reconstructed endings, unsigned30/7 gloss with attribution uncertainty, explicit Vĩnh Cao disagreement28/14, and other source-layer alternatives. Descriptive historical roles and outcomes do not establish efficacy, modern legal/medical/safety authority, or UI/calculation behaviour.
- Publication boundary: All239 prior released records,6239 prior released citations and4 sources remain semantically identical as parsed objects; all1630 prior group obligations,17 exclusions and19 layer rosters remain unchanged except nine parent record mappings. Inventory revision46 adds294 unresolved children; total1924 groups. No ledger decisions or certification are introduced; both generated gates stay closed and complete=false.
- Verification: `./init.sh` passes format, lint/length, typecheck, build, package exports and package tests (knowledge42 files/3364 tests; core13 files/181 tests). `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passes:248 records,6806 claims,7052 citations,64/64 quẻ,384/384 positions. Focused chapter055/056 tests pass452 tests. `git diff --check` passes. Legacy aggregate-count assertions were updated only for the new census.
- PWA evidence: Root integrated build measured8,848,657-byte JS, exceeding the previous8MiB cap. Raise only maximumFileSizeToCacheInBytes to9MiB (588,527 bytes headroom); all other Workbox settings unchanged. Final build precaches18 entries/9266.05KiB and generated sw.js contains the integrated JS. No asset exclusions or dynamic-import behaviour added. Existing font/sourcemap/large-chunk warnings remain non-fatal.
- Verification history: Initial baseline was timeout-limited at200 seconds, not a completed baseline pass. First corpus generation rejected a non-ASCII gloss ID (corrected to note-diep); initial final checks exposed stale aggregate test counts and the measured Workbox cap failure, now corrected. Final full gates pass; no waived checks.
- Dependencies: See [feature index](../feature_index.json).
- Next: Independently review the committed diff and each assigned passage against the supplied PDF, then let the coordinator own feature-state updates, PR and merge gates. Source audit090, separate verification and corpus certification remain future gates, not this authoring approval.
