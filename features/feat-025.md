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

- [x] A repository-level web E2E/release location respects current test-placement policy.
- [x] Automate the issue's deterministic scenarios where browser APIs allow.
- [x] Record browser/OS versions for remaining manual matrix runs.
- [x] Complete or explicitly retain only genuinely non-automatable F11 gaps.
- [x] Revisit F11-T06/T07/T09/T10/T11/T13 status based on evidence.
- [x] `./init.sh` and the release-flow suite pass.

## Relevant docs

- [GitHub issue #31](https://github.com/tungxuan1656/liuyao/issues/31) — canonical acceptance source
- `features/feat-012.md`
- `docs/release.md`

## Plan

1. Establish a root `e2e/release/` Playwright Chromium suite, its `test:release` command, CI gate, and narrow documentation exception for integration tests outside `apps/**`. Keep `pnpm test` package-only.
2. Add deterministic casting/result, navigation, Library and keyboard/dialog scenarios against a dedicated Vite server. Run true offline/PWA scenarios against a production preview with an active worker; separate synthetic install/update event tests from native-browser evidence.
3. Record exact browser/OS versions and actual scenario results in this feature; reconcile feat-012 F11-T06/T07/T09/T10/T11/T13 without turning untested checks into passes.

## Verify

- `./init.sh`
- Repository-level web release-flow suite (define command when implementation location is selected).

## Handoff

- State: done
- Evidence: User approved Playwright at root. `e2e/release/` is a documented integration-test exception; `pnpm test` remains package-only. On 2026-09-28, `pnpm test:release` passed 12/12 in Playwright 1.63.0, bundled Chrome for Testing 153.0.8010.12 on macOS 26.5.1 (Darwin 25.5.0 arm64); `./init.sh` passed. Coverage: manual/direct equivalence, six automatic coin outcomes and displayed line values, one-moving-line changed board, session navigation, Library direct/search, drawer Escape/focus, SW-controlled offline route reload, real two-build waiting-worker draft preservation and accepted takeover/reload, Chromium console/page-error samples across casting/Library/drawer, and 44×44 update-banner controls at 390×844. A synthetic install event checks retained app handling across navigation only; it does not prove native installability. Core tests from feat-024, not E2E, validate the internal immutable snapshot. Remaining F11 gaps are recorded in feat-012; no supported-browser matrix or nonzero safe-area evidence was obtained in this feature. CI verification and integration remain pending.
- Dependency check: feat-012, feat-019, feat-020, feat-021 and feat-024 are done.
- Next: Confirm CI, integrate the PR, and close issue #31 only after merge.
