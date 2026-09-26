import { RULE_SET_ID, type HexagramReadingInput, type SixLines } from './contracts';

export type DomainErrorCode = 'INVALID_READING_INPUT' | 'UNSUPPORTED_RULESET';

export class InvalidReadingInputError extends Error {
  readonly code = 'INVALID_READING_INPUT' as const;

  constructor(message: string) {
    super(message);
    this.name = 'InvalidReadingInputError';
  }
}

export class UnsupportedRuleSetError extends Error {
  readonly code = 'UNSUPPORTED_RULESET' as const;

  constructor(readonly receivedRuleSet: unknown) {
    super(`Unsupported ruleset: ${String(receivedRuleSet)}`);
    this.name = 'UnsupportedRuleSetError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Validate the untrusted line boundary without changing its bottom-to-top order. */
export function validateSixLines(value: unknown): SixLines {
  if (!Array.isArray(value) || value.length !== 6) {
    throw new InvalidReadingInputError('Lines must be an array of exactly six values.');
  }
  for (let index = 0; index < 6; index += 1) {
    const line: unknown = value[index];
    if (typeof line !== 'number' || !Number.isInteger(line) || line < 6 || line > 9) {
      throw new InvalidReadingInputError('Each line must be an integer from 6 through 9.');
    }
  }
  return [...value] as unknown as SixLines;
}

/** Validate untyped reading data and normalize an omitted ruleset to the sole supported one. */
export function validateReadingInput(value: unknown): HexagramReadingInput {
  if (!isRecord(value)) {
    throw new InvalidReadingInputError('Reading input must be an object.');
  }
  if (value.ruleset !== undefined && value.ruleset !== RULE_SET_ID) {
    throw new UnsupportedRuleSetError(value.ruleset);
  }
  const lines = validateSixLines(value.lines);
  if (
    value.datetime !== undefined &&
    !(value.datetime instanceof Date) &&
    typeof value.datetime !== 'string'
  ) {
    throw new InvalidReadingInputError('Datetime must be a Date or string.');
  }
  if (value.timezone !== undefined && typeof value.timezone !== 'string') {
    throw new InvalidReadingInputError('Timezone must be a string.');
  }

  return {
    lines,
    ...(value.datetime === undefined ? {} : { datetime: value.datetime }),
    ...(value.timezone === undefined ? {} : { timezone: value.timezone }),
    ruleset: RULE_SET_ID,
  };
}
