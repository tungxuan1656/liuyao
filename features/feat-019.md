# feat-019 — Correct static-line changed annotations

## Goal

Show accurate changed-board annotations and polarity for moving and static lines.

## Scope

- Correct changed-board labels for moving and static lines.
- Add regression coverage for a reading with one moving line.

## Non-goals

- Change no-change reading behavior or hexagram calculations.

## Acceptance

- [ ] Only moving lines are labeled as changed; static lines are unchanged or unannotated.
- [ ] Polarity is correct at all six positions, and a no-change reading omits the changed board.
- [ ] Regression coverage verifies one moving line.
- [ ] `./init.sh` passes.

## Relevant docs

- [GitHub issue #25](https://github.com/tungxuan1656/liuyao/issues/25) — canonical acceptance source
- `docs/product-specs/reading-result.md`

## Plan

1. Correct changed-board annotation and retain polarity behavior.
2. Add regression coverage for a one-moving-line reading.

## Verify

- `./init.sh`

## Handoff

- State: todo
- Evidence: Issue #25 confirmed; implementation not started.
- Dependency check: feat-008 is done.
- Next: Verify dependencies, then select the feature for implementation.
