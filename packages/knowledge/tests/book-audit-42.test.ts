import { describe, expect, it } from 'vitest';
import hexagram42 from '../data/hexagrams/hexagram-42.json';

function recordClaim(id: string) {
  const claim = [...hexagram42.claims, ...hexagram42.lines.flatMap(line => line.claims)].find(
    candidate => candidate.id === id,
  );
  if (!claim) throw new Error(`Missing claim ${id}`);
  return claim;
}

describe('Ích source-comparison repairs', () => {
  it('anchors the source-supported overview layers and structure', () => {
    expect(recordClaim('hexagram-42-structure').citationIds).toContain(
      'citation-nhl-q42-overview-classical-text',
    );

    expect(recordClaim('hexagram-42-overview-pbc-tuong').citationIds).toContain(
      'citation-pbc-q42-overview-tuong-classical',
    );
    expect(recordClaim('hexagram-42-overview-pbc-tuong').citationIds).toContain(
      'citation-pbc-q42-overview-tuong-pbc',
    );
    expect(recordClaim('hexagram-42-overview-trinh-di-tuong').attribution?.author).toBe('Trình Di');
    expect(recordClaim('hexagram-42-overview-chu-hy-tuong').attribution?.author).toBe('Chu Hy');
  });

  it('keeps PBC line 3 adversity distinct from verbal remonstrance', () => {
    const claim = recordClaim('hexagram-42-line-3-pbc');
    expect(claim.text).toMatch(/răn đe, trừng trị/);
    expect(claim.text).not.toMatch(/can gián/);
    expect(recordClaim('hexagram-42-line-3-pbc-tuong').citationIds).toContain(
      'citation-pbc-q42-line-3-pbc',
    );
    expect(recordClaim('hexagram-42-line-3-ntt-q42-line-3-y-xuyen').text).toMatch(
      /Y Xuyên, tức Trình Di/,
    );
  });

  it('preserves the separate Trình Di and Chu Hy reading of line 4', () => {
    const claim = recordClaim('hexagram-42-line-4-chu-hy');
    expect(claim.text).toMatch(/không được giữa/);
    expect(claim.text).toMatch(/ích cho người dưới/);
    expect(claim.text).toMatch(/ví dụ trong Tả truyện/);
    expect(claim.text).not.toMatch(/làm lợi cho người trên/);
    expect(recordClaim('hexagram-42-line-4-trinh-di').text).toMatch(/làm lợi cho người trên/);
    expect(
      hexagram42.lines[3]?.claims.some(claim => claim.id === 'hexagram-42-line-4-chu-hy-tuong'),
    ).toBe(false);
  });

  it('keeps the NTT line-3 Tượng as an emergency-only reading', () => {
    const claim = recordClaim('hexagram-42-line-3-trinh-di-tuong');
    expect(claim.text).toMatch(/biến cố cấp nạn/);
    expect(claim.text).toMatch(/cứu dân/);
    expect(claim.text).toMatch(/quyền nghi lúc khẩn cấp/);
    expect(claim.text).toMatch(/không thể áp dụng cho việc hình thường/);
    expect(claim.text).not.toMatch(/giữ lòng thành và đường trung cho bền/);
    expect(claim.conditions?.join(' ')).toMatch(
      /Truyện của Trình Di.*Tiểu Tượng hào Lục tam.*PDF 661–662/,
    );
    expect(claim.conditions?.join(' ')).toMatch(
      /loại trừ hình thi.*không mở rộng thành quyền làm thường lệ/,
    );
  });

  it('summarizes Chu Hy line 1 from the NTT Tượng passage', () => {
    const claim = recordClaim('hexagram-42-line-1-chu-hy-tuong');
    expect(claim.text).toMatch(/vốn không phải gánh việc lớn/);
    expect(claim.text).toMatch(/không thể lấp lỗi/);
    expect(claim.text).not.toMatch(/nhận ích từ người trên/);
    expect(claim.conditions?.join(' ')).toMatch(/Bản nghĩa Chu Hy.*PDF 658/);
    expect(claim.conditions?.join(' ')).toMatch(/phân biệt với lời Truyện của Trình Di/);
  });

  it('bounds the retained line-4 Tượng to Trình Di’s passage', () => {
    const claim = recordClaim('hexagram-42-line-4-trinh-di-tuong');
    expect(claim.conditions?.join(' ')).toMatch(
      /Truyện của Trình Di.*Tiểu Tượng hào Lục tứ.*PDF 663/,
    );
    expect(claim.conditions?.join(' ')).toMatch(/phân biệt với Bản nghĩa Chu Hy/);
    expect(
      hexagram42.lines[3]?.claims.some(claim => claim.id === 'hexagram-42-line-4-chu-hy-tuong'),
    ).toBe(false);
  });

  it('covers inspected 小象 layers without claiming every edition has one', () => {
    for (const id of [
      'hexagram-42-line-1-pbc-tuong',
      'hexagram-42-line-2-pbc-tuong',
      'hexagram-42-line-3-pbc-tuong',
      'hexagram-42-line-4-pbc-tuong',
      'hexagram-42-line-5-pbc-tuong',
      'hexagram-42-line-6-pbc-tuong',
      'hexagram-42-line-1-trinh-di-tuong',
      'hexagram-42-line-1-chu-hy-tuong',
      'hexagram-42-line-3-trinh-di-tuong',
      'hexagram-42-line-3-chu-hy-tuong',
      'hexagram-42-line-4-trinh-di-tuong',
      'hexagram-42-line-5-trinh-di-tuong',
      'hexagram-42-line-6-trinh-di-tuong',
      'hexagram-42-line-6-chu-hy-tuong',
    ]) {
      expect(recordClaim(id).citationIds.length, id).toBeGreaterThan(0);
    }

    expect(
      hexagram42.lines.flatMap(line => line.claims).some(claim => claim.id.includes('nhl-tuong')),
    ).toBe(false);
    expect(recordClaim('hexagram-42-line-2-trinh-di-tuong').text).toContain('hào năm');
  });

  it('preserves the established non-adjudicated Y Xuyên identity and source-error notes', () => {
    expect(recordClaim('hexagram-42-line-3-ntt-q42-line-3-y-xuyen').attribution?.author).toBe(
      'Y Xuyên (Trình Di), được Chu Hy dẫn lại',
    );
    expect(recordClaim('hexagram-42-note-3').text).toContain('hai mai rùa');
    expect(recordClaim('hexagram-42-note-6').text).toContain('một phần');
  });
});
