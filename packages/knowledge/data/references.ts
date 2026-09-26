import type { SourceReference } from '../src/schema';

export const REFERENCES = [
  {
    id: 'reference-zhouyi-trigram-associations',
    sourceId: 'source-zhouyi',
    targetIds: ['term-trigram'],
    location: 'Shuo Gua (說卦傳), discussion of the eight trigrams and their associated qualities.',
  },
] as const satisfies readonly SourceReference[];
