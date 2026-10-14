# task-make-library-id-search-exact-and-show-complete-relationships - Make Library ID search exact and show complete relationships

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-knowledge-browser](task-knowledge-browser.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Make stable-ID search predictable and prevent related-hexagram results from disappearing without explanation.

## Scope

- Resolve full stable-ID queries exactly as documented.
- Define partial technical-ID behavior explicitly; preserve Vietnamese prose and alias search.
- Show all related hexagrams or disclose truncation with a total/count or “view all” affordance.
- Add search regression tests.

## Non-goals

- Change Vietnamese prose or alias search behavior.

## Acceptance

- [x] Full stable ID queries resolve exactly as documented.
- [x] Partial technical IDs return no ID match, or the spec explicitly supports partial matching.
- [x] Tests cover exact and partial ID behavior.
- [x] Trigram detail shows all related hexagrams or clearly indicates total and access to the rest.
- [x] `./init.sh` passes.

## Relevant docs

- [GitHub issue #33](https://github.com/tungxuan1656/liuyao/issues/33) — canonical acceptance source
- `docs/product-specs/knowledge-browser.md`

## Plan

1. Resolve and implement stable-ID matching behavior with regression tests.
2. Remove silent related-hexagram truncation or disclose the complete result count and access path.

## Verify

- `./init.sh`

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done
- Evidence: Full normalized stable IDs now match exactly, while partial technical IDs no longer match by ID; package regression tests cover `hexagram-0`, `rule-na`, term/trigram fragments and full IDs without changing Vietnamese prose/alias matching. Trigram detail renders all related hexagrams and their count. `./init.sh` passed on 2026-09-28 (one existing lint warning), and the 12-test release suite passed before the final regression-test-only edit; responsive browser behavior was not visually inspected.
- Dependency check: task-knowledge-browser is done.
- Next: Integrate PR and confirm issue #33 closed after merge.
