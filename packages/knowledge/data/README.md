# Knowledge data

This directory contains curated runtime records for `@liuyao/knowledge`.
The [knowledge model](../../../docs/design-docs/knowledge-model.md) owns storage, schema, and package boundaries.

## File map

| File            | Owns                                                           |
| --------------- | -------------------------------------------------------------- |
| `trigrams.ts`   | Names, aliases, and explanations for eight trigrams            |
| `hexagrams.ts`  | Names, aliases, composition, and explanations for 64 hexagrams |
| `terms.ts`      | Domain term definitions and aliases                            |
| `rules.ts`      | Explanations for `liuyao-standard-v1` rules                    |
| `sources.ts`    | Bibliographic metadata and source rights descriptions          |
| `references.ts` | Links from entries and rules to source locations               |
| `facts.ts`      | Associations between result fields and rule IDs                |

The current records use TypeScript and the shapes in `../src/schema.ts`.
Knowledge records refer to core domain IDs without importing the core at runtime.
Package tests compare shared identities and composition with core contracts.

## Content review

- Evidence and publication acceptance → [Knowledge quality](../../../docs/product-specs/knowledge-quality.md)
- Supplied PDF editions and discrepancies → [Book sources](../../../docs/references/book-sources.md)
- Calculation derivations → [Liu Yao ruleset](../../../docs/design-docs/liuyao-ruleset-v1.md)
- Display language → [Vietnamese product language](../../../docs/product-specs/vietnamese-language.md)

Existing source references do not certify every record against the supplied books.
Review each affected passage when changing domain content.

## Licensing

Curated content follows the [data license](LICENSE) and [repository licensing boundary](../../../LICENSING.md).
The package remains private because its code and content have different license terms.
