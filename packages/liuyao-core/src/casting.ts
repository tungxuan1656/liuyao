import type { HexagramReadingInput, LineValue } from './contracts';
import { validateSixLines } from './validation';

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

function isCoinBit(value: unknown): value is CoinBit {
  return value === 0 || value === 1;
}

/** Map three coin bits to a line value (0 contributes 2; 1 contributes 3). */
export function mapCoinsToLine(coins: readonly [CoinBit, CoinBit, CoinBit]): LineValue {
  if (!Array.isArray(coins) || coins.length !== 3 || !coins.every(isCoinBit)) {
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
    return { coins, line: mapCoinsToLine(coins) };
  }

  cast(): CastingResult {
    const tosses = Array.from({ length: 6 }, () =>
      this.toss(),
    ) as unknown as CastingResult['tosses'];
    return {
      tosses,
      input: normalizeCastingInput(tosses.map(toss => toss.line)),
    };
  }
}
