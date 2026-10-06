import { describe, expect, it } from 'vitest';
import hexagram49 from '../data/hexagrams/hexagram-49.json';
import hexagram50 from '../data/hexagrams/hexagram-50.json';
import hexagram51 from '../data/hexagrams/hexagram-51.json';
import hexagram52 from '../data/hexagrams/hexagram-52.json';
import advanced from '../data/liuyao/hidden-movement-store-strength-and-branch-context.json';
import classicalCitations from '../data/citations/batch-thirteen-hexagrams.json';
import advancedCitations from '../data/citations/batch-thirteen-advanced.json';
import earlierCitations from '../data/citations/batch-six-advanced.json';
import manifest from '../data/manifest.json';
import legacy from '../data/legacy/catalog.json';
import { getBookRecord, listHexagrams } from '../src/index';
import type { BookClaim } from '../src/book-schema';

const records = [hexagram49, hexagram50, hexagram51, hexagram52] as const;
const citations = [
  ...classicalCitations.citations,
  ...advancedCitations.citations,
  ...earlierCitations.citations,
];
const claims = [
  ...records.flatMap(record => [...record.claims, ...record.lines.flatMap(line => line.claims)]),
  ...advanced.claims,
] as readonly BookClaim[];

function claim(id: string) {
  const result = claims.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch thirteen claim ${id}`);
  return result;
}

function citation(id: string) {
  const result = citations.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch thirteen citation ${id}`);
  return result;
}

function sentence(number: number, layer: 'verse' | 'commentary') {
  return claim(`${advanced.id}-ch06-${number}-${layer}`);
}

describe('feat-046 integrated quẻ 49-52 and BPCT 25-32', () => {
  it.each(records)('releases $id under its stable ID with all six attributed positions', record => {
    expect(manifest.recordFiles).toContain(`hexagrams/${record.id}.json`);
    expect(manifest.releaseIds).toContain(record.id);
    expect(getBookRecord(record.id)?.review.method).toBe('source-comparison');
    expect(listHexagrams().find(item => item.id === record.id)?.kingWenNumber).toBe(
      record.structure.kingWenNumber,
    );
    expect(legacy.catalog.entities.some((item: { id: string }) => item.id === record.id)).toBe(
      false,
    );
    expect(record.lines.map(line => line.position)).toEqual([1, 2, 3, 4, 5, 6]);
    for (const line of record.lines) {
      for (const author of ['nhl', 'pbc', 'trinh-di', 'chu-hy']) {
        const item = claim(`${record.id}-line-${line.position}-${author}`);
        expect(line.claims.map(item => item.id)).toContain(item.id);
        expect(item.attribution?.author).toBeTruthy();
      }
      for (const book of ['nhl', 'pbc', 'ntt']) {
        const source = citation(
          `citation-${book}-q${record.structure.kingWenNumber}-line-${line.position}-classical-text`,
        );
        expect(source.textLayer).toBe('original-text');
        expect(source.editionId).toBe(`edition-${book}-supplied`);
      }
    }
  });

  it('preserves source-derived bottom-to-top patterns independently of the authored structure', () => {
    const expected = [
      ['yang', 'yin', 'yang', 'yang', 'yang', 'yin'],
      ['yin', 'yang', 'yang', 'yang', 'yin', 'yang'],
      ['yang', 'yin', 'yin', 'yang', 'yin', 'yin'],
      ['yin', 'yin', 'yang', 'yin', 'yin', 'yang'],
    ];
    records.forEach((record, index) => {
      expect(record.structure.lines).toEqual(expected[index]);
      expect(record.lines.map(line => line.polarity)).toEqual(expected[index]);
    });
    expect(
      hexagram52.discrepancies.find(item => item.id === 'discrepancy-q52-pbc-number'),
    ).toMatchObject({
      status: 'resolved',
      citationIds: expect.arrayContaining(['citation-pbc-q52-contents-number']),
    });
    expect(citation('citation-pbc-q52-contents-number').location).toMatchObject({
      pdfPageStart: 5,
      pdfPageEnd: 5,
    });
  });

  it('keeps named alternatives, PBC reported attribution and all 14 NTT notes distinct', () => {
    expect(claim('hexagram-49-line-6-trinh-truyen').attribution).toMatchObject({
      author: 'Trình Truyện',
      via: 'Phan Bội Châu — thuật và dịch Trình Truyện',
    });
    expect(claim('hexagram-50-line-1-trinh-di').text).toMatch(/tử là chủ/);
    expect(claim('hexagram-50-line-1-chu-hy').text).toMatch(/được con/);
    expect(claim('hexagram-51-line-2-chu-hy').text).toMatch(/chưa rõ.*chưa giải rõ/);
    expect(claim('hexagram-52-line-4-trinh-di').text).toMatch(/chưa đủ xứng trách nhiệm/);
    expect(claim('hexagram-52-line-4-chu-hy').text).toMatch(/không có lời phê/);
    for (const [number, count, page] of [
      [49, 1, 765],
      [50, 4, 777],
      [51, 3, 789],
      [52, 6, 800],
    ] as const) {
      for (let note = 1; note <= count; note++) {
        const item = claim(`hexagram-${number}-note-${note}-ntt`);
        expect(item.attribution?.author).toBe('Ngô Tất Tố');
        expect(citation(item.citationIds[0]!)).toMatchObject({
          textLayer: 'translator-note',
          location: { pdfPageStart: number === 52 && note === 6 ? 801 : page },
        });
      }
    }
  });

  it('registers both citation collections and retains every new claim in the public release', () => {
    for (const file of ['hexagrams', 'advanced']) {
      expect(manifest.citationFiles).toContain(`citations/batch-thirteen-${file}.json`);
    }
    expect(manifest.recordFiles).toContain(
      'liuyao/hidden-movement-store-strength-and-branch-context.json',
    );
    for (const record of [...records, advanced]) {
      expect(manifest.releaseIds).toContain(record.id);
      const released = getBookRecord(record.id);
      expect(released?.claims.map(item => item.id)).toEqual(record.claims.map(item => item.id));
      if (released?.type === 'hexagram') {
        expect(released.lines.map(line => line.claims.map(item => item.id))).toEqual(
          records
            .find(item => item.id === released.id)
            ?.lines.map(line => line.claims.map(item => item.id)),
        );
      }
    }
  });

  it('separates all eight verse/commentary layers and includes the sentence-30 continuation', () => {
    for (let number = 25; number <= 32; number++) {
      const verse = sentence(number, 'verse');
      expect(verse.attribution?.author).toMatch(/Lưu Bá Ôn/);
      expect(verse.conditions?.join(' ')).toMatch(/không xác minh tác giả lịch sử/);
      expect(verse.citationIds).toEqual([
        `citation-bpct-ch6-${number}-verse`,
        'citation-bpct-front-phu-credits',
      ]);
      expect(sentence(number, 'commentary').attribution?.author).toBe('Vương Hồng Tự');
      expect(sentence(number, 'commentary').citationIds).toEqual([
        `citation-bpct-ch6-${number}-commentary`,
      ]);
      for (const layer of ['verse', 'commentary'] as const) {
        const start = number <= 27 ? 85 : number <= 30 ? 86 : 87;
        const end = number === 30 && layer === 'commentary' ? 87 : start;
        expect(citation(`citation-bpct-ch6-${number}-${layer}`)).toMatchObject({
          textLayer: layer === 'verse' ? 'original-text' : 'author-commentary',
          location: {
            pdfPageStart: start,
            pdfPageEnd: end,
            printedPageStart: String(start - 14),
            printedPageEnd: String(end - 14),
          },
        });
      }
    }
    expect(citation('citation-bpct-front-phu-credits').location.pdfPageStart).toBe(1);
    expect(advanced.claims).toHaveLength(19);
  });

  it('keeps attached notes with sentences 26 and 30, and reuses rather than duplicates the dissent', () => {
    for (const [number, note, page] of [
      [26, 5, 85],
      [30, 6, 86],
    ] as const) {
      const item = claim(`${advanced.id}-ch06-${number}-note-${note}`);
      expect(item.attribution?.author).toBe('Vĩnh Cao');
      expect(citation(item.citationIds[0]!)).toMatchObject({
        textLayer: 'translator-note',
        location: { pdfPageStart: page, pdfPageEnd: page },
      });
    }
    expect(
      advancedCitations.citations
        .filter(item => item.textLayer === 'translator-note')
        .map(item => item.id),
    ).toEqual(['citation-bpct-ch6-26-note-5', 'citation-bpct-ch6-30-note-6']);
    const dissent = claim(`${advanced.id}-translator-punishment-disagreement`);
    expect(dissent.citationIds).toEqual(['citation-bpct-part2-punishment-critical-note']);
    expect(citation(dissent.citationIds[0]!).location.pdfPageStart).toBe(403);
    expect(advancedCitations.citations.some(item => item.id === dissent.citationIds[0])).toBe(
      false,
    );
  });

  it('retains conditions and original summaries without upgrading source comparison to certification', () => {
    expect(sentence(26, 'commentary').text).toMatch(/không khắc hào khác.*không chịu khắc/);
    expect(sentence(28, 'commentary').text).toMatch(/hướng vào hào đang hại Dụng/);
    expect(sentence(29, 'commentary').conditions?.join(' ')).toMatch(/không sửa nguồn/);
    expect(sentence(30, 'commentary').conditions?.join(' ')).toMatch(
      /không khẳng định Nhật thần của lịch tự biến/,
    );
    expect(sentence(32, 'commentary').conditions?.join(' ')).toMatch(/mâu thuẫn với câu 29/);
    for (const item of claims) {
      expect(item.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(item.citationIds.length).toBeGreaterThan(0);
      for (const id of item.citationIds) expect(citation(id)).toBeDefined();
    }
    for (const record of [...records, advanced]) {
      expect(record.review.status).toBe('reviewed');
      expect(record.review.method).toBe('source-comparison');
      expect(record.review.note).toMatch(/not independent|No.*independent/);
      expect(record.rights.basis).toBe('original-summary-and-structured-facts');
    }
  });
});
