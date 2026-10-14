# task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates - Consolidate Docs/Knowledge ownership and harden agent quality gates

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-simplify-knowledge-and-rebuild-que-01-04](task-simplify-knowledge-and-rebuild-que-01-04.md), [task-verify-audit-invalidation-and-future-correction-workflow](task-verify-audit-invalidation-and-future-correction-workflow.md), [task-complete-extended-knowledge-records-and-provenance-contracts](task-complete-extended-knowledge-records-and-provenance-contracts.md), [task-migrate-linting-and-formatting-to-biome](task-migrate-linting-and-formatting-to-biome.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Historical context

> Implemented after Product Owner authorization ([Issue #128](https://github.com/tungxuan1656/liuyao/issues/128)); execution followed the [external implementation plan](../docs/plans/task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md). Planning gate: the plan PR contained only this file, the plan and `tasks/index.md`.

## Goal

Perform one bounded cleanup of Docs and Knowledge ownership, legacy artifacts and exposed content organization; lock source-fidelity and anti-over-engineering rules into the agent workflow so tasks 084–093 can proceed without repeating a full-corpus refactor or audit.

## Scope

**Intended implementation after approval:**

- Establish a verified, consumer-aware owner map for `docs/`, `packages/knowledge/`, `apps/web/`, `packages/liuyao-core/`, `tasks/`, generated assets and ignored research PDFs.
- Separate current canonical contracts from historical plans/reviews and safely retire unconsumed legacy reports.
- Review how source-cover/index/provenance notes, ready articles, source tables/figures and duplicated prose are stored and displayed; fix proven misplacement or repetition while preserving historical observations, IDs and direct links.
- Update only existing canonical product/design guidance and the shared agent route; align tasks 084–093 with a bounded, independent review-and-handoff workflow.
- Introduce only narrowly justified automated invariants and protect compatibility, references, payload, offline delivery and deterministic domain results.

## Non-goals

- Starting or completing tasks 084–093 in this feature.
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
- [x] Tasks 084–093 instructions and acceptance align with this gate and forbid scope expansion and automatic refactoring; their scholarly coverage obligations remain intact.
- [x] Focused deterministic tests/CI detect applicable structural, navigation and reference regressions; local PDF-fingerprint check remains local and is not falsely presented as CI-semantic validation.
- [x] `./init.sh`, relevant package tests and corpus checks pass; targeted app routes, UI accessibility, direct/deep links, PWA cache/offline flows and before/after asset measurements are recorded where changed.
- [x] Findings describe what was verified, what remains uncertain, and the smallest correction. No source-supported information or domain calculation behavior is silently removed or altered.
- [x] Final-revision verification evidence and handoff are written; update only this task record during the approved execution lifecycle.

## Relevant docs

[Repository navigation](../docs/index.md), [architecture](../ARCHITECTURE.md),
[content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[ruleset](../docs/design-docs/liuyao-ruleset-v1.md), [browser](../docs/product-specs/knowledge-browser.md),
[delivery](../docs/design-docs/offline-pwa.md), [licensing](../LICENSING.md),
[verification](../docs/development.md), [roadmap](knowledge-roadmap.md).

## Plan

[Detailed staged execution, file ownership, verification and rollback](../docs/plans/task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md).
Perform an inventory/decision pass before editing content. Use bounded commits and an independent reviewer on materially changed knowledge.
Do not implement until the owner approves this issue/plan.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- **State:** done; committed as `82e5c5a` and pushed on `feat/105-docs-knowledge-consolidation` for [PR #130](https://github.com/tungxuan1656/liuyao/pull/130) (CI green), with the feature `done` in `tasks/index.md`.
- **Evidence:**
  - Owner decisions: retire the two `packages/knowledge/reports/` files from the active tree with a recovery path in [`docs/reviews/knowledge/README.md`](../docs/reviews/knowledge/README.md); keep the five bibliographic records published under a new `listed: false` flag instead of deleting or recasting them; remove only the eight reference-lossless BPCT restatement entries.
  - Consumer check before removal: no script, test, CI job or document loads `authoring-crosswalk.json` or `coverage.json` or any of the five bibliographic record IDs; every remaining reference was historical prose in feature, plan or progress records.
  - Reference-loss check for the BPCT pilot: each removed entry restated one figure label and carried 42–48 references, all of which already exist verbatim among that file's figure-label references; the eight files still hold 64 figures and 384 labels, guarded by a new corpus test.
  - Ownership: [`docs/index.md`](../docs/index.md) now routes historical and local material, and both entry points link it (`AGENTS.md` → “Documentation map”, `ARCHITECTURE.md` → “Related docs”), so retired plans and reviews are not read as current contracts. The listing flag plus bibliographic-notes boundary are stated in [`knowledge-model.md`](../docs/design-docs/knowledge-model.md), [`knowledge-browser.md`](../docs/product-specs/knowledge-browser.md) and [`knowledge-content.md`](../docs/product-specs/knowledge-content.md).
  - Ownership split verified, not changed: [`data/README.md`](../packages/knowledge/data/README.md) already assigns one responsibility per layer — `sources.json` (the four supplied editions and their local PDF fingerprints), `bibliography.json` (lookup compatibility), the authored JSON records, the `data/*.ts` compatibility shims, the ruleset design doc and `@liuyao/core`. The inventory found no overlap, so nothing was merged, moved or recast, and no shim consumer was disturbed.
  - Figure asset assessed and kept: `docs/design-docs/batquai.avif` stays where it is because `apps/web/scripts/generate-assets.mjs` reads that exact path, [`development.md`](../docs/development.md) documents the temporary public-directory copy, and [`product-identity.md`](../docs/product-specs/product-identity.md) records the approval and the usage-rights statement. Moving it would edit those three files for no ownership gain.
  - Agent gate: [`knowledge-quality.md`](../docs/product-specs/knowledge-quality.md#agent-execution-gate) owns the bounded writer/reviewer gate, including a reviewer independent of the writer for materially changed assertions, and tasks 084–093 now point at it while keeping their chapter/table/figure coverage duties.
  - Source-read fixture: board 49 (`Bát Thuần KHÔN`) and board 51 (`Đia Trạch LÂM`) label rows were read from BPCT PDF 62 / printed page 51 and match the records, so the guard pins them; a silent label or board-order edit now fails the suite instead of passing a structural check.
  - Reviewer evidence: the PR #130 review inspected the diff, compared the authored JSON before and after for all eight BPCT records, checked BPCT printed pages 49 and 51 samples against the labels and Thế/Ứng positions, and relied on the CI run at the reviewed revision. Its four findings are closed above with the revision that carries the repairs.
  - Limits: the BPCT removal was proven reference-lossless by mechanical comparison, not by re-reading the source images for the eight entries; two boards are pinned to the page, not all 64. No other record was re-checked against the books, and no source passage was added or reworded. Payload numbers come from local `vite build` output and `gzip -9`; the precache figure sums files matched by the existing Workbox `globPatterns`, not a workbox-precache replay.
- **Blockers:** none.
- **Next:** Start task-review-and-improve-sources-shared-foundations-casting-and-liu-yao-tables from the aligned gate; no further cleanup of `docs/` or `packages/knowledge/` is planned for this feature.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-10 — task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates PR review follow-up completed

**State**: task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates `done`; the four PR #130 review findings are closed inside the same feature scope.
**Done**: Rewrote the agent execution gate so a review returns a supported defect with its smallest repair, a recorded source gap or uncertainty, or a block on the affected claim only — a missing, illegible or disputed passage no longer holds back a batch or demands an invented repair — and so a project convention records a specification path and section instead of a book page. Restricted `listed` to articles: `validateCorpus` rejects the flag on any other record type, closing the divergence between `listContent` and the compatibility catalog, and the schema plus `knowledge-model.md` state the limit. Extended the BPCT guard to require all 64 board numbers once each, ascending figure order per palace, labels in Hào 6 → Hào 1 order, and two boards pinned to values read from the supplied page. Added the reviewer-evidence requirement to `AGENTS.md`'s feature-done checklist, `.github/PULL_REQUEST_TEMPLATE.md` and gate rule 8.
**Evidence**: `pnpm --filter @liuyao/knowledge test` reports 12 files / 107 tests (105 before), including the new non-article `listed` rejection and the two source-pinned boards; `./init.sh` passes every phase on the revision that carries them with a clean tree, and CI is green on the pushed revision. Board 49 (`Bát Thuần KHÔN`) and board 51 (`Đia Trạch LÂM`) rows were re-read from BPCT PDF 62 / printed page 51 rather than derived from the record.
**Blockers**: none. Two boards are pinned to the source page instead of all 64; the remaining labels are protected by structure and order invariants only.
**Next**: Owner re-reviews PR #130.

#### 2026-10-10 — task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates ownership consolidation and agent gate

**State**: task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates `done`; planned scope executed under Product Owner authorization ([Issue #128](https://github.com/tungxuan1656/liuyao/issues/128)).
**Done**: Retired `packages/knowledge/reports/authoring-crosswalk.json` and `coverage.json` from the active tree after a consumer check found no reader, recording both recovery commands in `docs/reviews/knowledge/README.md`; added `docs/index.md` routing for historical and local material and linked it from `AGENTS.md` and `ARCHITECTURE.md`, keeping the supplied logo asset and the `sources.json`/`bibliography.json`/shim ownership split unchanged after review. Added an optional `listed` flag to the record schema, projection and `listContent`, set it false on the five bibliographic records (`article-ntt-cover`, `article-ntt-title`, `article-ntt-intro-index`, `article-pbc-contents`, `article-nhl-front-end-accounting`) so they stay published for provenance and direct links but leave the learner article list, and removed the eight reference-lossless BPCT board restatement entries. Wrote the `## Agent execution gate` into `docs/product-specs/knowledge-quality.md`, aligned tasks 084–093 with it, and updated the depending product and design documents.
**Evidence**: `./init.sh` passes every phase on the final revision; `pnpm --filter @liuyao/knowledge test` reports 12 files / 105 tests (103 before), including a new unlisted-record lookup test and a BPCT 8-figures × 6-labels guard; `validate-corpus --check` reports 381 records / 381 ready / 4 supplied books. Built-app browser checks confirmed the article list shows 200 entries without the five bibliographic records, `/library/article/article-ntt-cover` still resolves by direct link with its source attribution, an unknown ID shows the not-found state, and the deep link still renders with the preview server stopped. An independent read-only re-verification reproduced the BPCT comparison from `HEAD` (one deletion per file, 2,304 deletions / 0 insertions, 372/372 references preserved verbatim in figure labels, no deleted entry carried an `id`) and confirmed 64 figures with 384 labels. Payload measured against a clean build of base `9b5ea2b` (raw / gzip -9): initial app JS 831,070 / 231,163 → 831,160 / 231,190; metadata index 166,419 / 33,898 → 166,494 / 33,915; largest ready record unchanged at 127,302 / 17,350; full PWA precache 5,730,123 / 1,712,490 → 5,601,009 / 1,708,354 (−129,114 raw, −2.25 %); all 381 record assets 4,077,307 → 3,947,833 raw.
**Blockers**: none. The BPCT removal was verified reference-lossless by mechanical comparison rather than by re-reading the source images; payload figures come from local builds and `gzip -9`, with the precache summed over the existing Workbox `globPatterns`, not a workbox-precache replay. An independent review's two findings (require a reviewer independent of the writer; supply the full before/after payload comparison) are closed in this revision.
**Next**: Start task-review-and-improve-sources-shared-foundations-casting-and-liu-yao-tables under the new gate; no further `docs/` or `packages/knowledge/` cleanup is planned for this feature.
