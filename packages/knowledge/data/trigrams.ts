import type { TrigramEntity } from '../src/schema.js';

export type TrigramRecord = TrigramEntity;

/** Trigrams in the same order used by @liuyao/core. */
export const TRIGRAMS = [
  {
    kind: 'trigram',
    id: 'trigram-heaven',
    name: 'Càn',
    aliases: [],
    explanation: 'Quái có ba hào dương, tượng trưng cho trời.',
  },
  {
    kind: 'trigram',
    id: 'trigram-lake',
    name: 'Đoài',
    aliases: [],
    explanation: 'Quái có thứ tự hào từ dưới lên là dương, dương, âm; tượng trưng cho đầm.',
  },
  {
    kind: 'trigram',
    id: 'trigram-fire',
    name: 'Ly',
    aliases: [],
    explanation: 'Quái có thứ tự hào từ dưới lên là dương, âm, dương; tượng trưng cho lửa.',
  },
  {
    kind: 'trigram',
    id: 'trigram-thunder',
    name: 'Chấn',
    aliases: [],
    explanation: 'Quái có thứ tự hào từ dưới lên là dương, âm, âm; tượng trưng cho sấm.',
  },
  {
    kind: 'trigram',
    id: 'trigram-wind',
    name: 'Tốn',
    aliases: [],
    explanation: 'Quái có thứ tự hào từ dưới lên là âm, dương, dương; tượng trưng cho gió.',
  },
  {
    kind: 'trigram',
    id: 'trigram-water',
    name: 'Khảm',
    aliases: [],
    explanation: 'Quái có thứ tự hào từ dưới lên là âm, dương, âm; tượng trưng cho nước.',
  },
  {
    kind: 'trigram',
    id: 'trigram-mountain',
    name: 'Cấn',
    aliases: [],
    explanation: 'Quái có thứ tự hào từ dưới lên là âm, âm, dương; tượng trưng cho núi.',
  },
  {
    kind: 'trigram',
    id: 'trigram-earth',
    name: 'Khôn',
    aliases: [],
    explanation: 'Quái có ba hào âm, tượng trưng cho đất.',
  },
] as const satisfies readonly TrigramRecord[];
