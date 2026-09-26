import { createContext, useContext, useState, type ReactNode } from 'react';
import type { LineValue, ReadingResult } from '@liuyao/core';

export type ReadingMethod = 'automatic' | 'manual' | 'direct';

type ReadingDraft = {
  question: string;
  method: ReadingMethod;
  lines: number[];
  step: number;
};

type ActiveReading = {
  question: string;
  method: ReadingMethod;
  lines: readonly LineValue[];
  result: ReadingResult;
};

type ReadingSessionValue = {
  draft: ReadingDraft | null;
  reading: ActiveReading | null;
  setDraft: (draft: ReadingDraft | null) => void;
  completeReading: (reading: ActiveReading) => void;
  clearReading: () => void;
};

const ReadingSessionContext = createContext<ReadingSessionValue | null>(null);

export function ReadingSessionProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ReadingDraft | null>(null);
  const [reading, setReading] = useState<ActiveReading | null>(null);

  return (
    <ReadingSessionContext.Provider
      value={{
        draft,
        reading,
        setDraft,
        completeReading: nextReading => {
          setReading(nextReading);
          setDraft(null);
        },
        clearReading: () => setReading(null),
      }}
    >
      {children}
    </ReadingSessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- keep the context hook with its provider.
export function useReadingSession() {
  const session = useContext(ReadingSessionContext);
  if (!session) throw new Error('ReadingSessionProvider is missing.');
  return session;
}
