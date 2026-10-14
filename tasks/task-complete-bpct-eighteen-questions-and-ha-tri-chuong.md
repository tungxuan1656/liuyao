# task-complete-bpct-eighteen-questions-and-ha-tri-chuong - Complete BPCT eighteen questions and Hà Tri Chương

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-complete-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight](task-complete-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II, chapters 1–2; PDF 365–428.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Questions 1–6.
- [x] Questions 7–12.
- [x] Questions 13–18.
- [x] Every Hà Tri Chương heading, explanation, and note.
- [x] Give each question and subordinate passage its own inventory disposition.
- [x] Distinguish the question, attributed experiment, example, and general conditional rule.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and commit each six-question checkpoint.
2. Review and commit Hà Tri Chương.
3. Reconcile overlap with existing claims and verify all dispositions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #85 at `1e1a5d53ecabd3344cd41c15cecc32068819ee0b`, from reviewed head `2e69eef1250f202f34be7e8244c1e8a0790201a3`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. PR verify run `37494127883`/job `112374155807`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 4,163 tests (3,982 knowledge, 181 core); corpus validation and package-export checks passed. The measured 9,862,515-byte asset fits the 10 MiB Workbox cap with 623,245 bytes headroom; all 18 precache entries remain.
- Coverage: Added 20 source-compared records and 608 claims/citations with 612 registry groups. Prior 248 records, 6,806 claims, 7,052 citations, 17 exclusions, and 19 layer rosters remain unchanged. task-review-and-improve-bpct-questions-ha-tri-casting-supplements-and-criticisms audit has0/813 current obligations; source audit and corpus certification remain open. No efficacy, medical, legal, or safety authority is claimed.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Continue with selected task-complete-bpct-casting-supplements-and-book-criticisms from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — task-complete-bpct-eighteen-questions-and-ha-tri-chuong merged

**State**: done and merged to `main` in PR #85 at `1e1a5d53ecabd3344cd41c15cecc32068819ee0b`; reviewed exact head `2e69eef1250f202f34be7e8244c1e8a0790201a3`.
**Done**: Added 18 BPCT questions, the unsigned moving-lines insertion, and Hà Tri Chương items 1–60 (PDF 365–428): 20 records, 608 new claims/citations, 611 locator dispositions plus one insertion parent. PDF 413 is an image-checked folio-only page. Preserved examples, translator disagreements, incomplete numbering, and source uncertainty; retained prior selected Q5, Q6, Q10, Q12–14 claims.
**Evidence**: Independent exact-head review returned `OK`, no findings. PR verify run `37494127883`/job `112374155807`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 4,163 tests (3,982 knowledge, 181 core); `validate:corpus --check-books --check`, package-export checks, and generator freshness passed. Integrated asset 9,862,515 bytes under the 10 MiB Workbox cap with 623,245 bytes headroom; all 18 precache entries remain.
**Coverage**: Added 612 registry groups (611 mapped dispositions plus one insertion parent), bringing the total to 2,536. Prior 248 records, 6,806 claims, 7,052 citations, 17 exclusions, and 19 layer rosters remain semantically unchanged. task-review-and-improve-bpct-questions-ha-tri-casting-supplements-and-criticisms audit remains 0/813; global source audit and corpus certification remain open. No efficacy or modern medical, legal, or safety authority is claimed.
**Blockers**: none for task-complete-bpct-eighteen-questions-and-ha-tri-chuong.
**Next**: Continue with selected task-complete-bpct-casting-supplements-and-book-criticisms from updated `main`.
