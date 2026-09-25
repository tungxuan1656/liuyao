import { describe, expect, it } from 'vitest';
import { countChangingLines, inspectReading, isChangingLine, type LineValue } from '../src/index';

describe('@liuyao/core', () => {
  it('identifies changing lines deterministically (6 and 9 are changing, 7 and 8 are stable)', () => {
    expect(isChangingLine(6)).toBe(true);
    expect(isChangingLine(9)).toBe(true);
    expect(isChangingLine(7)).toBe(false);
    expect(isChangingLine(8)).toBe(false);
  });

  it('counts changing lines correctly', () => {
    const lines: LineValue[] = [7, 8, 9, 8, 7, 6];
    expect(countChangingLines(lines)).toBe(2);
  });

  it('inspects a reading input deterministically', () => {
    const summary = inspectReading({
      lines: [7, 7, 7, 7, 7, 7],
    });
    expect(summary.hasChangingLines).toBe(false);
    expect(summary.changingLineCount).toBe(0);

    const summaryWithChanges = inspectReading({
      lines: [6, 7, 8, 9, 7, 8],
    });
    expect(summaryWithChanges.hasChangingLines).toBe(true);
    expect(summaryWithChanges.changingLineCount).toBe(2);
  });
});
