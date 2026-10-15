# task-check-knowledge-payload-and-offline-delivery - Check knowledge payload and offline delivery

- Status: done
- Owner: Coding agent (selected by repository maintainer)
- Required to start: [task-check-knowledge-presentation-across-package-and-web-flows](task-check-knowledge-presentation-across-package-and-web-flows.md), [task-offline-hardening](task-offline-hardening.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Keep the actual published knowledge fast to open and usable offline.

## Scope

Production assets, startup loading, record loading, cache completeness, and the existing update flow. No authored-content changes or new caching architecture.

## Acceptance

- [x] Initial JavaScript contains compact lookups and metadata, not full-corpus prose.
- [x] Record JSON assets load by ID and through direct routes.
- [x] Raw/gzip sizes, largest record, and offline assets are measured.
- [x] Local search, record opening, and memory are checked in a representative browser.
- [x] The published library works after offline caching completes.
- [x] Interrupted retrieval and updates preserve cached content and active drafts.
- [x] Relevant checks and `./init.sh` pass.

## Relevant docs

[Delivery](../docs/design-docs/offline-pwa.md#knowledge-delivery),
[model](../docs/design-docs/knowledge-model.md#generated-files), [verification](../docs/development.md).

## Plan

1. Inspect startup imports and caching contracts; establish baseline.
2. Measure production assets and exercise complete caching, interruption recovery, search, records, memory, and draft-safe updates.
3. Repair confirmed defects; run checks and record evidence before opening the PR.

## Handoff

- Blockers: none.
- Verified: baseline `6a1a298`; repairs/checks through `3e4134b`. Baseline and final `./init.sh` passed: 181 core and 141 knowledge tests.
- Repair: replace unresolved Fontsource URLs with existing precached Noto families. CSS shrinks 83,592/14,221 to 78,457/13,249 raw/gzip bytes; final browser requests only valid local fonts.
- Build guard: `pnpm build && pnpm --dir apps/web check:knowledge-delivery` checks all ready assets, 1,010 long authored paragraphs absent from startup, and local precached fonts. Missing-font, missing-record-precache, and injected-prose mutations each fail.
- Review: independent lifecycle inspection and bounded font/build-check review found no actionable defects; browser checks belong to the main agent. Prose guard covers the entry chunk and text over 300 characters, not every possible future lazy import.
- Next: merge the PR after repository review.

### Production payload

Bytes after the font repair; gzip totals sum separate responses, without headers or cache-storage overhead.

| Asset                                                       |       Raw |      Gzip |
| ----------------------------------------------------------- | --------: | --------: |
| Initial JavaScript                                          |   847,660 |   236,802 |
| Metadata (already included in JavaScript)                   |   167,127 |    34,631 |
| Lazy schema validator                                       |   130,243 |    14,234 |
| Largest record: `article-ntt-chu-xi-diagrams`               |   127,302 |    18,006 |
| All 381 record JSON assets                                  | 3,917,897 |   894,760 |
| Complete precache: 395 unique assets (400 manifest entries) | 5,532,573 | 1,712,987 |

### Runtime evidence

Direct computer-use on macOS Chrome 155.0.8059.79, isolated fresh profile and gzip localhost server; temporary diagnostics stay outside the repository.

- Cold `/library`: DOM ready 542 ms, initial JS transfer 85 ms; no record JSON or schema validator requested by the list. JS heap 6,048,474 bytes.
- After installation, origin-disconnected reads validate all 381 IDs/statuses: no missing/unexpected assets, 3,917,897 bytes in 241 ms. Offline largest-record JSON opens in 2 ms, validator in 1 ms; heap 13,377,954 bytes. These are local diagnostics, not production SLAs or leak tests.
- Offline article search `tu net hao` returns and opens lesson 1. Direct largest-record reload retains full prose and figures. Final font build also opens that never-visited article offline at 500px width; wide topic layout and all font requests pass.
- Initial installation interrupted at `hexagram-32.json` retains 154 cache entries, including 148 records, with no active worker. Release the 503 and explicitly retry registration: earlier assets are reused and all 395 entries install. Partial installation alone does not promise offline startup.
- A/B update fixture changes the HTML marker and one record revision. A failed B fetch retains active A and its offline record; retry installs waiting B without reload. Later/cancel preserve question, direct-input method and 2/6 lines. Accepting B in another tab preserves that draft; the old tab opens a previously unread article offline. Final cache returns to 395 entries with only B's changed-record revision.
- Retry was explicit; automatic same-page reconnect retry is not claimed. Origin-disconnected checks do not test the OS offline indicator. No physical mobile, constrained-network, memory-leak, or new installation-prompt checks. The existing large-JS warning remains.
