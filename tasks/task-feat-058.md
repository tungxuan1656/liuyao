# feat-058 - Complete BPCT casting supplements and book criticisms

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-057](task-feat-057.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II chapter 3, PDF 429–457; Part III, PDF 458–467.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Observed transformation headings I, II, IV and actual examples (429–435).
- [x] All eighteen Tạp Sự cases (435–451).
- [x] All eleven Tinh Sát sections (451–457).
- [x] All fifteen criticisms and closing pages (458–467).
- [x] Check missing numbering and shared-page continuations; do not invent unprinted transformation rows.
- [x] Preserve criticised views and objections separately with named textual layers.
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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #86 at `914bef4d7e98bd5784303a00cf37261b01e9abbe`, from reviewed head `93f9e943fe0b0a2fe2b3c995b5b2f9ea38fe2fdf`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. PR verify run `37504128763`/job `112408327418`, Cloudflare Pages, and GitGuardian passed. The pre-push `./init.sh` passed 4,499 tests (4,318 knowledge, 181 core); corpus source/freshness and production package-export preservation checks passed. The measured 10,384,705-byte asset fits the 10 MiB Workbox cap by 101,055 bytes; all18 precache entries remain.
- Coverage: Added19 records,328 claims/citations,325 registry units; feature cohort has445 obligations (389 mapped,56 unresolved II placeholders). The heading for II claims64 hexagrams/384 lines, while only eight named entries/48 rows appear in the supplied section. Keep II-09..64 unresolved pending source-audit/edition reconciliation. feat-091 audit, global source review, and corpus certification remain open; no modern advice or efficacy authority is claimed.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Continue with selected feat-059 from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — feat-058 merged

**State**: done and merged to `main` in PR #86 at `914bef4d7e98bd5784303a00cf37261b01e9abbe`; reviewed exact head `93f9e943fe0b0a2fe2b3c995b5b2f9ea38fe2fdf`.
**Done**: Published 19 BPCT casting-supplement and criticism records for PDF 429–466, with 328 new source-attributed claims/citations and 329 dispositions including one reused note. Preserved source layers, repeated/conflicting labels, unprinted sections and differing printed folios without inference.
**Evidence**: Independent exact-head review returned `OK`, no findings. PR verify run `37504128763`/job `112408327418`, Cloudflare Pages, and GitGuardian passed. The pre-push `./init.sh` passed 4,499 tests (4,318 knowledge, 181 core); corpus validation and package-export/preservation checks passed. The 10,384,705-byte integrated asset fits the 10 MiB Workbox cap with 101,055 bytes headroom; all 18 precache entries remain.
**Coverage**: Section II's title claims 64 hexagrams/384 lines, but the supplied pages show only eight named entries/48 rows before IV. The other56 obligations remain unresolved pending source audit/edition reconciliation; they are not represented as source-reported omissions or invented entries. The cohort adds325 registry units; 445 obligations total with389 mapped. Source audit feat-091, global review, and certification remain open; no efficacy or modern medical/legal/safety advice is claimed.
**Blockers**: none for feat-058.
**Next**: Continue with selected feat-059 from updated `main`.

## Migration provenance

Migrated from [feat-058](../features/feat-058.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
