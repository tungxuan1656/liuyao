import { describe, expect, it } from 'vitest';
import hexagram57 from '../data/hexagrams/hexagram-57.json';
import hexagram58 from '../data/hexagrams/hexagram-58.json';
import hexagram59 from '../data/hexagrams/hexagram-59.json';
import hexagram60 from '../data/hexagrams/hexagram-60.json';
import advanced from '../data/liuyao/useful-spirit-avoidance-rescue-and-transformation-context.json';
import classicalCitations from '../data/citations/batch-fifteen-hexagrams.json';
import advancedCitations from '../data/citations/batch-fifteen-advanced.json';
import earlierCitations from '../data/citations/batch-six-advanced.json';
import creditsCitations from '../data/citations/batch-thirteen-advanced.json';
import manifest from '../data/manifest.json';
import legacy from '../data/legacy/catalog.json';
import { getBookRecord, listHexagrams } from '../src/index';
import type { BookClaim } from '../src/book-schema';

const records = [hexagram57, hexagram58, hexagram59, hexagram60] as const;
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
  if (!result) throw new Error(`Missing batch fifteen claim ${id}`);
  return result;
}

function citation(id: string) {
  const result = citations.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch fifteen citation ${id}`);
  return result;
}

function sentence(number: number, layer: 'verse' | 'commentary') {
  return claim(`${advanced.id}-ch06-${number}-${layer}`);
}

describe('feat-048 integrated quẻ 57-60 and BPCT 41-48', () => {
  it.each(records)(
    'releases $id with its stable structure and six attributed positions',
    record => {
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
          if (record.id === 'hexagram-60' && line.position === 6 && author === 'chu-hy') {
            expect(line.claims.some(item => item.id.endsWith('-chu-hy'))).toBe(false);
            continue;
          }
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
      ['yin', 'yang', 'yang', 'yin', 'yang', 'yang'],
      ['yang', 'yang', 'yin', 'yang', 'yang', 'yin'],
      ['yin', 'yang', 'yin', 'yin', 'yang', 'yang'],
      ['yang', 'yang', 'yin', 'yin', 'yang', 'yin'],
    ];
    records.forEach((record, index) => {
      expect(record.structure.lines).toEqual(expected[index]);
      expect(record.lines.map(line => line.polarity)).toEqual(expected[index]);
    });
  });

  it('registers both collections and preserves every authored claim in the public release', () => {
    for (const file of ['hexagrams', 'advanced']) {
      expect(manifest.citationFiles).toContain(`citations/batch-fifteen-${file}.json`);
    }
    expect(manifest.recordFiles).toContain(
      'liuyao/useful-spirit-avoidance-rescue-and-transformation-context.json',
    );
    expect(classicalCitations.citations).toHaveLength(252);
    expect(advancedCitations.citations).toHaveLength(17);
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

  it('retains all 12 numbered NTT notes and actual commentary absences', () => {
    for (const [number, count, page] of [
      [57, 6, 863],
      [59, 5, 884],
      [60, 1, 894],
    ] as const) {
      for (let note = 1; note <= count; note++) {
        const item = claim(`hexagram-${number}-note-${note}-ntt`);
        expect(item.attribution?.author).toBe('Ngô Tất Tố');
        const notePage = number === 57 && note <= 3 ? 862 : page;
        expect(citation(item.citationIds[0]!)).toMatchObject({
          textLayer: 'translator-note',
          location: { pdfPageStart: notePage, pdfPageEnd: notePage },
        });
      }
    }
    expect(hexagram58.claims.some(item => item.id.includes('-note-'))).toBe(false);
    for (const record of [hexagram59, hexagram60]) {
      for (const layer of ['thoan', 'dai-tuong']) {
        expect(
          record.claims.some(item => item.id === `${record.id}-overview-${layer}-chu-hy`),
        ).toBe(false);
      }
    }
    expect(records.flatMap(record => record.discrepancies)).toHaveLength(5);
    expect(
      records.every(record =>
        record.discrepancies.every(
          item => item.status === 'resolved' && item.citationIds.length > 0,
        ),
      ),
    ).toBe(true);
  });

  it('keeps each BPCT verse/commentary and full split-page boundaries separate', () => {
    const bounds = [
      [41, 89, 89, 89, 90],
      [42, 90, 90, 90, 90],
      [43, 90, 90, 90, 90],
      [44, 90, 90, 90, 90],
      [45, 90, 91, 91, 91],
      [46, 91, 91, 91, 91],
      [47, 91, 91, 91, 91],
      [48, 91, 92, 92, 92],
    ] as const;
    for (const [number, verseStart, verseEnd, commentaryStart, commentaryEnd] of bounds) {
      expect(sentence(number, 'verse').attribution?.author).toMatch(/Lưu Bá Ôn/);
      expect(sentence(number, 'verse').conditions?.join(' ')).toMatch(
        /không xác minh tác giả lịch sử/,
      );
      expect(sentence(number, 'verse').citationIds).toEqual([
        `citation-bpct-ch6-${number}-verse`,
        'citation-bpct-front-phu-credits',
      ]);
      expect(sentence(number, 'commentary').attribution?.author).toBe('Vương Hồng Tự');
      for (const [layer, start, end] of [
        ['verse', verseStart, verseEnd],
        ['commentary', commentaryStart, commentaryEnd],
      ] as const) {
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
    expect(advanced.claims).toHaveLength(18);
    expect(citation('citation-bpct-front-phu-credits').location.pdfPageStart).toBe(1);
  });

  it('attaches only note 9 to sentence 45, and reuses separate translator dissent', () => {
    const note = claim(`${advanced.id}-ch06-45-note-9`);
    expect(note.attribution?.author).toBe('Vĩnh Cao');
    expect(citation(note.citationIds[0]!)).toMatchObject({
      textLayer: 'translator-note',
      location: { pdfPageStart: 91, pdfPageEnd: 91 },
    });
    expect(
      advancedCitations.citations
        .filter(item => item.textLayer === 'translator-note')
        .map(item => item.id),
    ).toEqual(['citation-bpct-ch6-45-note-9']);
    const dissent = claim(`${advanced.id}-translator-punishment-disagreement`);
    expect(dissent.citationIds).toEqual(['citation-bpct-part2-punishment-critical-note']);
    expect(citation(dissent.citationIds[0]!).location.pdfPageStart).toBe(403);
    expect(advancedCitations.citations.some(item => item.id === dissent.citationIds[0])).toBe(
      false,
    );
  });

  it('preserves bounded conditions and evidence without new runtime rules or certification', () => {
    expect(sentence(41, 'commentary').conditions?.join(' ')).toMatch(
      /không suy Không hoặc Phục là miễn khắc/,
    );
    expect(sentence(42, 'commentary').conditions?.join(' ')).toMatch(/suy mọi Hỏa là Nguyên thần/);
    expect(sentence(44, 'commentary').conditions?.join(' ')).toMatch(
      /Không suy ra động xóa mọi Tuần không/,
    );
    expect(sentence(47, 'commentary').conditions?.join(' ')).toMatch(/quyền kiểm soát bạn đời/);
    expect(sentence(48, 'commentary').conditions?.join(' ')).toMatch(
      /không tự đồng nhất với Thế hoặc Nguyệt quái thân/,
    );
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
    expect(manifest.nextBatch.hexagramIds).toEqual([]);
    expect(manifest.nextBatch.note).toMatch(/feat-053/);
  });
});
