# feat-068 Knowledge Simplification Implementation Plan

> **Execution:** Follow repository verification rules. Work inline on the new feature branch. Steps use checkbox syntax for tracking.

**Goal:** Replace audit machinery with useful linked JSON knowledge, then improve quẻ 01–04 for learning and reading reference.

**Architecture:** Authored records remain the single source. A structural validator produces a small metadata index, compact compatibility data, and record assets. Detailed content loads by ID and remains available offline.

**Tech Stack:** TypeScript, Node.js, JSON, Vitest, Vite, and the existing PWA cache.

## Global constraints

- Follow [knowledge-model](../design-docs/knowledge-model.md), [content](../product-specs/knowledge-content.md), and [quality](../product-specs/knowledge-quality.md).
- Preserve stable record IDs, quẻ routes, six-line order, source attributions, meaningful conditions, and useful tables/diagrams.
- Preserve the old branch feat/068-audit-hexagrams-01-04 at c80c38d as source material and recovery history.
- Keep PDFs local and retain the current software/data licensing boundary.
- Keep calculation behavior, Vietnamese search normalization, and draft-safe PWA updates intact.
- Do not activate dependent features, publish, or merge this incomplete migration.
- Do not create new audit decisions, hash closures, certification artifacts, or permanent parallel corpora.

## Task 1: Reset the contracts and feature route

**Files:** docs/product-specs/knowledge-content.md, knowledge-quality.md, knowledge-browser.md; docs/design-docs/knowledge-model.md, offline-pwa.md; packages/knowledge/data/README.md; features/knowledge-roadmap.md; AGENTS.md; ARCHITECTURE.md; docs/development.md; future knowledge feature instructions.

**Interface:** These documents own the intended replacement. Mark the current executable implementation as legacy until Task 2 passes.

- [x] Replace audit-first rules with coherent explanations, direct source references, stable links, and focused content checks.
- [x] Align future feature instructions and incoming documentation routes without rewriting older progress blocks.
- [x] Check the written design for ambiguity, invalid examples, broken links, and claims of unimplemented behavior.
- [x] Review the concrete written design before implementation.

## Task 2: Replace storage plumbing and large runtime output

**Files:** packages/knowledge/schema/, scripts/validate-corpus.mjs, release-projection.mjs, src/content.ts, src/content-schema.ts, src/node.ts, src/catalog.ts, src/index.ts, data/, tests/; apps/web/vite.config.ts; package manifests and init.sh where commands change.

**Consumes:** Existing V1/V2 records, separate citations, source catalog, and stable compatibility IDs.
**Produces:** Canonical simplified records; listContent(filters) metadata lookup; loadContent(id) asynchronous record lookup; compact existing lookup adapters.

- [x] Map existing explanation blocks to entries and resolve citation IDs into direct source/page references.
- [x] Group connected source material into readable sections; preserve distinct views, actual conditions, tables, diagrams, and example values.
- [x] Preserve required lesson references as record/line/section links before removing granular claim dependencies.
- [x] Add one structural schema and validation for unique IDs, references, source pages, and six-line invariants.
- [x] Replace full-corpus release imports with a small index and per-record assets. Keep generated outputs in build output.
- [x] Remove retiring audit/gate/report code and its tests only after the replacement protects meaningful data and behavior.
- [x] Replace hardcoded corpus totals and repeated full-corpus fixtures with focused validator cases and one corpus integration check.
- [x] Precache JSON assets and preserve the existing update flow. Measure raw/gzip sizes, startup bundle, total offline assets, and parsing cost.
- [x] Check changed package APIs, direct web routes, search behavior, source visibility, and offline reload with real content.

## Task 3: Rebuild quẻ 01–04 as learning content

**Files:** packages/knowledge/data/hexagrams/hexagram-01.json through hexagram-04.json; relevant source metadata; features/feat-068.md; progress.md.

**Consumes:** Simplified model, main's source-backed content, and useful original writing/page observations from the preserved branch.
**Produces:** Four readable linked quẻ with all 24 positions and source references; concise known-gap notes.

- [x] Compare the old branch's additions with main; recover meaningful writing without importing ledgers, snapshots, or repeated authoring disclaimers.
- [x] Review each quẻ overview, six positions, distinct author views, and relevant special/context passages against the supplied sources.
- [x] Keep general context in its parent section instead of copying it into six lines.
- [x] Preserve the unlocated NTT Mông referral as an exact gap; do not invent content or block unrelated supported explanations.
- [x] Check the 24 position acceptance items against actual content rather than decision counts.
- [x] Run ./init.sh and the replacement read-only corpus check. Record measurements and content findings.
- [x] Complete the feature only when migration, content acceptance, and verification pass.

## PR review follow-up

- [x] Reuse the record schema for runtime validation before caching; preserve retry and measure payload cost.
- [x] Enforce unique rendered anchors and one table-target ID rule across validation and UI.
- [x] Collect all source references for metadata and compatibility references.
- [x] Verify deep links into collapsed entries, custom table targets, and invalid-asset recovery in the browser.
- [x] Run ./init.sh, record evidence, and prepare the repair for PR #96.

## Handoff

State: done. The user approved the design on 2026-10-09; storage migration and four-quẻ editing are complete.
[Feat-068](../../features/feat-068.md#verification-evidence) records source findings, measurements, and verification.
No dependent feature was activated. The old feature branch remains available for recovery.
