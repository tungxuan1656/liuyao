import { describe, expect, it } from 'vitest';
import hexagram41 from '../data/hexagrams/hexagram-41.json';
import type { BookClaim } from '../src/book-schema';

const allClaims = [
  ...hexagram41.claims,
  ...hexagram41.lines.flatMap(line => line.claims),
] as readonly BookClaim[];

function claim(id: string): BookClaim {
  const result = allClaims.find(item => item.id === id);
  if (!result) throw new Error(`Missing hexagram 41 claim ${id}`);
  return result;
}

describe('hexagram 41 source-comparison repairs', () => {
  it('correctly distinguishes Chu Hy and Uông Nghiện Chương in the NTT Tiên Nho block', () => {
    const chuHy = claim('hexagram-41-line-5-ntt-q41-line-5-tien-nho');
    expect(chuHy.text).toMatch(/Chu Hy.*hình tượng rùa.*Tổn và Ích.*nói đến rùa/);
    expect(chuHy.text).not.toMatch(/hai quái trong lời Tượng/);
    expect(chuHy.attribution?.author).toBe('Chu Hy, được dẫn trong lời Tiên Nho');
    expect(chuHy.citationIds).toContain('citation-ntt-q41-line-5-tien-nho');

    const uong = claim('hexagram-41-line-5-ntt-q41-line-5-uong-nghien-chuong');
    expect(uong.text).toMatch(/Uông Nghiện Chương.*Ly là rùa.*thông thể.*giống Ly/);
    expect(uong.attribution?.author).toBe('Uông Nghiện Chương');
    expect(uong.citationIds).toContain('citation-ntt-q41-overview-tien-nho-uong-nghien-chuong');
  });

  it('represents separate PBC and NTT Đại Tượng interpretations and their named authors', () => {
    const pbc = claim('hexagram-41-overview-pbc-dai-tuong-pbc');
    expect(pbc.text).toMatch(/Phan Bội Châu.*trừng phẫn, trất dục.*khí huyết.*tư dục/);
    expect(pbc.text).toMatch(/thầy Nhan/);
    expect(pbc.attribution?.author).toBe('Phan Bội Châu');
    expect(pbc.citationIds).toContain('citation-pbc-q41-overview-dai-tuong-classical-text');
    expect(pbc.citationIds).toContain('citation-pbc-q41-overview-dai-tuong-pbc');

    const trinhDi = claim('hexagram-41-overview-ntt-dai-tuong-trinh-di');
    expect(trinhDi.text).toMatch(/Trình Di.*bớt ở dưới.*thêm ở trên.*răn giận.*ham muốn/);
    expect(trinhDi.attribution?.author).toBe('Trình Di');
    expect(trinhDi.citationIds).toContain('citation-ntt-q41-overview-dai-tuong-trinh-di');

    const chuHy = claim('hexagram-41-overview-ntt-dai-tuong-chu-hy');
    expect(chuHy.text).toMatch(/Bản nghĩa.*Chu Hy.*tự sửa mình/);
    expect(chuHy.attribution?.author).toBe('Chu Hy');
    expect(chuHy.citationIds).toContain('citation-ntt-q41-overview-dai-tuong-chu-hy');
  });

  it('keeps the NHL structure citation and author closings linked to bounded claims', () => {
    const structure = claim('hexagram-41-structure');
    expect(structure.citationIds).toContain('citation-nhl-q41-overview-classical-text');

    const nhlClosing = claim('hexagram-41-overview-nhl-closing');
    expect(nhlClosing.text).toMatch(
      /Nguyễn Hiến Lê.*Tổn.*không mặc nhiên xấu.*Ích.*không mặc nhiên tốt/,
    );
    expect(nhlClosing.text).toMatch(/giảm khi quá.*thêm khi thiếu.*giúp người/);
    expect(nhlClosing.attribution?.author).toBe('Nguyễn Hiến Lê');
    expect(nhlClosing.citationIds).toContain('citation-nhl-q41-overview-closing');

    const pbcClosing = claim('hexagram-41-overview-pbc-phu-chu');
    expect(pbcClosing.text).toMatch(/Phan Bội Châu.*Tổn kỉ, Tổn nhân.*điều xấu.*điều lành/);
    expect(pbcClosing.text).toMatch(/hào Thượng.*Tổn chuyển thành Ích.*hào Nhị/);
    expect(pbcClosing.attribution?.author).toBe('Phan Bội Châu');
    expect(pbcClosing.citationIds).toContain('citation-pbc-q41-overview-phu-chu');
  });
});
