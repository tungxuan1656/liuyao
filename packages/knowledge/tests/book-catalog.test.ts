import { describe, expect, it } from 'vitest';
import {
  getBookRecord,
  listBookRecords,
  getBookCitation,
  listBookCitations,
  listBookSources,
  getBookSource,
  getHexagram,
  listHexagrams,
  searchKnowledge,
  getBookSnapshotIdentity,
  resolveBookNavigation,
  upcastBookRecordV1,
} from '../src/index';
import type { BookRecordV1 } from '../src/index';

describe('released book knowledge API', () => {
  it('exports the pure V1 upcast through the package entry point', () => {
    const input = {
      schemaVersion: 1,
      id: 'article-public-upcast',
      type: 'article',
      title: 'Synthetic public API fixture',
      aliases: [],
      topicIds: ['topic-fixture'],
      claims: [],
      relatedIds: [],
      review: { status: 'draft' },
      rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
    } as const satisfies BookRecordV1;
    const result = upcastBookRecordV1(input);

    expect(result).toEqual({ ...input, schemaVersion: 2 });
    expect(result).not.toBe(input);
    expect(result.claims).not.toBe(input.claims);
    expect(input.schemaVersion).toBe(1);
  });

  it('exposes an immutable snapshot identity and does not leak unavailable navigation targets', () => {
    const identity = getBookSnapshotIdentity();
    expect(identity).toMatch(/^liuyao-knowledge-snapshot-v1:sha256:[a-f0-9]{64}$/);
    expect(() => {
      (identity as unknown as { value: string }).value = 'changed';
    }).toThrow();
    expect(resolveBookNavigation('draft-record-secret')).toEqual({ availability: 'unavailable' });
    const known = listBookRecords()[0]!;
    expect(resolveBookNavigation(known.id)).toEqual({ availability: 'available', record: known });
  });

  it('exposes reviewed releases with stable IDs and attribution', () => {
    expect(listBookRecords()).toHaveLength(224);
    expect(listHexagrams()).toHaveLength(64);
    expect(listBookSources()).toHaveLength(4);
    expect(getBookSource('source-book-bpct')).toBe(listBookSources()[0]);
    for (const record of listBookRecords()) {
      expect(record.review.status).toBe('reviewed');
      const claims = [
        ...record.claims.map(claim => ({
          id: claim.id,
          citationIds: claim.citationIds as readonly string[],
          kind: claim.kind,
          attribution: claim.attribution,
        })),
        ...(record.type === 'hexagram'
          ? [
              ...record.lines.flatMap(line =>
                line.claims.map(claim => ({
                  id: claim.id,
                  citationIds: claim.citationIds as readonly string[],
                  kind: claim.kind,
                  attribution: claim.attribution,
                })),
              ),
              ...record.specialPassages.flatMap(passage =>
                passage.claims.map(claim => ({
                  id: claim.id,
                  citationIds: claim.citationIds as readonly string[],
                  kind: claim.kind,
                  attribution: claim.attribution,
                })),
              ),
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
    expect(getBookRecord('hexagram-08')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-13')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-17')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-21')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-25')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-29')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-33')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-37')?.review.status).toBe('reviewed');
    expect(getBookRecord('hexagram-41')?.review.status).toBe('reviewed');
    expect(getBookRecord('article-shi-ying-interaction-context')?.review.status).toBe('reviewed');
    expect(getHexagram('hexagram-41')).toBeDefined();
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
