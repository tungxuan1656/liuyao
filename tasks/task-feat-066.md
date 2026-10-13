# feat-066 - Close the authoring inventory for all supplied sections

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-065](task-feat-065.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- The source inventory, every released collection, remaining legacy entries, and exclusions.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Every supplied section and later workload split has a source-inventory unit, source anchor, author owner, and audit owner.
- [x] Map released record IDs only where the authored record supports that exact unit; do not inherit a parent mapping as proof of child coverage. Keep selected-only, unmapped, or incomplete units visible and assigned to existing follow-up owners.
- [x] Cross-reference every existing exclusion to its source-inventory unit and specific stated basis; add no exclusions to hide unfinished content. Keep any unreviewed rationale open and assigned to its audit owner.
- [x] No source unit is unclassified or unowned; all 64 quẻ have six positions in each of the three commentary books.
- [x] Reconcile topics, legacy routes, and nextBatch without claiming full passage coverage or independent certification.
- [x] Keep source-review, specialist, and certification gates open/incomplete; do not resolve audit discovery states as part of this crosswalk.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Compare source-inventory units, the expected-unit registry, released records, exclusions, topics, legacy routes, and nextBatch.
2. Map only evidence-supported existing records; retain selected-only or unmapped units as explicit owned follow-up work.
3. Update the evidence-derived coverage report and focused tests without closing audit gates.
4. Run required verification and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged in PR #95 at `46af5cd9069c061ecd2986df1f6e1d220138da9d` from exact reviewed head `54977cc614c22041f62fddd61f18ffb7a2fa2ca2`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. Verify run `37599352568`/job `112719642987`, Cloudflare Pages, and GitGuardian passed. Pre-push `./init.sh` passed 6,378 tests (6,197 knowledge, 181 core); corpus/source-fingerprint validation and package-export checks passed; focused crosswalk tests passed 18/18. Review report: `/Users/tungdoan/.pi/agent/sessions/--Users-tungdoan-Projects-Web-liuyao--/subagent-artifacts/outputs/f69f15eb-cbfe-4543-ba4b-cecd3f1d3606/reports/feat066-final-independent-review.md`; worker report: `/Users/tungdoan/.pi/agent/sessions/--Users-tungdoan-Projects-Web-liuyao--/subagent-artifacts/outputs/d0af9d23-2abb-479b-8712-7279d95ccff0/reports/feat-066-worker-report.md`. The generated 3.6 MiB crosswalk stays under reports and has no runtime/PWA effect. The repository's automatic branch deletion was disabled for this merge, the feature branch was retained, and the original setting was restored afterward.
- Coverage: 4,638 source groups stay discovery-unresolved; 108 content groups lack direct released-record mappings, 127 released records lack direct unit mappings, and 17 exclusion rationales remain pending audit review. The pending classical-traditions topic stays unchanged and is routed to feat-094. No passage coverage, audit, specialist-review, or certification gate is claimed complete.
- Dependencies: feat-065 is done; see [frozen index](../feature_index.json).
- Next: Continue with selected feat-068 from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-07 — feat-066 merged

**State**: done; merged to `main` in PR #95 at `46af5cd9069c061ecd2986df1f6e1d220138da9d`; exact reviewed head `54977cc614c22041f62fddd61f18ffb7a2fa2ca2`.
**Done**: Added a deterministic authoring crosswalk joining source units, expected-unit groups, released records, commentary routes, topics, legacy state, exclusions, and `nextBatch`. It reports 4,488 selected-only groups,108 unmapped content groups,42 non-content groups, and all4,638 discovery states unresolved. All17 existing exclusions are linked to basis units, but their rationale reviews remain pending. All381 released records are accounted for; 254 have direct mappings and127 remain unmapped and routed to feat-094. No source records, claims, citations, or exclusions were added.
**Evidence**: Fresh exact-head review returned `OK`, no findings. Verify run `37599352568`/job `112719642987`, Cloudflare Pages, and GitGuardian passed. The pre-push `./init.sh` passed6,378 tests (6,197 knowledge,181 core); corpus/source fingerprint, package-export and focused18-test checks passed. The generated 3.6MiB report remains under `packages/knowledge/reports/`, outside runtime/PWA. The repository's auto-delete-on-merge setting was temporarily disabled to preserve the feature branch and restored to `true`; remote feature ref remains at the reviewed head.
**Coverage**: All64 quẻ have six positions across each of three commentary books (1,152 cells). BPCT chapter6 labels1–16 and25–56 remain without direct mappings;17–24 and57–69 are mapped only to their selected records. `topic-classical-traditions` remains pending despite23 released records, routed to feat-094. Source discovery, audit, specialist review, and certification remain open/incomplete; no complete passage coverage or certification is claimed.
**Blockers**: none for feat-066.
**Next**: Continue with selected feat-068 from updated `main`.

## Migration provenance

Migrated from [feat-066](../features/feat-066.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
