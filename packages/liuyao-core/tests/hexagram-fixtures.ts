import type { HexagramId, SixLines, TrigramId } from '../src/contracts';

/**
 * Independent oracle: Stanford Encyclopedia of Philosophy, "Chinese Philosophy of Change
 * (Yijing)", Appendices 1 and 3, https://plato.stanford.edu/entries/chinese-change/appendix.html
 * Each group is bottom-to-top: first three symbols = lower, last three = upper;
 * u is yang and w is yin. Appendix 3 prints #45 as "wws uuw", an apparent typo:
 * its earth/lake figure and Appendix 1's earth code require "www uuw".
 * #37 prints "wuw wuu", duplicating #59, but its ䷤ figure is fire/wind:
 * Appendix 1's fire code corrects the lower group to "uwu wuu".
 */
const SOURCE_CODES = [
  'uuu uuu',
  'www www',
  'uww wuw',
  'wuw wwu',
  'uuu wuw',
  'wuw uuu',
  'wuw www',
  'www wuw',
  'uuu wuu',
  'uuw uuu',
  'uuu www',
  'www uuu',
  'uwu uuu',
  'uuu uwu',
  'wwu www',
  'www uww',
  'uww uuw',
  'wuu wwu',
  'uuw www',
  'www wuu',
  'uww uwu',
  'uwu wwu',
  'www wwu',
  'uww www',
  'uww uuu',
  'uuu wwu',
  'uww wwu',
  'wuu uuw',
  'wuw wuw',
  'uwu uwu',
  'wwu uuw',
  'wuu uww',
  'wwu uuu',
  'uuu uww',
  'www uwu',
  'uwu www',
  'uwu wuu',
  'uuw uwu',
  'wwu wuw',
  'wuw uww',
  'uuw wwu',
  'uww wuu',
  'uuu uuw',
  'wuu uuu',
  'www uuw',
  'wuu www',
  'wuw uuw',
  'wuu wuw',
  'uwu uuw',
  'wuu uwu',
  'uww uww',
  'wwu wwu',
  'wwu wuu',
  'uuw uww',
  'uwu uww',
  'wwu uwu',
  'wuu wuu',
  'uuw uuw',
  'wuw wuu',
  'uuw wuw',
  'uuw wuu',
  'wwu uww',
  'uwu wuw',
  'wuw uwu',
] as const;

const SOURCE_TRIGRAMS: Record<string, TrigramId> = {
  uuu: 'trigram-heaven',
  uuw: 'trigram-lake',
  uwu: 'trigram-fire',
  uww: 'trigram-thunder',
  wuu: 'trigram-wind',
  wuw: 'trigram-water',
  wwu: 'trigram-mountain',
  www: 'trigram-earth',
};

export const HEXAGRAM_FIXTURES = SOURCE_CODES.map((code, index) => {
  const [lowerCode, upperCode] = code.split(' ') as [string, string];
  return {
    id: `hexagram-${String(index + 1).padStart(2, '0')}` as HexagramId,
    lower: SOURCE_TRIGRAMS[lowerCode]!,
    upper: SOURCE_TRIGRAMS[upperCode]!,
    lines: [...code.replace(' ', '')].map(symbol =>
      symbol === 'u' ? 7 : 8,
    ) as unknown as SixLines,
  };
});
