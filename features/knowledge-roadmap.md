# Knowledge delivery roadmap

This document routes work on learning and reading knowledge from the four supplied books.
[Feature state](../feature_index.json) owns statuses and dependencies.
[Knowledge content](../docs/product-specs/knowledge-content.md) owns scope.
[Knowledge model](../docs/design-docs/knowledge-model.md) owns the simplified structure and loading design.

## Direction

Build useful explanations, source-supported tables, and links between concepts.
Keep JSON per record, direct book/page references, and Git history.
Do not resume the former machine-audit, hash-revision, or certification program.
The user superseded that program on 2026-10-08.
Completed features retain their historical evidence; they are not templates for new authoring.

## Current starting point

Main contains 64 hexagrams and all 384 positions with selected source-backed explanations.
It also contains articles, tables, terms, and formal audit infrastructure.
Existing coverage counts do not prove that the text is useful or that every book paragraph is represented.
The old feat-068 branch retains useful additional source writing alongside large audit artifacts.

## Sequence

1. Feat-068: simplify contracts, validation, runtime output, and content structure; then improve quẻ 01–04 and their 24 positions.
2. Feats 069–083: review and improve the remaining four-quẻ groups under the [hexagram batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches).
3. Feats 084–093: review the assigned Liu Yao and classical topic groups; preserve meaningful tables and source differences.
4. Feat-094: resolve material content gaps, contradictions, and broken links.
5. Feats 095–096: perform optional final editorial and learning-readiness passes when selected; no certification program.
6. Feats 098–100: expose detailed quẻ/hào, reading references, and linked topics/articles in the web app.
7. Feats 102–103: check actual rendering, payload, and offline behavior as those flows change.

Web integration does not wait for corpus-wide content completion.
Keep at most one feature active. Do not activate other features during feat-068.
Retain feature IDs and existing dependency history unless a concrete dependency prevents the new sequence.

## Working unit

Review one coherent record or source/topic group at a time.
A quẻ checklist covers the overview, six positions, and meaningful special passages.
A topic checklist covers its actual concepts, examples, and tables.
Record only material findings and one concrete next action.
Missing or unclear source text remains visible and does not block unrelated records.

The [quality contract](../docs/product-specs/knowledge-quality.md#publication-gate) defines content acceptance.
For hexagram review batches (feat-072–083), use the [hexagram batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches):
four parallel writers with provenance tables and no length target, round 1 exhaustive clause comparison,
round 2 verification, and Leader shared verification.
A record does not need a machine decision per author layer, paragraph, or book page.
Git preserves corrections; execution records do not duplicate the knowledge.
