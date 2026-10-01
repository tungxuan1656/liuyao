import { describe, expect, it } from 'vitest';
import {
  getBookRecord,
  listBookRecords,
  getBookCitation,
  listBookCitations,
  listBookSources,
  getBookSource,
  getHexagram,
  searchKnowledge,
} from '../src/index';

describe('released book knowledge API', () => {
  it('exposes reviewed releases with stable IDs and attribution', () => {
    expect(listBookRecords()).toHaveLength(77);
    expect(listBookSources()).toHaveLength(4);
    expect(getBookSource('source-book-bpct')).toBe(listBookSources()[0]);
    for (const record of listBookRecords()) {
      expect(record.review.status).toBe('reviewed');
      const claims = [
        ...record.claims,
        ...(record.type === 'hexagram'
          ? [
              ...record.lines.flatMap(line => line.claims),
              ...record.specialPassages.flatMap(passage => passage.claims),
            ]
          : []),
      ];
      for (const claim of claims) {
        for (const id of claim.citationIds)
          expect(getBookCitation(id), `${record.id}: ${id}`).toBeDefined();
        if (claim.kind === 'author-interpretation') expect(claim.attribution?.author).toBeTruthy();
      }
    }
    const qian = getBookRecord('hexagram-01');
    if (qian?.type !== 'hexagram') throw new Error('Missing pilot hexagram');
    expect(qian.lines.map(line => line.position)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(qian.specialPassages[0]?.title).toBe('Dụng cửu');
    expect(getBookRecord('hexagram-03')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-08')).toBeUndefined();
    expect(getHexagram('hexagram-08')).toBeDefined();
    expect(getHexagram('hexagram-01')?.explanation).toContain('Nguyễn Hiến Lê');
    expect(searchKnowledge('Bát Thuần Càn').some(hit => hit.record.id === 'hexagram-01')).toBe(
      true,
    );
  });

  it('deep-freezes records, line claims, tables, sources, and citation locations', () => {
    const qian = getBookRecord('hexagram-01');
    if (qian?.type !== 'hexagram') throw new Error('Missing pilot hexagram');
    const citation = listBookCitations()[0]!;
    expect(getBookCitation(citation.id)).toBe(citation);
    expect(Object.isFrozen(listBookRecords())).toBe(true);
    expect(Object.isFrozen(qian.lines[0]?.claims[0]?.citationIds)).toBe(true);
    expect(Object.isFrozen(citation.location)).toBe(true);
    expect(Object.isFrozen(listBookSources()[0]?.editions[0]?.rights)).toBe(true);
    expect(Object.isFrozen(getBookRecord('rule-na-jia-assignment')?.tables?.[0]?.rows)).toBe(true);
    expect(() => Object.assign(qian.lines[0]!, { position: 99 })).toThrow();
    expect(() => Object.assign(citation.location, { pdfPageStart: 0 })).toThrow();
    expect(getBookRecord('missing')).toBeUndefined();
    expect(getBookCitation('missing')).toBeUndefined();
  });
});
