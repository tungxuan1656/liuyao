import type { SourceReference } from '../src/schema';

export const REFERENCES = [
  {
    id: 'reference-zhouyi-trigram-associations',
    sourceId: 'source-zhouyi',
    targetIds: ['term-trigram'],
    location: 'Shuo Gua (說卦傳), discussion of the eight trigrams and their associated qualities.',
  },
  {
    id: 'reference-contract-reading-result',
    sourceId: 'source-liuyao-v1-contract',
    targetIds: [
      'rule-reading-result-fields',
      'rule-line-position-order',
      'rule-line-polarity-values',
      'rule-trigram-composition',
    ],
    location: 'ReadingResult, PrimaryLineResult, and the V1 calculation functions.',
  },
  {
    id: 'reference-zengshan-palace-markers',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-palace-and-markers'],
    location: 'Book 1, chapters 3 (Eight Palaces) and 6 (Shi and Ying).',
  },
  {
    id: 'reference-zengshan-na-jia',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-na-jia-assignment'],
    location: 'Book 1, chapter 4 (Hun Tian Jiazi / Na Jia).',
  },
  {
    id: 'reference-zengshan-moving-change',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-moving-line-change'],
    location: 'Book 1, chapter 7 (moving lines and change).',
  },
  {
    id: 'reference-zengshan-five-elements',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-branch-element', 'rule-five-element-cycles'],
    location: 'Book 1, chapters 11–12 (Five Element generation and control).',
  },
  {
    id: 'reference-zengshan-six-relatives',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-six-relative-classification'],
    location: 'Book 1, chapter 5 (Six Relatives).',
  },
] as const satisfies readonly SourceReference[];
