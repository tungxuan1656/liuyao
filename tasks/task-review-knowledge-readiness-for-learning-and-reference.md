# task-review-knowledge-readiness-for-learning-and-reference - Review knowledge readiness for learning and reference

- Status: done
- Owner: Coding agent (selected by repository maintainer)
- Required to start: [task-review-knowledge-meaning-and-source-attribution](task-review-knowledge-meaning-and-source-attribution.md), [task-verify-audit-invalidation-and-future-correction-workflow](task-verify-audit-invalidation-and-future-correction-workflow.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Check whether the available library supports learning and reading reference.

## Scope

The existing knowledge records, useful source explanations, links, and visible gaps.
Use focused content review under the [quality contract](../docs/product-specs/knowledge-quality.md).

## Non-goals

A certification system, predictive efficacy claims, or a new calculation ruleset.

## Acceptance

- [x] Check that the available 64 quẻ and 384 positions are readable and linked.
- [x] Check useful topic navigation, examples, related concepts, and source visibility.
- [x] List actual missing content and known source limitations in their owning records or features.
- [x] Report available coverage without certification, absolute accuracy, or predictive efficacy claims.
- [x] Compare a coherent group with its supplied passages, including conditions and source errors.
- [x] Relevant package checks and ./init.sh pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [model](../docs/design-docs/knowledge-model.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md).

## Plan

1. Compare the lesson's Lục thân explanation and its three classification rules with the relevant BPCT passages; retain coverage checks.
2. Inspect representative wide/compact learning and reference flows; repair only confirmed in-scope defects.
3. Record coverage, actual gaps, verification limits, and the next action.

## Observed coverage

- Public APIs loaded 376 listed records: 64 quẻ, 8 trigrams, 94 terms, 10 rules, and 200 articles. Five ready bibliographic records remain intentionally unlisted.
- All 64 overviews and 384 positions contain cited explanations. Both reading contexts resolve every position to its canonical line anchor. Corpus validation checks links and page ranges.
- Nine topics and four ordered lessons support entry-level study. Wide/500px Chrome checks followed lessons, sources, related concepts, and the Tụng→Lý example.
- One navigation gap was repaired: lesson 3 now links its Lục thân explanation to the existing Five Element cycles. No explanation or calculation changed.
- Existing source gaps stay explicit: [PBC Thuyết Quái](../packages/knowledge/data/foundations/pbc-thuyet-quai.json) preserves omissions; [Thăng](../packages/knowledge/data/hexagrams/hexagram-46.json) preserves provisional attribution at NTT PDF 718–719, also observed in compact UI. [Book sources](../docs/references/book-sources.md#known-discrepancies) owns shared discrepancies.
- These checks establish available coverage, not complete book transcription, absolute accuracy, or predictive efficacy.

## Focused source comparison

PR #150 review reopened completion because structural and UI checks did not satisfy the original source-comparison step. Scope remains unchanged.
Compared the `elements-relatives` entry in [lesson 3](../packages/knowledge/data/lessons/lesson-liuyao-board.json) and the following rules, including their explanations, tables, references, and source-error note:

| Record                                                                            | BPCT passage                                        | Result                                                                                            |
| --------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Branch elements](../packages/knowledge/data/liuyao/branch-elements.json)         | PDF 8, printed 2, III; PDF 14, printed 8, XIII note | All 12 branch assignments agree; line elements follow branches, not the palace element.           |
| [Five Element cycles](../packages/knowledge/data/liuyao/five-element-cycles.json) | PDF 9, printed 3, IV–V                              | All ten directed relations agree; rotating the cycle's starting point changes no relationship.    |
| [Six Relatives](../packages/knowledge/data/liuyao/six-relatives.json)             | PDF 9, printed 3, V; PDF 14, printed 8, XIII note   | All five relations agree when the palace element is “Ta”; counting Ta explains the name Lục thân. |

The lesson preserves these directions and the palace/line distinction. Its no-prediction caveat limits application; it does not assert source-proven efficacy.
PDF 9's Wood example contradicts its general rule. The existing rule note and [BPCT-03](../docs/references/book-sources.md#known-discrepancies) retain the supported Metal-as-Quan-quỷ reading; no new prose correction was needed.
Read complete PDF 8–10 and 13–15 for context; inspected page images 8, 9, and 14, including section boundaries and the example. No table value came from calculator output.

## Handoff

- Blockers: none.
- Evidence: final `./init.sh` passed (181 core, 142 knowledge tests); `validate:corpus --check-books` verified the supplied editions. The prerequisite-link regression was red before repair and green afterward.
- Review: independent source reviewer inspected the four named records against the same complete passages and three page images at data revision `fe8e456`. No material discrepancy remains in that scope. Earlier navigation review accepted the link repair at `2277367`.
- Limits: this pass covers only the named lesson entry and three rules, not the whole lesson, all quẻ, or the surrounding diagrams. No repeated UI/offline matrix, physical-device or screen-reader assessment. Source prose and runtime code are unchanged.
- Next: Maintainer review of this assessment; broader source re-review remains separately scoped.
