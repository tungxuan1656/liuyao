# Knowledge data

This directory owns authored content for `@liuyao/knowledge`.
The [knowledge model](../../../docs/design-docs/knowledge-model.md) defines storage, schema, and package boundaries.

## File map

| Path                  | Owns                                                                     |
| --------------------- | ------------------------------------------------------------------------ |
| `manifest.json`       | File inventory, topics, release IDs, and the next content batch          |
| `sources.json`        | Supplied works, edition fingerprints, bibliographic metadata, and rights |
| `citations/`          | Edition-specific passage locations and textual layers                    |
| `trigrams/`           | Eight reviewed entities and structural evidence                          |
| `hexagrams/`          | Reviewed quẻ, six line positions, and separate special passages          |
| `casting/`            | Casting rules and worked examples                                        |
| `liuyao/`             | Foundational rules, structured tables, and attributed advanced articles  |
| `terms/`              | Reviewed definitions and aliases                                         |
| `legacy/catalog.json` | Unmigrated compatibility content with an explicit `unaudited` status     |
| `*.ts`                | Compatibility exports from the JSON adapter                              |
| `facts.ts`            | Project-owned associations between result fields and rule IDs            |

Edit JSON for migrated content. Do not author equivalent records in TypeScript or the legacy snapshot.
The snapshot preserves existing content without granting supplied-book review status.
`../src/book-data.generated.ts` imports manifest-listed files. It contains no independently authored knowledge.
`../reports/coverage.json` records remaining quẻ, line commentary by author, and topic gaps.

## Authoring workflow

1. Locate the passage in the fingerprinted supplied edition.
2. Inspect the full passage and render symbols or tables.
3. Write an original Vietnamese summary with claim-specific citation IDs.
4. Preserve interpretation attribution, necessary conditions, and discrepancy evidence.
5. Add the canonical record path to `manifest.json`.
6. After source review, record review evidence and select the ID for release.
7. Run `pnpm --filter @liuyao/knowledge validate:corpus --check-books`.
8. Run `./init.sh`.

Build and type-check commands validate the corpus and refresh generated outputs.
Use `pnpm --filter @liuyao/knowledge validate:corpus --check` to detect stale generated outputs without rewriting them.
Mechanical validation does not certify source meaning.

## Content review

- Evidence and publication acceptance → [Knowledge quality](../../../docs/product-specs/knowledge-quality.md)
- Supplied PDF editions and discrepancies → [Book sources](../../../docs/references/book-sources.md)
- Calculation derivations → [Liu Yao ruleset](../../../docs/design-docs/liuyao-ruleset-v1.md)
- Display language → [Vietnamese product language](../../../docs/product-specs/vietnamese-language.md)

## Licensing

Curated content follows the [data license](LICENSE) and [repository licensing boundary](../../../LICENSING.md).
Supplied PDFs and modern translations remain research inputs with unconfirmed distribution rights.
The corpus contains original summaries and structured facts. It does not redistribute book passages.
