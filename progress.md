# Progress

Append-only history for repository-local tracked features. Do not record no-feature work here.

<!-- Log template

## YYYY-MM-DD — <id>

**State**: todo
**Done**: —
**Evidence**: —
**Blockers**: none
**Next**: <One action.>

-->

<!-- Add each new block below this note. Do not edit older blocks. -->

## 2026-09-25 — feat-001

**State**: done, pending PR review and merge.
**Done**: F00-T01–T05 web foundation: styling, shadcn tokens, routes, self-hosted fonts, and responsive AppShell primitives.
**Evidence**: `./init.sh` and read-only verification passed; route, responsive, and local-font browser checks are recorded in `features/feat-001.md`.
**Blockers**: none for F00; finished Reading/Library/Settings/Casting flows belong to later features.
**Next**: Open the PR and resolve review feedback.

## 2026-09-26 — feat-001

**State**: active; follow-up PR pending review and merge.
**Done**: PR #10 merged. Addressed the P2 review finding in the shared placeholder Return to home link without changing navigation.
**Evidence**: `./init.sh` passed; the 390×844px route measurements, keyboard focus, and navigation checks are recorded in `features/feat-001.md`.
**Blockers**: none for the fix; merge approval remains pending.
**Next**: Review and merge the follow-up PR, then close feat-001.

## 2026-09-26 — feat-001

**State**: done; PR #11 merged as `2f2936c`.
**Done**: Added 44×44px minimum target dimensions and visible keyboard focus to the shared placeholder Return to home link, preserving destinations; completed the follow-up handoff.
**Evidence**: Fresh Codex review approved PR #11 at `052bd46`; GitHub `verify` and GitGuardian checks passed. `./init.sh` and the browser measurements/navigation checks are recorded in `features/feat-001.md`.
**Blockers**: none.
**Next**: Begin feat-002 domain contracts.

## 2026-09-26 — feat-002

**State**: done; PR #12 merged by squash at `8761e4aa84dcb4ef71816ca03e61f26871f576d9`.
**Done**: F01-T01–T08 domain contracts, typed errors and validation, stable IDs, ordered positions, and reusable package fixtures.
**Evidence**: `pnpm --filter @liuyao/core test` passed 29 tests; `./init.sh` passed format, lint, length check, typecheck, build, and package tests. Details are in `features/feat-002.md`.
**Blockers**: none; one pre-existing non-failing web lint warning remains outside F01 scope.
**Next**: feat-003 is active; implement F02 after confirming its canonical task map and architecture constraints.

## 2026-09-26 — feat-003

**State**: active; implementation locally verified, pending Orca review and merge.
**Done**: F02-T01–T10 polarity, eight trigram patterns, 64 King Wen identities, moving-line transformations, and structured calculation API; retained F03 board work outside this scope.
**Evidence**: `pnpm --filter @liuyao/core test` passed 113 tests, package typecheck passed, and `./init.sh` passed format, lint, length check, typecheck, build, and package tests. Independent fixture provenance and source errata are recorded in `features/feat-003.md` and `packages/liuyao-core/tests/hexagram-fixtures.ts`.
**Blockers**: none for local verification; review and merge remain.
**Next**: Submit the verified F02 revision for Orca review.

## 2026-09-26 — feat-003

**State**: done; PR #13 squash-merged as `ef2a99b`.
**Done**: Completed F02-T01–T10: polarity and trigram identification, the 64-hexagram mapping, moving-line transformations, and the structured calculation API. Updated the architecture summary to reflect F02 and reserved board calculations for F03.
**Evidence**: Fresh Codex review approved PR #13 at `7ef963b`; GitHub `verify` and GitGuardian checks passed. The worker ran 113 core tests, package typecheck, and `./init.sh`; the reviewer ran 84 focused tests and core typecheck. Fixture provenance and source errata are documented in `features/feat-003.md` and `packages/liuyao-core/tests/hexagram-fixtures.ts`.
**Blockers**: none.
**Next**: Activate feat-004 Liu Yao board.

## 2026-09-26 — feat-004

**State**: active; plan and implementation not started.
**Done**: Activated F03 Liu Yao board after feat-003 merged; dependencies feat-002 and feat-003 are done.
**Evidence**: Feature dependency records in `feature_index.json` and `features/feat-004.md` were checked before activation.
**Blockers**: none.
**Next**: Commit `docs/plans/feat-004.md` and obtain fresh Orca plan review.

## 2026-09-26 — feat-004

**State**: done locally; PR review and merge pending.
**Done**: Completed F03-T01–T10: Eight Palace and Shi/Ying classification, Na Jia stems and branches, element mapping, Six Relatives, and six structured board lines; updated the product-scope and architecture summaries.
**Evidence**: Parent-run `./init.sh` passed 125 core tests in 12 files and 2 knowledge tests; format, lint, TypeScript length check, typecheck, and build passed. Lint reported one pre-existing, non-failing web `react-refresh` warning. Fixture and acceptance details remain linked in `features/feat-004.md` and `docs/product-specs/v1-task-map.md`.
**Blockers**: Plan revision `28e13b6` is pending fresh feedback; PR review and merge are not complete.
**Next**: Obtain fresh PR review feedback, address it, and merge after approval.

## 2026-09-26 — feat-004 PR review follow-up

**State**: done locally; PR #14 fresh review and merge pending.
**Done**: Isolated public palace and Na Jia lookup results after reviewer found mutation could corrupt later board facts; added runtime mutation regressions.
**Evidence**: `./init.sh` passed 127 core tests in 12 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. One pre-existing, non-failing web lint warning remains.
**Blockers**: Updated PR head requires fresh review approval.
**Next**: Request fresh PR #14 review on the corrected head and address any findings before merge.

## 2026-09-26 — feat-004

**State**: done; PR #14 squash-merged as `994ba1afcc1dcf190808d693dd5f701f06eb4246`.
**Done**: Completed F03-T01–T10 and addressed review findings for isolated readonly lookup results and feature documentation.
**Evidence**: Fresh Codex review approved head `5dee51279af59c264fed6681ee0caa1d505685fe`; GitHub `verify` and GitGuardian passed. The worker passed `./init.sh` with 127 core tests and 2 knowledge tests, format, lint, typecheck, and build; final docs-only changes passed focused format/diff/pre-push checks.
**Blockers**: none.
**Next**: Activate feat-005 Casting core.

## 2026-09-26 — feat-005

**State**: active; feat-002 dependency is done.
**Done**: Selected F04 Casting core from the user-approved feat-001–012 batch and confirmed its canonical task map and product scope.
**Evidence**: `feature_index.json` records feat-002 done and feat-005 active; F04 tasks and acceptance are defined in `docs/product-specs/v1-task-map.md` and `features/feat-005.md`.
**Blockers**: none.
**Next**: Commit the implementation plan and request fresh plan review.

## 2026-09-26 — feat-005

**State**: done locally; PR review and merge pending.
**Done**: Completed F04-T01–T07: deterministic three-coin outcomes, injected casting service, normalized direct/sequential inputs, and a web-only browser crypto adapter; updated observed architecture and product summaries.
**Evidence**: Parent-run `./init.sh` passed with 152 core tests in 13 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, build, and package tests. One pre-existing non-failing web `react-refresh` warning remains at `apps/web/src/components/ui/button.tsx:49`. Plan and focused evidence are in `docs/plans/feat-005.md`.
**Blockers**: Fresh PR review and merge remain outstanding; no PR approval is claimed.
**Next**: Submit the verified changes for fresh PR review and address any findings.

## 2026-09-26 — feat-005 PR review follow-up

**State**: done locally; PR #15 fresh review and merge pending.
**Done**: Corrected plan evidence chronology and rejected sparse three-coin arrays that could bypass iteration validation; added a regression.
**Evidence**: `./init.sh` passed with 153 core tests in 13 files and 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. One pre-existing non-failing web `react-refresh` warning remains.
**Blockers**: Updated PR head requires fresh review approval.
**Next**: Request fresh review of PR #15 on the corrected head and address any findings.

## 2026-09-26 — feat-005 merged; feat-006 activated

**State**: feat-005 done; feat-006 active.
**Done**: Squash-merged PR #15 as `bcc89d0` after fresh plan and PR review approval of exact head `5e7815ae35cec1a94b4454f2cc5afac3cdc218c2`; activated feat-006 Knowledge from the user-approved batch.
**Evidence**: The worker passed `./init.sh` with 153 core tests and 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. GitHub `verify` and GitGuardian passed; one pre-existing non-failing web `react-refresh` warning remains.
**Blockers**: none.
**Next**: Read the canonical F05 requirements and licensing boundaries, then commit the feat-006 implementation plan and request review.

## 2026-09-26 — feat-006

**State**: done locally; PR review and merge pending.
**Done**: Completed F05-T01–T12: typed schemas, stable IDs, 8/64 entity metadata, V1 terms and rules, source metadata, validated references, readonly lookups, and offline normalized search. Source locations remain absent where unverified.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, 31 knowledge tests in 6 files, and 153 core tests in 13 files. One pre-existing non-failing web `react-refresh` warning remains. The first web build failed on a missing optional native Tailwind binding; a forced frozen-lockfile reinstall restored it before the successful full run. Details: `docs/plans/feat-006.md`.
**Blockers**: Fresh plan and PR review approval and merge remain; no unverified source locator was invented.
**Next**: Submit the current head for fresh plan and PR review, address findings, then hand off for merge.

## 2026-09-26 — feat-006 plan review follow-up

**State**: done locally; fresh plan and PR review pending.
**Done**: Resolved plan review findings with broken-term-reference validation, independent 64-hexagram identity fixtures, and exhaustive displayed-fact-to-rule coverage; removed duplicate task ownership of F05-T10.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, 34 knowledge tests in 6 files, and 153 core tests in 13 files. One pre-existing non-failing web Fast Refresh lint warning remains; details are in `docs/plans/feat-006.md`.
**Blockers**: Current-head plan and PR approval and merge remain pending.
**Next**: Request fresh plan review on the corrected head, then resolve any findings before requesting PR review.

## 2026-09-26 — feat-006 merged

**State**: done; PR #16 squash-merged as `691f80d724f332f49a2c295e4e484a3d6cbdcbe5`.
**Done**: Completed F05-T01–T12 and addressed plan-review findings for broken-term validation, independent 64-hexagram fixtures, exhaustive fact-to-rule coverage, and accurate handoff status.
**Evidence**: Fresh plan and PR reviews approved exact head `e6382698f88fdfdaa573b49a4c051cd6fa6409aa`; GitHub `verify` and GitGuardian passed. `./init.sh` passed with 34 knowledge tests and 153 core tests; one pre-existing non-failing web Fast Refresh warning remains. Evidence and sourcing limits are in `docs/plans/feat-006.md`.
**Blockers**: none.
**Next**: Stop after feat-006 as instructed; leave later features todo until selected again.
