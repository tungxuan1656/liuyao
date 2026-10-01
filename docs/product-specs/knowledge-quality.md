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
- the original summary's author or review record;
- documented content usage rights under [Licensing](../../LICENSING.md).

A source title alone does not establish a claim.
A project implementation establishes current behavior, not independent doctrinal evidence.
References to software fields can use the project contract directly.

## Review states

The JSON corpus encodes these content review states. They are separate from Harness feature statuses.

| State        | Meaning                                            | Publication                                           |
| ------------ | -------------------------------------------------- | ----------------------------------------------------- |
| `draft`      | Passage located and claim extracted                | Keep outside released knowledge.                      |
| `reviewed`   | Passage, attribution, and expected meaning checked | Eligible when rights and structural checks also pass. |
| `disputed`   | A source conflict lacks a supported resolution     | Withhold the claim from calculation authority.        |
| `superseded` | A reviewed replacement exists                      | Retain the replacement route in review history.       |

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

## Learning coverage

V1 explains displayed facts and provides local reference lookup.
V1 does not require full 384-line commentary. See the [knowledge model](../design-docs/knowledge-model.md).
Advanced interpretation remains outside the current [product scope](product-scope.md).
The supplied books contain material for those topics, but source availability does not activate them.

Before advanced analysis becomes product behavior, define its source, conditions, calculation inputs, and conflict treatment.
Calendar rules also need an explicit timezone and boundary convention.
The books alone do not select those software conventions.

## Publication gate

Publish a content change only after its provenance, rights, structural validation, and domain review pass.
Release acceptance remains in [V1 MVP](v1-mvp.md).
When the edition, rule, or explanation changes, repeat the affected evidence review.
