# feat-104 — Migrate linting and formatting to Biome

## Goal

`biome check` is the only formatter and linter in the repository: no ESLint or Prettier dependency, config, script, hook, or harness phase remains, and the migrated tree passes Biome and the existing verification workflow.

## Scope

- Add `@biomejs/biome` 2.5.15 and `biome.json` from the supplied configuration, with the amendments the repository requires:
  - `css.parser.tailwindDirectives: true`. `apps/web/src/index.css` uses Tailwind v4 syntax (`@import 'tailwindcss'`, `@custom-variant`, `@theme inline`); without this option Biome reports five parse errors and refuses to format the file.
  - Prettier-compatible formatting options — `formatter.lineWidth` 100, `javascript.formatter.semicolons: "always"`, `jsxQuoteStyle: "double"`, `arrowParentheses: "asNeeded"`, and `css.formatter.quoteStyle: "single"` — so the migration reformats as few files as possible.
  - An `apps/web/src/components/ui/**` override that disables the formatter, linter, and assist for generated shadcn components, so those files stay byte-identical to the registry source.
- Remove `eslint`, `prettier`, `@eslint/js`, `eslint-config-prettier`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, and `typescript-eslint`, and delete `eslint.config.js`, `.prettierrc`, `.prettierignore`, and the dead `eslint-disable` comment at `apps/web/src/reading-session.tsx:127`.
- Point every runner at Biome: `package.json` scripts (`lint`, `format`, `format:check`), `.lintstagedrc.cjs`, and the format and lint phases of `init.sh`.
- Reformat the repository with `biome check --write` and fix the remaining lint errors.
- Update the canonical documents that name the current tools: `docs/development.md`, `README.md`, and `docs/design-docs/core-beliefs.md`.

The supplied `apps/*-api/**` override stays verbatim; the workspace has no `apps/*-api` package, so it currently matches nothing.

## Non-goals

- Changing runtime behavior, product UX, domain logic, or knowledge content.
- Replacing `scripts/check_ts_length.sh`, `scripts/check_test_placement.sh`, or the pre-push hooks.
- Formatting Markdown, YAML, or HTML. Biome does not support them, so `docs/**`, `features/**`, `progress.md`, `.github/workflows/*.yml`, and `apps/web/index.html` keep their current content and lose format enforcement.
- Matching Prettier byte-for-byte. Biome breaks union types one member per line with a leading `|` where Prettier packed them, which changes `apps/web/src/result-facts.tsx`, `packages/knowledge/src/content-schema.ts`, `packages/knowledge/src/schema.ts`, `packages/liuyao-core/src/casting.ts`, and `packages/liuyao-core/src/contracts.ts`. No Biome formatter option controls this; `javascript.formatter.expand: "never"` was tested and rejected because it collapsed objects across 34 files.
- Chasing the remaining warnings and info diagnostics (`useTemplate` 69, `noNonNullAssertion` 59, `noDescendingSpecificity` 5, `noConsole` 3, and similar), which do not fail the check.
- Adding editor, IDE, or marketplace integrations.

## Acceptance

- [x] `biome.json` holds the supplied configuration plus the Tailwind CSS parser option, the Prettier-compatible options, and the `apps/web/src/components/ui/**` override.
- [x] `pnpm lint` (`biome check .`) exits 0; remaining diagnostics are warnings or info only.
- [x] `pnpm format:check` (`biome format .`) exits 0.
- [x] No ESLint or Prettier package remains in any `package.json` or in `pnpm-lock.yaml`.
- [x] `package.json` scripts, `.lintstagedrc.cjs`, and the `init.sh` format/lint phases invoke Biome only.
- [x] `./init.sh` passes and `git status --porcelain` is empty afterwards.
- [x] `docs/development.md`, `README.md`, and `docs/design-docs/core-beliefs.md` describe Biome and no longer claim ESLint or Prettier.
- [x] `pnpm typecheck`, `pnpm test`, and `pnpm build` still pass.

Implementation criteria pass. PR merge remains pending.

## Relevant docs

- `docs/development.md`
- `docs/design-docs/core-beliefs.md`
- `AGENTS.md`

## Plan

1. Add `biome.json` and `@biomejs/biome@2.5.15`; remove the ESLint and Prettier packages and configs; repoint the scripts, lint-staged, and `init.sh`. Done.
2. Run `pnpm exec biome check --write .`, then fix the remaining errors. Done: five `useNamingConvention` findings in `apps/web/vite.config.ts` (Vite `define` globals and W3C manifest keys are fixed external names) and nine `noArrayIndexKey` findings — four replaced by derived keys (`href`, `passage.title`, `view.author`, `trigramId`), four suppressed with a reason where the list is genuinely positional or static, and one in `components/ui` that the folder override now excludes. Also fixed three `useIterableCallbackReturn`, one `noUnsafeOptionalChaining`, one `noDuplicateProperties`, and the accessibility findings outside `components/ui`.
3. Update `docs/development.md`, `README.md`, and `docs/design-docs/core-beliefs.md`. Done; older records that mention ESLint and Prettier stay unchanged because they describe their own time.
4. Verify with `pnpm lint`, `pnpm format:check`, `./init.sh`, and the clean-tree check. Done.
5. Update status and append the `progress.md` block. Done.

## Verify

- `pnpm lint`
- `pnpm format:check`
- `./init.sh`
- `test -z "$(git status --porcelain)"`

## Evidence

- Measuring baseline with the supplied configuration before the migration: Biome 2.5.15 `check` read 542 files and reported 251 errors, 78 warnings, and 71 infos. Of those errors, 68 were `assist/source/organizeImports`, which `--write` fixes.
- After `biome check --write` in a scratch copy: 536 files, 35 errors, 66 warnings, 71 infos. Error rules: `noArrayIndexKey` 9, `useAriaPropsSupportedByRole` 3, `useSemanticElements` 3, `useIterableCallbackReturn` 3, `useNamingConvention` 5 (all `apps/web/vite.config.ts:19,20,37,39,40`), `useKeyWithClickEvents` 1, `noLabelWithoutControl` 1, `noSvgWithoutTitle` 1, `noDoubleEquals` 1, `noDuplicateProperties` 1, `noUnsafeOptionalChaining` 1, and 5 `parse` diagnostics in `apps/web/src/index.css` reading "Tailwind-specific syntax is disabled."
- `biome format --write` leaves `.md`, `.yml`, and `.html` files unchanged, which confirms the Markdown and YAML formatting gap recorded under Non-goals.
- Formatting-fidelity measurement: with the final options, five of 536 files differ from the Prettier output; with `jsxQuoteStyle: "single"`, `semicolons: "asNeeded"`, and `lineWidth` 120 as supplied, 149 files were rewritten. The reformat rewrites 73 repository files in total, of which about 60 change only import order (`assist/source/organizeImports`), export-specifier order, or `import * as React` → `import type * as React`; a line-level check confirmed no import name was dropped. The change set is 361 insertions and 996 deletions, most of them the removed ESLint and Prettier packages and `eslint.config.js`.
- Probed separately: `biome-ignore` line and range suppressions do suppress a following diagnostic and require a reason; `useFilenamingConvention` accepts `index.ts`, `vite.config.ts`, `vite-env.d.ts`, and `*.test.ts`, and rejects `App.tsx` only when the file name does not match an export. `lint/suspicious/noArrayIndexKey` is a React-domain rule, so it only reports where React is detected.
- Final state: `pnpm exec biome check .` reads 524 files with 0 errors, 70 warnings, and 71 infos (exit 0). `pnpm format:check` reads 522 files (exit 0) and warns that `packages/knowledge/reports/authoring-crosswalk.json`, a tracked one-off report of 3.6 MiB with no code references, exceeds the default 1 MiB `files.maxSize` and is skipped.
- `./init.sh` passed on the migrated tree: Biome format, Biome lint fix with the TypeScript length checks, all workspace type checks, all workspace builds, the package-export checks, and the package tests (181 `@liuyao/core` and 103 `@liuyao/knowledge` tests).

## Handoff

- State: done for implementation and local verification; PR merge remains pending.
- Evidence: see the Evidence section above and the `progress.md` block for this feature.
- Dependency check: no dependency; the migration touches tooling only.
- Limits: the reformat rewrites 73 files, so other in-flight branches will conflict on rebase. Markdown, YAML, and HTML lose format enforcement. Nine `biome-ignore` comments carry the external-name and positional-key exceptions. The remaining warnings and infos are not chased.
- Next: review and merge the migration PR.
