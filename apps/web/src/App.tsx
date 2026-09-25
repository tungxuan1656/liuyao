import { useMemo } from 'react';
import { countChangingLines, inspectReading, type LineValue } from '@liuyao/core';
import { getKnowledgeMetadata } from '@liuyao/knowledge';
import PWABadge from './PWABadge';
import './App.css';

export default function App() {
  const sampleLines: readonly LineValue[] = useMemo(() => [7, 8, 9, 8, 7, 6], []);
  const reading = useMemo(() => inspectReading({ lines: [7, 8, 9, 8, 7, 6] }), []);
  const knowledge = useMemo(() => getKnowledgeMetadata(), []);

  return (
    <main className="container">
      <header className="header">
        <h1>Lục Hào</h1>
        <p className="subtitle">Liu Yao / I Ching Tool</p>
      </header>

      <section className="status-card">
        <p className="status-message">Core engine connected successfully.</p>

        <div className="info-block">
          <h2>@liuyao/core verification</h2>
          <p>
            Sample Lines: <code>[{sampleLines.join(', ')}]</code>
          </p>
          <p>
            Changing Lines Detected: <strong>{countChangingLines(sampleLines)}</strong>
          </p>
          <p>
            Has Changing Lines: <strong>{reading.hasChangingLines ? 'Yes' : 'No'}</strong>
          </p>
        </div>

        <div className="info-block">
          <h2>@liuyao/knowledge verification</h2>
          <p>
            Knowledge Base: <strong>{knowledge.name}</strong>
          </p>
          <p className="meta-desc">{knowledge.description}</p>
        </div>
      </section>

      <PWABadge />
    </main>
  );
}
