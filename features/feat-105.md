# feat-105 — Consolidate Docs/Knowledge ownership and harden agent quality gates

> Planning-only feature; **not approved for implementation**. See [Issue #128](https://github.com/tungxuan1656/liuyao/issues/128) and the [external implementation plan](../docs/plans/feat-105.md). Keep this feature `todo` until the Product Owner expressly authorizes execution.

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

- [ ] Baseline and consumer inventory identifies all relevant docs, records, IDs, references, routes, legacy reports, source catalogs, compatibility exports, figure assets and generated/offline outputs; decisions are grounded in actual uses.
- [ ] Canonical owner map and historical routing are unambiguous in `docs/index.md`, relevant owning documents and `AGENTS.md`, without duplicating durable policies across files.
- [ ] Retired `packages/knowledge/reports/authoring-crosswalk.json` and `coverage.json` are retained, moved or removed only following an explicit consumer check; no replacement audit machinery is introduced.
- [ ] Source metadata, bibliographic notes and learner-facing articles are correctly distinguished; any changes retain source provenance, material discrepancies, links, stable IDs or compatibility redirects.
- [ ] Any de-duplication of 64 BPCT board figures / 384 line labels (and other selected examples) preserves supported source exceptions, meaning, order and PDF references; large files are not split merely for length.
- [ ] `sources.json`, `bibliography.json`, JSON records, TS compatibility shims, design ruleset and deterministic core each retain one explicit non-overlapping responsibility.
- [ ] `knowledge-quality.md` owns an enforceable but lightweight agent review gate: exact source/passages for changed assertions, scoped independent review, explicit blockers, final-head re-verification, no per-sentence decision log.
- [ ] Feat-084–093 instructions and acceptance align with this gate and forbid scope expansion and automatic refactoring; their scholarly coverage obligations remain intact.
- [ ] Focused deterministic tests/CI detect applicable structural, navigation and reference regressions; local PDF-fingerprint check remains local and is not falsely presented as CI-semantic validation.
- [ ] `./init.sh`, relevant package tests and corpus checks pass; targeted app routes, UI accessibility, direct/deep links, PWA cache/offline flows and before/after asset measurements are recorded where changed.
- [ ] Findings describe what was verified, what remains uncertain, and the smallest correction. No source-supported information or domain calculation behavior is silently removed or altered.
- [ ] Final-revision verification evidence and handoff are written; update `feature_index.json` and `progress.md` only during the approved execution lifecycle.

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

## Verify (future implementation)

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check` after build
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` when the four ignored local PDF editions are available
- Source-independent fixtures, link/route regression checks, affected browser/offline checks and payload comparison
- Independent source review of changed explanatory content against the _final_ revision

## Handoff

- **State:** todo — planning only; implementation not authorized.
- **Evidence:** [Issue #128](https://github.com/tungxuan1656/liuyao/issues/128) and linked plan record observed concerns and proposed acceptance; no implementation checks have run for this feature.
- **Blockers:** Explicit Product Owner approval and a fresh implementation baseline.
- **Next:** Review and approve the planned scope; only then activate feat-105 before feat-084–093.
