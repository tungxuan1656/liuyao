# Pre-flow Hardening Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Use the executing-plans workflow for this approved plan. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Correct seven safety and knowledge gaps before feat-007 or feat-008 starts.

**Architecture:** Keep calculations in @liuyao/core and curated explanations in @liuyao/knowledge. Give production facts a data-owned rule registry, keep cross-package checks test-only, and ship built package entrypoints.

**Tech Stack:** TypeScript, Vitest, Vite, Node.js 24, FontTools 4.66.0, Brotli 1.2.0.

## Global Constraints

- Keep the runtime dependency direction in ARCHITECTURE.md; @liuyao/knowledge must not import @liuyao/core at runtime.
- Keep reusable tests in packages/*/tests; do not add application test files.
- Preserve all existing Liu Yao calculation fixtures and outputs.
- Cite only source works and locations that inspection verifies; omit an unknown location.
- Keep knowledge prose original and follow LICENSING.md.
- Generate CJK subsets from the pinned Google Fonts sources and retain their OFL notices.
- Do not start feat-007 or feat-008 until feat-017 is done.

---

## Decisions

- Freeze the exported ID arrays at runtime. Use a private trigram index in hexagrams.ts for calculation.
- Deep-freeze coin tosses, the six-toss array, and normalized input at the casting boundary.
- Add entity explanations and the categories metadata, structure, transformation, and classification.
- Use fact IDs such as result.primaryHexagramId and line.relative. getRulesForFact() returns immutable rule records.
- Cite rule-reading-result-fields to the project contract. Cite domain rules to verified Zhouyi or Zengshan Buyi sections.
- Compare core source inventories and the core King Wen grid from knowledge tests. Do not add a knowledge-to-core runtime edge.
- Use a checked-in CJK coverage manifest. Test that the knowledge catalog is present in the manifest, and verify generated WOFF2 cmap coverage with FontTools.
- Change package exports to the built ESM and declaration files. Run a Node smoke check after the workspace build.
- Build packages before typechecking because package type exports resolve to generated declarations. Run build, typecheck, export smoke check, and tests as ordered verification stages.
- Add .js extensions to production relative imports in the two packages. The current emitted ESM keeps extensionless specifiers, which Node cannot resolve.
- Keep Vite development hot reload on source with a development-only export condition; default Node imports resolve to built ESM.

## Source evidence

- The received Zhouyi source identifies the eight trigram associations in Shuo Gua: [Chinese Text Project, Shuo Gua](https://ctext.org/book-of-changes/shuo-gua).
- Zengshan Buyi lists the Hun Tian Jiazi, Six Relatives, Shi/Ying, moving-change, and Five Element chapters: [Wikisource, Zengshan Buyi](https://zh.wikisource.org/zh-hans/%E5%A2%9E%E5%88%AA%E5%8D%9C%E6%98%93).
- The cited rule references describe source locations. They do not claim that one school defines every later Liu Yao procedure.

## Work stages

### Task 1: Protect core ID inventories

**Files:**

- Modify: packages/liuyao-core/src/contracts.ts
- Modify: packages/liuyao-core/src/hexagrams.ts
- Test: packages/liuyao-core/tests/hexagrams.test.ts

**Interfaces:**

- Consumes: TRIGRAM_IDS, HEXAGRAM_IDS, PALACE_IDS, and identifyHexagram(lower, upper).
- Produces: Runtime-frozen public inventories and a private ID-to-index lookup used by identifyHexagram.

- [x] Add a regression that checks Object.isFrozen(TRIGRAM_IDS), rejects reverse() and splice() through a mutable cast, and still calculates six yang lines as hexagram-01.
- [x] Run pnpm --filter @liuyao/core test -- hexagrams.test.ts. It failed before the fix with hexagram-02 instead of hexagram-01 after reverse().
- [x] Freeze all exported inventory arrays in contracts.ts with Object.freeze([... ] as const).
- [x] Replace both TRIGRAM_IDS.indexOf() calls in identifyHexagram with a private, frozen index record:

```ts
const TRIGRAM_INDEX: Readonly<Record<TrigramId, number>> = Object.freeze({
  'trigram-heaven': 0,
  'trigram-lake': 1,
  'trigram-fire': 2,
  'trigram-thunder': 3,
  'trigram-wind': 4,
  'trigram-water': 5,
  'trigram-mountain': 6,
  'trigram-earth': 7,
});
```

- [x] Run pnpm --filter @liuyao/core test -- hexagrams.test.ts (13 files, 154 tests passed).
- [x] Commit as fix(core): isolate and freeze ID inventories.

### Task 2: Freeze casting snapshots

**Files:**

- Modify: packages/liuyao-core/src/casting.ts
- Test: packages/liuyao-core/tests/casting.test.ts

**Interfaces:**

- Consumes: CastingService.toss() and CastingService.cast().
- Produces: Runtime-frozen CoinTossResult and CastingResult values with unchanged line order.

- [x] Add a cast regression that checks the result, each toss, each coin tuple, the toss array, the input object, and its lines array with Object.isFrozen.
- [x] Add mutation attempts for one coin bit and one input line. Assert that each attempt throws and that toss line values still match the input lines.
- [x] Run pnpm --filter @liuyao/core test -- casting.test.ts. The new freeze assertion failed before the fix because the cast result was mutable.
- [x] Freeze the copied coin tuple before returning from toss().
- [x] Freeze the toss result, the six-toss array, the normalized input lines, the input object, and the outer cast result.
- [x] Run pnpm --filter @liuyao/core test -- casting.test.ts (13 files, 155 tests passed).
- [x] Commit as fix(core): freeze casting result snapshots.

### Task 3: Complete knowledge entity, rule, and source records

**Files:**

- Modify: packages/knowledge/src/schema.ts
- Modify: packages/knowledge/src/validation.ts
- Modify: packages/knowledge/data/trigrams.ts
- Modify: packages/knowledge/data/hexagrams.ts
- Modify: packages/knowledge/data/rules.ts
- Modify: packages/knowledge/data/sources.ts
- Modify: packages/knowledge/data/references.ts
- Modify: packages/knowledge/data/README.md
- Test: packages/knowledge/tests/schema.test.ts
- Test: packages/knowledge/tests/entities.test.ts
- Test: packages/knowledge/tests/content.test.ts

**Interfaces:**

- Consumes: KnowledgeEntity, KnowledgeRule, KnowledgeSource, and SourceReference.
- Produces: Required entity explanations, typed rule categories, and traceable references for every result rule.

- [x] Add a valid-catalog fixture with entity explanations and a rule category.
- [x] Add validator regressions for a missing or empty entity explanation, a missing category, and an unknown category.
- [x] Run pnpm --filter @liuyao/knowledge test -- schema.test.ts. Before the schema change, the valid fixture failed because explanation was rejected as an unexpected field.
- [x] Add explanation to both entity interfaces. Add category to KnowledgeRule, with this type:

```ts
export type KnowledgeRuleCategory = 'metadata' | 'structure' | 'transformation' | 'classification';
```

- [x] Require non-empty explanations and one supported category in validateKnowledgeCatalog.
- [x] Add original trigram explanations. Give every hexagram a concise structural explanation from its upper and lower trigram names.
- [x] Assign each current rule to one category. Keep the existing stable rule IDs.
- [x] Add a project-contract source for result-field and line conventions.
- [x] Add source references for the remaining rules. Use Zhouyi Shuo Gua and Zengshan Buyi chapters 3–7 and 11–12. Do not cite the contributor-added appendix as the book text.
- [x] Keep source descriptions original. Update the data README to distinguish source context from a claim of universal ruleset authority.
- [x] Assert that all 72 entities have non-empty explanations and all ten rules have a supported category.
- [x] Assert that every rule used for production facts has at least one reference to an existing source.
- [x] Run pnpm --filter @liuyao/knowledge test (6 files, 39 tests passed) and pnpm --filter @liuyao/knowledge typecheck.
- [x] Commit as feat(knowledge): add sourced fact explanations.

### Task 4: Add the production fact registry and drift guard

**Files:**

- Modify: packages/knowledge/src/schema.ts
- Create: packages/knowledge/data/facts.ts
- Modify: packages/knowledge/src/catalog.ts
- Modify: packages/knowledge/data/README.md
- Test: packages/knowledge/tests/content.test.ts
- Test: packages/knowledge/tests/core-contracts.test.ts

**Interfaces:**

- Consumes: ReadingResult and PrimaryLineResult field names as the test-only contract.
- Produces: FactDefinition, KnowledgeFactId, and getRulesForFact(factId).

- [x] Move the current result and line mappings from content.test.ts into production FACTS.
- [x] Use these mappings:

| Fact IDs                                                                                     | Rule ID                                                    |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| result.ruleset                                                                               | rule-reading-result-fields                                 |
| result.lines, line.position                                                                  | rule-line-position-order                                   |
| result.primaryHexagramId, result.lowerTrigramId, result.upperTrigramId                       | rule-trigram-composition                                   |
| result.changedHexagramId, line.changing                                                      | rule-moving-line-change                                    |
| line.inputValue, line.polarity                                                               | rule-line-polarity-values                                  |
| result.palaceId, result.palaceElement, result.shiPosition, result.yingPosition, line.shiYing | rule-palace-and-markers                                    |
| line.naJiaStem, line.naJiaBranch                                                             | rule-na-jia-assignment                                     |
| line.element                                                                                 | rule-branch-element                                        |
| line.relative                                                                                | rule-five-element-cycles, rule-six-relative-classification |

- [x] Define each registry record as { id: KnowledgeFactId; ruleIds: readonly KnowledgeRule['id'][] }.
- [x] Export getRulesForFact(factId: KnowledgeFactId): readonly KnowledgeRule[] from catalog.ts. Return the existing immutable catalog rule records.
- [x] Test that getRulesForFact('line.relative') returns both rule-five-element-cycles and rule-six-relative-classification.
- [x] Test every registry fact against field names parsed from the core contracts. Do not keep a second field-to-rule fixture in tests.
- [x] Add a source-reading drift test. Parse TRIGRAM_IDS and HEXAGRAM_IDS from core contracts.ts, then parse HEXAGRAM_BY_UPPER_AND_LOWER from core hexagrams.ts.
- [x] Compare both parsed ID arrays with knowledge data. For all 64 knowledge hexagrams, use the core trigram order to index the parsed grid and compare the King Wen ID.
- [x] Keep this check under packages/knowledge/tests; do not add a runtime core import. Document the test-only drift guard.
- [x] Run pnpm --filter @liuyao/knowledge test (7 files, 40 tests passed) and typecheck.
- [x] Commit as feat(knowledge): expose production fact rules.

### Task 5: Export built packages and verify Node resolution

**Files:**

- Modify: packages/liuyao-core/package.json
- Modify: packages/liuyao-core/src/*.ts relative imports
- Modify: packages/knowledge/package.json
- Modify: packages/knowledge/src/*.ts relative imports
- Modify: packages/knowledge/data/*.ts relative imports
- Modify: apps/web/package.json
- Create: apps/web/scripts/check-package-exports.mjs
- Modify: init.sh

**Interfaces:**

- Consumes: Workspace package builds and the @liuyao/web workspace links.
- Produces: ESM and TypeScript declaration exports from each package's dist directory.

- [x] Add check:package-exports to the web package scripts.
- [x] Make the smoke script import calculateHexagram from @liuyao/core and getRulesForFact from @liuyao/knowledge.
- [x] In the smoke script, assert that six yang lines return hexagram-01 and getRulesForFact('line.relative') returns the Six Relative rule.
- [x] Use Node's built-in assert module and fail with a nonzero process status if either package import or assertion fails.
- [x] Change core exports to types: ./dist/index.d.ts and import/default: ./dist/index.js.
- [x] Change knowledge exports to types: ./dist/src/index.d.ts and import/default: ./dist/src/index.js.
- [x] Preserve Vite source resolution in development while leaving Node's default import condition on dist.
- [x] Add .js extensions to production relative imports so emitted ESM and declarations resolve under Node package rules.
- [x] Split init.sh into ordered build, typecheck, package-export smoke check, and test stages. Ensure the Node check is skipped if pnpm build fails.
- [x] Run pnpm build, pnpm typecheck, and pnpm --dir apps/web run check:package-exports in that order.
- [x] Run bash scripts/check_test_placement.sh (pass).
- [x] Commit as build(tooling): export built workspace packages.

### Task 6: Expand the offline CJK font subset

**Files:**

- Create: apps/web/public/fonts/cjk-coverage.txt
- Create: apps/web/scripts/update-cjk-coverage.mjs
- Create: apps/web/public/fonts/noto-serif-cjk-knowledge.woff2
- Create: apps/web/public/fonts/noto-sans-cjk-knowledge.woff2
- Delete: apps/web/public/fonts/noto-serif-cjk-nine-han.woff2
- Delete: apps/web/public/fonts/noto-sans-cjk-nine-han.woff2
- Modify: apps/web/public/fonts/README.md
- Modify: apps/web/public/fonts/NOTICE.md
- Modify: apps/web/src/index.css
- Modify: apps/web/package.json
- Test: packages/knowledge/tests/entities.test.ts

**Interfaces:**

- Consumes: CJK codepoints in the complete local knowledge catalog.
- Produces: A coverage manifest and two self-hosted WOFF2 fonts that include every manifested codepoint.

- [x] Add a knowledge test that extracts CJK characters from knowledgeCatalog and asserts that each appears in cjk-coverage.txt.
- [x] Run pnpm --filter @liuyao/knowledge test -- entities.test.ts. The new assertion failed with 92 missing codepoints before the manifest was generated.
- [x] Generate the manifest from all entity, term, rule, source, and reference records. Include the CJK punctuation used by the source metadata.
- [x] Add a deterministic update:cjk-coverage script that reads the built knowledge catalog and writes sorted unique codepoints.
- [x] Test CJK Han, CJK punctuation, and full-width characters against cjk-coverage.txt.
- [x] Regenerate both CJK fonts from the pinned Noto SC sources with FontTools 4.66.0 and Brotli 1.2.0. Use --text-file=cjk-coverage.txt:

```sh
cd apps/web/public/fonts
pyftsubset NotoSerifSC.ttf --output-file=noto-serif-cjk-knowledge.woff2 --flavor=woff2 --text-file=cjk-coverage.txt --layout-features='*'
pyftsubset NotoSansSC.ttf --output-file=noto-sans-cjk-knowledge.woff2 --flavor=woff2 --text-file=cjk-coverage.txt --layout-features='*'
```

- [x] Replace the old nine-character assets with the two *-cjk-knowledge.woff2 subsets.
- [x] Remove the nine-character unicode-range from both CJK @font-face rules. Update their URLs in index.css.
- [x] Update the font README and NOTICE with manifest counts, asset names, subset sizes, and regeneration commands.
- [x] Run this cmap check with FontTools 4.66.0 and Brotli 1.2.0:

```python
from pathlib import Path
from fontTools.ttLib import TTFont

root = Path("apps/web/public/fonts")
required = {ord(char) for char in (root / "cjk-coverage.txt").read_text()}
for name in ("noto-serif-cjk-knowledge.woff2", "noto-sans-cjk-knowledge.woff2"):
    cmap = TTFont(root / name).getBestCmap()
    missing = required - set(cmap)
    assert not missing, (name, sorted(missing))
```

- [x] Run pnpm --filter @liuyao/knowledge test -- entities.test.ts (7 files, 41 tests), knowledge typecheck, pnpm --filter @liuyao/web build, test placement check, and the cmap check.
- [x] Commit as fix(web): cover local knowledge CJK text.

### Task 7: Complete feature gates, verification, and PR handoff

**Files:**

- Modify: feature_index.json
- Modify: features/feat-007.md
- Modify: features/feat-008.md
- Modify: features/feat-017.md
- Modify: docs/plans/feat-017.md
- Modify: progress.md

- [ ] Add feat-017 with dependencies on feat-001 through feat-006.
- [ ] Add feat-017 as a dependency of feat-007 and feat-008. Keep both features todo.
- [ ] Run ./init.sh after all implementation and font changes.
- [ ] Review every acceptance criterion in features/feat-017.md against code, tests, source references, font cmap checks, and command output.
- [ ] Record exact verification counts, the existing lint warning, and the PR state in features/feat-017.md.
- [ ] Mark feat-017 done only after every acceptance criterion passes.
- [ ] Append one material result block to progress.md.
- [ ] Commit as docs(feat-017): record hardening evidence.
- [ ] Push feat/017-preflow-hardening and open a PR against main. Stop before merge.

## Verification commands

```sh
pnpm --filter @liuyao/core test
pnpm --filter @liuyao/knowledge test
pnpm build
pnpm --dir apps/web run check:package-exports
./init.sh
```
