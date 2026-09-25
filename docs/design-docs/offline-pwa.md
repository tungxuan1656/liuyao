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
