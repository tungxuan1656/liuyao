import { describe, expect, it } from 'vitest';
import { normalizeKnowledgeQuery, searchKnowledge } from '../src/search';

describe('local knowledge search', () => {
  it('normalizes Unicode accents, case, punctuation, and spacing', () => {
    expect(normalizeKnowledgeQuery('  LÚC—Hào!! ')).toBe('luc hao');
    expect(normalizeKnowledgeQuery('Yin\u0301   Yang')).toBe('yin yang');
    expect(normalizeKnowledgeQuery('CÀN・KHÔN')).toBe('can khon');
  });

  it('matches Vietnamese names, aliases, terms, and rules in stable order', () => {
    expect(searchKnowledge('thuần càn').map(match => [match.kind, match.record.id])).toEqual([
      ['entity', 'hexagram-01'],
      ['entity', 'hexagram-52'],
    ]);
    expect(searchKnowledge('thuan can').map(match => match.record.id)).toEqual([
      'hexagram-01',
      'hexagram-52',
    ]);
    expect(searchKnowledge('hào âm').map(match => match.record.id)).toContain('term-yin');
    expect(searchKnowledge('thứ tự các hào').map(match => match.record.id)).toContain(
      'rule-line-position-order',
    );
    expect(searchKnowledge('乾')).toEqual([]);
    for (const nonVietnameseAlias of ['Qian', 'Heaven', 'Yin line', 'Na Jia', 'Wu Xing']) {
      expect(searchKnowledge(nonVietnameseAlias), nonVietnameseAlias).toEqual([]);
    }
  });

  it('returns immutable deterministic results and handles empty or missing queries', () => {
    expect(searchKnowledge('   ')).toEqual([]);
    expect(searchKnowledge('no-record-matches-this')).toEqual([]);
    const results = searchKnowledge('Thuần Càn');
    expect(Object.isFrozen(results)).toBe(true);
    expect(Object.isFrozen(results[0])).toBe(true);
    expect(Object.isFrozen(results[0]?.record)).toBe(true);
    expect(() => (results as unknown as unknown[]).pop()).toThrow();
    expect(searchKnowledge('Thuần Càn').map(match => match.record.id)).toEqual(
      results.map(match => match.record.id),
    );
  });
});
