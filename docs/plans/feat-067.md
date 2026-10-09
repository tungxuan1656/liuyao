# Versioned Audit Ledgers and Completion Gates Implementation Plan

> **Execution:** Follow repository implementation and verification rules. Keep feat-067 active and preserve coordinator ownership of validation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add versioned, inventory-bound review decisions and evidence-derived gates without changing the feat-101 release payload or public APIs.

**Architecture:** Project the canonical source inventory into an explicit, hash-bound expected-unit registry. Validate strict version-1 registries, ledgers, and optional real certification; derive current decisions, transitive freshness, completion gates, and a separate audit report from their recorded inputs.

**Tech Stack:** UTF-8 JSON, strict JSON Schema, Node.js ESM validation scripts, TypeScript-compatible generated corpus contracts, Vitest, SHA-256, and pnpm.

## Global Constraints

- Treat `docs/reviews/knowledge/source-inventory.md` as the canonical source-unit inventory; never parse Markdown or heading counts to derive units.
- Use strict version-1 schemas for expected units, audit ledgers, and optional certification; reject unknown versions and malformed targets.
- Define the inventory revision as SHA-256 of the exact canonical inventory bytes. Bind it and the registry schema version into the explicit registry; report registry hash and counts, including when there are no decisions.
- Update the inventory and its projection together when the inventory changes; gate source-review changes on actual inspection. Byte hashes and counts prevent accidental shrinkage but cannot prove a manually updated inventory is complete.
- Keep mapped-unit counts distinct from proof that all fine-grained source units and layers are known. A group gate stays closed until inventory discovery and actual source-layer rosters are resolved by inspection.
- Require each hexagram overview and each of six positions for NHL, PBC, and NTT: 192 overview cells plus 1,152 position cells, 1,344 total.
- Keep the six edition-specific Càn/Khôn special units separate from six-position units. Do not invent source-layer rows or expand ranges not established by the inventory.
- Preserve each expected unit's source edition, PDF locator, group, and planned author/audit owner; keep nested/shared-page children attached to explicit parents.
- Require reviewed source evidence for present and absent layer decisions. An empty list or inventory candidate alone never proves absence. Required source-book categories cannot be omitted by an author or ledger claim.
- Keep source comparison, specialist review, certification, and feat-101 publication identity distinct. Source comparison records actual comparison identity, reviewer, date, scope, and evidence; do not create a reviewer registry. Schema checks and reviewer-name blocklists cannot prove identity, independence, or qualification.
- Keep current real ledger decisions at zero and omit certification until feat-096 records an actual specialist decision. Name/role fields or schema checks cannot prove qualification.
- Keep malformed schemas, IDs, targets, duplicate current decisions, invalid revisions, missing dependencies, and cycles as structural errors; keep legitimate missing or stale evidence as closed gates.
- Make `--require-complete` fail closed. Normal partial corpus validation and the existing release remain usable when gates are closed.
- Preserve deterministic feat-101 canonicalization: UTF-16 object-key ordering, field-aware set handling, semantic array order, and SHA-256.
- Leave authored content and existing public publication behavior unchanged. Do not alter 172 authored V1 records, generated release JSON/TypeScript, or the current publication API without a separate meaningful content change; none is planned.
- Keep synthetic test inputs in memory inside package tests only. Do not place them in real audit paths or claim real filesystem evidence; fixtures establish validator behavior, not source review, reviewer qualification, or approval.
- CI binds recorded source SHAs and source-catalog provenance; it does not require PDFs or claim their presence proves inspection. `--check-books` remains a local fingerprint check.
- Do not add UI, doctrine, bulk authoring, new dependencies, or source-audit decisions.

## File Map

| Path                                                           | Responsibility                                                                                                        |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `docs/design-docs/knowledge-model.md`                          | Canonical audit contract, evidence limits, hashing, and gate behavior.                                                |
| `docs/reviews/knowledge/expected-units.json`                   | Explicit inventory-derived machine registry with revision/hash binding and stable parent/child obligations.           |
| `docs/reviews/knowledge/ledgers/<scope>.json`                  | Scoped, append-only decisions and their exact evidence/input bindings.                                                |
| `docs/reviews/knowledge/ledgers/README.md`                     | Committed ledger-directory marker; missing root is structurally invalid.                                              |
| `docs/reviews/knowledge/certification.json`                    | Optional actual specialist decision; absent until real review occurs.                                                 |
| `packages/knowledge/schema/expected-units-v1.schema.json`      | Strict expected-unit registry schema.                                                                                 |
| `packages/knowledge/schema/audit-ledger-v1.schema.json`        | Strict scoped ledger and decision schema.                                                                             |
| `packages/knowledge/schema/audit-certification-v1.schema.json` | Strict optional certification schema.                                                                                 |
| `packages/knowledge/scripts/audit-registry.mjs`                | Validate registry shape, inventory binding, stable membership, counts, and parent/child obligations.                  |
| `packages/knowledge/scripts/audit-inputs.mjs`                  | Compute exact direct/transitive evidence closure and current input hashes using feat-101 canonicalization.            |
| `packages/knowledge/scripts/audit-decisions.mjs`               | Validate append-only revision chains and derive one current decision per expected target.                             |
| `packages/knowledge/scripts/audit-gates.mjs`                   | Resolve source/layer obligations, freshness, approval, and closed-by-default completion gates.                        |
| `packages/knowledge/scripts/audit-status.mjs`                  | Produce separate deterministic `packages/knowledge/reports/audit-status.json` without changing release identity.      |
| `packages/knowledge/scripts/corpus-checks.mjs`                 | Integrate structural audit validation and fail on malformed artifacts, not valid incomplete evidence.                 |
| `packages/knowledge/scripts/corpus-coverage.mjs`               | Replace the fixed completion value with the evidence-derived coverage gate while preserving existing coverage fields. |
| `packages/knowledge/scripts/validate-corpus.mjs`               | Load audit inputs, emit/check audit status, and support `--require-complete`.                                         |
| `packages/knowledge/package.json`                              | Add only necessary validation script options/commands; keep dependency set unchanged.                                 |
| `packages/knowledge/tests/audit-registry.test.mjs`             | In-memory registry schema, binding, count floors, and child-obligation cases.                                         |
| `packages/knowledge/tests/audit-ledger.test.mjs`               | In-memory target, revision history, exact inputs, evidence, and reviewer-status cases.                                |
| `packages/knowledge/tests/audit-gates.test.mjs`                | In-memory layer resolution, invalidation, specialist status, and `--require-complete` cases.                          |
| `packages/knowledge/tests/audit-status.test.mjs`               | In-memory report totals, identity bindings, freshness, and generated-output cases.                                    |
| `packages/knowledge/data/README.md`                            | Route proposed audit artifacts without describing them as implemented authored data.                                  |
| `docs/reviews/knowledge/source-inventory.md`                   | Keep inventory ownership and link to the canonical audit contract.                                                    |
| `docs/development.md`                                          | Add minimal audit validation/check commands only after implementation establishes them.                               |
| `features/feat-067.md`                                         | Track acceptance, verification, and handoff.                                                                          |
| `progress.md`                                                  | Append one result block after implementation verification; do not edit earlier history.                               |

## Ordered Implementation

### Task 1: Freeze the inventory projection and strict schemas

**Files:** Create the three schema files and `docs/reviews/knowledge/expected-units.json`; add the inventory responsibility link only if it needs repair. Put all validator test values in in-memory package tests, not fixture files or real audit paths.

**Interface:** Implement the exact version-1 registry shape in the canonical [audit contract](../design-docs/knowledge-model.md#migration-history): inventory path and byte-level SHA-256, integer registry revision/counts, observed layer vocabulary and source anchors, overview/position cells, edition-specific Càn/Khôn specials, source groups, and exclusions. Preserve explicit parent/child obligations, edition locators, and planned owners. Reject unknown properties and unsupported versions. Do not add guessed layers or IDs. Treat the complete shape, enums, and cross-reference invariants in the linked contract as normative; do not infer properties from illustrative placeholder rows.

- [ ] Build the registry by explicit review against the inventory, including all known stable parent and child IDs; do not use a general Markdown parser.
- [ ] Encode 64 overview units with three edition cells and six positions across three editions; assert 192 overview plus 1,152 position cells equals 1,344.
- [ ] Add six unique edition-specific Càn/Khôn special obligations using registry-owned IDs derived from edition and canonical parent; each points to its existing source-unit parent until finer IDs are assigned. Add 64 BPCT boards; chapter-5 items 01–18 plus the separate unnumbered postscript; chapter-6 labels 01–69; questions 01–18; Hà Tri 01–60; and casting I as its known parent only, II-01–64, IV-01–08, V-01–18, and VI-01–11. Keep casting I's four definitions unresolved under `bpct-casting-I` until source inspection and a joint inventory/registry update establish stable child IDs and individual locators. Do not add a casting-III row.
- [ ] Add established PBC/NHL Hệ Từ chapters, front matter/diagrams, classical groups, explicit exclusions, criticisms I–XV, NTT's nine named figures and notes 01–12, and NHL's seven introductions plus Part II framing; reuse exact inventory IDs, not normalized display-label IDs.
- [ ] Keep unresolved meaningful-group discovery and layer rosters open. Only inspected inventory closure can mark them resolved; known layer vocabulary does not resolve occurrence.
- [ ] Bind optional registry `recordIds` to current authored records. Allow `authoredScope: none` only for registered targets with no record mappings, confirmed against the current manifest; still require source/locator/layer evidence and never infer acceptance from omitted `inputs.records` or an empty claim list.
- [ ] Add in-memory cases that reject duplicate IDs, missing parents, broken child references, invalid catalog references, altered inventory binding, counts below 64/384/192/1,152/1,344 floors, silent roster shrinkage, and range expansion absent from source inventory.
- [ ] Run `pnpm --filter @liuyao/knowledge exec vitest run tests/audit-registry.test.mjs` with in-memory schema cases. Require all synthetic cases to pass.

### Task 2: Validate ledgers, reviewer evidence, and revision history

**Files:** Create `packages/knowledge/scripts/audit-decisions.mjs`, `packages/knowledge/scripts/audit-inputs.mjs`, and `packages/knowledge/tests/audit-ledger.test.mjs`. Keep all synthetic ledgers and certifications in memory inside package tests.

**Interface:** Implement the strict version-1 ledger and discriminated target/decision fields in the canonical [decision contract](../design-docs/knowledge-model.md#migration-history). A ledger scope identifies a hexagram or group. A decision binds target, exact covered claim IDs, locator, layer resolution, exclusion disposition when relevant, source comparison, specialist-review state, authored scope, and recorded direct/transitive inputs. Revisions are append-only and derive current heads without mutating history.

**Frozen shapes:** Follow the exact envelope, decision fields, target variants, exclusion-review object, specialist-review object, source-comparison object, and per-layer object specified in the linked contract. All objects reject additional properties. `none` scope requires an empty claim list and independently verified absence of mapped records; `records` requires a nonempty exact claim list.

- [ ] Validate all target variants against the registry and reject unknown, duplicate, or out-of-scope targets.
- [ ] Derive exact inputs from `coveredClaimIds` for all record/line/special claims, release flags, citations, edition SHAs, used project revisions, registered fixture dependencies, and typed lesson/table/figure support.
- [ ] Require recorded input IDs and hashes to equal derived closure. Unknown/malformed IDs and deleted/retired targets fail structurally; valid but added/removed dependency IDs or changed hashes/release/project revisions make the decision stale and close gates.
- [ ] Test a formerly valid decision whose current inputs gained a required binding and one that retains an obsolete but still-resolving binding; both are stale, not accepted or fatal.
- [ ] Reuse feat-101 deterministic hash behavior, preserve semantically ordered arrays, and test locale-independent identities.
- [ ] Derive current entries from append-only revision chains; allow prior payloads to retain historical status without requiring an edited `supersededBy` field.
- [ ] Validate actual source-comparison identity, reviewer, date, scope, and evidence separately from specialist-review status. Do not add reviewer-registry identity/revision fields or a reviewer registry artifact.
- [ ] Do not treat reviewer name uniqueness, blocklists, or identity strings as proof of specialist qualification. Reserve actual qualifying review for feat-095 and certification for feat-096.
- [ ] Test missing/stale every-input bindings, malformed chains, duplicate current decisions, real-versus-fixture metadata, and unchanged prior history.
- [ ] Run `pnpm --filter @liuyao/knowledge exec vitest run tests/audit-ledger.test.mjs` and require all synthetic cases to pass.

### Task 3: Implement layer obligations and evidence-derived gates

**Files:** Create `packages/knowledge/scripts/audit-gates.mjs` and `packages/knowledge/tests/audit-gates.test.mjs`; update the registry/ledger tests only for cross-boundary cases.

**Interface:** Gate evaluation consumes a validated registry, current ledger decisions, current source/record input hashes, and optional certification. It returns scoped decisions, unresolved obligations, affected/stale units, source-review status, certification status, and a boolean completion result. A missing or stale decision closes a gate without making a structurally valid corpus invalid.

- [ ] Require per-scope `layerResolution.status` and exactly one decision for each registered `layerScopeIds` entry, with nonempty citation IDs, presence, and basis `inspected-page`, `non-content`, or `source-omission`; unknown/out-of-scope IDs and uncovered layers keep gates closed. Preserve classes `original-text`, `translation`, `author-commentary`, `commentator`, `translator-note`, and `supplement` as source vocabulary, not universal cell requirements.
- [ ] Keep unknown layer roster and fine-unit discovery unresolved. Empty scopes and empty resolved-present lists are not vacuously accepted; require inspected, justified non-content or source-omission disposition where applicable. Do not omit required categories by author assertion.
- [ ] Require exclusion `exclusionReview` to include exact reason, locator, scope, and reviewer evidence; allow non-content disposition without doctrinal claims.
- [ ] Invalidate changed direct and transitive supports across every feat-101 evidence surface, including lesson prerequisites/blocks, tables, figures, labels, orientation, alternatives, review claims, and expected fixtures; preserve unaffected current decisions.
- [ ] Treat missing dependency references and cycles as structural failures. Treat missing, stale, rejected, unresolved, and unapproved decisions as closed gates.
- [ ] Keep specialist decisions separate from source comparison. Schema validation, name blocklists, or distinct identity strings cannot establish identity, independence, or qualification; actual qualifying review and certification remain feat-095/096 gates, with no fabricated approval here.
- [ ] Test unknown layer roster, missing/absent decisions, exclusions, every changed input category, prerequisite cycles, transitive fixture support, affected versus unaffected units, absent approval, and closed-gate versus malformed-ledger behavior.
- [ ] Test `--require-complete` failure on valid incomplete evidence and success only when all registry, layer, decision, freshness, and approval obligations pass.
- [ ] Run `pnpm --filter @liuyao/knowledge exec vitest run tests/audit-gates.test.mjs` and require all synthetic cases to pass.

### Task 4: Integrate corpus validation and separate audit reporting

**Files:** Modify `packages/knowledge/scripts/corpus-checks.mjs`, `corpus-coverage.mjs`, and `validate-corpus.mjs`; create `audit-status.mjs`, `tests/audit-status.test.mjs`, and generated `packages/knowledge/reports/audit-status.json`; update `packages/knowledge/package.json`, `packages/knowledge/data/README.md`, and `docs/development.md` with the implemented route/commands.

**Interface:** Normal corpus validation fails on malformed artifacts but accepts valid partial/stale evidence and emits closed gates. `--require-complete` fails on closed required gates. Implement the exact audit-status and optional certification JSON shapes in the canonical [audit contract](../design-docs/knowledge-model.md#migration-history). Preserve feat-101 release outputs, snapshot review-metadata meaning, and runtime API.

- [x] Require the committed `docs/reviews/knowledge/ledgers/README.md` ledger-root marker. A missing root is structural failure; an existing empty root is valid with zero decisions and closed gates. Keep absent certification valid in normal validation.
- [ ] Load strict schemas; unknown/malformed IDs, hashes, and targets; deleted/retired target mappings; duplicate heads; invalid chains; missing structural dependencies; and cycles fail validation.
- [ ] Treat valid added/removed resolved input IDs and changed hashes, release flags, or project revisions as stale decisions and closed gates; test missing-new and obsolete-old bindings.
- [ ] Derive source-review completion only when every current released claim surface is covered by a current accepted decision or precise reviewed exclusion. Include record/line/special claims, tables, figures, labels, orientation, alternatives, review claims, lesson blocks/typed targets, and prerequisite support. Report exact `releasedClaimsCovered` and `releasedClaimsRequired` counts.
- [ ] Derive table, figure, lesson, typed-target, and expected-fixture obligations from feat-101 support relationships and explicit registry/ledger bindings; tie fixture dependencies to owning claims and do not invent source-unit IDs.
- [ ] Derive `sourceReview` and `certification` independently. A passing completion boolean is not certification and cannot waive it; actual certification belongs to feat-096.
- [ ] Report overview, position, and combined cell counts separately and accurately: 192, 1,152, and 1,344 respectively. Report actual approved decisions, not the number of authored hexagrams.
- [ ] Hash the registry even when its decision set is empty. Bind status fields to content identity, registry SHA/revision/counts, current decision set, canonical ledger-file identity, and totals. Bind optional certification to content identity, registry SHA/revision, decision-set SHA, and actual specialist metadata without self-hashing.
- [ ] Keep `packages/knowledge/reports/audit-status.json` outside authored data and generated public release data. Preserve the existing release JSON, TypeScript wrapper, content snapshot identity, and public API byte-for-byte when no content changes.
- [ ] Keep CI independent of local PDF availability while checking recorded source SHAs/catalog provenance. Keep `--check-books` as an explicit local check.
- [ ] Test fresh generation and `--check`, empty decisions/certification absence, changed registry hash/count, source fingerprint staleness without PDFs, closed partial release, `--require-complete`, and unchanged release outputs/API. Keep supplied-PDF `--check-books` as an explicit local check, not a CI requirement.
- [ ] Run `pnpm --filter @liuyao/knowledge exec vitest run tests/audit-status.test.mjs tests/book-validation.test.mjs tests/book-generator.test.mjs` and require all selected tests to pass.

### Task 5: Verify, document evidence, and hand off

**Files:** Update `features/feat-067.md`; append one new `progress.md` entry only after material verified results change; do not rewrite prior progress history.

- [x] Run focused audit tests and `pnpm --filter @liuyao/knowledge validate:corpus --check`.
- [x] Run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- [x] Run `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` locally when all supplied PDFs are available; report any environmental skip without substituting CI evidence.
- [x] Run `./init.sh` and record the exact result. Do not broaden scope to fix unrelated baseline failures.
- [x] Compare authored V1 records and generated public release JSON/TypeScript to the pre-feature baseline; require byte identity because no content change is planned.
- [x] Confirm no real audit decisions or certification were manufactured, all links resolve, and feature acceptance reflects evidence rather than intended work. The real ledger is empty and certification is absent.
- [x] Record verified commands, results, blockers, and one concrete next action in the feature handoff and append-only progress record.

## Verification Matrix

| Case                                                                                                                     | Expected result                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unknown schema version, malformed JSON/hash/ID/target, deleted/retired mapping, duplicate head, or broken revision chain | Structural validation fails and requires explicit repair.                                                                                                                              |
| Expected registry inventory revision/hash mismatch or silent denominator shrink                                          | Structural validation fails; never substitutes a smaller roster.                                                                                                                       |
| Registry has mapped parents but unresolved fine units/layers                                                             | Group gate stays closed; mapped count is not full-inventory proof.                                                                                                                     |
| 64 overview and 384 × three edition positions                                                                            | Report 192 overview, 1,152 position, and 1,344 combined cells.                                                                                                                         |
| Missing source layer list or candidate-only source locator                                                               | Gate stays closed; no absence inference.                                                                                                                                               |
| Resolved absent layer with inspected evidence and justified disposition                                                  | Require exact per-scope registered-layer closure; no cross-cell assumptions.                                                                                                           |
| Exclusion with no reason, exact locator, scope, or reviewer                                                              | Decision is incomplete and gate stays closed.                                                                                                                                          |
| Missing newly required binding or obsolete-but-resolving recorded input                                                  | Decision is stale; validation passes with gate closed.                                                                                                                                 |
| Malformed hash/ID/schema, unknown or deleted/retired target, broken revision chain, or duplicate head                    | Corpus validation fails and requires explicit artifact repair.                                                                                                                         |
| Legitimate missing, stale, rejected, unresolved, or pending-specialist decision                                          | Normal validation passes with gate closed; `--require-complete` fails.                                                                                                                 |
| Missing structural dependency or dependency cycle                                                                        | Corpus validation fails.                                                                                                                                                               |
| Append replacement revision without editing historical `supersededBy`                                                    | Current decision derives from the chain; previous history remains intact.                                                                                                              |
| Change each direct/transitive input and expected-fixture dependency                                                      | Affected decisions stale; unaffected decisions remain current.                                                                                                                         |
| Synthetic fixture claims specialist approval                                                                             | Fixture tests gate behavior only; reviewer identity and qualification remain unproven; real certification remains absent.                                                              |
| Current content snapshot and decision set                                                                                | Audit status binds `contentSnapshotIdentity`, `registry: { sha256, revision, counts }`, `decisionSetSha256`, and `reviewEvidenceIdentity` without changing feat-101 snapshot identity. |
| Empty real ledger directory                                                                                              | Structural validation passes with zero decisions and closed gates.                                                                                                                     |
| Missing real ledger directory                                                                                            | Structural validation fails.                                                                                                                                                           |
| Newly released claim/target outside recorded claim coverage                                                              | Required released coverage increases; source-review gate stays closed.                                                                                                                 |
| `authoredScope: none` with an omitted `inputs.records` field                                                             | Structural target/shape check does not infer absence; gate remains closed unless registry and manifest prove no record mapping.                                                        |
| Malformed source-input ID/hash versus a valid but changed input closure                                                  | Malformed value fails structurally; valid changed/missing/extra binding marks the decision stale.                                                                                      |
| Newly released uncovered claim or dependent table/figure/lesson/fixture                                                  | `releasedClaimsRequired` rises; source-review completion stays closed.                                                                                                                 |
| `authoredScope: none` on target with mapped authored records                                                             | Structural validation fails; `none` cannot hide current claims or omit `inputs.records` as proof.                                                                                      |
| Certification absent or synthetic specialist review                                                                      | Normal validation passes with certification closed; no actual certification claim.                                                                                                     |
| CI has recorded PDF SHAs but no local PDF files                                                                          | Structural/freshness checks work without claiming PDF presence or visual review.                                                                                                       |
| No meaningful corpus-content change in feat-067                                                                          | Authored V1 files and generated public release JSON/TypeScript remain byte-identical.                                                                                                  |

## Current evidence and handoff

- **State:** Done for implementation and verified acceptance; PR #63 awaits final lifecycle-head CI and merge.
- **Exact-SHA review:** On `9a347b365a554fd85767d0ece97b67d5a5fcdbea`, review closed F1/F2/F3/F7 with no material findings; 37 focused tests reproduced. The 175 protected outputs/data files were unchanged.
- **Coordinator verification:** Fresh `./init.sh` receipt `sh_105d93047001obGaDflxxH16W3` passed 391 tests (181 core, 210 knowledge), typecheck, build, exports, length, lint (four baseline warnings), and corpus/book freshness. `--require-complete` exited 1 as expected with closed gates. CI run `37186502264`, job `111389426336`, and Cloudflare/GitGuardian passed for PR #63 head `9a347b3`; final lifecycle-head CI and merge remain pending.
- **Protected identity:** 175 protected files (172 V1 records, V1 schema, release JSON, and typed wrapper) remain byte-identical; snapshot identity is unchanged at `da736ea2c73cabe55317ca8babe86e0ea022b4bd6c52c576fc95c0c82191c67e`.
- **Observed gates:** Registry has 1,344 cells, 6 specials, 518 groups, and 17 exclusions. Fourteen layer rosters and 518 group discoveries remain unresolved. All 2,057 required targets lack current decisions; released claim coverage is 0/1,226. No source review or certification is claimed.
- **Report shape:** The coordinator approved the generated `gates.sourceReview` and `gates.certification` objects as the canonical report representation. `complete` remains derived from both required gates and validation; this clarification does not weaken evidence, approval, or stale-input conditions.
- **Proof limits:** F4-F6 limits above remain as documented in the canonical model: census validation is bounded, absent-layer basis is restricted, and no real fixture bindings are registered. These are implementation evidence limits, not claims of source facts, specialist approval, or certified corpus completion. The audited gate state remains closed: 2,057 missing decisions, zero current, 0/1,226 released claims covered, and certification absent.
- **Next:** Merge PR #63 after final lifecycle-head CI passes, then activate feat-097 for the correction drill. Do not claim the PR is merged.
