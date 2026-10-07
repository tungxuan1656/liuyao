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

- [x] Foundations: polarity, positions, trigrams, construction.
- [x] Classical reading: passage types, six positions, author alternatives.
- [x] Liu Yao board: casting, palaces, Thế/Ứng, Na Jia, elements, relatives.
- [x] Worked examples: explicit inputs, moving lines, changed quẻ, board facts.
- [x] Every block resolves to supporting claim IDs; expected outcomes are checked independently.
- [x] Persist block evidence, lesson sequence, and declared prerequisites through feat-101; reject unavailable support and prerequisite cycles.
- [x] Reference content does not activate browser, calendar, or interpretation changes.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

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

## Implementation Evidence

- Implementation uses exactly four V2 lessons, sequences 1–4 and the accepted prerequisite graph. Their 17 ordered blocks reference existing selected reviewed claims only; evidence sets contain 15, 17, 6, and 32 claims respectively. No new claims, citations, source units, or source-edition metadata are authored.
- Coordinator-approved schema adjustment: V2 lessons may retain the required `claims` field as an empty array because block support and review evidence carry their existing claim-level evidence. Non-lesson V2 records and all V1 records retain at least one claim. Schema regressions and the [canonical model contract](../docs/design-docs/knowledge-model.md) record this lesson-only exception. No shared runtime rule or abstraction changes.
- Prerequisite order is asserted for these four records, not imposed as a new global runtime rule. Existing validation continues to reject unavailable support, unselected prerequisites, duplicate sequences, and prerequisite cycles.
- Three hand-authored fixtures at `packages/knowledge/tests/fixtures/ordered-lessons-worked-readings.json` independently specify `[6,7,8,7,7,7]` Tụng→Lý (moving 1), `[7,7,7,7,7,7]` static Càn (no changed quẻ), and `[9,9,9,9,9,9]` Càn→Khôn (moving 1–6). Tests compare complete primary-board rows, quẻ IDs, changing positions, and changed patterns with deterministic core APIs, separately checking expected facts against released reviewed tables and the existing NHL transformation. Fixture creation does not invoke core APIs. No audit fixture registration or certification is claimed.
- `book-ordered-lessons.test.mjs` and `book-worked-readings.test.ts` add 20 focused tests; the schema exception adds one regression. Existing corpus-count assertions are updated exactly from 377 to 381 without relaxing any assertion. Focused lesson/schema/table/release/dependency tests: 91 passed; core tests: 181 passed.
- `./init.sh` passes format, lint, TypeScript length, typecheck, builds, package exports, and all 6,360 tests (181 core + 6,179 knowledge). Final knowledge full suite: 149.60 seconds; the eight-file focused suite: 6.01 seconds. No repository test timeout changes. An initial invocation exceeded the external 180-second command limit after revealing stale record-count and authoring-note assertions; retained prior-note evidence and exact count updates resolve them, and the subsequent full workflow passes with sufficient command allowance.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` and `pnpm --dir apps/web run check:package-exports` pass. A separate built-package import check verifies all four exported lessons exactly match authored records, retain immutable blocks, resolve public navigation, and return all three complete expected readings through public core exports.
- Corpus is 381 reviewed released records, 9,503 claims, 9,744 citations, 64 quẻ and 384 positions. Compared with activation HEAD `e70a513bd60cab60d2463b6d447fcb7163d646f3`, all 377 prior authored records are byte-identical and all 377 prior released records semantically identical; all citations, source/edition metadata, inventory, expected-units registry, and existing audit ledgers remain unchanged.
- Source-review and certification gates remain closed; certification remains absent, coverage `complete` remains false. All 84 prior decisions stay current and zero stale; 197 of 9,503 released claims remain audit-covered. Generated required targets increase from 6,471 to 6,492 solely for four lesson owners and 17 blocks, with no new source units. Audit093 and corpus-wide verification remain outstanding.
- Integrated asset `index-CAjNoJyd.js` measures 12,667,914 bytes. Existing Workbox cap remains 13,631,488 bytes (963,574 bytes headroom); all 18 precache entries remain, including the integrated asset. No PWA configuration or UI/calendar/interpretation behavior changes.
- Released snapshot: `liuyao-knowledge-snapshot-v1:sha256:1eb03d3fbcc676617b8dfea37dfae441576068f5e4ef938198a8eba35a90c288`. This binds derivative content, not independent audit approval.
- Final exact-head independent review returned `OK WITH NOTES` with no P0–P2 findings. P3 notes identify the parent-owned post-merge feature index/progress/handoff update and 21 remaining audit targets for feat-093; neither blocks delivery. PR #93 merged at `8be7513287bbc642990d87f0c853249214b03244` from reviewed head `133009eda92d3f9e146f88999770c7ede3a10ca4`. Verify run `37586251857`/job `112676934117`, Cloudflare Pages, and GitGuardian passed. The pre-push `./init.sh` passed 6,360 tests (6,179 knowledge, 181 core). Source audit and corpus-wide verification/certification remain open/incomplete.

## Handoff

- State: done; merged to `main` in PR #93 at `8be7513287bbc642990d87f0c853249214b03244` from reviewed head `133009eda92d3f9e146f88999770c7ede3a10ca4`.
- Evidence: Independent exact-head review returned `OK WITH NOTES`, with no P0–P2 findings. Exact-head verify run `37586251857`/job `112676934117`, Cloudflare Pages, and GitGuardian passed; the pre-push `./init.sh` passed 6,360 tests. Report: `/Users/tungdoan/.pi/agent/sessions/--Users-tungdoan-Projects-Web-liuyao--/subagent-artifacts/outputs/6cd668bc-d790-4348-a8cb-53d6fa4ac944/reports/feat-065-independent-review.md`.
- Coverage: Four V2 lessons, 17 supported blocks, and three worked examples; no new source claims or units. Source audit, verification, and certification remain open/incomplete; the 21 derivative lesson audit targets remain assigned to feat-093.
- Dependencies: See [feature index](../feature_index.json).
- Next: Continue with selected feat-066 from updated `main`.
