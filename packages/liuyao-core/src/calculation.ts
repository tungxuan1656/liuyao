import {
  RULE_SET_ID,
  type HexagramCalculationResult,
  type ResultLinePosition,
} from './contracts.js';
import { identifyHexagram } from './hexagrams.js';
import { isChangingLine, transformChangingLines } from './polarity.js';
import { identifyTrigrams } from './trigrams.js';
import { validateReadingInput } from './validation.js';

export function calculateHexagram(input: unknown): HexagramCalculationResult {
  const { lines } = validateReadingInput(input);
  const primary = identifyTrigrams(lines);
  const changingPositions = lines.flatMap((line, index) =>
    isChangingLine(line) ? [(index + 1) as ResultLinePosition] : [],
  );
  const changed = changingPositions.length ? identifyTrigrams(transformChangingLines(lines)) : null;
  const changedHexagramId = changed
    ? identifyHexagram(changed.lowerTrigramId, changed.upperTrigramId)
    : null;
  return {
    ruleset: RULE_SET_ID,
    ...primary,
    primaryHexagramId: identifyHexagram(primary.lowerTrigramId, primary.upperTrigramId),
    changedHexagramId,
    changingPositions,
  };
}
