# LiuYao Knowledge Data

This directory contains curated terminology, entity explanations, concise ruleset explanations, and source metadata. The data files conform to the record interfaces in `packages/knowledge/src/schema.ts`. They are deliberately self-contained and do not import `@liuyao/core` at runtime.

The stable trigram IDs and King Wen upper/lower trigram grid in this package intentionally duplicate the corresponding contract/table in `@liuyao/core`. Keep both lists and the grid in sync when either changes. This duplication avoids introducing a runtime dependency from knowledge data to the calculation package.

## Current content

- `TRIGRAMS` and `HEXAGRAMS` provide display metadata and concise explanations for all 72 entities. Hexagram explanations state the upper and lower trigrams and King Wen number.
- `TERMS` explains the fields and classifications used by `ReadingResult` and `PrimaryLineResult`, including all ten heavenly stems, twelve earthly branches, five elements, and five Six Relative categories.
- `RULES` contains explicit `rule-*` identifiers, a category, and an explanation for each `liuyao-standard-v1` convention. They describe deterministic conventions and do not make predictions.
- `SOURCES` provides bibliographic metadata for the Zhouyi, Jingshi Yizhuan, Zengshan Buyi, and this project's V1 calculation contract. The Jingshi Yizhuan record is historical context only; it is not used as evidence for an operational rule.
- `REFERENCES` link all ten result rules to source locations. Project-contract references document exact implementation conventions. Zengshan Buyi locators identify chapters 3–7 and 11–12 for selected palace, Na Jia, moving-change, Five Element, and Six Relative topics. They do not claim that one school defines every later Liu Yao procedure. The Zhouyi reference links `term-trigram` to the Shuo Gua discussion of the eight trigrams and their associated qualities.

The records do not reproduce source text or modern translations. Explanations are original concise summaries. Classical works are public domain; provider websites and modern editions/translations may have separate rights. Source records do not grant a blanket license to provider content.

## Licensing

The package manifest's `AGPL-3.0-only` license applies to its AGPL-licensed software, not to the curated data in this directory. Original curated knowledge and authored content here are **All Rights Reserved** unless a specific file states otherwise. The package is marked private because it contains material with distinct licensing terms and is not publishable as a homogeneous AGPL package. See [the data license](LICENSE) and the repository-wide [licensing policy](../../../LICENSING.md) before adding or reusing material.
