import type { HexagramReadingInput, LineValue } from './contracts.js';
import { validateSixLines } from './validation.js';

export type CoinBit = 0 | 1;
export type CoinBitSource = () => CoinBit;
export type CoinCount = 3 | 4;
export type CastingMethod = 'three-coin' | 'four-coin';
export type CoinSet =
  | readonly [CoinBit, CoinBit, CoinBit]
  | readonly [CoinBit, CoinBit, CoinBit, CoinBit];
export type ThreeCoinSet = readonly [CoinBit, CoinBit, CoinBit];
export type FourCoinSet = readonly [CoinBit, CoinBit, CoinBit, CoinBit];

export type CoinTossResult = {
  readonly coins: CoinSet;
  readonly method: CastingMethod;
  readonly coinCount: CoinCount;
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

function copyValidatedToss(toss: CoinTossResult, method?: CastingMethod): CoinTossResult {
  if (!toss || !Array.isArray(toss.coins)) {
    throw new TypeError('Each toss must include coin evidence.');
  }
  const copiedCoins = [...toss.coins] as CoinBit[];
  const count = copiedCoins.length;
  const expectedMethod: CastingMethod | undefined =
    count === 3 ? 'three-coin' : count === 4 ? 'four-coin' : undefined;
  if (
    !expectedMethod ||
    toss.method !== expectedMethod ||
    toss.coinCount !== count ||
    (method !== undefined && toss.method !== method) ||
    mapCoinsToLine(
      // SAFETY: expectedMethod checks the tuple length; mapCoinsToLine validates the bits.
      copiedCoins as unknown as CoinSet,
    ) !== toss.line
  ) {
    throw new TypeError('Each toss method, coin count, and line must match its coin evidence.');
  }
  return Object.freeze({
    // SAFETY: The checks above validate both the tuple length and each coin bit.
    coins: Object.freeze(copiedCoins) as unknown as CoinSet,
    method: toss.method,
    coinCount: toss.coinCount,
    line: toss.line,
  });
}

/** Copy and freeze six bottom-to-top tosses, rejecting mismatched coin/line evidence. */
export function createAutomaticTossSnapshot(
  tosses: readonly CoinTossResult[],
): AutomaticTossSnapshot {
  if (!Array.isArray(tosses) || tosses.length !== 6) {
    throw new TypeError('An automatic toss snapshot must contain exactly six tosses.');
  }

  const method = tosses[0]?.method;
  // SAFETY: The length check guarantees six tosses; map validates and preserves each entry.
  const snapshot = tosses.map(toss =>
    copyValidatedToss(toss, method),
  ) as unknown as AutomaticTossSnapshot;

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
  const method = tosses[0]?.method ?? toss.method;
  const copiedTosses = tosses.map(value => copyValidatedToss(value, method));
  return Object.freeze([...copiedTosses, copyValidatedToss(toss, method)]);
}

function isCoinBit(value: unknown): value is CoinBit {
  return value === 0 || value === 1;
}

/** Map three coin bits to a line value (0 contributes 2; 1 contributes 3). */
export function mapCoinsToLine(coins: CoinSet, method?: CastingMethod): LineValue {
  if (
    !Array.isArray(coins) ||
    (coins.length !== 3 && coins.length !== 4) ||
    (method !== undefined && method !== (coins.length === 3 ? 'three-coin' : 'four-coin'))
  ) {
    throw new TypeError('Coins must be three or four valid bits and match the selected method.');
  }
  for (const bit of coins) {
    if (!isCoinBit(bit)) throw new TypeError('Coins must contain only 0 or 1 bits.');
  }
  if (coins.length === 3) {
    const total = coins.reduce((sum, bit) => sum + (bit === 0 ? 2 : 3), 0);
    return total as LineValue;
  }
  const total = coins.reduce((sum, bit) => sum * 2 + bit, 0);
  return (total === 0 ? 6 : total <= 5 ? 7 : total <= 12 ? 8 : 9) as LineValue;
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

  toss(method: CastingMethod = 'three-coin'): CoinTossResult {
    const coinCount: CoinCount = method === 'three-coin' ? 3 : 4;
    const coins: CoinBit[] = Array.from({ length: coinCount }, () => 0);
    for (let index = 0; index < coins.length; index += 1) {
      const bit: unknown = this.source();
      if (!isCoinBit(bit)) {
        throw new TypeError('Coin bit source must return 0 or 1.');
      }
      coins[index] = bit;
    }
    return Object.freeze({
      // SAFETY: coinCount fixes the tuple length and the loop validates every bit.
      coins: Object.freeze(coins) as unknown as CoinSet,
      method,
      coinCount,
      line: mapCoinsToLine(
        // SAFETY: coinCount fixes the tuple length and the loop validates every bit.
        coins as unknown as CoinSet,
        method,
      ),
    });
  }

  cast(method: CastingMethod = 'three-coin'): CastingResult {
    // SAFETY: Array.from creates exactly six validated tosses.
    const tosses = Object.freeze(
      Array.from({ length: 6 }, () => this.toss(method)) as unknown as CastingResult['tosses'],
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
