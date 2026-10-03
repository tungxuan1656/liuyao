# feat-103 — Harden knowledge payload budgets and offline snapshot updates

## Goal

Keep expanded knowledge usable within measured budgets and consistent across offline updates and rollback.

## Scope

**Intended work:** Released-build measurements, isolated volume fixtures, loading/cache checks, snapshot diagnostics, and update recovery.

## Non-goals

Corpus authoring, hosting selection, remote search, reading persistence, and browser automation suites.

## Acceptance

- [ ] Satisfy the [knowledge scale/update contract](../docs/design-docs/offline-pwa.md#intended-knowledge-scale-and-updates).
- [ ] Freeze numerical payload/runtime/cache budgets and exact test devices before changing loading behavior.
- [ ] Measure released builds and separately labelled full-volume fixtures; synthetic content never enters releases.
- [ ] Mechanical asset guards and recorded cold-load, search, storage, and memory checks enforce those budgets.
- [ ] First online load enables offline lists, all required detail assets, citations, and search.
- [ ] Two-version updates, interrupted retrieval, and rollback retain one snapshot and the existing draft-safe acceptance flow.
- [ ] Offline diagnostics identify active content and review scope; snapshot or loading changes invalidate affected QA evidence.
- [ ] Actual complete authored builds pass before full-volume delivery is claimed.
- [ ] Required verification and supported-browser evidence are recorded.

## Relevant docs

[Identity](../docs/design-docs/knowledge-model.md#intended-snapshot-identity), [quality](../docs/product-specs/knowledge-quality.md),
[release](../docs/release.md), [verification](../docs/development.md).

## Plan

1. Record current measurements, inventory-based volume fixtures, budgets, and supported devices.
2. Add asset guards and adjust loading only where measurements require it.
3. Verify offline update/rollback directly; bind results to snapshots and commit coherent checkpoints.

## Verify

- `./init.sh`
- Mechanical asset/cache checks added by this feature.
- Direct offline, update, rollback, and device-budget checks under the release contract.

## Handoff

- State: todo.
- Evidence: Planning recorded; implementation has not started.
- Dependencies: See [feature index](../feature_index.json); measured volume fixtures allow early hardening.
- Next: Complete feat-102, select this feature, and assess external-plan criteria before coding.
