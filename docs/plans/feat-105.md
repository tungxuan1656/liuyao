# feat-105 implementation plan — Docs/Knowledge consolidation and agent gates

> **Status: PROPOSED / not executable until owner approval.** [Issue #128](https://github.com/tungxuan1656/liuyao/issues/128) and [feat-105](../../features/feat-105.md) own scope and acceptance. This is an execution handoff, not a new knowledge contract. Keep feat-105 `todo`; do not start refactoring as part of the plan-only PR.

## Why a separate plan

This affects at least Docs, knowledge data/schema/tests, agent harness, app Library routes and offline assets. It needs multiple bounded phases, consumer tracking, source inspection and a rollback-safe sequence. The original feat-068 refactor intentionally removed audit ledgers and monolithic release artifacts. A new generic audit system, bulk conversion or automatic source-completeness certification would repeat that failure.

The target is a **single coordinated structural cleanup**, not a complete new interpretation of the supplied books. Agent-executable review and deterministic verification should be installed once so subsequent topical feats can change their own records without repeating corpus-wide migration.

## Observed baseline to refresh on activation

At the planning snapshot (2026-10-10, `main`), `docs/` contains 46 committed files; `packages/knowledge/` contains 426. The 381-ready-record corpus includes 64 hexagram records with six line positions each. There are two tracked reports under `packages/knowledge/reports/` (~3.84 MB combined). `docs/plans/feat-067.md` contains retired audit implementation guidance while [the simplified model](../design-docs/knowledge-model.md) owns active rules. These counts are observations, **not correctness thresholds**.

### Concrete risks and treatment

| Observed artifact                                                                                                                 | Risk to autonomous agents                                                                                                          | Initial disposition (verify before changes)                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `docs/index.md`, `ARCHITECTURE.md`, `AGENTS.md`                                                                                   | Conflicting routing or repeating policies can cause agents to place knowledge in docs or use historical plans as current contracts | Keep; refresh owner map and make links authoritative                                                                          |
| `docs/plans/feat-067.md`, `feat-101.md`, `docs/reviews/knowledge/`, `progress.md`                                                 | Historical audit/provenance text looks actionable                                                                                  | Preserve history; label/index as historical, never rewrite old append-only logs                                               |
| `packages/knowledge/reports/authoring-crosswalk.json` and `coverage.json`                                                         | Large retired artifacts and obsolete claims/counts accidentally become acceptance gates                                            | Find all readers; if unused, delete from active tree, recover from Git; no replacement report                                 |
| `data/foundations/ntt-cover.json`, `ntt-title.json`, `ntt-intro-index.json`, `pbc-contents.json`, `nhl-front-end-accounting.json` | Edition/front-matter accounting presented as learner-facing Articles merely because status is ready                                | Review purpose/links; keep meaningful provenance/source errors but route/index appropriately; don't infer deletion from title |
| `data/liuyao/bpct-boards-*.json`                                                                                                  | 64 figure boards / 384 label facts plus repetitive paraphrases; agent may multiply text during feat-084                            | Pilot and measure; retain one canonical structured representation plus only distinct supported explanation/exception          |
| `data/foundations/ntt-chu-xi-diagrams.json`, other large articles                                                                 | Automated size thresholds invite lossy splitting or artificial fragmentation                                                       | Keep unless a concrete, independently demonstrated content/consumer problem exists                                            |
| `data/sources.json` and `data/bibliography.json`                                                                                  | Inaccurate assumption that the two lists are duplicates                                                                            | Keep their different supplied-edition vs compatibility/broader bibliography duties; document and test separation              |
| `data/*.ts` compatibility exports / `src/content-adapter.ts`                                                                      | Runtime consumers could break if shims are deleted just because JSON is canonical                                                  | Keep until consumers are identified and migrations are separately justified                                                   |
| `docs/design-docs/batquai.avif`                                                                                                   | Source artwork seems misplaced but moving it can break the approved PWA icon generator and rights/source record                    | Default keep; move only after establishing concrete benefit and updating generator references                                 |
| `docs/design-docs/liuyao-ruleset-v1.md`, `@liuyao/core`, rule JSON tables                                                         | Unclear source vs implemented convention leads to silent calculation changes                                                       | Keep boundaries explicit; compare source-derived fixtures to core; never let an editorial change rewrite core behavior        |
| Feat-084–093 goals and checklists                                                                                                 | Literal "every unit decision" may recreate per-paragraph audit ledgers and huge reports                                            | Preserve their actual scholarly scope, replace logging quota with bounded review/material findings and explicit owner gate    |

These entries are hypotheses for an implementation inventory, **not preapproval to delete/move**.

## Ownership and canonical boundaries

- `docs/product-specs/knowledge-content.md`: _what reader-useful content belongs in the library_; when to split an entry, preserve author disagreement, trim duplication, and keep unsupported claims out.
- `docs/product-specs/knowledge-quality.md`: _how a source-backed change becomes ready_; source locator and attribution requirements, reviewed meaning, changed-content independent reviewer gate, blockers, and final-head verification.
- `docs/design-docs/knowledge-model.md`: _how records, links, table/figure structures, deployment and loading work_; do not put editorial decisions here.
- `docs/references/book-sources.md`: human-readable edition-level and known-discrepancy notes. `packages/knowledge/data/sources.json`: machine-readable four supplied editions and fingerprints; no PDF payloads. `bibliography.json`: distinct legacy bibliography/compatibility material where required.
- `docs/design-docs/liuyao-ruleset-v1.md`: project's implemented computation conventions and supporting explanation. `packages/liuyao-core/`: pure deterministic implementation. `packages/knowledge/data/`: sourced explanation and original observed tables/figures (including known discrepancies).
- `apps/web/`: UI/Library route and offline rendering; knowledge content and business rules are not authored in components.
- `features/`, `feature_index.json`, `progress.md`: feature scope, dependency, execution status and material handoff only; not durable content authority. Retired plans remain historical.
- `packages/knowledge/data/README.md`: concise authoring commands and links, not duplicate quality policy.

Avoid introducing `docs/knowledge/`, a second data manifest, `reports/current/`, source-to-claim maps, hashes/certificates, or a central publication status database.

## Execution order (after explicit approval)

### Phase 0 — Intake, freeze and rollback point

**Owner:** Leader/coordinator. **Preconditions:** Owner authorizes feat-105, no other active feat; verify dependencies and working tree.

1. Record the exact base SHA and `main` state; distinguish merged code from open PR descriptions. Recheck the observed inventory and final branch contents before editing.
2. Check the repository has the expected four local research PDFs in `docs/books/` only if available. Their SHA-256 in `sources.json` identifies the edition, not semantic correctness. If any PDF is unavailable, record a blocker for affected source-derived edits; do not invent evidence or fetch other editions silently.
3. Create a concise **temporary implementation inventory** (not a committed audit registry): owners, proposed file actions, record IDs, inbound/outbound links, source references, UI routes, bundle/per-record assets, tests. Enumerate all consumers of retired report names, source catalog/shims and logo with code, build scripts and docs references.
4. Capture baseline `./init.sh` output and build/runtime measurements (initial JS raw+gzip, metadata raw+gzip, largest ready record raw+gzip, full precache size), current matching `validate:corpus --check` state, and direct-route/offline behavior. Because `init.sh` applies fixers, inspect the worktree first; do not overwrite unrelated modifications.
5. Require an explicit disposition (`keep`, `change in place`, `retire from active tree`, `defer`) for each target; no blanket directory move.

**Gate:** Baseline measured, consumers known and no ambiguous dangerous data migration. If an artifact is required by an unanticipated external consumer, stop or minimize accordingly.

### Phase 1 — Docs routing and historical information architecture

**Owner:** docs/architecture writer; reviewer checks source-of-truth conflicts.

- Update `docs/index.md` and `ARCHITECTURE.md` only where needed to distinguish product scope, documentation contract, source record, runtime implementation and historical execution artifact.
- Clarify observed, intended, retired and historical terminology where old plans/roadmap excerpts are misleading. Prefer one short historical notice and a canonical-link change to rewriting retired `docs/plans/feat-067.md` or `docs/plans/feat-101.md`.
- Keep `progress.md` append-only and completed features' original evidence untouched.
- Assess `docs/design-docs/batquai.avif` together with `apps/web/pwa-assets.config.ts`, `docs/product-specs/product-identity.md`, generator paths and image rights. Leave it if no substantial ownership benefit; if moved, update every source path and verify generated assets.
- Keep the local PDF `docs/books/` ignored and distinct from distributable content. Do not move licensed research PDFs into tracked packages.
- Avoid duplicating the same rule in `AGENTS.md`, the roadmap, the plan and quality docs.

**Gate:** Every current artifact has one documented purpose; active guides never point to the ledger program as an instruction.

### Phase 2 — Obsolete reports and compatibility consumers

**Owner:** knowledge build/API writer; reviewer checks call sites.

- Trace uses of `packages/knowledge/reports/authoring-crosswalk.json` and `coverage.json` in package scripts/tests, CI, docs, feature plans, hardcoded links and non-code consumers visible to the repository.
- Where genuinely unused, remove the tracked reports from the active tree; preserve recovery details in the single historical review README and Git. Do not move their bytes into `docs/`, build outputs or a new registry.
- If any live functionality depends on them, replace _that function_ with existing canonical record/projection access, verify its tests, then retire the report. Defer if it would trigger a large schema migration.
- Inspect `packages/knowledge/data/*.ts` exports and `src/catalog.ts`/adapter before considering changes. Compatibility re-exports are not duplicated editorial prose; do not remove merely for tidy naming.
- Verify `sources.json` and `bibliography.json` semantics, IDs, source association and legacy APIs. No automatic merge.

**Gate:** Build and compatibility lookups still pass; no audit gate or report generator reintroduced.

### Phase 3 — Reader-facing content classification and deduplication

**Owner:** source-aware knowledge writer (one bounded file group at a time). **Independent reviewer:** different agent with access to cited source passage and required image.

- Review the edition/front-matter record examples above. For each, answer: does the content teach a concept or describe bibliographic/provenance/source-error information? Does an existing learner deep link or related ID rely on it?
- Prefer a minimally invasive placement/presentation change (metadata field, owning source note, filtering in the existing Library projection) over a new `metadata` record type. `ready` means valid content, not necessarily that the item should appear in the Bài viết list. If any removal/ID redirect is proposed, enumerate affected direct and reverse links, and preserve permitted access/meaning.
- Compare representative `bpct-boards-*.json` figures with corresponding BPCT PDF image pages. The `figures[].labels` source facts and exceptional annotations may be canonical; entries that simply restate them are candidates to trim, **not automatic duplicates**. Preserve observed original typos/source errors with correct attribution rather than silently normalizing them into core calculations.
- After one small pilot, check links, figure rendering and content diffs. Only then apply demonstrably safe reductions across other boards. Avoid literary review of unrelated articles, even if long.
- Keep different commentators separate (NHL/PBC/Trình Di/Chu Hy), retain the reporting intermediary and PDF pages; keep project choices and historical interpretations distinct. Quote/paraphrase within licensing boundaries.
- A source gap is not a source error. If images are unreadable or semantic changes remain disputed, keep them explicit and stop the affected record, without blocking unrelated records.

**Gate:** Independent reviewer verifies each materially changed claim/condition/figure and direct uses; source locators and semantic differences preserved. No per-clause approval ledger.

### Phase 4 — Agent execution gate before topic features

**Owner:** harness/docs writer. **Independent reviewer:** checks that the contract is unambiguous and non-duplicated.

- Extend existing `knowledge-quality.md` with one bounded agent-execution/publication gate:
  1. Read assigned feature, canonical docs and exact source passages.
  2. Separate facts, source errors, attributed interpretations, translator comments and project conventions.
  3. Write one coherent explanation of a useful idea; no quota per sentence/page/author, no filler or duplicated table labels.
  4. Preserve material conditions, disagreements, worked examples and exceptions.
  5. Use direct source IDs/pages and intermediary `via` attribution where needed.
  6. Compare changed claims and directly affected uses with an independent reviewer; record concrete findings, pointer, book/page, smallest repair, and whether imagery was inspected.
  7. Run relevant automated invariants; independently inspect expected table values instead of deriving fixtures from the calculator under test.
  8. Fail closed on genuine unresolved material defects, missing sources or schema/core behavior changes.
  9. Verify corrected final revision and write concise feature handoff; completed unrelated knowledge does not require a new certificate.
  10. Never create per-claim decisions, audit ledgers, reviewer identity databases, hash histories or corpus-wide signoffs.
- Keep `knowledge-content.md` responsible for the writing unit and dedup criterion, `knowledge-model.md` for storage, and `AGENTS.md`/`packages/knowledge/data/README.md` as links/actions. Avoid copying the ten points to every document.
- Revise feat-084–093 requirements that currently demand “every separate decision” while **retaining coverage of their assigned chapters, tables, figures, clauses, conditions and author differences**. “Review all assigned units” is a scope commitment, not a promise to commit one decision object per source unit.
- Freeze cross-feature ownership and dependencies so feat-084–093 do not start before completion of feat-105. Do not activate any of those features during this migration.

**Gate:** A fresh agent can choose the correct record, inspect the source, request independent review, and close a feature without inventing additional schemas or ledgers.

### Phase 5 — Focused automated quality guards

**Owner:** knowledge test writer; Leader verifies cost and placement.

- First inspect `packages/knowledge/scripts/content-validation.mjs`, `schema/record.schema.json`, `tests/content-validation.test.mjs`, `content-tables.test.ts`, `content-worked-readings.test.ts`, existing `init.sh` and CI. **Extend existing tests** rather than adding a second validator.
- Validate only reliable invariants relevant to defects fixed: IDs/anchors unique; links resolve (including figure/section/line positions); source page bounds and original edition references; 64 quẻ/384 positions when that is part of the assertion; tested 48 Na Jia pairs, 64 palace memberships, 25 relative classifications and worked examples against independently inspected expected values.
- Protect new behavior around hiding/locating bibliographic articles with focused query/route tests; avoid adding a sprawling search or routing abstraction.
- Add a narrow regression test if a legacy artifact can be reintroduced accidentally through build inputs, but do not hard-code every old filename in a generic denylist without a concrete failure mode.
- Keep CI deterministic and internet-free. `--check-books` remains local where supplied PDFs are available; CI must never claim source correctness based solely on successful `validate:corpus`.
- Use small synthetic fixtures for validator behavior; whole-corpus tests only for corpus-wide assertions. No arbitrary max JSON lines/bytes and no repeated expensive corpus build per test case.

**Gate:** New guards demonstrate a failing case before the fix (when feasible), pass after it and show no substantial unexplained test-runtime increase.

### Phase 6 — End-to-end verification, rollback and closeout

**Owner:** Leader; independent reviewer checks the final diff and high-risk content.

- Run `./init.sh` on a clean worktree, then `pnpm --filter @liuyao/knowledge validate:corpus --check` after a package build; run `--check-books --check` locally only with the supplied editions present.
- Verify direct links to representative original articles, quẻ 01/64 and each of six positions, source attribution, figure/table visibility, source error notes, correct navigation and invalid-target behavior. Test compact and wide layouts, keyboard access and offline reload/retry with ready library precached. Source PDFs must not ship.
- Compare pre/post build: initial JS raw/gzip, metadata index raw/gzip, largest ready JSON raw/gzip, complete ready record assets and PWA precache. Evaluate impact rather than assuming smaller tracked repo equals smaller runtime.
- Reverify accepted source corrections against final revision and source images where needed; no earlier reviewer PASS overrides a later finding.
- Maintain stable public IDs, contracts and deterministic reading outputs. Do not force a global schema rewrite or alter `liuyao-core` under an editorial refactor.
- Keep changes in bounded commits aligned with phases; document verification, material findings, known source gaps, unresolved blockers and one next action in feat-105/progress only during approved execution.

**Rollback:** Revert the smallest offending phase/commit. Historical report files remain recoverable from Git; never rebuild the old audit program to recover one observation. If a content move breaks route compatibility, revert the move while retaining a verified minimal correction.

## Agent coordination and ownership

| Role                        | File scope                                                                  | Proof of completion                                                                   |
| --------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Leader                      | Feature state, plan, cross-package integration, final verification          | Base/final SHA, assigned ownership, no concurrent feature, blocking findings resolved |
| Docs reviewer/writer        | `docs/index.md`, owning product/design docs, `ARCHITECTURE.md`, `AGENTS.md` | No duplicate canonical policies, historical plans clearly routed                      |
| Knowledge content writer    | Selected `packages/knowledge/data/` records only                            | Exact source/page/image locators, changed-text diff, preserved exceptions             |
| Independent source reviewer | Read-only pass on changed content and direct uses                           | Material findings with record ID/pointer/pages, correction verified on final diff     |
| Knowledge/core test writer  | `packages/knowledge/tests/`, existing validation scripts                    | New relevant failure-mode tests; no unrelated core behavior changed                   |
| Web integration verifier    | `apps/web/` Library and PWA routes, if actually affected                    | Deep links, accessibility, offline and payload evidence                               |

Where multiple agents operate, assign **non-overlapping file ownership**; integrate sequentially before final checks. A writer does not approve its own semantic correctness. Treat absent source access as a specific blocker, not a reason to invent a substitute.

## Change-placement and acceptance safeguards

- Owner can approve the feature plan without approving each initially hypothetical deletion; phase-0 inventory must prove each significant action. Breaking schemas, record IDs, routes, public API, licensing interpretations, or source editions require **separate explicit approval**.
- Do not amend historic plan execution claims or erase older `progress.md` entries; no retrospective certification.
- Keep direct source facts separate from conjecture; unusual source spelling or Bát cung exceptions are not silently “fixed” to match core.
- Cross-links to historical files are fine when explicitly marked historical; they must not become a new dependency for current authoring.
- Keep product functionality and original source summaries intact unless a **source-backed changed-content review** authorizes the smallest correction.
- If a cleanup proposal cannot be evidenced as useful, leave the existing structure. No churn for aesthetics.

## Verification and acceptance matrix

| Area                       | Method                                                                  | Evidence recorded                                              |
| -------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| Docs ownership and history | Inspect owner map, all changed links/headings and historical references | List of canonical owners and corrected routes                  |
| Source fidelity            | Independent changed-entry/source comparison incl. images for diagrams   | Book, PDF page, exact record pointer and verified correction   |
| Structural graph           | JSON schema + corpus checks                                             | Unique ID/anchor and valid related/table/figure/position links |
| Deterministic calculations | Knowledge table fixtures + core regression tests                        | Independent expected values, no behavior delta                 |
| Public Library             | Direct page/deep link/hidden metadata tests                             | No lost records/meaning or broken navigation                   |
| Offline/payload            | Production build + browser offline/retry checks                         | Raw/gzip deltas, precache inventory, usable cached records     |
| Repository integrity       | `./init.sh` + clean worktree CI                                         | Final commit SHA and pass/fail details                         |
| Scope/agent contract       | Review updated feat-084–093 and `AGENTS.md` routing                     | No per-unit decision ledger, all scope still covered           |

**Definition of done:** All [feat-105 acceptance](../../features/feat-105.md#acceptance) criteria pass on the final revision, with explicit unresolved gaps and no material content blocker. A passing schema alone never certifies interpretations or efficacy.

## Planning-PR gate

The **current planning PR must contain only** `features/feat-105.md`, `docs/plans/feat-105.md`, and `feature_index.json`. It must not rewrite canonical docs, edit ready records, remove reports, modify scripts/tests/UI, start source-review work, change `progress.md`, or mark the feature active/done.

After owner approval, activate feat-105 explicitly, refresh all baseline evidence and implement in bounded changes. Feat-084–093 remain `todo` until feat-105 is complete.
