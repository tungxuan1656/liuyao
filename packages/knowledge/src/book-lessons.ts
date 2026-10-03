export interface BookLessonTableTarget {
  readonly kind: 'table';
  readonly recordId: string;
  readonly id: `table-${string}`;
}

export interface BookLessonFigureTarget {
  readonly kind: 'figure';
  readonly recordId: string;
  readonly id: `figure-${string}`;
}

export type BookLessonTarget = BookLessonTableTarget | BookLessonFigureTarget;

export interface BookLessonTextBlock {
  readonly id: string;
  readonly position: number;
  readonly kind: 'prose' | 'worked-example';
  readonly text: string;
  readonly supportingClaimIds: NonEmptyReadonlyArray<string>;
}

interface BookLessonTargetBlockBase {
  readonly id: string;
  readonly position: number;
  readonly supportingClaimIds: NonEmptyReadonlyArray<string>;
}

export interface BookLessonTableBlock extends BookLessonTargetBlockBase {
  readonly kind: 'table';
  readonly target: BookLessonTableTarget;
}

export interface BookLessonFigureBlock extends BookLessonTargetBlockBase {
  readonly kind: 'figure';
  readonly target: BookLessonFigureTarget;
}

export type BookLessonBlock = BookLessonTextBlock | BookLessonTableBlock | BookLessonFigureBlock;
import type { NonEmptyReadonlyArray } from './book-figures.js';
