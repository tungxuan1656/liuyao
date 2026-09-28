# feat-023 — Complete Library rule and source relationships

## Goal

Align Library relationship behavior and source-reference validation with the supported knowledge model.

## Scope

- Decide whether V1 term/entity-to-rule relationships are in scope and update the canonical spec.
- If supported, model applicable rule IDs and render them on detail pages.
- Validate source references for every schema-supported target type, retaining strict broken-reference checks.
- Add coverage for hexagram/trigram source references.

## Non-goals

- Claim source coverage for records without source references.

## Acceptance

- [ ] Canonical V1 F08-T10 specification explicitly resolves term/entity-to-rule relationships.
- [ ] If supported, applicable rule IDs are modeled and rendered.
- [ ] Reference validation accepts hexagrams, trigrams, terms, and rules while rejecting broken targets.
- [ ] Regression coverage proves hexagram/trigram references are accepted and retrievable.
- [ ] `./init.sh` passes.

## Relevant docs

- [GitHub issue #30](https://github.com/tungxuan1656/liuyao/issues/30) — canonical acceptance source
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/knowledge-browser.md`

## Plan

1. Resolve and document the V1 relationship contract.
2. Align model, detail UI, and reference validation with that contract.

## Verify

- `./init.sh`

## Handoff

- State: todo
- Evidence: Issue #30 confirmed; relationship scope remains a proposed decision.
- Dependency check: feat-009 is done.
- Next: Verify dependencies, then select the feature for implementation.
