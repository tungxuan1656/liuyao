# feat-027 — Make Library ID search exact and show complete relationships

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

- [ ] Full stable ID queries resolve exactly as documented.
- [ ] Partial technical IDs return no ID match, or the spec explicitly supports partial matching.
- [ ] Tests cover exact and partial ID behavior.
- [ ] Trigram detail shows all related hexagrams or clearly indicates total and access to the rest.
- [ ] `./init.sh` passes.

## Relevant docs

- [GitHub issue #33](https://github.com/tungxuan1656/liuyao/issues/33) — canonical acceptance source
- `docs/product-specs/knowledge-browser.md`

## Plan

1. Resolve and implement stable-ID matching behavior with regression tests.
2. Remove silent related-hexagram truncation or disclose the complete result count and access path.

## Verify

- `./init.sh`

## Handoff

- State: todo
- Evidence: Issue #33 confirmed; implementation not started.
- Dependency check: feat-009 is done.
- Next: Verify dependencies, then select the feature for implementation.
