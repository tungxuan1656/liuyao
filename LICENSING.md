# Licensing

This document defines the licensing boundary for the LiuYao repository.

## Software and repository documentation

Unless a file states otherwise, LiuYao source code and repository documentation are licensed under the **GNU Affero General Public License v3.0 only (AGPL-3.0-only)**.

See `LICENSE` for the complete license text.

The AGPL permits commercial use, modification, and redistribution subject to its terms. Modified versions used to provide network-accessible functionality can trigger source-code obligations under the license.

## Curated knowledge and content

Original curated datasets, authored reference content, translations, annotations, interpretations, and similar content stored under `packages/knowledge/data/` are **not** licensed under the AGPL unless a specific file says otherwise.

Those materials are **All Rights Reserved**. No permission is granted to copy, modify, redistribute, publish, sublicense, sell, or commercially exploit them except with prior written permission from the copyright holder or where applicable law permits otherwise.

The code used to read, validate, transform, or display those materials remains covered by the software license unless a file states otherwise.

## Third-party material

Third-party texts, quotations, translations, datasets, images, and other materials retain their original copyright and license terms.

Do not add third-party material to `packages/knowledge/data/` unless its provenance and usage rights are documented.

Consulted research editions are used for local inspection and fact verification; their text is not redistributed in the repository. Knowledge authoring produces original summaries, structured domain facts, and source citations. Knowledge authoring, publication, and audit do not require a separate rights-clearance approval. Retain source rights metadata and the third-party material boundaries above.

## Distributed dependency notices

The production build emits `third-party-licenses.txt` using Vite's bundled-dependency license collector. `apps/web/public/css-LICENSES.txt` retains the installed Tailwind CSS, tw-animate-css, and shadcn CSS notices; `apps/web/public/workbox-LICENSE.txt` retains the shared notice for the generated Workbox service-worker runtime. Font notices and OFL texts live under `apps/web/public/fonts/`. The product-information page links to these files, and the PWA precaches them.

When changing those CSS or service-worker dependencies, compare and refresh their distributed license texts from the installed packages. Inspect the generated JavaScript license report after changes to bundled dependencies; build-time-only package inventory is not a substitute for checking what ships. These notices do not license the curated content or establish rights to third-party books or branding.

## Trademarks

The software license does not grant rights to project names, logos, product branding, or other trademarks.

## Commercial licensing

The copyright holder can offer separate commercial licenses for material they own.

Third-party contributions can affect future relicensing. Do not assume an AGPL contribution can be relicensed commercially without the contributor's permission or an applicable contributor agreement.
