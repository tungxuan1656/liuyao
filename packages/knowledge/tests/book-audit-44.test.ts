import { describe, expect, it } from 'vitest';
import hexagram44 from '../data/hexagrams/hexagram-44.json';
import type { BookClaim } from '../src/book-schema';

const allClaims = [
  ...hexagram44.claims,
  ...hexagram44.lines.flatMap(line => line.claims),
] as readonly BookClaim[];

function claim(id: string): BookClaim {
  const result = allClaims.find(item => item.id === id);
  if (!result) throw new Error(`Missing hexagram 44 claim ${id}`);
  return result;
}

describe('hexagram 44 source-comparison repairs', () => {
  it('keeps NHL reporting PBC’s distinctive reading of “vô cữu”', () => {
    const nhl = claim('hexagram-44-line-6-nhl');
    expect(nhl.text).toMatch(/Nguyễn Hiến Lê.*các sách đều dịch.*không có lỗi/);
    expect(nhl.text).toMatch(/Phan Bội Châu.*không đổ lỗi cho ai được/);
    expect(nhl.text).not.toMatch(/tội do mình gây ra/);
    expect(nhl.attribution?.author).toBe('Nguyễn Hiến Lê');
    expect(nhl.citationIds).toContain('citation-nhl-q44-line-6-nhl');

    const pbc = claim('hexagram-44-line-6-pbc');
    expect(pbc.text).toMatch(/vô sở quy cữu.*tội lỗi do mình làm ra nên không trách được ai/);
    expect(pbc.attribution?.author).toBe('Phan Bội Châu');
    expect(pbc.citationIds).toContain('citation-pbc-q44-line-6-pbc');
  });

  it('keeps the PBC Great Image explanation distinct from the Soán continuation', () => {
    const greatImage = claim('hexagram-44-overview-pbc-dai-tuong');
    expect(greatImage.text).toMatch(
      /Đại Tượng.*gió đi khắp dưới trời.*thi hành mệnh lệnh.*bốn phương/,
    );
    expect(greatImage.text).not.toMatch(/khí dương thuộc trời|Cửu Ngũ/);
    expect(greatImage.conditions?.join(' ')).toMatch(/PDF 427.*PDF 426/);
    expect(greatImage.citationIds).toContain('citation-pbc-q44-overview-dai-tuong-pbc');
  });

  it('adds passage-specific scope conditions to reviewed author interpretations', () => {
    const ids = [
      'hexagram-44-overview-pbc',
      'hexagram-44-overview-pbc-thoan',
      'hexagram-44-overview-pbc-dai-tuong',
      'hexagram-44-overview-pbc-thay-thieu',
      'hexagram-44-overview-trinh-di',
      'hexagram-44-overview-chu-hy',
      'hexagram-44-overview-ntt-thoan-trinh-di',
      'hexagram-44-overview-ntt-dai-tuong-trinh-di',
      'hexagram-44-line-6-ntt-q44-line-6-ly-long-son',
      'hexagram-44-line-6-ntt-q44-line-6-ho-van-phong',
    ];

    for (const id of ids) {
      expect(claim(id).conditions?.length, `${id} should state source scope`).toBeGreaterThan(0);
    }
    expect(claim('hexagram-44-overview-pbc').conditions?.join(' ')).toMatch(
      /PHỤ CHÚ ở mục Soán từ \(PDF 425\).*không phải PHỤ CHÚ Tự Quái ở PDF 424/,
    );
    expect(claim('hexagram-44-overview-pbc-thay-thieu').conditions?.join(' ')).toMatch(
      /Thầy Thiệu.*PHỤ CHÚ/,
    );
    expect(claim('hexagram-44-line-6-ntt-q44-line-6-ho-van-phong').conditions?.join(' ')).toMatch(
      /hào ba và hào trên.*Hồ Vân Phong/,
    );
  });

  it('bounds NTT glyph differences without normalizing the runtime text', () => {
    const phung = claim('hexagram-44-overview-ntt-q44-overview-tien-nho-phung-hau-trai');
    expect(phung.text).toMatch(/Phùng Hậu Trai.*Vương Thù/);
    expect(phung.conditions?.join(' ')).toMatch(/U\+57A2.*U\+59E4.*U\+9058/);
    expect(phung.conditions?.join(' ')).toMatch(/Không chuẩn hóa/);
    expect(phung.attribution?.author).toBe('Phùng Hậu Trai');

    expect(phung.text).not.toMatch(/[\u3400-\u9fff]/);
    for (const id of ['hexagram-44-note-2', 'hexagram-44-note-3']) {
      expect(claim(id).text).not.toMatch(/[\u3400-\u9fff]/);
    }
  });

  it('retains PBC line-five content and its non-literal “heaven-sent fortune” caveat', () => {
    const pbc = claim('hexagram-44-line-5-pbc');
    expect(pbc.text).toMatch(/cương.*trung chính.*khuất mình hạ hiền/);
    expect(pbc.text).toMatch(/che chở Sơ Lục.*ngầm chứa đức tốt/);
    expect(pbc.text).toMatch(/hữu vận tự thiên.*hình dung vận tốt, chẳng phải sự thực/);
    expect(pbc.text).not.toMatch(/giai thoại lịch sử|Cao Tông|Phó Duyệt|Văn Vương|Khương Thượng/);
    expect(pbc.citationIds).toEqual(['citation-pbc-q44-line-5-pbc']);
  });

  it('distinguishes Chu Hy’s quiet-control and reversal reading on line five', () => {
    const chuHy = claim('hexagram-44-line-5-chu-hy');
    expect(chuHy.text).toMatch(/ngậm che văn vẻ, im lặng chế ngự nó.*xoay lại cơ tạo hóa/);
    expect(chuHy.text).not.toMatch(/cuộc gặp cần được giữ kín|đúng thời/);
    expect(chuHy.attribution?.author).toBe('Chu Hy');
    expect(chuHy.citationIds).toContain('citation-ntt-q44-line-5-chu-hy');
  });

  it('records Chu Hy’s distinctive line-six position and comparison', () => {
    const chuHy = claim('hexagram-44-line-6-chu-hy');
    expect(chuHy.text).toMatch(/không có ngôi.*Tượng và Chiêm cũng giống hào Chín Ba/);
    expect(chuHy.attribution?.author).toBe('Chu Hy');
    expect(chuHy.citationIds).toContain('citation-ntt-q44-line-6-chu-hy');
  });

  it('keeps all claim citation references in source-comparison evidence', () => {
    const claimCitationIds = new Set(allClaims.flatMap(item => item.citationIds));
    const reviewEvidenceIds = new Set(hexagram44.review.evidenceCitationIds ?? []);
    expect([...claimCitationIds].filter(id => !reviewEvidenceIds.has(id))).toEqual([]);

    expect(claim('hexagram-44-overview-nhl').citationIds).toContain(
      'citation-nhl-q44-overview-nhl',
    );
  });
});
