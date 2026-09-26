import type { TrigramEntity } from '../src/schema.js';

export type TrigramRecord = TrigramEntity;

/** Trigrams in the same order used by @liuyao/core. */
export const TRIGRAMS = [
  {
    kind: 'trigram',
    id: 'trigram-heaven',
    name: 'Qian',
    han: '乾',
    aliases: ['Heaven'],
    explanation: 'Three yang lines, associated with Heaven.',
  },
  {
    kind: 'trigram',
    id: 'trigram-lake',
    name: 'Dui',
    han: '兌',
    aliases: ['Lake'],
    explanation: 'Yang, yang, yin from bottom to top, associated with Lake.',
  },
  {
    kind: 'trigram',
    id: 'trigram-fire',
    name: 'Li',
    han: '離',
    aliases: ['Fire'],
    explanation: 'Yang, yin, yang from bottom to top, associated with Fire.',
  },
  {
    kind: 'trigram',
    id: 'trigram-thunder',
    name: 'Zhen',
    han: '震',
    aliases: ['Thunder'],
    explanation: 'Yang, yin, yin from bottom to top, associated with Thunder.',
  },
  {
    kind: 'trigram',
    id: 'trigram-wind',
    name: 'Xun',
    han: '巽',
    aliases: ['Wind'],
    explanation: 'Yin, yang, yang from bottom to top, associated with Wind.',
  },
  {
    kind: 'trigram',
    id: 'trigram-water',
    name: 'Kan',
    han: '坎',
    aliases: ['Water'],
    explanation: 'Yin, yang, yin from bottom to top, associated with Water.',
  },
  {
    kind: 'trigram',
    id: 'trigram-mountain',
    name: 'Gen',
    han: '艮',
    aliases: ['Mountain'],
    explanation: 'Yin, yin, yang from bottom to top, associated with Mountain.',
  },
  {
    kind: 'trigram',
    id: 'trigram-earth',
    name: 'Kun',
    han: '坤',
    aliases: ['Earth'],
    explanation: 'Three yin lines, associated with Earth.',
  },
] as const satisfies readonly (TrigramRecord & { readonly han: string })[];
