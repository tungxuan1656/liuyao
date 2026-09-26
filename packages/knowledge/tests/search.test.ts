import { describe, expect, it } from 'vitest';
import { normalizeKnowledgeQuery, searchKnowledge } from '../src/search';

describe('local knowledge search', () => {
  it('normalizes Unicode accents, case, punctuation, and spacing', () => {
    expect(normalizeKnowledgeQuery('  LÚC—Hào!! ')).toBe('luc hao');
    expect(normalizeKnowledgeQuery('Yin\u0301   Yang')).toBe('yin yang');
    expect(normalizeKnowledgeQuery('乾・坤')).toBe('乾 坤');
  });

  it('matches names, aliases, Han characters, terms, and rules in stable order', () => {
    expect(searchKnowledge('qIaN').map(match => [match.kind, match.record.id])).toEqual([
      ['entity', 'trigram-heaven'],
      ['entity', 'hexagram-01'],
      ['entity', 'hexagram-15'],
    ]);
    expect(searchKnowledge('乾').map(match => match.record.id)).toContain('trigram-heaven');
    expect(searchKnowledge('yin line').map(match => match.record.id)).toContain('term-yin');
    expect(searchKnowledge('line ordering').map(match => match.record.id)).toContain(
      'rule-line-position-order',
    );
  });

  it('returns immutable deterministic results and handles empty or missing queries', () => {
    expect(searchKnowledge('   ')).toEqual([]);
    expect(searchKnowledge('no-record-matches-this')).toEqual([]);
    const results = searchKnowledge('Qian');
    expect(Object.isFrozen(results)).toBe(true);
    expect(Object.isFrozen(results[0])).toBe(true);
    expect(Object.isFrozen(results[0]?.record)).toBe(true);
    expect(() => (results as unknown as unknown[]).pop()).toThrow();
    expect(searchKnowledge('Qian').map(match => match.record.id)).toEqual(
      results.map(match => match.record.id),
    );
  });
});
