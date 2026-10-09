import { describe, expect, it } from 'vitest';
import {
  assignNaJia,
  branchElement,
  identifyPalace,
  identifyTrigram,
  sixRelative,
} from '@liuyao/core';
import type { EarthlyBranch, FiveElement } from '@liuyao/core';
import { listContent } from '../src/content';
import { loadContent } from '../src/node';
const records = (
  await Promise.all(
    listContent()
      .filter(item => item.type === 'trigram' || item.type === 'rule')
      .map(item => loadContent(item.id)),
  )
).filter(record => record !== undefined);
const getBookRecord = (id: string) => records.find(record => record.id === id);
const listBookRecords = () => records;
import type { ContentTable } from '../src/index';

function table<Kind extends ContentTable['kind']>(
  recordId: string,
  kind: Kind,
): Extract<ContentTable, { kind: Kind }> {
  const value = getBookRecord(recordId)?.tables?.find(table => table.kind === kind);
  if (!value) throw new Error(`Missing ${recordId}/${kind}`);
  return value as Extract<ContentTable, { kind: Kind }>;
}

// The JSON tables were transcribed from BPCT, not generated from these functions.
// These checks establish compatibility; passage review establishes source fidelity.
describe('book tables and deterministic core compatibility', () => {
  it('matches eight source-reviewed trigram patterns and all 48 Na Jia pairs', () => {
    for (const record of listBookRecords()) {
      if (record.type !== 'trigram') continue;
      const lines = record.lines.map(line => (line === 'yin' ? 8 : 7));
      expect(identifyTrigram([lines[0]!, lines[1]!, lines[2]!])).toBe(record.id);
    }
    for (const row of table('rule-na-jia-assignment', 'na-jia').rows) {
      for (const side of ['inner', 'outer'] as const) {
        const expected = row[side].map(pair => ({
          stem: pair.stemId.slice('term-stem-'.length),
          branch: pair.branchId.slice('term-branch-'.length),
        }));
        expect(assignNaJia(row.trigramId, side), `${row.trigramId}/${side}`).toEqual(expected);
      }
    }
  });

  it('matches all 64 palace memberships and marker pairs', () => {
    const markers = table('rule-palace-and-markers', 'markers').rows;
    for (const row of table('rule-palace-and-markers', 'palaces').rows) {
      row.hexagramIds.forEach((id, index) => {
        const marker = markers.find(marker => marker.palaceSequence === index + 1)!;
        expect(identifyPalace(id), id).toEqual({
          palaceId: row.trigramId.replace('trigram-', 'palace-'),
          palaceElement: row.element,
          shiPosition: marker.shiPosition,
          yingPosition: marker.yingPosition,
        });
      });
    }
  });

  it('matches twelve branch elements and all 25 relative classifications', () => {
    for (const row of table('rule-branch-element', 'branch-elements').rows) {
      expect(branchElement(row.branchId.slice('term-branch-'.length) as EarthlyBranch)).toBe(
        row.element,
      );
    }
    const cycles = table('rule-five-element-cycles', 'element-cycles').rows;
    const relatives = table('rule-six-relative-classification', 'relative-relations').rows;
    const elements: readonly FiveElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
    for (const palace of elements)
      for (const line of elements) {
        const forward = cycles.find(row => row.from === palace && row.to === line);
        const backward = cycles.find(row => row.from === line && row.to === palace);
        const relation =
          palace === line
            ? 'same'
            : forward
              ? `palace-${forward.relation}-line`
              : `line-${backward!.relation}-palace`;
        const expected = relatives
          .find(row => row.relation === relation)!
          .relativeId.slice('term-relative-'.length);
        expect(sixRelative(palace, line), `${palace}/${line}`).toBe(expected);
      }
  });
});
