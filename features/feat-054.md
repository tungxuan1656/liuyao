# feat-054 — Complete BPCT applications — Housing boats and Xướng Gia

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 231–269; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 20 — Gia Trạch: all passages, conditions, examples, and notes.
- [ ] Chapter 20 supplement — Tân Tăng Gia Trạch: all passages, conditions, examples, and notes.
- [ ] Chapter 21 — Châu Thuyền: all passages, conditions, examples, and notes.
- [ ] Chapter 22 — Xướng Gia: all passages, conditions, examples, and notes.
- [ ] Preserve question-specific roles, qualifications, and translator disagreements.
- [ ] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm the supplied BPCT edition fingerprint and inspect the complete source passages for PDF 231–269, including page-boundary images.
2. Map the four assigned inventory units and their source layers before authoring; preserve prior records and unresolved audit obligations.
3. Author source-compared summaries for chapters 20, the chapter 20 supplement, 21, and 22, with claim-specific citations and tests.
4. Reconcile inventory, expected-unit registry, release manifest, generated projection, and next batch; measure the rebuilt web asset and adjust only the Workbox file limit if needed.
5. Run required local gates, inspect the full diff, and record review evidence and handoff.

## Decision log

- **Question:** Does this bounded feature need a separate external plan?
  **Decision:** Keep the plan inline in this feature record.
  **Alternatives:** Create `docs/plans/feat-054.md` or use only the existing acceptance record.
  **Rationale:** The scope is one consecutive BPCT source cohort in the existing knowledge package; acceptance already defines the four units, and the execution steps fit in this record. No migration, API break, or multi-workspace ownership is planned.
  **Evidence:** `features/feat-054.md`, `docs/reviews/knowledge/source-inventory.md`, and the repository's inline-plan guidance in `AGENTS.md`.
  **Effect:** No external plan or additional tracking file; keep source map, acceptance, evidence, and handoff here.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active on `feat/054-bpct-applications-housing-boats-xuong-gia`, based on `main` at `e471589a92f89a2470c1d1356d06118836b40994`.
- Evidence: Dependency feat-053 is done and merged. The supplied BPCT SHA-256 is recorded as `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`; verify the local PDF before authoring.
- Blockers: none identified. Rights remain subject to `LICENSING.md`; source-review and certification gates remain closed unless their separate requirements pass.
- Next: Map and inspect PDF 231–269, then author only the four assigned source units.
