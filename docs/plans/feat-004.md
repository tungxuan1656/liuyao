# Liu Yao Board Implementation Plan

> **Execution:** Follow repository implementation and verification rules. Checked steps reflect observed evidence. The isolation plan revision `b42d121cf1be3afa6e4726ec6b9e538220ad56cb` received fresh plan approval; PR #14 at its corrected head still requires fresh approval.

**Goal:** Produce fixture-backed Eight Palace, Shi/Ying, Na Jia, element, and Six Relative facts for every primary hexagram.

**Architecture:** Keep lookup tables and pure composition in `@liuyao/core`. Reuse F02's validated calculation and F01's `ReadingResult` and stable IDs; add a separate `calculateReading(input: unknown): ReadingResult` boundary without breaking `calculateHexagram`. Lines remain ordered bottom-to-top, and board attributes describe the primary hexagram, not the changed hexagram.

**Tech Stack:** TypeScript, Vitest, pnpm (`@liuyao/core`).

## Global Constraints

- Ruleset `liuyao-standard-v1`; positions 1–6 are bottom-to-top. `6` and `9` change.
- F03-T01–T10 and evidence in `docs/product-specs/v1-task-map.md` are canonical.
- No UI, persistence, network, calendar, Six Spirits, interpretation, or explanatory prose in core results.
- Keep F02 `calculateHexagram` behavior and existing F01 public contracts compatible.
- Public lookup outputs must not expose writable shared table records; nested Na Jia assignment fields and palace classification fields are readonly, and runtime mutation of one result must not alter later lookup or board output.

---

## Sources and convention decisions

- Eight Palace oracle: the received [Jing Shi Yi Zhuan (京氏易傳)](https://ctext.org/jingshi-yizhuan/zhs), whose eight named palace sequences list the membership of all 64 hexagrams. Cross-check the numerical 8 × 8 grouping in [UAYA Foundation, Eight Palaces](https://uaya.org/zh/learn/iching/advanced-studies/wen-wang-gua/hexagram-skeleton/eight-palaces/) where available; use [Bu Shi Zheng Zong (卜筮正宗), 安世應訣](https://www.quanxue.cn/qt_mingxiang/boshi/boshi07.html) for pure, generational, wandering, and returning Shi positions. The F02 Stanford fixture supplies independent King Wen numbers for the classical hexagram names.
- Na Jia oracle: [Bu Shi Zheng Zong, 裝卦納甲表](https://www.quanxue.cn/qt_mingxiang/boshi/boshi07.html), the explicit traditional inner/outer stem-branch table, cross-checked against [Qinding Xieji Bianfang Shu, 納甲](https://www.shidianguji.com/book/SK1619/chapter/1l9llosnxdd0i) and [Zhang Jiming, Jing Fang Na Jia study](https://www.zhangjiming.cn/12949.html), section beginning `乾金甲子外壬午`. These sources document the received operational convention, not proof that every later line assignment originated in the earliest text.
- Hexagram number/polarity oracle stays `tests/hexagram-fixtures.ts`, sourced independently from the [Stanford Encyclopedia of Philosophy Yijing appendices 1 and 3](https://plato.stanford.edu/entries/chinese-change/appendix.html).
- Choose palace from the primary hexagram's 64-entry table, not changed-hexagram identity. Palace elements: heaven/lake metal, fire fire, thunder/wind wood, water water, mountain/earth earth.
- Palace sequence Shi positions are `[6,1,2,3,4,5,4,3]`; Ying is opposite by three positions (wrap at six). Pure-hexagram Shi is sixth and Ying third. These are positional markers only; no divinatory interpretation.
- Na Jia associates inner positions 1–3 and outer positions 4–6 with their respective trigram, including distinct heaven `jia/ren` and earth `yi/gui` stem pairs. The primary line's branch supplies its element; palace element supplies the reference for five relations: equal sibling, palace generates line child, palace controls line wealth, line controls palace official-ghost, line generates palace parent.
- **Decision log:** 2026-09-26: Use explicit source-backed 64 palace fixtures rather than derive expected tests from runtime classification; use explicit trigram-side tables rather than derive branch order from arithmetic. Preserve F01's `ReadingResult` as the full board contract and add a separate public calculation function. Jing's historical palace listing order differs from common chart order, but the public result has only a stable `PalaceId`, no palace sequence number: reorder complete palace rows without changing any `(HexagramId, PalaceId, Shi, Ying)` fixture. Retain the existing `PALACE_IDS` order solely for stable IDs, not divinatory meaning. "Six Relatives" uses the five F01 relation labels, not a sixth added category. Do not attribute the later complete operational table solely to the early received Jing text.
- **Decision log:** 2026-09-26 PR #14 review: Explicit lookup tables remain private; public lookup results must be isolated from private mutable records and typed readonly at every nested level. Verify resistance to caller mutation rather than relying on TypeScript readonly alone, which does not protect runtime values.

## File structure and staged work

### Task 1: Palace classification and markers (F03-T01–T03)

**Files:** Create `packages/liuyao-core/src/palaces.ts`, `packages/liuyao-core/tests/palace-fixtures.ts`, `packages/liuyao-core/tests/palaces.test.ts`.

**Interfaces:** `identifyPalace(hexagramId: HexagramId): PalaceClassification`, where `PalaceClassification` has `readonly palaceId: PalaceId`, `readonly palaceElement: FiveElement`, `readonly shiPosition: ResultLinePosition`, and `readonly yingPosition: ResultLinePosition`.

- [x] Transcribe all 64 independent expected `(hexagram ID, palace ID, Shi, Ying)` tuples from Jing's eight palace rows, independently resolve named hexagrams to King Wen IDs with the F02 Stanford fixture, annotate both fixture sources and verify exactly eight entries per palace and every stable ID once.
- [x] Implement pure palace lookup and element mapping; verify all 64 fixtures, eight elements, and wraparound markers with `pnpm --filter @liuyao/core test`. Historical red-phase output was not retained.
- [x] Return readonly palace classification fields without exposing mutable shared map values; mutate a returned helper result through a runtime cast, then verify both later `identifyPalace` and `calculateReading` facts remain correct.

### Task 2: Na Jia and branch elements (F03-T04–T07)

**Files:** Create `packages/liuyao-core/src/na-jia.ts`, `packages/liuyao-core/tests/na-jia.test.ts`.

**Interfaces:** `assignNaJia(trigram: TrigramId, side: 'inner' | 'outer'): readonly [NaJiaAssignment, NaJiaAssignment, NaJiaAssignment]`, where `NaJiaAssignment` has `readonly stem: HeavenlyStem` and `readonly branch: EarthlyBranch`; `branchElement(branch: EarthlyBranch): FiveElement`.

- [x] Add independent 8 × 2 × 3 stem/branch fixture cases from the cited Na Jia verse/table; assert both sides of every trigram, especially heaven `jia/ren` and earth `yi/gui`, and all 12 branch-to-element cases.
- [x] Implement explicit, complete side-specific tables and element map; run focused tests and package typecheck. Historical red-phase output was not retained.
- [x] Return readonly inner/outer assignment tuples with readonly nested stem/branch fields without exposing mutable shared table values; mutate a returned helper result through a runtime cast, then verify later `assignNaJia` and `calculateReading` facts remain correct.

### Task 3: Six Relatives and full board (F03-T08–T10)

**Files:** Create `packages/liuyao-core/src/board.ts`, `packages/liuyao-core/tests/board.test.ts`; modify `packages/liuyao-core/src/index.ts`. Update `packages/liuyao-core/src/contracts.ts:157` only if its pre-implementation statement that board fields "are calculated by F03" remains misleading after F03 completion; keep the distinct F02-only type.

**Interfaces:** `sixRelative(palaceElement: FiveElement, lineElement: FiveElement): SixRelative`; `calculateReading(input: unknown): ReadingResult`. Reuse `calculateHexagram` and `validateReadingInput` for unchanged validation semantics; build exactly six `PrimaryLineResult` values by position with polarity, moving flag, Na Jia stem/branch, branch element, Six Relative, and optional Shi/Ying markers.

- [x] Test all 25 palace/line-element combinations against five generation/control relations; add independently expected board snapshots for pure heaven, pure earth, mixed inner/outer trigrams, moving input, no changes, and invalid input.
- [x] Compose the six facts without reversing input or mutating it; preserve existing F02 API and return only typed IDs/enums/numbers/booleans, never explanatory prose. Historical red-phase output was not retained.
- [x] Run package tests and typecheck; audit public exports, six ordered results, 64 classifications, all five relations, and the absence of new dependency edges.

### Task 4: Documentation, verification, and handoff

**Files:** Modify `docs/product-specs/product-scope.md`, `ARCHITECTURE.md`, `features/feat-004.md`, `feature_index.json`, `progress.md`, and this plan. Do not change other features.

- [x] Update Observed now to describe merged F02 and completed F03 accurately, and architecture runtime summary to reflect the board calculation.
- [x] Inspect working tree; run `./init.sh` and record output evidence and limitations. Read-only checks are a final optional follow-up if the tree is safe and stable.
- [x] Check F03-T01–T10 and acceptance only after evidence passes; mark feature done, append one material progress block, and record one concrete next action.
- [ ] Commit/push changes, open PR, and send Orca `merge_ready` with exact PR URL, head, tests, and limitations; await fresh review approval before settling task.

## Verification evidence

- Observed: 64 palace+Shi/Ying classifications; 16 side-specific Na Jia trigram assignments (48 line entries); 12 branch-element mappings; all five relatives across 25 element pairs; board snapshots and public API validation are covered by the F03 fixtures/tests. See the canonical task map at `docs/product-specs/v1-task-map.md` for task evidence requirements.
- Observed: Parent-run `./init.sh` passed: 125 core tests in 12 files and 2 knowledge tests; format, lint, TypeScript length check, typecheck, and build passed. Lint emitted one pre-existing, non-failing web `react-refresh` warning. This documentation update did not rerun validation.
- Observed after PR #14 isolation fix: `./init.sh` passed format, lint, TypeScript length check, typecheck, build, 127 core tests in 12 files, and 2 knowledge tests. The two new regressions mutate helper output and assert later helper and `calculateReading` results remain unchanged. The existing non-failing web `react-refresh` warning persists.
- Handoff: Fresh PR #14 review found a mutable lookup-result leak at head `a7a7e54`; it is locally corrected and verified, but the updated PR head needs fresh review. See `features/feat-004.md` for the next action.

## Open issues

- None affecting the stable output tuples; palace-listing order is non-behavioral because no order is exposed. Escalate any source conflict that changes assignments before adopting a disputed convention.
