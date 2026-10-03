# Book-backed knowledge content

This document owns the user-facing content taxonomy, coverage, and batch acceptance for the supplied-book corpus.
Reviewed JSON batches exist, including selected advanced BPCT topics.
Full commentary, complete advanced coverage, and expanded browsing remain intended.

## Content flow

Book section → passage locator → attributed claim → Vietnamese learning content → source review → released JSON collection.

- Storage and JSON design → [Knowledge model](../design-docs/knowledge-model.md)
- Evidence and publication requirements → [Knowledge quality](knowledge-quality.md)
- Supplied editions and discrepancies → [Book sources](../references/book-sources.md)
- Current browsing behavior → [Knowledge browser](knowledge-browser.md)

## Scope

The requested corpus covers Kinh Dịch, casting, hexagrams, and Liu Yao knowledge found in the four supplied books.
The content inventory must identify actual sections before fixing the final article count.
The current V1 scope remains the implementation baseline until the expanded learning behavior receives a selected feature.

| Collection          | Coverage                                                                                                             | Evidence emphasis                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Foundations         | Yin/Yang, line classes, trigrams, hexagram structure, classical vocabulary                                           | All four books, with attribution for historical and philosophical claims |
| Trigrams            | Eight stable entities, symbols, names, aliases, and source-supported associations                                    | Classical commentaries and BPCT                                          |
| Hexagrams           | 64 stable entities, upper/lower trigrams, names, classical meaning, and author explanations                          | PBC, NTT, and NHL                                                        |
| Line commentary     | Six positions for each hexagram, totaling 384 entries                                                                | PBC, NTT, and NHL, reviewed by passage                                   |
| Casting             | Physical three-coin conventions, moving lines, changed hexagrams, and input examples                                 | BPCT and relevant NHL passages                                           |
| Liu Yao foundations | Eight Palaces, Shi/Ying, Na Jia, Five Elements, and Six Relatives                                                    | BPCT, with discrepancies recorded                                        |
| Advanced Liu Yao    | Source-supported terms and attributed explanations of Dụng thần, Phi/Phục thần, calendar factors, and related topics | Located BPCT passages and their textual layers                           |
| Learning articles   | Ordered explanations and worked examples assembled from reviewed claims                                              | References to existing corpus claims and their citations                 |

Special passages associated with Càn and Khôn require separate content fields.
They do not add a seventh line to the 384-entry line inventory.
Review their source headings and conditions before selecting their display treatment.

## Content rules

- Use canonical Vietnamese names and stable domain IDs.
- Preserve useful source spelling variants as aliases.
- Cite each substantive explanation block and each supported structural claim.
- Identify the author or translator of an interpretation.
- Keep source interpretations separate when they differ.
- Label project conventions as project conventions.
- Record contradictions with evidence and a resolution state.
- Keep unresolved claims outside released calculation authority.
- Write original explanatory prose within the repository's licensing boundary.
- Use reviewed source evidence for worked examples.

An advanced article does not activate automated interpretation or calendar calculations.
Those behaviors require their own specification and selected implementation work.

## Delivery approaches

| Approach                                                        | Benefit                                                                 | Cost                                                         |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| Topic records and per-hexagram JSON, with centralized citations | One concept has one owner. Small batches support review and correction. | Requires an explicit schema and source crosswalk.            |
| Book and chapter JSON, with a topic index                       | Preserves the supplied books' organization.                             | Repeats concepts and complicates comparison between authors. |
| One complete catalog JSON                                       | Simple initial import.                                                  | Large edits, review conflicts, and weak batch isolation.     |

The implemented corpus uses topic records and per-hexagram JSON.
The [knowledge model](../design-docs/knowledge-model.md#json-corpus) defines its storage contract.

## Batch sequence

1. Establish source editions, citation locators, JSON validation, and the complete topic inventory.
2. Author a pilot with Càn, Khôn, Tụng, Lý, and selected casting and Liu Yao terms.
3. Review the pilot's source fidelity, aliases, paragraph citations, and interface fit.
4. Continue both content tracks in each delivery cycle, sharing reviewed foundational terms and trigram records.
   - Classical track: Complete hexagram and line commentary in batches of four to eight hexagrams.
   - Liu Yao track: Complete casting and foundational records, then advanced topics from located BPCT passages.
5. Add learning articles from reviewed claims in both tracks.
6. Reconcile corpus coverage and integrate the approved collections into local browsing.

Each pilot hexagram includes its six line positions.
The pilot exercises pure and mixed hexagrams, moving-line examples, and special passages before bulk authoring.
Every batch ends with a reviewed coverage report and one concrete next batch.
The user selected concurrent progress on both tracks, with small cited batches.
The user approved the JSON storage contract and this delivery sequence.
The [generated coverage report](../../packages/knowledge/reports/coverage.json) identifies released batches, remaining gaps, and the next group.
The [completion roadmap](../../features/knowledge-roadmap.md) routes all remaining authoring and later audit features.
Their planned scope does not change released coverage or activate new product behavior.

## Batch acceptance

- Every record passes the selected JSON Schema version.
- IDs and internal references resolve without duplication.
- Every substantive claim has a resolvable edition-specific citation.
- PDF page locators fall within the fingerprinted edition.
- Line positions use bottom-to-top domain order.
- Names, aliases, and line counts meet the corpus inventory.
- Structural facts agree with independently reviewed book evidence.
- Interpretation blocks retain attribution and necessary conditions.
- Discrepancies have supported resolutions or explicit unresolved status.
- Released records contain no draft or disputed claims presented as established facts.
- The owning package's verification and repository checks pass.

Automated checks establish structure, links, and known invariants.
They do not establish that a paraphrase preserves the source meaning.
Source review must inspect the complete passages and relevant tables or diagrams.

## Coverage and handoff

Generate coverage from the manifest, records, and review metadata.
Report missing entries, missing citations, disputed claims, and completed collections separately.
Map each relevant book section to corpus records or an explicit exclusion reason.
Do not report a collection complete merely because JSON files exist.

Track selected work in feature records when persistence is needed.
Keep bounded content plans inline; use external plans only when the [repository criteria](../../AGENTS.md#assess-the-task) apply.
Record the last reviewed batch and the next exact group so work can resume across sessions.
The expected schema, package migration, content authoring, and browser integration justify separate delivery phases.
