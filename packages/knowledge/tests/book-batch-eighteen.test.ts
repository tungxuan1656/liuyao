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
