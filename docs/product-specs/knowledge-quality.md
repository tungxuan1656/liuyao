# Knowledge quality

This document owns the evidence and acceptance requirements for domain knowledge.
The supplied books are the primary evidence for hexagram and Liu Yao content.
File format and database choice do not establish correctness.

## Evidence flow

Supplied edition → inspected passage → structured claim → discrepancy review → original explanation → independent expected result → published content.

The [source catalog](../references/book-sources.md) owns editions, locations, and known discrepancies.
The [ruleset specification](../design-docs/liuyao-ruleset-v1.md) owns V1 board derivations.
The [knowledge model](../design-docs/knowledge-model.md) owns storage and package contracts.

## Content classes

| Class                 | Required evidence                                       | Product treatment                                  |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| Structural fact       | Exact book table, symbol, or definition                 | Display a deterministic fact and its source.       |
| Calculation rule      | Book derivation and independent expected outcomes       | Apply only within the declared ruleset.            |
| Classical meaning     | Named passage and commentary attribution                | Explain the source's meaning in original prose.    |
| Author interpretation | Named author, edition, passage, and relevant conditions | Preserve attribution and alternative explanations. |
| Project convention    | Accepted product or domain specification                | Identify it as a project convention.               |

The classical meaning of a hexagram does not automatically determine a Liu Yao reading.
Liu Yao board classification and later interpretation remain separate claims.
If authors disagree, preserve their views and scope.
Do not combine conflicting views into an unattributed universal rule.

## Required provenance

Every published domain claim needs:

- a stable entity, term, or rule ID;
- a reference to the exact supplied work and edition;
- the chapter, section, and PDF page;
- a printed page when the edition provides one;
- the applicable ruleset for a calculation claim;
- attribution for commentary, translator notes, or supplementary content;
- the original summary's author or review record.

A source title alone does not establish a claim.
A project implementation establishes current behavior, not independent doctrinal evidence.
References to software fields can use the project contract directly.
Project conventions require an accepted specification section and reviewed revision, without fabricated book citations.

## Review states

The JSON corpus encodes these content review states. They are separate from Harness feature statuses.

| State        | Meaning                                            | Publication                                     |
| ------------ | -------------------------------------------------- | ----------------------------------------------- |
| `draft`      | Passage located and claim extracted                | Keep outside released knowledge.                |
| `reviewed`   | Passage, attribution, and expected meaning checked | Eligible when structural checks also pass.      |
| `disputed`   | A source conflict lacks a supported resolution     | Withhold the claim from calculation authority.  |
| `superseded` | A reviewed replacement exists                      | Retain the replacement route in review history. |

Record source review in each authored JSON record.
The release manifest accepts reviewed records only.
Schema validation does not establish source fidelity.

## Domain acceptance

- All eight trigram patterns match the reviewed symbols.
- All 64 hexagrams have correct upper/lower trigrams, stable IDs, and normalized names.
- All 64 palace memberships and Shi/Ying positions have traceable book evidence.
- All 48 Na Jia stem/branch pairs match the reviewed inner/outer sequences.
- All twelve branch elements match their source assignments.
- All 25 palace/line element combinations follow the Five Element relation rules.
- Moving-line cases preserve line order and transform only the moving polarities.
- Each displayed domain explanation traces to its own supporting passage.
- Book discrepancies retain their locations and supported resolutions.
- Casting descriptions distinguish traditional evidence from project randomization conventions.

Expected calculation results must come from reviewed evidence independently of the implementation under review.
Generating expected results with the same calculation code cannot establish doctrinal correctness.
Package tests protect reusable behavior. [Development](../development.md) owns test placement and verification commands.

## Current gap

**Observed:** The reviewed JSON corpus records edition fingerprints, claim citations, attribution, and source-comparison metadata.
The [coverage report](../../packages/knowledge/reports/coverage.json) distinguishes released content, missing commentary, and unaudited legacy records.
Codex reviewed the cited passages in released batches. Independent specialist approval is not claimed.

The compatibility catalog still provides 8 trigrams and 64 hexagrams.
Unmigrated records remain explicitly unaudited in the JSON snapshot.
Existing core calculation fixtures retain their earlier source annotations.
Compatibility checks establish agreement with current calculations, not an independent audit of those fixtures.

**Intended:** Continue the supplied-book review across the remaining corpus.
The publication gate applies to each new batch.

## Full-corpus verification

**Intended:** The [completion roadmap](../../features/knowledge-roadmap.md) separates authoring from subsequent audits.
Creating these features does not execute their reviews.
The current `reviewed` state records source comparison, not independent specialist certification.

### Source inventory

Account for every section and page of each supplied edition before declaring coverage complete.
Classify meaningful units as included content or explicit exclusions.
Record blanks, edition notices, diagrams, missing passages, and attribution uncertainty separately.
Each unit needs an authoring owner and an audit owner.
An existing citation proves coverage of its supporting claim, not the entire chapter.
Derive expected passages and author layers from source inspection, independently of the authored record count.

The intended crosswalk is `docs/reviews/knowledge/source-inventory.md`.
The [source catalog](../references/book-sources.md) remains the owner of edition locators and source discrepancies.
The crosswalk links to that catalog instead of copying its findings.

Exclusions require a specific reason, source location, scope decision, and review.
Missing or unclear text must remain visible.
A broad exclusion cannot conceal an unfinished review.
Separate complete classification of the supplied editions from complete coverage of included content.

### Quẻ and line units

Audit all 64 quẻ, including those already source-compared.
Each quẻ has six separately accepted positions, numbered from bottom to top.
This produces 384 position decisions and at least 1,152 required book-position cells across NHL, PBC, and NTT.
Additional named commentary layers remain separate within those cells.
In NTT, identify Trình Di, Chu Hy, other cited commentators, and translator notes when present.
Do not imply that every author comments on every passage.

For each position, inspect the full passage, context, diagrams, and relevant footnotes.
Check polarity, labels, references to other lines, conditions, attribution, and paraphrase fidelity.
Preserve legitimate author differences.
Review supported source-error corrections against page images and corroborating passages.

Audit the name, aliases, structure, overview, and actual Thoán/Tượng layers separately from line decisions.
Càn/Khôn special passages require their own decisions and never create a seventh line.
The intended per-quẻ ledger is `docs/reviews/knowledge/hexagram-XX.md`.

### Group units and independent evidence

Every foundation, casting, Liu Yao, tradition, and learning group needs a ledger covering its assigned inventory units.
Audit all eight trigrams and all eight boards in each of the eight palaces.
Check Na Jia, element relations, Thế/Ứng, Lục thân, and displayed annotations against independent expected evidence.
Review each numbered BPCT sentence, application section, question, criticism, and actual Hệ Từ chapter.
Learning explanations and worked examples must resolve to reviewed claims and independently checked outcomes.

Each decision records unit and claim IDs, exact citations, findings, reviewer identity, date, and disposition.
Bind it to the source fingerprint and reviewed record hash.
Keep source comparison and independent specialist approval as distinct evidence fields.
Specialist approval requires a named reviewer distinct from Codex and an explicit decision for every assigned unit.
Unavailable specialist review remains pending.

### Completion and later corrections

**Intended:** Evidence-derived validation replaces the current report's fixed incomplete flag.
The ledger format and validation contract belong in the [knowledge model](../design-docs/knowledge-model.md) when implemented.
Missing, rejected, stale, or unresolved included units must keep completion gates closed.
Required specialist approval also keeps the final certification gate closed until recorded.

Create the validation contract after source inventory, before further bulk authoring.
Accept completed units incrementally while unfinished units keep global completion closed.
Prove invalidation and restoration with isolated fixtures before final certification.
Synthetic approvals in validation fixtures never count as specialist decisions for the corpus.

Published explanations require current released supporting claims or accepted project-contract evidence.
Reject missing, draft, disputed, superseded, stale, or circular supporting dependencies.
Ordinary navigation relationships do not establish evidence; use the [model contract](../design-docs/knowledge-model.md#intended-extended-records) to distinguish them.

Record, citation, attribution, source, or discrepancy changes reopen affected decisions.
A reused claim change also reopens dependent explanations and expected fixtures.
Follow supporting dependencies transitively through lessons, tables, diagrams, and worked examples.
Regenerate coverage and repeat affected reviews before restoring approval.
Retain the previous decisions as history, with their obsolete inputs clearly identified.

Changes to release membership or project-contract revisions also invalidate affected evidence.
Bind corpus-wide approval to the released snapshot; keep unaffected unit decisions valid for their unchanged inputs.

Completion means that the declared supplied editions and included claims passed the recorded evidence gates.
It does not establish absolute certainty, recover absent source text, or verify predictive efficacy.
Release evidence must state unresolved source limitations and the exact reviewed snapshot.

### Intended runtime fidelity

Released record → public API → Library or result context → attributed explanation and its own evidence.

Verify every released record's public representation, including trigrams, terms, rules, quẻ, and articles.
Preserve claim identity, conditions, author layers, tables, diagrams, and evidence links during presentation.
Check primary/changed quẻ and domain positions against explicit expected contexts.
Keep unavailable content and accepted project conventions distinguishable from reviewed book commentary.
Show review scope and snapshot identity without implying unrecorded independent approval.

Package checks verify reusable projections and reference completeness.
Direct web checks verify interaction, accessibility, rendered evidence, and offline routes under the [development contract](../development.md).
Bind their evidence to the tested snapshot and projections; repeat affected checks after either changes.
Runtime fidelity does not replace passage review or specialist approval.

## Learning coverage

V1 explains displayed facts and provides local reference lookup.
V1 does not require full 384-line commentary. See the [knowledge model](../design-docs/knowledge-model.md).
Advanced interpretation remains outside the current [product scope](product-scope.md).
The supplied books contain material for those topics, but source availability does not activate them.

Before advanced analysis becomes product behavior, define its source, conditions, calculation inputs, and conflict treatment.
Calendar rules also need an explicit timezone and boundary convention.
The books alone do not select those software conventions.

## Publication gate

Publish a content change only after its provenance, structural validation, and domain review pass.
Release acceptance remains in [V1 MVP](v1-mvp.md).
When the edition, rule, or explanation changes, repeat the affected evidence review.

Iterative authoring produces original Vietnamese summaries and structured facts with verified citations; every batch must pass the checks above. Domain review checks passages, attribution, and expected meaning; it does not claim independent specialist approval. Corpus-wide specialist review and certification remain separate in [feat-095](../../features/feat-095.md) and [feat-096](../../features/feat-096.md). They do not block batch authoring. [Licensing](../../LICENSING.md#third-party-material) defines source-use boundaries without a separate rights-clearance gate.
