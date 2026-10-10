import {
  calculateHexagram,
  calculateReading,
  identifyTrigrams,
  linePolarity,
  transformChangingLines,
  validateReadingInput,
} from '@liuyao/core';
import { describe, expect, it } from 'vitest';
import { listContent } from '../src/content';
import { loadContent } from '../src/node';

const records = (
  await Promise.all(
    listContent()
      .filter(
        item =>
          ['term', 'rule', 'trigram'].includes(item.type) ||
          [
            'hexagram-01',
            'hexagram-02',
            'hexagram-06',
            'hexagram-10',
            'article-tung-to-ly',
            'lesson-worked-readings',
            'lesson-foundations',
            'lesson-classical-reading',
            'lesson-liuyao-board',
          ].includes(item.id),
      )
      .map(item => loadContent(item.id)),
  )
).filter(record => record !== undefined);
const getBookRecord = (id: string) => records.find(record => record.id === id);
const listBookRecords = () => records;

import type { ContentArticle, ContentTable } from '../src/index';
import fixture from './fixtures/ordered-lessons-worked-readings.json';

function lesson(id: string): ContentArticle {
  const record = getBookRecord(id);
  if (!record || record.type !== 'article') throw new Error(`Missing V2 lesson ${id}`);
  return record;
}

function table<Kind extends ContentTable['kind']>(
  ownerId: string,
  kind: Kind,
): Extract<ContentTable, { kind: Kind }> {
  const value = getBookRecord(ownerId)?.tables?.find(table => table.kind === kind);
  if (!value) throw new Error(`Missing ${ownerId}/${kind}`);
  return value as Extract<ContentTable, { kind: Kind }>;
}

// The JSON expected facts are hand-authored from released source-reviewed records,
// not captured from the core calculator.
describe('feat-065 independently expected worked readings', () => {
  it('exports immutable complete lessons without changing compatibility entities', () => {
    const lessons = listBookRecords()
      .filter(record => record.id.startsWith('lesson-'))
      .sort(
        (a, b) =>
          (a.type === 'article' ? (a.sequence ?? 0) : 0) -
          (b.type === 'article' ? (b.sequence ?? 0) : 0),
      );
    expect(lessons.map(record => record.id)).toEqual([
      'lesson-foundations',
      'lesson-classical-reading',
      'lesson-liuyao-board',
      'lesson-worked-readings',
    ]);
    for (const record of lessons) {
      const value = lesson(record.id);
      expect(value.id).toBe(record.id);
      expect(Object.isFrozen(value)).toBe(true);
      expect(Object.isFrozen(value.entries)).toBe(true);
      for (const block of value.entries) {
        expect(Object.isFrozen(block)).toBe(true);
        expect(Object.isFrozen(block.references)).toBe(true);
      }
    }
    expect(fixture.examples.map(example => example.blockId)).toEqual(
      lesson('lesson-worked-readings')
        .entries.filter(block => block.title === 'Bài thực hành')
        .map(block => block.id),
    );
  });

  it.each(fixture.examples)(
    '$id agrees with deterministic APIs in every expected field',
    example => {
      const result = calculateReading(example.input);
      expect(result).toEqual(example.expectedBoard);
      expect(calculateHexagram(example.input)).toEqual(example.expectedCalculation);
      const lines = validateReadingInput(example.input).lines;
      const changed = transformChangingLines(lines);
      if (example.expectedChangedTrigrams) {
        expect(identifyTrigrams(changed)).toEqual(example.expectedChangedTrigrams);
        expect(changed.map(linePolarity)).toEqual(example.expectedChangedPolarities);
      } else {
        expect(changed).toEqual(lines);
        expect(result.changedHexagramId).toBeNull();
      }
      const block = lesson(example.lessonId).entries.find(block => block.id === example.blockId)!;
      if (block.title !== 'Bài thực hành') throw new Error('Fixture must name a worked block');
      expect(block.links?.length).toBeGreaterThan(0);
      expect(block.text).toContain(`[${example.input.lines.join(', ')}]`);
      expect(block.text).toContain(example.expectedCalculation.primaryHexagramId);
      expect(block.text).toContain(example.expectedCalculation.changedHexagramId ?? 'null');
      const palaceName = example.expectedBoard.palaceId === 'palace-fire' ? 'Ly' : 'Càn';
      expect(block.text).toContain(`cung ${palaceName}`);
      expect(block.text).toContain(`Thế ${example.expectedBoard.shiPosition}`);
      expect(block.text).toContain(`Ứng ${example.expectedBoard.yingPosition}`);
    },
  );

  it.each(fixture.examples)(
    '$id expected board facts independently follow the reviewed tables',
    example => {
      const expected = example.expectedBoard;
      const palace = table('rule-palace-and-markers', 'palaces').rows.find(row =>
        row.hexagramIds.some(id => id === expected.primaryHexagramId),
      )!;
      expect(palace.trigramId.replace('trigram-', 'palace-')).toBe(expected.palaceId);
      expect(palace.element).toBe(expected.palaceElement);
      const sequence = palace.hexagramIds.findIndex(id => id === expected.primaryHexagramId) + 1;
      const markers = table('rule-palace-and-markers', 'markers').rows.find(
        row => row.palaceSequence === sequence,
      )!;
      expect([markers.shiPosition, markers.yingPosition]).toEqual([
        expected.shiPosition,
        expected.yingPosition,
      ]);
      const pairs = [
        ...table('rule-na-jia-assignment', 'na-jia').rows.find(
          row => row.trigramId === expected.lowerTrigramId,
        )!.inner,
        ...table('rule-na-jia-assignment', 'na-jia').rows.find(
          row => row.trigramId === expected.upperTrigramId,
        )!.outer,
      ];
      const branchElements = table('rule-branch-element', 'branch-elements').rows;
      const cycles = table('rule-five-element-cycles', 'element-cycles').rows;
      const relatives = table('rule-six-relative-classification', 'relative-relations').rows;
      for (const [index, line] of expected.lines.entries()) {
        const pair = pairs[index]!;
        expect(pair.stemId).toBe(`term-stem-${line.naJiaStem}`);
        expect(pair.branchId).toBe(`term-branch-${line.naJiaBranch}`);
        expect(branchElements.find(row => row.branchId === pair.branchId)!.element).toBe(
          line.element,
        );
        const forward = cycles.find(
          row => row.from === expected.palaceElement && row.to === line.element,
        );
        const backward = cycles.find(
          row => row.from === line.element && row.to === expected.palaceElement,
        );
        const relation =
          expected.palaceElement === line.element
            ? 'same'
            : forward
              ? `palace-${forward.relation}-line`
              : `line-${backward!.relation}-palace`;
        expect(relatives.find(row => row.relation === relation)!.relativeId).toBe(
          `term-relative-${line.relative}`,
        );
        const text = lesson(example.lessonId).entries.find(block => block.id === example.blockId)!;
        if (text.title !== 'Bài thực hành') throw new Error('Not a worked block');
        // The all-moving exercise explicitly reuses the static primary-board rows.
        const boardText =
          example.id === 'all-moving-can'
            ? lesson(example.lessonId).entries.find(block => block.id === 'static-can')!
            : text;
        if (boardText.title !== 'Bài thực hành') throw new Error('Not a worked block');
        const stem = getBookRecord(pair.stemId)!.title;
        const branch = getBookRecord(pair.branchId)!.title;
        const relative = getBookRecord(`term-relative-${line.relative}`)!.title;
        const element = getBookRecord(`term-element-${line.element}`)!.title;
        expect(boardText.text).toContain(`${stem} ${branch} / ${element} / ${relative}`);
      }
    },
  );

  it('keeps the single moving-line case anchored to the existing NHL expected transformation', () => {
    const example = fixture.examples.find(example => example.id === 'tung-to-ly')!;
    const row = table('article-tung-to-ly', 'transformation').rows[0]!;
    expect(example.expectedCalculation).toMatchObject({
      primaryHexagramId: row.primaryHexagramId,
      changedHexagramId: row.changedHexagramId,
      changingPositions: row.movingPositions,
    });
    expect(example.expectedBoard.lines.map(line => line.polarity)).toEqual(row.primaryLines);
    expect(example.expectedChangedPolarities).toEqual(row.changedLines);
  });

  it.each(fixture.examples)(
    '$id primary and changed patterns match reviewed quẻ structures',
    example => {
      const primary = getBookRecord(example.expectedCalculation.primaryHexagramId)!;
      if (primary.type !== 'hexagram') throw new Error('Not a hexagram');
      expect([primary.lowerTrigramId, primary.upperTrigramId]).toEqual([
        example.expectedCalculation.lowerTrigramId,
        example.expectedCalculation.upperTrigramId,
      ]);
      if (!example.expectedCalculation.changedHexagramId) return;
      const changed = getBookRecord(example.expectedCalculation.changedHexagramId)!;
      if (changed.type !== 'hexagram') throw new Error('Not a hexagram');
      expect([changed.lowerTrigramId, changed.upperTrigramId]).toEqual([
        example.expectedChangedTrigrams!.lowerTrigramId,
        example.expectedChangedTrigrams!.upperTrigramId,
      ]);
      const lower = getBookRecord(changed.lowerTrigramId)!;
      const upper = getBookRecord(changed.upperTrigramId)!;
      if (lower.type !== 'trigram' || upper.type !== 'trigram') throw new Error('Not trigrams');
      expect(example.expectedChangedPolarities).toEqual([...lower.lines, ...upper.lines]);
    },
  );
});
