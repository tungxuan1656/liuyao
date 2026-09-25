# LiuYao

LiuYao is a software platform for **Lục Hào / Liu Yao divination**, based on the classical I Ching (Kinh Dịch).

---

## Architecture Principles

> **Core Rule**: The Liu Yao calculation engine must be completely independent from React, browser APIs, persistence, backend APIs, and UI frameworks.

The web application is only the first consumer of the Liu Yao domain engine. The architecture is intentionally designed as a monorepo from day one to support future consumers (React Native/Expo mobile app, backend APIs, CLI tools, and validation tools) while keeping dependencies minimal and avoiding premature abstractions.

```text
                  @liuyao/core (Pure domain calculation)
                    ▲   ▲   ▲
                    │   │   │
                   web  api mobile (Future consumers)
```

---

## Workspace Structure

```text
liuyao/
├── apps/
│   └── web/                 # @liuyao/web: React 19 + Vite + PWA (Offline shell)
│       ├── src/
│       ├── public/
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── packages/
│   ├── liuyao-core/         # @liuyao/core: Pure TypeScript calculation engine
│   │   ├── src/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── knowledge/           # @liuyao/knowledge: Structured data & reference models
│       ├── data/
│       ├── src/
│       ├── tests/
│       ├── package.json
│       └── tsconfig.json
│
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── tsconfig.base.json
├── eslint.config.js
├── .prettierrc
├── .gitignore
├── .editorconfig
├── .node-version
└── README.md
```

### Applications

- **`@liuyao/web`** (`apps/web`): React 19 single-page web app configured as an installable Progressive Web App (PWA) with offline shell caching via `vite-plugin-pwa`.

### Shared Packages

- **`@liuyao/core`** (`packages/liuyao-core`): Deterministic domain logic for Liu Yao hexagrams, lines, and divination calculations. Zero dependencies on React, Vite, or the DOM.
- **`@liuyao/knowledge`** (`packages/knowledge`): Structured reference data, terminology, classical sources, and dataset models for I Ching & Liu Yao.

### Future Architecture

The monorepo structure is prepared to evolve naturally to accommodate:

- `apps/api` (Backend API)
- `apps/mobile` (React Native / Expo mobile app)
- `apps/admin` (Knowledge management application)
- `packages/contracts` (Shared API contracts and schemas)

_Note: These packages do not exist yet to prevent premature abstraction and unnecessary overhead._

---

## Development & Commands

### Prerequisites

- **Node.js**: `22.x` (LTS)
- **pnpm**: `^12.0.0`

### Setup

```bash
# Install dependencies across all workspaces
pnpm install
```

### Available Commands

| Command             | Description                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `pnpm dev`          | Starts the web PWA development server on Vite                                                   |
| `pnpm build`        | Compiles workspace packages (`@liuyao/core`, `@liuyao/knowledge`) and builds the web PWA bundle |
| `pnpm test`         | Runs the Vitest test suite across the monorepo                                                  |
| `pnpm typecheck`    | Typechecks all packages and apps with TypeScript strict mode                                    |
| `pnpm lint`         | Lints the repository using flat ESLint                                                          |
| `pnpm format`       | Formats all files with Prettier                                                                 |
| `pnpm format:check` | Verifies formatting with Prettier                                                               |

---

## Git Workflow & Quality Gates

This repository uses:

- **Husky**: Git hooks management.
- **Commitlint**: Enforces Conventional Commits (`type(scope): description`).
- **Lint-staged**: Runs ESLint and Prettier on staged files before commit.
