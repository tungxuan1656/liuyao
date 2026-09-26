# LiuYao Knowledge Data

This directory contains curated terminology, concise ruleset explanations, and source metadata. `terms.ts`, `rules.ts`, `sources.ts`, and `references.ts` conform to the record interfaces in `packages/knowledge/src/schema.ts`. They are deliberately self-contained and do not import `@liuyao/core`.

The stable trigram IDs and King Wen upper/lower trigram grid in this package intentionally duplicate the corresponding contract/table in `@liuyao/core`. Keep both lists and the grid in sync when either changes. This duplication avoids introducing a runtime dependency from knowledge data to the calculation package.

## Current content

- `TERMS` explains the fields and classifications used by `ReadingResult` and `PrimaryLineResult`, including all ten heavenly stems, twelve earthly branches, five elements, and five Six Relative categories.
- `RULES` contains explicit `rule-*` identifiers, each keyed to `liuyao-standard-v1`. They describe deterministic conventions and do not make predictions.
- `SOURCES` provides bibliographic metadata for the Zhouyi and Jingshi Yizhuan, publication statements that avoid asserting unknown dates, rights notes, and provenance URLs. The recorded provider URLs are `https://ctext.org/book-of-changes` and `https://ctext.org/jingshi-yizhuan/zh`. They identify the cited provider/work records, not a page citation. No Jingshi section locator or operational-rule reference is supplied: its section locations and direct support for the V1 operational rules are unknown/unverified and must not be inferred from the URL.
- `REFERENCES` connect the Zhouyi only to the general `term-trigram` record at the Shuo Gua discussion of eight trigrams and associated qualities. This locator does not support the ruleset's specific bottom/top line ordering. Bibliographic inclusion is not a claim that a source contains every later operational table or rule.

The records do not reproduce source text or modern translations. Rule explanations are original factual summaries of the V1 calculation conventions, not quotations or claims that the cited classical works establish every implementation detail. Classical works are public domain; provider websites and modern editions/translations may have separate rights. Source records describe only the classical works, not a blanket license to provider content.

## Licensing

The package manifest's `AGPL-3.0-only` license applies to its AGPL-licensed software, not to the curated data in this directory. Original curated knowledge and authored content here are **All Rights Reserved** unless a specific file states otherwise. The package is marked private because it contains material with distinct licensing terms and is not publishable as a homogeneous AGPL package. See [the data license](LICENSE) and the repository-wide [licensing policy](../../../LICENSING.md) before adding or reusing material.
