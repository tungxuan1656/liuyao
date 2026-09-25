# Knowledge model

This document owns structured knowledge boundaries, schema classes, and source rules for `@liuyao/knowledge`.

## Boundary

`@liuyao/knowledge` explains domain IDs. It does not drive Liu Yao calculation.

If a table is required to calculate a result, place it in `@liuyao/core`.

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

Package tests must reject:

- duplicate stable IDs;
- missing required names;
- broken internal references;
- rule references to unknown sources.

## Licensing

Knowledge content follows `LICENSING.md`.

Do not copy modern translations or commentary unless the repository has permission.

Prefer structured facts, original summaries, public-domain material, and bibliographic citations.
