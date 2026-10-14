# task-correct-changed-result-facts-and-library-links - Correct changed-result facts and Library links

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-result-view](task-result-view.md), [task-correct-static-line-changed-annotations](task-correct-static-line-changed-annotations.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

- [x] Changed upper/lower trigram controls do not reuse primary-result fact IDs.
- [x] Changed trigram identity uses explicit changed facts or has no fact inspector.
- [x] Applicable rule inspectors link internally to the Library.
- [x] Source-reference links remain distinct; fact, rule, and source remain distinct.
- [x] New fact mappings have tests (not applicable: no new mappings were added).
- [x] `./init.sh` passes.

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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done
- Evidence: Changed-board trigram identities link directly to their own Library entries instead of selecting primary-result fact IDs. Rule entries link to Library rule details; source references retain separate external links. No fact mappings were added, so mapping tests are not applicable. `./init.sh` passed on 2026-09-28 (one existing lint warning). Browser interaction was not verified; source navigation and typecheck/build were inspected.
- Dependency check: task-result-view and task-correct-static-line-changed-annotations are done.
- Next: Integrate the branch and close issue #28 after confirmed merge.
