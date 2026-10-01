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

The current source records are declarative TypeScript files under `packages/knowledge/data/`.
There is no JSON content store or knowledge database.
The package imports these files locally, validates the catalog, and exposes readonly lookup and search APIs.
The web build bundles the curated records for offline access.

The [data directory guide](../../packages/knowledge/data/README.md) maps record files to their responsibilities.
`packages/knowledge/src/schema.ts` defines the current record shapes.
Under `packages/knowledge/src/`, `catalog.ts`, `validation.ts`, and `search.ts` own package access, structural validation, and search.

## Storage assessment

**Proposed recommendation:** Keep canonical knowledge in versioned files for the current offline product.
Use JSON when a content editor or independent tooling needs a language-neutral authoring format.
Preserve the package APIs and validation boundary if that migration is selected.

| Option                           | Fit                                                     | Requirement                                                                 |
| -------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Current TypeScript records       | Current runtime and small curated changes               | Review content and preserve schema checks.                                  |
| JSON files                       | Content editing, import/export, and independent tooling | Validate at the package boundary. Keep one authored source.                 |
| Local database such as IndexedDB | Future saved readings or a large local index            | Define migrations and recovery. Keep canonical reference content versioned. |
| Server database                  | Future shared editing or synchronization                | Define ownership, publication, and an offline snapshot contract.            |

A database does not correct an inaccurate claim or missing citation.
For current data volume and topology, it adds no required calculation capability.
Saved readings and curated knowledge have different lifecycles.
Adding reading history does not require moving reference knowledge into the same store.

If JSON becomes canonical, generate any runtime TypeScript representation from it.
Do not maintain equivalent JSON and TypeScript records by hand.
Schema changes and new package dependencies require selected implementation work.
This assessment does not introduce a database or approve a file migration.

## Proposed JSON corpus

**Status: Proposed.** The requested user-facing corpus uses UTF-8 JSON as its sole authored content source.
JSON Schema validates each collection before publication.
Existing package lookup interfaces receive adapters during the selected migration.
The proposed layout follows [Knowledge content](../product-specs/knowledge-content.md).

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

The directories are proposed collections, not scaffolded files.
JSON replaces equivalent authored TypeScript content during migration.
Generated runtime representations have a reproducible build path.
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
Preserve readonly local lookup and search during the migration.
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

The lists below describe the V1 authoring contract.
The current schema defines runtime fields. [Knowledge quality](../product-specs/knowledge-quality.md) defines the stronger intended evidence gate.

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

Identify a work and its edition separately when adding the supplied books.
An old original text does not establish rights for a modern translation or editorial additions.
The current `SourceReference.location` string can record a chapter, section, PDF page, and printed page.

**Proposed schema extension:** Add structured edition fingerprints, page locators, and review metadata when the content audit needs mechanical checks.
Preserve existing IDs during any selected migration.
The extension is not implemented in the current schema.

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

## Validation

Structural validation checks shape and internal consistency.
Source review checks meaning and derivation. One cannot replace the other.

Package tests must reject:

- duplicate stable IDs;
- missing required names;
- broken internal references;
- rule references to unknown sources.

Supplied-book citation coverage and review states are intended checks, not current validator guarantees.
Use [Knowledge quality](../product-specs/knowledge-quality.md) for their acceptance requirements.

## Licensing

Knowledge content follows `LICENSING.md`.

Do not copy modern translations or commentary unless the repository has permission.

Prefer structured facts, original summaries, public-domain material, and bibliographic citations.
