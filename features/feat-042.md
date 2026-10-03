# feat-042 — Plan complete knowledge authoring and verification

## Goal

Expose remaining content and later verification units.

## Scope

- Inventory current gaps and supplied-book section headings.
- Create bounded authoring and grouped audit features with explicit quẻ, line, and source units.
- Add a navigable roadmap and canonical evidence requirements.
- Preserve existing feature history and current corpus data.

## Non-goals

Executing the planned content batches, certifying source accuracy, or changing product behavior.

## Acceptance

- [x] The roadmap lists all 24 missing quẻ and their six missing positions.
- [x] Every supplied-book group has planned authoring and verification ownership.
- [x] All 64 quẻ map to audit features with six separate line acceptance items each.
- [x] Dependencies resolve without cycles; planned work remains `todo`.
- [x] Evidence gates distinguish source comparison, independent approval, and unresolved source limitations.
- [x] Repository verification and book fingerprints pass; the corpus is unchanged.
- [x] Feature and progress records contain evidence and one concrete next action.

## Relevant docs

[Roadmap](knowledge-roadmap.md), [content](../docs/product-specs/knowledge-content.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md),
[verification](../docs/development.md).

## Plan

1. Inspect current coverage and actual source headings.
2. Create the authoring sequence, exhaustive audit units, and dependency graph.
3. Review navigation, ownership, and evidence gates; verify and commit.

## Verification

- Baseline and final `./init.sh`: 263 tests passed; existing lint/build warnings remain.
- Fingerprints and generated freshness passed; 158 local documentation targets resolve.
- Dependency audit preserved the prior 41 entries and found no cycles.
- Sixteen audit features cover all 64 quẻ and 384 unique position items.
- Corpus remains unchanged: 172 records, 1,226 claims, 1,015 citations.

## Handoff

- State: done.
- Result: Created 55 intended execution features with chapter checkpoints and explicit review units.
- Blockers: None for planning; specialist approval remains future work.
- Next: Select feat-043 and build the source-to-record/exclusion crosswalk.
