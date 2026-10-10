# Knowledge model

This document owns knowledge structure, links, validation, and package access.
The target is a small JSON library for learning and reading reference.

## Status

**Observed:** Feat-068 implements this model. Authored JSON records contain direct source references and stable links.
Structural validation produces ignored metadata, compact compatibility data, and one asset per ready record.
The browser loads detailed content asynchronously. The audit runtime and full-corpus release have been removed.

## Boundary

Knowledge contains explanations, source-supported facts, and useful relationships.
liuyao-core contains deterministic calculation logic.
apps/web renders knowledge and manages loading and offline cache.
No backend, database, graph engine, or remote search is required.

## JSON corpus

Keep one authored JSON file per stable knowledge record in packages/knowledge/data.
Reuse existing hexagram and concept IDs so routes and reading links remain stable.
Keep the four supplied books in sources.json.
Do not maintain another authored copy in generated files or TypeScript.

The source catalog stores bibliography, selected edition information, source-wide limitations, and local PDF information.
Local PDF paths and source fingerprints remain outside browser payloads.

## Record contract

Common fields:

- id: stable record ID.
- type: trigram, hexagram, term, rule, or article.
- title: Vietnamese display title.
- status: draft or ready.
- listed: optional flag; when false, ready content stays loadable by ID but is not a catalog entry.
- entries: coherent explanations with direct source references.
- aliases, topicIds, and relatedIds: optional navigation and search fields.
- links: optional targets for a particular line or named section.

An entry contains text and references. It can also contain a title, attribution, or a meaningful condition.
Use attribution with author and optional via when a translator or intermediary matters.
Keep the commentator's name in author. Put translation or reported-speech context in via, not in the author name.
For Trình Di or Chu Hy through NTT, use via: "Ngô Tất Tố — dịch và chú giải".
For Chu Hy reported by NHL, use author: "Chu Hy", via: "Nguyễn Hiến Lê — dẫn lại", and cite NHL.
A book reference contains sourceId and pdfPages as an inclusive start/end pair.
Add printedPages or section only when known and useful.
These optional reference fields and meaningful entry conditions remain supported; they are not legacy audit fields.
Project conventions use a specification path and section instead of a fabricated book reference.

Keep the text readable as Vietnamese prose. A string can contain paragraphs or short text lists.
Use typed table rows only when the app needs to query or render a real source table.
Retain useful diagrams as explicit data or permitted assets with their supporting references.
Do not turn every sentence, heading, note, or source-layer observation into an independently versioned object.

Hexagrams also contain lowerTrigramId, upperTrigramId, and exactly six lines in bottom-to-top order.
Each line contains position, polarity, label, and entries.
Special passages contain a title and entries outside the six-line array.
Place general Văn Ngôn or other context under the appropriate titled entry or special passage.
Do not duplicate that context under all six lines.

### Example entry

This entry illustrates direct attribution and source references.

```json
{
  "text": "Phan Bội Châu coi rồng ẩn là người có tài nhưng thời cơ và sức lực còn hạn chế. Người ấy cần tu dưỡng và chờ lúc thích hợp.",
  "attribution": { "author": "Phan Bội Châu" },
  "references": [{ "sourceId": "source-book-pbc", "pdfPages": [35, 36] }]
}
```

The parent hexagram still requires its overview and six lines.

## Links and queries

Use record IDs for relationships across files.
A link contains recordId and an optional position or sectionId.
Address a line with its hexagram ID and position, for example hexagram-01 plus position 1.
Use position only for a hexagram and require a value from 1 through 6.
Related links are navigation, not a claim-dependency graph.
An entry can have a record-scoped id when another record needs to link that section.
Use sectionId only when it resolves to that entry. Do not combine position and sectionId.
All rendered anchors must be unique within the record, including entries, lines, tables, and figures.
A table uses its optional authored id, or table- plus its kind when id is absent.
Table targets use that same ID; figure targets use the figure id.

A small in-memory map resolves record IDs.
A metadata index supports title, alias, short-summary, topic, and source filters across files.
Source filters include entries, notes, lines, special passages, tables, and all figure references.
Detailed explanations load by record ID. Source comparisons filter the loaded record's entries by sourceId and attribution.
No global paragraph IDs, dependency closure, citation registry, or persisted search database is required.

## Access

Keep existing lightweight lookups used by casting and reading results.
Provide asynchronous access for detailed book content: listContent filters metadata; loadContent loads one record by ID.
The library loads the selected quẻ or article rather than importing every explanation at startup.
Package access keeps IDs and structured data reusable outside React.
Missing IDs return an explicit unavailable result.
Draft records do not appear in published lists, search, or payloads.
Ready records with `listed: false` stay published and loadable by ID while listContent and local search omit them.

## Generated files

Generate only what removes manual duplication for the app:

- A small metadata index with IDs, titles, aliases, short summaries, topics, sources, listing flag, and record asset paths.
- Deployable JSON assets per ready record, with local research metadata removed.
- A small compatibility catalog when existing calculation screens need compact descriptions.
- A lazy schema validator for loaded assets, compiled from the authored record schema.

Generated output lives in build output and is reproducible from authored JSON.
Do not commit a second full-corpus generated JSON or embed it in the main JavaScript bundle.
Do not generate audit-status, certification, or source-to-claim accounting reports for routine builds.
A small printed validation summary is sufficient for counts and broken links.

## Validation

Check JSON shape, unique IDs, related links, source IDs, page bounds, and required hexagram structure.
Before caching a loaded asset, validate it against the same schema used during authoring.
A small generated validator loads with the first detailed record; Ajv stays in build tooling.
Failed loads remain retryable. Cached content is immutable.
Check source-derived table invariants and worked examples with focused package tests.
Use small synthetic fixtures for validator behavior.
Do not pin tests to the total number of paragraphs, citations, or review decisions.
Do not rebuild the complete corpus for every test scenario.
Source meaning follows [knowledge quality](../product-specs/knowledge-quality.md), not schema counts or hashes.

## Offline delivery

[Offline PWA](offline-pwa.md#knowledge-delivery) owns caching and update behavior.
Load the application and metadata first. Load detailed records when needed.
Precache the full ready library in the background to preserve offline access.
Split loading reduces startup parsing; it does not remove the total download needed for a complete offline library.
Use normal deployment versions and asset URLs for cache updates. No semantic hash graph is required.

## Migration history

[Feat-068](../../features/feat-068.md) records migration evidence and payload measurements.
Git preserves old schemas, ledgers, generated releases, and execution history.
Do not copy those artifacts into authored content or create a parallel certification system.
