# Vietnamese product language

This document owns the user-facing language and terminology rules for the Lục Hào web application and its local knowledge catalog.

## Approved language

- Use Vietnamese for all user-facing web copy and all knowledge names, aliases, explanations, source descriptions, and reference locations.
- Do not display Han characters or English/Chinese romanized names in the application or knowledge catalog.
- Write Vietnamese with full diacritics. Search can normalize case, punctuation, and Vietnamese diacritics without changing displayed text.
- Keep stable IDs, package names, route paths, ruleset codes, source URLs, and numeric/domain values unchanged. Treat these as technical identifiers, not prose.
- Translate labels for technical identifiers into Vietnamese. Do not translate or rename the identifiers themselves.
- Keep bibliographic descriptions in Vietnamese. Use Vietnamese or Latin-script titles and names; retain source URLs as links.
- Keep implementation errors and developer diagnostics in English only when they are not shown to users. Map user-visible errors to clear Vietnamese messages in the web layer.

## Terminology control

Maintain one reviewed glossary for recurring Liu Yao terms and the canonical Vietnamese names for all 8 trigrams and 64 hexagrams. Use the glossary in the knowledge catalog, result labels, filters, and help text. Do not invent or silently vary a domain translation; record accepted terms in the glossary before applying them broadly.

Knowledge content must remain original, rights-safe, and explicit about the implemented ruleset. Vietnamese copy must not add predictions or change deterministic results.

## Runtime boundary

V1 has one language: Vietnamese. Do not add a language selector, translation framework, remote translation service, or parallel locale catalog. Keep UI copy with its owning component and structured domain terminology in `@liuyao/knowledge`.

## Verification

- Set the document language metadata to Vietnamese.
- Review visible text, accessible names, status/error messages, browser metadata, and knowledge records.
- Test that user-facing knowledge text contains no Han characters and that Vietnamese search remains local and diacritic-tolerant.
- Verify reading calculations and stable IDs remain unchanged.

See `knowledge-browser.md` for knowledge search behavior and `product-identity.md` for release identity ownership.
