# Book-backed knowledge content

This document owns the content scope for learning and reading reference.
The four supplied books inform the content. The product is a knowledge library, not an audit or certification system.

## Content flow

Read the relevant book passage → write a useful Vietnamese explanation → attach its source → link related knowledge → use it in the app.

- Data structure and loading → [Knowledge model](../design-docs/knowledge-model.md)
- Source checks and publication → [Knowledge quality](knowledge-quality.md)
- Supplied books → [Book sources](../references/book-sources.md)
- Library behavior → [Knowledge browser](knowledge-browser.md)

## Scope

- Eight trigrams and 64 hexagrams, with six positions per hexagram.
- Hexagram structure, overview, Thoán/Tượng, and useful explanations from NHL, PBC, and NTT.
- Separate author views when their meaning differs.
- Càn/Khôn special passages alongside their parent hexagram; never a seventh line.
- Casting, Liu Yao concepts, tables, conditions, and worked examples from BPCT and relevant classical passages.
- Articles and learning sequences that link existing concepts, rules, hexagrams, and positions.

The calculation package owns implemented board rules. Knowledge explains those rules and the books' interpretations.
Adding a historical interpretation does not activate automatic prediction or calendar behavior.

## Writing unit

Write a coherent explanation of one idea, not one record for each sentence or observed source layer.
A paragraph can summarize several connected source paragraphs and cite their page range.
Split entries when authors disagree, a condition changes the meaning, or the reader needs a separate section.
Preserve meaningful detail, examples, uncertainties, and source differences.
Do not create content merely to record that a heading, translation, or commentary exists.

One concept has one canonical record. Link that record from articles instead of copying its explanation.
Use Vietnamese prose and established names. Keep source terminology and source attribution where they help understanding.

## Coverage

Each hexagram contains its overview and six separately readable positions.
Use all relevant supplied sources without forcing BPCT into classical commentary or assuming every author comments on every passage.
Organize additional material by its meaning and actual source heading.
A useful library does not require an inventory decision for every book page, note, or blank.

Record a missing passage or unresolved interpretation as a concise content note or feature finding.
Do not invent an explanation to fill a count. Missing source material does not block unrelated content.

## Batch acceptance

- The content explains the selected knowledge clearly and preserves important source differences.
- References identify the actual book and relevant pages.
- IDs, related links, and six-line structure pass validation.
- Source-derived tables and examples agree with the inspected evidence.
- [Publication checks](knowledge-quality.md#publication-gate) pass.

[The roadmap](../../features/knowledge-roadmap.md) owns execution order.
Feature records track unfinished work. Git records revisions; content does not carry audit history.
