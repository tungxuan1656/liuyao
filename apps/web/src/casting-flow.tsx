import { useEffect, useRef, useState } from 'react';
import { calculateReading, normalizeDirectInput, normalizeSequentialInput } from '@liuyao/core';
import { useBlocker, useNavigate } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { createBrowserCastingService } from './lib/browser-coin-source';
import { useReadingSession } from './reading-session';
import { ConfirmationDialog } from './components/confirmation-dialog';

const validValues = [6, 7, 8, 9] as const;

export function CastingFlow() {
  const navigate = useNavigate();
  const { draft, setDraft, completeReading } = useReadingSession();
  const [error, setError] = useState('');
  const isCompleting = useRef(false);
  const isLeavingAfterDiscard = useRef(false);
  const [resetLines, setResetLines] = useState(false);
  const [discard, setDiscard] = useState(false);
  const lines = draft?.lines ?? [];
  const hasInput = lines.length > 0;
  const blocker = useBlocker(
    () => hasInput && !isCompleting.current && !isLeavingAfterDiscard.current,
  );

  useEffect(() => {
    if (!hasInput) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeUnload);
    return () => window.removeEventListener('beforeunload', warnBeforeUnload);
  }, [hasInput]);

  function finish(values: number[]) {
    try {
      const input =
        draft?.method === 'direct'
          ? normalizeDirectInput(values)
          : normalizeSequentialInput(values);
      completeReading({
        question: draft?.question ?? '',
        method: draft?.method ?? 'manual',
        lines: input.lines,
        result: calculateReading(input),
      });
      isCompleting.current = true;
      setError('');
      navigate(ROUTES.home);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Check the six line values and try again.');
    }
  }

  function updateLine(index: number, value: string) {
    if (!draft) return;
    const next = [...draft.lines];
    if (value === '') delete next[index];
    else next[index] = Number(value);
    setDraft({ ...draft, lines: next });
    setError('');
  }

  function cancelFlow() {
    if (hasInput) setDiscard(true);
    else {
      setDraft(null);
      navigate(ROUTES.home);
    }
  }

  function discardAndGoHome() {
    setDraft(null);
    setDiscard(false);
    if (blocker.state === 'blocked') blocker.proceed();
    else {
      isLeavingAfterDiscard.current = true;
      navigate(ROUTES.home);
    }
  }

  function castAutomatically() {
    try {
      const values = createBrowserCastingService().cast().input.lines;
      finish([...values]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Secure casting is unavailable.');
    }
  }

  if (!draft) {
    return (
      <main className="reading-page">
        <h1>New Reading</h1>
        <p role="status">Choose a method to begin.</p>
        <button type="button" onClick={() => navigate(ROUTES.home)}>
          Return to Reading
        </button>
      </main>
    );
  }

  const direct = draft.method === 'direct';
  const step = Math.min(draft.step, 5);
  const canCalculate = Array.from({ length: 6 }, (_, index) =>
    validValues.includes(lines[index] as (typeof validValues)[number]),
  ).every(Boolean);
  return (
    <main className="reading-page casting-page">
      <header className="flow-header">
        <button type="button" onClick={cancelFlow}>
          Cancel
        </button>
        <p>
          {direct
            ? 'Direct entry'
            : draft.method === 'automatic'
              ? 'Automatic casting'
              : 'Manual casting'}
        </p>
      </header>
      <h1>
        {direct
          ? 'Enter six lines'
          : draft.method === 'automatic'
            ? 'Cast your reading'
            : `Line ${step + 1} of 6`}
      </h1>
      {draft.question && (
        <p className="question-summary">Question (session only): {draft.question}</p>
      )}
      {draft.method === 'automatic' ? (
        <section className="reading-card">
          <p>Six line values will be generated with browser cryptographic randomness.</p>
          <button type="button" onClick={castAutomatically}>
            Cast six lines
          </button>
        </section>
      ) : direct ? (
        <section
          className="reading-card line-entry-list"
          aria-label="Enter line values, sixth line first"
        >
          {[5, 4, 3, 2, 1, 0].map(index => (
            <label key={index}>
              Line {index + 1}
              <select
                aria-label={`Line ${index + 1}`}
                value={lines[index] ?? ''}
                onChange={event => updateLine(index, event.target.value)}
              >
                <option value="">Choose value</option>
                {validValues.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <button type="button" disabled={!canCalculate} onClick={() => finish(lines)}>
            Calculate
          </button>
        </section>
      ) : (
        <section className="reading-card">
          <label htmlFor="manual-line">Line value ({step + 1}, first line first)</label>
          <select
            id="manual-line"
            value={lines[step] ?? ''}
            onChange={event => updateLine(step, event.target.value)}
          >
            <option value="">Choose value</option>
            {validValues.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <div className="flow-actions">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setDraft({ ...draft, step: step - 1 })}
            >
              Back
            </button>
            {step < 5 ? (
              <button
                type="button"
                disabled={!validValues.includes(lines[step] as (typeof validValues)[number])}
                onClick={() => setDraft({ ...draft, step: step + 1 })}
              >
                Next line
              </button>
            ) : (
              <button type="button" disabled={!canCalculate} onClick={() => finish(lines)}>
                Calculate
              </button>
            )}
          </div>
        </section>
      )}
      <button
        type="button"
        className="secondary-action"
        onClick={() => {
          if (hasInput) setResetLines(true);
          else if (draft) setDraft({ ...draft, lines: [], step: 0 });
          setError('');
        }}
      >
        Reset lines
      </button>
      {!canCalculate && draft.method === 'direct' && (
        <p role="status">Enter a valid value for each of the six lines before calculating.</p>
      )}
      {!canCalculate && draft.method === 'manual' && step === 5 && (
        <p role="status">Enter line 6 before calculating. Your previous lines are preserved.</p>
      )}
      {resetLines && (
        <ConfirmationDialog
          title="Reset all lines?"
          confirmLabel="Reset lines"
          onCancel={() => setResetLines(false)}
          onConfirm={() => {
            if (draft) setDraft({ ...draft, lines: [], step: 0 });
            setResetLines(false);
          }}
        >
          This clears every entered line but keeps your question and casting method.
        </ConfirmationDialog>
      )}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      {blocker.state === 'blocked' && (
        <ConfirmationDialog
          title="Discard active lines?"
          confirmLabel="Discard and leave"
          onCancel={() => blocker.reset()}
          onConfirm={discardAndGoHome}
        >
          Discard active lines and return to reading setup?
        </ConfirmationDialog>
      )}
      {discard && (
        <ConfirmationDialog
          title="Discard active lines?"
          confirmLabel="Discard and return"
          onCancel={() => setDiscard(false)}
          onConfirm={discardAndGoHome}
        >
          Discard active lines and return to reading setup?
        </ConfirmationDialog>
      )}
    </main>
  );
}
