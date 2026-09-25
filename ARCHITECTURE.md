# Architecture

This document owns repository topology, runtime boundaries, dependency direction, and change placement.

## System

```text
                 ┌──────────────────────┐
                 │      apps/web        │
                 │ React + Vite + PWA   │
                 └──────────┬───────────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
        packages/liuyao-core   packages/knowledge
        deterministic logic    reference knowledge
```

All current runtime behavior is local to the browser. The repository has no backend, account system, or persistence service.

## Code map

| Area | Owns | Must not own |
| --- | --- | --- |
| `apps/web` | UI, PWA behavior, package composition, user-facing flows | Reusable Liu Yao calculation rules |
| `packages/liuyao-core` | Deterministic input types and Liu Yao calculations | React, DOM, storage, persistence, network, reference prose |
| `packages/knowledge` | Structured reference data, terminology, source metadata, access APIs | App UI and hidden calculation rules |
| `packages/knowledge/data` | Curated knowledge content and source material | Application behavior |
| `docs/` | Durable product and engineering truth | Volatile execution state |
| `features/`, `feature_index.json`, `progress.md` | Tracked execution state and handoff | Durable architecture or product rules |
| `scripts/`, `init.sh` | Mechanical repository verification | Domain behavior |

## Dependency direction

Allowed:

```text
apps/web -> @liuyao/core
apps/web -> @liuyao/knowledge
```

Forbidden:

```text
@liuyao/core -X-> apps/web
@liuyao/core -X-> React / DOM / browser APIs / persistence / network
@liuyao/knowledge -X-> apps/web
apps/web -X-> reusable Liu Yao calculation rules
```

Packages currently have no runtime dependency on each other. Add a package edge only when the target package owns a responsibility the caller requires.

## Change placement

| Change | Canonical location |
| --- | --- |
| Liu Yao calculation or deterministic rule | `packages/liuyao-core` |
| Structured terminology or reference knowledge | `packages/knowledge` |
| Curated knowledge dataset or authored content | `packages/knowledge/data` |
| UI, PWA, routing, or product composition | `apps/web` |
| Product scope or durable behavior | `docs/product-specs/` |
| Engineering principle | `docs/design-docs/` |
| Repository verification contract | `docs/development.md` and `init.sh` |
| Temporary feature execution state | `features/`, `feature_index.json`, `progress.md` |

Do not move durable facts into feature or progress records.

## Runtime flow

1. `apps/web` starts through Vite and registers PWA behavior.
2. The UI sends structured reading input to `@liuyao/core`.
3. `@liuyao/core` returns deterministic structured results.
4. The UI reads descriptive material from `@liuyao/knowledge`.
5. The UI renders facts and reference knowledge.

The current core implementation only detects and counts changing lines. Broader Liu Yao calculations remain future work.

## Verification ownership

- Package behavior is verified by tests under `packages/*/tests`.
- Applications under `apps/*` do not own test suites.
- Repository-wide commands are defined in `docs/development.md`.
- Agent verification is orchestrated by `init.sh`.

## Related docs

- Engineering principles → `docs/design-docs/core-beliefs.md`
- Product scope → `docs/product-specs/product-scope.md`
- Development and verification → `docs/development.md`
- Agent operating contract → `AGENTS.md`
