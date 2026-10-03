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

For project evidence, resolve paths under the repository root and reject path escape. At build time, require an existing canonical documentation file, an existing heading, a non-empty reviewed-revision identifier, and an exact match to the accepted registry entry. Every released project-convention claim must also appear in its owner's review evidence. Structural agreement does not prove that the repository accepted the decision. Use fixtures with an existing canonical document and an explicit test revision; do not label fixture values as real approval. Bind the used accepted project evidence and its registry values to the snapshot. Runtime uses only validated project metadata in the release projection and does not read documentation files. Feat-067 owns later decision binding.

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

The released runtime payload must be draft-free even when bundled. Snapshot metadata reports the review scope and evidence present; it does not claim independent specialist approval. Do not invent or imply an audit-decision ledger: feat-067 owns the later audit-decision binding. The [PWA contract](offline-pwa.md#intended-knowledge-scale-and-updates) owns asset loading and update behavior. Package version alone does not identify a reviewed corpus snapshot.

### Implemented surface and limits

- `scripts/record-schema-dispatch.mjs` dispatches authored records to the unchanged V1 schema or strict V2 schema. `scripts/validate-corpus.mjs` performs Ajv validation at build time. `src/book-migration.ts` provides the pure, deep-copy upcast for prevalidated `BookRecordV1` values; it does not perform full schema validation.
- The schema and package type shapes are covered by schema-dispatch, V2-schema, and migration fixtures; C1 reports 18 focused tests passed. Cross-file behaviors are covered by dependency, figure, lesson, project-evidence, validation, and release fixtures; C2 reports 107 focused tests passed. Projection, catalog, snapshot, and runtime cases are covered by the knowledge package suite; the post-fix run reports 171 knowledge tests passed. Runtime tests reject missing lesson review evidence and omissions of direct or transitive block-support claims. The coordinator also reports root format, lint, typecheck, test, build, corpus, and supplied-book checks passed; see the [feat-101 handoff](../../features/feat-101.md) for exact commands and remaining delivery gates.
- `scripts/corpus-checks.mjs` and its evidence, figure, lesson, and project helpers validate cross-file references, release evidence, lesson ordering and targets, bounded figure evidence, and project-document structure. Lesson review-evidence coverage checks run for lessons whose `review.status` is `reviewed`; draft lessons do not receive that coverage check. Project path and heading checks establish structural matches, not approval or semantic correctness.
- `scripts/release-projection.mjs` generates the release-only payload at `src/book-release.generated.json`; `src/book-data.generated.ts` is its typed wrapper. The generated payload is outside authored `data/`, and local edition input paths are removed. Generation freshness checks cover the JSON and TypeScript outputs. The current generated projection has an empty `projectContracts` list; project metadata behavior is present in validation/projection code but is not exercised by released V2 content.
- Public record lookup in `book-catalog.ts` uses `BookRecordVersioned` (`BookRecordV1 | BookRecordV2`). Public sources there use `ReleasedBookSource`, which omits edition `localInputPath`; authored sources retain it. The root `src/index.ts` re-exports `book-catalog.ts` APIs and versioned schema types. `getBookSnapshotIdentity()` exposes the generated, versioned identity.
- Runtime integrity checks revalidate released records, claim/citation links, targets, source editions, project metadata, and lesson graph shape. `assertReleaseEvidenceIntegrity` also checks that each released lesson's review evidence covers every block-support claim and its direct and transitive claim dependencies; runtime tests cover missing, direct, and transitive evidence cases.
- Runtime and build checks enforce release and evidence structure; they do not certify source meaning, specialist approval, audit decisions, or corpus completion. Format, lint, typecheck, test, build, corpus, supplied-book, and `./init.sh` checks passed. Independent review, CI/PR, and final feat-101 acceptance remain pending.

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
