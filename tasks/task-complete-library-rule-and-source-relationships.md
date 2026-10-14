# task-complete-library-rule-and-source-relationships - Complete Library rule and source relationships

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-knowledge-browser](task-knowledge-browser.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

- [x] Canonical V1 F08-T10 specification explicitly resolves term/entity-to-rule relationships.
- [x] If supported, applicable rule IDs are modeled and rendered.
- [x] Reference validation accepts hexagrams, trigrams, terms, and rules while rejecting broken targets.
- [x] Regression coverage proves hexagram/trigram references are accepted and retrievable.
- [x] `./init.sh` passes.

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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done
- Evidence: User confirmed V1 term/entity-to-rule links; F08-T10 and the knowledge-browser spec now state the relationship contract. Optional `applicableRuleIds` on terms and entities are checked against existing rules and rendered as internal Library links, separate from sources. Reference validation and tests cover all schema-supported target types and reject missing targets; catalog examples for `hexagram-01` and `trigram-heaven` are retrievable. `./init.sh` passed on 2026-09-28 (one existing lint warning). Browser interaction was not tested.
- Dependency check: task-knowledge-browser is done.
- Next: Integrate PR and confirm issue #30 closed after merge.
