# feat-042 - Plan complete knowledge authoring and verification

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-041](task-feat-041.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Result: Created 55 intended execution features with chapter checkpoints and explicit review units.
- Blockers: None for planning; specialist approval remains future work.
- Next: Select feat-043 and build the source-to-record/exclusion crosswalk.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — feat-042 completed roadmap and verification

- Historical status: done.
- Result: Created the complete intended backlog, feat-043 through feat-097, and a linked roadmap. Consolidated the draft into 55 execution features, retaining chapter checkpoints, sixteen four-quẻ audits with 384 distinct hào items, and ten group audits. Added versioned evidence, independent approval, and correction gates.
- Evidence: Final `./init.sh` passed 263 tests with existing warnings. Edition fingerprints, generated freshness, 158 local documentation targets, dependency graph, complete hào inventory, and diff checks passed. The prior 41 feature entries and current corpus remain unchanged.
- Blockers: None for planning. No future content or audit feature has executed; specialist approval remains pending.
- Next: Select feat-043 and build the source-to-record/exclusion crosswalk.

## Migration provenance

Migrated from [feat-042](../features/feat-042.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
