# Development

This document owns the local development, test-placement, and verification contract.

## Environment

- Node.js: `24` LTS from `.node-version`
- Package manager: `pnpm@12.5.1` from the root `package.json`
- Workspace roots: `apps/*` and `packages/*`

## Setup

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts `@liuyao/web` through Vite.

## Test model

Tests belong only to packages.

```text
packages/*/tests        allowed
apps/**/tests/**         not allowed
apps/**/__tests__/**     not allowed
apps/**/*.test.*         not allowed
apps/**/*.spec.*         not allowed
```

Use package tests for reusable domain behavior and data contracts. Validate application behavior with deterministic code evidence from type-checking, builds, linting, and package tests. Verify UI and PWA behavior with direct computer-use checks rather than browser automation suites.

If application code contains reusable Liu Yao logic that needs unit tests, move the logic into the owning package first.

`pnpm test` enforces this placement policy before invoking each workspace package test script recursively.

### Test cost and fixtures

- Use small deterministic fixtures for behavior and branch tests.
- Use full-corpus fixtures only when corpus-wide coverage or inventory closure is part of the assertion.
- Avoid rebuilding full-corpus setup for each scenario. Keep shared baselines private and clone mutable state for each test.
- When changing corpus-wide tests, measure focused and full-suite runtime.
- For repeated CI timeouts, investigate fixture cost and algorithmic complexity before changing timeout limits.
- Use deterministic operation counts for complexity regression tests, not machine-dependent timing assertions.

## Commands

| Command                                                   | Scope                                                   |
| --------------------------------------------------------- | ------------------------------------------------------- |
| `pnpm dev`                                                | Web development server                                  |
| `pnpm build`                                              | All workspace builds                                    |
| `pnpm test`                                               | Enforce placement + package tests                       |
| `pnpm typecheck`                                          | All workspace type checks                               |
| `pnpm lint`                                               | Repository Biome checks                                 |
| `pnpm format`                                             | Write Biome + Markdown/YAML formatting                  |
| `pnpm format:check`                                       | Check Biome + Markdown/YAML formatting                  |
| `bash scripts/check_ts_length.sh`                         | Enforce TypeScript file-size limits                     |
| `pnpm --filter @liuyao/web generate:assets`               | Regenerate the V1 PWA icon set from the approved source |
| `pnpm --filter @liuyao/knowledge validate:corpus --check` | Check the current corpus and generated freshness        |

The icon generator copies `docs/design-docs/batquai.avif` to `apps/web/public/luc-hao-icon-source.avif` because its configuration reads a public-directory path. The command removes that copy after success, failure, or a handled interrupt; it does not modify the approved source image. If an uncatchable termination leaves the temporary file behind, remove that exact file before retrying. Concurrent generator runs are not supported.

## Formatting ownership

Biome 2.5.15 checks JavaScript, TypeScript, JSON, CSS, and experimental HTML. Its 4 MiB file limit includes the authoring crosswalk report; this limit does not change runtime knowledge payload budgets. Prettier formats only Markdown and YAML through scripts and hooks.

Shadcn components in `apps/web/src/components/ui/**` use the same Biome formatting, lint, and import organization as other source files. Keep accessibility exceptions local, with explained suppressions for composed groups, pointer-only input-focus shortcuts, and caller-supplied label associations.

`init.sh` checks source files without fixing them. After registry updates, run the formatter or safe Biome fixes explicitly and review changes. Retain explained suppressions and the local `field.tsx` strict equality and deduplicated-message key fixes.

HTML support is experimental; review changes to `apps/web/index.html` and verify the web build after Biome upgrades. Prettier ignores generated assets, local books, agent tooling, and the lockfile.

## Git hooks

- Pre-commit runs lint-staged formatting and lint checks.
- Commit message validation uses Conventional Commits.
- Pre-push runs the TypeScript length check, type-checking, and package tests.

## Agent harness

`./init.sh` is the agent-facing full source-check workflow. It resolves the repository directory and runs explicit checks sequentially, stopping at the first failure with its exit code.

It performs:

1. `pnpm format:check`.
2. `pnpm lint`.
3. `bash scripts/check_ts_length.sh`.
4. `pnpm typecheck`.
5. `pnpm build`.
6. `pnpm --dir apps/web run check:package-exports`.
7. `pnpm test`, including test-placement enforcement.

The script does not fix source, install dependencies, generate command scripts, or schedule jobs. Build, type-check, and test tools can refresh ignored outputs. Run `pnpm install` separately when the workspace is not bootstrapped.

Execution state belongs to the selected task under `tasks/` or an adequate external tracker. [Task navigation](../tasks/index.md) holds links only; legacy feature/index/progress records are [frozen history](../features/README.md). Use relevant focused checks for bounded changes; run the full workflow before merging.

## Full verification

Verification before merging:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Knowledge build, type-check, and test commands validate the JSON corpus and refresh ignored runtime metadata and record assets.
Use pnpm --filter @liuyao/knowledge validate:corpus --check to check output freshness without rewriting files.
Use --check-books separately to identify the local supplied PDF editions; no audit or certification gate runs.
The [data guide](../packages/knowledge/data/README.md) defines the source-review workflow.

CI runs `./init.sh` end-to-end on pull requests and pushes to `main`, then requires `git status --porcelain` to be empty. This verifies the same check-only workflow and detects tracked or untracked repository drift; ignored generated outputs are outside that clean-tree check.
