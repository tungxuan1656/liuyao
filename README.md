# LiuYao

[![CI](https://github.com/tungxuan1656/liuyao/actions/workflows/ci.yml/badge.svg)](https://github.com/tungxuan1656/liuyao/actions/workflows/ci.yml)

LiuYao is an offline-first web application for **Lục Hào (Liu Yao / Six Lines)** divination and structured I Ching reference knowledge.

> **Status:** early development. The repository currently provides the monorepo foundation, PWA shell, minimal deterministic line logic, and knowledge-package scaffolding. It is not yet a complete divination application.

## V1 direction

The first usable version is focused on:

- casting or entering a six-line reading;
- calculating and identifying deterministic hexagram data;
- displaying reading facts and rules;
- browsing structured Liu Yao knowledge;
- working offline through the PWA shell;
- settings required by those flows.

Automated interpretation, accounts, cloud sync, and AI are outside the V1 core scope.

## Architecture

```text
apps/web
  ├──> @liuyao/core       deterministic domain calculations
  └──> @liuyao/knowledge  structured reference knowledge
```

The web app is a consumer of reusable packages. Domain calculations do not depend on React, the DOM, persistence, or network access.

See [ARCHITECTURE.md](ARCHITECTURE.md) for boundaries and dependency direction.

## Repository

```text
apps/
└── web/                  React + Vite + PWA

packages/
├── liuyao-core/          pure TypeScript domain engine
└── knowledge/            structured knowledge package

docs/
├── design-docs/          durable engineering principles
├── product-specs/        durable product scope
└── development.md        local workflow and verification
```

Agent-facing navigation starts at [AGENTS.md](AGENTS.md).

## Getting started

Requirements:

- Node.js 24 LTS
- pnpm 12.5.1

```bash
pnpm install
pnpm dev
```

## Verification

| Command             | Purpose                        |
| ------------------- | ------------------------------ |
| `pnpm format:check` | Check formatting               |
| `pnpm lint`         | Run ESLint                     |
| `pnpm typecheck`    | Type-check all workspaces      |
| `pnpm test`         | Run package tests              |
| `pnpm build`        | Build packages and the web app |

Tests live in `packages/*/tests`. Applications under `apps/` do not own test suites.

See [docs/development.md](docs/development.md) for the full development contract.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Security

Report security issues according to [SECURITY.md](SECURITY.md).

## License

Software and repository documentation are licensed under **AGPL-3.0-only**. Original curated knowledge and content under `packages/knowledge/data/` are **All Rights Reserved** unless a file states otherwise.

See [LICENSING.md](LICENSING.md) for the complete licensing boundary and [LICENSE](LICENSE) for the AGPL-3.0 text.
