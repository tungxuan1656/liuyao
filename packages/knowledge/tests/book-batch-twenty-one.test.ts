import { describe, expect, it } from 'vitest';
import locators from './fixtures/bpct-housing-boats-xuong-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import citations from '../data/citations/batch-twenty-one-advanced.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import coverage from '../reports/coverage.json';
import { getBookCitation, getBookRecord } from '../src/index';

const chapters = [
  ['20', 'twenty-housing', 231, 250],
  ['20-supplement', 'twenty-supplement', 251, 262],
  ['21', 'twenty-one-boats', 263, 265],
  ['22', 'twenty-two-xuong-gia', 266, 269],
] as const;

const record = (name: string) => getBookRecord(`article-bpct-chapter-${name}`)!;
const text = (name: string, suffix: string) =>
  record(name).claims.find(c => c.id.endsWith(suffix))!.text;

describe('feat-054 source-mapped layers and public projection', () => {
  it.each(locators)('preserves every actual layer and exact locator of $id', unit => {
    const article = getBookRecord(unit.recordId)!;
    const note = unit.id.includes('-note-');
    const supplement = unit.chapter === '20-supplement';
    const layers = [];
    const pages = [unit.originalReadingPages, unit.meaningPages, unit.commentaryPages]
      .filter(p => p !== null)
      .flat();
    if (unit.originalReadingPages) layers.push('layer-bpct-original-text');
    if (unit.meaningPages) layers.push('layer-bpct-translation');
    if (unit.commentaryPages)
      layers.push(
        note
          ? 'layer-bpct-translator-note'
          : supplement
            ? 'layer-bpct-uncredited-supplement'
            : 'layer-bpct-author-commentary',
      );
    expect(registry.groups.find(g => g.id === unit.id)).toMatchObject({
      parentId: unit.parentId,
      kind: unit.kind,
      pdfPageStart: Math.min(...pages),
      pdfPageEnd: Math.max(...pages),
      authorFeatureId: 'feat-054',
      auditFeatureId: 'feat-088',
      layerScopeIds: layers,
      discoveryStatus: 'unresolved',
      recordIds: [unit.recordId],
    });
    for (const [suffix, bounds, layer] of [
      ['verse', unit.originalReadingPages, 'original-text'],
      ['rendering', unit.meaningPages, 'original-text'],
      [
        note ? 'discussion' : 'commentary',
        unit.commentaryPages,
        note ? 'translator-note' : supplement ? 'supplement' : 'author-commentary',
      ],
    ] as const) {
      const claim = article.claims.find(c => c.id === `${article.id}-${unit.id}-${suffix}`);
      if (!bounds) {
        expect(claim).toBeUndefined();
        continue;
      }
      expect(claim).toBeDefined();
      expect(claim!.kind).toBe('author-interpretation');
      expect(claim!.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(claim!.conditions?.join(' ')).toMatch(/không phải kết quả thực chứng/);
      expect(claim!.conditions?.join(' ')).toMatch(/không dùng làm phép lịch/);
      if (suffix === 'rendering') {
        expect(claim!.attribution?.author).toBe('Vĩnh Cao — nghĩa tiếng Việt');
      } else if (suffix === 'discussion') {
        expect(claim!.attribution?.author).toBe('Vĩnh Cao');
      } else if (supplement) {
        expect(claim!.attribution?.author).toMatch(/không ký tên riêng/);
        expect(claim!.attribution?.via).toMatch(/chưa xác lập|không bảo đảm/);
      } else if (suffix === 'verse') {
        expect(claim!.attribution?.author).toMatch(/tín chỉ chung Lưu Bá Ôn/);
        expect(claim!.attribution?.via).toMatch(/chưa xác lập tác giả riêng/);
      } else {
        expect(claim!.attribution?.author).toBe('Vương Hồng Tự');
        expect(claim!.attribution?.via).toMatch(/không bảo đảm từng đoạn/);
      }
      for (const id of claim!.citationIds) {
        const citation = getBookCitation(id)!;
        expect(citation.editionId).toBe('edition-bpct-supplied');
        expect(citation.textLayer).toBe(layer);
        expect(citation.attributedTo).toBe(claim!.attribution?.author);
        expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(bounds);
        // Folios are piecewise: the supplement and next chapters restart shared labels.
        const offset =
          unit.chapter === '20'
            ? 34
            : unit.chapter === '20-supplement'
              ? 36
              : unit.chapter === '21'
                ? 37
                : 38;
        expect([citation.location.printedPageStart, citation.location.printedPageEnd]).toEqual(
          bounds.map(p => String(p - offset)),
        );
        expect(article.review.evidenceCitationIds).toContain(id);
      }
    }
  });

  it('preserves four parent bounds, actual numbering and non-empty boundary pages', () => {
    for (const [chapter, name, start, end] of chapters) {
      expect(registry.groups.find(g => g.id === `bpct-part1-ch${chapter}`)).toMatchObject({
        pdfPageStart: start,
        pdfPageEnd: end,
        discoveryStatus: 'unresolved',
        recordIds: [record(name).id],
      });
    }
    expect(locators).toHaveLength(185);
    expect(locators.filter(u => u.id.includes('-note-'))).toHaveLength(18);
    expect(locators.some(u => u.id === 'bpct-ch20-supplement-28')).toBe(false);
    expect(locators.find(u => u.id === 'bpct-ch20-supplement-37')?.meaningPages).toBeNull();
    expect(locators.find(u => u.id === 'bpct-ch20-73')).toMatchObject({
      originalReadingPages: [245, 245],
      meaningPages: [246, 246],
      commentaryPages: null,
    });
    expect(locators.filter(u => u.id.startsWith('bpct-ch20-boat-'))).toHaveLength(21);
    expect(
      locators
        .filter(u => u.id.startsWith('bpct-ch20-boat-'))
        .every(u => u.commentaryPages === null),
    ).toBe(true);
    expect(locators.find(u => u.id === 'bpct-ch21-08')?.commentaryPages).toEqual([265, 265]);
    expect(locators.find(u => u.id === 'bpct-ch22-15')?.commentaryPages).toBeNull();
    expect(locators.every(u => u.kind === 'content')).toBe(true);
  });
});

describe('feat-054 housing source alternatives and questions', () => {
  it('keeps original/commentary differences and translator doubts without repair', () => {
    expect(text('twenty-housing', 'bpct-ch20-07-commentary')).toMatch(
      /Đế Vượng.*Trường Sinh.*không đồng nhất/,
    );
    expect(text('twenty-housing', 'bpct-ch20-10-commentary')).toMatch(
      /Sửu.*Mão.*Thìn.*Ngọ.*không bổ/,
    );
    expect(text('twenty-housing', 'bpct-ch20-note-02-discussion')).toMatch(
      /nạp âm.*thay vì hào Thế.*bất đồng/,
    );
    expect(text('twenty-housing', 'bpct-ch20-note-04-discussion')).toMatch(
      /29\/30.*người sau.*sau bình31.*không sửa/,
    );
    expect(text('twenty-housing', 'bpct-ch20-32-commentary')).toMatch(
      /Quan trì Thế.*cũng tốt.*riêng Tài trì Thế/i,
    );
    expect(text('twenty-housing', 'bpct-ch20-35-commentary')).toMatch(/dấu hỏi.*Không bỏ/);
    expect(text('twenty-housing', 'bpct-ch20-43-verse')).toMatch(/bụng rắn.*nghĩa Việt.*ra rắn/);
    expect(text('twenty-housing', 'bpct-ch20-54-commentary')).toMatch(/cùng chi.*không dự báo/i);
    expect(text('twenty-housing', 'bpct-ch20-68-commentary')).toMatch(
      /Hình thiếu Nhẫn.*Nhẫn thiếu Hình.*Tử động/,
    );
    expect(text('twenty-housing', 'bpct-ch20-68-verse')).toMatch(
      /nghĩa Việt.*không Nhẫn.*khác lớp/,
    );
    expect(text('twenty-housing', 'bpct-ch20-note-08-discussion')).toMatch(
      /không đưa đủ bốn nhóm.*không bổ/,
    );
  });
  it('does not flatten nested boat parts into chapter21 or safety assurance', () => {
    expect(text('twenty-housing', 'bpct-ch20-boat-06-verse')).toMatch(/xiên đâm.*không.*dây neo/);
    expect(text('twenty-housing', 'bpct-ch20-boat-11-verse')).toMatch(
      /chèo\/mái che.*không ép.*bánh lái/,
    );
    expect(text('twenty-housing', 'bpct-ch20-boat-19-verse')).toMatch(/lục cửa lái.*khác lục chèo/);
    expect(text('twenty-housing', 'bpct-ch20-boat-20-verse')).toMatch(
      /lời của nguồn.*không.*an toàn/,
    );
  });
});

describe('feat-054 supplement attribution and role criticisms', () => {
  it('keeps missing28, source/reading disagreements and position-role objections', () => {
    expect(text('twenty-supplement', 'bpct-ch20-supplement-01-verse')).toMatch(
      /Thuỷ.*phi Quỷ.*nghĩa Việt/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-16-commentary')).toMatch(
      /bác cổ pháp nhị.*mẹ.*Dụng theo quan hệ/i,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-25-commentary')).toMatch(
      /Quan động khắc Huynh.*Phụ Không/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-33-commentary')).toMatch(
      /không cửa lớn hoặc cửa hư.*thêm của bình/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-34-commentary')).toMatch(
      /bác Dịch Lâm Bổ Di/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-36-commentary')).toMatch(
      /động khắc Trạch.*không nên.*tĩnh\/động/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-41-commentary')).toMatch(
      /ngũ không mặc định cha.*Phụ/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-45-commentary')).toMatch(
      /Quái thân.*không đổi/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-47-verse')).toMatch(
      /Quỷ.*nghĩa Việt.*Phụ/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-note-01-discussion')).toMatch(
      /Trục.*Tuỳ.*không giả/,
    );
    expect(text('twenty-supplement', 'bpct-ch20-supplement-note-inline-40-discussion')).toMatch(
      /đa nghĩa.*không.*bạo lực/,
    );
  });
});

describe('feat-054 trading boats and historical Xướng Gia', () => {
  it('preserves boat-question roles and conditional favourable Bạch Hổ', () => {
    expect(text('twenty-one-boats', 'bpct-ch21-opening-verse')).toMatch(/mua.*thuyền buôn/);
    expect(text('twenty-one-boats', 'bpct-ch21-opening-commentary')).toMatch(
      /chủ thuyền.*Gia Trạch.*không.*phép này/i,
    );
    expect(text('twenty-one-boats', 'bpct-ch21-02-commentary')).toMatch(/Kim.*Thổ.*Mộc.*Thuỷ.*Hoả/);
    expect(text('twenty-one-boats', 'bpct-ch21-04-commentary')).toMatch(
      /Phụ làm thuyền.*Phụ làm lái/,
    );
    expect(text('twenty-one-boats', 'bpct-ch21-07-commentary')).toMatch(
      /Bạch Hổ.*Tài\/Phúc.*Hổ hung.*Phản Ngâm/,
    );
  });
  it('preserves missing original word, Tử exceptions, literal Huynh and non-advice', () => {
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-opening-commentary')).toMatch(
      /Thế là chủ.*Ứng là khách/,
    );
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-note-01-discussion')).toMatch(
      /thiếu.*thêm Bản.*không tái dựng/,
    );
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-06-commentary')).toMatch(
      /Quan động thì Tử.*nên động.*ngoại lệ/,
    );
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-07-commentary')).toMatch(
      /vẫn tốt dù động.*mới gọi Quỷ sát/,
    );
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-09-commentary')).toMatch(
      /được sinh phò.*không đủ.*Không đảo/,
    );
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-10-commentary')).toMatch(/Tĩnh khác phục/);
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-11-commentary')).toMatch(
      /hoá Tử hợp Ứng.*hoá Tử sinh Thế.*không gán phẩm giá/i,
    );
    expect(text('twenty-two-xuong-gia', 'bpct-ch22-12-commentary')).toMatch(
      /Không chẩn đoán.*hướng dẫn an toàn/,
    );
  });
});

describe('feat-054 release without audit/certification', () => {
  it('accounts for exact selected claims and preserves unresolved obligations', () => {
    const records = chapters.map(([, name]) => record(name));
    expect(records.reduce((n, r) => n + r.claims.length, 0)).toBe(494);
    expect(citations.citations).toHaveLength(494);
    for (const r of records) {
      expect(manifest.releaseIds).toContain(r.id);
      expect(r.review).toMatchObject({ status: 'reviewed', method: 'source-comparison' });
      expect(r.review.note).toMatch(/every page image individually inspected/);
      expect(r.review.note).toMatch(/No folio-only page/);
      expect(r.review.evidenceCitationIds).toContain(
        'citation-bpct-front-translator-preface-edition',
      );
      expect(JSON.stringify(r)).not.toMatch(/docs\/books\/|\.pdf["']/i);
      expect(r).not.toHaveProperty('tables');
      expect(r).not.toHaveProperty('figures');
    }
    expect(registry.groups.filter(g => g.authorFeatureId === 'feat-054')).toHaveLength(189);
    expect(audit.featureCoverage['feat-088']).toEqual({ required: 189, current: 0 });
    expect(registry.exclusions).toHaveLength(17);
    expect(audit.complete).toBe(false);
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(coverage.records.released).toBe(248);
    expect(coverage.claims.total).toBe(6806);
    expect(coverage.citations.total).toBe(7052);
    expect(manifest.nextBatch.note).toMatch(/feat-056.*PDF302–364/);
  });
});
