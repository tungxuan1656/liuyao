import type { SourceReference } from '../src/schema.js';

export const REFERENCES = [
  {
    id: 'reference-zhouyi-trigram-associations',
    sourceId: 'source-zhouyi',
    targetIds: ['term-trigram'],
    location: 'Thiên Thuyết Quái, phần bàn về tám quái và các thuộc tính gắn với chúng.',
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
    location: 'Các cấu trúc dữ liệu kết quả gieo quẻ, kết quả từng hào và hàm tính phiên bản 1.',
  },
  {
    id: 'reference-zengshan-palace-markers',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-palace-and-markers'],
    location: 'Quyển 1, chương 3 (Bát cung) và chương 6 (Thế và Ứng).',
  },
  {
    id: 'reference-zengshan-na-jia',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-na-jia-assignment'],
    location: 'Quyển 1, chương 4 (Nạp Giáp).',
  },
  {
    id: 'reference-zengshan-moving-change',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-moving-line-change'],
    location: 'Quyển 1, chương 7 (hào động và sự biến đổi).',
  },
  {
    id: 'reference-zengshan-five-elements',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-branch-element', 'rule-five-element-cycles'],
    location: 'Quyển 1, chương 11–12 (ngũ hành tương sinh và tương khắc).',
  },
  {
    id: 'reference-zengshan-six-relatives',
    sourceId: 'source-zengshan-buyi',
    targetIds: ['rule-six-relative-classification'],
    location: 'Quyển 1, chương 5 (Lục thân).',
  },
] as const satisfies readonly SourceReference[];
