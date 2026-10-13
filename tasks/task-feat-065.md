# feat-065 - Author ordered lessons and reviewed worked examples

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-064](task-feat-064.md), [feat-101](task-feat-101.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- Original Vietnamese learning content based on released reviewed claims.

## Non-goals

New interpretation, calendar, or UI behavior.

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #93 at `8be7513287bbc642990d87f0c853249214b03244` from reviewed head `133009eda92d3f9e146f88999770c7ede3a10ca4`.
- Evidence: Independent exact-head review returned `OK WITH NOTES`, with no P0–P2 findings. Exact-head verify run `37586251857`/job `112676934117`, Cloudflare Pages, and GitGuardian passed; the pre-push `./init.sh` passed 6,360 tests. Report: `/Users/tungdoan/.pi/agent/sessions/--Users-tungdoan-Projects-Web-liuyao--/subagent-artifacts/outputs/6cd668bc-d790-4348-a8cb-53d6fa4ac944/reports/feat-065-independent-review.md`.
- Coverage: Four V2 lessons, 17 supported blocks, and three worked examples; no new source claims or units. Source audit, verification, and certification remain open/incomplete; the 21 derivative lesson audit targets remain assigned to feat-093.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Continue with selected feat-066 from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-07 — feat-065 merged

**State**: done; merged to `main` in PR #93 at `8be7513287bbc642990d87f0c853249214b03244`; reviewed exact head `133009eda92d3f9e146f88999770c7ede3a10ca4`.
**Done**: Added four ordered V2 lessons with 17 original Vietnamese blocks supported by existing released, reviewed claims, and three independently checked worked examples. No new claims, citations, book source units, or source exclusions were added.
**Evidence**: Independent exact-head review returned `OK WITH NOTES` with no P0–P2 findings. Verify run `37586251857`/job `112676934117`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed 6,360 tests (6,179 knowledge, 181 core); corpus/books, package-export, deterministic core/table checks and prior-corpus preservation passed. Only lesson V2 may have an empty `claims` array; non-lesson V2 and V1 claim requirements remain unchanged.
**Coverage**: Release has381 records,9,503 claims,9,744 citations; all377 prior records and9,744 citations are preserved. Source inventory and expected-units registry are unchanged. Required audit targets increase from6,471 to6,492 only for four lesson owners and17 blocks; feat-093 remains outstanding. The12,667,914-byte asset remains under the13 MiB Workbox cap with963,574 bytes headroom; all18 precache entries remain. Global source review, audit, verification and certification remain open/incomplete; no independent audit or certification is claimed.
**Blockers**: none for feat-065.
**Next**: Continue with selected feat-066 from updated `main`.

## Migration provenance

Migrated from [feat-065](../features/feat-065.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
