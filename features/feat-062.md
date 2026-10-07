# feat-062 — Complete Hệ Từ Hạ across NHL and PBC

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 363–388; PBC PDF 631–648; confirm twelve chapter boundaries.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Hạ chapters 1–6: both books and all named layers.
- [x] Hạ chapters 7–12: both books and all named layers.
- [x] Each chapter requires its own passage disposition; quoted NTT fragments do not create an absent appendix.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review chapters 1–6 and commit.
2. Review chapters 7–12 and commit.
3. Reconcile quẻ-level quotations, notes, and exclusions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- Selection: Next dependency-ready feature in the user-authorized feat-045–083 sequence; skip completed feat-067 and feat-078.
- Dependencies: feat-061 is done on `main` at `66cc2ea`; feat-061 was the only dependency. Feat-101 is also done.
- Sources: NHL is Nguyễn Hiến Lê's `source-book-nhl` / `edition-nhl-supplied`, 393 pages, SHA-256 `9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e`. PBC is Phan Bội Châu's `source-book-pbc` / `edition-pbc-supplied`, 655 pages, SHA-256 `cbe589d41b3285a8287800a0ed3789c5c0324fba6c80f35e9c27a25377a4d2d6`. Both local PDFs match `sources.json`.
- Source boundaries: NHL Hạ is PDF363–388 after Thượng closes on362; its retrospective begins at389, outside scope. PBC Hạ is PDF631–648, followed by separate wings at649. The canonical chapter registers are in the [source inventory](../docs/reviews/knowledge/source-inventory.md) (lines302–313 and539). Feat059 corrected NHL chapter12's old page-end from386 to388 but authored no Hạ content; feat062 owns the complete Hạ source comparison (source-inventory line3677).
- PBC state: The source labels the wing `lược trích`; preserve each chapter's missing notice or selected sections as PBC-specific, and do not reconstruct absent text or transfer PBC omissions to NHL. See the canonical chapter register rather than creating a duplicate table. Neither edition's Hạ content is interchangeable with NTT fragments.
- Parent source check: Direct PyMuPDF metadata/page-text probes matched both fingerprints and chapter starts. Full-page samples opened for NHL PDF363,382,388 and PBC PDF631,634,638,643,648; the worker must inspect all 44 assigned page images individually before completing dispositions. Inventory locators are navigation, not image review.
- Planning: Retain the inline plan; this is one bounded knowledge-package batch with no schema, API, workspace, calendar, or UI change. Route new units to author feat-062 → audit feat-092; do not alter previous feat-061 routes. Keep source audit/review/certification open.

## Implementation Evidence

- Checkpoint1: `8985fafde1eefaf420e4a4ae06641f8b1c3e426d` releases chapters1–6 (twelve articles,208 claims/citations) after all44 page inspections and fingerprint checks. Checkpoint2: `3d6b3068dfaa08db42b3d396779f9f435a34b2e6` adds chapters7–12 and full focused/preservation verification; final evidence checkpoint follows the passing integrated workflow. Feature state remains active pending independent acceptance review; parent owns canonical status/progress and final done handoff.
- Source inspection: Independently matched both assigned hashes against `sources.json`,opened every full-page image individually (PyMuPDF1.5x,918×1188),and compared complete extraction including headings,notes and footers. The [inspection artifact](../docs/reviews/knowledge/feat-062-page-inspection.json) records44 page findings,image/text hashes and printed folios. Local research inputs remain at `/tmp/feat062`,not in Git/runtime.
- Dispositions: The [passage register](../docs/reviews/knowledge/source-inventory.md#feat-062-nhlpbc-he-tu-ha-passage-register) owns chapter/section/layer/notice mappings; [book sources](../docs/references/book-sources.md#feat-062-he-tu-ha-source-comparison) owns source differences. All24 chapter parents have released owners;370 child dispositions route author062 → audit092. NHL chapters1–12 remain present. PBC missing3/4/9,referral-only5,selected/reduced1/2/6/8/10/12 and all extant7/11 are separately accounted,with no text borrowed from NHL or NTT.
- Release:24 articles add370 claims/citations,including a bounded inspected figure of NHL367's printed Giải symbol beside Dự prose. Eleven NHL Kinh quotations and eleven PBC referral positions have separate dispositions. Integrated corpus:371 records,9237 claims,9483 citations; registry revision56,4351 groups and17 unchanged exclusions. No schema,API,UI,calendar,core or source-rights change.
- Focused verification: `vitest run tests/book-nhl-pbc-he-tu-ha.test.ts --maxWorkers=1 --no-file-parallelism` passes376 cases in1.74s (67ms tests). The fixture covers exact source roster,all44 pages,all24 parents,edition-specific omissions,quotations/referrals,named attribution,source uncertainties,public projections and closed audit gates.
- Full verification: Baseline and final `./init.sh` pass; final181 core +5846 knowledge tests (48 knowledge files),141.89s knowledge suite. Format,ESLint/length,typecheck,build and package-export/type-consumer checks pass. Logs: `/tmp/feat062-baseline.log`, `/tmp/feat062-init-final.log`, `/tmp/feat062-focused-final.log`, `/tmp/feat062-exports1.log`.
- Freshness/evidence: `validate:corpus --check-books --check`, `pnpm format:check`, `git diff --check`,199 local documentation routes and final package/preservation/offline checks pass. Local logs include `/tmp/feat062-fingerprints-final.log`, `/tmp/feat062-format-final.log`, `/tmp/feat062-doc-routes.log`. Snapshot identity is `liuyao-knowledge-snapshot-v1:sha256:02c9d395017d45b11695daf9bf78121db611a08180f26631a740029c55c78557`; no audit/certification approval is implied. The final evidence checkpoint changes this feature record only.
- Initial integration failure: Eight existing tests retained the old global census. Only exact released-record/claim/citation and expected-group literals were updated; every assertion,selector and timeout remains. Rerun passes; no broad selector needed narrowing.
- Preservation: `/tmp/feat062/preservation-result.json` verifies all347 previous released records and9113 citations byte-for-byte,their public projections,source catalog,all non062 registry groups,layers/hexagrams/specials/exclusions and parent-owned `feature_index.json`/`progress.md` unchanged. New24 public records/370 citations equal authored JSON; released sources omit local paths.
- Offline: `/tmp/feat062/offline-result.json` verifies `assets/index-aYqjG5EM.js` at12,364,549 bytes fits the unchanged12MiB cap (12,582,912) by218,363 bytes. All18 precache entries/13 unique URLs remain,including the main asset,manifest,fonts and icons. No PWA setting change is needed.
- Open gates: Batch source comparison is publication evidence,not audit092,independent verification or corpus certification. Global source/layer obligations and source rights stay unresolved; PBC's referred Kinh attachments are not newly certified. Predictions,punishment rhetoric,medicine metaphors and tri-ngôn remain historical attributions,not modern advice,efficacy or personality judgments.

## Handoff

- State: done; merged to `main` in PR #90 at `f08dd82241cf505c3e00c9b69497ea8d63ccadb0`, from reviewed head `2d65e1e28aadb1ceb98c5326b5c740e1f7e95242`.
- Evidence: Fresh exact-head independent review returned `OK with notes`, no findings. The review verified all44 individual page-image/text inspection records, edition-specific boundaries and omissions, preservation, and closed audit gates. Verify run `37562090969`/job `112601424630`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed6,027 tests (5,846 knowledge,181 core); corpus/books, exports, focused tests, preservation and199 documentation-route/offline checks passed.
- Coverage:24 articles add370 claims/citations and370 child dispositions for all12 NHL/PBC chapter pairs. NHL chapters1–12 remain present even where NHL says PBC omitted a chapter. PBC's `lược trích`, missing sections and referrals remain specific to that edition; no text was reconstructed or borrowed from NHL/NTT. Total release is371 records,9,237 claims,9,483 citations; prior347 records/9,113 citations remain byte-identical.
- PWA: Integrated JS is12,364,549 bytes under the unchanged12 MiB cap by218,363 bytes; all18 precache entries remain.
- Open gates: Source audit092, global review, independent corpus verification/certification and source rights remain unresolved/closed. Referred Kinh attachments are not newly certified; no modern advice or predictive efficacy is claimed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Continue with selected feat-063 from updated `main`.
