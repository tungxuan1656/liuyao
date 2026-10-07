import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import {
  createAutomaticTossSnapshot,
  createStoredReadingRecord,
  validateSixLines,
  type CastingMethod,
  type AutomaticTossSnapshot,
  type CoinTossResult,
  type LineValue,
  type ReadingResult,
  type StoredReadingRecord,
} from '@liuyao/core';
import { saveStoredReadingRecord } from './lib/reading-history-storage';

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
  loadReadingIntoSession: (record: StoredReadingRecord) => void;
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

            try {
              const record = createStoredReadingRecord({
                question: nextReading.question,
                method: 'automatic',
                lines: validateSixLines(nextReading.lines),
                result: nextReading.result,
                tosses,
              });
              saveStoredReadingRecord(record);
            } catch {
              // Storage failure does not disrupt the in-memory reading flow
            }
          } else {
            setReading({
              question: nextReading.question,
              method: nextReading.method,
              lines: nextReading.lines,
              result: nextReading.result,
            });

            try {
              const record = createStoredReadingRecord({
                question: nextReading.question,
                method: nextReading.method,
                lines: validateSixLines(nextReading.lines),
                result: nextReading.result,
              });
              saveStoredReadingRecord(record);
            } catch {
              // Storage failure does not disrupt the in-memory reading flow
            }
          }
          setDraft(null);
        },
        loadReadingIntoSession: record => {
          setQuestion(record.question);
          setMethod(record.method);
          setDraft(null);
          if (record.method === 'automatic' && record.tosses) {
            setReading({
              question: record.question,
              method: 'automatic',
              lines: record.lines,
              result: record.result,
              tosses: record.tosses,
            });
          } else if (record.method === 'manual' || record.method === 'direct') {
            setReading({
              question: record.question,
              method: record.method,
              lines: record.lines,
              result: record.result,
            });
          }
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
