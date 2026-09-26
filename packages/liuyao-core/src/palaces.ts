import type { FiveElement, HexagramId, PalaceId, ResultLinePosition } from './contracts';

export interface PalaceClassification {
  palaceId: PalaceId;
  palaceElement: FiveElement;
  shiPosition: ResultLinePosition;
  yingPosition: ResultLinePosition;
}

const PALACE_ELEMENTS: Record<PalaceId, FiveElement> = {
  'palace-heaven': 'metal',
  'palace-lake': 'metal',
  'palace-fire': 'fire',
  'palace-thunder': 'wood',
  'palace-wind': 'wood',
  'palace-water': 'water',
  'palace-mountain': 'earth',
  'palace-earth': 'earth',
};

// Eight-palace order: pure, first through fifth generation, wandering, returning.
const PALACE_ROWS: readonly (readonly [PalaceId, readonly HexagramId[]])[] = [
  [
    'palace-heaven',
    [
      'hexagram-01',
      'hexagram-44',
      'hexagram-33',
      'hexagram-12',
      'hexagram-20',
      'hexagram-23',
      'hexagram-35',
      'hexagram-14',
    ],
  ],
  [
    'palace-lake',
    [
      'hexagram-58',
      'hexagram-47',
      'hexagram-45',
      'hexagram-31',
      'hexagram-39',
      'hexagram-15',
      'hexagram-62',
      'hexagram-54',
    ],
  ],
  [
    'palace-fire',
    [
      'hexagram-30',
      'hexagram-56',
      'hexagram-50',
      'hexagram-64',
      'hexagram-04',
      'hexagram-59',
      'hexagram-06',
      'hexagram-13',
    ],
  ],
  [
    'palace-thunder',
    [
      'hexagram-51',
      'hexagram-16',
      'hexagram-40',
      'hexagram-32',
      'hexagram-46',
      'hexagram-48',
      'hexagram-28',
      'hexagram-17',
    ],
  ],
  [
    'palace-wind',
    [
      'hexagram-57',
      'hexagram-09',
      'hexagram-37',
      'hexagram-42',
      'hexagram-25',
      'hexagram-21',
      'hexagram-27',
      'hexagram-18',
    ],
  ],
  [
    'palace-water',
    [
      'hexagram-29',
      'hexagram-60',
      'hexagram-03',
      'hexagram-63',
      'hexagram-49',
      'hexagram-55',
      'hexagram-36',
      'hexagram-07',
    ],
  ],
  [
    'palace-mountain',
    [
      'hexagram-52',
      'hexagram-22',
      'hexagram-26',
      'hexagram-41',
      'hexagram-38',
      'hexagram-10',
      'hexagram-61',
      'hexagram-53',
    ],
  ],
  [
    'palace-earth',
    [
      'hexagram-02',
      'hexagram-24',
      'hexagram-19',
      'hexagram-11',
      'hexagram-34',
      'hexagram-43',
      'hexagram-05',
      'hexagram-08',
    ],
  ],
];

const SHI_POSITIONS: readonly ResultLinePosition[] = [6, 1, 2, 3, 4, 5, 4, 3];
const CLASSIFICATIONS = new Map<HexagramId, PalaceClassification>(
  PALACE_ROWS.flatMap(([palaceId, hexagramIds]) =>
    hexagramIds.map((hexagramId, index) => {
      const shiPosition = SHI_POSITIONS[index]!;
      return [
        hexagramId,
        {
          palaceId,
          palaceElement: PALACE_ELEMENTS[palaceId],
          shiPosition,
          yingPosition: (((shiPosition + 2) % 6) + 1) as ResultLinePosition,
        },
      ];
    }),
  ),
);

/** Classify a primary hexagram within the traditional eight-palace system. */
export function identifyPalace(hexagramId: HexagramId): PalaceClassification {
  const classification = CLASSIFICATIONS.get(hexagramId);
  if (!classification) throw new Error(`Unknown hexagram ID: ${hexagramId}`);
  return classification;
}
