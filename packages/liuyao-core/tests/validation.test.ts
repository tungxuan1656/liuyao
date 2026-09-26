import { describe, expect, it } from 'vitest';
import { RULE_SET_ID } from '../src/contracts';
import {
  InvalidReadingInputError,
  UnsupportedRuleSetError,
  validateReadingInput,
  validateSixLines,
} from '../src/validation';

describe('runtime validation', () => {
  it.each([
    ['non-array', null],
    ['short array', [6, 7, 8, 9, 6]],
    ['long array', [6, 7, 8, 9, 6, 7, 8]],
    ['fractional line', [6, 7, 8.5, 9, 6, 7]],
    ['line below range', [5, 7, 8, 9, 6, 7]],
    ['line above range', [6, 7, 8, 10, 6, 7]],
    ['string line', [6, 7, '8', 9, 6, 7]],
    ['sparse array', new Array<number>(6)],
  ])('rejects %s', (_description, value) => {
    expect(() => validateSixLines(value)).toThrow(InvalidReadingInputError);
  });

  it('accepts each allowed value and preserves bottom-to-top order', () => {
    expect(validateSixLines([6, 7, 8, 9, 6, 7])).toEqual([6, 7, 8, 9, 6, 7]);
  });

  it('normalizes the sole supported ruleset when omitted', () => {
    expect(validateReadingInput({ lines: [6, 7, 8, 9, 6, 7] })).toEqual({
      lines: [6, 7, 8, 9, 6, 7],
      ruleset: RULE_SET_ID,
    });
  });

  it('rejects unsupported rulesets with a distinct typed error', () => {
    expect(() => validateReadingInput({ lines: [6, 7, 8, 9, 6, 7], ruleset: 'future-v2' })).toThrow(
      UnsupportedRuleSetError,
    );
    try {
      validateReadingInput({ lines: [6, 7, 8, 9, 6, 7], ruleset: 'future-v2' });
    } catch (error) {
      expect(error).toBeInstanceOf(UnsupportedRuleSetError);
      expect((error as UnsupportedRuleSetError).receivedRuleSet).toBe('future-v2');
      expect((error as UnsupportedRuleSetError).code).toBe('UNSUPPORTED_RULESET');
    }
  });

  it('rejects malformed reading objects and malformed optional fields', () => {
    expect(() => validateReadingInput(null)).toThrow(InvalidReadingInputError);
    expect(() => validateReadingInput({ lines: [6, 7, 8, 9, 6, 7], timezone: 4 })).toThrow(
      InvalidReadingInputError,
    );
  });
});
