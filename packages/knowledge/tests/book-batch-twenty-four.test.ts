import { describe, expect, it } from 'vitest';
import locators from './fixtures/bpct-questions-ha-tri-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord } from '../src/index';

const record = (q: number) => getBookRecord(`article-bpct-question-${String(q).padStart(2, '0')}`)!;
const text = (q: number, suffix: string) => record(q).claims.find(c => c.id.endsWith(suffix))!.text;
const unit = (id: string) => locators.find(u => u.id === id)!;

describe('feat-057 question, experiment, chart and source-layer locators', () => {
  it.each(locators)('preserves the inspected disposition and evidence for $id', u => {
    const owner = getBookRecord(u.recordId)!;
    expect(registry.groups.find(g => g.id === u.id)).toMatchObject({
      parentId: u.parentId,
      pdfPageStart: u.pdfPages[0],
      pdfPageEnd: u.pdfPages[1],
      authorFeatureId: 'feat-057',
      auditFeatureId: 'feat-091',
      discoveryStatus: 'unresolved',
    });
    expect(manifest.releaseIds).toContain(owner.id);
    for (const id of u.claimIds) {
      const c = owner.claims.find(c => c.id === id)!;
      expect(c.kind).toBe('author-interpretation');
      expect(c.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(c.attribution?.author).toBeTruthy();
      for (const cid of c.citationIds) {
        expect(getBookCitation(cid)).toBeDefined();
        expect(owner.review.evidenceCitationIds).toContain(cid);
      }
    }
    for (const id of u.citationIds) {
      const citation = getBookCitation(id)!;
      expect(citation.editionId).toBe('edition-bpct-supplied');
      // Old selected citations intentionally cover a wider passage than the reused claim.
      if (!u.voice.endsWith('-reused')) {
        expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(u.pdfPages);
        expect([citation.location.printedPageStart, citation.location.printedPageEnd]).toEqual(
          u.pdfPages.map(p => String(p - (p <= 413 ? 47 : 39))),
        );
        const layer =
          u.voice === 'translator-note'
            ? 'translator-note'
            : ['verse', 'meaning', 'heading', 'chart-observation'].includes(u.voice)
              ? 'original-text'
              : u.voice === 'supplement'
                ? 'supplement'
                : u.id.endsWith('critical-note')
                  ? 'translator-note'
                  : 'author-commentary';
        expect(citation.textLayer).toBe(layer);
      }
    }
  });

  it('reuses selected answers without rewriting or duplicating them', () => {
    expect(unit('bpct-question-05-answer').claimIds).toEqual([
      'article-reverse-chant-context-useful-spirit',
    ]);
    expect(record(5).claims.some(c => c.id.endsWith('bpct-question-05-answer'))).toBe(false);
    expect(text(6, 'bpct-question-06-answer')).toMatch(/nội Phản ngâm.*không tự sửa/);
    expect(unit('bpct-question-01-example-03').pdfPages).toEqual([365, 366]);
    expect(unit('bpct-question-01-example-03-chart').pdfPages).toEqual([365, 365]);
    expect(unit('bpct-question-05-example-05-chart').pdfPages).toEqual([377, 377]);
    expect(text(1, 'example-04-chart')).toMatch(/nhãn Dậu thay tên Lục thân/);
    expect(text(4, 'example-08-chart')).toMatch(/nét thừa.*không dựng hào thứ bảy/);
    expect(text(4, 'example-12-experiment')).toMatch(/vợ người khác.*Không hướng dẫn hụi/);
  });

  it('releases source comparison without source-audit or certification approval', () => {
    const articles = manifest.releaseIds.filter(id =>
      /^article-bpct-(question-\d+|ha-tri|moving-lines-insertion)$/.test(id),
    );
    for (const id of articles) {
      const r = getBookRecord(id)!;
      expect(r.review.method).toBe('source-comparison');
      expect(r.review.note).toMatch(/individually opened full-page images/);
      expect(r.review.note).toMatch(/feat-091 audit.*remain open/);
      expect(r.rights.basis).toBe('original-summary-and-structured-facts');
      for (const c of r.claims) {
        expect(c.conditions?.join(' ')).toMatch(/không phải kết quả thực chứng/);
        expect(c.conditions?.join(' ')).toMatch(/Không dùng làm phép lịch/);
      }
    }
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(audit.complete).toBe(false);
    expect(registry.exclusions).toHaveLength(17);
  });

  it('keeps failed timing, role differences and reused Tiến/Thoái evidence', () => {
    expect(unit('bpct-question-10-answer').claimIds).toHaveLength(4);
    expect(record(10).claims.some(c => c.id.endsWith('bpct-question-10-answer'))).toBe(false);
    expect(text(7, 'example-10-experiment')).toMatch(/Canh Thân không thấy.*Nhâm Thân mới thấy/);
    expect(text(7, 'example-14-experiment')).toMatch(/Ất Mão không mưa.*Tân Dậu/);
    expect(text(7, 'example-03-chart')).toMatch(/Sửu Tử nhị ghi Thế.*không sửa/);
    expect(text(7, 'note-14')).toMatch(/khác lý do tác giả/);
    expect(text(9, 'example-07-experiment')).toMatch(/câu chuyện thứ hai riêng/);
    expect(locators.some(u => u.id === 'bpct-question-09-example-06-chart')).toBe(false);
    expect(locators.some(u => u.id === 'bpct-question-09-example-07-chart')).toBe(false);
    expect(text(12, 'example-07-chart')).toMatch(/đều in Ứng.*giữ hai Ứng/);
    expect(text(12, 'example-07-experiment')).toMatch(/đã biết tin.*đùa bói/);
    expect(text(12, 'note-04')).toMatch(/không rõ ai hỏi.*không suy mẹ chết/);
    expect(unit('bpct-question-12-note-02').pdfPages).toEqual([394, 394]);
    expect(text(12, 'note-08')).toMatch(/khác tác giả hôm sau sinh/);
  });

  it('keeps Q13–18 disagreement, label defects and the unsigned insertion separate', () => {
    expect(unit('bpct-question-13-note-09').claimIds).toEqual([
      'article-combination-opposition-turnarounds-translator-disagreement',
    ]);
    expect(text(13, 'example-07-experiment')).toMatch(/chưa chết hôm nay.*chết Thìn ngay hôm nay/);
    expect(text(13, 'example-09-chart')).toMatch(/đều in Thế.*không chọn sửa/);
    expect(text(14, 'critical-note')).toMatch(/Tí→Mão→Ngọ.*Mùi–Thìn/);
    expect(text(14, 'critical-note')).toMatch(/không đầy đủ Q14/);
    expect(text(16, 'query')).toMatch(/mười sau.*không sửa nhãn/);
    expect(text(16, 'example-01-chart')).toMatch(/hoá Thìn.*không tự bỏ biến/);
    expect(text(16, 'example-04-experiment')).toMatch(/nên nên chôn.*không đoán sửa phủ định/);
    expect(text(18, 'answer')).toMatch(/không chứng minh người hỏi có lỗi/);
    expect(text(18, 'example-01-experiment')).toMatch(/không về.*bình an/);
    const insertion = getBookRecord('article-bpct-moving-lines-insertion')!;
    expect(insertion.claims).toHaveLength(18);
    expect(insertion.claims.every(c => c.attribution?.author.includes('không ký tên'))).toBe(true);
    expect(insertion.claims.find(c => c.id.endsWith('4-example'))?.text).toMatch(
      /mâu thuẫn sơ đang động/,
    );
    expect(insertion.claims.find(c => c.id.endsWith('6-rule'))?.text).toMatch(
      /không xác định rõ.*gốc hay biến/,
    );
    expect(registry.groups.find(g => g.id === 'bpct-moving-lines-insertion')).toMatchObject({
      parentId: 'bpct-part2-ch01-questions',
      layerScopeIds: ['layer-bpct-uncredited-supplement'],
    });
  });
});
