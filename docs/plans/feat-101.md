# Extended Knowledge Records and Provenance Contracts Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Execute inline in the active feat-101 checkout. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add validated, released version-2 knowledge contracts and immutable snapshot identity without changing existing version-1 authored records or compatibility behavior.

**Architecture:** Keep version-1 records on their existing schema and type path. Add a strict version-2 schema, distinct readonly types, an explicit non-mutating version-1 upcast, cross-file evidence checks, and build-generated release-only runtime data. Keep source comparison distinct from specialist approval and keep calculation tables in `@liuyao/core`.

**Tech Stack:** UTF-8 JSON, JSON Schema draft-07, Node.js scripts, TypeScript, Vitest, SHA-256, and the existing pnpm workspace.

## Global Constraints

- Leave all 172 authored version-1 JSON records byte-for-byte unchanged.
- Preserve stable record and claim IDs and existing compatibility APIs.
- Dispatch record schema versions 1 and 2 only; reject unknown versions.
- Keep schemas, readonly types, migration, release generation, and runtime output consistent.
- Validate all authored inputs, but emit only release-eligible records and reachable evidence.
- Do not author lessons, figures, conventions, bulk migrations, or new domain claims in this feature.
- Do not add dependencies, web/UI work, calculation changes, or specialist-certification claims.
- Put tests only in `packages/knowledge/tests/`.
- Keep authored TypeScript files below the repository's 300-line limit.

## File Map

| Path                                                      | Responsibility                                                                         |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `packages/knowledge/schema/record.schema.json`            | Frozen version-1 record schema; keep this path and contract.                           |
| `packages/knowledge/schema/record-v2.schema.json`         | Strict version-2 record envelope and typed extensions.                                 |
| `packages/knowledge/schema/manifest.schema.json`          | Optional project-contract entries without advancing manifest schema version.           |
| `packages/knowledge/src/book-schema.ts`                   | Preserve existing version-1 readonly types and current API names.                      |
| `packages/knowledge/src/book-schema-v2.ts`                | Version-2 records, lessons, figures, project evidence, and sanitized release types.    |
| `packages/knowledge/src/book-figures.ts`                  | Typed bounded figures, labels, orientation, alternatives, and table metadata.          |
| `packages/knowledge/src/book-lessons.ts`                  | Typed lesson blocks and figure/table targets.                                          |
| `packages/knowledge/src/book-migration.ts`                | Pure deep-copy upcast from a prevalidated `BookRecordV1`; no runtime schema validator. |
| `packages/knowledge/scripts/record-schema-dispatch.mjs`   | Build-time V1/V2 schema selection.                                                     |
| `packages/knowledge/scripts/corpus-checks.mjs`            | Cross-file IDs, references, and release checks.                                        |
| `packages/knowledge/scripts/corpus-evidence.mjs`          | Supporting-claim references, dependency cycles, and release support closure.           |
| `packages/knowledge/scripts/corpus-figures.mjs`           | Figure identity, evidence references, and plate gate.                                  |
| `packages/knowledge/scripts/corpus-lessons.mjs`           | Lesson sequence, prerequisites, ordered blocks, targets, and review coverage.          |
| `packages/knowledge/scripts/corpus-projects.mjs`          | Build-time project-document and registry structure checks.                             |
| `packages/knowledge/scripts/release-projection.mjs`       | Release-selected records, reachable citations, and sanitized source projection.        |
| `packages/knowledge/scripts/snapshot-identity.mjs`        | Field-aware canonicalization and versioned SHA-256 identity.                           |
| `packages/knowledge/scripts/snapshot-identity.d.mts`      | TypeScript declaration for the snapshot identity script.                               |
| `packages/knowledge/scripts/validate-corpus.mjs`          | Schema dispatch, authored-corpus validation, and generated outputs.                    |
| `packages/knowledge/data/README.md`                       | Authored-data, schema, release-output, and migration map.                              |
| `docs/design-docs/knowledge-model.md`                     | Approved contract, implemented surface, and evidence limits.                           |
| `packages/knowledge/src/book-release.generated.json`      | Generated release-only data outside authored `data/`; local source paths omitted.      |
| `packages/knowledge/src/book-data.generated.ts`           | Typed wrapper around generated release JSON.                                           |
| `packages/knowledge/src/book-release-checks.ts`           | Runtime release membership and eligibility checks.                                     |
| `packages/knowledge/src/book-release-integrity.ts`        | Runtime evidence, citation, target, source, and project-metadata checks.               |
| `packages/knowledge/src/book-snapshot.ts`                 | Public snapshot identity type and format validation.                                   |
| `packages/knowledge/src/book-catalog.ts`                  | Existing list/get APIs over V1/V2 records and sanitized sources; identity/navigation.  |
| `packages/knowledge/src/book-adapter.ts`                  | Compatibility adapter for supported record types and project-convention claim text.    |
| `packages/knowledge/src/index.ts`                         | Re-exports catalog APIs and versioned schema types.                                    |
| `packages/knowledge/tests/book-migration.test.ts`         | Migration guards, deep copy, and immutability.                                         |
| `packages/knowledge/tests/book-schema-dispatch.test.mjs`  | V1/V2 schema dispatch and invalid version fixtures.                                    |
| `packages/knowledge/tests/book-schema-v2.test.mjs`        | V2 schema fixtures.                                                                    |
| `packages/knowledge/tests/book-validation.test.mjs`       | Schema dispatch and cross-file fixtures.                                               |
| `packages/knowledge/tests/book-dependencies.test.mjs`     | Dependency graph and release closure fixtures.                                         |
| `packages/knowledge/tests/book-figures.test.mjs`          | Figure evidence and inspection gate fixtures.                                          |
| `packages/knowledge/tests/book-lessons.test.mjs`          | Lesson order, review, prerequisite, and target fixtures.                               |
| `packages/knowledge/tests/book-project-evidence.test.mjs` | Project path, heading, and registry structure fixtures.                                |
| `packages/knowledge/tests/book-generator.test.mjs`        | Projection, absence, and generated-output freshness.                                   |
| `packages/knowledge/tests/book-release.test.ts`           | Runtime release and evidence gates.                                                    |
| `packages/knowledge/tests/book-catalog.test.ts`           | Catalog APIs, adapters, identity, and navigation.                                      |
| `packages/knowledge/tests/book-tables.test.ts`            | Existing typed table structures and compatibility checks.                              |

Keep the version-1 schema path to protect existing consumers. The package root re-exports `BookRecordV1`, `BookRecordV2`, the `BookRecordVersioned` union, catalog APIs, and source types. `listBookRecords` and `getBookRecord` return the V1/V2 union; `AuthoredBookSource` with local paths remains distinct from `ReleasedBookSource` without local paths. The compatibility adapter skips lessons and does not create entity, term, or rule projections for unsupported record types. Run root `pnpm typecheck` to check legacy API consumers.

## Checkpoint 1: Versioned schemas, types, and migration

**Files:** `packages/knowledge/schema/record.schema.json`, `packages/knowledge/schema/record-v2.schema.json`, `packages/knowledge/schema/manifest.schema.json`, `packages/knowledge/src/book-schema.ts`, `packages/knowledge/src/book-schema-v2.ts`, `packages/knowledge/src/book-figures.ts`, `packages/knowledge/src/book-lessons.ts`, `packages/knowledge/src/book-migration.ts`, `packages/knowledge/tests/book-migration.test.ts`, and schema-focused tests.

**Interfaces:** Add version-2 `lesson`, `project-convention`, and figure contracts from the [approved model](../design-docs/knowledge-model.md#approved-extended-record-contract). Reuse existing table row kinds with optional record-scoped `table-*` ID, source inventory references, and attributed alternatives. Keep version-1 types distinct and strict. The pure migration accepts a prevalidated `BookRecordV1`, guards object shape and `schemaVersion: 1`, deep-copies the record, and returns `BookRecordV2` without mutating the input. Build-time schema validation remains outside `src/`.

- [x] Confirm the current V1 schema and public type shapes in tests before changing dispatch. C1 tests passed.
- [x] Add the standalone strict V2 record schema and project-contract manifest validation; keep the V1 schema file unchanged. C1 tests passed.
- [x] Define readonly V2 claim, record, lesson block, figure, project evidence, table extension, authored source, and sanitized release source types. C1 tests passed.
- [x] Implement the pure helper's object/schema-version guard, deep copy, and ID/order/evidence preservation. Do not import Ajv or another schema validator into `src/`. C1 tests passed.
- [x] Test invalid V1 fields through schema dispatch. Test missing/other versions and input immutability through the migration helper. C1 check: 18 tests passed.
- [x] Test V1/V2 acceptance, independent fixtures, deep equality, and schema/type agreement. Preserve all authored V1 files unchanged. C1 tests and the 173-file byte-identity check passed.
- [x] Keep migration fixtures separate from validator fixtures. Use malformed V1 data for schema-validator rejection and explicit bad versions for helper-guard rejection. C1 tests passed.
- [x] Run the C1 schema/migration focused tests. C1 check: 18 tests passed.

## Checkpoint 2: Cross-file validation and release eligibility

**Files:** `packages/knowledge/scripts/corpus-checks.mjs`, `packages/knowledge/scripts/corpus-evidence.mjs`, `packages/knowledge/scripts/corpus-figures.mjs`, `packages/knowledge/scripts/corpus-lessons.mjs`, `packages/knowledge/scripts/corpus-projects.mjs`, `packages/knowledge/scripts/validate-corpus.mjs`, and their package fixtures.

Add focused cases to existing `tests/book-tables.test.ts` when checking table IDs and evidence. Keep all new tests in the package test directory.

Use `tests/book-validation.test.mjs` for schema and cross-file fixtures. Use `tests/book-release.test.ts` for mocked public-catalog release behavior.

**Interfaces:** The validator receives authored V1/V2 records, citations, sources, manifest, and legacy compatibility data. It validates supported record schemas before cross-file checks. Navigation stays distinct from typed evidence dependencies.

- [x] Dispatch authored records by integer schema version 1 or 2 and validate each file against its selected schema; reject missing, malformed, and unknown versions. C2 package checks passed.
- [x] Keep build-time dispatch responsible for complete V1 schema rejection. Keep the source migration helper limited to its object and version guard. C1/C2 tests passed.
- [x] Keep records, claims, citations, and figure IDs corpus-global. Scope table IDs to records, block IDs to lessons, and label IDs to figures. Reject duplicate child IDs. C2 tests passed.
- [x] Validate non-empty source inventory ID arrays as references with no local registry resolution. Accept repeated source-unit references. C2 tests passed.
- [x] Validate every declared supporting-reference surface, including dependency, structure, entity/line/passage, table, figure, lesson-block, and review references. C2 tests passed.
- [x] Validate citation arrays against citations, separately from claim dependency edges. C2 tests passed.
- [x] Require released lesson review evidence to cover block supports and project-convention claims. C2 tests passed.
- [x] Reject missing or under-declared lesson evidence with fixtures. C2 tests passed.
- [x] Require non-plate figure inventory/claim evidence, ordered labels, and label/orientation/alternative evidence. C2 tests passed.
- [x] Reject empty-evidence figures and uninspected released plates; preserve typed table checks. C2 tests passed.
- [x] Enforce ordered lesson block positions, unique sequences/prerequisites, valid prerequisite IDs, and acyclic prerequisite graphs. C2 tests passed.
- [x] Resolve typed block targets by kind, owner, and child ID; reject missing or unreleased owners. C2 tests passed.
- [x] Enforce acyclic claim dependencies and reviewed, selected support; do not auto-select dependencies. C2 tests passed.
- [x] Validate repository-relative project paths, canonical files/headings, revision and registry matches at build time. C2 tests passed; structure does not establish acceptance.
- [x] Reject fake convention citations and missing book citations; keep structural document checks distinct from approval. C2 tests passed.
- [x] Keep filesystem checks at build time and use project metadata at runtime. C2/C3 checks passed.
- [x] Keep navigation links separate from evidence and avoid leaking unavailable record details. C2/C3 tests passed.
- [x] Test missing/cyclic references, ID scopes, repeated source-unit references, figure evidence, and lesson review coverage. C2 check: 107 tests passed.
- [x] Test blocked unsupported dependencies and release projection behavior. C2/C3 test receipts: passed.
- [x] Test figure kinds, plate gate, target evidence, citations, project structure, and unavailable navigation. C2/C3 test receipts: passed.
- [x] Run focused C2 validation and release tests. C2 check: 107 tests passed.

## Checkpoint 3: Release projection and snapshot identity

**Files:** `packages/knowledge/scripts/release-projection.mjs`, `packages/knowledge/scripts/snapshot-identity.mjs`, `packages/knowledge/scripts/snapshot-identity.d.mts`, `packages/knowledge/scripts/validate-corpus.mjs`, `packages/knowledge/src/book-release.generated.json`, `packages/knowledge/src/book-data.generated.ts`, `packages/knowledge/src/book-catalog.ts`, `packages/knowledge/src/book-adapter.ts`, `packages/knowledge/src/book-schema-v2.ts`, `packages/knowledge/src/book-snapshot.ts`, `packages/knowledge/src/index.ts`, and package tests for generator, release checks, catalog, and tables.

**Interfaces:** Generate runtime data only after complete authored-corpus validation. Expose `getBookSnapshotIdentity()` as an immutable versioned SHA-256 identity. Preserve `listBookRecords`, `getBookRecord`, `listBookCitations`, `getBookCitation`, `listBookSources`, and `getBookSource` call patterns. Type `listBookRecords` and `getBookRecord` as `BookRecordV1 | BookRecordV2`. Return `ReleasedBookSource` without local input paths, distinct from `AuthoredBookSource`. Add a small resolver that returns either a released target or an unavailable result without draft details.

- [x] Generate release-selected records and supporting references without adding dependencies to release membership. C3 tests passed.
- [x] Project reachable citations, their editions, review/discrepancy evidence, and sanitized source metadata. C3 package checks passed.
- [x] Keep raw authored data out of runtime; release JSON is outside `data/` and local input paths are absent. Generated JSON was checked for `localInputPath` absence.
- [x] Generate a typed JSON wrapper and check JSON/TypeScript output freshness. C3 generator checks passed.
- [x] Keep coverage incomplete; no feat-067 completion or audit decision is asserted. Generated coverage is `complete: false`.
- [x] Recheck runtime lesson review evidence against every block-support claim and its transitive claim dependencies. Runtime tests reject missing evidence, omitted direct support, and omitted transitive support; the post-fix knowledge suite reports 171 tests passed.
- [x] Bind versions, selected records, evidence, topics, used project metadata, and sanitized source metadata into the snapshot payload. C3 tests passed; current released projection has no project contracts.
- [x] Canonicalize declared reference sets while preserving other array order. C3 tests passed.
- [x] Test semantic order changes and unordered-reference reordering. C3 tests passed.
- [x] Generate the `liuyao-knowledge-snapshot-v1:sha256:<64 lowercase hex characters>` identity. C3 tests passed.
- [x] Test irrelevant ordering/edits and local-path exclusion. C3 generator checks passed.
- [x] Test generator projection, API, identity, navigation, and runtime gates. C3 check: 167 tests across 19 files passed.
- [x] Test V1/V2 list/get, sanitized source APIs, and adapter compatibility. C3 package tests/typecheck passed.
- [x] Preserve lesson/project claim compatibility text and existing IDs. C3 tests passed.
- [x] Test identity, unavailable navigation, and runtime release checks. C3 tests passed.
- [x] Run C3 knowledge package tests, typecheck/build, and corpus/book checks. Initial suite: 167 tests across 19 files; post-fix knowledge suite: 171 passed. Package typecheck/build and corpus/book checks passed.

## Checkpoint 4: Full verification and handoff

**Files:** Package-owned tests and generated corpus output only when validation legitimately regenerates it; update `features/feat-101.md` and append a `progress.md` block with the verified result and next action.

- [x] Confirm 173 protected V1 records/schema files are byte-identical to base. Passed.
- [x] Run root `pnpm typecheck` to check the legacy union APIs, exports, and adapter compatibility. Passed.
- [x] Run root `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Passed; lint has zero errors and four baseline UI warnings. Cleanup removed six new-test warnings.
- [x] Run `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`. Passed: 172 records, 1,226 claims, 1,015 citations, and supplied-edition fingerprints.
- [x] Run `./init.sh`. Receipt `sh_10215cc44001Abxn70zd09XAk5` passed format, lint (zero errors; four baseline warnings), typecheck, build, exports, test placement, and 352 tests. Corpus/book check passed: 172 records, 1,226 claims, 1,015 citations, and supplied-edition fingerprints.
- [x] Record passed commands, test counts, evidence limits, and next action in the feature handoff. Do not mark feat-101 done before independent review and delivery gates.

**Current gate status:** Root format, lint, typecheck, 352 tests (181 core, 171 knowledge), build, exports, placement, corpus, and book fingerprint checks passed. Lint has zero errors and four baseline warnings; six new-test warnings were removed, then targeted lint, 20 tests, and typecheck passed. Protected V1 comparison passed for 173 files. Init `sh_10215cc44001Abxn70zd09XAk5` passed. Independent review, CI/PR, and acceptance remain pending; do not mark done.

## Verification and evidence boundaries

Use package-owned tests because repository policy disallows application test suites. Run the focused checkpoint tests before broader verification. Full verification is `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`, and `./init.sh`.

Structural validation does not establish source meaning. Snapshot review metadata describes the evidence present; it does not establish independent specialist approval. Do not implement audit-decision ledgers or bulk lesson/figure/convention authoring here; feat-067 owns later audit-decision binding.

**Runtime evidence:** `assertReleaseEvidenceIntegrity` rechecks lesson review coverage for block supports and transitive dependencies. Release tests reject missing review evidence and omissions of direct or transitive support. This confirms structural coverage only; it does not certify source meaning or specialist approval.
