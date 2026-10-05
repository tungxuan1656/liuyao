import { describe, expect, it } from 'vitest';
import hexagram43 from '../data/hexagrams/hexagram-43.json';
import type { BookClaim } from '../src/book-schema';

// Local audit fixture: proposal values are intentionally not coupled to the
// shared citation collection while parallel batch repairs are in progress.
const proposedCitations = [
  {
    id: 'citation-nhl-q43-overview-classical-text',
    textLayer: 'original-text',
    location: { pdfPageStart: 268, pdfPageEnd: 268 },
  },
  {
    id: 'citation-nhl-q43-overview-quai-phuc-comparison',
    textLayer: 'author-commentary',
    location: { pdfPageStart: 270, pdfPageEnd: 270 },
  },
  {
    id: 'citation-pbc-q43-overview-classical-text',
    textLayer: 'original-text',
    location: { pdfPageStart: 415, pdfPageEnd: 417 },
  },
  {
    id: 'citation-pbc-q43-overview-pbc',
    textLayer: 'author-commentary',
    location: { pdfPageStart: 415, pdfPageEnd: 417 },
  },
  {
    id: 'citation-ntt-q43-overview-hang-binh-am',
    textLayer: 'supplement',
    location: { pdfPageStart: 673, pdfPageEnd: 673 },
  },
  {
    id: 'citation-ntt-q43-overview-ho-van-phong-great-image',
    textLayer: 'supplement',
    location: { pdfPageStart: 673, pdfPageEnd: 674 },
  },
  {
    id: 'citation-ntt-q43-line-5-classical-text',
    textLayer: 'original-text',
    location: { pdfPageStart: 679, pdfPageEnd: 680 },
  },
  {
    id: 'citation-ntt-q43-line-5-trinh-di',
    textLayer: 'author-commentary',
    location: { pdfPageStart: 679, pdfPageEnd: 680 },
  },
  {
    id: 'citation-ntt-q43-line-5-chu-hy',
    textLayer: 'author-commentary',
    location: { pdfPageStart: 679, pdfPageEnd: 680 },
  },
];

const claims = [
  ...hexagram43.claims,
  ...hexagram43.lines.flatMap(line => line.claims),
] as readonly BookClaim[];

function claim(id: string): BookClaim {
  const result = claims.find(candidate => candidate.id === id);
  if (!result) throw new Error(`Missing Quải claim ${id}`);
  return result;
}

function citation(id: string): (typeof proposedCitations)[number] {
  const result = proposedCitations.find(candidate => candidate.id === id);
  if (!result) throw new Error(`Missing source citation ${id}`);
  return result;
}

describe('Quải source repair evidence', () => {
  it('uses the source-supported rau sam image in each fifth-line reading', () => {
    for (const [id, citationId] of [
      ['hexagram-43-line-5-nhl', 'citation-nhl-q43-line-5-nhl'],
      ['hexagram-43-line-5-pbc', 'citation-pbc-q43-line-5-pbc'],
      ['hexagram-43-line-5-trinh-di', 'citation-ntt-q43-line-5-trinh-di'],
    ] as const) {
      const summary = claim(id);
      expect(summary.text).toMatch(/[Rr]au sam/);
      expect(summary.text).not.toMatch(/cỏ nước/i);
      expect(summary.citationIds).toContain(citationId);
    }
  });

  it('cites the inspected overview and closes the actual named/source-text claims', () => {
    expect(claim('hexagram-43-overview-pbc').text).toMatch(/làm lợi cho phía dưới/);
    expect(claim('hexagram-43-overview-pbc').citationIds).toEqual([
      'citation-pbc-q43-overview-pbc',
    ]);
    expect(claim('hexagram-43-overview-ntt-q43-overview-ho-van-phong').text).toMatch(
      /Hồ Vân Phong.*không buông lỏng.*không chuộng uy vũ/,
    );
    expect(claim('hexagram-43-overview-ntt-q43-overview-ly-long-son').text).toMatch(
      /Lý Long Sơn.*chứa lại.*món hàng quý/,
    );
    expect(claim('hexagram-43-overview-ntt-q43-overview-ho-van-phong-great-image').text).toMatch(
      /Hồ Vân Phong.*Bản nghĩa bỏ lửng câu ấy là phải/,
    );
    expect(claim('hexagram-43-overview-nhl-quai-phuc-comparison').text).toMatch(
      /đối chiếu Quải với Phục.*hào ba thân thiện.*cương quyết với tiểu nhân/,
    );
    expect(claim('hexagram-43-overview-nhl-original-text').citationIds).toContain(
      'citation-nhl-q43-overview-classical-text',
    );
    const nhlOriginalText = claim('hexagram-43-overview-nhl-original-text').text;
    expect(nhlOriginalText).toMatch(/công bố tội lỗi ở sân vua/);
    expect(nhlOriginalText).toMatch(/răn giữ và dè chừng dùng sức/);
    expect(nhlOriginalText).toMatch(/Đại Tượng.*ban phát lợi lộc cho dân/);
    expect(nhlOriginalText).not.toMatch(/thường giữ điều kiêng dè|thường kiêng kị/);
    expect(claim('hexagram-43-overview-ntt-q43-overview-hang-binh-am').text).toMatch(
      /Hạng Bình Âm.*giải chữ cư là chứa/,
    );
    expect(claim('hexagram-43-overview-ntt-q43-overview-chu-hy-line-5-image').text).toMatch(
      /lời Tượng hào năm.*Trình truyện đã giải nghĩa đầy đủ/,
    );
    expect(citation('citation-nhl-q43-overview-classical-text').location).toMatchObject({
      pdfPageStart: 268,
      pdfPageEnd: 268,
    });
    expect(citation('citation-nhl-q43-overview-quai-phuc-comparison').location).toMatchObject({
      pdfPageStart: 270,
      pdfPageEnd: 270,
    });
    expect(citation('citation-ntt-q43-overview-hang-binh-am').location).toMatchObject({
      pdfPageStart: 673,
      pdfPageEnd: 673,
    });
    for (const id of [
      'citation-pbc-q43-overview-classical-text',
      'citation-pbc-q43-overview-pbc',
    ]) {
      expect(citation(id).location).toMatchObject({ pdfPageStart: 415, pdfPageEnd: 417 });
    }
  });

  it('keeps corrected page boundaries on the cited NTT passages', () => {
    expect(citation('citation-ntt-q43-overview-ho-van-phong-great-image').location).toMatchObject({
      pdfPageStart: 673,
      pdfPageEnd: 674,
    });
    for (const id of [
      'citation-ntt-q43-line-5-classical-text',
      'citation-ntt-q43-line-5-trinh-di',
      'citation-ntt-q43-line-5-chu-hy',
    ]) {
      expect(citation(id).location).toMatchObject({ pdfPageStart: 679, pdfPageEnd: 680 });
    }
  });

  it('keeps the historical scope note outside NHL attribution and the sixth-line readings distinct', () => {
    const nhl = claim('hexagram-43-line-6-nhl');
    expect(nhl.text).not.toMatch(/không phải dự báo cho cá nhân hiện đại/);
    expect(nhl.conditions?.join(' ')).toMatch(/không phải dự báo cho cá nhân hiện đại/);

    const chuHy = claim('hexagram-43-line-6-chu-hy');
    expect(chuHy.text).toMatch(/đảng loại đã hết/);
    expect(chuHy.text).toMatch(/nếu người xem giữ đạo quân tử.*nếu không thì ngược lại/);
    expect(chuHy.text).not.toMatch(/được lợi|bị đánh|cầu lợi/);

    const trinhDi = claim('hexagram-43-line-6-trinh-di');
    expect(trinhDi.text).toMatch(/không phải con người bị giết hết/);
    expect(trinhDi.conditions?.join(' ')).toMatch(/mâu thuẫn về số lượng và vị trí/);
    expect(claim('hexagram-43-note-9').text).toMatch(/hai chữ được đọc là “hiệu”, một chữ/);
    expect(claim('hexagram-43-note-10').text).toMatch(/hai chữ được đọc là “hiệu”, một chữ/);
  });
});
