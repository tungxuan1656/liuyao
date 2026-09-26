import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { FACTS } from '../data/facts';
import { HEXAGRAMS } from '../data/hexagrams';
import { REFERENCES } from '../data/references';
import { RULES } from '../data/rules';
import { SOURCES } from '../data/sources';
import { TERMS } from '../data/terms';
import { TRIGRAMS } from '../data/trigrams';
import { getRule, getRulesForFact } from '../src/catalog';

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

  it('maps every ReadingResult and line field through the production fact registry', () => {
    const resultFields = FACTS.filter(({ id }) => id.startsWith('result.')).map(({ id }) =>
      id.slice('result.'.length),
    );
    const lineFields = FACTS.filter(({ id }) => id.startsWith('line.')).map(({ id }) =>
      id.slice('line.'.length),
    );

    expect(resultFields.sort()).toEqual(contractFields('ReadingResult').sort());
    expect(lineFields.sort()).toEqual(contractFields('PrimaryLineResult').sort());
    expect(new Set(FACTS.map(({ id }) => id)).size).toBe(FACTS.length);

    for (const fact of FACTS) {
      const rules = getRulesForFact(fact.id);
      expect(
        rules.map(({ id }) => id),
        fact.id,
      ).toEqual(fact.ruleIds);
      expect(Object.isFrozen(rules), fact.id).toBe(true);
      for (const rule of rules) {
        expect(ruleIds, `${fact.id}: ${rule.id}`).toContain(rule.id);
        expect(rule).toBe(getRule(rule.id));
      }
    }
    for (const rule of RULES) {
      expect(
        FACTS.some(fact => fact.ruleIds.some(ruleId => ruleId === rule.id)),
        rule.id,
      ).toBe(true);
    }
    expect(getRulesForFact('line.relative').map(({ id }) => id)).toEqual([
      'rule-five-element-cycles',
      'rule-six-relative-classification',
    ]);
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

  it('explains every entity and assigns each rule a supported category and source', () => {
    const entities = [...TRIGRAMS, ...HEXAGRAMS];
    const categories = new Set(['metadata', 'structure', 'transformation', 'classification']);
    const referencedRuleIds = new Set(
      REFERENCES.flatMap(({ targetIds }) => targetIds.filter(id => String(id).startsWith('rule-'))),
    );

    expect(entities).toHaveLength(72);
    for (const entity of entities) expect(entity.explanation.trim(), entity.id).not.toBe('');
    for (const rule of RULES) {
      expect(categories, rule.id).toContain(rule.category);
      expect(referencedRuleIds, rule.id).toContain(rule.id);
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
    expect(SOURCES.map(({ id }) => id)).toEqual([
      'source-zhouyi',
      'source-jingshi-yizhuan',
      'source-zengshan-buyi',
      'source-liuyao-v1-contract',
    ]);
    for (const source of SOURCES) {
      expect(source.provenance.length).toBeGreaterThan(0);
      expect(source.publication.length).toBeGreaterThan(0);
      expect(source.rights.length).toBeGreaterThan(0);
    }
    expect(SOURCES.find(({ id }) => id === 'source-jingshi-yizhuan')?.provenance).toContain(
      'https://ctext.org/jingshi-yizhuan/zh',
    );
    expect(SOURCES.find(({ id }) => id === 'source-zengshan-buyi')?.provenance).toContain(
      'https://zh.wikisource.org/zh-hans/%E5%A2%9E%E5%88%AA%E5%8D%9C%E6%98%93',
    );
    expect(SOURCES.find(({ id }) => id === 'source-zengshan-buyi')?.author).toBe(
      'Yehe Laoren (野鶴老人), as catalogued by Chinese Text Project; later transmission/editing is associated with Li Wenhui (李文輝).',
    );
    expect(SOURCES.find(({ id }) => id === 'source-zengshan-buyi')?.provenance).toContain(
      'https://ctext.org/wiki.pl?if=en&res=497805',
    );
    expect(SOURCES.find(({ id }) => id === 'source-liuyao-v1-contract')?.provenance).toContain(
      'packages/liuyao-core/src/contracts.ts',
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
    expect(REFERENCES.map(({ id }) => id)).toEqual([
      'reference-zhouyi-trigram-associations',
      'reference-contract-reading-result',
      'reference-zengshan-palace-markers',
      'reference-zengshan-na-jia',
      'reference-zengshan-moving-change',
      'reference-zengshan-five-elements',
      'reference-zengshan-six-relatives',
    ]);
    expect(REFERENCES.find(({ id }) => id === 'reference-zhouyi-trigram-associations')).toEqual({
      id: 'reference-zhouyi-trigram-associations',
      sourceId: 'source-zhouyi',
      targetIds: ['term-trigram'],
      location:
        'Shuo Gua（說卦傳），discussion of the eight trigrams and their associated qualities。',
    });
    expect(REFERENCES.every(({ location }) => location && location.trim().length > 0)).toBe(true);
  });
});
