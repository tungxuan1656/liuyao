# Knowledge browser

This document owns V1 reference browsing behavior.

The interface uses Vietnamese labels. English terms below describe behavior, not approved interface copy. See `vietnamese-language.md` for canonical terminology.

## Scope

V1 exposes local reference content for:

- 8 trigrams;
- 64 hexagrams;
- core Liu Yao terms;
- V1 rule explanations;
- source metadata;
- ready articles and learning sections.

The browser does not contain automated divination conclusions.

## Navigation

Thư viện
→ Quái, Quẻ, Thuật ngữ, Quy tắc hoặc Bài viết
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

## Book-backed content

Quẻ detail → overview → six hào → attributed explanations → book/page references.
Topic group → ready article → related knowledge and sources.

**Observed:** Detail routes render attributed entries, six hào, special passages, tables, figure descriptions, sources, and linked articles. Long supplementary commentary can be expanded.
**Intended:** Dedicated topic browsing and richer lesson/diagram presentation remain future feature work.

### Quẻ and hào

- Load ready records by ID through the public knowledge APIs.
- Show the overview and all available positions, numbered from bottom to top.
- Preserve author, translator, and edition attribution for each explanation.
- Keep meaningful conditions and differing interpretations with the explanation.
- Display citations for each explanation, including PDF pages and printed labels when present.
- Keep Càn/Khôn special passages separate from the six hào.
- Preserve existing canonical quẻ URLs and add links to individual positions.
- If commentary or an author layer is unavailable, show its unavailable state.
- Keep compatibility metadata available for unmigrated quẻ without presenting it as reviewed commentary.

### Trigrams terms and rules

- Use the same entry presentation for ready trigrams, terms, and rules.
- Keep each explanation's conditions, author layers, and supporting citations together.
- Render declared tables and diagrams with their evidence and source-specific labels.
- Identify accepted project conventions and link their reviewed specification evidence.
- Preserve compatibility navigation without using flattened prose as reviewed commentary.

### Intended topic browsing and article improvements

- Add topic browsing and article details alongside existing entity, term, and rule routes.
- Derive topics and lists from the small content index; load detailed record assets when opened.
- Search ready article titles, aliases, and short Vietnamese summaries locally.
- Preserve the existing Vietnamese normalization and exact-ID search contract.
- Show explicit empty states for topics without released content, including future learning articles.
- When an article is released, include it through the existing collection contract.
- Preserve declared related-record and rule links without inventing associations.
- Render learning sections in their declared sequence, with links to supporting records or positions.
- If a related target is not released, show an unavailable target without exposing draft prose or inventing a replacement.

### Shared presentation

Use the [knowledge model](../design-docs/knowledge-model.md#access) for package access and offline data boundaries.
Use [knowledge quality](knowledge-quality.md) for publication eligibility and review claims.
Content is original reference material, with known source gaps stated where relevant.
Show the book, page reference, and attribution. Keep technical version information in diagnostics.
Keep source views usable on compact and wide screens, with keyboard access and direct offline detail links.
Missing citations must produce an explicit unavailable state, without substitute sources.

## Content boundary

Source evidence and content review follow [Knowledge quality](knowledge-quality.md).
The [source catalog](../references/book-sources.md) identifies the supplied editions and known discrepancies.

Do not copy modern copyrighted translations or commentary without permission.

Use original summaries, structured facts, public-domain material, or licensed text.

Follow `LICENSING.md` and `docs/design-docs/knowledge-model.md`.
