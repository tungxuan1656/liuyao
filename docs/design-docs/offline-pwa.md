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

## Knowledge delivery

**Observed:** The browser uses small metadata and separate JSON record assets. Workbox precaches ready content during installation.

- Keep calculation data and compact V1 reference lookup available at startup.
- Load a selected quẻ or article as its own JSON asset.
- Keep the metadata index small; do not include every paragraph in list or search data.
- Precache ready record assets, references, and required images in the background.
- Include JSON in the service worker asset rules.
- After the complete offline set is cached, the full published library works without a network.
- If asset retrieval stops early, retain cached content and retry incomplete assets online.
- Preserve the existing user-accepted update flow and reading-draft protection.
- Use deployment asset versions and the normal service worker cache; do not add a semantic hash graph.

Split assets reduce startup parsing and allow focused loading. They do not reduce the total full-library offline download automatically.
The browser receives authored explanations and relevant bibliography, not source PDFs, audit ledgers, or reviewer histories.

## Payload verification

Measure the actual production build after knowledge or loading changes:

- raw and gzip bytes for the initial JavaScript, metadata, and largest record;
- total precached asset bytes and complete offline cache contents;
- cold startup, record opening, local search, and memory on a representative browser.

Keep detailed corpus data out of the initial JavaScript bundle.
Use one meaningful corpus/build check instead of a synthetic certification or snapshot approval framework.
Check direct offline routes and interrupted retrieval before claiming offline delivery.
The [knowledge model](knowledge-model.md#generated-files) owns generated output and package access.
