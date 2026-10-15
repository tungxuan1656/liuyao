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
- [x] Relevant package checks and ./init.sh pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [model](../docs/design-docs/knowledge-model.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md).

## Plan

1. Verify released coverage, six-position structure, links, learning sequence, and documented source limits.
2. Inspect representative wide/compact learning and reference flows; repair only confirmed in-scope defects.
3. Record coverage, actual gaps, verification limits, and the next action.

## Observed coverage

- Public APIs loaded 376 listed records: 64 quẻ, 8 trigrams, 94 terms, 10 rules, and 200 articles. Five ready bibliographic records remain intentionally unlisted.
- All 64 overviews and 384 positions contain cited explanations. Both reading contexts resolve every position to its canonical line anchor. Corpus validation checks links and page ranges.
- Nine topics and four ordered lessons support entry-level study. Wide/500px Chrome checks followed lessons, sources, related concepts, and the Tụng→Lý example.
- One navigation gap was repaired: lesson 3 now links its Lục thân explanation to the existing Five Element cycles. No explanation or calculation changed.
- Existing source gaps stay explicit: [PBC Thuyết Quái](../packages/knowledge/data/foundations/pbc-thuyet-quai.json) preserves omissions; [Thăng](../packages/knowledge/data/hexagrams/hexagram-46.json) preserves provisional attribution at NTT PDF 718–719, also observed in compact UI. [Book sources](../docs/references/book-sources.md#known-discrepancies) owns shared discrepancies.
- These checks establish available coverage, not complete book transcription, absolute accuracy, or predictive efficacy.

## Handoff

- Blockers: none.
- Evidence: final `./init.sh` passed (181 core, 142 knowledge tests). The new prerequisite-link regression failed before repair and passed afterward.
- Review: independent reviewer inspected all four lessons, their principal rule/example targets, Càn, source metadata, and web renderers. Re-review accepted the link repair at `2277367`; no confirmed finding remains in that scope.
- Limits: no PDF passage/image re-audit, exhaustive visual inspection, physical-device or screen-reader assessment, or repeated offline matrix. Source prose and runtime code are unchanged.
- Next: Maintainer review of this assessment; broader source re-review remains separately scoped.
