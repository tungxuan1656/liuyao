import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const fixture = JSON.parse(
  readFileSync(new URL('./fixtures/shared-foundations.json', import.meta.url), 'utf8'),
);
const record = path =>
  JSON.parse(readFileSync(new URL(`../data/${path}.json`, import.meta.url), 'utf8'));
const rows = (path, kind) => record(path).tables.find(table => table.kind === kind).rows;

// Expected values come from the supplied passages, never from liuyao-core or the corpus.
describe('independent BPCT shared-foundation expectations', () => {
  it('preserves all eight bottom-to-top trigram patterns', () => {
    for (const [id, lines] of Object.entries(fixture.trigrams)) {
      expect(record(`trigrams/trigram-${id}`).lines, id).toEqual(lines);
    }
  });

  it('preserves all 48 Na Jia pairs', () => {
    const actual = Object.fromEntries(
      rows('liuyao/na-jia', 'na-jia').map(row => [
        row.trigramId.replace('trigram-', ''),
        [...row.inner, ...row.outer].map(
          pair =>
            `${pair.stemId.replace('term-stem-', '')}/${pair.branchId.replace('term-branch-', '')}`,
        ),
      ]),
    );
    expect(actual).toEqual(fixture.naJia);
  });

  it('preserves twelve branch elements and eight Thế–Ứng marker pairs', () => {
    expect(
      Object.fromEntries(
        rows('liuyao/branch-elements', 'branch-elements').map(row => [
          row.branchId.replace('term-branch-', ''),
          row.element,
        ]),
      ),
    ).toEqual(fixture.branchElements);
    expect(
      rows('liuyao/palaces-and-markers', 'markers').map(row => [row.shiPosition, row.yingPosition]),
    ).toEqual(fixture.markers);
  });

  it('preserves all 25 relative classifications including Wood/Metal Quan quỷ', () => {
    const cycles = rows('liuyao/five-element-cycles', 'element-cycles');
    const relatives = rows('liuyao/six-relatives', 'relative-relations');
    for (const palace of fixture.elements) {
      const actual = fixture.elements.map(line => {
        let relation = 'same';
        if (palace !== line) {
          const forward = cycles.find(row => row.from === palace && row.to === line);
          const backward = cycles.find(row => row.from === line && row.to === palace);
          assert(forward || backward, `Missing element relation: ${palace}/${line}`);
          relation = forward
            ? `palace-${forward.relation}-line`
            : `line-${backward.relation}-palace`;
        }
        const relative = relatives.find(row => row.relation === relation);
        assert(relative, `Missing relative: ${relation}`);
        return relative.relativeId.replace('term-relative-', '');
      });
      expect(actual, palace).toEqual(fixture.relativesByPalace[palace]);
    }
  });
});
