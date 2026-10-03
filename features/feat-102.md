# feat-102 — Verify released knowledge fidelity across package and web flows

## Goal

Trace every released explanation from public lookup to the correct web context and supporting evidence.

## Scope

**Intended work:** Reusable projection checks, route/context evidence, direct UI review, and a snapshot-bound fidelity report.

## Non-goals

Repeating source audits, specialist certification, prediction, and browser automation suites.

## Acceptance

- [ ] Satisfy the [runtime fidelity contract](../docs/product-specs/knowledge-quality.md#intended-runtime-fidelity) for every released record type.
- [ ] Record and claim identities, conditions, attribution, tables, diagrams, and evidence remain reachable without mismatched sources.
- [ ] Primary/changed quẻ and positions 1–6 resolve against explicit expected contexts, including static and moving cases.
- [ ] Missing content, unpublished targets, accepted conventions, and recorded review scope render distinct states.
- [ ] Direct compact/wide, keyboard, and offline checks cover each presentation branch.
- [ ] Checks reject omitted claims, dropped conditions, swapped contexts, and wrong citations through isolated fixtures.
- [ ] Report binds release membership, snapshot identity, and projection revision; relevant changes require re-verification.
- [ ] Required verification and direct web evidence are recorded.

## Relevant docs

[Library](../docs/product-specs/knowledge-browser.md), [result](../docs/product-specs/reading-result.md),
[model](../docs/design-docs/knowledge-model.md), [verification](../docs/development.md).

## Plan

1. Enumerate released records, declared routes, and independent expected context/evidence mappings.
2. Add package checks for reusable projections and snapshot freshness, with rejection fixtures.
3. Review rendered branches directly and record their evidence; commit the fidelity gate.

## Verify

- `./init.sh`
- Package projection, release-set, and context checks.
- Direct UI and offline checks under the development contract.

## Handoff

- State: todo.
- Evidence: Planning recorded; implementation has not started.
- Dependencies: See [feature index](../feature_index.json); full-corpus certification is not required.
- Next: Complete feat-098–100, select this feature, and assess external-plan criteria before coding.
