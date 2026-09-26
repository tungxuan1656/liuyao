import { describe, expect, it } from 'vitest';
import {
  CastingService,
  InvalidReadingInputError,
  calculateHexagram,
  calculateReading,
  mapCoinsToLine,
  normalizeCastingInput,
  normalizeDirectInput,
  normalizeSequentialInput,
} from '../src/index';

const triples = [
  { coins: [0, 0, 0], line: 6 },
  { coins: [0, 0, 1], line: 7 },
  { coins: [0, 1, 0], line: 7 },
  { coins: [1, 0, 0], line: 7 },
  { coins: [0, 1, 1], line: 8 },
  { coins: [1, 0, 1], line: 8 },
  { coins: [1, 1, 0], line: 8 },
  { coins: [1, 1, 1], line: 9 },
] as const;

describe('casting core', () => {
  it.each(triples)('maps $coins to line $line', ({ coins, line }) => {
    expect(mapCoinsToLine(coins)).toBe(line);
  });

  it('has the exact 1/3/3/1 outcome counts', () => {
    const counts = new Map<number, number>();
    for (const { coins, line } of triples) {
      expect(mapCoinsToLine(coins)).toBe(line);
      counts.set(line, (counts.get(line) ?? 0) + 1);
    }
    expect([...counts.values()]).toEqual([1, 3, 3, 1]);
  });

  it.each([
    { coins: [] },
    { coins: [0, 1] },
    { coins: [0, 1, 0, 1] },
    { coins: [0, 1, 2] },
    { coins: [0, -1, 1] },
    { coins: [0, 1, 1.5] },
    { coins: [0, 1, Number.NaN] },
  ])('rejects invalid coin data $coins', ({ coins }) => {
    expect(() => mapCoinsToLine(coins as never)).toThrow(TypeError);
  });

  it.each([{ lines: [6, 7, 8, 9, 6, 7] }, { lines: [7, 6, 9, 8, 7, 6] }])(
    'normalizes bottom-to-top input without changing order: $lines',
    ({ lines }) => {
      const shared = normalizeCastingInput(lines);
      const direct = normalizeDirectInput(lines);
      const sequential = normalizeSequentialInput(lines);
      expect(shared).toEqual({ lines });
      expect(shared.lines).not.toBe(lines);
      expect(direct).toEqual({ lines });
      expect(sequential).toEqual(direct);
      expect(direct.lines).not.toBe(lines);
    },
  );

  it.each([
    { lines: [] },
    { lines: [6, 7, 8, 9, 6] },
    { lines: [6, 7, 8, 9, 6, 10] },
    { lines: [6, 7, 8, 9, 6, 7.2] },
  ])('rejects invalid six-line input $lines', ({ lines }) => {
    expect(() => normalizeCastingInput(lines)).toThrow(InvalidReadingInputError);
    expect(() => normalizeDirectInput(lines)).toThrow(InvalidReadingInputError);
    expect(() => normalizeSequentialInput(lines)).toThrow(InvalidReadingInputError);
  });

  it('rejects non-array normalization input', () => {
    expect(() => normalizeDirectInput({ lines: [6, 7, 8, 9, 6, 7] })).toThrow(
      InvalidReadingInputError,
    );
  });

  it('casts six ordered lines using exactly eighteen validated source bits', () => {
    const stream = triples.slice(0, 6).flatMap(({ coins }) => coins);
    let calls = 0;
    const service = new CastingService(() => stream[calls++] as 0 | 1);
    const result = service.cast();
    expect(calls).toBe(18);
    expect(result.tosses.map(toss => toss.coins)).toEqual(
      triples.slice(0, 6).map(({ coins }) => coins),
    );
    expect(result.tosses.map(toss => toss.line)).toEqual([6, 7, 7, 7, 8, 8]);
    expect(result.input).toEqual({ lines: [6, 7, 7, 7, 8, 8] });
    expect(calculateHexagram(result.input)).toEqual(
      calculateHexagram({ lines: result.input.lines }),
    );
    expect(calculateReading(result.input)).toEqual(calculateReading({ lines: result.input.lines }));
  });

  it('uses exactly three source calls per toss and rejects invalid source output', () => {
    let calls = 0;
    const service = new CastingService(() => {
      calls += 1;
      return 1;
    });
    expect(service.toss()).toEqual({ coins: [1, 1, 1], line: 9 });
    expect(calls).toBe(3);
    for (const invalid of [2, -1, 0.5, Number.NaN, '1', undefined]) {
      expect(() => new CastingService(() => invalid as 0).toss()).toThrow(TypeError);
    }
  });
});
