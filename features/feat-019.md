# feat-019 — Correct static-line changed annotations

## Goal

Show accurate changed-board annotations and polarity for moving and static lines.

## Scope

- Correct changed-board labels for moving and static lines.
- Add regression coverage for a reading with one moving line.

## Non-goals

- Change no-change reading behavior or hexagram calculations.

## Acceptance

- [x] Only moving lines are labeled as changed; static lines are unchanged or unannotated.
- [x] Polarity is correct at all six positions, and a no-change reading omits the changed board.
- [x] Regression coverage verifies one moving line.
- [x] `./init.sh` passes.

## Relevant docs

- [GitHub issue #25](https://github.com/tungxuan1656/liuyao/issues/25) — canonical acceptance source
- `docs/product-specs/reading-result.md`

## Plan

1. Correct changed-board annotation and retain polarity behavior.
2. Add regression coverage for a one-moving-line reading.

## Verify

- `./init.sh`

## Handoff

- State: done
- Evidence: Changed-board labels are gated by `line.changing`; the existing changed-board visibility guard remains intact. A one-moving-line six-position regression was added in `packages/liuyao-core/tests/board.test.ts`. `./init.sh` passed (format, lint with one existing warning, typecheck, build, package exports, tests) on 2026-09-28.
- Dependency check: feat-008 is done.
- Next: Integrate the verified feature branch and close issue #25 after confirming completion.
