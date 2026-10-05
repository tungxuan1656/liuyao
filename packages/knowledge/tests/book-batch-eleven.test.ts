import { describe, expect, it } from 'vitest';
import citations from '../data/citations/batch-eleven-hexagrams.json';
import hexagram41 from '../data/hexagrams/hexagram-41.json';
import hexagram42 from '../data/hexagrams/hexagram-42.json';
import hexagram43 from '../data/hexagrams/hexagram-43.json';
import hexagram44 from '../data/hexagrams/hexagram-44.json';
import { listHexagrams } from '../src/catalog';
import type { BookClaim } from '../src/book-schema';

const records = [hexagram41, hexagram42, hexagram43, hexagram44] as const;
const forbiddenCjk = /[\p{Script=Han}\u3000-\u303f\uff00-\uffef]/u;
const englishEditorialBoilerplate =
  /translator\/editorial note|keep distinct|quoted (as|by) Tiên Nho|quoted by Chu Hy/i;

function claim(id: string) {
  const result = records
    .flatMap(
      record => [...record.claims, ...record.lines.flatMap(line => line.claims)] as BookClaim[],
    )
    .find(candidate => candidate.id === id);
  if (!result) throw new Error(`Missing claim ${id}`);
  return result;
}

function citation(id: string) {
  const result = citations.citations.find(candidate => candidate.id === id);
  if (!result) throw new Error(`Missing citation ${id}`);
  return result;
}

function expectLineClaim(record: (typeof records)[number], position: number, id: string) {
  const line = record.lines.find(candidate => candidate.position === position);
  expect(line, `${record.id} position ${position}`).toBeDefined();
  expect(line!.claims.some(candidate => candidate.id === id)).toBe(true);
  return line!.claims.find(candidate => candidate.id === id)!;
}

describe('batch eleven classical source corrections', () => {
  it('integrates every proposed overview citation for hexagrams 41–44', () => {
    const proposedIds = [
      'citation-nhl-q41-overview-classical-text',
      'citation-nhl-q41-overview-closing',
      'citation-pbc-q41-overview-dai-tuong-pbc',
      'citation-pbc-q41-overview-dai-tuong-classical-text',
      'citation-pbc-q41-overview-phu-chu',
      'citation-ntt-q41-overview-tien-nho-uong-nghien-chuong',
      'citation-ntt-q41-overview-dai-tuong-classical-text',
      'citation-ntt-q41-overview-dai-tuong-trinh-di',
      'citation-ntt-q41-overview-dai-tuong-chu-hy',
      'citation-nhl-q42-overview-classical-text',
      'citation-pbc-q42-overview-tuong-classical',
      'citation-pbc-q42-overview-tuong-pbc',
      'citation-nhl-q43-overview-classical-text',
      'citation-nhl-q43-overview-quai-phuc-comparison',
      'citation-ntt-q43-overview-hang-binh-am',
      'citation-nhl-q44-overview-nhl-closing-summary',
      'citation-pbc-q44-overview-thoan-classical-text',
      'citation-pbc-q44-overview-thoan-pbc',
      'citation-pbc-q44-overview-dai-tuong-classical-text',
      'citation-pbc-q44-overview-dai-tuong-pbc',
      'citation-pbc-q44-overview-thay-thieu',
    ];

    expect(citations.citations).toHaveLength(261);
    expect(new Set(citations.citations.map(item => item.id)).size).toBe(261);
    for (const id of proposedIds) expect(citation(id).id).toBe(id);
  });

  it('retains six populated line positions for each new hexagram and all 64 compatibility entries', () => {
    for (const record of records) {
      expect(record.lines.map(line => line.position)).toEqual([1, 2, 3, 4, 5, 6]);
      for (const line of record.lines)
        expect(line.claims.length, `${record.id} line ${line.position}`).toBeGreaterThan(0);
    }

    expect(listHexagrams().map(hexagram => hexagram.id)).toEqual(
      Array.from({ length: 64 }, (_, index) => `hexagram-${String(index + 1).padStart(2, '0')}`),
    );
  });

  it('keeps the corrected Ích interpretations in their cited line positions', () => {
    const line4 = expectLineClaim(hexagram42, 4, 'hexagram-42-line-4-trinh-di');
    expect(line4.text).toMatch(/Lục tứ.*trung.*được tin cậy/);
    expect(line4.citationIds).toContain('citation-ntt-q42-line-4-trinh-di');
    expect(citation('citation-ntt-q42-line-4-trinh-di').location).toMatchObject({
      pdfPageStart: 662,
      pdfPageEnd: 663,
    });

    const line5 = expectLineClaim(hexagram42, 5, 'hexagram-42-line-5-trinh-di');
    expect(line5.text).toMatch(/Trình Di.*Cửu ngũ.*thiên hạ.*ứng hợp.*không cần hỏi bói/);
    expect(line5.text).not.toMatch(/cầu lợi quá độ|gây oán|công kích/i);
    expect(line5.citationIds).toContain('citation-ntt-q42-line-5-trinh-di');
    expect(citation('citation-ntt-q42-line-5-trinh-di').location).toMatchObject({
      pdfPageStart: 663,
      pdfPageEnd: 664,
    });
  });

  it('keeps Quải commentary in the fourth, fifth, and sixth lines with the cited source ranges', () => {
    const line4 = expectLineClaim(hexagram43, 4, 'hexagram-43-line-4-chu-hy');
    expect(line4.text).toMatch(/Cửu tứ.*khó tiến.*theo hào dương.*tránh hối/);
    expect(line4.citationIds).toContain('citation-ntt-q43-line-4-chu-hy');
    expect(citation('citation-ntt-q43-line-4-chu-hy').location).toMatchObject({
      pdfPageStart: 678,
      pdfPageEnd: 679,
    });

    const line5 = expectLineClaim(hexagram43, 5, 'hexagram-43-line-5-chu-hy');
    expect(line5.text).toMatch(/rau sam.*đường giữa.*không làm quá mức/);
    expect(line5.citationIds).toContain('citation-ntt-q43-line-5-chu-hy');
    expect(citation('citation-ntt-q43-line-5-chu-hy').location).toMatchObject({
      pdfPageStart: 679,
      pdfPageEnd: 680,
    });

    const line6 = expectLineClaim(hexagram43, 6, 'hexagram-43-line-6-chu-hy');
    expect(line6.text).toMatch(/Trong Bản nghĩa.*Chu Hy/);
    expect(line6.text).toMatch(/hào âm mềm ở thời cùng cực.*đảng loại đã hết/);
    expect(line6.text).toMatch(/người xem giữ đạo quân tử.*phía đối địch gặp hung/);
    expect(line6.text).toMatch(/nếu không thì ngược lại/);
    expect(line6.text).not.toMatch(
      /không được ai làm lợi|có thể bị đánh|đừng giữ mãi lòng cầu lợi/i,
    );
    expect(line6.attribution?.author).toBe('Chu Hy');
    expect(line6.citationIds).toContain('citation-ntt-q43-line-6-chu-hy');
    expect(citation('citation-ntt-q43-line-6-chu-hy').location).toMatchObject({
      pdfPageStart: 681,
      pdfPageEnd: 682,
    });
  });

  it('keeps the Quải Tiên Nho caution attributed and distinct from Chu Hy’s Bản nghĩa', () => {
    const caution = claim(
      'hexagram-43-overview-ntt-q43-overview-tien-nho-chu-hy-quoted-as-tien-nho',
    );
    expect(caution.text).toMatch(
      /Chu Hy.*không lúc nào không cần răn giữ lo sợ.*không chỉ dành riêng cho lúc Âm tiêu Dương lớn/,
    );
    expect(caution.text).not.toMatch(/tiểu nhân đã suy|quân tử.*không thể quên sự dè chừng/);
    expect(caution.text).not.toMatch(/lời không chính đáng|lời lệch/);
    expect(caution.text).not.toMatch(/Bản nghĩa/);
    expect(caution.attribution?.author).toBe('Chu Hy, được dẫn trong lời Tiên Nho');
    expect(
      citation('citation-ntt-q43-overview-tien-nho-chu-hy-quoted-as-tien-nho').location,
    ).toMatchObject({
      pdfPageStart: 669,
      pdfPageEnd: 670,
    });
  });

  it('reports Quải notes 9 and 10 without assigning the readings to passage locations', () => {
    const note9 = claim('hexagram-43-note-9');
    const note10 = claim('hexagram-43-note-10');
    for (const [note, citationId] of [
      [note9, 'citation-ntt-q43-note-9'],
      [note10, 'citation-ntt-q43-note-10'],
    ] as const) {
      expect(note.text).toMatch(/hai chữ được đọc là “hiệu”, một chữ được đọc là “hào”/);
      expect(note.text).not.toMatch(/lời quẻ|lời hào|hào kêu|gọi/);
      expect(note.citationIds).toContain(citationId);
      expect(note.attribution?.author).toBe('Ngô Tất Tố');
    }
    expect(note9.id).not.toBe(note10.id);
    expect(claim('hexagram-43-note-10').text).toMatch(/^Trong chú thích 10,/);
  });

  it('preserves the bounded PBC quantification and Chu Hy plant image', () => {
    const pbc = claim('hexagram-41-line-5-pbc');
    expect(pbc.text).toMatch(/mười bằng.*món lợi cực lớn/);
    expect(pbc.text).not.toMatch(/nhiều cách hiểu|các cách định lượng/i);

    const chuHy = expectLineClaim(hexagram44, 5, 'hexagram-44-line-5-chu-hy');
    expect(chuHy.text).toMatch(/cây kỷ.*quả dưa/);
    expect(chuHy.text).not.toMatch(/cây cỏ|quả bầu/i);
    expect(chuHy.citationIds).toContain('citation-ntt-q44-line-5-chu-hy');
    expect(citation('citation-ntt-q44-line-5-chu-hy').location).toMatchObject({
      pdfPageStart: 694,
      pdfPageEnd: 694,
    });
  });

  it('retains the Ích translator-note report and corrected continuation locators', () => {
    expect(claim('hexagram-42-note-1').text).toMatch(/theo Trình Di.*chữ ích.*đạo ích/);
    expect(citation('citation-ntt-q42-line-1-tien-nho').location).toMatchObject({
      pdfPageStart: 657,
      pdfPageEnd: 657,
    });
    expect(citation('citation-ntt-q42-note-3').location).toMatchObject({
      pdfPageStart: 666,
      pdfPageEnd: 667,
    });
    expect(citation('citation-ntt-q42-note-1').location).toMatchObject({
      pdfPageStart: 666,
      pdfPageEnd: 666,
    });
  });

  it('matches the printed labels on all 58 NHL citations to their inspected PDF pages', () => {
    const nhlCitations = citations.citations.filter(item => item.sourceId === 'source-book-nhl');
    expect(nhlCitations).toHaveLength(58);
    for (const item of nhlCitations) {
      expect(item.location.printedPageStart).toBe(String(item.location.pdfPageStart));
      expect(item.location.printedPageEnd).toBe(String(item.location.pdfPageEnd));
      expect(item.location.pdfPageStart).toBeGreaterThanOrEqual(261);
      expect(item.location.pdfPageEnd).toBeLessThanOrEqual(273);
    }
  });

  it('keeps released claim prose and conditions free of CJK and English editorial boilerplate', () => {
    for (const record of records) {
      const claims = [
        ...record.claims,
        ...record.lines.flatMap(line => line.claims),
      ] as unknown as readonly BookClaim[];
      for (const item of claims) {
        expect(item.text, item.id).not.toMatch(forbiddenCjk);
        expect(item.text, item.id).not.toMatch(englishEditorialBoilerplate);
        for (const condition of item.conditions ?? []) {
          expect(condition, item.id).not.toMatch(forbiddenCjk);
          expect(condition, item.id).not.toMatch(englishEditorialBoilerplate);
        }
      }
    }
  });
});
