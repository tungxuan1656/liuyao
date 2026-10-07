# feat-065 — Author ordered lessons and reviewed worked examples

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- Original Vietnamese learning content based on released reviewed claims.

## Non-goals

New interpretation, calendar, or UI behavior.

## Accepted design

Author four V2 lesson records, one for each acceptance group, using original Vietnamese prose supported by existing released, reviewed claims:

| Sequence | Lesson ID                  | Scope                                                            | Prerequisites        |
| -------- | -------------------------- | ---------------------------------------------------------------- | -------------------- |
| 1        | `lesson-foundations`       | Polarity, positions, trigrams, and hexagram building             | None                 |
| 2        | `lesson-classical-reading` | Passage types, six positions, and attributed author alternatives | `lesson-foundations` |
| 3        | `lesson-liuyao-board`      | Casting, palaces, Thế/Ứng, Na Jia, elements, relatives           | `lesson-foundations` |
| 4        | `lesson-worked-readings`   | Explicit inputs, moving lines, changed quẻ, and board facts      | Lessons 2 and 3      |

Keep the four records ordered by sequence 1–4. Each explanatory or worked-example block must name existing supporting claim IDs; lesson review evidence must cover those claims. Worked examples state explicit inputs and expected outputs, which focused tests independently check against deterministic core results. Do not add source claims or new source units. This content is derivative learning material, not new interpretation, calculation behavior, UI, or calendar behavior.

## Acceptance

- [ ] Foundations: polarity, positions, trigrams, construction.
- [ ] Classical reading: passage types, six positions, author alternatives.
- [ ] Liu Yao board: casting, palaces, Thế/Ứng, Na Jia, elements, relatives.
- [ ] Worked examples: explicit inputs, moving lines, changed quẻ, board facts.
- [ ] Every block resolves to supporting claim IDs; expected outcomes are checked independently.
- [ ] Persist block evidence, lesson sequence, and declared prerequisites through feat-101; reject unavailable support and prerequisite cycles.
- [ ] Reference content does not activate browser, calendar, or interpretation changes.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Select existing released, reviewed claim IDs for each lesson block; add no new source claims or source units.
2. Author the four V2 lesson records with sequence, evidence, and the approved prerequisite graph.
3. Add worked-reading fixtures with explicit inputs and expected facts; independently verify outcomes against deterministic core results.
4. Regenerate manifest coverage/release artifacts and test evidence closure, ordering, prerequisite validation, and public exports.
5. Run the verification commands and record final acceptance evidence.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active on `feat/065-ordered-lessons-worked-examples`; base `1de085b`.
- Evidence: Dependencies feat-064 and feat-101 are done. User-approved four-lesson design and inline implementation plan are recorded above. No implementation verification yet.
- Dependencies: See [feature index](../feature_index.json).
- Next: Map reviewed claim support to the four lessons, then author the V2 records and verified worked examples.
