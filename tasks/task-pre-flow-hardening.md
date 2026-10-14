# task-pre-flow-hardening - Pre-flow hardening

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-web-ui-foundation](task-web-ui-foundation.md), [task-domain-contracts](task-domain-contracts.md), [task-hexagram-calculation](task-hexagram-calculation.md), [task-liu-yao-board](task-liu-yao-board.md), [task-casting-core](task-casting-core.md), [task-knowledge](task-knowledge.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Make the core, casting, knowledge, package, and font contracts safe before reading flow or result view work starts.

## Scope

- Fix the seven hardening findings from the review of task-web-ui-foundation through task-knowledge.
- Keep task-reading-flow and task-result-view blocked on this feature.

## Non-goals

- Change Liu Yao calculation tables or interpretations.
- Start task-reading-flow or task-result-view.
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
- docs/plans/task-pre-flow-hardening.md

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done locally; PR #17 contains the review follow-up on `feat/017-preflow-hardening`, remains open against main, and is not merged.
- Evidence: After removing both ignored package `dist/` directories, `pnpm typecheck` passed. `./init.sh` then passed with typecheck before build, package runtime/declaration smoke checks, test placement, 155 core tests in 13 files, and 41 knowledge tests in 7 files. FontTools 4.66.0 and Brotli 1.2.0 verified exact cmap coverage of all 96 manifest codepoints in both CJK app fonts. Formatting and TypeScript length checks passed; lint reported one pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`.
- Blockers: Fresh review and approval of the updated PR head are pending; do not merge before that review.
- Next: Wait for fresh review of PR #17 and address any new findings.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-26 — task-pre-flow-hardening pre-flow hardening

**State**: done locally; PR creation and fresh review pending.
**Done**: Hardened core ID inventories and casting snapshots, completed the knowledge entity/rule/source model, added production fact-to-rule lookup and core drift tests, switched package defaults to built Node ESM, and expanded local CJK font coverage. Added task-pre-flow-hardening as a dependency of task-reading-flow and task-result-view; both remain todo.
**Evidence**: Final `./init.sh` passed with 155 core tests in 13 files and 41 knowledge tests in 7 files. Build, typecheck, Node package-export smoke check, test placement, formatting, and TypeScript length checks passed. The only lint output was one pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`. FontTools 4.66.0/Brotli 1.2.0 verified 92/92 manifest codepoints in each CJK font. Mutation regressions reproduced the bad hexagram mapping and mutable casting snapshot before the fixes.
**Blockers**: PR creation and fresh review are pending; this branch has not been merged.
**Next**: Push `feat/017-preflow-hardening` and open a PR targeting `main`.

#### 2026-09-26 — task-pre-flow-hardening PR #17 review follow-up

**State**: done locally; PR #17 is updated on `feat/017-preflow-hardening`, open against `main`, and awaiting fresh review.
**Done**: Fixed clean-checkout TypeScript resolution while keeping runtime exports on built ESM; added declaration export smoke coverage; restored app UI glyph 六 to generated CJK coverage and renamed the subsets; added an automated WOFF2 cmap check to CI; corrected Zengshan Buyi attribution with Chinese Text Project provenance.
**Evidence**: With both package `dist/` directories removed, `pnpm typecheck` passed and `./init.sh` passed typecheck before build, package runtime/declaration checks, test placement, all 155 core tests and 41 knowledge tests. FontTools 4.66.0 and Brotli 1.2.0 confirmed exact 96-codepoint cmap coverage in both bundled CJK app fonts. Lint reported the pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`.
**Blockers**: Fresh review and approval are pending; PR #17 has not been merged.
**Next**: Wait for fresh review of the updated PR head and address any new findings.
