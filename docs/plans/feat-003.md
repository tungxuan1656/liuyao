# Hexagram Calculation Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Use Orca-supervised agents only for delegated execution; the local `executing-plans` workflow is optional when appropriate. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Identify all 64 primary hexagrams and correctly identify transformed hexagrams for changing lines, using bottom-to-top six-line input.

**Architecture:** Keep pure polarity, trigram, canonical hexagram lookup, and line transformation in `@liuyao/core`. Expose one F02-only calculation result; do not populate the existing `ReadingResult` board fields, which belong to F03. Preserve the existing input validation, stable IDs, and compatibility summary API.

**Tech Stack:** TypeScript, Vitest, pnpm workspace (`@liuyao/core`).

## Global Constraints

- Ruleset: `liuyao-standard-v1`; positions 1–6 run bottom to top.
- `6` and `9` change; `6` and `8` are yin, `7` and `9` are yang.
- Calculations are deterministic and local; no web, knowledge, network, storage, or explanatory prose dependency.
- F03 owns palace, Shi/Ying, Na Jia, elements, Six Relatives, and the full `ReadingResult` contract.
- Treat `docs/product-specs/v1-task-map.md` F02-T01–T10 as canonical scope and evidence.

---

## File structure

- `packages/liuyao-core/src/polarity.ts`: polarity and changing-line transformation.
- `packages/liuyao-core/src/trigrams.ts`: eight bottom-to-top polarity patterns and trigram lookup.
- `packages/liuyao-core/src/hexagrams.ts`: canonical 8×8 upper/lower trigram → stable hexagram ID table and lookup.
- `packages/liuyao-core/src/calculation.ts`: validated input → structured F02 result and changed-hexagram orchestration.
- `packages/liuyao-core/src/contracts.ts`: F02 result type only; retain F01 types unchanged.
- `packages/liuyao-core/src/index.ts`: export the new calculation API without removing existing exports.
- `packages/liuyao-core/tests/{polarity,trigrams,hexagrams,calculation}.test.ts`: package-level fixtures and tests; reuse `tests/fixtures.ts` where helpful.

### Task 1: Polarity and moving-line transformation (F02-T01, T06)

**Files:** Create `src/polarity.ts`, `tests/polarity.test.ts`; modify `src/index.ts` to export pure helpers.

**Interfaces:** `linePolarity(value: LineValue): Polarity`; `transformChangingLines(lines: SixLines): SixLines`. Transform `6 → 7`, `9 → 8`; leave `7` and `8` unchanged. Return a fresh bottom-to-top tuple without mutating input.

- [ ] Write table tests for `6→yin`, `7→yang`, `8→yin`, `9→yang`; cover both moving directions and unchanged values, plus mixed six-line combinations and input immutability.
- [ ] Run `pnpm --filter @liuyao/core test`; confirm the new tests fail before implementation.
- [ ] Implement only these pure functions and export them from `index.ts`; reuse `isChangingLine` rather than redefining what changes.
- [ ] Run `pnpm --filter @liuyao/core test` and `pnpm --filter @liuyao/core typecheck`; confirm passing evidence.

### Task 2: Eight trigrams and six-line identification (F02-T02, T03)

**Files:** Create `src/trigrams.ts`, `tests/trigrams.test.ts`; modify `src/index.ts`.

**Interfaces:** `identifyTrigram(lines: readonly [LineValue, LineValue, LineValue]): TrigramId`; `identifyTrigrams(lines: SixLines): { lowerTrigramId: TrigramId; upperTrigramId: TrigramId }`. Trigram patterns, written bottom-to-top with `1=yang`, `0=yin`: heaven `111`, lake `110`, fire `101`, thunder `100`, wind `011`, water `010`, mountain `001`, earth `000`. Slice positions 1–3 as lower, 4–6 as upper; old and young lines of the same polarity identify equally.

- [ ] Write eight table fixtures with independent expected IDs and a six-line test proving lower/upper are not swapped; repeat representative cases with moving values.
- [ ] Run the package tests and observe the intended failures.
- [ ] Add a complete, typed pattern table and lookup with no name-based inference; export both functions.
- [ ] Run package tests and typecheck; ensure all eight distinct IDs appear once.

### Task 3: Canonical 64-hexagram mapping (F02-T04, T05)

**Files:** Create `src/hexagrams.ts`, `tests/hexagrams.test.ts`; modify `src/index.ts`.

**Interfaces:** `identifyHexagram(lower: TrigramId, upper: TrigramId): HexagramId`. Store one explicit 8×8 lookup, keyed by upper trigram rows and lower trigram columns in `TRIGRAM_IDS` order; no binary index assumed to equal King Wen order.

- [ ] Build an independent fixture of all 64 `(lower, upper, hexagram ID)` pairs from **Stanford Encyclopedia of Philosophy, “Chinese Philosophy of Change (Yijing),” Appendices 1 and 3**, https://plato.stanford.edu/entries/chinese-change/appendix.html. Appendix 3 lists King Wen numbers and `[lower upper]` three-line codes: read each `u` (yang) or `w` (yin) group bottom-to-top; map the first group to the **lower/inner** trigram (positions 1–3) and the second to the **upper/outer** trigram (positions 4–6), using Appendix 1's trigram codes. Transcribe all 64 expected pairs independently of the runtime table and cite this URL and these appendix sections in the fixture comment. Include lower/upper anchors: heaven/heaven `01`, earth/earth `02`, thunder/water `03`, water/mountain `04`, water/water `29`, fire/fire `30`, fire/water `63`, water/fire `64`.
- [ ] Run package tests and confirm lookup tests fail without the implementation.
- [ ] Implement the explicit complete mapping; use `HexagramId` and `TrigramId`, and reject silently missing cells at typecheck or test time.
- [ ] Run the 64-fixture tests, assert each ID appears exactly once, then run package typecheck.

### Task 4: Public F02 calculation (F02-T07–T10)

**Files:** Create `src/calculation.ts`, `tests/calculation.test.ts`; modify `src/contracts.ts`, `src/index.ts`.

**Interfaces:** Add `HexagramCalculationResult` with `ruleset: RuleSetId`, `primaryHexagramId: HexagramId`, `changedHexagramId: HexagramId | null`, `lowerTrigramId: TrigramId`, `upperTrigramId: TrigramId`, and `changingPositions: readonly ResultLinePosition[]`. Add `calculateHexagram(input: unknown): HexagramCalculationResult` as a public validated boundary using `validateReadingInput`. Do not claim it returns `ReadingResult`: board data is not available until F03.

- [ ] Write API tests across all 64 static primary configurations (values `7`/`8`); for **each** configuration assert `primaryHexagramId` against the independently transcribed 64-pair fixture from Task 3, plus a null changed ID, the fixture's lower/upper IDs, and the ruleset. Do not derive expected IDs by calling `identifyHexagram` or reading the runtime mapping.
- [ ] Add golden cases with `6` alone, `9` alone, both, and mixed multi-line changes including first and sixth positions; assert expected changed IDs independently of the implementation lookup. Verify input is unchanged and invalid input throws the existing typed error.
- [ ] Run the tests to see failures, then compose validated input, Task 1–3 helpers, and ordered one-based changing positions; calculate the changed ID only when at least one line moves.
- [ ] Run `pnpm --filter @liuyao/core test`, `pnpm --filter @liuyao/core typecheck`, and `./init.sh` when unrelated working-tree changes are safe from fixers; record actual evidence in `features/feat-003.md`.

## Completion and handoff

- [ ] Audit F02-T01–T10 against fixtures, public API, bottom-to-top ordering, static/null behavior, and `./init.sh` evidence.
- [ ] Update `features/feat-003.md`, `feature_index.json`, and append a new `progress.md` block only after implementation meets all acceptance criteria; keep F03 work pending.
