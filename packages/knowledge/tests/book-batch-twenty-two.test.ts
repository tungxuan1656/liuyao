import { describe, expect, it } from 'vitest';
import locators from './fixtures/bpct-illness-remedies-travellers-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import citations from '../data/citations/batch-twenty-two-advanced.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord } from '../src/index';

const chapters = [
  ['23', 'twenty-three-illness', 270, 278, 38],
  ['24', 'twenty-four-condition', 280, 285, 40],
  ['25', 'twenty-five-remedies', 286, 294, 40],
  ['26', 'twenty-six-travellers', 295, 301, 41],
] as const;
const record = (name: string) => getBookRecord(`article-bpct-chapter-${name}`)!;
const text = (name: string, suffix: string) =>
  record(name).claims.find(c => c.id.endsWith(suffix))!.text;

describe('feat-055 inspected illness, remedies and traveller layers', () => {
  it.each(locators)('preserves each actual layer and source locator of $id', unit => {
    const article = getBookRecord(unit.recordId)!;
    const note = unit.voice === 'note';
    const supplement = unit.voice === 'dong-ta';
    const bounds = [unit.originalReadingPages, unit.meaningPages, unit.commentaryPages]
      .filter(p => p !== null)
      .flat();
    const layers = [];
    if (unit.originalReadingPages) layers.push('layer-bpct-original-text');
    if (unit.meaningPages) layers.push('layer-bpct-translation');
    if (unit.commentaryPages)
      layers.push(
        note
          ? 'layer-bpct-translator-note'
          : supplement
            ? 'layer-bpct-dong-ta-supplement'
            : 'layer-bpct-author-commentary',
      );
    expect(registry.groups.find(g => g.id === unit.id)).toMatchObject({
      parentId: unit.parentId,
      pdfPageStart: Math.min(...bounds),
      pdfPageEnd: Math.max(...bounds),
      authorFeatureId: 'feat-055',
      auditFeatureId: 'feat-089',
      layerScopeIds: layers,
      discoveryStatus: 'unresolved',
      recordIds: [unit.recordId],
    });
    for (const [suffix, pages, layer] of [
      ['verse', unit.originalReadingPages, 'original-text'],
      ['rendering', unit.meaningPages, 'original-text'],
      [
        note || supplement ? 'discussion' : 'commentary',
        unit.commentaryPages,
        note ? 'translator-note' : supplement ? 'supplement' : 'author-commentary',
      ],
    ] as const) {
      const claim = article.claims.find(c => c.id === `${article.id}-${unit.id}-${suffix}`);
      if (!pages) {
        expect(claim).toBeUndefined();
        continue;
      }
      expect(claim).toBeDefined();
      expect(claim!.kind).toBe('author-interpretation');
      expect(claim!.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(claim!.conditions?.join(' ')).toMatch(/không phải kết quả thực chứng/);
      expect(claim!.conditions?.join(' ')).toMatch(/không dùng làm phép lịch/);
      expect(claim!.conditions?.join(' ')).toMatch(/chọn thầy\/thuốc.*bỏ điều trị/);
      if (suffix === 'verse') {
        expect(claim!.attribution?.author).toMatch(/tín chỉ chung Lưu Bá Ôn/);
        expect(claim!.attribution?.via).toMatch(/chưa xác lập tác giả riêng/);
      } else if (suffix === 'rendering') {
        expect(claim!.attribution?.author).toBe('Vĩnh Cao — nghĩa tiếng Việt');
      } else if (note) {
        expect(claim!.attribution?.author).toBe('Vĩnh Cao');
      } else if (supplement) {
        expect(claim!.attribution?.author).toBe('Đông tà — chữ ký trên PDF278');
        expect(claim!.attribution?.via).toMatch(/Danh tính.*chưa xác lập/);
      } else {
        expect(claim!.attribution?.author).toBe('Vương Hồng Tự');
        expect(claim!.attribution?.via).toMatch(/không bảo đảm từng đoạn/);
      }
      for (const [index, id] of claim!.citationIds.entries()) {
        const citation = getBookCitation(id)!;
        expect(citation.editionId).toBe('edition-bpct-supplied');
        expect(article.review.evidenceCitationIds).toContain(id);
        // Comparative claims also cite the other source layer or translator note.
        if (index > 0) continue;
        expect(citation.textLayer).toBe(layer);
        expect(citation.attributedTo).toBe(claim!.attribution?.author);
        expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(pages);
        const offset = chapters.find(c => c[0] === unit.chapter)![4];
        expect([citation.location.printedPageStart, citation.location.printedPageEnd]).toEqual(
          pages.map(p => String(p - offset)),
        );
        expect(article.review.evidenceCitationIds).toContain(id);
      }
    }
  });

  it('keeps four parent intervals, all passages and the folio-only transition', () => {
    for (const [ch, name, start, end] of chapters) {
      expect(registry.groups.find(g => g.id === `bpct-part1-ch${ch}`)).toMatchObject({
        pdfPageStart: start,
        pdfPageEnd: end,
        discoveryStatus: 'unresolved',
        recordIds: [record(name).id],
      });
    }
    expect(locators).toHaveLength(145);
    expect(locators.filter(u => u.voice === 'note')).toHaveLength(13);
    expect(locators.filter(u => u.voice === 'dong-ta')).toHaveLength(12);
    for (const [ch, count] of [
      ['23', 28],
      ['24', 26],
      ['25', 31],
      ['26', 30],
    ] as const) {
      expect(locators.filter(u => u.chapter === ch && /^\d\d$/.test(u.label))).toHaveLength(count);
    }
    expect(locators.some(u => u.id === 'bpct-ch26-26')).toBe(false);
    expect(locators.find(u => u.id === 'bpct-ch23-05')?.commentaryPages).toBeNull();
    expect(locators.find(u => u.id === 'bpct-ch24-opening')?.commentaryPages).toBeNull();
    expect(locators.find(u => u.id === 'bpct-ch24-25')?.commentaryPages).toBeNull();
    expect(locators.find(u => u.id === 'bpct-ch26-closing')?.commentaryPages).toBeNull();
    expect(registry.groups.find(g => g.id === 'bpct-transition-279')).toMatchObject({
      kind: 'non-content',
      pdfPageStart: 279,
      pdfPageEnd: 279,
      authorFeatureId: 'feat-055',
      auditFeatureId: 'feat-089',
      discoveryStatus: 'unresolved',
    });
    expect(citations.citations.some(c => c.location.pdfPageStart === 279)).toBe(false);
    expect(registry.layers.find(l => l.id === 'layer-bpct-dong-ta-supplement')).toMatchObject({
      class: 'supplement',
      rosterStatus: 'unresolved',
      sourceAnchor: { citationIds: ['citation-bpct-ch23-dong-ta-opening-discussion'] },
    });
  });
});

describe('feat-055 conditions, source disagreements and non-advice scope', () => {
  it('retains the explicit translator disagreement and separate inserted voice', () => {
    expect(text('twenty-three-illness', 'bpct-ch23-13-verse')).toMatch(/xung Tài/);
    expect(text('twenty-three-illness', 'bpct-ch23-13-commentary')).toMatch(/khắc Tài.*bác/);
    expect(text('twenty-three-illness', 'bpct-ch23-note-03-discussion')).toMatch(
      /không khắc Thê Tài.*Thê Tài sinh Quan/,
    );
    expect(text('twenty-three-illness', 'bpct-ch23-note-01-discussion')).toMatch(
      /quẻ chính.*quẻ biến.*không thay.*Bát cung/,
    );
    expect(text('twenty-three-illness', 'bpct-ch23-17-commentary')).toMatch(
      /Chấn ngoại không cố định chân.*Không đồng nhất.*hiện đại/,
    );
    expect(text('twenty-three-illness', 'bpct-ch23-dong-ta-11-discussion')).toMatch(
      /trừ Nhật\/Nguyệt.*không biến.*ứng dụng gieo lại/,
    );
  });

  it('binds explicit cross-layer comparisons to both supporting passages', () => {
    const comparisons = [
      ['twenty-three-illness', 'bpct-ch23-13-commentary', 'bpct-ch23-note-03-discussion'],
      ['twenty-three-illness', 'bpct-ch23-14-rendering', 'bpct-ch23-14-verse'],
      ['twenty-four-condition', 'bpct-ch24-20-commentary', 'bpct-ch24-20-rendering'],
      ['twenty-five-remedies', 'bpct-ch25-18-rendering', 'bpct-ch25-18-verse'],
      ['twenty-five-remedies', 'bpct-ch25-28-verse', 'bpct-ch25-28-rendering'],
    ] as const;
    for (const [name, claimSuffix, evidenceSuffix] of comparisons) {
      const claim = record(name).claims.find(c => c.id.endsWith(claimSuffix))!;
      expect(claim.citationIds).toContain(`citation-${claimSuffix}`);
      expect(claim.citationIds).toContain(`citation-${evidenceSuffix}`);
    }
  });

  it('preserves illness question roles, rescue qualifications and actual repeated14', () => {
    expect(text('twenty-four-condition', 'bpct-ch24-01-commentary')).toMatch(
      /cha mẹ\/chồng.*khắc Phu.*Nguyên.*Phụ/,
    );
    expect(text('twenty-four-condition', 'bpct-ch24-07-commentary')).toMatch(
      /anh em lại cần Phụ động/,
    );
    expect(text('twenty-four-condition', 'bpct-ch24-12-commentary')).toMatch(
      /Kỵ\/hồi đầu khắc.*không mọi Quan.*Nhật\/Nguyệt\/động cứu/,
    );
    expect(text('twenty-four-condition', 'bpct-ch24-14-commentary')).toMatch(/lặp.*13/);
    expect(text('twenty-four-condition', 'bpct-ch24-18-commentary')).toMatch(
      /cha mẹ, quan lớn, chồng.*phục và Không/,
    );
    expect(text('twenty-four-condition', 'bpct-ch24-20-commentary')).toMatch(
      /không xung khắc.*không chèn bỏ chữ không/,
    );
    expect(text('twenty-four-condition', 'bpct-ch24-22-commentary')).toMatch(
      /Hằng.*tam\/ngũ Quan.*tứ Ngọ Tử.*không tiên lượng/,
    );
    expect(text('twenty-four-condition', 'bpct-ch24-26-commentary')).toMatch(
      /hẹp=Tử, rộng=Nguyên.*Kỵ không phải Quan/,
    );
  });

  it('does not smooth out Y Dược alternatives or validate treatment efficacy', () => {
    expect(text('twenty-five-remedies', 'bpct-ch25-18-verse')).toMatch(/Sửu Dần/);
    expect(text('twenty-five-remedies', 'bpct-ch25-18-rendering')).toMatch(/Sửu Mùi.*khác/);
    expect(text('twenty-five-remedies', 'bpct-ch25-19-commentary')).toMatch(
      /Tài không động không đoán ẩu.*khác Mộc\/Thuỷ.*không khuyên kiêng/,
    );
    expect(text('twenty-five-remedies', 'bpct-ch25-24-commentary')).toMatch(
      /Mộc kỵ hàn.*Mộc kỵ phong.*Không sửa.*hành khác/,
    );
    expect(text('twenty-five-remedies', 'bpct-ch25-28-verse')).toMatch(
      /không muốn.*nghĩa Việt\/bình.*khác biệt chưa giải quyết/,
    );
    expect(text('twenty-five-remedies', 'bpct-ch25-closing-commentary')).toMatch(
      /tự khẳng định nguồn.*chưa bằng chứng hiệu nghiệm/,
    );
  });

  it('distinguishes absent travellers from letter questions and timing from calendars', () => {
    expect(text('twenty-six-travellers', 'bpct-ch26-01-commentary')).toMatch(/ngoài Lục thân Ứng/);
    expect(text('twenty-six-travellers', 'bpct-ch26-10-commentary')).toMatch(
      /Dụng cũng Không.*không bỏ Dụng/,
    );
    expect(text('twenty-six-travellers', 'bpct-ch26-13-commentary')).toMatch(
      /Phi không Không.*Phi Không.*Không trộn xung Phi với xung Dụng/,
    );
    expect(text('twenty-six-travellers', 'bpct-ch26-25-commentary')).toMatch(
      /cáo buộc nguồn.*không căn cứ nhận dạng\/buộc tội/,
    );
    expect(text('twenty-six-travellers', 'bpct-ch26-30-commentary')).toMatch(
      /hỏi thư lấy Phụ.*khác hỏi người đi/,
    );
    expect(text('twenty-six-travellers', 'bpct-ch26-31-commentary')).toMatch(
      /Không xuất tuần.*Mộ xung mở.*không thuật toán lịch/,
    );
  });

  it('releases only source-compared records and leaves audit/certification closed', () => {
    const articles = chapters.map(([, name]) => record(name));
    expect(articles.reduce((n, r) => n + r.claims.length, 0)).toBe(379);
    expect(citations.citations).toHaveLength(379);
    for (const r of articles) {
      expect(manifest.releaseIds).toContain(r.id);
      expect(r.review.status).toBe('reviewed');
      expect(r.review.method).toBe('source-comparison');
      expect(r.review.note).toMatch(/all32 individual images/);
      expect(r.review.note).toMatch(/feat-089 audit.*remain open/);
      expect(r.rights.basis).toBe('original-summary-and-structured-facts');
    }
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(audit.complete).toBe(false);
    expect(manifest.nextBatch.note).toMatch(/feat-056.*PDF302–364/);
  });
});
