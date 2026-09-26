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
- [x] Workspace typecheck passes without built package dist; built ESM and declaration exports pass package smoke checks.
- [x] Local app CJK text, including UI glyph 六, is covered by both bundled CJK fonts and an automated cmap check.
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

- State: done locally; PR #17 contains the review follow-up on `feat/017-preflow-hardening`, remains open against main, and is not merged.
- Evidence: After removing both ignored package `dist/` directories, `pnpm typecheck` passed. `./init.sh` then passed with typecheck before build, package runtime/declaration smoke checks, test placement, 155 core tests in 13 files, and 41 knowledge tests in 7 files. FontTools 4.66.0 and Brotli 1.2.0 verified exact cmap coverage of all 96 manifest codepoints in both CJK app fonts. Formatting and TypeScript length checks passed; lint reported one pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`.
- Blockers: Fresh review and approval of the updated PR head are pending; do not merge before that review.
- Next: Wait for fresh review of PR #17 and address any new findings.
