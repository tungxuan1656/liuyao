# Knowledge quality

This document owns source use, content checks, and publication acceptance.
The objective is useful, attributable knowledge for learning and reading reference.

## Evidence flow

Supplied passage → original explanation → book/page reference → focused content review → published knowledge.

[Book sources](../references/book-sources.md) owns supplied editions and known discrepancies.
[Licensing](../../LICENSING.md) owns source-use boundaries.
[Knowledge model](../design-docs/knowledge-model.md) owns storage and links.

## Source references

Attach references to each substantive explanation, table, or example.
Name the supplied book and the relevant PDF pages. Add printed pages or a section when they improve lookup.
Keep the commentator or translator attribution when it affects meaning.
A reference can support a coherent explanation across several connected paragraphs.
Do not assign a separate claim ID or citation record to every sentence.

Inspect the full relevant passage and its necessary context before summarizing it.
Inspect a page image when diagrams, symbols, layout, or transcription errors affect meaning.
Keep one fingerprint per supplied PDF in the source catalog when useful for identifying the edition.
A fingerprint identifies a file; it does not establish the accuracy of its contents.

## Content review

Check meaning, attribution, important conditions, line order, and source locations.
Preserve disagreements between authors. Do not merge them into an unattributed rule.
Keep unresolved readings as attributed uncertainty, not calculation authority.
Document a material source error with its location and the supported reading.
Do not fabricate missing passages, authors, or references.

Write original Vietnamese summaries under the licensing boundary.
Put common source limitations in source metadata.
Use entry conditions only for conditions that change that entry's meaning.
Do not repeat authoring instructions, review identity, or general disclaimers throughout the content.

A record is draft or ready for use. Review the changed content before marking it ready.
A short feature checklist records material findings. Git records the previous content.
Per-unit decision history, reviewer registries, hash closures, and certification are not publication requirements.

## Calculation evidence

Keep deterministic calculations in liuyao-core.
Check source-derived tables and worked examples against independently inspected expected values.
Do not generate expected values with the same calculation being checked.
Identify project conventions explicitly when books do not choose a software convention.
The [ruleset](../design-docs/liuyao-ruleset-v1.md) owns implemented calculation choices.

## Corrections and coverage

When content changes, review the affected passage and its direct uses.
Changing one explanation does not require new decisions for unchanged explanations.
Fix the source location and content together when a reference is wrong.
Keep known gaps visible in the relevant record or feature.
An unavailable passage does not block publication of unrelated, supported knowledge.

Coverage describes available records and meaningful gaps. It is not an accuracy score or proof of predictive efficacy.
Do not claim complete transcription of the books. Do not treat record or paragraph counts as source fidelity.

## Runtime fidelity

Show the same explanation, attribution, conditions, and references that the canonical record contains.
Resolve related-record and line links without substituting unrelated evidence.
Keep missing content explicit. Preserve table values and line positions.
Check affected web routes and offline behavior when presentation or loading changes.

## Publication gate

Publish a batch after source comparison, structural checks, and the relevant repository verification pass.
A separate content review can help with difficult material. It does not require a certification artifact or model identity per paragraph.
Keep draft content outside the published library.
Run the [development checks](../development.md) appropriate to the change.

## Migration history

Feat-068 replaced V1/V2 audit metadata and validation with the [simplified model](../design-docs/knowledge-model.md).
Useful source observations remain as explanations or concise source-gap notes.
[Historical artifacts](../reviews/knowledge/README.md) explain recovery of earlier accounting material from Git.
