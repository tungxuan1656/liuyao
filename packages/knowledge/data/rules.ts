import type { KnowledgeRule } from '../src/schema';

const RULESET = 'liuyao-standard-v1' as const;

export const RULES = [
  {
    id: 'rule-reading-result-fields',
    ruleset: RULESET,
    title: 'Reading result fields',
    explanation:
      'The result carries its ruleset, primary and changed figure identifiers, lower and upper trigram identifiers, palace and palace element, and the Shi and Ying positions. These are calculated classifications, not predictions.',
  },
  {
    id: 'rule-line-position-order',
    ruleset: RULESET,
    title: 'Line ordering',
    explanation:
      'The six line records are ordered from the bottom upward and have positions one through six in that order.',
  },
  {
    id: 'rule-line-polarity-values',
    ruleset: RULESET,
    title: 'Line values and polarity',
    explanation:
      'Input values six and eight are yin; values seven and nine are yang. The value remains reported for the primary line.',
  },
  {
    id: 'rule-moving-line-change',
    ruleset: RULESET,
    title: 'Moving-line change',
    explanation:
      'Values six and nine mark moving lines. Their polarity reverses to form the changed figure; stationary lines retain their polarity. With no moving lines there is no changed-figure identifier.',
  },
  {
    id: 'rule-trigram-composition',
    ruleset: RULESET,
    title: 'Trigram composition',
    explanation:
      'Lines one through three form the lower trigram and lines four through six form the upper trigram; the pair identifies the primary figure.',
  },
  {
    id: 'rule-palace-and-markers',
    ruleset: RULESET,
    title: 'Palace and line markers',
    explanation:
      'The primary figure is classified to a palace under this ruleset. Its palace classification supplies one Shi position and one Ying position, reported as bottom-up line numbers.',
  },
  {
    id: 'rule-na-jia-assignment',
    ruleset: RULESET,
    title: 'Na Jia line assignment',
    explanation:
      'Each primary line receives a stem and branch through the assignment for its trigram side and line position. The first three lines use the lower trigram; the last three use the upper trigram.',
  },
  {
    id: 'rule-branch-element',
    ruleset: RULESET,
    title: 'Branch element association',
    explanation:
      'The line element is the conventional element associated with its assigned earthly branch: Zi and Hai water; Chou, Chen, Wei, and Xu earth; Yin and Mao wood; Si and Wu fire; Shen and You metal.',
  },
  {
    id: 'rule-five-element-cycles',
    ruleset: RULESET,
    title: 'Five-element cycles',
    explanation:
      'The generation sequence is wood, fire, earth, metal, water, then wood. The control sequence is wood controls earth, earth controls water, water controls fire, fire controls metal, and metal controls wood.',
  },
  {
    id: 'rule-six-relative-classification',
    ruleset: RULESET,
    title: 'Six Relative classification',
    explanation:
      'Relative to the palace element: equal is Sibling; palace generates line is Child; palace controls line is Wealth; line controls palace is Official-Ghost; line generates palace is Parent. These are five categories.',
  },
] as const satisfies readonly KnowledgeRule[];
