# task-complete-teaching-content-64-hexagrams - Complete Vietnamese teaching content for 64 hexagrams

- Status: done
- Owner: Codex
- Required to start: [completed pilot](task-pilot-teaching-content-can-khon-dai-qua.md)
- Required to integrate/release: final source review and verification below

## Scope and non-goals

Apply the approved pilot presentation to the remaining 61 supplied lessons. Preserve all existing commentary, metadata, notes, IDs, line order and special-passage anchors. Keep Vietnamese-only explanations, explicit author differences and hypothetical applications. Do not change the pilot records, schema, UI, routes, calculations or dependencies.

## Acceptance

- [x] All 64 records contain complete teaching introductions, six line explanations and study sections.
- [x] Source comparison preserves supported meaning, attribution, conditions, uncertainty and relevant PDF locations.
- [x] Independent final review covers every added lesson and its direct consumers; material findings are repaired or explicitly blocked.
- [x] Existing content compares unchanged; corpus tests, full verification, payload measurements and affected offline routes pass.

## Sources

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md), [model](../docs/design-docs/knowledge-model.md), [language](../docs/product-specs/vietnamese-language.md), [verification](../docs/development.md).

## Plan

1. Snapshot the starting records, extract cited source passages and establish baseline checks.
2. Adapt lessons in disjoint groups, inspecting source passages before publishing edits. Only assigned hexagram JSON files are shared with writers; Codex owns tests and task records.
3. Independently review each group, repair supported findings, extend corpus-wide regression coverage and run final delivery/offline checks.

## Handoff

- Blockers: none.
- Evidence: all 61 remaining records adapted with 2,338 teaching entries. Semantic comparison preserves every old entry, line identity, note, metadata field and special-passage prefix; the 3 accepted pilots remain unchanged.
- Review: independent reviewers inspected all 61 final records, complete supplied lessons, supporting passages and all 3 rendering consumers. Repairs cover dangling references, Đại Súc's viết-to-nhật direction, Kiển's inherited normalization and Quải's conflicting pronunciation notes. Final rechecks pass after the Quải repair; no actionable findings remain. Transmission uncertainties stay visible rather than being resolved speculatively.
- Sources: one-based PDF passages, including context: NHL 58–62, 93–95, 141–221, 223–334; NTT 11–13, 154–471, 482–937; PBC 4–6, 34–36, 72–286, 293–601, 654–655. Reviewers opened relevant page images, including NTT 321, 352, 453, 617, 682–683, 917–918, 923, 927, 930–933, NHL 164, 166–167, 329 and PBC 131, 135–141.
- Verification: final working-tree revision passes `./init.sh` on 2026-11-10: 181 core and 268 knowledge tests; corpus check reports 381 ready records. Existing lint/chunk-size warnings remain outside scope.
- Delivery: the remaining 61 add 1,876,361 raw / 440,167 gzip bytes. All knowledge assets total 5,911,738 raw / 1,364,155 gzip bytes; detailed prose stays outside startup JavaScript.
- Browser: final production build inspected in Chrome desktop and 400px responsive mode. With the preview server stopped and HTTP connection failure confirmed, Quải reloads and previously unopened Vị Tế loads with line navigation and expandable source citations. Restored preview on port 4178. This samples shared delivery; physical iOS, all 64 browser routes and the update-prompt interaction were not exhaustively tested.
- Next: user approved committing the completed changes, followed by post-commit verification and a browser smoke test.
