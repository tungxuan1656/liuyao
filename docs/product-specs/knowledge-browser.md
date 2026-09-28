# Knowledge browser

This document owns V1 reference browsing behavior.

## Scope

V1 exposes local reference content for:

- 8 trigrams;
- 64 hexagrams;
- core Liu Yao terms;
- V1 rule explanations;
- source metadata.

The browser does not contain automated divination conclusions.

## Navigation

Library
→ Trigrams, Hexagrams, Terms, or Rules
→ List or search
→ Detail

A rule link from a reading result can open the same canonical detail content.

## Search

Search runs locally.

Support matches against the normalized fields that exist in the knowledge dataset, such as:

- canonical Vietnamese name;
- reviewed Vietnamese alias;
- stable ID;
- glossary term.

Do not include Han characters, English aliases, or Chinese romanizations in the local knowledge catalog. Stable IDs remain technical identifiers and are not prose. Follow `vietnamese-language.md` for the canonical language and terminology rules.

Do not call a remote search service.

## Detail content

A detail page can show:

- stable ID;
- Vietnamese names and aliases;
- concise authored explanation;
- related entities;
- applicable rule IDs;
- source references.

Source references identify a work, section, chapter, or page when that information is available.

## Content boundary

Do not copy modern copyrighted translations or commentary without permission.

Use original summaries, structured facts, public-domain material, or licensed text.

Follow `LICENSING.md` and `docs/design-docs/knowledge-model.md`.
