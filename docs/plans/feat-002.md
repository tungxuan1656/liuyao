# Domain contracts Implementation Plan

> **Execution:** Follow repository implementation and verification rules. Track steps with checkboxes; complete F01 only.

**Goal:** Fix and test the portable `@liuyao/core` contracts for bottom-to-top line input, stable IDs, ruleset identity, errors, and structured results.

**Architecture:** Put public domain types and pure validation/position helpers in `packages/liuyao-core/src`, exported through its package entry point. Keep fixture builders and contract tests under `packages/liuyao-core/tests`; do not put test or calculation logic in the web app. Preserve the existing changing-line inspection API while tightening its boundary against malformed runtime input.

**Tech Stack:** TypeScript, Vitest, pnpm workspace.

## Global Constraints

- Follow `features/feat-002.md`, the F01 rows of `docs/product-specs/v1-task-map.md`, and the fixed conventions in `docs/product-specs/v1-mvp.md`.
- Use only `liuyao-standard-v1`; store lines first through sixth, bottom to top; `6` and `9` change.
- Keep package logic deterministic, browser-independent, and free of network, persistence, UI, reference prose, and future F02/F03 calculations.
- The coordinator selected feat-002 and changed its state from `todo` on the base branch to `active` in this checkout before implementation. Keep it the sole active feature until PR merge, synchronized with the handoff in `features/feat-002.md`.
- Inspect the worktree before the write-capable `./init.sh`; run it only when unrelated edits will not be rewritten. Package tests belong in `packages/liuyao-core/tests`, never `apps/web`.

---

## File responsibilities

- `packages/liuyao-core/src/index.ts`: public barrel and existing changing-line summary compatibility.
- `packages/liuyao-core/src/contracts.ts`: line, identifier, ruleset, input, and structured output contracts.
- `packages/liuyao-core/src/validation.ts`: runtime boundary and typed domain errors.
- `packages/liuyao-core/src/positions.ts`: explicit first-to-sixth position helpers.
- `packages/liuyao-core/tests/fixtures.ts`: reusable typed line/input builders for subsequent golden suites.
- `packages/liuyao-core/tests/*.test.ts`: contract, ID, validation, position, and fixture evidence.
- `features/feat-002.md`, `progress.md`: execution evidence and handoff, not duplicate canonical product rules.

### Task 1: Domain types and stable identifiers (F01-T01–T04)

**Files:** Create `packages/liuyao-core/src/contracts.ts`; modify `packages/liuyao-core/src/index.ts`; test `packages/liuyao-core/tests/contracts.test.ts`.

**Interfaces:** Export `LineValue = 6 | 7 | 8 | 9`, `SixLines` as a readonly six-element tuple, `RuleSetId` with sole value `liuyao-standard-v1`, stable trigram/hexagram/palace ID contracts, `HexagramReadingInput`, and structured result types that future F02/F03 calculations can populate. Preserve `inspectReading`, `isChangingLine`, and `countChangingLines` as existing exports.

- [x] Add compile-time assignability assertions for six positions, allowed values, input, and result types; add runtime tests for the ruleset and ID cardinality/uniqueness (8 trigrams, 64 hexagrams, 8 palaces).
- [x] Add contracts and barrel exports; run `pnpm --filter @liuyao/core test` and `pnpm --filter @liuyao/core typecheck`.

### Task 2: Runtime validation and ordered positions (F01-T05–T07)

**Files:** Create `packages/liuyao-core/src/validation.ts` and `packages/liuyao-core/src/positions.ts`; modify `packages/liuyao-core/src/index.ts`; test `packages/liuyao-core/tests/validation.test.ts` and `packages/liuyao-core/tests/positions.test.ts`.

**Interfaces:** Export `validateSixLines(value: unknown): SixLines` accepting exactly six integers in `6..9`, and `validateReadingInput(value: unknown): HexagramReadingInput` reading the raw object's `lines` and `ruleset` fields. An absent ruleset defaults to `liuyao-standard-v1`; a different supplied ruleset throws `UnsupportedRuleSetError`, while malformed input or lines throw `InvalidReadingInputError`. Export position helpers with position 1 mapped to index 0 and position 6 to index 5; never reverse the underlying tuple for display.

- [x] Test short/long/non-array input, fractional/out-of-range/non-number members, and valid boundary values `6,7,8,9`. Directly test that `validateReadingInput({ lines })` defaults an omitted ruleset, an unknown ruleset throws `UnsupportedRuleSetError`, and malformed objects/lines throw `InvalidReadingInputError`.
- [x] Test position bounds, all six index mappings, and unchanged bottom-to-top line order.
- [x] Implement typed errors, boundary validation, and position helpers; rerun package tests and typecheck.

### Task 3: Reusable fixtures and handoff (F01-T08)

**Files:** Create `packages/liuyao-core/tests/fixtures.ts`; test `packages/liuyao-core/tests/fixtures.test.ts`; update `features/feat-002.md` and append to `progress.md` when the result changes.

**Interfaces:** A typed fixture builder creates a fresh `SixLines` tuple and reading input with the standard ruleset; test callers can override each line without mutating shared fixture state.

- [x] Test independent fixture instances, ordered line overrides, and standard ruleset default.
- [x] Implement fixture helpers under package tests only; rerun package tests and typecheck.
- [x] Inspect `git status` and `git diff`; run `./init.sh`, then the read-only checks from `docs/development.md`.
- [x] Check every F01 evidence row and feature acceptance item; record commands/results, limitations, decisions, and next action in `features/feat-002.md` and `progress.md`.
- [x] Commit, push the branch, open PR #12 against `main`, and report its URL and exact head SHA. Keep feat-002 active pending merge and review.

## Review verification gate

- [x] Typecheck package tests through `packages/liuyao-core/tsconfig.test.json`, a separate no-emit project wired into package `typecheck`; the build continues emitting only `src`. This checks the `@ts-expect-error` contract assertions in `tests/contracts.test.ts`, which the original `src`-only project did not check.
- [x] Run updated package typecheck, `./init.sh`, and read-only checks after review fixes; update feature evidence and report the new PR head.

## Risks and decision log

- **2026-09-26 — Scope:** Contracts may name future structured facts but must not compute hexagrams, palaces, or board facts assigned to F02/F03. Use the existing feature record as the accepted design.
- **2026-09-26 — Identity:** Pick explicit, stable domain IDs and test uniqueness rather than derive IDs from localized names or array offsets. Keep the one supported ruleset literal.
- **2026-09-26 — Boundary:** TypeScript tuples do not validate untyped runtime input. Validate before treating imported, user-entered, or deserialized values as `SixLines`.
- **2026-09-26 — Plan review:** Validate the raw reading object's ruleset separately from its line tuple; normalize omission to the sole supported ruleset and reject a different supplied ID with a distinct typed error. Test complete fixed ID inventories as well as uniqueness.
- **2026-09-26 — Follow-up plan review:** Require direct validator tests for defaulting and both concrete error classes. The coordinator activated feat-002 from the base branch's `todo` state before implementation; the PR retains `active` until merge.
- **2026-09-26 — PR review:** The package's original build/typecheck tsconfig included `src` only, so the compile-time test assertions were not checked despite passing Vitest. Add a no-emit test project to package typecheck without changing build output; mark this gate complete only after verification.
- **2026-09-26 — Workspace:** Use the assigned current checkout and branch; do not create another Orca worktree.
