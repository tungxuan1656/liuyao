# feat-105 — Consolidate Docs/Knowledge ownership and harden agent quality gates

> Implemented after Product Owner authorization ([Issue #128](https://github.com/tungxuan1656/liuyao/issues/128)); execution followed the [external implementation plan](../docs/plans/feat-105.md). Planning gate: the plan PR contained only this file, the plan and `feature_index.json`.

## Goal

Perform one bounded cleanup of Docs and Knowledge ownership, legacy artifacts and exposed content organization; lock source-fidelity and anti-over-engineering rules into the agent workflow so feat-084–093 can proceed without repeating a full-corpus refactor or audit.

## Scope

**Intended implementation after approval:**

- Establish a verified, consumer-aware owner map for `docs/`, `packages/knowledge/`, `apps/web/`, `packages/liuyao-core/`, `features/`, generated assets and ignored research PDFs.
- Separate current canonical contracts from historical plans/reviews and safely retire unconsumed legacy reports.
- Review how source-cover/index/provenance notes, ready articles, source tables/figures and duplicated prose are stored and displayed; fix proven misplacement or repetition while preserving historical observations, IDs and direct links.
- Update only existing canonical product/design guidance and the shared agent route; align feat-084–093 with a bounded, independent review-and-handoff workflow.
- Introduce only narrowly justified automated invariants and protect compatibility, references, payload, offline delivery and deterministic domain results.

## Non-goals

- Starting or completing feat-084–093 in this feature.
- Creating an audit/certification framework, per-claim ledger, semantic hash graph, coverage score, approval registry or a second full-corpus JSON.
- Massive file moves/record splits, rewriting all 381 records, fixed prose/JSON size quotas, synthetic interpretation or calendar/forecast logic.
- A new database, API architecture, source-PDF redistribution, broad UI redesign, or changes to `liuyao-core` calculation semantics.
- Rewriting append-only progress or completed historical feature/plan records.

## Acceptance

- [x] Baseline and consumer inventory identifies all relevant docs, records, IDs, references, routes, legacy reports, source catalogs, compatibility exports, figure assets and generated/offline outputs; decisions are grounded in actual uses.
- [x] Canonical owner map and historical routing are unambiguous in `docs/index.md`, relevant owning documents and `AGENTS.md`, without duplicating durable policies across files.
- [x] Retired `packages/knowledge/reports/authoring-crosswalk.json` and `coverage.json` are retained, moved or removed only following an explicit consumer check; no replacement audit machinery is introduced.
- [x] Source metadata, bibliographic notes and learner-facing articles are correctly distinguished; any changes retain source provenance, material discrepancies, links, stable IDs or compatibility redirects.
- [x] Any de-duplication of 64 BPCT board figures / 384 line labels (and other selected examples) preserves supported source exceptions, meaning, order and PDF references; large files are not split merely for length.
- [x] `sources.json`, `bibliography.json`, JSON records, TS compatibility shims, design ruleset and deterministic core each retain one explicit non-overlapping responsibility.
- [x] `knowledge-quality.md` owns an enforceable but lightweight agent review gate: exact source/passages for changed assertions, scoped independent review, explicit blockers, final-head re-verification, no per-sentence decision log.
- [x] Feat-084–093 instructions and acceptance align with this gate and forbid scope expansion and automatic refactoring; their scholarly coverage obligations remain intact.
- [x] Focused deterministic tests/CI detect applicable structural, navigation and reference regressions; local PDF-fingerprint check remains local and is not falsely presented as CI-semantic validation.
- [x] `./init.sh`, relevant package tests and corpus checks pass; targeted app routes, UI accessibility, direct/deep links, PWA cache/offline flows and before/after asset measurements are recorded where changed.
- [x] Findings describe what was verified, what remains uncertain, and the smallest correction. No source-supported information or domain calculation behavior is silently removed or altered.
- [x] Final-revision verification evidence and handoff are written; update `feature_index.json` and `progress.md` only during the approved execution lifecycle.

## Relevant docs

[Repository navigation](../docs/index.md), [architecture](../ARCHITECTURE.md),
[content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[ruleset](../docs/design-docs/liuyao-ruleset-v1.md), [browser](../docs/product-specs/knowledge-browser.md),
[delivery](../docs/design-docs/offline-pwa.md), [licensing](../LICENSING.md),
[verification](../docs/development.md), [roadmap](knowledge-roadmap.md).

## Plan

[Detailed staged execution, file ownership, verification and rollback](../docs/plans/feat-105.md).
Perform an inventory/decision pass before editing content. Use bounded commits and an independent reviewer on materially changed knowledge.
Do not implement until the owner approves this issue/plan.

## Verification

- `./init.sh` passes on the final revision (format, lint + length, typecheck, build, package exports, tests).
- `pnpm --filter @liuyao/knowledge test` — 12 files, **105 tests** pass (103 before this feature).
- `node scripts/validate-corpus.mjs` reports 381 records / 381 ready / 4 supplied books with structural links and source pages valid; `--check` is run after a build, and `--check-books --check` stays a local check against the ignored PDFs in `docs/books/`.
- Payload, measured on a clean build of the base revision `9b5ea2b` and of this revision (raw / gzip, `gzip -9`): initial app JS `831,070 / 231,163` → `831,160 / 231,190`; metadata index `166,419 / 33,898` → `166,494 / 33,915`; largest ready record `article-ntt-chu-xi-diagrams.json` `127,302 / 17,350` in both; full PWA precache (396 files) `5,730,123 / 1,712,490` → `5,601,009 / 1,708,354` (−129,114 raw, −2.25 %; −4,136 gzip); all 381 record assets `4,077,307 / 882,528` → `3,947,833 / 878,323` (−129,474 raw). The index stays flat because `listed` is emitted only on the five hidden records, and the metadata index is inlined into the app bundle.
- Browser checks on the built app (`vite preview`): the Thư viện → Bài viết list renders 200 articles and none of the five bibliographic records; the direct link `/library/article/article-ntt-cover` renders "NTT — Bìa" with its Ngô Tất Tố attribution; an unknown ID renders the "Không tìm thấy mục" state instead of failing; the same deep link still renders after the preview server is stopped, so the service-worker cache serves it offline.
- Independent review of the changed knowledge data: an independent read-only pass re-derived the deletion comparison itself (exactly one entry deleted per file, `git diff` = 2,304 deletions / 0 insertions, 372/372 deleted references present verbatim among figure-label references, no deleted entry had an `id`, and no non-`entries` key differs) and separately confirmed 8 figures × 6 labels per file (64 figures / 384 labels) with all 14 distinct BPCT `sectionId` targets still resolving.
- A first reviewer attempt could not run Git commands and reported only the current working-tree invariants as verified, so the pre-change comparison was re-run and re-verified independently before this handoff. That review then raised two findings, both closed here: the gate now requires a reviewer independent of the writer, and the missing before/after bundle, index, largest-record and precache measurements are recorded above.

## Handoff

- **State:** done locally; changes are committed on `main`, and the feature is `done` in `feature_index.json`.
- **Evidence:**
  - Owner decisions: retire the two `packages/knowledge/reports/` files from the active tree with a recovery path in [`docs/reviews/knowledge/README.md`](../docs/reviews/knowledge/README.md); keep the five bibliographic records published under a new `listed: false` flag instead of deleting or recasting them; remove only the eight reference-lossless BPCT restatement entries.
  - Consumer check before removal: no script, test, CI job or document loads `authoring-crosswalk.json` or `coverage.json` or any of the five bibliographic record IDs; every remaining reference was historical prose in feature, plan or progress records.
  - Reference-loss check for the BPCT pilot: each removed entry restated one figure label and carried 42–48 references, all of which already exist verbatim among that file's figure-label references; the eight files still hold 64 figures and 384 labels, guarded by a new corpus test.
  - Ownership: [`docs/index.md`](../docs/index.md) now routes historical and local material, and the listing flag plus bibliographic-notes boundary are stated in [`knowledge-model.md`](../docs/design-docs/knowledge-model.md), [`knowledge-browser.md`](../docs/product-specs/knowledge-browser.md) and [`knowledge-content.md`](../docs/product-specs/knowledge-content.md).
  - Agent gate: [`knowledge-quality.md`](../docs/product-specs/knowledge-quality.md#agent-execution-gate) owns the bounded writer/reviewer gate, including a reviewer independent of the writer for materially changed assertions, and feat-084–093 now point at it while keeping their chapter/table/figure coverage duties.
  - Limits: the BPCT removal was proven reference-lossless by mechanical comparison, not by re-reading the source images for the eight entries; no other record was re-checked against the books, and no source passage was added or reworded. Payload numbers come from local `vite build` output and `gzip -9`; the precache figure sums files matched by the existing Workbox `globPatterns`, not a workbox-precache replay.
- **Blockers:** none.
- **Next:** Start feat-084 from the aligned gate; no further cleanup of `docs/` or `packages/knowledge/` is planned for this feature.
