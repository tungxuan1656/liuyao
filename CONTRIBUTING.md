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

## Licensing

By submitting code or repository documentation, you agree that your contribution is provided under **AGPL-3.0-only** unless a different written agreement applies.

Do not submit proprietary or third-party knowledge content unless you have the rights required for the repository to use it. Curated knowledge under `packages/knowledge/data/` follows the separate terms in `LICENSING.md`.

Future commercial dual licensing can require additional contributor permission. Maintainers must review contributor-license implications before accepting contributions that materially affect relicensing options.
