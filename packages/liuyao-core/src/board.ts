import type {
  FiveElement,
  PrimaryLineResult,
  ReadingResult,
  ResultLinePosition,
  SixPrimaryLineResults,
  SixRelative,
} from './contracts.js';
import { calculateHexagram } from './calculation.js';
import { branchElement, assignNaJia } from './na-jia.js';
import { isChangingLine, linePolarity } from './polarity.js';
import { identifyPalace } from './palaces.js';
import { validateReadingInput } from './validation.js';

/** Classify a line element by its five-element relation to the palace element. */
export function sixRelative(palaceElement: FiveElement, lineElement: FiveElement): SixRelative {
  if (palaceElement === lineElement) return 'sibling';
  if (generates(palaceElement, lineElement)) return 'child';
  if (controls(palaceElement, lineElement)) return 'wealth';
  if (controls(lineElement, palaceElement)) return 'official-ghost';
  return 'parent';
}

const GENERATION_CYCLE: readonly FiveElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
const CONTROL_CYCLE: Readonly<Record<FiveElement, FiveElement>> = {
  wood: 'earth',
  fire: 'metal',
  earth: 'water',
  metal: 'wood',
  water: 'fire',
};

function generates(source: FiveElement, target: FiveElement): boolean {
  const sourceIndex = GENERATION_CYCLE.indexOf(source);
  return GENERATION_CYCLE[(sourceIndex + 1) % GENERATION_CYCLE.length] === target;
}

function controls(source: FiveElement, target: FiveElement): boolean {
  return CONTROL_CYCLE[source] === target;
}

/** Calculate structured primary-hexagram board facts from untrusted reading input. */
export function calculateReading(input: unknown): ReadingResult {
  const calculation = calculateHexagram(input);
  const { lines } = validateReadingInput(input);
  const palace = identifyPalace(calculation.primaryHexagramId);
  const innerAssignments = assignNaJia(calculation.lowerTrigramId, 'inner');
  const outerAssignments = assignNaJia(calculation.upperTrigramId, 'outer');

  const primaryLines = lines.map((inputValue, index): PrimaryLineResult => {
    const position = (index + 1) as ResultLinePosition;
    const assignment = index < 3 ? innerAssignments[index]! : outerAssignments[index - 3]!;
    const element = branchElement(assignment.branch);
    const shiYing =
      position === palace.shiPosition
        ? 'shi'
        : position === palace.yingPosition
          ? 'ying'
          : undefined;

    return {
      position,
      inputValue,
      polarity: linePolarity(inputValue),
      changing: isChangingLine(inputValue),
      naJiaStem: assignment.stem,
      naJiaBranch: assignment.branch,
      element,
      relative: sixRelative(palace.palaceElement, element),
      ...(shiYing === undefined ? {} : { shiYing }),
    };
  }) as unknown as SixPrimaryLineResults;

  return {
    ruleset: calculation.ruleset,
    lines: primaryLines,
    primaryHexagramId: calculation.primaryHexagramId,
    changedHexagramId: calculation.changedHexagramId,
    lowerTrigramId: calculation.lowerTrigramId,
    upperTrigramId: calculation.upperTrigramId,
    palaceId: palace.palaceId,
    palaceElement: palace.palaceElement,
    shiPosition: palace.shiPosition,
    yingPosition: palace.yingPosition,
  };
}
