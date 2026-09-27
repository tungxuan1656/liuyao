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

## 2026-09-26 — feat-017 pre-flow hardening

**State**: done locally; PR creation and fresh review pending.
**Done**: Hardened core ID inventories and casting snapshots, completed the knowledge entity/rule/source model, added production fact-to-rule lookup and core drift tests, switched package defaults to built Node ESM, and expanded local CJK font coverage. Added feat-017 as a dependency of feat-007 and feat-008; both remain todo.
**Evidence**: Final `./init.sh` passed with 155 core tests in 13 files and 41 knowledge tests in 7 files. Build, typecheck, Node package-export smoke check, test placement, formatting, and TypeScript length checks passed. The only lint output was one pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`. FontTools 4.66.0/Brotli 1.2.0 verified 92/92 manifest codepoints in each CJK font. Mutation regressions reproduced the bad hexagram mapping and mutable casting snapshot before the fixes.
**Blockers**: PR creation and fresh review are pending; this branch has not been merged.
**Next**: Push `feat/017-preflow-hardening` and open a PR targeting `main`.

## 2026-09-26 — feat-017 PR handoff

**State**: PR #17 is open against `main`; fresh review is pending.
**Done**: Pushed `feat/017-preflow-hardening` and opened [PR #17](https://github.com/tungxuan1656/liuyao/pull/17). The PR contains the verified hardening work and is not merged.
**Evidence**: GitHub reports the PR head and base as `feat/017-preflow-hardening` → `main`. Final `./init.sh`, explicit format/lint checks, pre-push typecheck/tests, Node package-export smoke check, and the CJK cmap verification passed.
**Blockers**: Fresh PR review and approval are pending; no merge is claimed.
**Next**: Address review feedback on PR #17 and wait for approval.

## 2026-09-26 — feat-017 PR #17 review follow-up

**State**: done locally; PR #17 is updated on `feat/017-preflow-hardening`, open against `main`, and awaiting fresh review.
**Done**: Fixed clean-checkout TypeScript resolution while keeping runtime exports on built ESM; added declaration export smoke coverage; restored app UI glyph 六 to generated CJK coverage and renamed the subsets; added an automated WOFF2 cmap check to CI; corrected Zengshan Buyi attribution with Chinese Text Project provenance.
**Evidence**: With both package `dist/` directories removed, `pnpm typecheck` passed and `./init.sh` passed typecheck before build, package runtime/declaration checks, test placement, all 155 core tests and 41 knowledge tests. FontTools 4.66.0 and Brotli 1.2.0 confirmed exact 96-codepoint cmap coverage in both bundled CJK app fonts. Lint reported the pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`.
**Blockers**: Fresh review and approval are pending; PR #17 has not been merged.
**Next**: Wait for fresh review of the updated PR head and address any new findings.

## 2026-09-26 — feat-007 activated

**State**: active; implementation plan pending commit and review.
**Done**: Selected feat-007 Reading flow and confirmed its dependencies are done; scoped work to F06-T01–15 and the V1 reading completion condition.
**Evidence**: `feature_index.json` and `features/feat-007.md` record feat-001, feat-004, feat-005, and feat-017 done; canonical acceptance is in `docs/product-specs/v1-task-map.md` and `docs/product-specs/reading-flow.md`.
**Blockers**: none.
**Next**: Commit `docs/plans/feat-007.md` and request plan review before implementing.

## 2026-09-26 — feat-007 implementation verified

**State**: active; implementation verified locally; PR pending plan review.
**Done**: Implemented F06-T01–11 and T13–15: app/home shell, session-only draft, automatic/manual/direct casting, core calculation, recovery and confirmation dialogs, focused casting route, and active result retention across root tabs. F06-T12 remains blocked until Product Owner identity approval; retained current provisional Lục Hào/English copy without claiming approval.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests; only the pre-existing `apps/web/src/components/ui/button.tsx:49` Fast Refresh warning remains. Direct browser evidence for 390×844 and 1024×576 layouts, all entry methods, reset/cancel/replacement safety, root-tab retention, and refresh recovery is in `docs/plans/feat-007.md`.
**Blockers**: Plan review result pending; F06-T12 needs Product Owner approval through feat-013, which remains todo.
**Next**: Obtain plan-review result, then commit/push the implementation and open a PR without marking feat-007 done until F06-T12 is approved.

## 2026-09-27 — feat-007 draft PR

**State**: blocked; PR #18 is open as a draft and plan/PR review is pending.
**Done**: Pushed the F06 implementation on `tungxuan1656/feat-007-reading-flow` and opened [PR #18](https://github.com/tungxuan1656/liuyao/pull/18). Updated the feature index/handoff to blocked because F06-T12 needs Product Owner approval; kept later features todo.
**Evidence**: `./init.sh` passed with 155 core tests and 41 knowledge tests; direct UI flows/viewports and identity limitation are recorded in `docs/plans/feat-007.md` and `features/feat-007.md`.
**Blockers**: Plan/PR review pending; feat-013 has not approved the public name or primary language required by F06-T12.
**Next**: Resolve current-head review feedback and obtain Product Owner identity approval through feat-013; only then complete T12 and mark feat-007 done.

## 2026-09-27 — feat-007 review follow-up

**State**: active; implementation acceptance complete locally; PR #18 plan/PR review remains pending.
**Done**: Confirmed user approval of Lục Hào and English for the reading-flow UI, completed F06-T12 for this scope, preserved broader identity decisions for feat-013, and fixed typed-question cancel safety, stacked confirmation dialogs, duplicate dialog IDs, and a stray feature-record artifact.
**Evidence**: `./init.sh` passed: 41 knowledge tests in 7 files, 155 core tests in 13 files, format, lint/length, typecheck, build, package exports, and test placement. One pre-existing non-failing Fast Refresh warning remains at `apps/web/src/components/ui/button.tsx:49`. Identity decision and earlier direct UI flow/viewports are recorded in `docs/plans/feat-007.md`.
**Blockers**: Updated PR head still needs plan/PR review. PWA update-badge removal is deferred to feat-011.
**Next**: Send the verified updated head for plan/PR review and address any findings.

## 2026-09-27 — feat-007 identity decision recorded

**State**: active; plan/PR review pending.
**Done**: Recorded the explicit approval of Lục Hào as final public name and English as primary interface language in the canonical identity spec. Marked feat-013 F12-T02 complete; kept F12-T04 and all other identity tasks open. Restored the dated provisional-identity decision in the feat-007 plan and reconciled its later approval record.
**Evidence**: `docs/product-specs/product-identity.md` owns the approval and remaining identity scope; `features/feat-013.md` records T02 complete and T04 open. Feat-007 plan and handoff link to the canonical decision.
**Blockers**: Feat-007 plan/PR review remains pending; feat-013 identity work remains todo.
**Next**: Complete feat-007 PR review and merge; leave remaining feat-013 identity decisions for its separately selected feature.

## 2026-09-27 — feat-007 complete

**State**: done; PR #18 merged at `dda7973c12d4191ae43f4260fe661c49717e04ef`.
**Done**: Closed feat-007 after PR review and acceptance. F06-T12 is complete for the approved Lục Hào name and English interface; broader identity tasks remain with feat-013.
**Evidence**: PR head `08d19d5` passed CI `verify` and GitGuardian; code review had no blocking findings. `./init.sh` previously passed, with evidence in `docs/plans/feat-007.md`.
**Blockers**: none for feat-007.
**Next**: Activate feat-008, already selected in the user's feat-007–012 batch.

## 2026-09-27 — feat-008 browser validation follow-up

**State**: implementation complete; coordinator validation pending.
**Done**: Improved compact result readability by stacking primary and changed hexagram boards at 390px. Added guards to keep keyboard focus inside the compact drawer.
**Evidence**: `./init.sh` passed after latest code edits; `git diff --check` passed. Browser checks showed the one-control drawer retains focus on Close after Tab and Shift+Tab. A real mouse click on the scrim dismissed the dialog, restored focus to the triggering trigram, and unlocked body scrolling; CSS-selector click was inconclusive. Earlier checks for no-change/changed results and wide layout remain recorded in `features/feat-008.md`. F07-T14 is code-audited, not runtime-forced: `finish` catches calculation errors and copies all submitted values to the draft.
**Blockers**: Forced calculation failure was not reproduced; dependency-state confirmation remains for coordinator validation.
**Next**: Coordinator reviews evidence and decides whether forced-failure runtime coverage is required.

## 2026-09-27 — feat-008 interim result semantics and responsive review

**State**: implementation complete; coordinator validation pending.
**Done**: Applied coordinator decision to limit the changed board to changed polarity and trigram identities. Unified compact/drawer breakpoint through 899px; added drawer resize cleanup and refocus; added accessible Yao symbols and an honest unavailable changed-hexagram state.
**Evidence**: `./init.sh` passed after the module split. At 390px, changed board contains only polarity and changed trigram identities; no-change has no changed board. With drawer open at 390px, active element was Close, overflow hidden, dialog present. Resize to 900px removed dialog, restored focus to trigger, cleared overflow; back to 768px retained trigger focus, reopened dialog, relocked overflow. Full evidence in `features/feat-008.md`.
**Blockers**: Coordinator validation and dependency-state confirmation.
**Next**: Coordinator validates feat-008 implementation and browser evidence.

## 2026-09-27 — feat-008 compact drawer visibility fix

**State**: implementation complete; coordinator validation pending.
**Done**: Changed the drawer’s CSS wide-hide breakpoint to 900px, matching the 899px compact layout boundary.
**Evidence**: On Vite, open drawer at 768, 800, and 864px computed `display: block` and `visibility: visible`; focus remained on Close, body overflow was hidden, and one dialog was present. Escape at 864px dismissed, restored trigger focus, and unlocked body scroll. At 900px drawer was absent and wide inspector visible. `./init.sh` and `git diff --check` passed.
**Blockers**: Coordinator validation and dependency-state confirmation.
**Next**: Coordinator validates the final feat-008 result view.

## 2026-09-27 — feat-008 complete

**State**: done; PR #19 merged at `93df44096fd0eabbb5c6a65cb3a9e2205f6e90d1`.
**Done**: Closed feat-008 after PR #19 head `5b27046d8e64ed5a23ca757050a61c10a256be00` passed CI `verify` and GitGuardian. Updated the result-view handoff and feature index to reflect merged completion.
**Evidence**: `./init.sh` and browser checks are recorded in `features/feat-008.md` and earlier progress entries. Forced calculation failure was code-audited but not runtime-forced.
**Blockers**: none for feat-008.
**Next**: Activate feat-009, already selected in the user's feat-007–012 batch.

## 2026-09-27 — feat-009

**State**: active; implementation and assigned browser checks complete, coordinator validation pending.
**Done**: Built Library category browsing and filters, local search/no-results UI, canonical list/detail routing, related figure links, rule detail references, and source metadata/location display. Exported required record types from the knowledge package public entry.
**Evidence**: `./init.sh` passed format, lint, typecheck, build, package exports, and 196 package tests; lint reports one pre-existing Fast Refresh warning in `apps/web/src/components/ui/button.tsx`. Agent-browser verified compact (390×844) and wide (1440×900), category counts (64/8/55/10), alias search (`heaven` → Qian), no-results state, direct detail reload, related links, rule source/location, and offline reload of built-preview `/library` and hexagram detail. Development-server offline failure was not treated as PWA evidence.
**Blockers**: No known implementation blocker; term-to-rule associations are absent in the existing knowledge catalog.
**Next**: Coordinator reviews the implementation and verification evidence.

## 2026-09-27 — feat-009 evidence clarification

**State**: active; coordinator validation pending.
**Done**: Clarified the source-coverage boundary for F08-T10/T11 in `features/feat-009.md`; prior progress entry is preserved as append-only history.
**Evidence**: Corrected test evidence is 41 knowledge-package tests total; `packages/knowledge/tests/search.test.ts` has 3 tests. Offline built-preview reload was verified for `/library` and `/library/hexagram/hexagram-01` only; other routes were not individually checked offline. Catalog references cover 10 rules and `term-trigram` only, with no hexagram/trigram references and no references for 54 terms. UI source metadata/location behavior is supported only where catalog references exist; unreferenced mappings are not claimed as citations.
**Blockers**: Coordinator validation remains pending; catalog source-reference coverage is limited.
**Next**: Coordinator validates the implementation and evidence, including the documented source-coverage limits.

## 2026-09-27 — feat-010 implementation

**State**: implementation complete locally; coordinator validation pending.
**Done**: Replaced the Settings placeholder with responsive diagnostics for app/package versions, ruleset, live connection status, browser-qualified install status, update availability, fixed line conventions, and information links. Kept update application user-triggered and added no account, sync, history, analytics, or cloud controls.
**Evidence**: `./init.sh` passed: format, lint/length, typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. One pre-existing non-failing Fast Refresh warning remains in `apps/web/src/components/ui/button.tsx`. Agent-browser checked 390×844 and 1440×900 layouts with no horizontal overflow; the install state varied with exposed browser evidence. No waiting update or real offline transition was available for browser verification. Details and limits are in `features/feat-010.md`.
**Blockers**: Update-available action and real offline behavior were not exercised; standalone privacy policy does not yet exist.
**Next**: Coordinator validates feat-010 implementation and evidence.

## 2026-09-27 — feat-010 update-state correction

**State**: implementation complete locally; coordinator validation pending.
**Done**: Removed Settings' `useRegisterSW` registration and nonfunctional update action after review found they conflicted with Vite PWA `autoUpdate` and could reload in-memory readings. Settings now inspects an existing service-worker registration and distinguishes unsupported, unregistered, no-waiting, and waiting states without registering or applying updates. Corrected install availability to report unavailable only after the browser's install prompt event is observed.
**Evidence**: Fresh `./init.sh` passed after the correction: lint/length, typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. Existing Fast Refresh warning only. Agent-browser at 390×844 and 1440×900 showed no overflow and accurately reported “No service worker is registered”; no other registration state was available. See `features/feat-010.md` for details.
**Blockers**: No service-worker registration/update flow or draft-safe update handling is implemented here; that work belongs to feat-011. No waiting update or real offline browser transition has been verified.
**Next**: Coordinator validates feat-010; service-worker registration/update safety remains assigned to feat-011.

## 2026-09-27 — feat-011 UI lane

**State**: UI implementation complete locally; coordinator validation pending.
**Done**: Added a global PWA update banner with explicit Later and Update now actions, a confirmation before reloading when a draft or completed reading remains in React memory, a visible offline notice, and Settings status/readiness subscribed to the shared PWA store. Preserved the parallel fixer's dirty PWA registration/store files.
**Evidence**: Final `./init.sh` passed format, lint/length (one existing Fast Refresh warning), typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. Production preview rendered Settings and a direct hexagram route at 390×844 with no horizontal overflow; offline-emulated direct route remained rendered, but Chromium still reported online. Preview reported offline readiness and install availability, but no waiting update existed to test the update prompt. See `features/feat-011.md`.
**Blockers**: Combined update-worker lifecycle, draft-safe acceptance, actual offline state, and the full recovery matrix require coordinator/fixer integration verification.
**Next**: Coordinator validates the combined UI/fixer lanes, especially service-worker registration and draft-safe update behavior.

## 2026-09-27 — feat-011 update-safety correction

**State**: UI safety correction implemented locally; coordinator validation pending.
**Done**: Lifted the home question and casting method into the in-memory reading session. Update confirmation now covers entered question/non-default method, draft, or completed reading. Explicit update acceptance signals the casting unload guard to stand down only for that reload; ordinary in-app navigation remains blocked when lines exist. Added status semantics and repositioned the banner clear of the top flow header; clarified unconfirmed Settings states. F10-T06/T07 are unchecked pending two-build evidence.
**Evidence**: `./init.sh` passed format, lint/length (one existing Fast Refresh warning), typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. `git diff --check` passed. Prior production preview confirmed the offline indicator/routes and session-only loss on reload, but no waiting update existed to exercise Later, confirmation, or acceptance.
**Blockers**: Two-build update lifecycle and intentional-apply behavior still need browser evidence and coordinator review.
**Next**: Coordinator validates the corrected UI and combined worker lifecycle; F10-T06/T07 remain unchecked until two-build browser evidence exists.

## 2026-09-27 — feat-009 complete

**State**: done; PR #20 merged as `c18c1b379211c095987a919d295c5492b0b0dbdf`.
**Done**: Closed the Knowledge browser feature after PR #20 head `d5bdb631553971a71a44b4ecc48bb78d94e788a1` passed CI `verify` and GitGuardian. Recorded the merged status and catalog sourcing limits in the feature handoff.
**Evidence**: `./init.sh` and browser checks are recorded in `features/feat-009.md` and prior progress entries. Catalog references cover only 10 rules and `term-trigram`; there are no hexagram/trigram references or references for 54 of 55 terms, and no catalog-defined term-rule associations. Offline built-preview reload was checked only for `/library` and `/library/hexagram/hexagram-01`.
**Blockers**: none for feat-009.
**Next**: Activate feat-010 Settings, already selected by the user.

## 2026-09-27 — feat-010 complete

**State**: done; PR #21 merged as `1a205250bb2a592b8280e9eb3e1316247a385c1d`.
**Done**: Closed Settings after PR #21 head `5a43db89c04110d5c60ae8629ffc4e10624c2357` passed CI `verify` and GitGuardian. Recorded merged status and verification limits in the feature handoff.
**Evidence**: `./init.sh` and browser checks are recorded in `features/feat-010.md` and preceding progress entries. Browser checks covered 390×844 and 1440×900 layouts and truthful available browser states. No real offline transition or waiting service-worker update was verified; update registration and draft-safe application remain feat-011 scope.
**Blockers**: none for feat-010.
**Next**: Activate feat-011 Offline hardening, already selected by the user.

## 2026-09-27 — feat-011 production browser QA

**State**: active; production-browser evidence recorded; coordinator final validation pending.
**Done**: Verified service-worker control, offline routes/settings/banner, online→offline→reload→online recovery, and a two-build waiting-update flow that preserves the active question, manual method, and lines until explicit acceptance. Updated F10 task evidence without marking the feature complete.
**Evidence**: On production build `localhost:4188`, shell/fonts were precached and observed requests were same-origin. Offline route/settings and banner worked during the controlled connectivity/reload sequence. Isolated v1→v2 fixture at `localhost:4192` produced a distinct waiting worker via conditional 200; Later and Keep reading preserved state; accepted Update now reloaded into v2 and cleared the in-memory draft. Native `beforeunload` prompt absence was not definitively observable, although intentional reload completed; `isUpdateAccepted` code guard suppresses it. QA covers this browser subset only, not a full cross-browser matrix. F10-T03 and T08 remain unchecked for insufficient evidence; acceptance remains unchecked.
**Blockers**: Coordinator validation; evidence does not yet establish absence of remote runtime dependencies across all core flows or normal use when installation is unavailable.
**Next**: Coordinator validates feat-011 evidence and determines whether F10-T03/T08 need further verification.

## 2026-09-27 — feat-011 final evidence update

**State**: active; F10-T01–T10 evidence recorded; coordinator/PR gate pending.
**Done**: Completed source/build audit for remote runtime dependencies and verified normal browser use without installing in a production-fixture session. Marked all F10 tasks and acceptance criteria supported by the combined implementation, test, and browser evidence; kept feat-011 active for final coordinator/PR validation.
**Evidence**: No required remote runtime APIs/assets were found in reading, casting, result, Library, or Settings; core assets are same-origin and precached, external GitHub/source links are user-initiated. Observed browser requests were same-origin, but no exhaustive network/cross-browser audit is claimed. With no `beforeinstallprompt` event observed (API exists; unsupported browser not proven), the user completed question/manual casting (lines `7, 8, 9, 6, 7, 8`) to Ji Ji/Sui, opened Library Qian detail and Settings without installing. Prior production offline/recovery and two-build draft-safe update evidence is recorded in `features/feat-011.md`. Native `beforeunload` prompt absence remains unconfirmed; intentional update reload completed and `isUpdateAccepted` suppresses the guard.
**Blockers**: Coordinator/PR gate only; browser verification is a subset and does not claim full cross-browser coverage.
**Next**: Coordinator validates the complete feat-011 evidence and proceeds through the PR gate.

## 2026-09-27 — feat-011 complete

**State**: done; PR #22 merged as `a70c8f3e145536cd48db84dd9c2e61b7c14f1265`.
**Done**: Closed Offline hardening after PR #22 head `509a079c45fa82809749384ba03bb566a720e96f` passed CI `verify` and GitGuardian. Recorded merged status and QA limits in the feature handoff.
**Evidence**: `./init.sh`, production offline/recovery, draft-safe two-build update, source/build audit, and no-install normal-use browser evidence are recorded in `features/feat-011.md` and preceding progress entries. QA was limited to tested Chromium sessions; it was not a full cross-browser or exhaustive network audit. Native `beforeunload` prompt absence was not definitively observable, though intentional UI update reload completed and `isUpdateAccepted` suppresses the guard for accepted updates.
**Blockers**: none for feat-011.
**Next**: Activate feat-012 Quality hardening, already selected by the user.
