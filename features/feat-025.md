# feat-025 — Add web release-flow regression coverage

## Goal

Provide repeatable web/release evidence for high-risk application flows and close or retain waived QA gaps accurately.

## Scope

- Add repository-level web E2E/release tests outside the `apps/**` package-test placement constraint.
- Automate browser-capable scenarios listed in issue #31, including casting, navigation, Library, offline routes, PWA install/update, and accessible result dialogs.
- Record browser/OS versions for remaining manual checks.
- Reassess feat-012 waived task status only against collected evidence.

## Non-goals

- Mark manual checks passed without evidence or close genuinely non-automatable gaps without recording them.

## Acceptance

- [ ] A repository-level web E2E/release location respects current test-placement policy.
- [ ] Automate the issue's deterministic scenarios where browser APIs allow.
- [ ] Record browser/OS versions for remaining manual matrix runs.
- [ ] Complete or explicitly retain only genuinely non-automatable F11 gaps.
- [ ] Revisit F11-T06/T07/T09/T10/T11/T13 status based on evidence.
- [ ] `./init.sh` and the release-flow suite pass.

## Relevant docs

- [GitHub issue #31](https://github.com/tungxuan1656/liuyao/issues/31) — canonical acceptance source
- `features/feat-012.md`
- `docs/release.md`

## Plan

1. Establish the repository-level web release suite and automate supported high-risk scenarios.
2. Record remaining manual evidence and reconcile feat-012 status without overstating coverage.

## Verify

- `./init.sh`
- Repository-level web release-flow suite (define command when implementation location is selected).

## Handoff

- State: todo
- Evidence: Issue #31 confirmed; implementation not started.
- Dependency check: feat-012 is done; runtime prerequisites feat-019, feat-020, feat-021, and feat-024 remain todo.
- Next: Verify dependencies, then select the feature for implementation.
