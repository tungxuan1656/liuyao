# feat-022 — Correct changed-result facts and Library links

## Goal

Attribute displayed result facts accurately and link applicable rule explanations to the Library.

## Scope

- Remove misleading primary-result fact IDs from changed trigram controls.
- Either add explicit changed-result fact IDs or render identity without an inspector.
- Add an internal Library link for applicable rules while retaining separate source links.
- Test any new fact mappings.

## Non-goals

- Merge facts, rules, and sources into one concept.

## Acceptance

- [ ] Changed upper/lower trigram controls do not reuse primary-result fact IDs.
- [ ] Changed trigram identity uses explicit changed facts or has no fact inspector.
- [ ] Applicable rule inspectors link internally to the Library.
- [ ] Source-reference links remain distinct; fact, rule, and source remain distinct.
- [ ] New fact mappings have tests.
- [ ] `./init.sh` passes.

## Relevant docs

- [GitHub issue #28](https://github.com/tungxuan1656/liuyao/issues/28) — canonical acceptance source
- `docs/product-specs/reading-result.md`
- `docs/product-specs/ui-layout.md`

## Plan

1. Align changed-trigram controls with their actual fact attribution.
2. Add Library navigation for applicable rule explanations and test mappings.

## Verify

- `./init.sh`

## Handoff

- State: todo
- Evidence: Issue #28 confirmed; implementation not started.
- Dependency check: feat-008 is done; feat-019 remains todo.
- Next: Verify dependencies, then select the feature for implementation.
