import { describe, expect, it } from 'vitest';
import hexagram45 from '../data/hexagrams/hexagram-45.json';
import hexagram46 from '../data/hexagrams/hexagram-46.json';
import hexagram47 from '../data/hexagrams/hexagram-47.json';
import hexagram48 from '../data/hexagrams/hexagram-48.json';
import advanced from '../data/liuyao/useful-spirit-rescue-empty-combination-context.json';
import classicalCitations from '../data/citations/batch-twelve-hexagrams.json';
import advancedCitations from '../data/citations/batch-twelve-advanced.json';
import manifest from '../data/manifest.json';
import legacy from '../data/legacy/catalog.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import { getBookRecord, listHexagrams } from '../src/index';
import type { BookClaim } from '../src/book-schema';

const records = [hexagram45, hexagram46, hexagram47, hexagram48] as const;
const citations = [...classicalCitations.citations, ...advancedCitations.citations];
const claims = [
  ...records.flatMap(record => [...record.claims, ...record.lines.flatMap(line => line.claims)]),
  ...advanced.claims,
] as readonly BookClaim[];

function claim(id: string) {
  const result = claims.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch twelve claim ${id}`);
  return result;
}

function citation(id: string) {
  const result = citations.find(item => item.id === id);
  if (!result) throw new Error(`Missing batch twelve citation ${id}`);
  return result;
}

function sentence(number: number) {
  return claim(`${advanced.id}-ch06-${number}`);
}

describe('feat-045 source-compared quẻ 45–48 and BPCT 17–24', () => {
  it.each(records)('publishes $id with stable structure and all six source positions', record => {
    expect(manifest.releaseIds).toContain(record.id);
    expect(getBookRecord(record.id)?.review.method).toBe('source-comparison');
    expect(listHexagrams().find(item => item.id === record.id)?.kingWenNumber).toBe(
      record.structure.kingWenNumber,
    );
    expect(legacy.catalog.entities.some(item => item.id === record.id)).toBe(false);
    expect(record.lines.map(line => line.position)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(record.lines.map(line => line.polarity)).toEqual(record.structure.lines);
    for (const line of record.lines) {
      const prefix = `${record.id}-line-${line.position}`;
      for (const author of ['nhl', 'pbc']) {
        expect(line.claims.some(item => item.id === `${prefix}-${author}`)).toBe(true);
      }
      const uncertain = record.id === 'hexagram-46' && line.position === 2;
      for (const author of ['trinh-di', 'chu-hy']) {
        expect(line.claims.some(item => item.id === `${prefix}-${author}`)).toBe(!uncertain);
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

  it('preserves all printed NTT Thăng line-two headings without invented Trình Di attribution', () => {
    for (const [tag, page] of [
      ['long', 718],
      ['short', 718],
      ['tuong', 719],
    ] as const) {
      const item = claim(`hexagram-46-line-2-chu-hy-printed-${tag}`);
      expect(item.attribution?.author).toBe('Chu Hy');
      expect(item.conditions?.join(' ')).toMatch(/chưa xác định.*không chuyển sang Trình Di/);
      expect(citation(item.citationIds[0]!).location.pdfPageStart).toBe(page);
    }
    expect(claim('hexagram-46-note-2-ntt').text).toMatch(/theo Chu Hy/);
    expect(claim('hexagram-46-note-3-ntt').text).toMatch(/lên tháng.*không tự đổi/);
  });

  it('retains separate Đại Tượng and conditional upper-line readings', () => {
    expect(claim('hexagram-45-overview-dai-tuong-nhl').text).toMatch(/cất khí giới/);
    expect(claim('hexagram-45-overview-dai-tuong-pbc').text).toMatch(/tập hợp và sửa sang/);
    expect(claim('hexagram-45-line-6-trinh-di').text).toMatch(/không thể quy trách/);
    expect(claim('hexagram-45-line-6-chu-hy').text).toMatch(/mới không lỗi/);
    expect(claim('hexagram-47-line-2-trinh-di').text).toMatch(/chưa được ra ân/);
    expect(claim('hexagram-47-line-2-chu-hy').text).toMatch(/no say quá mức/);
    expect(claim('hexagram-47-line-6-khau-kien-an').text).toMatch(/trên hung.*không hợp thành/);
    expect(claim('hexagram-48-line-3-trinh-di').text).toMatch(/lo không hành được đạo/);
    expect(claim('hexagram-48-line-3-chu-hy').text).toMatch(/người đi đường xót/);
    expect(claim('hexagram-48-line-5-trinh-di').text).toMatch(/chưa nói cát/);
    expect(claim('hexagram-48-line-2-trinh-di').text).toMatch(/cóc hay ễnh ương/);
    expect(claim('hexagram-48-line-2-nhl').text).toMatch(/cá giếc/);
  });

  it('cites every NTT attached note separately from its named commentators', () => {
    for (const [number, count, pages] of [
      [45, 6, [712]],
      [46, 3, [723]],
      [47, 5, [738]],
      [48, 7, [751, 752]],
    ] as const) {
      for (let note = 1; note <= count; note++) {
        const item = claim(`hexagram-${number}-note-${note}-ntt`);
        expect(item.attribution?.author).toBe('Ngô Tất Tố');
        const source = citation(item.citationIds[0]!);
        expect(source.textLayer).toBe('translator-note');
        expect(pages).toContain(source.location.pdfPageStart);
      }
    }
    expect(claim('hexagram-47-note-4-ntt').text).toMatch(/không chứng minh.*Hệ Từ/);
  });

  it('keeps original Vietnamese summaries and explicit, non-certifying source comparison', () => {
    for (const item of claims) {
      expect(item.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(item.citationIds.length).toBeGreaterThan(0);
    }
    for (const record of [...records, advanced]) {
      expect(record.review.status).toBe('reviewed');
      expect(record.review.method).toBe('source-comparison');
      expect(record.review.note).toMatch(/not an audit|No audit/);
      expect(record.rights.basis).toBe('original-summary-and-structured-facts');
    }
  });

  it('keeps each BPCT numbered verse separate from commentary and includes full continuations', () => {
    expect(manifest.releaseIds).toContain(advanced.id);
    for (let number = 17; number <= 24; number++) {
      const item = sentence(number);
      expect(item.attribution?.author).toBe('Vương Hồng Tự');
      expect(item.citationIds).toEqual([
        `citation-bpct-ch6-${number}-verse`,
        `citation-bpct-ch6-${number}-commentary`,
      ]);
      expect(citation(item.citationIds[0]!).textLayer).toBe('original-text');
      expect(citation(item.citationIds[1]!).textLayer).toBe('author-commentary');
      expect(item.conditions?.join(' ')).toMatch(/không phải dự báo thực chứng/);
    }
    for (const [number, start, end] of [
      [17, 82, 83],
      [21, 83, 84],
      [24, 84, 85],
    ]) {
      expect(citation(`citation-bpct-ch6-${number}-commentary`).location).toMatchObject({
        pdfPageStart: start,
        pdfPageEnd: end,
        printedPageStart: String(start! - 14),
        printedPageEnd: String(end! - 14),
      });
      const group = registry.groups.find(item => item.id === `bpct-ch06-${number}`);
      expect(group).toMatchObject({
        pdfPageStart: start,
        pdfPageEnd: end,
        discoveryStatus: 'unresolved',
      });
    }
  });

  it('preserves conditional rescue/Không readings, purpose and two different release targets', () => {
    expect(sentence(17).text).toMatch(/vượng tướng có bệnh.*trừ bệnh.*suy vô khí/);
    expect(sentence(18).text).toMatch(/Nguyệt kiến xung khắc.*Nhật thần sinh hợp/);
    expect(sentence(19).text).toMatch(/Không tĩnh bị Nhật Nguyệt khắc.*trị nhật vẫn không dùng/);
    expect(sentence(19).text).toMatch(/hồi đầu khắc.*Nhật Nguyệt không hại/);
    expect(sentence(22).text).toMatch(/ngoại lệ có điều kiện.*không tự hòa giải/);
    expect(sentence(21).text).toMatch(/muốn tan.*toại ý/);
    expect(sentence(24).text).toMatch(/xung chính hào bị hợp.*xung hào đến hợp/);
    expect(sentence(24).text).toMatch(/Sửu Tài hợp ngày Tí đợi Mùi.*Tí hào.*đợi Ngọ/);
  });

  it('includes only attached BPCT note 4 and preserves the separate translator dissent', () => {
    const note = claim(`${advanced.id}-ch06-23-note-4`);
    expect(note.attribution?.author).toBe('Vĩnh Cao');
    expect(note.citationIds).toContain('citation-bpct-ch6-23-note-4');
    expect(citation('citation-bpct-ch6-23-note-4')).toMatchObject({
      textLayer: 'translator-note',
      location: { pdfPageStart: 84, pdfPageEnd: 84 },
    });
    expect(
      citation('citation-bpct-ch1-punishment-note-cross-reference').location.pdfPageStart,
    ).toBe(18);
    expect(advanced.review.note).toMatch(/Note 5.*sentence 26, not this batch/);
    expect(advancedCitations.citations.some(item => item.id.includes('note-5'))).toBe(false);
    expect(claim(`${advanced.id}-translator-punishment-disagreement`).citationIds).toEqual([
      'citation-bpct-part2-punishment-critical-note',
    ]);
  });
});
