import { describe, expect, it } from 'vitest';
import hexagram53 from '../data/hexagrams/hexagram-53.json';
import hexagram54 from '../data/hexagrams/hexagram-54.json';
import hexagram55 from '../data/hexagrams/hexagram-55.json';
import hexagram56 from '../data/hexagrams/hexagram-56.json';
import advanced from '../data/liuyao/hidden-spirit-release-restraint-and-combination-context.json';
import classicalCitations from '../data/citations/batch-fourteen-hexagrams.json';
import advancedCitations from '../data/citations/batch-fourteen-advanced.json';
import earlierCitations from '../data/citations/batch-six-advanced.json';
import creditsCitations from '../data/citations/batch-thirteen-advanced.json';
import manifest from '../data/manifest.json';
import legacy from '../data/legacy/catalog.json';
import { getBookRecord, listHexagrams } from '../src/index';
import type { BookClaim } from '../src/book-schema';

const records = [hexagram53, hexagram54, hexagram55, hexagram56] as const;
const citations = [
  ...classicalCitations.citations,
  ...advancedCitations.citations,
  ...earlierCitations.citations,
  ...creditsCitations.citations,
];
const claims = [
  ...records.flatMap(record => [...record.claims, ...record.lines.flatMap(line => line.claims)]),
  ...advanced.claims,
] as readonly BookClaim[];

function claim(id: string) {
  const result = claims.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch fourteen claim ${id}`);
  return result;
}

function citation(id: string) {
  const result = citations.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch fourteen citation ${id}`);
  return result;
}

function sentence(number: number, layer: 'verse' | 'commentary') {
  return claim(`${advanced.id}-ch06-${number}-${layer}`);
}

describe('feat-047 integrated quẻ 53-56 and BPCT 33-40', () => {
  it.each(records)(
    'releases $id with its stable structure and six attributed positions',
    record => {
      expect(manifest.recordFiles).toContain(`hexagrams/${record.id}.json`);
      expect(manifest.releaseIds).toContain(record.id);
      expect(getBookRecord(record.id)?.review.method).toBe('source-comparison');
      expect(listHexagrams().find(item => item.id === record.id)?.kingWenNumber).toBe(
        record.structure.kingWenNumber,
      );
      expect(legacy.catalog.entities.some(item => item.id === record.id)).toBe(false);
      expect(record.lines.map(line => line.position)).toEqual([1, 2, 3, 4, 5, 6]);
      for (const line of record.lines) {
        for (const author of ['nhl', 'pbc', 'trinh-di', 'chu-hy']) {
          const item = claim(`${record.id}-line-${line.position}-${author}`);
          expect(line.claims.map(item => item.id)).toContain(item.id);
          expect(item.attribution?.author).toBeTruthy();
        }
        for (const book of ['nhl', 'pbc', 'ntt']) {
          expect(
            citation(
              `citation-${book}-q${record.structure.kingWenNumber}-line-${line.position}-classical-text`,
            ),
          ).toMatchObject({ textLayer: 'original-text', editionId: `edition-${book}-supplied` });
        }
      }
    },
  );

  it('preserves independently source-reviewed bottom-to-top polarity patterns', () => {
    const expected = [
      ['yin', 'yin', 'yang', 'yin', 'yang', 'yang'],
      ['yang', 'yang', 'yin', 'yang', 'yin', 'yin'],
      ['yang', 'yin', 'yang', 'yang', 'yin', 'yin'],
      ['yin', 'yin', 'yang', 'yang', 'yin', 'yang'],
    ];
    records.forEach((record, index) => {
      expect(record.structure.lines).toEqual(expected[index]);
      expect(record.lines.map(line => line.polarity)).toEqual(expected[index]);
    });
  });

  it('registers both collections and preserves every authored claim in the public release', () => {
    for (const file of ['hexagrams', 'advanced']) {
      expect(manifest.citationFiles).toContain(`citations/batch-fourteen-${file}.json`);
    }
    expect(manifest.recordFiles).toContain(
      'liuyao/hidden-spirit-release-restraint-and-combination-context.json',
    );
    expect(classicalCitations.citations).toHaveLength(272);
    expect(advancedCitations.citations).toHaveLength(18);
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

  it('retains all 24 numbered NTT notes and attributes the quoted Tiệm note separately', () => {
    for (const [number, count, page] of [
      [53, 5, 813],
      [54, 4, 825],
      [55, 7, 839],
      [56, 8, 851],
    ] as const) {
      for (let note = 1; note <= count; note++) {
        const item = claim(`hexagram-${number}-note-${note}-ntt`);
        expect(item.attribution?.author).toBe(
          number === 53 && note === 3 ? 'Ngô Lâm Xuyên' : 'Ngô Tất Tố',
        );
        const notePage = number === 55 && note <= 5 ? 838 : page;
        expect(citation(item.citationIds[0]!)).toMatchObject({
          textLayer: 'translator-note',
          location: { pdfPageStart: notePage, pdfPageEnd: notePage },
        });
      }
    }
    expect(claim('hexagram-53-note-3-ntt').attribution?.via).toMatch(/Ngô Tất Tố/);
    expect(claim('hexagram-53-note-5-ntt').text).toMatch(/lặp lại/);
    expect(claim('hexagram-56-note-8-ntt').text).toMatch(/ghép phần còn lại/);
    expect(claim('hexagram-56-note-8-ntt').text).toMatch(/không đổi hai quái chính/);
  });

  it('keeps additional authors, variants and bounded source discrepancies distinct', () => {
    for (const [id, author] of [
      ['hexagram-54-line-2-khau-kien-an', 'Khâu Kiến An'],
      ['hexagram-54-line-3-chu-han-thuong', 'Chu Hán Thượng'],
      ['hexagram-56-line-4-quoted-chu-hy', 'Chu Hy'],
      ['hexagram-56-line-4-tu-tien-trai', 'Từ Tiến Trai'],
      ['hexagram-56-line-4-ho-song-phuong', 'Hồ Song Phương'],
    ]) {
      const item = claim(id!);
      expect(item.attribution).toMatchObject({ author, via: 'Ngô Tất Tố — dịch và chú giải' });
      expect(citation(item.citationIds[0]!).textLayer).toBe('supplement');
    }
    expect(claim('hexagram-53-line-6-trinh-di').text).toMatch(/gương mẫu/);
    expect(claim('hexagram-53-line-6-chu-hy').text).toMatch(/trang sức cờ/);
    expect(claim('hexagram-54-line-3-trinh-di').text).toMatch(/Tu là đợi/);
    expect(claim('hexagram-54-line-3-chu-hy').text).toMatch(/con gái hèn/);
    expect(claim('hexagram-55-line-3-nhl').text).toMatch(/giữ khác biệt vị chỉ/i);
    expect(claim('hexagram-55-line-5-chu-hy').text).toMatch(/không đổi thành mềm tối/);
    expect(claim('hexagram-55-line-6-nhl').text).toMatch(/chọn cách Phan Bội Châu/);
    expect(hexagram56.discrepancies.map(item => item.id)).toContain(
      'discrepancy-q56-same-yin-response',
    );
    expect(
      records.every(record => record.discrepancies.every(item => item.citationIds.length > 0)),
    ).toBe(true);
  });

  it('separates each numbered verse/commentary and the split sentence-34 verse', () => {
    for (let number = 33; number <= 40; number++) {
      const verse = sentence(number, 'verse');
      expect(verse.attribution?.author).toMatch(/Lưu Bá Ôn/);
      expect(verse.conditions?.join(' ')).toMatch(/không xác minh tác giả lịch sử/);
      expect(verse.citationIds).toEqual([
        `citation-bpct-ch6-${number}-verse`,
        'citation-bpct-front-phu-credits',
      ]);
      expect(sentence(number, 'commentary').attribution?.author).toBe('Vương Hồng Tự');
      for (const layer of ['verse', 'commentary'] as const) {
        const start =
          number === 33 || (number === 34 && layer === 'verse') ? 87 : number <= 37 ? 88 : 89;
        const end = number === 34 && layer === 'verse' ? 88 : start;
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

  it('binds notes 7 and 8 to sentences 36 and 39, not to their footer neighbors', () => {
    for (const [number, note, page] of [
      [36, 7, 88],
      [39, 8, 89],
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
    ).toEqual(['citation-bpct-ch6-36-note-7', 'citation-bpct-ch6-39-note-8']);
    expect(claim(`${advanced.id}-ch06-39-note-8`).conditions?.join(' ')).toMatch(
      /xem cho mình và Thế vượng/,
    );
    const dissent = claim(`${advanced.id}-translator-punishment-disagreement`);
    expect(dissent.citationIds).toEqual(['citation-bpct-part2-punishment-critical-note']);
    expect(citation(dissent.citationIds[0]!).location.pdfPageStart).toBe(403);
    expect(advancedCitations.citations.some(item => item.id === dissent.citationIds[0])).toBe(
      false,
    );
  });

  it('preserves scope conditions rather than adding a classifier, forecast or certification', () => {
    expect(sentence(33, 'commentary').text).toMatch(/Không ở đây thuộc Dụng/);
    expect(sentence(35, 'commentary').text).toMatch(/Tuần không của Phi/);
    expect(sentence(36, 'commentary').conditions?.join(' ')).toMatch(/Không sửa Tính dẫn/);
    expect(sentence(37, 'commentary').text).toMatch(/không tự hòa giải với câu 29/);
    expect(sentence(39, 'commentary').conditions?.join(' ')).toMatch(
      /không đổi định nghĩa Nguyệt quái thân/,
    );
    expect(sentence(40, 'commentary').conditions?.join(' ')).toMatch(/không đánh giá đạo đức/);
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
      const recordClaims = [
        ...record.claims,
        ...('lines' in record ? record.lines.flatMap(line => line.claims) : []),
      ];
      for (const item of recordClaims) {
        for (const id of item.citationIds) expect(record.review.evidenceCitationIds).toContain(id);
      }
    }
  });
});
