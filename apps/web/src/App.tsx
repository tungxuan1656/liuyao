import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { ReadingMethod } from './reading-session';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { ConfirmationDialog } from './components/confirmation-dialog';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const { draft, reading, setDraft, clearReading } = useReadingSession();
  const [question, setQuestion] = useState('');
  const [method, setMethod] = useState<ReadingMethod>('automatic');
  const [replaceReading, setReplaceReading] = useState(false);

  const entryQuestion = draft?.question ?? question;
  const entryMethod = draft?.method ?? method;

  function begin() {
    if (draft) {
      navigate(ROUTES.casting);
      return;
    }
    setDraft({ question, method, lines: [], step: 0 });
    navigate(ROUTES.casting);
  }

  function confirmReplacement() {
    clearReading();
    setDraft(null);
    setQuestion('');
    setMethod('automatic');
    setReplaceReading(false);
  }

  function updateQuestion(value: string) {
    if (draft) setDraft({ ...draft, question: value });
    else setQuestion(value);
  }

  function updateMethod(value: ReadingMethod) {
    if (draft) setDraft({ ...draft, method: value });
    else setMethod(value);
  }

  return (
    <main className="reading-page">
      <header className="reading-heading">
        <p className="eyebrow">Reading workspace</p>
        <h1>Lục Hào</h1>
        <p>
          Create a six-line reading. Your question and active reading remain in this browser session
          only.
        </p>
      </header>

      {reading ? (
        <section className="reading-card" aria-labelledby="completed-reading-heading">
          <p className="eyebrow">Reading complete</p>
          <h2 id="completed-reading-heading">{reading.question || 'Untitled reading'}</h2>
          <p>
            Method:{' '}
            {reading.method === 'automatic'
              ? 'Automatic casting'
              : reading.method === 'manual'
                ? 'Manual casting'
                : 'Direct input'}
          </p>
          <p>Lines, first to sixth: {reading.lines.join(', ')}</p>
          <p>Primary hexagram: {reading.result.primaryHexagramId}</p>
          {reading.result.changedHexagramId && (
            <p>Changed hexagram: {reading.result.changedHexagramId}</p>
          )}
          <p className="session-note">
            This reading is held in memory and will be cleared if you reload the app.
          </p>
          <div className="flow-actions">
            <Link className="reading-link" to={ROUTES.library}>
              Library
            </Link>
            <Link className="reading-link" to={ROUTES.settings}>
              Settings
            </Link>
            <button type="button" onClick={() => setReplaceReading(true)}>
              New Reading
            </button>
          </div>
        </section>
      ) : (
        <section className="reading-card" aria-labelledby="new-reading-heading">
          <h2 id="new-reading-heading">New Reading</h2>
          {draft && <p role="status">A reading draft is in progress. Continue it or start over.</p>}
          <label htmlFor="reading-question">Question (optional)</label>
          <textarea
            id="reading-question"
            rows={3}
            value={entryQuestion}
            onChange={event => updateQuestion(event.target.value)}
            placeholder="What would you like to reflect on?"
          />
          <p className="session-note">
            Question is session-only and is not saved or backed up. Reloading can erase it.
          </p>
          <fieldset>
            <legend>Casting method</legend>
            {(
              [
                ['automatic', 'Automatic casting'],
                ['manual', 'Manual casting'],
                ['direct', 'Direct entry'],
              ] as const
            ).map(([value, label]) => (
              <label className="method-option" key={value}>
                <input
                  type="radio"
                  name="casting-method"
                  value={value}
                  checked={entryMethod === value}
                  onChange={() => updateMethod(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>
          <button type="button" onClick={begin}>
            {draft ? 'Continue Casting' : 'Start Casting'}
          </button>
          <p className="session-note">
            Draft and question exist only in memory; no history or backup is available.
          </p>
        </section>
      )}
      {replaceReading && (
        <ConfirmationDialog
          title="Start a new reading?"
          confirmLabel="Replace reading"
          cancelLabel="Keep current reading"
          onCancel={() => setReplaceReading(false)}
          onConfirm={confirmReplacement}
        >
          Starting a new reading replaces the current completed reading in memory.
        </ConfirmationDialog>
      )}
    </main>
  );
}
