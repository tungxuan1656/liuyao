import type { TrigramEntity } from '../src/schema';

export type TrigramRecord = TrigramEntity;

/** Trigrams in the same order used by @liuyao/core. */
export const TRIGRAMS = [
  { kind: 'trigram', id: 'trigram-heaven', name: 'Qian', han: '乾', aliases: ['Heaven'] },
  { kind: 'trigram', id: 'trigram-lake', name: 'Dui', han: '兌', aliases: ['Lake'] },
  { kind: 'trigram', id: 'trigram-fire', name: 'Li', han: '離', aliases: ['Fire'] },
  { kind: 'trigram', id: 'trigram-thunder', name: 'Zhen', han: '震', aliases: ['Thunder'] },
  { kind: 'trigram', id: 'trigram-wind', name: 'Xun', han: '巽', aliases: ['Wind'] },
  { kind: 'trigram', id: 'trigram-water', name: 'Kan', han: '坎', aliases: ['Water'] },
  { kind: 'trigram', id: 'trigram-mountain', name: 'Gen', han: '艮', aliases: ['Mountain'] },
  { kind: 'trigram', id: 'trigram-earth', name: 'Kun', han: '坤', aliases: ['Earth'] },
] as const satisfies readonly (TrigramRecord & { readonly han: string })[];
