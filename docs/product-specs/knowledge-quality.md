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
When a book reports another author's view, cite the reporting book's actual page and identify the intermediary.
Do not cite a missing commentary section in another book as support for that reported view.
A reference can support a coherent explanation across several connected paragraphs.
Include pages that support retained background facts, such as bottom-to-top line order.
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
Keep each attributed explanation within the named author's supported reading.
Do not borrow another author's facts, reasons, conditions, or conclusions to expand it.
Judge original paraphrases by meaning and source support, not word-for-word agreement.
Degree or emphasis alone is a style difference, unless it changes the source's judgment or claim.
Changed causation, quantities, possibilities, or certainty remain content defects.

Distinguish source errors from source gaps.
For an error, record the incorrect passage, its location, and evidence for the correction.
For a gap, state what is unavailable without inventing a replacement or calling the absence an error.
Use a record note when the gap changes the reader's understanding; otherwise record it in the feature finding.

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

## Agent execution gate

Writers and reviewers follow this gate for every knowledge change. It bounds the work; it does not add a second review program.

1. Read the assigned feature record, the canonical documents it links, and the exact source passages or page images behind each changed assertion before writing.
2. Separate supplied facts, source errors, attributed interpretations, translator comments, and project conventions. Only project conventions may be stated without a source.
3. Write one coherent explanation of one idea. Do not add a decision, ledger row, reviewer identity, or hash for each sentence or claim.
4. Preserve conditions, disagreements, worked examples, source exceptions, and `via` attribution together with their book and PDF pages.
5. Give an independent reviewer — not the writer — the changed assertions, their direct uses, the pointer, and the inspected passages or images. Record each finding as the pointer, the smallest repair, and whether imagery was inspected. A finding without a smallest repair is not ready.
6. Run the automated invariants. Inspect expected table and worked-example values independently; never derive expected values from the calculation under test.
7. Fail closed. An unresolved material defect, a missing source, or an unapproved schema, record-ID, route, or core change blocks publication. Report the blocker instead of widening scope.
8. Re-verify the final revision after the last repair and record a short handoff: what changed, what was verified, what remains uncertain.

The assigned chapters, tables, figures, clauses, and conditions must all be covered. A decision per sentence is not required. Edit only what the finding supports; unrelated refactors, record splits, ID or route changes, and edits outside the assigned group stay out of the change.

## Publication gate

Publish a batch after source comparison, structural checks, and the relevant repository verification pass.
The agent execution gate above defines how the writer and reviewer prepare that batch.
Someone other than the writer checks the materially changed assertions. Additional content review can help with difficult material.
It does not require a certification artifact or model identity per paragraph.
Keep draft content outside the published library.
Run the [development checks](../development.md) appropriate to the change.

### Hexagram review batches

For feat-072 through feat-083, use the bounded review policy selected in [feat-071](../../features/feat-071.md#operator-sets-the-acceptance-bar-and-the-review-policy-for-the-batch).

- State the written acceptance bar in both writer and reviewer briefs. Do not silently replace it with literal clause fidelity.
- Require a temporary writer report with one source-locator row per attributed entry: pointer, author, source/pages, and a short supporting excerpt.
- Keep these reports outside published JSON. They locate passages; they are not evidence of accuracy or a certification ledger.
- In round 1, compare every attributed overview and line entry against its source, clause by clause.
- Also inspect general introductions, notes, and any special passages. Count actual entries; do not assume 112.
- In round 2, verify corrections and their direct uses. Reuse round 1 coverage and inspect nearby or high-risk passages.
- Report exact pointers, offending text, source wording, page locations, and the smallest correction for each finding.
- Correct material inherited errors inside the selected records, not only errors introduced by the current diff.
- If round 2 finds unresolved content defects, report the blocker. Obtain approval before extending the review budget or changing acceptance.
- State which passages and images were inspected. A text-only review cannot attest image-dependent checks.
- Record verification against the final revision. An earlier PASS does not override a later supported finding.

The [writing unit](knowledge-content.md#writing-unit) governs explanation length and author coverage.
The [data guide](../../packages/knowledge/data/README.md) owns authoring and verification commands.

## Migration history

Feat-068 replaced V1/V2 audit metadata and validation with the [simplified model](../design-docs/knowledge-model.md).
Useful source observations remain as explanations or concise source-gap notes.
[Historical artifacts](../reviews/knowledge/README.md) explain recovery of earlier accounting material from Git.
