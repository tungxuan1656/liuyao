# task-complete-bpct-applications-illness-remedies-and-absent-travellers - Complete BPCT applications — Illness remedies and absent travellers

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-complete-bpct-applications-housing-boats-and-xuong-gia](task-complete-bpct-applications-housing-boats-and-xuong-gia.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 270–301; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 23 — Tật Bệnh: all passages, conditions, examples, and notes.
- [ ] Chapter 24 — Bệnh Thể: all passages, conditions, examples, and notes.
- [ ] Chapter 25 — Y Dược: all passages, conditions, examples, and notes.
- [ ] Chapter 26 — Hành Nhân: all passages, conditions, examples, and notes.
- [ ] Preserve question-specific roles, qualifications, and translator disagreements.
- [ ] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Verify the supplied fingerprint and inspect complete text and individual images for PDF270–301, including credits and boundary pages.
2. Map the four chapter units, actual source layers, notes, inserted material and folio-only279 without changing the source intervals or later audit ownership.
3. Author concise Vietnamese summaries with claim-specific citations; preserve repeated/missing labels, question roles and translator disagreements.
4. Reconcile the inventory register, expected-unit projection, manifest and generated reports; add package regressions and measure the offline bundle.
5. Run the publication checks and full workflow, verify unchanged prior content, commit implementation and hand off for independent branch acceptance. Parent owns canonical completion/progress after merge.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #83 at `d0848eb7de6e776b8e421acc21f53fa209ee7e2d`; reviewed head `ddc8c1932a62e00752bc6e7b6b3b09f31a3e8220`.
- Evidence: Independent exact-head review returned `OK` with no P0/P1/P2 findings. PR-head verify run `37463702490`/job `112269320088`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 181 core and 3,064 knowledge tests; corpus validation passed for 239 records, 5,993 claims, and 6,239 citations.
- Result: Four BPCT articles contain 145 child units and 379 citations; 150 assigned obligations remain for task-review-and-improve-bpct-applications-illness-remedies-and-absent-travellers audit, including the four parent units and PDF 279 disposition. Prior released content is semantically preserved. The 7,613,685-byte integrated asset fits the 8 MiB Workbox cap with 774,923 bytes reserve; all 18 precache entries remain.
- Blockers: none for task-complete-bpct-applications-illness-remedies-and-absent-travellers; task-review-and-improve-bpct-applications-illness-remedies-and-absent-travellers source audit and corpus certification remain open. Source comparison does not establish efficacy or provide medical, legal, travel, calendar, or prediction advice.
- Next: Continue with selected task-complete-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — task-complete-bpct-applications-illness-remedies-and-absent-travellers merged

**State**: done and merged to `main` in PR #83 at `d0848eb7de6e776b8e421acc21f53fa209ee7e2d`; reviewed head `ddc8c1932a62e00752bc6e7b6b3b09f31a3e8220`.
**Done**: Added four source-compared BPCT application articles for chapters 23–26 (PDF 270–301), with 145 child units and 379 claim-specific citations. Preserved chapter layers and notes, question roles, source disagreements, and missing/repeated labels. PDF 279 remains a folio-only non-content disposition.
**Evidence**: Independent exact-head review returned `OK`, no P0–P2 findings. PR-head verify run `37463702490`/job `112269320088`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 3,245 tests (181 core, 3,064 knowledge); corpus validation passed for 239 records, 5,993 claims, and 6,239 citations. Prior 235 records and 5,614 claims remain semantically unchanged. The 7,613,685-byte integrated asset fits the 8 MiB Workbox cap with 774,923 bytes reserve; all 18 precache entries remain.
**Coverage**: 150 source obligations, including 145 child units, four chapter parents, and PDF 279, remain assigned to task-review-and-improve-bpct-applications-illness-remedies-and-absent-travellers audit. Source audit and corpus certification remain open; no efficacy or medical, legal, or travel advice is claimed.
**Blockers**: none for task-complete-bpct-applications-illness-remedies-and-absent-travellers.
**Next**: Continue with selected task-complete-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight from updated `main`.
