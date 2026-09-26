import type { KnowledgeTerm } from '../src/schema.js';

export const TERMS = [
  {
    id: 'term-ruleset',
    name: 'Ruleset',
    aliases: [],
    definition: 'The named convention set under which a deterministic reading was produced.',
  },
  {
    id: 'term-primary-hexagram',
    name: 'Primary hexagram',
    aliases: [],
    definition: 'The six-line figure formed directly from the submitted line values.',
  },
  {
    id: 'term-changed-hexagram',
    name: 'Changed hexagram',
    aliases: [],
    definition:
      'The figure obtained by reversing the polarity of each moving line; absent when no line moves.',
  },
  {
    id: 'term-trigram',
    name: 'Trigram',
    aliases: ['Gua'],
    definition: 'A three-line figure; the lower and upper trigrams together form a hexagram.',
  },
  {
    id: 'term-lower-trigram',
    name: 'Lower trigram',
    aliases: [],
    definition: 'The bottom three lines of a hexagram, read from the base upward.',
  },
  {
    id: 'term-upper-trigram',
    name: 'Upper trigram',
    aliases: [],
    definition: 'The top three lines of a hexagram, read from the base upward.',
  },
  {
    id: 'term-line-position',
    name: 'Line position',
    aliases: [],
    definition: 'The ordinal place of a line, numbered one through six from bottom to top.',
  },
  {
    id: 'term-line-value',
    name: 'Line value',
    aliases: [],
    definition:
      'An input value of six, seven, eight, or nine, encoding polarity and moving status.',
  },
  {
    id: 'term-polarity',
    name: 'Polarity',
    aliases: [],
    definition: 'The yin or yang classification of a line in the primary figure.',
  },
  {
    id: 'term-yin',
    name: 'Yin',
    aliases: ['Yin line'],
    definition:
      'The broken-line polarity; in this ruleset input values six and eight have yin polarity.',
  },
  {
    id: 'term-yang',
    name: 'Yang',
    aliases: ['Yang line'],
    definition:
      'The solid-line polarity; in this ruleset input values seven and nine have yang polarity.',
  },
  {
    id: 'term-moving-line',
    name: 'Moving line',
    aliases: ['Changing line'],
    definition:
      'A line encoded by input value six or nine; its polarity reverses in the changed figure.',
  },
  {
    id: 'term-palace',
    name: 'Palace',
    aliases: [],
    definition:
      'One of the eight trigram-associated groups used to classify a primary hexagram in this convention.',
  },
  {
    id: 'term-palace-element',
    name: 'Palace element',
    aliases: [],
    definition: 'The five-element association assigned to the primary hexagram’s palace.',
  },
  {
    id: 'term-shi-line',
    name: 'Shi line',
    aliases: ['Shi'],
    definition: 'The line marked as the self position in the palace classification.',
  },
  {
    id: 'term-ying-line',
    name: 'Ying line',
    aliases: ['Ying'],
    definition:
      'The line marked as the corresponding responding position in the palace classification.',
  },
  {
    id: 'term-na-jia',
    name: 'Na Jia',
    aliases: ['納甲'],
    definition:
      'A system assigning heavenly stems and earthly branches to the lines of a hexagram through its trigrams.',
  },
  {
    id: 'term-heavenly-stem',
    name: 'Heavenly stem',
    aliases: ['Stem'],
    definition: 'One member of the ten-part stem cycle; Na Jia associates a stem with a line.',
  },
  {
    id: 'term-earthly-branch',
    name: 'Earthly branch',
    aliases: ['Branch'],
    definition:
      'One member of the twelve-part branch cycle; Na Jia associates a branch with a line.',
  },
  {
    id: 'term-five-elements',
    name: 'Five Elements',
    aliases: ['Wu Xing'],
    definition:
      'The wood, fire, earth, metal, and water categories used for associations and relational classification.',
  },
  {
    id: 'term-six-relative',
    name: 'Six Relatives',
    aliases: ['Liu Qin'],
    definition:
      'The conventional five labels classifying each line element in relation to the palace element; the name does not imply six categories.',
  },
  {
    id: 'term-relative-sibling',
    name: 'Sibling',
    aliases: [],
    definition: 'Six Relative assigned when the line element equals the palace element.',
  },
  {
    id: 'term-relative-child',
    name: 'Child',
    aliases: [],
    definition: 'Six Relative assigned when the palace element generates the line element.',
  },
  {
    id: 'term-relative-wealth',
    name: 'Wealth',
    aliases: [],
    definition: 'Six Relative assigned when the palace element controls the line element.',
  },
  {
    id: 'term-relative-official-ghost',
    name: 'Official-Ghost',
    aliases: [],
    definition: 'Six Relative assigned when the line element controls the palace element.',
  },
  {
    id: 'term-relative-parent',
    name: 'Parent',
    aliases: [],
    definition: 'Six Relative assigned when the line element generates the palace element.',
  },
  {
    id: 'term-element-generation',
    name: 'Generation cycle',
    aliases: [],
    definition:
      'The conventional cycle wood generates fire, fire earth, earth metal, metal water, and water wood.',
  },
  {
    id: 'term-element-control',
    name: 'Control cycle',
    aliases: [],
    definition:
      'The conventional cycle wood controls earth, earth water, water fire, fire metal, and metal wood.',
  },
  ...(['wood', 'fire', 'earth', 'metal', 'water'] as const).map(
    value =>
      ({
        id: `term-element-${value}`,
        name: value[0]!.toUpperCase() + value.slice(1),
        aliases: [],
        definition: `One of the Five Elements; ${value} is used as a conventional classification in this ruleset.`,
      }) as const,
  ),
  ...(['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui'] as const).map(
    value =>
      ({
        id: `term-stem-${value}`,
        name: value[0]!.toUpperCase() + value.slice(1),
        aliases: [],
        definition: `The ${value} heavenly stem, one member of the ten-stem cycle.`,
      }) as const,
  ),
  ...(
    ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai'] as const
  ).map(
    value =>
      ({
        id: `term-branch-${value}`,
        name: value[0]!.toUpperCase() + value.slice(1),
        aliases: [],
        definition: `The ${value} earthly branch, one member of the twelve-branch cycle.`,
      }) as const,
  ),
] as const satisfies readonly KnowledgeTerm[];
