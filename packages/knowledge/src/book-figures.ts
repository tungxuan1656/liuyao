export type BookFigureKind = 'sequence' | 'placement' | 'transformation' | 'board' | 'plate';
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];

export interface BookAuthorAlternative {
  readonly author: string;
  readonly via?: string;
  readonly description: string;
  readonly claimIds: NonEmptyReadonlyArray<string>;
}

export interface BookFigureLabel {
  readonly id: string;
  readonly text: string;
  readonly claimIds: NonEmptyReadonlyArray<string>;
}

export interface BookFigureOrientation {
  readonly description: string;
  readonly claimIds: NonEmptyReadonlyArray<string>;
}

interface BookFigureBase {
  readonly id: `figure-${string}`;
  readonly title: string;
  readonly inspectionStatus: 'uninspected' | 'visually-inspected';
  readonly orientation?: BookFigureOrientation;
  readonly authorAlternatives?: readonly BookAuthorAlternative[];
}

export interface BookDiagramFigure extends BookFigureBase {
  readonly kind: Exclude<BookFigureKind, 'plate'>;
  readonly sourceUnitIds: NonEmptyReadonlyArray<string>;
  readonly labels: NonEmptyReadonlyArray<BookFigureLabel>;
  readonly claimIds: NonEmptyReadonlyArray<string>;
}

export interface BookPlateFigure extends BookFigureBase {
  readonly kind: 'plate';
  readonly sourceUnitIds: readonly string[];
  readonly labels: readonly BookFigureLabel[];
  readonly claimIds: readonly string[];
}

export type BookFigure = BookDiagramFigure | BookPlateFigure;

export interface BookTableMetadata {
  readonly id?: `table-${string}`;
  readonly sourceUnitIds?: NonEmptyReadonlyArray<string>;
  readonly authorAlternatives?: readonly BookAuthorAlternative[];
}
