# task-rewrite-khon-truan-mong-prose - Rewrite Khôn, Truân and Mông prose

- Status: active
- Owner: Codex
- Required to start: none
- Required to integrate/release: independent source review and verification below

## Scope

Extend PR #159 with connected Vietnamese explanations for `hexagram-02.json`, `hexagram-03.json` and `hexagram-04.json`, following the approved [Càn rewrite](task-rewrite-can-prose-and-composition.md). Explain how the image, position and situation lead to the advice. Keep substantive author differences rather than concatenate summaries. Preserve references, attribution, conditions, IDs, order, examples and six-line structure. Do not change Càn, other hexagrams, UI, schema, calculations or dependencies.

## Acceptance

- [x] Overviews, six hào and study sections read as connected explanations, not an editorial inventory.
- [x] Source meanings, disagreements and uncertainties survive in original paraphrases.
- [x] An independent reviewer checks changed assertions and their direct uses against the supplied books.
- [ ] Structural invariants and relevant checks pass; changes are pushed to the existing PR #159.

## Sources

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md), [licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Inspect records and cited passages; establish a baseline.
2. Rewrite each record, then independently review its changed meanings and direct uses; repair supported findings.
3. Verify preservation and repository checks, update evidence, commit and push to PR #159.

## Handoff

- Baseline: clean `docs/rewrite-can-prose` at `a8c1f11`; knowledge tests pass, 17 files and 268 tests.
- Ownership: one author at a time owns only its assigned hexagram; reviewers are read-only. Codex owns task/index and delivery.
- Khôn: 42 text-only changes; independent review covers all changed assertions and direct uses against NTT PDF 129–154, NHL 59–61 and 137–141, PBC 35 and 58–72. Images: PBC 61, NTT 144, NHL 140–141. Four findings were repaired and rechecked: sovereign rank versus vertical position, Chu Hy's Lục Tam reading, NHL's Văn Ngôn wording, and examples outside an entry's references. Final reviewed working-tree revision has no remaining findings.
- Truân: 33 text-only changes; independent review covers all changed assertions and direct uses against NTT PDF 155–168, NHL 59–61 and 142–145, PBC 35 and 73–81. Images: NTT 156 and 166, NHL 144. Restored Trình Di's conditional reading and Ngũ as the marriage partner in both teaching uses; final recheck has no remaining findings. Inherited Thượng attribution errors are also repaired. Page numbers count from each PDF cover.
- Mông: 34 text-only changes; independent review covers all changed assertions and direct uses against NTT PDF 169–183, NHL 59–61 and 146–149, PBC 35 and 82–90. Images: NTT 170, 174–175, 179 and 181; PBC 85 and 88–89. Corrected the Sơ–Tứ chính ứng error, narrowed teaching assertions to their unchanged references, and removed extract-processing residue. The corrected NHL Nhị summary and unresolved kim phu disagreement remain intact; final recheck has no remaining findings. NTT 183 end-commentary cross-references remain uninspected; no unsupported interpretation was added.
- Verification: recursive preservation checks confirm 42/33/34 changed text values and no other record-data changes. Active JSON diagnostics report no errors. `./init.sh` passes after the source repairs: formatting, task freshness, lint, type checks, production build, package/deployment/knowledge-delivery checks and all 449 tests (181 core, 268 knowledge). The initial format check only flagged local agent scratch reports; formatting those reports resolved it. No browser or novice-reader trial was run; the other 60 hexagrams remain unchanged across this PR.
- Blockers: none.
- Next: commit and push the verified three-record rewrite to PR #159, then close this task after confirming delivery.
