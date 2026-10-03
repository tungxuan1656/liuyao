# Knowledge browser

This document owns V1 reference browsing behavior.

The interface uses Vietnamese labels. English terms below describe behavior, not approved interface copy. See `vietnamese-language.md` for canonical terminology.

## Scope

V1 exposes local reference content for:

- 8 trigrams;
- 64 hexagrams;
- core Liu Yao terms;
- V1 rule explanations;
- source metadata.

The browser does not contain automated divination conclusions.

## Navigation

Thư viện
→ Quái, Quẻ, Thuật ngữ hoặc Quy tắc
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

Prefer matches that preserve Vietnamese diacritics when the query contains them, so distinct names such as Càn and Cấn do not collide. For queries without diacritics, allow accent-insensitive matching and fold Vietnamese `đ` to `d`. Stable IDs match only the full identifier, not partial technical IDs; do not treat English fragments inside IDs as prose aliases.

Do not include Han characters, English aliases, or Chinese romanizations in the local knowledge catalog. Stable IDs remain technical identifiers and are not prose. Follow `vietnamese-language.md` for the canonical language and terminology rules.

Do not call a remote search service.

## Detail content

A detail page can show:

- Vietnamese names and aliases;
- concise authored explanation;
- related entities;
- applicable rule IDs;
- source references.

V1 term, trigram, and hexagram records can declare applicable rule IDs. Detail pages link declared rules to their canonical Library detail pages; do not infer associations for records without declared rules. Rule relationships and source references remain distinct.

Source references identify a work, section, chapter, or page when that information is available.

Keep stable IDs for lookup and routing. Do not show them as interface labels.
Show source titles and reference locations directly. Collapse author, publication, rights, and provenance metadata until the user requests it.

## Intended book-backed expansion

Quẻ detail → overview → six hào → named commentary layers → passage citations.
Topic group → released article → related knowledge and citations.

These flows are planned extensions. The current interface does not render their full content.

### Quẻ and hào

- Use released records from the public knowledge APIs.
- Show the overview and all available positions, numbered from bottom to top.
- Preserve author, translator, and edition attribution for each explanation.
- Keep conditions and differing interpretations attached to their supporting claims.
- Display citations for each explanation, including PDF pages and printed labels when present.
- Keep Càn/Khôn special passages separate from the six hào.
- Preserve existing canonical quẻ URLs and add links to individual positions.
- If commentary or an author layer is unavailable, show its unavailable state.
- Keep compatibility metadata available for unmigrated quẻ without presenting it as reviewed commentary.

### Trigrams terms and rules

- Use the same claim-level presentation for released trigrams, terms, and rules.
- Keep each explanation's conditions, author layers, and supporting citations together.
- Render declared tables and diagrams with their evidence and source-specific labels.
- Identify accepted project conventions and link their reviewed specification evidence.
- Preserve compatibility navigation without using flattened prose as reviewed commentary.

### Topics and articles

- Add topic browsing and article details alongside existing entity, term, and rule routes.
- Derive topics from the corpus manifest and content from released records.
- Search released article titles, aliases, and Vietnamese explanations locally.
- Preserve the existing Vietnamese normalization and exact-ID search contract.
- Show explicit empty states for topics without released content, including future learning articles.
- When an article is released, include it through the existing collection contract.
- Preserve declared related-record and rule links without inventing associations.
- Render learning blocks in their declared sequence, with supporting claims and prerequisite links.
- If a related target is not released, show an unavailable target without exposing draft prose or inventing a replacement.

### Shared presentation

Use the [knowledge model](../design-docs/knowledge-model.md#access) for package access and offline data boundaries.
Use [knowledge quality](knowledge-quality.md) for publication eligibility and review claims.
Source comparison does not establish full-corpus coverage or independent specialist approval.
Show the recorded review scope and released snapshot identity; an unavailable approval must not become a certification label.
Keep source views usable on compact and wide screens, with keyboard access and direct offline detail links.
Missing citations must produce an explicit unavailable state, without substitute sources.

## Content boundary

Source evidence and content review follow [Knowledge quality](knowledge-quality.md).
The [source catalog](../references/book-sources.md) identifies the supplied editions and known discrepancies.

Do not copy modern copyrighted translations or commentary without permission.

Use original summaries, structured facts, public-domain material, or licensed text.

Follow `LICENSING.md` and `docs/design-docs/knowledge-model.md`.
