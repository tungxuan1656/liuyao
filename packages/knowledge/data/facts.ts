import type { FactDefinition } from '../src/schema.js';

/** Rules that explain each deterministic ReadingResult and PrimaryLineResult fact. */
export const FACTS = [
  { id: 'result.ruleset', ruleIds: ['rule-reading-result-fields'] },
  { id: 'result.lines', ruleIds: ['rule-line-position-order'] },
  { id: 'result.primaryHexagramId', ruleIds: ['rule-trigram-composition'] },
  { id: 'result.changedHexagramId', ruleIds: ['rule-moving-line-change'] },
  { id: 'result.lowerTrigramId', ruleIds: ['rule-trigram-composition'] },
  { id: 'result.upperTrigramId', ruleIds: ['rule-trigram-composition'] },
  { id: 'result.palaceId', ruleIds: ['rule-palace-and-markers'] },
  { id: 'result.palaceElement', ruleIds: ['rule-palace-and-markers'] },
  { id: 'result.shiPosition', ruleIds: ['rule-palace-and-markers'] },
  { id: 'result.yingPosition', ruleIds: ['rule-palace-and-markers'] },
  { id: 'line.position', ruleIds: ['rule-line-position-order'] },
  { id: 'line.inputValue', ruleIds: ['rule-line-polarity-values'] },
  { id: 'line.polarity', ruleIds: ['rule-line-polarity-values'] },
  { id: 'line.changing', ruleIds: ['rule-moving-line-change'] },
  { id: 'line.naJiaStem', ruleIds: ['rule-na-jia-assignment'] },
  { id: 'line.naJiaBranch', ruleIds: ['rule-na-jia-assignment'] },
  { id: 'line.element', ruleIds: ['rule-branch-element'] },
  {
    id: 'line.relative',
    ruleIds: ['rule-five-element-cycles', 'rule-six-relative-classification'],
  },
  { id: 'line.shiYing', ruleIds: ['rule-palace-and-markers'] },
] as const satisfies readonly FactDefinition[];
