# feat-017 — Pre-flow hardening

## Goal

Make the core, casting, knowledge, package, and font contracts safe before reading flow or result view work starts.

## Scope

- Fix the seven hardening findings from the review of feat-001 through feat-006.
- Keep feat-007 and feat-008 blocked on this feature.

## Non-goals

- Change Liu Yao calculation tables or interpretations.
- Start feat-007 or feat-008.
- Publish or merge the pull request.

## Acceptance

- [ ] Core inventory mutation cannot change hexagram calculation.
- [ ] Casting results and nested raw toss data are immutable at runtime.
- [ ] Every knowledge entity has an explanation and every rule has a category.
- [ ] Production fact definitions map all result fields to rules; every mapped rule has a source reference.
- [ ] Knowledge tests detect core ID or 64-hexagram grid drift without a runtime package dependency.
- [ ] Workspace package exports resolve built ESM and declaration files; a Node smoke check passes.
- [ ] Local CJK knowledge text is covered by both bundled CJK fonts.
- [ ] ./init.sh passes.

## Relevant docs

- docs/design-docs/knowledge-model.md
- docs/development.md
- ARCHITECTURE.md
- LICENSING.md
- docs/plans/feat-017.md

## Dependencies

- feat-001
- feat-002
- feat-003
- feat-004
- feat-005
- feat-006

## Handoff

- State: active
- Evidence: Baseline ./init.sh passed with 34 knowledge tests, 153 core tests, and one existing Fast Refresh warning.
- Next: Implement Task 1 in docs/plans/feat-017.md.
