# feat-098 — Integrate reviewed reference records into Library details

## Goal

Read released quẻ/hào, trigram, term, and rule explanations with conditions, attribution, and supporting evidence.

## Scope

**Intended work:** Existing Library detail routes, released knowledge APIs, and shared commentary/citation presentation.

## Non-goals

Corpus authoring or certification, automated interpretation, calendar analysis, and PDF distribution.

## Acceptance

- [ ] Implement the [expanded Library contract](../docs/product-specs/knowledge-browser.md#book-backed-content) for quẻ and hào.
- [ ] Overviews, six positions, and separate special passages resolve to released records.
- [ ] Explanations retain author/translator layers, conditions, and exact citations.
- [ ] Trigrams, terms, rules, tables, diagrams, and project conventions use the same entry presentation.
- [ ] Source attribution is visible without audit or certification badges.
- [ ] Direct links select the correct position; invalid targets recover without mismatched content.
- [ ] Missing commentary remains explicit; do not show internal layer-resolution or audit states.
- [ ] Existing entity, term, rule, and source routes remain usable.
- [ ] Compact, wide, keyboard, and offline detail checks pass.
- [ ] Required verification and implementation evidence are recorded.

## Relevant docs

[Model](../docs/design-docs/knowledge-model.md#access), [quality](../docs/product-specs/knowledge-quality.md),
[architecture](../ARCHITECTURE.md), [verification](../docs/development.md).

## Plan

1. Inspect public book lookups and current `library-detail.tsx` / `library-data.ts` composition.
2. Add reusable web presentation and source-preserving position links; preserve compatibility routes.
3. Verify reviewed/unavailable examples, accessibility, and offline reloads; commit coherent checkpoints.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Package tests for changed reusable projections; direct web checks under the development contract.

## Handoff

- State: todo.
- Evidence: Design recorded; implementation and web verification have not started.
- Dependencies: See [feature index](../feature_index.json); released content is usable without corpus-wide completion.
- Next: With feat-101 complete, select this feature and assess external-plan criteria before coding.
