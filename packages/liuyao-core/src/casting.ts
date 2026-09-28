import type { HexagramReadingInput, LineValue } from './contracts.js';
import { validateSixLines } from './validation.js';

export type CoinBit = 0 | 1;
export type CoinBitSource = () => CoinBit;

export type CoinTossResult = {
  readonly coins: readonly [CoinBit, CoinBit, CoinBit];
  readonly line: LineValue;
};

export type CastingResult = {
  readonly tosses: readonly [
    CoinTossResult,
    CoinTossResult,
    CoinTossResult,
    CoinTossResult,
    CoinTossResult,
    CoinTossResult,
  ];
  readonly input: HexagramReadingInput;
};

export type AutomaticTossSnapshot = readonly [
  CoinTossResult,
  CoinTossResult,
  CoinTossResult,
  CoinTossResult,
  CoinTossResult,
  CoinTossResult,
];

function copyValidatedToss(toss: CoinTossResult): CoinTossResult {
  const copiedCoins = [...toss.coins] as [CoinBit, CoinBit, CoinBit];
  if (mapCoinsToLine(copiedCoins) !== toss.line) {
    throw new TypeError('Each toss line must match its three coin values.');
  }
  return Object.freeze({ coins: Object.freeze(copiedCoins), line: toss.line });
}

/** Copy and freeze six bottom-to-top tosses, rejecting mismatched coin/line evidence. */
export function createAutomaticTossSnapshot(
  tosses: readonly CoinTossResult[],
): AutomaticTossSnapshot {
  if (!Array.isArray(tosses) || tosses.length !== 6) {
    throw new TypeError('An automatic toss snapshot must contain exactly six tosses.');
  }

  const snapshot = tosses.map(copyValidatedToss) as unknown as AutomaticTossSnapshot;

  return Object.freeze(snapshot);
}

/** Append one line's evidence without mutating the prior sequence. */
export function appendAutomaticToss(
  tosses: readonly CoinTossResult[],
  toss: CoinTossResult,
): readonly CoinTossResult[] {
  if (!Array.isArray(tosses) || tosses.length >= 6) {
    throw new TypeError('An automatic reading cannot contain more than six tosses.');
  }
  tosses.forEach(copyValidatedToss);
  return Object.freeze([...tosses.map(copyValidatedToss), copyValidatedToss(toss)]);
}

function isCoinBit(value: unknown): value is CoinBit {
  return value === 0 || value === 1;
}

/** Map three coin bits to a line value (0 contributes 2; 1 contributes 3). */
export function mapCoinsToLine(coins: readonly [CoinBit, CoinBit, CoinBit]): LineValue {
  if (
    !Array.isArray(coins) ||
    coins.length !== 3 ||
    !isCoinBit(coins[0]) ||
    !isCoinBit(coins[1]) ||
    !isCoinBit(coins[2])
  ) {
    throw new TypeError('Coins must be an array of exactly three bits (0 or 1).');
  }
  const total = coins.reduce((sum, bit) => sum + (bit === 0 ? 2 : 3), 0);
  return total as LineValue;
}

/** Normalize an untrusted bottom-to-top six-line array into a copied reading input. */
export function normalizeCastingInput(lines: unknown): HexagramReadingInput {
  return { lines: validateSixLines(lines) };
}

/** Sequential input is entered first line first, matching the stored bottom-to-top order. */
export function normalizeSequentialInput(lines: unknown): HexagramReadingInput {
  return normalizeCastingInput(lines);
}

/** Direct input is a six-value bottom-to-top array and is never reversed. */
export function normalizeDirectInput(lines: unknown): HexagramReadingInput {
  return normalizeCastingInput(lines);
}

export class CastingService {
  constructor(private readonly source: CoinBitSource) {}

  toss(): CoinTossResult {
    const coins: [CoinBit, CoinBit, CoinBit] = [0, 0, 0];
    for (let index = 0; index < coins.length; index += 1) {
      const bit: unknown = this.source();
      if (!isCoinBit(bit)) {
        throw new TypeError('Coin bit source must return 0 or 1.');
      }
      coins[index] = bit;
    }
    return Object.freeze({ coins: Object.freeze(coins), line: mapCoinsToLine(coins) });
  }

  cast(): CastingResult {
    const tosses = Object.freeze(
      Array.from({ length: 6 }, () => this.toss()) as unknown as CastingResult['tosses'],
    );
    const input = normalizeCastingInput(tosses.map(toss => toss.line));
    Object.freeze(input.lines);
    Object.freeze(input);
    return Object.freeze({
      tosses,
      input,
    });
  }
}
