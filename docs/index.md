# Documentation

This file routes repository documentation. Each durable fact has one canonical owner.

## Product

| Read when                                        | Source                                    | Owns                                             |
| ------------------------------------------------ | ----------------------------------------- | ------------------------------------------------ |
| You need product boundaries                      | `docs/product-specs/product-scope.md`     | Current capability, V1 scope, non-goals          |
| You plan V1 work                                 | `docs/product-specs/v1-mvp.md`            | V1 feature set, dependencies, release acceptance |
| You implement V1 tasks                           | `docs/product-specs/v1-task-map.md`       | End-to-end task decomposition                    |
| You decide name, logo, icons, or public metadata | `docs/product-specs/product-identity.md`  | Product identity and release assets              |
| You change reading creation                      | `docs/product-specs/reading-flow.md`      | Casting and direct-entry user flow               |
| You change result UI                             | `docs/product-specs/reading-result.md`    | Result content and fact presentation             |
| You change reference browsing                    | `docs/product-specs/knowledge-browser.md` | Library and rule-explanation behavior            |
| You change settings                              | `docs/product-specs/settings.md`          | V1 settings and diagnostics                      |

## Engineering and release

| Read when                                | Source                                     | Owns                                       |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| You change repository boundaries         | `ARCHITECTURE.md`                          | Topology and dependency direction          |
| You change recurring engineering choices | `docs/design-docs/core-beliefs.md`         | Engineering principles                     |
| You change domain types                  | `docs/design-docs/domain-model.md`         | V1 domain contracts and line conventions   |
| You change calculation logic             | `docs/design-docs/calculation-pipeline.md` | V1 deterministic calculation pipeline      |
| You change knowledge data                | `docs/design-docs/knowledge-model.md`      | Knowledge ownership, schema, and sources   |
| You change PWA behavior                  | `docs/design-docs/offline-pwa.md`          | Offline and update behavior                |
| You change development verification      | `docs/development.md`                      | Commands, test placement, CI contract      |
| You deploy or release production         | `docs/release.md`                          | Environments, deploy, rollback, smoke test |
| You add knowledge content                | `LICENSING.md`                             | Licensing boundary                         |

Execution status does not live in `docs/`. Use `features/`, `feature_index.json`, and `progress.md` when tracked work needs persistent state.
