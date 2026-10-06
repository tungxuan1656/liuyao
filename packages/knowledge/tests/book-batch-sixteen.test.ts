import { describe, expect, it } from 'vitest';
import hexagram61 from '../data/hexagrams/hexagram-61.json';
import hexagram62 from '../data/hexagrams/hexagram-62.json';
import hexagram63 from '../data/hexagrams/hexagram-63.json';
import hexagram64 from '../data/hexagrams/hexagram-64.json';
import advanced from '../data/liuyao/adverse-support-store-intervening-lines-and-release-context.json';
import classicalCitations from '../data/citations/batch-sixteen-hexagrams.json';
import advancedCitations from '../data/citations/batch-sixteen-advanced.json';
import dissentCitations from '../data/citations/batch-six-advanced.json';
import creditsCitations from '../data/citations/batch-thirteen-advanced.json';
import manifest from '../data/manifest.json';
import legacy from '../data/legacy/catalog.json';
import { getBookRecord, listHexagrams } from '../src/index';
import type { BookClaim } from '../src/book-schema';

const records = [hexagram61, hexagram62, hexagram63, hexagram64] as const;
const citations = [
  ...classicalCitations.citations,
  ...advancedCitations.citations,
  ...dissentCitations.citations,
  ...creditsCitations.citations,
];
const claims = [
  ...records.flatMap(record => [...record.claims, ...record.lines.flatMap(line => line.claims)]),
  ...advanced.claims,
] as readonly BookClaim[];
function claim(id: string) {
  const result = claims.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch sixteen claim ${id}`);
  return result;
}
function citation(id: string) {
  const result = citations.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch sixteen citation ${id}`);
  return result;
}
function sentence(number: number, layer: 'verse' | 'commentary') {
  return claim(`${advanced.id}-ch06-${number}-${layer}`);
}

describe('feat-049 quẻ 61-64 and BPCT 49-56', () => {
  it.each(records)('releases $id with stable identity and all six author layers', record => {
    expect(manifest.recordFiles).toContain(`hexagrams/${record.id}.json`);
    expect(manifest.releaseIds).toContain(record.id);
    expect(legacy.catalog.entities.some((item: { id: string }) => item.id === record.id)).toBe(
      false,
    );
    expect(listHexagrams().find(item => item.id === record.id)?.kingWenNumber).toBe(
      record.structure.kingWenNumber,
    );
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
  });

  it('keeps the visually reviewed figures in bottom-to-top order', () => {
    const patterns = [
      ['yang', 'yang', 'yin', 'yin', 'yang', 'yang'],
      ['yin', 'yin', 'yang', 'yang', 'yin', 'yin'],
      ['yang', 'yin', 'yang', 'yin', 'yang', 'yin'],
      ['yin', 'yang', 'yin', 'yang', 'yin', 'yang'],
    ];
    records.forEach((record, index) => {
      expect(record.structure.lines).toEqual(patterns[index]);
      expect(record.lines.map(line => line.polarity)).toEqual(patterns[index]);
    });
    expect(hexagram61.structure).toMatchObject({
      lowerTrigramId: 'trigram-lake',
      upperTrigramId: 'trigram-wind',
    });
    expect(hexagram62.structure).toMatchObject({
      lowerTrigramId: 'trigram-mountain',
      upperTrigramId: 'trigram-thunder',
    });
    expect(hexagram63.structure).toMatchObject({
      lowerTrigramId: 'trigram-fire',
      upperTrigramId: 'trigram-water',
    });
    expect(hexagram64.structure).toMatchObject({
      lowerTrigramId: 'trigram-water',
      upperTrigramId: 'trigram-fire',
    });
  });

  it('preserves each authored claim, condition, attribution and locator through package APIs', () => {
    for (const file of ['hexagrams', 'advanced']) {
      expect(manifest.citationFiles).toContain(`citations/batch-sixteen-${file}.json`);
    }
    expect(manifest.recordFiles).toContain(
      'liuyao/adverse-support-store-intervening-lines-and-release-context.json',
    );
    expect(classicalCitations.citations).toHaveLength(252);
    expect(advancedCitations.citations).toHaveLength(18);
    for (const record of [...records, advanced]) {
      const released = getBookRecord(record.id);
      expect(released?.claims).toEqual(record.claims);
      if (released?.type === 'hexagram') {
        expect(released.lines).toEqual(records.find(item => item.id === record.id)?.lines);
        expect(released.discrepancies).toEqual(
          records.find(item => item.id === record.id)?.discrepancies,
        );
      }
      expect(record.review.status).toBe('reviewed');
      expect(record.review.method).toBe('source-comparison');
      expect(record.review.note).toMatch(/not independent|No.*independent/);
      expect(record.rights.basis).toBe('original-summary-and-structured-facts');
    }
    for (const item of claims) {
      expect(item.text).not.toMatch(/[\p{Script=Han}]/u);
      for (const id of item.citationIds) expect(citation(id)).toBeDefined();
    }
    for (const record of [...records, advanced]) {
      const contents = [
        ...record.claims,
        ...('lines' in record ? record.lines.flatMap(line => line.claims) : []),
      ];
      for (const item of contents) {
        for (const id of item.citationIds) expect(record.review.evidenceCitationIds).toContain(id);
      }
    }
    expect(manifest.nextBatch.hexagramIds).toEqual([]);
    expect(manifest.nextBatch.note).toMatch(/feat-055/);
  });

  it('retains all eight NTT notes, named supplements and uncredited endnote 21', () => {
    for (const [number, count, page] of [
      [61, 2, 904],
      [62, 3, 916],
      [63, 2, 926],
      [64, 1, 936],
    ]) {
      for (let note = 1; note <= count!; note++) {
        const item = claim(`hexagram-${number}-note-${note}-ntt`);
        expect(item.attribution?.author).toBe('Ngô Tất Tố');
        expect(citation(item.citationIds[0]!)).toMatchObject({
          textLayer: 'translator-note',
          location: { pdfPageStart: page, pdfPageEnd: page },
        });
      }
    }
    expect(claim('hexagram-61-line-3-truong-trung-khe').attribution).toEqual({
      author: 'Trương Trung Khê',
      via: 'Ngô Tất Tố — dịch và chú giải',
    });
    const note = claim('hexagram-61-line-6-edition-note-21');
    expect(note.attribution?.author).toMatch(/người chú chưa xác định/);
    expect(citation(note.citationIds[0]!)).toMatchObject({
      textLayer: 'supplement',
      location: { pdfPageStart: 655, pdfPageEnd: 655 },
    });
    expect(claim('hexagram-63-note-2-ntt').text).toMatch(/Trình Di.*Chu Hy/);
  });

  it('does not manufacture commentary from missing or empty source headings', () => {
    for (const record of records) {
      expect(record.claims.some(item => item.id === `${record.id}-overview-thoan-chu-hy`)).toBe(
        false,
      );
    }
    expect(
      hexagram63.claims.some(item => item.id === 'hexagram-63-overview-dai-tuong-chu-hy'),
    ).toBe(false);
    expect(hexagram62.lines[2]!.claims.some(item => item.id.includes('tien-nho'))).toBe(false);
    expect(hexagram62.review.note).toMatch(/empty Tiên Nho heading/);
    expect(hexagram64.review.note).toMatch(/no separately printed line-two Tiểu Tượng/);
    expect(claim('hexagram-62-line-4-chu-hy').text).toMatch(/chưa rõ/);
    expect(claim('hexagram-64-line-6-trinh-di').text).toMatch(/không cách tế/);
    expect(claim('hexagram-64-line-6-chu-hy').text).toMatch(/có thể làm/);
  });

  it('records bounded, evidence-supported discrepancies without altering source text', () => {
    const discrepancies = records.flatMap(record => record.discrepancies);
    expect(discrepancies).toHaveLength(6);
    for (const item of discrepancies) {
      expect(item.status).toBe('resolved');
      expect(item.resolution).toBeTruthy();
      for (const id of item.citationIds) expect(citation(id)).toBeDefined();
    }
    expect(hexagram64.discrepancies[0]!.description).toMatch(/5 hào/);
    expect(hexagram63.lines[1]!.polarity).toBe('yin');
    expect(hexagram62.lines[2]!.polarity).toBe('yang');
    expect(hexagram61.discrepancies[0]!.resolution).toMatch(/chính ứng/);
    expect(hexagram62.discrepancies[0]!.description).toMatch(/911.*912/);
    expect(hexagram64.discrepancies[1]!.description).toMatch(/đuôi.*đầu/);
  });

  it('separates eight BPCT verses from their commentaries with full passage bounds', () => {
    for (let n = 49; n <= 56; n++) {
      const start = n <= 52 ? 92 : n === 53 ? 93 : 94;
      const end = n === 52 ? 93 : start;
      expect(sentence(n, 'verse').attribution?.author).toMatch(/Lưu Bá Ôn/);
      expect(sentence(n, 'commentary').attribution).toEqual({
        author: 'Vương Hồng Tự',
        via: 'Vĩnh Cao — dịch và chú giải',
      });
      expect(sentence(n, 'verse').citationIds).toEqual([
        `citation-bpct-ch6-${n}-verse`,
        'citation-bpct-front-phu-credits',
      ]);
      for (const layer of ['verse', 'commentary'] as const) {
        const a = layer === 'commentary' ? end : start;
        expect(citation(`citation-bpct-ch6-${n}-${layer}`)).toMatchObject({
          textLayer: layer === 'verse' ? 'original-text' : 'author-commentary',
          location: {
            pdfPageStart: a,
            pdfPageEnd: end,
            printedPageStart: String(a - 14),
            printedPageEnd: String(end - 14),
          },
        });
      }
    }
    expect(advanced.claims).toHaveLength(19);
    expect(
      advancedCitations.citations
        .filter(item => item.textLayer === 'translator-note')
        .map(item => item.id),
    ).toEqual(['citation-bpct-ch6-50-note-10', 'citation-bpct-ch6-53-note-11']);
    for (const [n, note, page] of [
      [50, 10, 92],
      [53, 11, 93],
    ]) {
      const item = claim(`${advanced.id}-ch06-${n}-note-${note}`);
      expect(item.attribution?.author).toBe('Vĩnh Cao');
      expect(citation(item.citationIds[0]!)).toMatchObject({
        location: { pdfPageStart: page, pdfPageEnd: page },
      });
    }
    expect(claim(`${advanced.id}-translator-punishment-disagreement`).citationIds).toEqual([
      'citation-bpct-part2-punishment-critical-note',
    ]);
  });

  it('keeps conditional roles, translator dissent and absent classifier thresholds explicit', () => {
    expect(sentence(49, 'commentary').text).toMatch(/Nguyệt kiến/);
    expect(sentence(50, 'commentary').text).toMatch(/chưa rõ/);
    expect(claim(`${advanced.id}-ch06-50-note-10`).text).toMatch(/Vĩnh Cao.*không rõ.*Thìn/);
    expect(sentence(52, 'commentary').text).toMatch(/Giao.*tương lai.*Trùng.*quá khứ/);
    expect(sentence(53, 'commentary').text).toMatch(/sinh hợp Ứng/);
    expect(sentence(54, 'commentary').conditions?.join(' ')).toMatch(/Không dự báo bệnh/);
    expect(sentence(55, 'commentary').text).toMatch(/khởi.*thực.*ám động.*tán/);
    expect(sentence(55, 'commentary').conditions?.join(' ')).toMatch(/chưa có ngưỡng/);
    expect(sentence(56, 'commentary').text).toMatch(/Nhật thần.*hóa Tuyệt/);
    expect(advanced.review.note).toMatch(/not.*|No copied/);
  });
});
