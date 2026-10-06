import { describe, expect, it } from 'vitest';
import registry from '../../../docs/reviews/knowledge/expected-units.json';

// These bounds are observed passage continuations, not inferred neighboring headings.
const boardEnds = [
  [3, 50],
  [7, 51],
  [10, 52],
  [14, 53],
  [21, 55],
  [28, 57],
  [31, 58],
  [35, 59],
  [43, 61],
  [47, 62],
  [51, 63],
  [55, 64],
  [59, 65],
  [63, 66],
];

describe('feat-051 complete BPCT front matter and chapters 1–5', () => {
  it('keeps dependencies, all boards and all discussions as separate audit obligations', () => {
    expect(
      registry.groups.filter(
        g => g.parentId === 'bpct-part1-ch04' && g.id.startsWith('bpct-board-'),
      ),
    ).toHaveLength(64);
    expect(registry.groups.filter(g => g.parentId === 'bpct-part1-ch05')).toHaveLength(19);
    for (const [n, end] of boardEnds) {
      expect(
        registry.groups.find(g => g.id === `bpct-board-${String(n).padStart(2, '0')}`)?.pdfPageEnd,
      ).toBe(end);
    }
    expect(registry.groups.find(g => g.id === 'bpct-ch05-postscript')).toMatchObject({
      pdfPageStart: 74,
      pdfPageEnd: 76,
    });
  });
  it('records the two printed VI units, XXIII–XXV and the folio-only page without inventing doctrine', () => {
    for (const id of ['vi-can', 'vi-chi', 'xxiii', 'xxiv', 'xxv']) {
      expect(registry.groups.find(g => g.id === `bpct-ch01-${id}`)).toBeDefined();
    }
    expect(registry.groups.find(g => g.id === 'bpct-ch02-folio-42')).toMatchObject({
      kind: 'non-content',
      pdfPageStart: 42,
      pdfPageEnd: 42,
    });
    expect(registry.groups.filter(g => g.parentId === 'bpct-front')).toHaveLength(17);
    expect(registry.groups.filter(g => g.parentId === 'bpct-part1-ch03')).toHaveLength(2);
  });
});

// Original summary checks complement corpus schema/link validation.
import front from '../data/liuyao/bpct-front-voices.json';
import foundations from '../data/liuyao/bpct-chapter-one-foundations.json';
import citations from '../data/citations/batch-eighteen-advanced.json';
import { getBookCitation, getBookRecord } from '../src/index';

describe('BPCT front voices and chapter-one evidence', () => {
  it.each([front, foundations])(
    'projects reviewed $id with its own citations and no source images',
    record => {
      expect(getBookRecord(record.id)).toEqual(record);
      expect(record.review.method).toBe('source-comparison');
      for (const claim of record.claims) {
        expect(claim.conditions.join(' ')).toMatch(/không phải kết quả thực chứng/);
        expect(claim.text).not.toMatch(/[\p{Script=Han}]/u);
        for (const id of claim.citationIds) {
          expect(getBookCitation(id)).toBeDefined();
          expect(record.review.evidenceCitationIds).toContain(id);
        }
      }
    },
  );
  it('keeps named voices and all seven front notes independent', () => {
    expect(front.claims.filter(c => c.id.includes('front-note-'))).toHaveLength(7);
    expect(new Set(front.claims.map(c => c.attribution.author))).toContain('Trương Cảnh Tùng');
    expect(front.claims.filter(c => c.id.includes('pham-le-'))).toHaveLength(6);
    expect(front.claims.find(c => c.id.endsWith('credits-phu'))?.text).toMatch(
      /không coi.*từng bài/,
    );
  });
  it('accounts for all observed chapter-one units, complete Nạp âm and six diagram/layout groups', () => {
    const units = registry.groups.filter(g => g.parentId === 'bpct-part1-ch01');
    expect(units).toHaveLength(28);
    for (const unit of units) expect(unit.recordIds).toContain(foundations.id);
    expect(foundations.claims.filter(c => /-pair-\d+$/.test(c.id))).toHaveLength(30);
    expect(foundations.figures).toHaveLength(6);
    for (const figure of foundations.figures) {
      expect(figure.inspectionStatus).toBe('visually-inspected');
      expect(figure.sourceUnitIds).toHaveLength(1);
      for (const label of figure.labels)
        expect(figure.claimIds).toEqual(expect.arrayContaining(label.claimIds));
    }
    const b = foundations.figures.find(f => f.id.includes('xv-example'));
    expect(b?.labels.map(l => l.text)).toEqual(
      expect.arrayContaining(['Hào 6: dương; Ứng', 'Hào 3: âm; Thế']),
    );
    expect(
      citations.citations.find(c => c.id === 'citation-bpct-ch01-xv-line-3')?.location.pdfPageStart,
    ).toBe(16);
    expect(foundations.claims.find(c => c.id.endsWith('xviii-discussion'))?.text).toMatch(
      /Không có dòng Tân/,
    );
    expect(foundations.claims.find(c => c.id.endsWith('xxv-discussion'))?.text).toMatch(
      /24 phút.*không khớp/,
    );
  });
});

import caQuyet from '../data/liuyao/bpct-chapter-two-ca-quyet.json';
describe('BPCT chapter-two complete formulas', () => {
  it('covers every numbered formula and subordinate roster, with own evidence', () => {
    for (const unit of registry.groups.filter(g => g.id.startsWith('bpct-ch02-'))) {
      expect(unit.recordIds).toContain(caQuyet.id);
    }
    expect(getBookRecord(caQuyet.id)).toEqual(caQuyet);
    expect(caQuyet.claims.filter(c => c.id.endsWith('-formula'))).toHaveLength(29);
    expect(caQuyet.claims.filter(c => c.id.endsWith('-rendering'))).toHaveLength(29);
    expect(caQuyet.claims.filter(c => c.id.includes('note-'))).toHaveLength(3);
    for (const claim of caQuyet.claims)
      for (const id of claim.citationIds) expect(getBookCitation(id)).toBeDefined();
  });
  it('keeps full continuations, meaning differences, uncredited variants and folio-only 42', () => {
    expect(
      citations.citations.find(c => c.id === 'citation-bpct-ch02-xi-formula')?.location,
    ).toMatchObject({
      pdfPageStart: 31,
      pdfPageEnd: 32,
      printedPageStart: '24',
      printedPageEnd: '25',
    });
    expect(caQuyet.claims.find(c => c.id.endsWith('xi-rendering'))?.text).toMatch(
      /bỏ điều kiện gặp xung/,
    );
    expect(caQuyet.claims.find(c => c.id.includes('variants-reading'))?.attribution.author).toMatch(
      /không ký/,
    );
    expect(caQuyet.claims.find(c => c.id.endsWith('folio-42-folio'))?.text).toMatch(
      /chỉ có số in 35/,
    );
    expect(caQuyet.claims.find(c => c.id.endsWith('xix-prose'))?.text).toMatch(
      /Vũ Thủy.*Kinh Trập/,
    );
  });
});

import poems from '../data/liuyao/bpct-chapter-three-poems.json';
describe('BPCT chapter-three named poems', () => {
  it('keeps both complete works and every actual layer distinct', () => {
    for (const [work, count] of [
      ['thong-huyen', 25],
      ['tuy-kim', 10],
    ] as const) {
      for (const layer of ['verse', 'reading', 'rendering']) {
        expect(poems.claims.filter(c => c.id.includes(`-${work}-${layer}-`))).toHaveLength(count);
      }
      expect(registry.groups.find(g => g.id === `bpct-ch03-${work}`)?.recordIds).toContain(
        poems.id,
      );
    }
    expect(getBookRecord(poems.id)).toEqual(poems);
    expect(poems.claims.find(c => c.id.endsWith('tuy-kim-closing'))?.attribution.author).toMatch(
      /không ký/,
    );
  });
  it('protects original, reading and meaning continuations and disagreements', () => {
    expect(
      citations.citations.find(c => c.id.endsWith('thong-huyen-reading-25'))?.location,
    ).toMatchObject({ pdfPageStart: 45, pdfPageEnd: 46 });
    expect(
      citations.citations.find(c => c.id.endsWith('tuy-kim-verse-06'))?.location,
    ).toMatchObject({ pdfPageStart: 46, pdfPageEnd: 47 });
    expect(poems.claims.find(c => c.id.endsWith('thong-huyen-rendering-11'))?.text).toMatch(
      /Tài.*khác Huynh/,
    );
    expect(poems.claims.find(c => c.id.endsWith('tuy-kim-reading-09'))?.text).toMatch(
      /Tài cứu.*Tử/,
    );
  });
});

import canBoards from '../data/liuyao/bpct-boards-can.json';
import khamBoards from '../data/liuyao/bpct-boards-kham.json';
import mountainBoards from '../data/liuyao/bpct-boards-can-mountain.json';
const firstBoards = [canBoards, khamBoards, mountainBoards];
describe('BPCT Càn, Khảm and Cấn boards', () => {
  it.each(firstBoards)('preserves all eight $id figures and exact own locators', record => {
    expect(getBookRecord(record.id)).toEqual(record);
    expect(record.figures).toHaveLength(8);
    for (const figure of record.figures) {
      const unitId = figure.sourceUnitIds[0]!;
      const unit = registry.groups.find(g => g.id === unitId)!;
      expect(unit.recordIds).toContain(record.id);
      expect(figure.labels).toHaveLength(6);
      expect(figure.labels.map(l => l.text.match(/^Hào (\d)/)?.[1])).toEqual([
        '6',
        '5',
        '4',
        '3',
        '2',
        '1',
      ]);
      for (const label of figure.labels) {
        const claim = record.claims.find(c => c.id === label.claimIds[0])!;
        const citation = getBookCitation(claim.citationIds[0]!)!;
        expect(citation.location.pdfPageStart).toBe(unit.pdfPageStart);
        expect(citation.location.pdfPageEnd).toBe(unit.pdfPageStart);
        expect(citation.location.section).toMatch(/board/);
      }
      const commentary = record.claims.find(c => c.id.endsWith(`${unitId}-commentary`))!;
      expect(getBookCitation(commentary.citationIds[0]!)?.location.pdfPageEnd).toBe(
        unit.pdfPageEnd,
      );
      expect(
        record.claims.find(c => c.id.endsWith(`${unitId}-annotation-disposition`)),
      ).toBeDefined();
    }
  });
  it('keeps observed marker/relative discrepancies and the missing chapter-one Cách visible', () => {
    expect(canBoards.claims.find(c => c.id.endsWith('board-08-line-6'))?.text).toMatch(/Thế/);
    expect(canBoards.claims.find(c => c.id.endsWith('board-03-line-2'))?.text).toMatch(
      /Bính Ngọ; Tử/,
    );
    expect(khamBoards.claims.find(c => c.id.endsWith('board-13-heading'))?.text).toMatch(/CÁCH/);
    expect(khamBoards.claims.find(c => c.id.endsWith('board-16-line-6'))?.text).toMatch(
      /Quí Hợi; Phụ/,
    );
    expect(mountainBoards.claims.find(c => c.id.endsWith('board-24-line-5'))?.text).toMatch(
      /Tân Tị; Tài/,
    );
    expect(mountainBoards.claims.find(c => c.id.endsWith('board-22-line-6'))?.text).toMatch(
      /Nhâm Ngọ; Huynh/,
    );
  });
});

import chanBoards from '../data/liuyao/bpct-boards-chan.json';
import tonBoards from '../data/liuyao/bpct-boards-ton.json';
import lyBoards from '../data/liuyao/bpct-boards-ly.json';
describe('BPCT Chấn, Tốn and Ly boards', () => {
  it.each([chanBoards, tonBoards, lyBoards])(
    'resolves every $id label and distinct board citation',
    record => {
      expect(record.figures).toHaveLength(8);
      expect(getBookRecord(record.id)).toEqual(record);
      for (const figure of record.figures) {
        expect(figure.labels).toHaveLength(6);
        const unit = registry.groups.find(g => g.id === figure.sourceUnitIds[0])!;
        expect(unit.recordIds).toContain(record.id);
        for (const label of figure.labels) {
          const c = record.claims.find(c => c.id === label.claimIds[0])!;
          expect(getBookCitation(c.citationIds[0]!)?.location).toMatchObject({
            pdfPageStart: unit.pdfPageStart,
            pdfPageEnd: unit.pdfPageStart,
          });
        }
      }
    },
  );
  it('protects image-confirmed Tỉnh, attached note ownership and unrepaired marker conflicts', () => {
    expect(chanBoards.figures.find(f => f.sourceUnitIds.includes('bpct-board-30'))?.title).toMatch(
      /TỈNH/,
    );
    expect(chanBoards.claims.find(c => c.id.endsWith('board-30-line-6'))?.text).toMatch(/Canh Tí/);
    expect(chanBoards.claims.find(c => c.id.endsWith('board-28-line-2'))?.text).toMatch(/Thế/);
    expect(chanBoards.claims.find(c => c.id.endsWith('note-01-note'))?.text).toMatch(
      /marker thuộc Tỉnh/,
    );
    expect(
      tonBoards.claims.find(c => c.id.endsWith('board-39-annotation-disposition'))?.text,
    ).toMatch(/Thế in tại 4,1; Ứng in tại không có/);
    expect(lyBoards.claims.find(c => c.id.endsWith('board-44-line-5'))?.text).toMatch(/Ứng/);
  });
});

import khonBoards from '../data/liuyao/bpct-boards-khon.json';
import doaiBoards from '../data/liuyao/bpct-boards-doai.json';
const allBoards = [...firstBoards, chanBoards, tonBoards, lyBoards, khonBoards, doaiBoards];
describe('BPCT all 64 distinct board evidence units', () => {
  it('covers all eight palaces, six observed line labels per board and all own commentary bounds', () => {
    const figures = allBoards.flatMap(r => r.figures);
    expect(figures).toHaveLength(64);
    expect(new Set(figures.map(f => f.id)).size).toBe(64);
    expect(figures.flatMap(f => f.labels)).toHaveLength(384);
    expect(new Set(figures.flatMap(f => f.sourceUnitIds)).size).toBe(64);
    for (const record of allBoards) {
      expect(getBookRecord(record.id)).toEqual(record);
      for (const figure of record.figures) {
        const unit = registry.groups.find(g => g.id === figure.sourceUnitIds[0])!;
        expect(unit.recordIds).toContain(record.id);
        const commentary = record.claims.find(c => c.id.endsWith(`${unit.id}-commentary`))!;
        expect(getBookCitation(commentary.citationIds[0]!)?.location).toMatchObject({
          pdfPageStart: unit.pdfPageStart,
          pdfPageEnd: unit.pdfPageEnd,
        });
        for (const id of figure.claimIds) expect(record.claims.some(c => c.id === id)).toBe(true);
      }
    }
    const dispositions = allBoards.flatMap(r =>
      r.claims.filter(c => c.id.endsWith('annotation-disposition')),
    );
    expect(dispositions.filter(c => /Quái thân in ở hào/.test(c.text))).toHaveLength(7);
  });
  it('records actual absent markers and complete closing example without replacing reviewed authority', () => {
    expect(
      khonBoards.claims.find(c => c.id.endsWith('board-50-annotation-disposition'))?.text,
    ).toMatch(/Thế in tại không có/);
    expect(khonBoards.claims.find(c => c.id.endsWith('board-53-commentary'))?.text).toMatch(
      /không có Phụ/,
    );
    expect(doaiBoards.claims.find(c => c.id.endsWith('ch04-closing-method'))?.text).toMatch(
      /Độn sơ động.*Đồng Nhân/,
    );
    expect(doaiBoards.figures[7]?.labels).toHaveLength(6);
  });
});

import firstDiscussions from '../data/liuyao/bpct-chapter-five-01-06.json';
describe('BPCT chapter-five discussions 1–6', () => {
  it('retains each numbered unit, all six Phi senses and four attached notes', () => {
    expect(getBookRecord(firstDiscussions.id)).toEqual(firstDiscussions);
    for (let n = 1; n <= 6; n++)
      expect(registry.groups.find(g => g.id === `bpct-ch05-0${n}`)?.recordIds).toContain(
        firstDiscussions.id,
      );
    expect(firstDiscussions.claims.filter(c => c.id.includes('ch05-01-'))).toHaveLength(5);
    expect(firstDiscussions.claims.filter(c => c.id.includes('ch05-05-type-'))).toHaveLength(6);
    expect(firstDiscussions.claims.filter(c => c.id.includes('note-'))).toHaveLength(4);
    expect(firstDiscussions.claims.find(c => c.id.endsWith('type-2'))?.text).toMatch(
      /không tự thay/,
    );
    expect(
      citations.citations.find(c => c.id.endsWith('ch05-03-in-law-roles'))?.location,
    ).toMatchObject({ pdfPageStart: 67, pdfPageEnd: 68 });
  });
});

import middleDiscussions from '../data/liuyao/bpct-chapter-five-07-12.json';
describe('BPCT chapter-five discussions 7–12', () => {
  it('keeps every unit and compound condition, not selected citation coverage', () => {
    expect(getBookRecord(middleDiscussions.id)).toEqual(middleDiscussions);
    for (let n = 7; n <= 12; n++)
      expect(
        registry.groups.find(g => g.id === `bpct-ch05-${String(n).padStart(2, '0')}`)?.recordIds,
      ).toContain(middleDiscussions.id);
    expect(middleDiscussions.claims.filter(c => c.id.includes('ch05-11-'))).toHaveLength(6);
    expect(middleDiscussions.claims.filter(c => c.id.includes('ch05-12-'))).toHaveLength(3);
    expect(middleDiscussions.claims.find(c => c.id.endsWith('07-inserted-examples'))?.text).toMatch(
      /tự ải.*không.*tự hại/,
    );
    expect(middleDiscussions.claims.find(c => c.id.endsWith('08-stage-examples'))?.text).toMatch(
      /Ngọ Lâm Quan Ngọ Thoái/,
    );
    expect(middleDiscussions.claims.find(c => c.id.endsWith('note-07-note'))?.text).toMatch(
      /Dần không cùng chi Thân/,
    );
    expect(middleDiscussions.claims.find(c => c.id.endsWith('note-06-note'))?.text).toMatch(
      /thiếu Tử/,
    );
  });
});

import finalDiscussions from '../data/liuyao/bpct-chapter-five-13-18.json';
describe('BPCT chapter-five final discussions and distinct postscript', () => {
  it('maps 13–18, all notes and the unnumbered supplement without creating item 19', () => {
    expect(getBookRecord(finalDiscussions.id)).toEqual(finalDiscussions);
    for (let n = 13; n <= 18; n++)
      expect(registry.groups.find(g => g.id === `bpct-ch05-${n}`)?.recordIds).toContain(
        finalDiscussions.id,
      );
    expect(registry.groups.find(g => g.id === 'bpct-ch05-postscript')?.recordIds).toContain(
      finalDiscussions.id,
    );
    expect(registry.groups.some(g => g.id === 'bpct-ch05-19')).toBe(false);
    expect(finalDiscussions.claims.filter(c => c.id.includes('postscript-'))).toHaveLength(6);
    for (const c of finalDiscussions.claims.filter(c => c.id.includes('postscript-'))) {
      expect(c.attribution.author).toMatch(/không ký tên/);
      expect(getBookCitation(c.citationIds[0]!)?.textLayer).toBe('supplement');
    }
    expect(citations.citations.find(c => c.id.endsWith('ch05-18-proxy'))?.location).toMatchObject({
      pdfPageStart: 73,
      pdfPageEnd: 74,
    });
    expect(
      citations.citations.find(c => c.id.endsWith('postscript-identity'))?.location,
    ).toMatchObject({ pdfPageStart: 74, pdfPageEnd: 76 });
    expect(finalDiscussions.claims.find(c => c.id.endsWith('17-advance'))?.text).toMatch(
      /Không in Thìn→Mùi/,
    );
  });
});
