import { describe, expect, it } from 'vitest';
import {
  appendAutomaticToss,
  CastingService,
  calculateHexagram,
  calculateReading,
  createAutomaticTossSnapshot,
  InvalidReadingInputError,
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

  it('maps all four-coin outcomes and has the exact 1/5/7/3 distribution', () => {
    const counts = new Map<number, number>([
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ]);
    for (let value = 0; value < 16; value += 1) {
      const coins = [8, 4, 2, 1].map(weight => (value & weight ? 1 : 0)) as [
        0 | 1,
        0 | 1,
        0 | 1,
        0 | 1,
      ];
      const line = mapCoinsToLine(coins);
      counts.set(line, counts.get(line)! + 1);
      expect(line).toBe(value === 0 ? 6 : value <= 5 ? 7 : value <= 12 ? 8 : 9);
    }
    expect([...counts.values()]).toEqual([1, 5, 7, 3]);
  });

  it('supports explicit four-coin casts while retaining three-coin defaults', () => {
    const three = new CastingService(() => 1).toss();
    const four = new CastingService(() => 1).toss('four-coin');
    expect(three).toEqual({ coins: [1, 1, 1], method: 'three-coin', coinCount: 3, line: 9 });
    expect(four).toEqual({ coins: [1, 1, 1, 1], method: 'four-coin', coinCount: 4, line: 9 });
    expect(
      new CastingService(() => 0).cast('four-coin').tosses.every(toss => toss.coinCount === 4),
    ).toBe(true);
  });

  it.each([
    { coins: [] },
    { coins: [0, 1] },
    { coins: [0, 1, 0, 1, 0] },
    { coins: [0, 1, 2] },
    { coins: [0, -1, 1] },
    { coins: [0, 1, 1.5] },
    { coins: [0, 1, Number.NaN] },
    { coins: Object.assign(new Array(4), { 0: 0, 1: 1, 2: 0 }) },
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

  it('calculates equivalent results from direct and sequential entries', () => {
    const values = [6, 7, 8, 9, 6, 7];
    expect(calculateReading(normalizeDirectInput(values))).toEqual(
      calculateReading(normalizeSequentialInput(values)),
    );
  });

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

  it('freezes the cast snapshot and keeps raw coins aligned with each line value', () => {
    const stream = triples.slice(0, 6).flatMap(({ coins }) => coins);
    let calls = 0;
    const result = new CastingService(() => stream[calls++] as 0 | 1).cast();
    const mutableResult = result as unknown as {
      tosses: { coins: number[]; line: number }[];
      input: { lines: number[] };
    };

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.tosses)).toBe(true);
    expect(Object.isFrozen(result.input)).toBe(true);
    expect(Object.isFrozen(result.input.lines)).toBe(true);
    for (const toss of result.tosses) {
      expect(Object.isFrozen(toss)).toBe(true);
      expect(Object.isFrozen(toss.coins)).toBe(true);
    }

    expect(() => {
      mutableResult.tosses[0]!.coins[0] = 1;
    }).toThrow();
    expect(() => {
      mutableResult.input.lines[0] = 9;
    }).toThrow();
    expect(result.tosses.map(toss => mapCoinsToLine(toss.coins))).toEqual(
      result.tosses.map(toss => toss.line),
    );
    expect(result.input.lines).toEqual(result.tosses.map(toss => toss.line));
  });

  it('assembles immutable six-line evidence from incremental tosses', () => {
    const stream = triples.slice(0, 6).flatMap(({ coins }) => coins);
    let calls = 0;
    const service = new CastingService(() => stream[calls++] as 0 | 1);
    let tosses = [] as ReturnType<typeof service.toss>[];
    for (let index = 0; index < 6; index += 1) {
      const previous = tosses;
      tosses = [...appendAutomaticToss(tosses, service.toss())];
      expect(previous).not.toBe(tosses);
    }

    const snapshot = createAutomaticTossSnapshot(tosses);
    expect(snapshot).toHaveLength(6);
    expect(snapshot.map(toss => toss.line)).toEqual([6, 7, 7, 7, 8, 8]);
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(snapshot.every(toss => Object.isFrozen(toss) && Object.isFrozen(toss.coins))).toBe(true);
    expect(() => createAutomaticTossSnapshot(tosses.slice(0, 5))).toThrow(TypeError);
    expect(() =>
      createAutomaticTossSnapshot(
        tosses.map((toss, index) => (index === 0 ? { ...toss, line: 9 } : toss)),
      ),
    ).toThrow(TypeError);
  });

  it('rejects appending after six tosses', () => {
    const toss = new CastingService(() => 0).toss();
    expect(() => appendAutomaticToss(Array(6).fill(toss), toss)).toThrow(TypeError);
  });

  it('uses exactly three source calls per toss and rejects invalid source output', () => {
    let calls = 0;
    const service = new CastingService(() => {
      calls += 1;
      return 1;
    });
    const toss = service.toss();
    expect(toss).toEqual({ coins: [1, 1, 1], method: 'three-coin', coinCount: 3, line: 9 });
    expect(Object.isFrozen(toss)).toBe(true);
    expect(Object.isFrozen(toss.coins)).toBe(true);
    expect(calls).toBe(3);
    for (const invalid of [2, -1, 0.5, Number.NaN, '1', undefined]) {
      expect(() => new CastingService(() => invalid as 0).toss()).toThrow(TypeError);
    }
  });
});
