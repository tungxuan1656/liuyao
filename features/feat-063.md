# feat-063 — Reconcile Càn and Khôn special classical passages

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- The complete Càn/Khôn chapters in NHL, PBC, and NTT; use the existing exact locators.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Dụng cửu, Dụng lục, Văn Ngôn, and other actual special headings.
- [ ] Keep special passages outside the six-position line inventory.
- [ ] Reconcile selected existing summaries with all supplied commentary layers.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
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

## Handoff

- State: active on `feat/063-cankhon-special-classical-passages`.
- Evidence: Started from clean `main` after feat-062 completion. Six edition-specific expected-unit special passages are identified in the canonical registry; no authored work has been reviewed yet.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect all six special-passage ranges and existing selected records, then record source-specific headings, layers and exclusions without treating specials as line7.
