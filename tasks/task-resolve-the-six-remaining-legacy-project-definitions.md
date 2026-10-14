# task-resolve-the-six-remaining-legacy-project-definitions - Resolve the six remaining legacy project definitions

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reconcile-can-and-khon-special-classical-passages](task-reconcile-can-and-khon-special-classical-passages.md), [task-complete-extended-knowledge-records-and-provenance-contracts](task-complete-extended-knowledge-records-and-provenance-contracts.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- Legacy term-ruleset, term-primary-hexagram, term-changed-hexagram, term-line-value.
- Legacy rule-reading-result-fields and rule-line-polarity-values.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Each of the four terms and two rules, with a stable replacement route.
- [x] Separate book-supported meaning from accepted software conventions.
- [x] Use the project contract for software fields; do not invent book citations.
- [x] Persist convention evidence and reviewed specification revisions through the implemented task-complete-extended-knowledge-records-and-provenance-contracts contract.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

### Implementation acceptance evidence

The six stable IDs now resolve to released V2 records through the existing public record, compatibility, and navigation APIs. Each record has one `project-convention` claim, empty `citationIds`, explicit `projectEvidence` at revision `v1`, and reviewed `evidenceClaimIds`. Review notes distinguish project-specification comparison from book doctrine and independent certification.

| Stable ID                    | Authored route                                                    | Accepted evidence sections                                      |
| ---------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| `term-ruleset`               | `packages/knowledge/data/terms/term-ruleset.json`                 | Domain model: `## Stable IDs`; calculation pipeline: `## Rules` |
| `term-primary-hexagram`      | `packages/knowledge/data/terms/term-primary-hexagram.json`        | Domain model: `## Line contract`, `## Reading result`           |
| `term-changed-hexagram`      | `packages/knowledge/data/terms/term-changed-hexagram.json`        | Calculation pipeline: `## Changed hexagram`                     |
| `term-line-value`            | `packages/knowledge/data/terms/term-line-value.json`              | Domain model: `## Line contract`                                |
| `rule-reading-result-fields` | `packages/knowledge/data/casting/rule-reading-result-fields.json` | Domain model: `## Stable IDs`, `## Reading result`              |
| `rule-line-polarity-values`  | `packages/knowledge/data/casting/rule-line-polarity-values.json`  | Domain model: `## Line contract`, `## Reading result`           |

The accepted documents are `docs/design-docs/domain-model.md` and `docs/design-docs/calculation-pipeline.md`. No coin-randomization or casting-presentation claims are added, so reading-flow sections are not registered. The domain-model result list now includes the existing `ruleset` field from the core contract; runtime behavior is unchanged.

**No-book-source disposition:** These software-only definitions have no supplied-book page or edition unit. They are not supplied-book inclusions or exclusions. The source inventory, expected-unit registry, groups, layers, exclusions, and all existing book citations stay unchanged. The former legacy definitions migrate only to the same IDs above; all legacy sources and references remain unchanged and unaudited.

The V2 review schema previously required nonempty book review citations even for pure project conventions. The approved narrow correction accepts nonempty citation evidence or nonempty claim evidence for reviewed V2 records; supplied-book claims still require citations and citation review coverage. The V1 schema is unchanged. Focused schema and cross-file regressions cover absent/empty review evidence and prevent claim review evidence from substituting for book citations.

Verification completed:

- Baseline and implementation `./init.sh` passed; implementation tests: 181 core and 6,158 knowledge, including 18 added tests. Existing four React Fast Refresh warnings and the Vite large-chunk advisory remain.
- Focused definition, coverage, schema, dependency, project-evidence, publication, catalog, and fact-route tests: 94 passed in eight files (6.81 seconds).
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`, package export checks, knowledge typecheck, format freshness, and diff checks passed.
- Direct built ESM export comparisons passed for all six records/claims, immutable project evidence, compatibility lookup, and navigation. All 371 previous released records, 9,744 released citations, 46 citation files, and four source works are unchanged.
- Coverage: 377 released records, 9,503 claims, 9,744 citations; 64 quẻ and 384 positions remain unchanged. Intentional project citation absence is not reported as missing book evidence.
- Audit state remains closed: source review and certification closed, certification absent, 84 current decisions and 197 covered claims unchanged. The six new claims correctly add six missing audit obligations; no audit approval is implied.
- Integrated `assets/index-Cq0gN7X9.js`: 12,647,813 bytes; existing Workbox per-file cap: 13,631,488 bytes; reserve: 983,675 bytes. All 18 precache entries remain, totaling 13,311,452 bytes; no PWA configuration change is needed.

Implementation evidence is recorded; independent acceptance review and final feature handoff remain parent-owned. The feature stays active, and the final acceptance item remains unchecked until that handoff is recorded.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #92 at `681faef23facdb2b621019f4d752b2e50ae008b7`, from reviewed head `6acf20dd0777b3e5217885f440c2c7f415547953`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. Verify run `37577158278`/job `112648505629`, Cloudflare Pages, and GitGuardian passed. Pre-push `./init.sh` passed 6,339 tests (6,158 knowledge, 181 core); corpus/book validation, package exports, typecheck, and focused tests passed. All 371 prior released records and 9,744 citations are preserved. The measured 12,647,813-byte asset fits the existing 13 MiB Workbox cap; all 18 precache entries remain.
- Coverage: Six stable legacy IDs now resolve to reviewed V2 project-convention records with `v1` project evidence and no invented book citations. No supplied-book source units or expected-unit groups were added; source audit, global review, and certification remain open/incomplete.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Continue with selected task-author-ordered-lessons-and-reviewed-worked-examples from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-07 — task-resolve-the-six-remaining-legacy-project-definitions merged

**State**: done; merged to `main` in PR #92 at `681faef23facdb2b621019f4d752b2e50ae008b7`; reviewed exact head `6acf20dd0777b3e5217885f440c2c7f415547953`.
**Done**: Migrated four terms and two rules from the unaudited legacy catalog to V2 project-convention records, preserving all six stable IDs, with no invented book citations or source units. Updated the domain-model result fields to document the already-existing `ReadingResult.ruleset`.
**Evidence**: Independent exact-head review returned `OK`, no findings. Verify run `37577158278`/job `112648505629`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed 6,339 tests (6,158 knowledge, 181 core); corpus/books validation, typecheck, package exports, 94 focused tests and prior-corpus preservation checks passed. V2 schema regression coverage accepts project `evidenceClaimIds` without weakening book-citation gates; V1 schema is unchanged.
**Coverage**: Release has 377 records/9,503 claims/9,744 citations; all371 prior records and citations are preserved. Source inventory and expected units remain unchanged (revision57, 4,638 groups, 17 exclusions). The 12,647,813-byte bundle remains under the 13 MiB cap, with all18 precache entries. Source audit, global source review and certification remain open/incomplete.
**Blockers**: none for task-resolve-the-six-remaining-legacy-project-definitions.
**Next**: Continue with selected task-author-ordered-lessons-and-reviewed-worked-examples from updated `main`.
