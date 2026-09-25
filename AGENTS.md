# AGENTS.md

LiuYao is a pnpm monorepo for an offline-first Liu Yao PWA. Keep domain calculations and reference knowledge reusable outside the web app.

## Start here

- System boundaries and dependency direction → `ARCHITECTURE.md`
- Accepted engineering principles → `docs/design-docs/core-beliefs.md`
- Product scope and non-goals → `docs/product-specs/product-scope.md`
- Commands, tests, and local workflow → `docs/development.md`
- Human project overview → `README.md`

## Repository map

```text
apps/web                 React + Vite + PWA consumer
packages/liuyao-core     deterministic domain calculations
packages/knowledge      structured Liu Yao reference knowledge
docs/                   durable repository knowledge
scripts/                repository verification helpers
```

## Rules

- Write all repository documentation in English.
- Keep documentation concise. Split distinct topics instead of repeating the same truth across files.
- Give each durable fact one canonical owner. Link to that owner from other documents.
- Put tests only in `packages/*/tests`. Do not add test files under `apps/`.
- Keep `@liuyao/core` independent from React, DOM APIs, browser storage, network calls, persistence, and app-specific state.
- Keep reusable Liu Yao calculation logic out of `apps/*`. Move it into `@liuyao/core` and test it there.
- Keep structured reference content in `@liuyao/knowledge`. Do not mix reference prose or source data into calculation code.
- Treat future behavior as `Intended` or `Proposed`. Do not describe unimplemented behavior as current capability.
- Update the canonical document when a product rule, architecture boundary, command, or verification contract changes.

## Verification

Quick:

```bash
pnpm typecheck && pnpm test
```

Full:

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Before a push, the repository hook also runs `scripts/check_ts_length.sh`.
