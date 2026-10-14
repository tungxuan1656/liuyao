# task-reconcile-can-and-khon-special-classical-passages - Reconcile Càn and Khôn special classical passages

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-complete-he-tu-ha-across-nhl-and-pbc](task-complete-he-tu-ha-across-nhl-and-pbc.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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
- [x] Required verification passes; evidence and handoff are recorded.

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

- Historical state: done; merged to `main` in PR #91 at `7ecd2c127895dab81890d40250ec7168fb1ab48f`, from reviewed exact head `89b36378161e1e2fd66449fc0a0b482aee27f705`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings, covering implementation and CI-performance changes. Verify run37572313369/job112633450697,Cloudflare Pages and GitGuardian passed. Post-optimization `./init.sh` and the pre-push repeat each passed6,321 tests (6,140 knowledge,181 core); the generator suite passed7 tests in69.79s without changing its120s per-test,120s setup, or30s child-process timeouts.
- Coverage: Source evidence for all94 assigned pages and all six edition-specific special-passage owners is recorded above. The13 MiB Workbox cap fits the12,641,410-byte integrated bundle with990,078 bytes headroom; all18 precache entries and other PWA settings remain. Audit068,global source/layer review and certification remain unresolved/closed. PBC Càn Văn Ngôn PDF43–57 remains explicitly deferred; no efficacy or modern advice is claimed.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Continue with selected task-resolve-the-six-remaining-legacy-project-definitions from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-07 — task-reconcile-can-and-khon-special-classical-passages merged

**State**: done; merged to `main` in PR #91 at `7ecd2c127895dab81890d40250ec7168fb1ab48f`; reviewed exact head `89b36378161e1e2fd66449fc0a0b482aee27f705`.
**Done**: Added edition-specific Càn/Khôn special-passage summaries for three editions across six owners, with 260 new original claims and261 exact-edition citations. All94 assigned pages were individually inspected. Added281 child dispositions/287 audit groups routed task-reconcile-can-and-khon-special-classical-passages→task-simplify-knowledge-and-rebuild-que-01-04; explicitly defer PBC Càn Văn Ngôn PDF43–57. Special passages remain outside the six-position line inventory.
**Evidence**: Fresh exact-head review returned `OK`, no findings. Verify run37572313369/job112633450697,Cloudflare Pages and GitGuardian passed. Post-optimization and pre-push `./init.sh` passed6,321 tests (6,140 knowledge,181 core); focused generator suite passed7 tests in69.79s. All120s test/setup and30s child timeouts and assertions remain intact. Corpus/books validation,package exports/preservation,201 local documentation routes and offline precache checks passed.
**Coverage**: Corpus has371 records/9,497 claims/9,744 citations and registry revision57 with4,638 groups/17 exclusions. Snapshot identity is `liuyao-knowledge-snapshot-v1:sha256:ae4cf07c76db4ea1a863c21222c3bf6506afa90e423d4c006a2a56b887b68854`. The12,641,410-byte integrated bundle fits the13 MiB Workbox cap by990,078 bytes; all18 precache entries remain. Audit068,global source/layer review and certification remain closed/incomplete. PBC year/rights and the explicitly deferred scope remain unresolved. No efficacy or modern advice is claimed.
**Blockers**: none for task-reconcile-can-and-khon-special-classical-passages.
**Next**: Continue with selected task-resolve-the-six-remaining-legacy-project-definitions from updated `main`.
