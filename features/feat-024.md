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

- [ ] Product contract explicitly chooses one-shot or per-line automatic casting.
- [ ] UI matches the chosen contract.
- [ ] Automatic readings retain six three-coin toss records in the active snapshot.
- [ ] Direct and manual input do not fabricate tosses; final line input remains unchanged.
- [ ] Tests/E2E cover automatic snapshot integrity.
- [ ] `./init.sh` passes.

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

- State: todo
- Evidence: Issue #29 confirmed; interaction choice remains proposed.
- Dependency check: feat-007 is done.
- Next: Verify dependencies, then select the feature for implementation.
