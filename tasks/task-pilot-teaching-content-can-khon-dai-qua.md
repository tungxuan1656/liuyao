# task-pilot-teaching-content-can-khon-dai-qua - Pilot Vietnamese teaching content for three hexagrams

- Status: done
- Owner: Codex
- Required to start: none; user approved Càn, Khôn, Đại Quá and Vietnamese-only presentation
- Required to integrate/release: source review and verification below

## Scope and non-goals

Adapt the supplied `64-que` lessons for hexagrams 01, 02, and 28 into the existing canonical JSON. Put teaching explanations first; preserve old attributed commentary, IDs, incoming section links, six positions, notes, and classical special passages. Keep applications explicitly hypothetical and editorial. No remaining 61 records, schema, routes, calculation rules, Markdown runtime, or dependencies change. Follow-up approved during verification: add the standard mobile capability meta tag while retaining Apple's declaration.

## Acceptance

- [x] Three complete teaching lessons render through existing content APIs, with Vietnamese prose and no Han characters or raw Markdown.
- [x] Meaning, differing authors, conditions, source pages, and unresolved readings survive conversion; no existing commentary is deleted.
- [x] Independent review checks changed assertions against supplied passages, including images where transcription matters.
- [x] Corpus, regression tests, full verification, payload measurements, and the three affected library routes pass online and with the origin stopped.

## Sources

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md), [model](../docs/design-docs/knowledge-model.md), [language](../docs/product-specs/vietnamese-language.md), [licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Inspect lessons, current consumers and source passages; run focused baseline checks.
2. Adapt teaching units and references using existing entries and supplementary sections; add focused preservation checks.
3. Independently review final content, correct supported findings, verify delivery and browser use, and record evidence.

## Handoff

- Blockers: none.
- Delivery: 116 teaching entries added; all old entries, notes, special passages, metadata and IDs compare equal to HEAD after removing additions. No other hexagram changed.
- Review: three independent reviewers accepted the final corrected JSON and inspected its library/result consumers. PDF pages: Càn NHL 62–63, 131–136; NTT 80–128; PBC 30–57. Khôn NHL 137–141; NTT 129–154; PBC 35, 58–72. Đại Quá NHL 221–223; NTT 472–482; PBC 286–293. Shared introductory claims independently checked against NHL 59–61. Images inspected: NTT 123, 128, 144; PBC 61; NHL 140. No remaining findings; no later prose edits.
- Checks: `./init.sh` passes after the HTML fix: 181 core and 147 knowledge tests; 381 ready records. Built and served HTML contains both capability declarations. Existing hook-dependency and Vite chunk-size warnings remain outside scope.
- Delivery measurements: pilot JSON grows by 115,153 raw / 26,813 gzip bytes; all knowledge is 4,035,438 / 921,752 bytes. Detailed prose remains record-split and absent from startup assets.
- Browser: desktop library views, citations, retained commentary, Khôn line/special anchors and Càn's legacy author anchor checked. All three pages reload/navigate with the origin unavailable; Càn also inspected at 400px width. Đại Quá's safety condition remains visible.
- Limits: no physical iOS test, result-inspector interaction or update-prompt click. Final Chrome Console confirmation was blocked by window-focus input restrictions; served HTML was verified instead.
- Next: user reviews the pilot presentation before authorizing the remaining 61 lessons.
