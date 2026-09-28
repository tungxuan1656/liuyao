import { describe, expect, it } from 'vitest';
import { normalizeKnowledgeQuery, searchKnowledge } from '../src/search';

describe('local knowledge search', () => {
  it('normalizes Unicode accents, case, punctuation, and spacing', () => {
    expect(normalizeKnowledgeQuery('  LÚC—Hào!! ')).toBe('luc hao');
    expect(normalizeKnowledgeQuery('Yin\u0301   Yang')).toBe('yin yang');
    expect(normalizeKnowledgeQuery('CÀN・KHÔN')).toBe('can khon');
    expect(normalizeKnowledgeQuery('Đoài')).toBe('doai');
  });

  it('matches Vietnamese names, aliases, terms, and rules in stable order', () => {
    expect(searchKnowledge('Càn').map(match => match.record.id)).toContain('trigram-heaven');
    expect(searchKnowledge('Càn').map(match => match.record.id)).not.toContain('hexagram-52');
    expect(searchKnowledge('Cấn').map(match => match.record.id)).toContain('hexagram-52');
    expect(searchKnowledge('thuần càn').map(match => match.record.id)).toEqual(['hexagram-01']);
    expect(searchKnowledge('thuần càn').map(match => match.record.id)).not.toContain('hexagram-52');
    expect(searchKnowledge('thuần cấn').map(match => match.record.id)).toEqual(['hexagram-52']);
    expect(searchKnowledge('Đoài').map(match => match.record.id)).toContain('trigram-lake');
    expect(searchKnowledge('doai').map(match => match.record.id)).toContain('trigram-lake');
    expect(searchKnowledge('thuan can').map(match => match.record.id)).toEqual([
      'hexagram-01',
      'hexagram-52',
    ]);
    expect(searchKnowledge('hào âm').map(match => match.record.id)).toContain('term-yin');
    expect(searchKnowledge('thứ tự các hào').map(match => match.record.id)).toContain(
      'rule-line-position-order',
    );
    for (const id of ['hexagram-01', 'trigram-heaven', 'term-na-jia', 'rule-na-jia-assignment']) {
      expect(
        searchKnowledge(id).map(match => match.record.id),
        id,
      ).toContain(id);
    }
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
