import { describe, expect, it } from 'vitest';
import locators from './fixtures/nhl-pbc-he-tu-ha-locators.json';
import inspection from '../../../docs/reviews/knowledge/feat-062-page-inspection.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord, getBookSource } from '../src/index';

const unit = (id: string) => locators.find(u => u.id === id)!;
const text = (id: string) => {
  const u = unit(id);
  return getBookRecord(u.recordIds[0]!)!.claims.find(c => c.id === u.claimIds[0])!.text;
};

// Explicit intervals include shared pages and absence/referral notices; chapter
// numbering alone cannot establish source-layer coverage across editions.
const chapterPages = {
  nhl: [
    [363, 364],
    [365, 368],
    [369, 369],
    [370, 370],
    [371, 375],
    [376, 377],
    [378, 379],
    [380, 381],
    [382, 383],
    [384, 384],
    [385, 385],
    [386, 388],
  ],
  pbc: [
    [631, 631],
    [632, 633],
    [634, 634],
    [635, 635],
    [636, 636],
    [636, 637],
    [638, 640],
    [641, 642],
    [643, 643],
    [644, 644],
    [645, 645],
    [645, 648],
  ],
};
const nhlLabels = [
  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'],
  ['01', '02', '03', '04'],
  ['01', '02', '03'],
  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
  ['01', '02', '03', '04'],
  ['01', '02', '03', '04'],
  ['01', '02', '03a', '03b'],
  ['01', '02', '03', '04', '05', '06'],
  ['01', '02'],
  ['01'],
  ['01', '02', '03', '04', '05', '06', '07'],
];
const pbcLabels = [
  ['10'],
  ['01', '03-and-05'],
  [],
  [],
  [],
  ['01', '02', '04'],
  ['01', '02', '03', '04'],
  ['01', '04'],
  [],
  ['01-and-02-sentence'],
  ['01'],
  ['01', '05', '06', '07'],
];

describe('feat-062 NHL/PBC He Tu Ha source dispositions', () => {
  it.each(locators)('exports each inspected disposition with exact evidence: $id', u => {
    expect(registry.groups.find(g => g.id === u.id)).toMatchObject({
      parentId: u.parentId,
      kind: u.kind,
      editionId: `edition-${u.book}-supplied`,
      pdfPageStart: u.pdfPages[0],
      pdfPageEnd: u.pdfPages[1],
      authorFeatureId: 'feat-062',
      auditFeatureId: 'feat-092',
      discoveryStatus: 'unresolved',
      recordIds: u.recordIds,
    });
    const owner = getBookRecord(u.recordIds[0]!)!;
    const claim = owner.claims.find(c => c.id === u.claimIds[0])!;
    expect(manifest.releaseIds).toContain(owner.id);
    expect(owner.review.status).toBe('reviewed');
    expect(owner.review.method).toBe('source-comparison');
    expect(claim.attribution?.author).toBe(u.attributedTo);
    expect(claim.conditions?.join(' ')).toContain('không xác minh');
    expect(claim.text).not.toMatch(/[\p{Script=Han}]/u);
    expect(claim.citationIds).toEqual(u.citationIds);
    for (const id of u.citationIds) {
      const c = getBookCitation(id)!;
      expect(c.sourceId).toBe(`source-book-${u.book}`);
      expect(c.editionId).toBe(`edition-${u.book}-supplied`);
      expect(c.attributedTo).toBe(u.attributedTo);
      expect([c.location.pdfPageStart, c.location.pdfPageEnd]).toEqual(u.pdfPages);
      expect(c.location.chapter).toBe(`Hệ Từ Hạ — chương ${u.chapter}`);
      expect(c.location.section).toContain(u.voice);
      expect(owner.review.evidenceCitationIds).toContain(id);
      if (u.book === 'nhl')
        expect([c.location.printedPageStart, c.location.printedPageEnd]).toEqual(u.printedPages);
      else {
        expect(c.location.printedPageStart).toBeUndefined();
        expect(c.location.printedPageEnd).toBeUndefined();
        if (u.voice !== 'original-reading') expect(c.textLayer).toBe('author-commentary');
      }
    }
  });

  it('accounts for all44 individually inspected pages without treating artifact hashes as audit', () => {
    expect(inspection.pages).toHaveLength(44);
    for (const book of ['nhl', 'pbc'] as const) {
      const pages = Array.from(
        { length: book === 'nhl' ? 26 : 18 },
        (_, i) => i + (book === 'nhl' ? 363 : 631),
      );
      const artifacts = inspection.pages.filter(p => p.editionId === `edition-${book}-supplied`);
      expect(artifacts.map(p => p.pdfPage)).toEqual(pages);
      for (const p of artifacts) {
        expect(p.inspectionStatus).toBe('individually-opened-full-page-and-compared-extraction');
        expect([p.width, p.height]).toEqual([918, 1188]);
        expect(p.imageSha256).toMatch(/^[a-f0-9]{64}$/);
        expect(p.textSha256).toMatch(/^[a-f0-9]{64}$/);
        expect(p.editionSha256).toBe(getBookSource(`source-book-${book}`)!.editions[0]!.sha256);
        expect(p.printedPage).toBe(book === 'nhl' ? String(p.pdfPage) : null);
        expect(p.findings.length).toBeGreaterThan(20);
      }
      const covered = new Set(
        locators
          .filter(u => u.book === book)
          .flatMap(u =>
            Array.from(
              { length: u.pdfPages[1]! - u.pdfPages[0]! + 1 },
              (_, i) => i + u.pdfPages[0]!,
            ),
          ),
      );
      expect([...covered].sort((a, b) => a - b)).toEqual(pages);
      chapterPages[book].forEach((p, i) => {
        const suffix = String(i + 1).padStart(2, '0');
        expect(registry.groups.find(g => g.id === `${book}-he-tu-ha-${suffix}`)).toMatchObject({
          pdfPageStart: p[0],
          pdfPageEnd: p[1],
          recordIds: [`article-${book}-he-tu-ha-${suffix}`],
          authorFeatureId: 'feat-062',
          auditFeatureId: 'feat-092',
          discoveryStatus: 'unresolved',
        });
      });
    }
    expect(new Set(locators.flatMap(u => u.recordIds)).size).toBe(24);
    expect(locators.every(u => u.book === 'nhl' || u.book === 'pbc')).toBe(true);
  });

  it('preserves the complete NHL roster and only the actual PBC selected readings', () => {
    for (const book of ['nhl', 'pbc'] as const) {
      const labels = book === 'nhl' ? nhlLabels : pbcLabels;
      labels.forEach((sections, i) => {
        const parentId = `${book}-he-tu-ha-${String(i + 1).padStart(2, '0')}`;
        const originals = locators.filter(
          u => u.parentId === parentId && /section-.*-original-reading$/.test(u.id),
        );
        expect(originals.map(u => u.id)).toEqual(
          sections.map(s => `${parentId}-section-${s}-original-reading`),
        );
        if (book === 'nhl')
          for (const s of sections)
            expect(unit(`${parentId}-section-${s}-translation`)).toBeDefined();
      });
    }
    for (const ch of [3, 4, 9]) {
      const suffix = String(ch).padStart(2, '0');
      expect(text(`pbc-he-tu-ha-${suffix}-missing-notice`)).toContain('Khuyết');
      expect(text(`pbc-he-tu-ha-${suffix}-missing-notice`)).toContain('không lấy');
    }
    expect(text('nhl-he-tu-ha-09-pbc-omission-report')).toContain('sáu tiết');
    expect(text('pbc-he-tu-ha-01-selection-notice')).toContain('1–9');
    expect(text('pbc-he-tu-ha-02-selection-notice')).toContain('ghép3/5');
    expect(text('pbc-he-tu-ha-06-selection-notice')).toContain('1,2,4');
    expect(text('pbc-he-tu-ha-08-selection-notice')).toContain('1 và4');
    expect(text('pbc-he-tu-ha-10-selection-notice')).toContain('không thêm nhãn2');
    expect(text('pbc-he-tu-ha-12-selection-notice')).toContain('1,5,6,7');
    expect(locators.filter(u => u.book === 'pbc' && u.voice === 'translation')).toHaveLength(0);
  });

  it('separately attributes eleven NHL Kinh quotations and PBC referral-only positions', () => {
    for (const s of ['01', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14']) {
      expect(unit(`nhl-he-tu-ha-05-section-${s}-kinh-quotation`).attributedTo).toContain(
        'Văn Vương/Chu Công',
      );
      const c = unit(`nhl-he-tu-ha-05-section-${s}-confucius-comment`);
      expect(c.attributedTo).toContain(s === '13' ? 'nghi thiếu' : 'truyền gán');
    }
    const referrals = locators.filter(
      u => u.parentId === 'pbc-he-tu-ha-05' && u.id.includes('-referral-'),
    );
    expect(referrals).toHaveLength(11);
    for (const u of referrals) {
      expect(u.pdfPages).toEqual([636, 636]);
      expect(u.disposition).toBe('source-reported represented elsewhere; referral only');
      expect(text(u.id)).toContain('không mới audit attachment');
    }
    expect(text('pbc-he-tu-ha-05-referral-ich-06')).toContain('Thượng Cửu Ích');
    expect(text('nhl-he-tu-ha-05-s14-line-label')).toContain('hào5 Ích');
  });

  it('retains source ambiguities,duplicate labels and alternative voices without repairing text', () => {
    expect(text('nhl-he-tu-ha-02-s01-pbc-selection-report')).toContain('nhãn ghép3/5');
    expect(text('nhl-he-tu-ha-05-s13-doubt')).toContain('Tốn3');
    expect(text('nhl-he-tu-ha-08-section-03b-translation')).toContain('Không sửa nhãn');
    expect(text('pbc-he-tu-ha-11-reading-hung-versus-meaning')).toContain('hung');
    expect(text('nhl-he-tu-ha-12-s06-pbc-alternative')).toContain('tình người');
    expect(text('nhl-he-tu-ha-12-s06-wilhelm-alternative')).toContain('điều kiện');
    expect(text('nhl-he-tu-ha-12-s06-legge-comparison')).toContain('quan hệ hào');
    expect(text('nhl-he-tu-ha-06-s03-copy-doubts')).toContain('không phục hồi');
    const names = new Set(locators.map(u => u.attributedTo));
    for (const n of [
      'Nguyễn Hiến Lê',
      'Phan Bội Châu',
      'Chu Hi',
      'R. Wilhelm',
      'J. Legge',
      'Từ Hải — NHL dẫn',
      'Mạnh Tử — PBC dẫn',
      'Luận Ngữ — lời PBC dẫn',
      'Hán Thư — lời PBC dẫn về Lưu Hầu (Trương Tử Phòng)',
    ])
      expect(names.has(n)).toBe(true);
    for (const s of ['02', '03', '04'])
      for (const q of ['ly', 'khiem', 'phuc', 'hang', 'ton', 'ich', 'khon', 'tinh', 'ton-wind'])
        expect(unit(`pbc-he-tu-ha-07-s${s}-${q}`)).toBeDefined();
  });

  it('exports the printed symbol as inspected,not a repaired Du or source image', () => {
    const r = getBookRecord('article-nhl-he-tu-ha-02')!;
    expect(r.schemaVersion).toBe(2);
    if (r.schemaVersion !== 2) throw new Error('Expected authored V2 figure owner');
    const f = r.figures![0]!;
    const u = unit('nhl-he-tu-ha-02-printed-symbol');
    expect(f.kind).toBe('placement');
    expect(f.inspectionStatus).toBe('visually-inspected');
    expect(f.sourceUnitIds).toEqual([u.id]);
    expect(f.claimIds).toEqual(u.claimIds);
    expect(f.labels.map(l => l.text)).toEqual(
      [1, 2, 3, 4, 5, 6].map(
        i => `Vạch${i} từ dưới: ${i === 2 || i === 4 ? 'dương/liền' : 'âm/đứt'}`,
      ),
    );
    expect(f.labels.every(l => l.claimIds[0] === u.claimIds[0])).toBe(true);
    expect(f.orientation?.description).toContain('Không đổi thành Dự');
    expect(text(u.id)).toContain('hình Giải');
  });

  it('leaves source audit,global roster and certification gates closed', () => {
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(audit.complete).toBe(false);
    expect(registry.exclusions).toHaveLength(17);
    expect(registry.layers.every(l => l.rosterStatus === 'unresolved')).toBe(true);
  });
});
