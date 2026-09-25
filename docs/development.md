# Development

This document owns the local development, test-placement, and verification contract.

## Environment

- Node.js: `22` from `.node-version`
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
packages/*/tests   allowed
apps/*/tests       not allowed
apps/**/*.test.*   not allowed
apps/**/*.spec.*   not allowed
```

Use package tests for reusable domain behavior and data contracts. Validate applications through type-checking, builds, linting, and direct UI/PWA verification.

If application code contains reusable Liu Yao logic that needs unit tests, move the logic into the owning package first.

## Commands

| Command | Scope |
| --- | --- |
| `pnpm dev` | Web development server |
| `pnpm build` | All workspace builds |
| `pnpm test` | Vitest package suites |
| `pnpm typecheck` | All workspace type checks |
| `pnpm lint` | Repository ESLint |
| `pnpm format` | Write Prettier formatting |
| `pnpm format:check` | Check Prettier formatting |
| `bash scripts/check_ts_length.sh` | Enforce TypeScript file-size limits |

## Git hooks

- Pre-commit runs lint-staged formatting and lint checks.
- Commit message validation uses Conventional Commits.
- Pre-push runs the TypeScript length check, type-checking, and tests.

## Full verification

Run before merging:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

CI runs the same repository checks on pull requests and pushes to `main`.
