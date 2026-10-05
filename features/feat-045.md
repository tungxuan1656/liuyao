# feat-045 — Reviewed quẻ 45–48 and BPCT sentences 17–24

## Goal

Complete the next four quẻ and the paired BPCT passage group.

## Scope

**Intended work:**

- 45 Trạch Địa Tụy; 46 Địa Phong Thăng; 47 Trạch Thủy Khốn; 48 Thủy Phong Tỉnh: overviews and six lines in NHL, PBC, and NTT.
- BPCT Part I, chapter 6, sentences 17–24; PDF 82–85 are planning anchors.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Quẻ 45: all six positions and each supplied commentary layer.
- [ ] Quẻ 46: all six positions and each supplied commentary layer.
- [ ] Quẻ 47: all six positions and each supplied commentary layer.
- [ ] Quẻ 48: all six positions and each supplied commentary layer.
- [ ] BPCT sentences 17–24: each numbered passage and its notes.
- [ ] Replace the four legacy quẻ without changing stable IDs.
- [ ] Review full passages, diagrams, attribution, discrepancies, and exclusions before release.
- [ ] Source-compared claims in quẻ 45–48 and BPCT 17–24 pass the corpus publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Limits

This batch follows the [publication gate](../docs/product-specs/knowledge-quality.md#publication-gate). Corpus-wide specialist review and certification do not block authoring. This batch produces original Vietnamese summaries and structured facts without redistributing source books.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active; implementation in progress on `feat/045-reviewed-que-45-48-bpct-17-24`.
- Evidence: Dependencies feat-044 is done; feat-045 acceptance and source boundaries confirmed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Review quẻ 45–48 and BPCT sentences 17–24 against the supplied editions.

## Decision log

### Printed attribution at Thăng line 2

- Question: How can NTT PDF 718–719 be represented when its long explanation, short cross-reference and Tiểu Tượng all print Chu Hy, unlike the surrounding Trình Di/Chu Hy pairs?
- Decision: Preserve three separate claims and citations under the printed Chu Hy attribution, with explicit uncertainty about the long and Tiểu Tượng passages. The supervisor approved this source-fidelity treatment; no Trình Di claim is invented for this cell.
- Alternatives: Reassign the long passages by stylistic inference; omit all three passages; or preserve the printed witness without adjudicating authorship.
- Rationale: The supplied edition is the actual evidence. A presumed regular author pattern cannot establish a corrected attribution.
- Evidence: Full passage extraction and rendered NTT PDFs 718–719; the two consecutive printed headings on 718 and the third on 719. The short reference points back to Tụy; the longer passages discuss sincerity and service to the ruler.
- Effect: The cell includes all supplied printed commentary layers, but does not claim independently established authorship. Conditions and the source catalog retain the limitation; audit and certification remain separate.

### Bounded BPCT article and continuation locators

- Question: Should sentences 17–24 be split into speculative new terms or calculation rules, and should their planning start pages be treated as complete passage bounds?
- Decision: Keep one attributed article with a separate claim for each numbered passage, separate verse/commentary citations, and a separate claim for attached note 4. Record continuations for 17 (82–83), 21 (83–84) and 24 (84–85); keep note 5 at sentence 26 outside the batch. Update only the selected inventory dispositions and corresponding registry bindings, leaving discoveries, ledgers and gates open.
- Alternatives: Author several new terms or operational rules; cite planning anchors alone; or retain the existing single-topic article pattern and inspected full intervals.
- Rationale: One article preserves the related conditional readings without activating interpretation or a calendar. Complete intervals prevent truncating the supplied evidence. Note 4's basic-chapter reference is checked at PDF 18; the already-cited translator criticism at PDF 403 remains a separate voice, not a full-table import.
- Evidence: Rendered BPCT PDFs 82–85, 18 and 403; the feat-044 article/citation pattern; the source inventory's existing continuation list.
- Effect: Adds one released article, preserves conditional and conflicting readings of Không and Hình, and changes no schema, runtime API, calculation, audit decision or rights metadata.

### Structural selections versus edition observations

- Question: How should contradictory printed labels and readings affect release eligibility?
- Decision: Resolve only the selected structural facts where page diagrams, line labels and corroborating commentary establish polarity or correspondence. Retain other wording, attribution and Han-form differences as bounded source observations and claim conditions, without selecting a corrected source text.
- Alternatives: Silently normalize every witness; withhold the entire quẻ because a source typo exists; or distinguish supported structure from unadjudicated edition wording.
- Rationale: Structural evidence can support six stable positions without establishing a standard text. The V1 discrepancy contract cannot release unresolved discrepancies as authority; these edition observations therefore do not assert an unresolved correction as a released fact.
- Evidence: Tụy first/final labels on NTT 703–704/711 and PBC 438, NHL/PBC diagrams; Khốn NHL 281 correspondence wording and NTT 735–736 final label, compared with PBC and the diagrams. Other located observations are listed in Book sources.
- Effect: Preserves stable IDs and correctly selected polarities; source quotations are not redistributed or emended. Ordinary source-comparison eligibility does not imply audit, independent verification, predictive efficacy or certification.

### Verification scope boundary

- Question: May this knowledge batch change the PWA precache size setting when the expanded release exceeds its current limit?
- Decision: No app or PWA change. The supervisor directed that the separate offline-behavior choice remain with the user and parent. Repair only the batch's test typing and current corpus-count expectations; report the full workflow as blocked.
- Alternatives: Increase Workbox's limit in this feature; remove supported scope content to shrink the bundle; or retain the requested source content and expose the build blocker.
- Rationale: Changing offline caching or dropping accepted source units would widen or silently change the selected scope.
- Evidence: `./init.sh` reached the web build, whose Workbox step rejected `assets/index-B7EB0FVV.js` at 2.11 MB against the default 2 MiB limit. No PWA configuration was edited.
- Effect: Corpus and source comparison can be validated, but this feature cannot claim required full verification, completion, commit readiness or publication acceptance until the separate blocker is resolved.

### Authorized precache-limit adjustment

- Question: After the recorded build blocker, may feat-045 narrowly raise the existing Workbox maximum to include the measured knowledge bundle?
- Decision: The user explicitly authorized this adjustment through the parent. Set only `maximumFileSizeToCacheInBytes` to 2 MiB plus 64 KiB (2,162,688 bytes), the next 64 KiB boundary above the measured 2,109.62 kB bundle. This authorization supersedes the earlier no-app-change boundary for this one setting only.
- Alternatives: Use the exact measured byte count with negligible margin; round to a larger whole-MiB limit; split runtime assets or remove content; or use the next small 64 KiB boundary.
- Rationale: The selected value is a small, deterministic increase that admits the actual bundle without broad headroom, restructuring the application or dropping requested evidence-backed content.
- Evidence: The previous full workflow measured `assets/index-B7EB0FVV.js` at 2,109.62 kB and Workbox rejected it against 2,097,152 bytes. The two batch-test typing errors and stale required-claim count were already repaired and passed standalone typecheck and all 451 package tests.
- Effect: Adds one expressly authorized app configuration setting to the feature scope. Existing precache patterns, cleanup, client claiming and service-worker update behavior remain unchanged. The repeated `./init.sh` and corpus fingerprint/freshness checks pass; the generated service worker includes the measured 2,109,618-byte JavaScript asset in its precache. Independent source-review acceptance and corpus certification remain separate.
