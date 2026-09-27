import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
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
  question: string;
  method: ReadingMethod;
  draft: ReadingDraft | null;
  reading: ActiveReading | null;
  setQuestion: (question: string) => void;
  setMethod: (method: ReadingMethod) => void;
  setDraft: (draft: ReadingDraft | null) => void;
  completeReading: (reading: ActiveReading) => void;
  clearReading: () => void;
  clearSession: () => void;
  updateAccepted: boolean;
  acceptUpdate: () => void;
  clearUpdateAccepted: () => void;
  isUpdateAccepted: () => boolean;
};

const ReadingSessionContext = createContext<ReadingSessionValue | null>(null);

export function ReadingSessionProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ReadingDraft | null>(null);
  const [reading, setReading] = useState<ActiveReading | null>(null);
  const [question, setQuestion] = useState('');
  const [method, setMethod] = useState<ReadingMethod>('automatic');
  const [updateAccepted, setUpdateAccepted] = useState(false);
  const updateAcceptedRef = useRef(false);

  return (
    <ReadingSessionContext.Provider
      value={{
        draft,
        reading,
        question,
        method,
        setQuestion,
        setMethod,
        setDraft,
        completeReading: nextReading => {
          setReading(nextReading);
          setDraft(null);
        },
        clearReading: () => setReading(null),
        clearSession: () => {
          setQuestion('');
          setMethod('automatic');
          setDraft(null);
          setReading(null);
        },
        updateAccepted,
        acceptUpdate: () => {
          updateAcceptedRef.current = true;
          setUpdateAccepted(true);
        },
        clearUpdateAccepted: () => {
          updateAcceptedRef.current = false;
          setUpdateAccepted(false);
        },
        isUpdateAccepted: () => updateAcceptedRef.current,
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
