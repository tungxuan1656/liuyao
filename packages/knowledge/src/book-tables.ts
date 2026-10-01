import type { HexagramId, TrigramId } from './schema.js';
import type { BookElement } from './book-schema.js';

type Table<Kind extends string, Row> = {
  readonly kind: Kind;
  readonly claimIds: readonly string[];
  readonly rows: readonly Row[];
};
type StemBranch = { readonly stemId: `term-${string}`; readonly branchId: `term-${string}` };

export type BookTable =
  | Table<
      'palaces',
      {
        readonly trigramId: TrigramId;
        readonly element: BookElement;
        readonly hexagramIds: readonly HexagramId[];
      }
    >
  | Table<
      'na-jia',
      {
        readonly trigramId: TrigramId;
        readonly inner: readonly StemBranch[];
        readonly outer: readonly StemBranch[];
      }
    >
  | Table<
      'markers',
      {
        readonly palaceSequence: number;
        readonly shiPosition: number;
        readonly yingPosition: number;
      }
    >
  | Table<'branch-elements', { readonly branchId: `term-${string}`; readonly element: BookElement }>
  | Table<
      'element-cycles',
      {
        readonly from: BookElement;
        readonly relation: 'generates' | 'controls';
        readonly to: BookElement;
      }
    >
  | Table<
      'relative-relations',
      {
        readonly relation:
          | 'same'
          | 'palace-generates-line'
          | 'palace-controls-line'
          | 'line-controls-palace'
          | 'line-generates-palace';
        readonly relativeId: `term-${string}`;
      }
    >
  | Table<
      'coin-outcomes',
      {
        readonly sapCount: number;
        readonly nguaCount: number;
        readonly lineClass: 'young-yang' | 'young-yin' | 'old-yang' | 'old-yin';
        readonly polarity: 'yin' | 'yang';
        readonly changing: boolean;
      }
    >
  | Table<
      'transformation',
      {
        readonly primaryHexagramId: HexagramId;
        readonly changedHexagramId: HexagramId;
        readonly movingPositions: readonly number[];
        readonly primaryLines: readonly ('yin' | 'yang')[];
        readonly changedLines: readonly ('yin' | 'yang')[];
      }
    >;
