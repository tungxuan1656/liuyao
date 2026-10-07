import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import locators from './fixtures/cankhon-special-passages-locators.json';
import prior from './fixtures/cankhon-special-prior-hashes.json';
import inspection from '../../../docs/reviews/knowledge/feat-063-page-inspection.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import audit from '../reports/audit-status.json';
import { getBookRecord, getBookCitation, getBookSource, listBookRecords } from '../src/index';

const claims = (recordId: string) => {
  const r = getBookRecord(recordId)!;
  if (r.type !== 'hexagram' || r.schemaVersion !== 1)
    throw new Error('Expected unchanged V1 special passage owner');
  return [
    ...r.claims,
    ...r.lines.flatMap(l => l.claims),
    ...r.specialPassages.flatMap(s => s.claims),
  ];
};
const unit = (id: string) => locators.find(u => u.id === id)!;
const text = (id: string) => {
  const u = unit(id);
  return claims(u.hexagramId).find(c => c.id === u.claimIds[0])!.text;
};
const canonical = (v: unknown): unknown => {
  if (Array.isArray(v)) return v.map(canonical);
  if (v !== null && typeof v === 'object')
    return Object.fromEntries(
      Object.entries(v)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, x]) => [k, canonical(x)]),
    );
  return v;
};
const hash = (v: unknown) =>
  createHash('sha256')
    .update(JSON.stringify(canonical(v)))
    .digest('hex');

const ownerPages = [
  ['pbc', 1, 41, 42],
  ['pbc', 2, 67, 72],
  ['ntt', 1, 80, 128],
  ['ntt', 2, 129, 154],
  ['nhl', 1, 131, 136],
  ['nhl', 2, 137, 141],
] as const;

describe('feat-063 edition-specific Càn/Khôn special passages', () => {
  it.each(locators)('exports each scoped occurrence and layer: $id', u => {
    expect(registry.groups.find(g => g.id === u.id)).toMatchObject({
      parentId: u.parentId,
      editionId: `edition-${u.book}-supplied`,
      pdfPageStart: u.pdfPages[0],
      pdfPageEnd: u.pdfPages[1],
      authorFeatureId: 'feat-063',
      auditFeatureId: 'feat-068',
      discoveryStatus: 'unresolved',
      layerScopeIds: u.layerScopeIds,
      recordIds: u.recordIds,
    });
    const r = getBookRecord(u.hexagramId)!;
    expect(r.review.status).toBe('reviewed');
    expect(r.review.method).toBe('source-comparison');
    expect(r.type).toBe('hexagram');
    if (r.type !== 'hexagram') throw new Error('Expected hexagram');
    expect(r.specialPassages.some(s => s.id === u.specialId)).toBe(true);
    for (const id of u.claimIds) {
      const c = claims(u.hexagramId).find(c => c.id === id)!;
      expect(c).toBeDefined();
      if (!u.disposition.startsWith('reused')) {
        expect(c.attribution?.author).toBe(u.attributedTo);
        expect(c.conditions?.join(' ')).toContain('không xác minh');
        expect(c.text).not.toMatch(/[\p{Script=Han}]/u);
        if (u.book === 'ntt' && c.attribution?.author !== 'Ngô Tất Tố')
          expect(c.attribution?.via).toBe('Ngô Tất Tố — dịch và chú giải');
      }
      for (const id of u.citationIds) {
        expect(c.citationIds).toContain(id);
        expect(r.review.evidenceCitationIds).toContain(id);
      }
    }
    for (const id of u.citationIds) {
      const c = getBookCitation(id)!;
      expect(c.sourceId).toBe(`source-book-${u.book}`);
      expect(c.editionId).toBe(`edition-${u.book}-supplied`);
      if (!u.disposition.startsWith('reused')) {
        expect([c.location.pdfPageStart, c.location.pdfPageEnd]).toEqual(u.pdfPages);
        expect(c.attributedTo).toBe(u.attributedTo);
      }
      if (u.book === 'nhl')
        expect([c.location.printedPageStart, c.location.printedPageEnd]).toEqual([
          String(c.location.pdfPageStart),
          String(c.location.pdfPageEnd),
        ]);
      else {
        expect(c.location.printedPageStart).toBeUndefined();
        expect(c.location.printedPageEnd).toBeUndefined();
      }
    }
  });

  it.each(ownerPages)(
    'binds %s special owner %i without shrinking assigned context',
    (b, q, a, z) => {
      const id = `${b}-cankhon-special-${String(q).padStart(2, '0')}`;
      expect(registry.groups.find(g => g.id === id)).toMatchObject({
        pdfPageStart: a,
        pdfPageEnd: z,
        authorFeatureId: 'feat-063',
        auditFeatureId: 'feat-068',
        recordIds: [`hexagram-${String(q).padStart(2, '0')}`],
        discoveryStatus: 'unresolved',
      });
      expect(
        registry.specialPassages.find(
          s => s.id === `special-${b}-hexagram-${String(q).padStart(2, '0')}`,
        ),
      ).toMatchObject({
        sourceUnitId: `${b}-hexagram-${String(q).padStart(2, '0')}`,
        pdfPageStart: a,
        pdfPageEnd: z,
        auditFeatureId: 'feat-068',
      });
      const pages = inspection.pages.filter(
        p => p.editionId === `edition-${b}-supplied` && p.pdfPage >= a && p.pdfPage <= z,
      );
      expect(pages.map(p => p.pdfPage)).toEqual(Array.from({ length: z - a + 1 }, (_, i) => a + i));
      for (const p of pages) {
        expect(p.inspectionStatus).toBe('individually-opened-full-page-and-compared-extraction');
        expect([p.width, p.height]).toEqual(b === 'ntt' ? [893, 1263] : [918, 1188]);
        expect(p.editionSha256).toBe(getBookSource(`source-book-${b}`)!.editions[0]!.sha256);
        expect(p.imageSha256).toMatch(/^[a-f0-9]{64}$/);
        expect(p.textSha256).toMatch(/^[a-f0-9]{64}$/);
        expect(p.printedPage).toBe(b === 'nhl' ? String(p.pdfPage) : null);
        expect(p.findings.length).toBeGreaterThan(20);
      }
      for (const u of locators.filter(u => u.parentId === id)) {
        expect(u.pdfPages[0]).toBeGreaterThanOrEqual(a);
        expect(u.pdfPages[1]).toBeLessThanOrEqual(z);
      }
    },
  );

  it('preserves all prior claims and non-special fields,including six positions', () => {
    expect(inspection.pages).toHaveLength(94);
    expect(registry.specialPassages).toHaveLength(6);
    expect(
      listBookRecords()
        .filter(r => r.type === 'hexagram')
        .flatMap(r => r.lines.map(l => l.position)),
    ).toHaveLength(384);
    for (const p of prior) {
      const r = getBookRecord(p.recordId)!;
      if (r.type !== 'hexagram') throw new Error('Expected hexagram');
      const fields = r as unknown as Record<string, unknown>;
      for (const [field, digest] of Object.entries(p.unchangedFields))
        expect(hash(fields[field])).toBe(digest);
      expect(r.lines.map(l => l.position)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(r.specialPassages[0]!.id).toBe(p.specialId);
      expect(r.specialPassages[0]!.title).toBe(p.specialTitle);
      for (const c of p.specialClaims)
        expect(hash(claims(p.recordId).find(x => x.id === c.id))).toBe(c.sha256);
    }
  });

  it('retains the complete NTT Văn Ngôn block order and actual missing commentator layers', () => {
    const expected = [
      's1-virtues',
      's1-conduct',
      ...Array.from({ length: 6 }, (_, i) => `s2-0${i + 1}`),
      ...Array.from({ length: 6 }, (_, i) => `s3-0${i + 1}`),
      's3-dung',
      ...Array.from({ length: 6 }, (_, i) => `s4-0${i + 1}`),
      's4-dung',
      's5-nguyen',
      's5-loi-trinh',
      's5-kien-thuy',
      's5-dai-tai',
      ...Array.from({ length: 4 }, (_, i) => `s6-0${i + 1}`),
      's6-dai-nhan',
      's6-khang',
      's6-thanh-nhan',
    ];
    expect(
      locators
        .filter(
          u =>
            u.book === 'ntt' &&
            u.hexagramId === 'hexagram-01' &&
            u.specialId.endsWith('van-ngon') &&
            u.voice === 'original-reading',
        )
        .map(u => u.id),
    ).toEqual(expected.map(s => `ntt-cankhon-special-01-${s}-original-reading`));
    expect(
      locators
        .filter(
          u =>
            u.book === 'ntt' &&
            u.hexagramId === 'hexagram-02' &&
            u.specialId.endsWith('van-ngon') &&
            u.voice === 'original-reading',
        )
        .map(u => u.id),
    ).toEqual(
      ['overview', ...Array.from({ length: 6 }, (_, i) => `line-0${i + 1}`)].map(
        s => `ntt-cankhon-special-02-${s}-original-reading`,
      ),
    );
    expect(
      locators.filter(u => u.id.startsWith('ntt-cankhon-special-01-s4-05-')).map(u => u.voice),
    ).toEqual(['original-reading', 'translation']);
    for (const i of ['03', '04'])
      expect(locators.some(u => u.id === `ntt-cankhon-special-02-line-${i}-chu-hy`)).toBe(false);
    expect(unit('ntt-cankhon-special-02-line-05-dich-truyen').attributedTo).toBe(
      'Dịch truyện — nhãn nguồn NTT',
    );
    expect(locators.some(u => /ntt-cankhon-special-02.*van-ngon.*dung/.test(u.id))).toBe(false);
  });

  it('preserves alternative voices and source uncertainties without harmonizing editions', () => {
    expect(text('ntt-cankhon-special-01-dung-tien-nho-ho-quang')).toContain('quẻ gốc');
    expect(text('ntt-cankhon-special-01-s2-06-chu-hy')).toContain('Chín Năm');
    expect(text('ntt-cankhon-special-01-s6-04-chu-hy')).toContain('trùng');
    expect(text('ntt-cankhon-special-01-s4-04-translation')).toContain('ruộng');
    expect(text('ntt-cankhon-special-02-dung-original-reading')).toContain('nam');
    expect(text('ntt-cankhon-special-02-note-11')).toContain('thêm');
    expect(text('pbc-cankhon-special-02-closing-unsigned-comment')).toContain(
      'Không có tên tác giả',
    );
    expect(text('nhl-cankhon-special-02-line-06-cao-hanh-unclear-glyph')).toContain('trống');
    expect(text('nhl-cankhon-special-02-line-02-nhl-doubt')).toContain('chưa biết đúng');
    for (const s of [
      'chu-hi',
      'legge',
      'wilhelm',
      'pbc-report',
      'cao-hanh',
      'tao-thang',
      'chu-tuan-thanh',
      'vuong-an-thach-do-khiet',
      'ngo-nhan-kiet',
      'nhl-questions',
    ])
      expect(unit(`nhl-cankhon-special-01-dung-${s}`)).toBeDefined();
    for (const s of ['tien-nho', 'cao-hanh', 'tao-thang'])
      expect(unit(`nhl-cankhon-special-02-dung-${s}`)).toBeDefined();
  });

  it('reuses repeated note17 and existing selections without duplicating them', () => {
    const note = unit('ntt-cankhon-special-01-note-17');
    const main = unit('ntt-cankhon-special-01-s5-dai-tai-ho-van-phong');
    expect(note.claimIds).toEqual(main.claimIds);
    expect(claims('hexagram-01').filter(c => c.id === note.claimIds[0])).toHaveLength(1);
    expect(claims('hexagram-01').find(c => c.id === note.claimIds[0])!.citationIds).toEqual([
      ...main.citationIds,
      ...note.citationIds,
    ]);
    expect(locators.filter(u => u.disposition.startsWith('reused selected claim'))).toHaveLength(8);
    expect(
      locators.filter(u => u.disposition.startsWith('reused selection from line')),
    ).toHaveLength(12);
    expect(locators.filter(u => u.book === 'pbc' && u.voice === 'translation')).toHaveLength(0);
    expect(
      locators
        .filter(u => u.book === 'pbc' && u.hexagramId === 'hexagram-01')
        .every(u => u.pdfPages[1]! <= 42),
    ).toBe(true);
  });

  it('exports the separate NHL appendix and leaves audit/certification gates closed', () => {
    expect(text('nhl-cankhon-special-01-appendix-tao-thang')).toContain('dưới Tốn');
    const r = getBookRecord('hexagram-01')!;
    if (r.type !== 'hexagram') throw new Error('Expected hexagram');
    expect(
      r.specialPassages.find(s => s.id === 'hexagram-01-special-phu-luc')!.claims,
    ).toHaveLength(4);
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(audit.complete).toBe(false);
    expect(registry.layers.every(l => l.rosterStatus === 'unresolved')).toBe(true);
    expect(registry.exclusions).toHaveLength(17);
  });
});
