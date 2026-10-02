# Offline PWA

This document owns V1 offline, installation, and update behavior for `apps/web`.

## Runtime contract

After one successful online load, the core V1 flows must work without network access.

The offline set includes:

- application shell;
- JavaScript and CSS bundles;
- icons and manifest;
- V1 knowledge assets required by the browser and result explanations.

Calculation never depends on network access.

## Installation

The app remains usable as a normal website when the browser does not support PWA installation.

Do not make installation a requirement for reading creation or knowledge lookup.

## Update behavior

A new service worker must not force a reload while a reading draft is active.

When a new version is ready:

1. Show an update-available state.
2. Let the user apply the update.
3. Reload only after the user accepts or no reading draft can be lost.

## Offline states

Show a small offline indicator when the browser reports no network.

Do not block navigation to cached V1 screens.

Do not imply that unsaved reading drafts survive reloads. V1 has no persistence.

## Asset rules

Bundle required V1 knowledge locally.

Do not require remote fonts, CDN scripts, remote APIs, or analytics for core flows.

## Verification

Check at least:

- first online load;
- PWA installation on a supported browser;
- offline new reading;
- offline result explanation;
- offline knowledge search;
- offline direct route reload;
- update while a reading draft exists.

## Intended knowledge scale and updates

Released snapshot → measured assets and local queries → cached routes → user-accepted snapshot update.

These checks extend the existing PWA contract; they have not been implemented for the expanded corpus.

- Freeze numerical budgets and test devices before changing the knowledge loading strategy.
- Measure raw/compressed payload, precache size, storage, cold loading, query latency, and peak memory.
- Check actual released builds and separately labelled volume fixtures covering all inventoried groups, 64 quẻ, and 384 positions.
- Keep synthetic volume content outside released knowledge and source-review evidence.
- Enforce asset budgets mechanically; check runtime budgets on the recorded devices and browsers.
- Verify all required knowledge assets are cached after one successful online load, including assets introduced by split loading.
- Keep displayed content, citations, review metadata, and snapshot identity from the same immutable release.
- Test two-version updates, interrupted asset retrieval, and rollback without mixing snapshots.
- Preserve the existing draft-safe update acceptance flow.
- Show the active snapshot identity offline in diagnostics.

Repeat budget and offline checks when corpus size, schema, assets, or loading behavior changes.
Before claiming full-volume delivery, test the actual complete authored snapshot; fixture results do not establish that claim.
The [knowledge model](knowledge-model.md#intended-snapshot-identity) owns snapshot identity.
The [release contract](../release.md) owns browser versions, hosting rollback, and production evidence.
