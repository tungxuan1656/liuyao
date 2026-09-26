import type { LineValue, SixLines, TrigramId } from './contracts.js';
import { linePolarity } from './polarity.js';

/** Keys are bottom-to-top; 1 is yang, 0 is yin. */
const TRIGRAM_BY_PATTERN: Record<string, TrigramId> = {
  '111': 'trigram-heaven',
  '110': 'trigram-lake',
  '101': 'trigram-fire',
  '100': 'trigram-thunder',
  '011': 'trigram-wind',
  '010': 'trigram-water',
  '001': 'trigram-mountain',
  '000': 'trigram-earth',
};

export function identifyTrigram(lines: readonly [LineValue, LineValue, LineValue]): TrigramId {
  const pattern = lines.map(line => (linePolarity(line) === 'yang' ? '1' : '0')).join('');
  const trigram = TRIGRAM_BY_PATTERN[pattern];
  if (!trigram) throw new Error(`Unknown trigram pattern: ${pattern}`);
  return trigram;
}

export function identifyTrigrams(lines: SixLines): {
  lowerTrigramId: TrigramId;
  upperTrigramId: TrigramId;
} {
  return {
    lowerTrigramId: identifyTrigram([lines[0], lines[1], lines[2]]),
    upperTrigramId: identifyTrigram([lines[3], lines[4], lines[5]]),
  };
}
