# task-review-knowledge-meaning-and-source-attribution - Review knowledge meaning and source attribution

- Status: done
- Owner: Coding agent (selected by repository maintainer)
- Required to start: [task-close-all-topic-audits-contradictions-and-exclusions](task-close-all-topic-audits-contradictions-and-exclusions.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve explanation quality through a focused editorial source pass.

## Scope

Review `lesson-foundations`, `term-yin`, `term-yang`, `term-line-position`,
`rule-line-position-order`, and `rule-trigram-composition` against their cited passages.
Check their direct links and eight trigram patterns. Do not expand into a corpus-wide review.
Use the [quality contract](../docs/product-specs/knowledge-quality.md).

## Non-goals

A certification system, predictive efficacy claims, or a new calculation ruleset.

## Acceptance

- [x] Read the selected records as a learner and check meaning against supporting passages.
- [x] Preserve distinct commentator/translator views and meaningful conditions.
- [x] Check difficult corrections with a fresh review when useful; record concrete findings.
- [x] Use concise source notes instead of unit-level reviewer identities, hashes, or approval artifacts.
- [x] Relevant package checks and ./init.sh pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [model](../docs/design-docs/knowledge-model.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md).

## Plan

1. Compare the six records with cited passages.
2. Correct confirmed defects; check links and conditions.
3. Record findings and limits.

## Handoff

- Evidence: Main and independent reviews at `1a62667` found no material meaning, attribution, citation, or direct-link defects. Content remains unchanged.
- Sources: NHL PDF 59–61, 72–73, 131, 153; BPCT PDF 10–12, 14. Page images confirmed eight trigram patterns and line order.
- Checks: `validate:corpus --check-books` passed; independent assertions confirmed patterns and Càn/Tụng compositions; baseline and final `./init.sh` passed (181 core, 141 knowledge tests).
- Limits: Six records only; NHL 131/153 used extracted text. No browser or corpus-wide editorial review.
- Blockers: none.
- Next: Merge this bounded review; select further editorial scope separately.
