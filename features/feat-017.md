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

- [x] Core inventory mutation cannot change hexagram calculation.
- [x] Casting results and nested raw toss data are immutable at runtime.
- [x] Every knowledge entity has an explanation and every rule has a category.
- [x] Production fact definitions map all result fields to rules; every mapped rule has a source reference.
- [x] Knowledge tests detect core ID or 64-hexagram grid drift without a runtime package dependency.
- [x] Workspace package exports resolve built ESM and declaration files; a Node smoke check passes.
- [x] Local CJK knowledge text is covered by both bundled CJK fonts.
- [x] ./init.sh passes.

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

- State: done locally; PR creation and review pending.
- Evidence: Final ./init.sh passed with 155 core tests in 13 files and 41 knowledge tests in 7 files; typecheck, builds, package-export smoke check, test-placement check, format, and TypeScript length checks passed. Lint reported one pre-existing Fast Refresh warning at apps/web/src/components/ui/button.tsx:49. Both CJK font cmaps cover all 92 manifest codepoints. Mutation regressions reproduced the incorrect hexagram and mutable cast snapshot before their fixes.
- Blockers: PR creation and fresh review are pending; this branch has not been merged.
- Next: Push feat/017-preflow-hardening and open a PR targeting main.
