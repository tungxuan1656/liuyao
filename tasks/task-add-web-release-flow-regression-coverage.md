# task-add-web-release-flow-regression-coverage - Add web release-flow regression coverage

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-quality-hardening](task-quality-hardening.md), [task-correct-static-line-changed-annotations](task-correct-static-line-changed-annotations.md), [task-capture-pwa-install-prompts-globally](task-capture-pwa-install-prompts-globally.md), [task-make-update-acceptance-bypass-transient](task-make-update-acceptance-bypass-transient.md), [task-preserve-automatic-casting-evidence-and-align-ux-contract](task-preserve-automatic-casting-evidence-and-align-ux-contract.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Provide repeatable web/release evidence for high-risk application flows and close or retain waived QA gaps accurately.

## Scope

- Add repository-level web E2E/release tests outside the `apps/**` package-test placement constraint.
- Automate browser-capable scenarios listed in issue #31, including casting, navigation, Library, offline routes, PWA install/update, and accessible result dialogs.
- Record browser/OS versions for remaining manual checks.
- Reassess task-quality-hardening waived task status only against collected evidence.

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
- `task-quality-hardening`
- `docs/release.md`

## Plan

1. Establish a root `e2e/release/` Playwright Chromium suite, its `test:release` command, CI gate, and narrow documentation exception for integration tests outside `apps/**`. Keep `pnpm test` package-only.
2. Add deterministic casting/result, navigation, Library and keyboard/dialog scenarios against a dedicated Vite server. Run true offline/PWA scenarios against a production preview with an active worker; separate synthetic install/update event tests from native-browser evidence.
3. Record exact browser/OS versions and actual scenario results in this feature; reconcile task-quality-hardening F11-T06/T07/T09/T10/T11/T13 without turning untested checks into passes.

## Verify

- `./init.sh`
- Repository-level web release-flow suite (define command when implementation location is selected).

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done
- Evidence: User approved Playwright at root. `e2e/release/` is a documented integration-test exception; `pnpm test` remains package-only. On 2026-09-28, `pnpm test:release` passed 12/12 in Playwright 1.63.0, bundled Chrome for Testing 153.0.8010.12 on macOS 26.5.1 (Darwin 25.5.0 arm64); `./init.sh` passed. Coverage: manual/direct equivalence, six automatic coin outcomes and displayed line values, one-moving-line changed board, session navigation, Library direct/search, drawer Escape/focus, SW-controlled offline route reload, real two-build waiting-worker draft preservation and accepted takeover/reload, Chromium console/page-error samples across casting/Library/drawer, and 44×44 update-banner controls at 390×844. A synthetic install event checks retained app handling across navigation only; it does not prove native installability. Core tests from task-preserve-automatic-casting-evidence-and-align-ux-contract, not E2E, validate the internal immutable snapshot. Remaining F11 gaps are recorded in task-quality-hardening; no supported-browser matrix or nonzero safe-area evidence was obtained in this feature. CI verification and integration remain pending.
- Dependency check: task-quality-hardening, task-correct-static-line-changed-annotations, task-capture-pwa-install-prompts-globally, task-make-update-acceptance-bypass-transient and task-preserve-automatic-casting-evidence-and-align-ux-contract are done.
- Next: Confirm CI, integrate the PR, and close issue #31 only after merge.
