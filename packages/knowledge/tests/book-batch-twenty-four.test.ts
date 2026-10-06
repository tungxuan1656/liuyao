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
});
