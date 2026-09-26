# Knowledge Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Use `subagent-driven-development` or `executing-plans` only when installed and appropriate. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver local, licensed, validated V1 knowledge for every deterministic result fact and all 8 trigrams and 64 hexagrams.

**Architecture:** `packages/knowledge/data` owns curated records and provenance; `packages/knowledge/src` owns typed contracts, validation, immutable access, and local search. Reuse the existing stable core entity IDs without adding a runtime package dependency. Keep explanations separate from calculations and UI.

**Tech Stack:** TypeScript, Vitest, pnpm.

## Global Constraints

- F05-T01–T12 and their evidence in `docs/product-specs/v1-task-map.md` are canonical.
- `liuyao-standard-v1` is the only V1 ruleset; line positions are bottom-to-top.
- Do not copy modern copyrighted prose or invent source locations or disputed interpretations. Write short original factual descriptions and record rights/provenance.
- No network, persistence, React, or hidden calculation rules in knowledge; tests only in `packages/*/tests`.
- Keep data rights under `packages/knowledge/data/LICENSE`, distinct from the AGPL software license.

---

## Decision log

- 2026-09-26: Keep core's `trigram-*` and `hexagram-01`–`hexagram-64` IDs stable. Introduce namespaced `term-*`, `rule-*`, `source-*`, and `reference-*` IDs for curated records. Include ruleset ID on rule records rather than deriving rules from knowledge.
- 2026-09-26: Store bibliographic references as catalog metadata, not proof of a particular modern interpretation. A location is optional and present only for a verifiable section; unknown page/chapter locations remain absent.
- 2026-09-26: Search normalizes case, Unicode combining marks, punctuation, and spacing locally. Return canonical readonly records in deterministic catalog order; never return mutable shared state.
- 2026-09-26: A source-reference record must link an existing source and at least one existing knowledge entity, term, or rule. Validator rejects duplicates, missing references, malformed IDs, and unsupported rulesets before lookup construction.
- 2026-09-26 review: Package builds include `data/*.ts` because runtime lookups import curated records. Keep the package private: its AGPL reader code and All-Rights-Reserved content cannot be represented by one homogeneous package license field. Type-check package tests separately without adding a runtime dependency on core.
- 2026-09-26 review: Keep the 64-name/number/trigram expected fixture independent of catalog data; compare displayed result fields to the core contract in package tests only, without a runtime core import.

## Work stages

### Task 1: Contracts and catalog identity (F05-T01–T02, T10)

**Files:** Create `packages/knowledge/src/schema.ts`, `packages/knowledge/src/validation.ts`, `packages/knowledge/tests/schema.test.ts`; modify `packages/knowledge/src/index.ts`.

**Interfaces:** `KnowledgeEntity`, `KnowledgeTerm`, `KnowledgeRule`, `KnowledgeSource`, `SourceReference`, `KnowledgeCatalog`; `validateKnowledgeCatalog(catalog: KnowledgeCatalog): void` throws for duplicate IDs, invalid shapes, broken references or unsupported ruleset. Entity IDs follow the core's existing patterns; other IDs use their namespace prefixes.

- [x] Test valid fixtures, invalid/missing fields, duplicate IDs within and across collections, broken entity/rule/term/source links (including a `term-missing` regression), unsupported ruleset, and duplicate source-reference IDs.
- [x] Implement typed readonly contracts and runtime validation with descriptive errors; run `pnpm --filter @liuyao/knowledge test` and `pnpm --filter @liuyao/knowledge typecheck`.

### Task 2: Curated V1 catalog and provenance (F05-T03–T09)

**Files:** Create focused catalog files under `packages/knowledge/data/` for trigrams, hexagrams, terms, rules, sources, and references; rewrite `packages/knowledge/data/README.md` for actual data and usage rights; add `packages/knowledge/tests/catalog.test.ts`.

**Interfaces:** `catalog: KnowledgeCatalog` combines exactly 8 `TrigramEntity`, 64 `HexagramEntity`, result-board terms and explanatory rules, and source/reference records. Each entity has a stable ID, canonical display name, and supported aliases; each hexagram has its King Wen number and upper/lower trigram IDs.

- [x] Test the 8/64 counts, exact stable IDs, and all 64 unique upper/lower pairs. An independent rights-safe grid fixture asserts each hexagram's name, King Wen number, and upper/lower trigram IDs, rather than deriving expected values from the catalog's own matrix.
- [x] Write original concise display records and test required result concepts: yin/yang, moving lines, upper/lower trigrams, primary/changed hexagram, palace, Shi/Ying, Na Jia stems/branches, Five Elements, Six Relatives and five relations.
- [x] Add short explanatory rules keyed by stable IDs for displayed deterministic facts, explicitly distinguishing convention from prediction. Assert an exhaustive mapping of all `ReadingResult` and `PrimaryLineResult` field names against core contracts and check every mapped rule ID exists (see field-to-rule map below).
- [x] Add bibliographic records with provenance/rights and only verified source locations; audit every reference link and every authored description against `LICENSING.md`. Run focused tests.

### Task 3: Readonly lookup and normalized local search (F05-T11–T12)

**Files:** Create `packages/knowledge/src/catalog.ts`, `packages/knowledge/src/search.ts`, `packages/knowledge/tests/lookup.test.ts`, `packages/knowledge/tests/search.test.ts`; modify `packages/knowledge/src/index.ts`.

**Interfaces:** Public list/get functions return immutable catalog record copies by canonical ID and `undefined` for missing IDs; `searchKnowledge(query: string)` returns readonly matches across entities, terms and rules, matching normalized names and aliases with stable ordering.

- [x] Test mutation resistance for nested records, arrays, lists and search results; test missing IDs and identity stability.
- [x] Test case, diacritics, Unicode normalization, spacing, punctuation, aliases, empty query, and no-match behavior without network calls.
- [x] Implement access and search; run focused package tests/typecheck and inspect exported API boundaries.

### Task 4: Verification and handoff

**Files:** Modify `features/feat-006.md`, `feature_index.json`, `progress.md`, this plan; modify `ARCHITECTURE.md` and `docs/product-specs/product-scope.md` only to reflect observed behavior.

- [x] Inspect tree, run `./init.sh`, record exact test counts and warnings, and audit F05-T01–T12 evidence.
- [x] Mark feat-006 done locally after acceptance passes; record that review and merge remain pending in the feature handoff and append a material progress block with a concrete next action.
- [x] Commit and push implementation and open PR #16.
- [x] Obtain current-head plan and PR review approval, address fresh findings, reverify changed behavior, and squash-merge PR #16.

## Verification budget

### Displayed fact-to-rule map

| Result fields                                              | Stable rule ID               |
| ---------------------------------------------------------- | ---------------------------- |
| `ruleset`                                                  | `rule-reading-result-fields` |
| `lines`                                                    | `rule-line-position-order`   |
| `primaryHexagramId`, `lowerTrigramId`, `upperTrigramId`    | `rule-trigram-composition`   |
| `changedHexagramId`                                        | `rule-moving-line-change`    |
| `palaceId`, `palaceElement`, `shiPosition`, `yingPosition` | `rule-palace-and-markers`    |

| Primary line fields        | Stable rule ID                     |
| -------------------------- | ---------------------------------- |
| `position`                 | `rule-line-position-order`         |
| `inputValue`, `polarity`   | `rule-line-polarity-values`        |
| `changing`                 | `rule-moving-line-change`          |
| `naJiaStem`, `naJiaBranch` | `rule-na-jia-assignment`           |
| `element`                  | `rule-branch-element`              |
| `relative`                 | `rule-six-relative-classification` |
| `shiYing`                  | `rule-palace-and-markers`          |

`tests/content.test.ts` reads the core contract as a test-only fixture to fail on added/removed fields; runtime knowledge code does not depend on core. `rule-five-element-cycles` additionally explains the classification cycle behind `relative` and is checked as required rule content.

- Package tests establish schema integrity, identity and 8/64 completeness, required term/rule coverage, source-reference integrity, immutability, and normalized search.
- Source inspection establishes independent authored wording, rights metadata, and honest absent citation locations; no test can prove copyright ownership.
- `./init.sh` checks repository format, lint, TypeScript length, typecheck, build, and package tests. Record any unrelated non-failing warnings separately.

## Verification evidence (2026-09-26)

`./init.sh` passed format, lint and TypeScript length checks, typecheck, build, and package tests: 31 knowledge tests in 6 files and 153 core tests in 13 files. Lint reported the pre-existing non-failing `react-refresh/only-export-components` warning at `apps/web/src/components/ui/button.tsx:49`. The first run failed web build because this worktree lacked the optional `@tailwindcss/oxide-darwin-arm64` binding; `pnpm install --frozen-lockfile --force` restored the binding without source or lockfile changes, and the subsequent complete `./init.sh` passed. Focused package tests cover F05-T01–T12; source records contain original factual paraphrases and explicitly omit unverified Jingshi locations. No initial red-test transcript was retained, so checked coverage steps assert current tests rather than an observed initial failure.

Review correction: `./init.sh` passed again after adding the broken-term-reference regression, all-64 independent fixture, and exhaustive result/line field-to-rule mapping. The current run passed format, lint, TypeScript length, typecheck, build, test placement, 34 knowledge tests across 6 files, and 153 core tests across 13 files. The same pre-existing non-failing web Fast Refresh warning remains at `apps/web/src/components/ui/button.tsx:49`.
