# feat-063 — Reconcile Càn and Khôn special classical passages

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- Reconcile the six activated edition-specific `specialPassages` ranges recorded below. Inspect all assigned context, but author only actual special headings/layers; ordinary positions and PBC Càn Văn Ngôn43–57 remain outside this activation.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Dụng cửu, Dụng lục, Văn Ngôn, and other actual special headings.
- [x] Keep special passages outside the six-position line inventory.
- [x] Reconcile selected existing summaries with all supplied commentary layers.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

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

## Activation decisions

- Selection: Next dependency-ready feature in the user-authorized feat-045–083 sequence; skip completed feat-067 and feat-078.
- Dependencies: feat-062 is done on `main` at `a194683`; feat-101 is done.
- Source units: Reconcile only the six existing `specialPassages` entries in `docs/reviews/knowledge/expected-units.json`: PBC Càn PDF41–42, NTT Càn PDF80–128, NHL Càn PDF131–136; PBC Khôn PDF67–72, NTT Khôn PDF129–154, NHL Khôn PDF137–141. The overlapping parent ranges are intentional; derive actual special passages and named layers from page images, not page-range assumptions.
- Contract: These passages remain independently scoped from line positions1–6 and never create a seventh line. Reconcile existing selected records/summaries to actual source headings/layers; don't duplicate claims across the six edition-specific owners or infer a passage from another edition.
- Boundaries: All six are within the supplied source editions and routed to audit feat-068. Reuse exact source identities/fingerprints in `packages/knowledge/data/sources.json`; preserve printed folios only where verified. Keep unrelated quẻ claims/records and audit/certification states unchanged.
- Planning: Retain inline plan; one knowledge-package feature with no API, migration, workspace, calendar or UI change. Preserve PWA precache and current measured-cap policy. Source review/audit/certification remain separate and open.

## Implementation Evidence

- Source checkpoint: `0b0bfdf16fbecd812475985e5f7f72bf28954266` records all94 individually opened page images/extraction comparisons at1.5x. Exact supplied PBC/NTT/NHL hashes and page counts match `sources.json`; [inspection artifact](../docs/reviews/knowledge/feat-063-page-inspection.json) records image/text hashes,dimensions,folios and findings. No source prose/images are redistributed.
- [Passage register](../docs/reviews/knowledge/source-inventory.md#feat-063-cankhon-special-passage-register) owns six new scoped owners and281 child dispositions; every addition routes063 →068. Six existing special obligation IDs/ranges remain unchanged; ordinary quẻ/line routes and source layers/exclusions remain untouched. PBC43–57 is explicitly deferred,not absent or complete.
- Release:260 new original Vietnamese claims/261 exact-edition citations expand the two existing V1 quẻ records' special fields. Eight prior Dụng selections and twelve NHL line selections are reused; note17's repeated Hồ Vân Phong supports one summary. Actual Tiên Nho,Phụ Chú,translator notes,embedded NHL Văn Ngôn and separate Phụ Lục remain independently attributed. [Source catalog](../docs/references/book-sources.md#feat-063-cankhon-special-source-comparison) owns uncertainties and alternative labels/readings.
- Current corpus:371 records,9497 claims,9744 citations;64 quẻ/384 ordinary positions unchanged. Registry revision57 has4638 groups,17 unchanged exclusions and all global discovery rosters unresolved. No API/schema migration,core,calendar,workspace or UI changes.
- Focused test:292 cases pass (65ms test time,1.89s total); full one-worker knowledge suite passes6138 cases/49 files (158.03s). Test fixtures protect prior selected claims and all ordinary fields,exact layer/locator/owner mappings,94 images,source differences,appendix and closed gates. Existing census literals alone are updated without dropping assertions/timeouts.
- Build measurement: integrated `index-BZbkh_ZM.js` is12,641,174 bytes,58,262 above prior12MiB cap. Under AGENTS.md,only cap/comment change to13MiB preserves all PWA behavior; final integrated precache and workflow verification follow. Initial web build and first full workflow fail solely on that cap; the attempted `apply_patch` command was unavailable,so the cap is now applied with the edit tool. No assertions or timeouts are weakened.
- Verification status: baseline `./init.sh` passes5846 knowledge +181 core tests; focused corpus/build/typecheck and one-worker package checks pass. Final integrated workflow and export/preservation/PWA evidence are pending at this checkpoint.

## Handoff

- State: active; implementation checkpoint complete,pending final verification and independent acceptance review. Parent owns canonical feature/progress,PR and final done handoff.
- Evidence: Source comparison and initial focused/full package verification recorded above; no audit068,global verification or certification approval is claimed.
- Blockers: None for bounded authoring. PBC Càn Văn Ngôn43–57 remains outside the six selected ranges; global discovery/source rights remain unresolved.
- Next: Finish full `./init.sh`,fresh corpus/books,package export/preservation and integrated PWA checks,then hand off exact reviewed HEAD to the parent.
