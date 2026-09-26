import { describe, expect, it } from 'vitest';
import { RULE_SET_ID } from '../src/contracts';
import { createLines, createReadingInput } from './fixtures';

describe('reusable test fixtures', () => {
  it('returns independent tuples and inputs', () => {
    const first = createLines();
    const second = createLines();
    expect(first).not.toBe(second);
    expect(createReadingInput()).not.toBe(createReadingInput());
  });

  it('applies one-based line overrides in bottom-to-top order', () => {
    expect(createLines({ 1: 9, 4: 6 })).toEqual([9, 8, 9, 6, 7, 8]);
  });

  it('defaults reading fixtures to the standard ruleset', () => {
    expect(createReadingInput().ruleset).toBe(RULE_SET_ID);
  });
});
