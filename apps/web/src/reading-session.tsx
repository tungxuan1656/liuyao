import {
  type AutomaticTossSnapshot,
  type CastingMethod,
  type CoinTossResult,
  createAutomaticTossSnapshot,
  type LineValue,
  type ReadingResult,
} from '@liuyao/core';
import { createContext, type ReactNode, useContext, useRef, useState } from 'react';

export type ReadingMethod = 'automatic' | 'manual' | 'direct';

type ReadingDraft = {
  question: string;
  method: ReadingMethod;
  lines: number[];
  step: number;
  coinMethod: CastingMethod;
  tosses?: readonly CoinTossResult[];
  manualTosses?: readonly (CoinTossResult | undefined)[];
  manualConfirmed?: readonly boolean[];
  manualPreviewLines?: readonly (number | undefined)[];
};

type ReadingBase = {
  question: string;
  lines: readonly LineValue[];
  result: ReadingResult;
};

type ReadingCompletion = ReadingBase & {
  method: ReadingMethod;
  tosses?: readonly CoinTossResult[];
};

export type ActiveReading =
  | (ReadingBase & { method: 'automatic'; tosses: AutomaticTossSnapshot })
  | (ReadingBase & { method: 'manual' | 'direct'; tosses?: never });

type ReadingSessionValue = {
  question: string;
  method: ReadingMethod;
  draft: ReadingDraft | null;
  reading: ActiveReading | null;
  setQuestion: (question: string) => void;
  setMethod: (method: ReadingMethod) => void;
  setDraft: (draft: ReadingDraft | null) => void;
  completeReading: (reading: ReadingCompletion) => void;
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
          if (nextReading.method === 'automatic') {
            if (!nextReading.tosses) {
              throw new TypeError('Automatic readings require six toss records.');
            }
            const tosses = createAutomaticTossSnapshot(nextReading.tosses);
            if (tosses.some((toss, index) => toss.line !== nextReading.lines[index])) {
              throw new TypeError('Automatic toss evidence must match the reading lines.');
            }
            setReading({
              question: nextReading.question,
              method: 'automatic',
              lines: nextReading.lines,
              result: nextReading.result,
              tosses,
            });
          } else {
            setReading({
              question: nextReading.question,
              method: nextReading.method,
              lines: nextReading.lines,
              result: nextReading.result,
            });
          }
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

export function useReadingSession() {
  const session = useContext(ReadingSessionContext);
  if (!session) throw new Error('ReadingSessionProvider is missing.');
  return session;
}
