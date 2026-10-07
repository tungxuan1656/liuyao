# feat-064 — Resolve the six remaining legacy project definitions

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- Legacy term-ruleset, term-primary-hexagram, term-changed-hexagram, term-line-value.
- Legacy rule-reading-result-fields and rule-line-polarity-values.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Each of the four terms and two rules, with a stable replacement route.
- [ ] Separate book-supported meaning from accepted software conventions.
- [ ] Use the project contract for software fields; do not invent book citations.
- [ ] Persist convention evidence and reviewed specification revisions through the implemented feat-101 contract.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

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

## Decision log

### 2026-10-07 — Use V1 project contracts for legacy software definitions

- Question: How should the six legacy definitions be replaced without implying that a book establishes software fields or conventions?
- Decision: Preserve the six stable IDs in V2 `term` and `rule` records. Mark their claims as `project-convention` with empty book citation lists; use project evidence and register only the accepted contract sections in `manifest.projectContracts`.
- Alternatives: Keep the entries in the unaudited legacy catalog, assign new IDs, or attach book citations. Rejected: legacy entries do not satisfy V2 review requirements; new IDs would break existing references; no supplied passage is evidence for these software contracts.
- Evidence: `docs/design-docs/domain-model.md` defines the V1 line/input/result contracts; `docs/design-docs/calculation-pipeline.md` defines deterministic and changed-hexagram behavior; `docs/product-specs/reading-flow.md` defines the V1 casting-to-line-value mapping. Use revision `v1` for the relevant sections in each document.
- Effect: No calculation, UI, calendar, or interpretive behavior changes. Book-source auditing and certification remain separate and open.

## Handoff

- State: active on `feat/064-project-contract-legacy-definitions`; base `b5d5dfa`.
- Evidence: Dependencies feat-063 and feat-101 are done; the worktree was clean before activation. Feature selection and project-contract route are recorded above.
- Dependencies: See [feature index](../feature_index.json).
- Next: Implement the six V2 definitions and replace their unaudited legacy catalog entries without changing the existing core conventions.
