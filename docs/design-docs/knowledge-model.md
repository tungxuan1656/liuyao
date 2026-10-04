# Knowledge model

This document owns structured knowledge boundaries, schema classes, and source rules for `@liuyao/knowledge`.

## Flow

Reviewed source passage → curated record → schema validation → readonly lookup and search → web explanation.

- Book identity and source discrepancies → [Supplied book sources](../references/book-sources.md)
- Domain evidence and publication acceptance → [Knowledge quality](../product-specs/knowledge-quality.md)
- Calculation tables and derivations → [Liu Yao ruleset](liuyao-ruleset-v1.md)

## Boundary

`@liuyao/knowledge` explains domain IDs. It does not drive Liu Yao calculation.

If a table is required to calculate a result, place it in `@liuyao/core`.

Raw PDFs are research inputs. They are not runtime knowledge records or calculation inputs.
The application does not read books dynamically to construct a board.

## Observed storage

The authored corpus uses UTF-8 JSON under `packages/knowledge/data/`.
`manifest.json` selects record files, citations, and reviewed release IDs.
The package validates JSON Schema and cross-file invariants before type-checking or building.
It generates runtime imports and [coverage](../../packages/knowledge/reports/coverage.json) from those files.

`src/book-catalog.ts` exposes released records, citation locations, and edition metadata through readonly APIs.
`src/book-adapter.ts` maps reviewed entities, terms, rules, and citations into the existing catalog interfaces.
`data/legacy/catalog.json` retains unmigrated records with an explicit `unaudited` status.
Compatibility lists still contain all 64 hexagrams. Their presence does not imply supplied-book review.

The [data directory guide](../../packages/knowledge/data/README.md) maps content files and verification commands.
`src/book-schema.ts` defines the richer readonly types. `src/schema.ts` retains the compatibility shapes.
The web build bundles this local data for offline access.

## Storage assessment

**Observed choice:** Versioned JSON is the authored content source.
The compatibility adapter preserves existing package interfaces.
A database remains a future option.

| Option                           | Fit                                                     | Requirement                                                                 |
| -------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| TypeScript compatibility exports | Adapted access to current JSON records                  | Review content and preserve schema checks.                                  |
| JSON files                       | Content editing, import/export, and independent tooling | Validate at the package boundary. Keep one authored source.                 |
| Local database such as IndexedDB | Future saved readings or a large local index            | Define migrations and recovery. Keep canonical reference content versioned. |
| Server database                  | Future shared editing or synchronization                | Define ownership, publication, and an offline snapshot contract.            |

A database does not correct an inaccurate claim or missing citation.
For current data volume and topology, it adds no required calculation capability.
Saved readings and curated knowledge have different lifecycles.
Adding reading history does not require moving reference knowledge into the same store.

Generate runtime TypeScript imports from the canonical JSON.
Do not maintain equivalent JSON and TypeScript records by hand.
Schema changes and new package dependencies require selected implementation work.
This implementation does not introduce a database.

## JSON corpus

**Status: Implemented for released corpus batches.** JSON Schema validates each collection before publication.
Existing lookup interfaces use a compatibility adapter.
The collection layout follows [Knowledge content](../product-specs/knowledge-content.md).

```text
packages/knowledge/data/
  manifest.json             collection files, declared topics, schema version, and release selection
  sources.json              works, supplied editions, fingerprints, and rights
  citations/                edition-specific passage locators
  terms/                    glossary records by topic
  trigrams/                 eight entity records
  hexagrams/                one record per hexagram, including six line entries
  casting/                  casting explanations and reviewed examples
  liuyao/                   foundational and advanced topic records
  lessons/                  learning articles linked to existing claims
```

Released batches populate trigrams, hexagrams, terms, casting, foundational Liu Yao, and selected advanced BPCT records.
Full line commentary, learning articles, and advanced coverage remain incomplete.
The [coverage report](../../packages/knowledge/reports/coverage.json) records current inventory and gaps.
JSON replaces equivalent authored TypeScript content.
Generated runtime imports follow the manifest.
Calculation-required data follows the ownership boundary above.

### Record contract

| Field           | Meaning                                                            |
| --------------- | ------------------------------------------------------------------ |
| `schemaVersion` | The selected collection schema version                             |
| `id`            | A stable record ID, preserving current domain identities           |
| `type`          | The collection-specific record type                                |
| `title`         | The canonical Vietnamese display title                             |
| `aliases`       | Reviewed Vietnamese search aliases                                 |
| `topicIds`      | References to declared content topics                              |
| `claims`        | Source-supported explanations and structural claims                |
| `relatedIds`    | Explicit relationships to other records                            |
| `review`        | Review status, evidence, date, and reviewer identity when reviewed |

Type-specific schemas define trigram patterns, hexagram composition, six line entries, special passages, and rule categories.
Calculation explanations identify their applicable ruleset.
A substantive claim contains its own citation IDs.
Interpretation claims also identify their attributed author or translator.
Provenance for a record does not automatically support every claim inside it.
The reviewed state of a record covers every included claim.
If any included claim remains unresolved, the record cannot enter the released catalog as reviewed.

The example below illustrates a draft rule record. It is not a released dataset entry.

```json
{
  "schemaVersion": 1,
  "id": "rule-line-position-order",
  "type": "rule",
  "title": "Thứ tự sáu hào",
  "ruleset": "liuyao-standard-v1",
  "category": "structure",
  "aliases": [],
  "topicIds": ["topic-casting"],
  "claims": [
    {
      "id": "claim-line-order-bottom-to-top",
      "kind": "structural-fact",
      "text": "Sáu hào được lập từ dưới lên, từ hào sơ đến hào trên cùng.",
      "citationIds": ["citation-bpct-ch1-x-p11"]
    }
  ],
  "relatedIds": [],
  "review": { "status": "draft" }
}
```

<a id="intended-extended-records"></a>

### Approved extended-record contract

**Contract: approved for feat-101. Implementation: partial.** Existing authored records remain version 1; no production V2 lesson, figure, or project-convention content has been authored. The inventory selects the bounded representations; the [source inventory](../reviews/knowledge/source-inventory.md) remains the authority for observed source units. Implemented portions and limits are recorded below.

| Contract                   | Version 2 fields and checks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Record dispatch            | Keep `schema/record.schema.json` as the unchanged version-1 schema. Dispatch integer `schemaVersion` 1 or 2 to its versioned schema; reject every other value. Version 2 retains version-1 fields and adds its own typed fields.                                                                                                                                                                                                                                                                                     |
| Migration                  | Provide a tested, non-mutating version-1-to-version-2 upcast for callers that need it. Leave the 172 authored version-1 JSON records byte-for-byte unchanged, and preserve their record and claim IDs and compatibility APIs. Do not bulk-migrate lessons, figures, or conventions.                                                                                                                                                                                                                                  |
| Lesson                     | A version-2 record with `type: "lesson"` has an ID in the `lesson-` namespace, positive integer `sequence`, unique `prerequisiteLessonIds`, and ordered `blocks`. Sequences are unique. Prerequisite IDs resolve to lessons and form an acyclic graph. Prerequisite-array order has no meaning.                                                                                                                                                                                                                      |
| Lesson block               | Each block has stable lesson-scoped `id`, one-based `position`, `kind`, and non-empty `supportingClaimIds`. Array index `i` must have `position: i + 1`. `prose` and `worked-example` blocks require non-empty `text`. `table` and `figure` blocks require a typed `{kind, recordId, id}` target. Their support claims must exist and be included in the target's evidence.                                                                                                                                          |
| Derivative review          | Version-2 review metadata adds `evidenceClaimIds`. A released lesson requires reviewed status and evidence IDs that resolve and cover every block's supporting claim. A released project-convention owner requires review evidence that covers its project-convention claims. This records review scope; it does not claim independent specialist approval.                                                                                                                                                          |
| Claim dependencies         | Version-2 claims can declare `dependsOnClaimIds`. Claim dependencies form an acyclic graph. A released dependent requires each direct and transitive supporting claim to belong to a reviewed record already selected for release. A dependency never adds a draft or unselected record to release membership.                                                                                                                                                                                                       |
| Project convention         | A version-2 `project-convention` claim has `citationIds: []` and non-empty `projectEvidence` entries containing `documentPath`, `section`, and `revision`. Other substantive book claims require citations and cannot use project evidence in place of them. Citation IDs are citation references, not claim-dependency edges.                                                                                                                                                                                       |
| Accepted project contracts | The optional manifest `projectContracts` registry contains `documentPath`, `revision`, and accepted `sections`. `documentPath` is a repository-relative path to a canonical document, without path escape. Build-time checks require the file and heading to exist and the non-empty reviewed-revision identifier to match the registry. These checks establish structure, not acceptance. Revision changes invalidate affected evidence. Do not advance the manifest schema version solely for this optional field. |
| Figure                     | A version-2 figure has stable `id`, bounded `kind`, `title`, and `inspectionStatus`. Non-plate kinds require non-empty `sourceUnitIds` and `claimIds`, plus ordered labels. Labels have stable figure-scoped IDs, non-empty text, and non-empty `claimIds`. Figures can retain `orientation` and attributed `authorAlternatives`, each bound to claim IDs. Kinds are `sequence`, `placement`, `transformation`, `board`, and `plate`. Do not store or copy image bytes. An uninspected `plate` is unreleasable.      |
| Table                      | Reuse the existing typed table kinds and row structures. Add optional record-scoped stable `table-*` `id`, non-empty `sourceUnitIds` when present, and attributed `authorAlternatives`. Keep existing table `claimIds`; table alternatives also require claim IDs. Typed lesson targets identify a table by `{recordId, id}` and require matching evidence. Calculation tables remain in `@liuyao/core` and are unchanged.                                                                                           |
| Navigation                 | Keep `relatedIds` as navigation only; they do not satisfy evidence or prerequisite checks. A bounded resolver returns either an available released record or an unavailable result, without exposing draft target details.                                                                                                                                                                                                                                                                                           |
| Runtime sources            | Keep authored source types with required local input paths separate from sanitized released source types. Preserve `listBookRecords`, `getBookRecord`, citation, and source lookup entry points and released bibliographic fields. Do not expose local paths in the released projection.                                                                                                                                                                                                                             |

The following names and shapes are the approved TypeScript contract for implementation:

```typescript
type BookFigureKind = 'sequence' | 'placement' | 'transformation' | 'board' | 'plate';
type BookFigure = {
  id: `figure-${string}`;
  kind: BookFigureKind;
  title: string;
  sourceUnitIds: readonly string[];
  labels: readonly { id: string; text: string; claimIds: readonly string[] }[];
  claimIds: readonly string[];
  inspectionStatus: 'uninspected' | 'visually-inspected';
  orientation?: { description: string; claimIds: readonly string[] };
  authorAlternatives?: readonly {
    author: string;
    via?: string;
    description: string;
    claimIds: readonly string[];
  }[];
};
type BookTableMetadata = {
  id?: `table-${string}`;
  sourceUnitIds?: readonly string[];
  authorAlternatives?: readonly {
    author: string;
    via?: string;
    description: string;
    claimIds: readonly string[];
  }[];
};
type BookLessonBlock =
  | {
      id: string;
      position: number;
      kind: 'prose' | 'worked-example';
      text: string;
      supportingClaimIds: readonly string[];
    }
  | {
      id: string;
      position: number;
      kind: 'table' | 'figure';
      target: { kind: 'table' | 'figure'; recordId: string; id: string };
      supportingClaimIds: readonly string[];
    };
type ProjectEvidence = { documentPath: string; section: string; revision: string };
```

Version-2 records use the existing common record envelope (`id`, `title`, `aliases`, `topicIds`, `claims`, `relatedIds`, `review`, and `rights`) with `schemaVersion: 2`. Add optional `figures` and extended table metadata to the v2 envelope. A lesson uses `type: "lesson"`, `sequence`, `prerequisiteLessonIds`, and ordered `blocks`; a project-convention claim uses `kind: "project-convention"`, empty `citationIds`, and non-empty `projectEvidence`. Version-2 claims add optional `dependsOnClaimIds`; lesson review adds `evidenceClaimIds`. The version-1 manifest schema gains an optional `projectContracts` list with `{documentPath, revision, sections}`, where `sections` lists canonical heading strings. Do not advance its schema version only for this optional field.

Record, claim, citation, and figure IDs are corpus-global. Table IDs are record-scoped, block IDs are lesson-scoped, and label IDs are figure-scoped. Reject duplicate IDs within the applicable scope. Author alternatives carry attribution and evidence, not stable IDs. `sourceUnitIds` are non-empty source-inventory IDs, but this feature does not create a source-unit registry or resolve them to an independent owner. Repeated source-unit references are valid.

Validate every declared claim reference across all records before release selection. The supporting-reference surfaces are `claim.dependsOnClaimIds`, `structure.claimIds`, record/line/special-passage claims, table `claimIds` and alternative `claimIds`, figure `claimIds`, label `claimIds`, orientation `claimIds`, figure-alternative `claimIds`, lesson-block `supportingClaimIds`, and lesson-review `evidenceClaimIds`. Each reference must resolve. Lesson review evidence must cover all block support claims. Project-convention record review evidence must cover its convention claims. Citation-bearing fields (`claim.citationIds`, review `evidenceCitationIds`, and discrepancy `citationIds`) resolve against citations and remain distinct from claim edges.

Released owners require each direct and transitive supporting claim to belong to a reviewed record already included in `releaseIds`. Missing, cyclic, draft, disputed, superseded, or unselected support fails closed. Never add a supporting record to release membership automatically. For each already selected supporting record, project that record's citations, review evidence, and discrepancy citation evidence. A table or figure target's evidence must include every block support claim. A negative fixture with a figure kind and empty inventory/evidence is invalid. Reorder fixtures must reject duplicate child IDs but accept repeated source-unit references.

Each non-plate figure requires non-empty `sourceUnitIds` and `claimIds`, plus at least one ordered label. This applies to `sequence`, `placement`, `transformation`, and `board`. Label array order is the source order; do not add a second position field. Every label needs non-empty claim evidence. Orientation and alternatives resolve their claim evidence. Keep label, order, and orientation formats bounded; do not add a generic diagram DSL. `plate` remains fail-closed until visually inspected. Do not invent or include image content.

Use separate version-1 and version-2 readonly types. `BookRecordV1` is the current validated version-1 input, and `BookRecordV2` is the extended shape. `listBookRecords` and `getBookRecord` expose the explicit union `BookRecordV1 | BookRecordV2`; do not weaken V1-only fields to represent V2. Name the distinct source types `AuthoredBookSource` and `ReleasedBookSource`. The authored type requires local input paths; the released type omits them. The compatibility adapter must safely handle lesson and other non-entity record types, and preserve project-convention claim text without changing stable IDs. JSON Schema, readonly types, migration behavior, package exports, compatibility adapter, and public projection must agree. Structural validation establishes shape and declared links; it does not certify meaning or prove that a figure was inspected.

The pure migration helper accepts a prevalidated `BookRecordV1` and returns `BookRecordV2`. It rejects null, arrays, non-objects, a missing version, and every version except `1`. It deep-copies the upcast and leaves the input unchanged. It does not import Ajv or another schema validator into `src/`. Build-time schema dispatch and tests reject malformed V1 fields. Test invalid fields through the corpus validator, and test helper guards and input immutability through the migration helper.

For project evidence, resolve paths under the repository root and reject path escape. At build time, require an existing canonical documentation file, an existing heading, a non-empty reviewed-revision identifier, and an exact match to the accepted registry entry. Every released project-convention claim must also appear in its owner's review evidence. Structural agreement does not prove that the repository accepted the decision. Use fixtures with an existing canonical document and an explicit test revision; do not label fixture values as real approval. Bind the used accepted project evidence and its registry values to the snapshot. Runtime uses only validated project metadata in the release projection and does not read documentation files. Feat-067 separately binds audit decisions to current project revisions.

Supporting dependencies establish evidence; ordinary `relatedIds` links establish navigation. Missing, draft, disputed, superseded, or unreleased evidence blocks released dependents. The [quality contract](../product-specs/knowledge-quality.md#completion-and-later-corrections) owns publication and invalidation requirements. The [Library contract](../product-specs/knowledge-browser.md#topics-and-articles) owns unavailable-link presentation.

<a id="intended-snapshot-identity"></a>

Each typed lesson target resolves by block kind, `recordId`, and child `id` within the specified record. Reject missing targets and mismatched owners or kinds. A released lesson requires the target's owning record in `releaseIds`. Reject duplicate or non-positive lesson sequence values.

### Approved release projection and snapshot identity

**Contract: approved for feat-101. Implementation: partial.** Validate every manifest-listed authored record, citation, source, and cross-file link. Generate runtime data from the validated release closure only:

- Include released records and supporting records only when those records already appear in release membership.
- Include citations reachable from released claims, plus required review and discrepancy evidence.
- Include only referenced editions and sanitized source/bibliographic metadata.
- Exclude draft prose, raw manifests, authored-source JSON imports, local PDF paths, and PDFs from runtime output.
- Keep a thin generated TypeScript wrapper over the release-generated JSON when the package needs typed imports.
- Retain runtime checks that reject ineligible records or broken release dependencies.

Expose an immutable `getBookSnapshotIdentity()` value. Compute it at build time as versioned canonical JSON hashed with SHA-256. The identity format is `liuyao-knowledge-snapshot-v1:sha256:<64 lowercase hex characters>`. Bind the canonical payload to record and manifest schema versions, release membership, released records and claims, reachable citations, relevant source and edition bibliography/provenance metadata, discrepancies, review scope/evidence metadata, used accepted project-contract revisions and sections, and exact public topic metadata when topics appear in the projection. Hash only exact sanitized source metadata that the runtime projection exposes. Changes to unused project registry entries do not change identity unless those entries are public semantic metadata.

Canonicalize object keys and only arrays defined here as sets: release membership, top-level record/citation collection membership, `claim.citationIds`, `claim.dependsOnClaimIds`, review `evidenceCitationIds` and `evidenceClaimIds`, discrepancy `citationIds`, `prerequisiteLessonIds`, `structure.claimIds`, table and figure `claimIds`, label/orientation/alternative `claimIds`, and block `supportingClaimIds`. Use field-aware canonicalization, never generic ID-array sorting. Preserve record claim order, lesson blocks, figure labels, table rows, sequence values, alternatives, `sourceUnitIds`, and source/bibliographic contributor order. Test that semantic order changes alter identity while set-reference reordering does not. Source provenance, public bibliography, release membership, records, claims, citations, discrepancies, review evidence, used accepted revisions, and exact projected topics must affect identity. Object-key order, draft-only edits, generation timestamps, local PDF paths, and unused non-public registry entries must not.

The released runtime payload must be draft-free even when bundled. Snapshot metadata reports the review scope and evidence present; it does not claim independent specialist approval. Feat-067 stores audit decisions and status separately; they do not change the public runtime identity or imply approval in the release payload. The [PWA contract](offline-pwa.md#intended-knowledge-scale-and-updates) owns asset loading and update behavior. Package version alone does not identify a reviewed corpus snapshot.

### Implemented surface and limits

- `scripts/record-schema-dispatch.mjs` dispatches authored records to the unchanged V1 schema or strict V2 schema. `scripts/validate-corpus.mjs` performs Ajv validation at build time. `src/book-migration.ts` provides the pure, deep-copy upcast for prevalidated `BookRecordV1` values; it does not perform full schema validation.
- The schema and package type shapes are covered by schema-dispatch, V2-schema, and migration fixtures; C1 reports 18 focused tests passed. Cross-file behaviors are covered by dependency, figure, lesson, project-evidence, validation, and release fixtures; C2 reports 107 focused tests passed. Projection, catalog, snapshot, and runtime cases are covered by the knowledge package suite; the post-fix run reports 171 knowledge tests passed. Runtime tests reject missing lesson review evidence and omissions of direct or transitive block-support claims. The coordinator also reports root format, lint, typecheck, test, build, corpus, and supplied-book checks passed; see the [feat-101 handoff](../../features/feat-101.md) for exact commands and remaining delivery gates.
- `scripts/corpus-checks.mjs` and its evidence, figure, lesson, and project helpers validate cross-file references, release evidence, lesson ordering and targets, bounded figure evidence, and project-document structure. Lesson review-evidence coverage checks run for lessons whose `review.status` is `reviewed`; draft lessons do not receive that coverage check. Project path and heading checks establish structural matches, not approval or semantic correctness.
- `scripts/release-projection.mjs` generates the release-only payload at `src/book-release.generated.json`; `src/book-data.generated.ts` is its typed wrapper. The generated payload is outside authored `data/`, and local edition input paths are removed. Generation freshness checks cover the JSON and TypeScript outputs. The current generated projection has an empty `projectContracts` list; project metadata behavior is present in validation/projection code but is not exercised by released V2 content.
- Public record lookup in `book-catalog.ts` uses `BookRecordVersioned` (`BookRecordV1 | BookRecordV2`). Public sources there use `ReleasedBookSource`, which omits edition `localInputPath`; authored sources retain it. The root `src/index.ts` re-exports `book-catalog.ts` APIs and versioned schema types. `getBookSnapshotIdentity()` exposes the generated, versioned identity.
- Runtime integrity checks revalidate released records, claim/citation links, targets, source editions, project metadata, and lesson graph shape. `assertReleaseEvidenceIntegrity` also checks that each released lesson's review evidence covers every block-support claim and its direct and transitive claim dependencies; runtime tests cover missing, direct, and transitive evidence cases.
- Runtime and build checks enforce release and evidence structure; they do not certify source meaning, specialist approval, audit decisions, or corpus completion. Format, lint, typecheck, test, build, corpus, supplied-book, and `./init.sh` checks passed. PR #62 awaits final-head CI and merge; see the [feat-101 handoff](../../features/feat-101.md) for its current delivery state.

### Approved versioned audit contract

**Contract: approved for feat-067.** This section owns the audit data contract. The [source inventory](../reviews/knowledge/source-inventory.md) remains the canonical source-unit crosswalk; audit artifacts project its IDs and obligations without replacing it. The [quality contract](../product-specs/knowledge-quality.md#full-corpus-verification) owns evidence acceptance. Feat-097 owns correction probes, feat-095 owns actual specialist review, and feat-096 owns final certification. The implementation validates the registry and scoped audit artifacts, derives closed-by-default gates, and generates a separate report. These structural checks do not establish source review or specialist approval. The schema paths are `packages/knowledge/schema/expected-units-v1.schema.json`, `audit-ledger-v1.schema.json`, and `audit-certification-v1.schema.json`.

#### Version-1 registry

Store the explicit projection in `docs/reviews/knowledge/expected-units.json`. Inventory Markdown remains for humans; never parse headings or guessed count ranges to create expected units. Define `inventory.sha256` as SHA-256 of the exact inventory bytes. When its revision changes, update the inventory and registry together. A schema-valid smaller projection is not sufficient evidence that inventory closure was reviewed. Review the paired inventory/registry revision change against source evidence; hash and count checks prevent accidental shrinkage but cannot prove a revised inventory is semantically complete.

The version-1 registry has this exact top-level JSON shape. Arrays and nested IDs are explicit projection data, not parser output. This empty structural example is not the real inventory or valid evidence. It uses integer revision/count fields; the populated hexagram, group, and exclusion entry shapes and invariants are described below:

```json
{
  "schemaVersion": 1,
  "registryId": "knowledge-expected-units-v1",
  "registryRevision": 1,
  "inventory": {
    "path": "docs/reviews/knowledge/source-inventory.md",
    "sha256": "<64 lowercase hex>"
  },
  "counts": {
    "overviewCells": 192,
    "positionCells": 1152,
    "hexagramCells": 1344,
    "specialPassages": 6,
    "groups": 0,
    "exclusions": 0
  },
  "layers": [
    {
      "id": "<stable inventory ID>",
      "editionId": "<edition ID>",
      "class": "original-text",
      "label": "<observed source label>",
      "sourceAnchor": { "inventoryAnchor": "<inventory locator>", "citationIds": [] },
      "rosterStatus": "unresolved"
    }
  ],
  "hexagrams": [],
  "specialPassages": [],
  "groups": [],
  "exclusions": [
    {
      "id": "<stable inventory ID>",
      "sourceUnitId": "<stable inventory ID>",
      "kind": "<inventory disposition>",
      "inventoryAnchor": "<inventory locator>",
      "editionId": "<edition ID>",
      "auditFeatureId": "<feature ID>",
      "layerScopeIds": ["<edition-scoped layer ID>"]
    }
  ]
}
```

The registry shape is normative; its example rows and counts are placeholders, not facts from the current inventory. Actual `groups` and `exclusions` are integer counts computed from all projected rows. Omit inapplicable optional fields rather than inventing values. Populate IDs, anchors, and citation links only from verified inventory/corpus data. The closed layer vocabulary is `original-text`, `translation`, `author-commentary`, `commentator`, `translator-note`, and `supplement`; it names observed classes, not per-cell presence. `groups[].kind` is `content` or `non-content`; `discoveryStatus` is `unresolved` or `resolved`. Each `layerScopeIds` value references an ID in the registry's `layers` array, scoped to its edition; do not combine books into one assumed layer roster. Start each uninspected layer and meaningful group at `unresolved`; known vocabulary does not establish which layers are present in any scope. Unknown fine units and layers remain required obligations; a `mapped` denominator alone never proves full inventory closure. Stable cell and special-obligation IDs may be registry-owned keys derived from an established parent/edition relationship; they identify audit obligations, not newly asserted source-fact IDs. A special obligation references its existing canonical source-unit parent until the source inventory records a finer stable child ID.

The top-level properties are exactly `schemaVersion`, `registryId`, `registryRevision`, `inventory`, `counts`, `layers`, `hexagrams`, `specialPassages`, `groups`, and `exclusions`. `registryRevision` is a positive integer incremented on projection revisions. Reject additional properties throughout. `parentId` and `number` are present only when established by the source inventory; `recordIds` is optional and maps only existing authored records. Registry source IDs, edition IDs, audit/author feature IDs, inventory anchors, and citation IDs must resolve to their owning inventories/catalogs. `hexagrams[].requiredCells` is exactly `overview` plus positions 1–6; each book binds its source unit, edition, pages, and edition-specific layer scope. The six special entries are edition-specific and cross-reference their parent hexagram and source-unit ID. Registry `counts` are exact array expansions: hexagram cells equal `64 × 3 × 7 = 1,344`; overview cells equal `64 × 3 = 192`; position cells equal `64 × 3 × 6 = 1,152`; `specialPassages` is six. In implementation, `hexagrams` contains the 64 parent units; required cell targets are expanded as hexagram × required cell × three editions. `groups` and `exclusions` counts equal their corresponding array lengths. Enforce these equalities and the minimum inventory census in the preceding section.

A populated hexagram entry has `id`, `number`, `auditFeatureId`, the exact `requiredCells` list, `books`, and `specialPassageIds`. Each book has `editionId`, `sourceUnitId`, `pdfPageStart`, `pdfPageEnd`, and `layerScopeIds`. Each special row has `id`, `hexagramId`, `editionId`, `sourceUnitId`, `auditFeatureId`, and `layerScopeIds`. A special-obligation `id` may be registry-owned and derived from its edition and canonical parent (for example, `special-pbc-hexagram-01`); it identifies the audit obligation, not a newly asserted source passage ID. Its `sourceUnitId` remains the existing inventory parent until the inventory assigns a finer stable source-unit ID. A group has `id`, optional inventory-supported `parentId`/`number`, `kind`, `group`, `editionId`, page bounds, author/audit feature IDs, `layerScopeIds`, `discoveryStatus`, and optional mapped `recordIds`. An exclusion has `id`, `sourceUnitId`, `kind`, `inventoryAnchor`, `editionId`, `auditFeatureId`, and `layerScopeIds`. All page ranges are positive and ordered; all references resolve and have the correct edition and ownership.

Every identifier follows the stable IDs already assigned by the canonical inventory. Validate edition and feature IDs against their authoritative catalogs; `layers[].sourceAnchor` uses an inventory anchor and existing citation IDs only. Do not synthesize new citations or define record/claim inventory by string transformation.

Project every known stable inventory ID and explicit parent/child obligation, with source edition, locator, group, and author/audit routing. Use established ranges only. Reuse inventory IDs; do not derive ad hoc IDs from accent stripping or display labels. Count a parent and its required children according to their distinct obligations; one cannot silently replace or double-count the other. Preserve these established counts: 64 boards; chapter 5 items 01–18 plus a separate unnumbered postscript; chapter 6 labels 01–69; 18 questions; Hà Tri entries 01–60; casting I as its known `bpct-casting-I` parent only (its four definitions have no stable child IDs or individual page locators), casting II entries 01–64, IV entries 01–08, V entries 01–18, and VI entries 01–11; criticisms I–XV; NTT's nine named introduction figures and notes 01–12; and NHL's seven introduction units and Part II framing. Do not invent a casting-III unit: the inventory records an inspected transition without a III heading. Include established PBC/NHL Hệ Từ chapters, front matter, diagrams, classical groups, and explicit exclusions. Do not invent source-layer rows, citations, or child IDs from headings/counts. The six edition-specific Càn/Khôn special units remain separate from line positions.

Registry validation binds the exact inventory-byte hash, registry schema/revision, declared counts, exact hexagram/cell expansion, special IDs, edition/source references, and parent/child references. Enforce floors and identities of 64 hexagrams, 384 position units, 192 overview cells, 1,152 position cells, and 1,344 combined cells. Enforce exact contiguous numbered censuses: 64 boards, chapter-5 items 01–18 plus its unnumbered postscript, chapter-6 labels 01–69, questions 01–18, Hà Tri entries 01–60, casting registers I 01–64, II 01–64, IV 01–08, V 01–18, VI 01–11, and criticisms I–XV. NTT's nine named figures and notes 01–12, plus NHL's seven introduction units and Part II framing, remain explicit expected-unit rows. These bounds prevent accidental shrinkage; only source inspection and review-gated inventory-plus-registry changes can establish newly discovered source closure. They do not prove that a manually updated inventory and registry are semantically complete. Inventory candidates are navigation only, never evidence of presence or absence.

#### Version-1 decisions and evidence

Store one ledger per scope under `docs/reviews/knowledge/ledgers/`. Its envelope is `{ "schemaVersion": 1, "ledgerId": "...", "scope": { "kind": "hexagram|group", "id": "..." }, "decisions": [] }`. Each decision is a strict version-1 object with only the fields shown below; each nested object also rejects additional properties. The example is a record-backed accepted entry and demonstrates required evidence/input closure:

```json
{
  "schemaVersion": 1,
  "id": "<stable decision ID>",
  "target": {
    "kind": "cell",
    "hexagramId": "hexagram-01",
    "editionId": "<edition ID>",
    "cell": "overview"
  },
  "revision": 1,
  "supersedes": null,
  "disposition": "accepted",
  "findings": "<source comparison findings>",
  "locator": { "citationIds": ["<citation ID>"], "editionId": "<edition ID>", "pdfPages": [1, 1] },
  "coveredClaimIds": ["<exact authored claim ID>"],
  "layerResolution": { "status": "unresolved", "layers": [] },
  "exclusionReview": null,
  "sourceComparison": {
    "identity": "<actual comparison identity>",
    "reviewer": "<actual reviewer identity>",
    "date": "<date>",
    "scope": "<reviewed scope>",
    "evidenceCitationIds": ["<citation ID>"]
  },
  "specialistReview": {
    "status": "pending",
    "reviewerName": null,
    "reviewerRole": null,
    "reviewedAt": null,
    "scope": "<requested specialist scope>",
    "note": "<pending reason>"
  },
  "authoredScope": "records",
  "inputs": {
    "records": [{ "id": "<record ID>", "sha256": "<64 lowercase hex>", "released": true }],
    "citations": [{ "id": "<citation ID>", "sha256": "<64 lowercase hex>" }],
    "editions": [{ "id": "<edition ID>", "sha256": "<64 lowercase hex>" }],
    "projectContracts": [{ "documentPath": "<document path>", "revision": "<contract revision>" }],
    "fixtures": []
  },
  "recordedAt": "<date-time>",
  "recordedBy": "<actual identity>"
}
```

`target` is strict and discriminated. A cell target has exactly `kind`, `hexagramId`, `editionId`, and `cell` (`overview` or `position-1` through `position-6`); special, source-unit, and exclusion targets identify registered IDs; record targets identify current mapped records; table, figure, lesson, and fixture targets identify current typed IDs with owner/child references. Every target must resolve; unknown, malformed, deleted, or retired targets fail structurally and require explicit artifact repair. Malformed ID/hash syntax, unknown schema versions/fields, duplicate target heads, and malformed revision chains are structural errors. `locator.editionId` and `pdfPages` are required when applicable; source-unit decisions require exact locators. Exclusions require `exclusionReview` with `reason`, exact `locator`, `scope`, and actual `reviewer`; non-content dispositions require accounting, not invented doctrine. A missing layer roster or empty scope is unresolved, never vacuously accepted. To resolve a scope, `layerResolution.layers` must account for every layer ID in the target's registered `layerScopeIds`, exactly once, with `presence` (`present` or `absent`), nonempty citation IDs, and basis `inspected-page`, `non-content`, or `source-omission`. `layerResolution.status` remains unresolved until this closure is established; unknown registry rosters and out-of-scope layer IDs keep the gate closed. Do not assume every cell has every vocabulary class or omit required source-book layers by author assertion. `specialistReview` always records status, scope, and note; pending review uses null reviewer name/role/date, while approved/rejected review records the actual name, role, and date. `supersedes` is null or names a prior `{id, revision}`; derive the current chain head without writing `supersededBy` into historical entries.

The `target` variants have these exact keys (additional properties are forbidden):

```json
[
  { "kind": "cell", "hexagramId": "hexagram-01", "editionId": "<edition ID>", "cell": "overview" },
  { "kind": "special", "id": "<registered special ID>" },
  { "kind": "sourceunit", "id": "<registered source-unit ID>" },
  { "kind": "exclusion", "id": "<registered exclusion ID>" },
  { "kind": "record", "id": "<current mapped record ID>" },
  { "kind": "table", "id": "<table target ID>", "ownerId": "<owner ID>", "childId": "<child ID>" },
  {
    "kind": "figure",
    "id": "<figure target ID>",
    "ownerId": "<owner ID>",
    "childId": "<child ID>"
  },
  {
    "kind": "lesson",
    "id": "<lesson target ID>",
    "ownerId": "<owner ID>",
    "childId": "<child ID>"
  },
  {
    "kind": "fixture",
    "id": "<fixture target ID>",
    "ownerId": "<owner ID>",
    "childId": "<child ID>"
  }
]
```

The array contains separate target alternatives; its placeholder values are not real registered IDs. Fixture IDs and owner/child bindings must be explicitly registered or recorded against owning claims. When target kind is `exclusion`, `exclusionReview` has exactly `{ "reason": "...", "locator": { "citationIds": ["..."], "editionId": "...", "pdfPages": [1, 1] }, "scope": "...", "reviewer": "..." }`; it is null for other targets. Per-layer objects have exactly `layerId`, `presence`, `citationIds`, and `basis`.

The `specialistReview` object always contains exactly `status`, `reviewerName`, `reviewerRole`, `reviewedAt`, `scope`, and `note`. For `pending`, the three reviewer fields are null. For `approved` or `rejected`, they contain actual values. `sourceComparison` always contains exactly `identity`, `reviewer`, `date`, `scope`, and `evidenceCitationIds`. `layerResolution` contains exactly `status` and `layers`; its status is `resolved` only when every required in-scope registered layer has exactly one decision, otherwise `unresolved`. Ledger and decision IDs, revisions, and scoped target IDs are unique. A ledger may contain decisions only for its declared scope.

`authoredScope: "none"` is valid only when the target maps to no current authored record IDs in the registry and manifest. It requires `coveredClaimIds: []`; it does not waive source, locator, layer, or source-comparison evidence, and it does not accept absent authored claims automatically. Otherwise use `"records"`, name the exact nonempty `coveredClaimIds`, and derive record IDs and complete support closure from those claims. Registry `recordIds` are optional typed mappings to currently existing authored records; a mapped record that is deleted or retired is an invalid target requiring explicit registry/ledger repair, not a missing-input shortcut. For `none`, require a registered target with no record mapping and verify against the current manifest; omitting optional `inputs.records` is not evidence. Fixtures likewise need an explicit registry or ledger binding to owning claims; arbitrary fixture dependencies cannot be omitted.

Derive current inputs from exact direct and transitive closure: record/claim canonical hashes and release flags, citations, edition SHAs, used project-contract revisions, and registered expected-fixture paths/hashes. Compare the derived ID set and hashes to the recorded `inputs`. If an input ID is unknown, malformed, or targets a deleted/retired object, fail structurally and require explicit repair. If all IDs still resolve but a dependency was added or removed, or a current hash/release/revision differs, mark the decision stale and keep gates closed. Missing a newly required binding and retaining an obsolete-but-valid binding are stale evidence, not reasons to silently accept or structurally reject the whole corpus. Test both with a formerly valid decision fixture. Missing required structural dependencies and cycles remain fatal, as in feat-101.

Hash review, attribution, discrepancy, and support evidence. Reuse feat-101 deterministic SHA-256 canonicalization, UTF-16 object-key comparison, field-aware set handling, and declared array semantics. Keep revision history append-only: `supersedes` points to an earlier decision revision; derive one chain head/current decision. Do not require editing old entries with `supersededBy`. Duplicate heads, malformed chains, unknown targets, and duplicate current decisions are structural errors. A decision/target's current record scope covers exact `coveredClaimIds`; a record-backed accepted decision cannot be widened beyond those claims.

Source comparison has only actual `identity`, `reviewer`, `date`, `scope`, and `evidenceCitationIds`. Do not create a reviewer registry or require registry identity/revision. Specialist metadata is separate and records pending/approved/rejected state, actual reviewer name/role/date/scope/note. Only actual qualifying review under feat-095 can establish specialist approval; schema validation, reviewer-name blocklists, or identity-string comparisons cannot prove identity, independence, or qualification. Actual certification belongs to feat-096. Synthetic in-memory tests establish validator behavior only and never count as real source comparison or specialist approval.

#### Gates, coverage, and generated status

Every current released claim must have a current accepted decision that covers that exact claim, or a precise reviewed exclusion permitted by the quality contract. Derive required released claim IDs and coverage from the current manifest/records; report `releasedClaimsCovered` (distinct currently covered claim IDs) and `releasedClaimsRequired` (all current required released claim IDs). A registry may map record IDs to source units, but it cannot leave newly released claims outside accepted current evidence and still report complete. Include all required claim surfaces, including record/line/special claims, tables, figures, labels, orientation, alternatives, review claims, lesson blocks/typed targets, and prerequisite support. Derive table, figure, lesson, typed-target, and fixture requirements from feat-101 relationships and registered bindings; bind expected fixtures to their owning claims and do not fabricate source-unit IDs.

Support closure includes tables, figures, labels, orientation, author alternatives, lesson blocks and typed targets, review claims, prerequisites, and expected-fixture dependencies. A changed input reopens affected decisions transitively; unaffected decisions stay current. Missing or stale current bindings close affected gates. Valid partial, stale, rejected, unresolved, or unapproved evidence is not a structural corpus error; normal release validation continues with gates closed. `--require-complete` fails on any closed required gate. Malformed schemas, unknown IDs/targets, deleted or retired mapped targets, duplicate current decisions, broken revision chains, missing structural dependencies, and cycles remain fatal.

The real ledgers directory must exist and be committed. Add `README.md` or `.gitkeep` at implementation time so Git retains the directory. A missing ledger root is structural failure; an existing empty root is valid and reports zero decisions with gates closed. Certification is an optional artifact and remains absent until actual review; absence is not a normal-validation error. Completion requires every applicable audit and specialist gate; a passing boolean never waives or implies certification.

#### Generated audit status and certification

Generate `packages/knowledge/reports/audit-status.json` separately from the public content release. Its version-1 shape is:

```json
{
  "schemaVersion": 1,
  "contentSnapshotIdentity": "<unchanged feat-101 snapshot identity>",
  "registry": {
    "sha256": "<64 lowercase hex>",
    "revision": 1,
    "counts": {
      "overviewCells": 192,
      "positionCells": 1152,
      "hexagramCells": 1344,
      "specialPassages": 6,
      "groups": 0,
      "exclusions": 0
    }
  },
  "decisionSetSha256": "<64 lowercase hex>",
  "reviewEvidenceIdentity": "<sha256 of canonical scoped ledger path/hash identity>",
  "gates": {
    "sourceReview": {
      "status": "open|closed",
      "counts": {
        "required": 0,
        "current": 0,
        "missing": 0,
        "stale": 0,
        "rejected": 0,
        "specialistRejected": 0,
        "unresolved": 0
      },
      "reasons": [{ "code": "<reason code>", "count": 0 }]
    },
    "certification": {
      "status": "open|closed",
      "state": "missing",
      "counts": {
        "current": 0,
        "required": 0,
        "missing": 0,
        "stale": 0,
        "rejected": 0,
        "specialistRejected": 0,
        "unresolved": 0
      },
      "reasons": [{ "code": "<reason code>", "count": 0 }]
    }
  },
  "complete": false,
  "featureCoverage": {
    "<feature ID>": { "required": 0, "current": 0 }
  },
  "totals": {
    "releasedClaimsCovered": 0,
    "releasedClaimsRequired": 0,
    "overviewCells": 192,
    "positionCells": 1152,
    "hexagramCells": 1344,
    "specialPassages": 6,
    "groups": 0,
    "exclusions": 0,
    "acceptedDecisions": 0,
    "approvedDecisions": 0,
    "currentDecisions": 0,
    "rejectedDecisions": 0,
    "unresolvedDecisions": 0
  }
}
```

`gates.sourceReview` and `gates.certification` are report objects with `status`, derived counts, and reason codes; certification also reports its state. `complete` is true only when both required gates and structural validation pass. This generated report shape is distinct from internal validator results, which use booleans. All report counts are integer derived values. Registry counts match the exact registry arrays; report cell totals are the required denominator, not accepted/audited counts. `decisionSetSha256` hashes only current decisions. `reviewEvidenceIdentity` hashes canonical JSON containing scoped current ledger paths and their file hashes; it is separate from released-content identity. Audit status has no timestamp or self-referential field. A passing gate is not itself a certification claim. Report 192 overview cells, 1,152 position cells, and 1,344 combined hexagram cells accurately; authored hexagram count is not an audit count.

The optional version-1 certification artifact has this exact shape:

```json
{
  "schemaVersion": 1,
  "contentSnapshotIdentity": "<unchanged feat-101 snapshot identity>",
  "registry": {
    "sha256": "<64 lowercase hex>",
    "revision": 1
  },
  "decisionSetSha256": "<64 lowercase hex>",
  "specialistReview": {
    "reviewerName": "<actual named reviewer>",
    "reviewerRole": "<actual role>",
    "reviewedAt": "<date-time>",
    "scope": "<certification scope>",
    "decision": "approved"
  }
}
```

Reject additional properties. This artifact is absent until actual feat-096 certification; never use test data as corpus evidence. A structurally valid but stale artifact keeps the certification gate closed; malformed shape or hashes fail validation. The schema does not establish the reviewer's identity or qualifications.

If optional certification exists, bind its decision to the content snapshot identity, registry SHA/revision, current decision-set SHA, and actual named specialist review metadata. Exclude the certification artifact from its own identity to prevent a hash cycle. Keep missing certification closed without changing normal validation. Do not change feat-101 snapshot meaning, public API, generated release JSON/TypeScript, or introduce a certified runtime identity. With no meaningful content change, existing authored V1 records and release outputs remain byte-identical.

CI validates recorded edition SHA values and source-catalog provenance without requiring local PDFs. `--check-books` remains an explicit local fingerprint check; PDF availability does not prove inspection. Keep validator fixtures synthetic and in memory inside package tests, never under real ledger/certification paths. The current real ledger root contains no decisions, and no certification artifact exists.

#### Observed feat-067 implementation status

The registry, strict schemas, validators, ledger loading, input-freshness checks, gate evaluation, and separate audit report are implemented. Current generated evidence reports 1,344 cells, six special obligations, 518 groups, and 17 exclusions. Fourteen layer rosters and all 518 group discoveries remain unresolved. Of 2,057 required targets, zero have current decisions; zero of 1,226 released claims are covered. Source review and certification are closed, `complete` is false, and no source audit or specialist approval is claimed. The 172 protected V1 records, schema, release JSON, and typed wrapper remain unchanged; snapshot identity remains `da736ea2c73cabe55317ca8babe86e0ea022b4bd6c52c576fc95c0c82191c67e`.

The coordinator approved the generated gate-object representation shown above as the canonical report shape. This representation clarifies report fields; it does not alter gate conditions, source-comparison or specialist-approval requirements, or stale-evidence handling. See the [feat-067 plan](../plans/feat-067.md) for verification and handoff evidence.

### Citation contract

Each citation identifies the source work and exact supplied edition.
Its location includes chapter, section, PDF page range, and printed page range when available.
Page numbers are one-based. Printed page labels can contain nonnumeric text.
The source catalog's fingerprint binds page locators to the reviewed file.

| Field                                                  | Meaning                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| `id`                                                   | Stable citation ID                                               |
| `sourceId`                                             | Source work reference                                            |
| `editionId`                                            | Fingerprinted edition reference                                  |
| `location.chapter`                                     | Chapter title or number                                          |
| `location.section`                                     | Section heading                                                  |
| `location.pdfPageStart`, `location.pdfPageEnd`         | Exact source page range                                          |
| `location.printedPageStart`, `location.printedPageEnd` | Printed labels when available                                    |
| `textLayer`                                            | Original text, author commentary, translator note, or supplement |

The user can read a formatted bibliographic citation offline.
A PDF link is optional and requires an approved distribution path.
Supplied local PDF paths are not production download links.

### Validation and release

Schema validation rejects invalid fields and unresolved identities.
Corpus checks validate citation coverage, edition page bounds, collection completeness, and permitted review states.
Source review establishes semantic fidelity and resolves textual discrepancies.
The [knowledge quality](../product-specs/knowledge-quality.md) contract owns the evidence gate.

Generate a coverage report from the authored records.
Build the released catalog from manifest-selected reviewed content.
The adapter preserves readonly local lookup and search.
Verify offline loading and content size when integrating the expanded corpus.

## V1 entities

| Entity           | Owns                                                             |
| ---------------- | ---------------------------------------------------------------- |
| Knowledge entity | Display metadata and authored explanation for a stable domain ID |
| Term             | Glossary term, aliases, and definition                           |
| Rule             | Explanation of one deterministic rule                            |
| Source           | Bibliographic metadata                                           |
| Source reference | Link from an entry or rule to a source location                  |

## ID ownership

`@liuyao/knowledge` owns stable IDs for:

- knowledge entities;
- terms;
- rules;
- sources;
- source references.

Knowledge records can reference core-owned trigram, hexagram, palace, or ruleset IDs. `@liuyao/core` does not import or define knowledge-owned IDs.

## Required fields

The lists below describe the V1 compatibility shapes.
The authored JSON follows the record and citation contracts above.
[Knowledge quality](../product-specs/knowledge-quality.md) owns evidence acceptance.

Every knowledge entity needs:

- a stable ID;
- an entity type;
- a display name;
- a concise explanation.

Every rule needs:

- a stable rule ID;
- a category;
- a concise explanation;
- at least one source reference for any rule displayed in production result explanations.

Every source needs:

- a stable source ID;
- title;
- author or traditional attribution when known;
- edition or publication metadata when known;
- rights status when known.

The JSON corpus identifies each supplied work and edition separately.
An old original text does not establish rights for a modern translation or editorial additions.
The current `SourceReference.location` string can record a chapter, section, PDF page, and printed page.

The JSON corpus records edition fingerprints, page locators, and review metadata.
The adapter preserves existing domain and knowledge IDs.

## V1 content

V1 must include display metadata for all 8 trigrams and 64 hexagrams.

V1 must include terms and rules needed to explain displayed board facts.

Full 384-line commentary is not required for V1.

## Access

Expose read-only package APIs.

Support:

- lookup by stable ID;
- list by entity type;
- local text search for the V1 browser;
- source lookup.

The API must work without network access.

**Intended expanded access:** Web commentary and article views consume released records through the public package APIs.
The application does not import authored JSON or generated corpus internals directly.
The knowledge package owns reusable topic listing, release filtering, and article search when those capabilities are added.
Preserve existing compatibility lookups and canonical IDs.
The web layer owns presentation and combines a displayed quẻ ID with its selected domain position.
Keep source PDFs outside runtime assets; citations remain readable offline without PDF distribution.
The [Library specification](../product-specs/knowledge-browser.md#intended-book-backed-expansion) owns display behavior.

## Validation

Structural validation checks shape and internal consistency.
Source review checks meaning and derivation. One cannot replace the other.

Package tests must reject:

- duplicate stable IDs;
- missing required names;
- broken internal references;
- rule references to unknown sources.

Corpus validation checks claim citations and requires reviewed records for release.
It cannot verify that a paraphrase preserves source meaning.
Use [Knowledge quality](../product-specs/knowledge-quality.md) for source-review acceptance.

## Licensing

Knowledge content follows `LICENSING.md`.

Do not copy modern translations or commentary unless the repository has permission.

Prefer structured facts, original summaries, public-domain material, and bibliographic citations.
