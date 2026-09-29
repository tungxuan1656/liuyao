export type CastingLineValue = 6 | 7 | 8 | 9;

export type LinePresentation = {
  readonly name: string;
  readonly polarity: 'Âm' | 'Dương';
  readonly motion: 'tĩnh' | 'động';
  readonly changesTo?: 'Âm' | 'Dương';
};

const PRESENTATION: Record<CastingLineValue, LinePresentation> = {
  6: { name: 'Lão âm', polarity: 'Âm', motion: 'động', changesTo: 'Dương' },
  7: { name: 'Thiếu dương', polarity: 'Dương', motion: 'tĩnh' },
  8: { name: 'Thiếu âm', polarity: 'Âm', motion: 'tĩnh' },
  9: { name: 'Lão dương', polarity: 'Dương', motion: 'động', changesTo: 'Âm' },
};

export function getLinePresentation(value: number): LinePresentation {
  if (value !== 6 && value !== 7 && value !== 8 && value !== 9) {
    throw new TypeError('Line value must be 6, 7, 8, or 9.');
  }
  return PRESENTATION[value];
}

export function describeLineValue(value: number): string {
  const presentation = getLinePresentation(value);
  return presentation.changesTo
    ? `${presentation.polarity} · ${presentation.motion} · biến thành ${presentation.changesTo}`
    : `${presentation.polarity} · ${presentation.motion}`;
}
