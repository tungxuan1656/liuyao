# feat-024 — Preserve automatic-casting evidence and align UX contract

## Goal

Match automatic-casting interaction to its documented contract and retain raw toss evidence.

## Scope

- Choose and document one-shot or per-line automatic casting as a proposed product decision.
- Match the UI to that decision.
- Retain six immutable three-coin toss records in the active automatic-reading snapshot.
- Test snapshot integrity without fabricating tosses for direct or manual input.

## Non-goals

- Change deterministic final six-line input values.
- Invent coin-toss evidence for direct or manual readings.

## Acceptance

- [x] Product contract explicitly chooses one-shot or per-line automatic casting.
- [x] UI matches the chosen contract (source inspection; browser interaction not tested).
- [x] Automatic readings retain six three-coin toss records in the active snapshot.
- [x] Direct and manual input do not fabricate tosses; final line input remains unchanged.
- [x] Tests/E2E cover automatic snapshot integrity (core package tests; web E2E not added).
- [x] `./init.sh` passes.

## Relevant docs

- [GitHub issue #29](https://github.com/tungxuan1656/liuyao/issues/29) — canonical acceptance source
- `docs/product-specs/reading-flow.md`
- `docs/product-specs/ui-layout.md`

## Plan

1. Resolve the automatic-casting interaction contract and update both product specs.
2. Preserve toss evidence in the active snapshot and test its integrity.

## Verify

- `./init.sh`

## Handoff

- State: done
- Evidence: User selected per-line casting. The product specs now define one three-coin toss per line and preservation on revisit. UI shows each outcome before advancing; core copies, validates, and freezes six toss records, which the active automatic reading retains. Manual/direct completion stores no tosses. Core snapshot tests cover integrity, limits and mismatches; `./init.sh` passed on 2026-09-28 (one existing lint warning). Browser interaction and web E2E were not tested.
- Dependency check: feat-007 is done.
- Next: Integrate PR and confirm issue #29 closed after merge.
