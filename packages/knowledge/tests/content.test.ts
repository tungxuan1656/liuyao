import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { REFERENCES } from '../data/references';
import { RULES } from '../data/rules';
import { SOURCES } from '../data/sources';
import { TERMS } from '../data/terms';

// Every displayed field in packages/liuyao-core/src/contracts.ts is mapped to
// a stable explanatory rule; keep this exhaustive when that contract changes.
const RESULT_RULES = {
  ruleset: 'rule-reading-result-fields',
  lines: 'rule-line-position-order',
  primaryHexagramId: 'rule-trigram-composition',
  changedHexagramId: 'rule-moving-line-change',
  lowerTrigramId: 'rule-trigram-composition',
  upperTrigramId: 'rule-trigram-composition',
  palaceId: 'rule-palace-and-markers',
  palaceElement: 'rule-palace-and-markers',
  shiPosition: 'rule-palace-and-markers',
  yingPosition: 'rule-palace-and-markers',
} as const;
const LINE_RULES = {
  position: 'rule-line-position-order',
  inputValue: 'rule-line-polarity-values',
  polarity: 'rule-line-polarity-values',
  changing: 'rule-moving-line-change',
  naJiaStem: 'rule-na-jia-assignment',
  naJiaBranch: 'rule-na-jia-assignment',
  element: 'rule-branch-element',
  relative: 'rule-six-relative-classification',
  shiYing: 'rule-palace-and-markers',
} as const;

function contractFields(interfaceName: string): string[] {
  const contracts = readFileSync(
    new URL('../../liuyao-core/src/contracts.ts', import.meta.url),
    'utf8',
  );
  const body = contracts.match(new RegExp(`export interface ${interfaceName} \\{([^}]+)\\}`))?.[1];
  if (!body) throw new Error(`Missing ${interfaceName} in core contracts`);
  return [...body.matchAll(/^\s*(\w+)\??:/gm)].map(match => match[1]!);
}

describe('curated V1 content', () => {
  const termIds = new Set(TERMS.map(({ id }) => id));
  const ruleIds = new Set(RULES.map(({ id }) => id));
  const sourceIds = new Set(SOURCES.map(({ id }) => id));

  it('maps every ReadingResult and line fact to an existing stable explanatory rule', () => {
    expect(Object.keys(RESULT_RULES).sort()).toEqual(contractFields('ReadingResult').sort());
    expect(Object.keys(LINE_RULES).sort()).toEqual(contractFields('PrimaryLineResult').sort());
    for (const [field, ruleId] of Object.entries({ ...RESULT_RULES, ...LINE_RULES })) {
      expect(ruleIds, `${field}: ${ruleId}`).toContain(ruleId);
    }
  });

  it('covers ReadingResult and PrimaryLineResult facts with terms and explanatory rules', () => {
    const requiredTerms = [
      'term-ruleset',
      'term-primary-hexagram',
      'term-changed-hexagram',
      'term-lower-trigram',
      'term-upper-trigram',
      'term-palace',
      'term-palace-element',
      'term-shi-line',
      'term-ying-line',
      'term-line-position',
      'term-line-value',
      'term-polarity',
      'term-moving-line',
      'term-na-jia',
      'term-heavenly-stem',
      'term-earthly-branch',
      'term-five-elements',
      'term-six-relative',
    ];
    for (const id of requiredTerms) expect(termIds, `missing ${id}`).toContain(id);

    const requiredRules = [
      'rule-reading-result-fields',
      'rule-line-position-order',
      'rule-line-polarity-values',
      'rule-moving-line-change',
      'rule-trigram-composition',
      'rule-palace-and-markers',
      'rule-na-jia-assignment',
      'rule-branch-element',
      'rule-five-element-cycles',
      'rule-six-relative-classification',
    ];
    for (const id of requiredRules) expect(ruleIds, `missing ${id}`).toContain(id);
    expect(RULES.every(rule => rule.ruleset === 'liuyao-standard-v1')).toBe(true);
    for (const rule of RULES) {
      expect(rule.explanation.length, rule.id).toBeGreaterThan(0);
    }
  });

  it('covers every V1 stem, branch, element, and Six Relative label', () => {
    for (const stem of ['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui']) {
      expect(termIds, `missing stem ${stem}`).toContain(`term-stem-${stem}`);
    }
    for (const branch of [
      'zi',
      'chou',
      'yin',
      'mao',
      'chen',
      'si',
      'wu',
      'wei',
      'shen',
      'you',
      'xu',
      'hai',
    ]) {
      expect(termIds, `missing branch ${branch}`).toContain(`term-branch-${branch}`);
    }
    for (const element of ['wood', 'fire', 'earth', 'metal', 'water']) {
      expect(termIds, `missing element ${element}`).toContain(`term-element-${element}`);
    }
    for (const relative of ['sibling', 'child', 'wealth', 'official-ghost', 'parent']) {
      expect(termIds, `missing relative ${relative}`).toContain(`term-relative-${relative}`);
    }
    const parent = TERMS.find(({ id }) => id === 'term-relative-parent');
    expect(parent?.definition).toBe(
      'Six Relative assigned when the line element generates the palace element.',
    );
  });

  it('links source metadata only to existing content records', () => {
    expect(SOURCES.map(({ id }) => id)).toEqual(['source-zhouyi', 'source-jingshi-yizhuan']);
    for (const source of SOURCES) {
      expect(source.provenance).toMatch(/https:\/\//);
      expect(source.publication.length).toBeGreaterThan(0);
      expect(source.rights.length).toBeGreaterThan(0);
    }
    expect(SOURCES.find(({ id }) => id === 'source-jingshi-yizhuan')?.provenance).toContain(
      'https://ctext.org/jingshi-yizhuan/zh',
    );
    for (const reference of REFERENCES) {
      expect(sourceIds, reference.id).toContain(reference.sourceId);
      expect(reference.targetIds.length, reference.id).toBeGreaterThan(0);
      for (const id of reference.targetIds) {
        expect(
          RULES.some(rule => String(rule.id) === id) || TERMS.some(term => String(term.id) === id),
          `${reference.id} targets ${id}`,
        ).toBe(true);
      }
    }
    expect(REFERENCES).toEqual([
      {
        id: 'reference-zhouyi-trigram-associations',
        sourceId: 'source-zhouyi',
        targetIds: ['term-trigram'],
        location:
          'Shuo Gua (說卦傳), discussion of the eight trigrams and their associated qualities.',
      },
    ]);
    expect(
      REFERENCES.every(
        ({ location }) =>
          location === undefined ||
          location ===
            'Shuo Gua (說卦傳), discussion of the eight trigrams and their associated qualities.',
      ),
    ).toBe(true);
  });
});
