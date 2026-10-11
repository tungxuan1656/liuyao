# Documentation

This file routes repository documentation. Each durable fact has one canonical owner.

## Product

| Read when                                          | Source                                    | Owns                                             |
| -------------------------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| You need product boundaries                        | `docs/product-specs/product-scope.md`     | Current capability, V1 scope, non-goals          |
| You plan V1 work                                   | `docs/product-specs/v1-mvp.md`            | V1 feature set, dependencies, release acceptance |
| You implement V1 tasks                             | `docs/product-specs/v1-task-map.md`       | End-to-end task decomposition                    |
| You decide name, logo, icons, or public metadata   | `docs/product-specs/product-identity.md`  | Product identity and release assets              |
| You change reading creation                        | `docs/product-specs/reading-flow.md`      | Casting and direct-entry user flow               |
| You change result UI                               | `docs/product-specs/reading-result.md`    | Result content and fact presentation             |
| You change reference browsing                      | `docs/product-specs/knowledge-browser.md` | Library and rule-explanation behavior            |
| You review domain content or evidence              | `docs/product-specs/knowledge-quality.md` | Supplied-book evidence and content acceptance    |
| You plan the expanded book corpus                  | `docs/product-specs/knowledge-content.md` | Learning content scope and writing units         |
| You change settings                                | `docs/product-specs/settings.md`          | V1 settings and diagnostics                      |
| You change UI layout, navigation, or design tokens | `docs/product-specs/ui-layout.md`         | Web UI layout, navigation, and component tokens  |

## Engineering and release

| Read when                                | Source                                     | Owns                                       |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| You change repository boundaries         | `ARCHITECTURE.md`                          | Topology and dependency direction          |
| You change recurring engineering choices | `docs/design-docs/core-beliefs.md`         | Engineering principles                     |
| You change domain types                  | `docs/design-docs/domain-model.md`         | V1 domain contracts and line conventions   |
| You change calculation logic             | `docs/design-docs/calculation-pipeline.md` | V1 deterministic calculation pipeline      |
| You inspect board rules or derivations   | `docs/design-docs/liuyao-ruleset-v1.md`    | Calculation tables and supporting passages |
| You change knowledge data                | `docs/design-docs/knowledge-model.md`      | Knowledge structure, links, and loading    |
| You consult the supplied books           | `docs/references/book-sources.md`          | PDF editions, locators, and discrepancies  |
| You change PWA behavior                  | `docs/design-docs/offline-pwa.md`          | Offline and update behavior                |
| You change development verification      | `docs/development.md`                      | Commands, test placement, CI contract      |
| You deploy or release production         | `docs/release.md`                          | Environments, deploy, rollback, smoke test |
| You add knowledge content                | `LICENSING.md`                             | Licensing boundary                         |

Execution status does not live in `docs/`. Use `features/`, `feature_index.json`, and `progress.md` when tracked work needs persistent state.

## Historical and local material

| Read when                                        | Source                             | Owns                                            |
| ------------------------------------------------ | ---------------------------------- | ----------------------------------------------- |
| You need a retired review or accounting artifact | `docs/reviews/knowledge/README.md` | Historical notes and Git recovery paths         |
| You need the intent recorded for earlier work    | `docs/plans/`                      | Plan-time intent for one tracked feature        |
| You compare a claim with a supplied edition      | `docs/books/`                      | Local PDFs, ignored by Git, never redistributed |

Files routed above hold the current contract. Authored source records live in `packages/knowledge/data/`. Generated runtime output lives in build directories and is never a truth source. A historical plan, review note, or progress block records what was decided then; the canonical document wins when they disagree.
