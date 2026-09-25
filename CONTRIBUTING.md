# Contributing

Thank you for contributing to LiuYao.

## Before changing code

1. Read `AGENTS.md`.
2. Read `ARCHITECTURE.md` when changing package boundaries or dependency direction.
3. Read `docs/product-specs/product-scope.md` when changing product behavior.
4. Read `docs/development.md` for the repository verification contract.

## Development

```bash
pnpm install
pnpm dev
```

Use Conventional Commits because commitlint enforces that format.

Examples:

```text
feat(core): add changing hexagram calculation
fix(knowledge): correct trigram metadata
docs: clarify package boundaries
```

## Tests

Add tests only under `packages/*/tests`. Do not create test files inside `apps/*`.

Application changes must still pass type-checking, linting, and the production build.

## Pull requests

Keep each pull request focused on one coherent change. Update canonical documentation when behavior, architecture, or repository commands change.

Run the full verification suite before requesting review:

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```
