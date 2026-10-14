# Book-backed JSON foundation and pilot Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Execute inline in the current workspace. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Deliver a cited JSON pilot that supports expansion on both approved content tracks.

**Architecture:** The knowledge package owns JSON authoring, evidence, validation, coverage, and readonly access. Existing package APIs receive an adapter; calculation logic stays in the core. Legacy records remain explicitly unaudited until individually replaced.

**Tech Stack:** UTF-8 JSON, JSON Schema, Node.js, TypeScript, and the existing pnpm workspace.

## Global Constraints

- Preserve current domain IDs and offline package APIs.
- Keep each authored record in one canonical JSON location.
- Attribute interpretations and cite each substantive claim to the exact supplied edition.
- Write user-facing summaries in Vietnamese and repository documentation in English.
- Write original summaries; do not redistribute supplied PDFs or modern translations.
- Mechanical validation does not certify source meaning.
- Record unresolved source conflicts and withhold unresolved claims from release.

## Task 1: Corpus format and mechanical evidence checks

**Files:** `packages/knowledge/schema/`, `packages/knowledge/scripts/`, `packages/knowledge/data/manifest.json`, `packages/knowledge/data/sources.json`, and `packages/knowledge/package.json`.

**Interfaces:** A version-1 corpus contains typed records, citations, source editions, declared topics, and explicit release IDs. The validator reads only manifest-listed files and reports unresolved references, page bounds, claim evidence, and release eligibility.

- [x] Define strict schemas for records, citations, sources, manifest, and collection-specific fields.
- [x] Add JSON Schema validation and cross-record checks with actionable file/ID errors.
- [x] Generate coverage from authored files, including 64 hexagrams, 384 positions, and separate per-author commentary counts.
- [x] Integrate `validate:corpus` into package build/typecheck so the existing harness enforces it.

## Task 2: Source-reviewed pilot in both tracks

**Files:** `packages/knowledge/data/citations/`, `trigrams/`, `hexagrams/`, `casting/`, `liuyao/`, and `terms/`.

**Interfaces:** Claims carry citation IDs and attribution; structural fields carry supporting claim IDs. Line entries use positions 1–6 from bottom to top. Special Càn/Khôn passages use separate records within their quẻ.

- [x] Locate and inspect NHL's four pilot chapters and the corresponding PBC/NTT overview passages.
- [x] Read BPCT's casting, trigram, element, palace, marker, and Na Jia sections; inspect rendered symbols and tables.
- [x] Author eight trigram records and four pilot quẻ with 24 NHL-attributed line summaries and PBC/NTT overview comparisons.
- [x] Author physical three-coin casting, Tụng-to-Lý transformation, and foundational Liu Yao records with reference tables.
- [x] Preserve edition errors and supported resolutions in discrepancy metadata.
- [x] Run corpus checks and review all authored summaries against their cited passages.

## Task 3: Package migration and resumable handoff

**Files:** `packages/knowledge/src/`, existing `packages/knowledge/data/*.ts`, `packages/knowledge/data/legacy/`, `packages/knowledge/tsconfig.json`, and canonical knowledge documentation.

**Interfaces:** Keep `listHexagrams`, `getHexagram`, term/rule/source lookup, and search compatible. Add readonly `listBookRecords`, `getBookRecord`, and citation access for the richer format. A generated import module follows the manifest; it contains no independently authored knowledge.

- [x] Convert pre-existing authoring records to a JSON compatibility snapshot without upgrading their review state.
- [x] Replace migrated IDs through a reviewed-record adapter and remove equivalent legacy copies.
- [x] Generate imports reproducibly and expose deep-frozen record/citation lookup.
- [x] Update storage, quality, and data guides to describe observed behavior and remaining gaps.
- [x] Run `./init.sh`, inspect the generated coverage, and check the diff.
- [x] Record pilot completion and the exact next authorized batch: Truân, Mông, Nhu, Sư plus the next located Liu Yao topic group.

## Continuation after the pilot

The approved corpus remains larger than this feature. Subsequent batches continue both tracks, expand all 64 quẻ and 384 line positions, add remaining author comparisons and advanced topics, and integrate richer browsing. The pilot's coverage report and missing topic inventory select the next batch without treating this foundation as corpus completion.

## Verification evidence

- Source comparison: all 43 citation locators, covering 47 PDF pages, were inspected against the fingerprinted inputs.
- Visual review: BPCT PDF pages 10–14, 52, and 62 were rendered and inspected, together with the pilot quẻ symbols.
- NHL line commentary and special passages retain attribution. PBC/NTT pilot overviews retain their separate interpretations.
- `./init.sh` passes with 263 package tests. Tests cover release selection, invalid evidence, generator freshness, readonly APIs, and table compatibility.
- `validate:corpus --check-books --check` verifies supplied fingerprints and generated output freshness.
- Chromium loads Càn and source metadata after the production server stops.
- Coverage and the exact next batch are generated from the manifest.

The pilot completes this feature. Full corpus authoring and expanded browsing remain subsequent delivery work.
