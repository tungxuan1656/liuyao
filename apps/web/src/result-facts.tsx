import type { RefObject } from 'react';
import { getSource, getRulesForFact, listSourceReferences } from '@liuyao/knowledge';
import type { KnowledgeFactId } from '@liuyao/knowledge';

export type FactSelection = { id: KnowledgeFactId; label: string; value: string };

export function FactButton({
  fact,
  onSelect,
}: {
  fact: FactSelection;
  onSelect: (fact: FactSelection) => void;
}) {
  return (
    <button
      className="fact-link"
      type="button"
      onClick={() => onSelect(fact)}
      aria-label={`${fact.label}: ${fact.value}. Explain this fact`}
    >
      <span>{fact.label}</span>
      <strong>{fact.value}</strong>
      <span aria-hidden="true">↗</span>
    </button>
  );
}
export function FactInspector({
  fact,
  close,
  closeRef,
}: {
  fact: FactSelection;
  close: () => void;
  closeRef?: RefObject<HTMLButtonElement | null>;
}) {
  const rules = getRulesForFact(fact.id);
  const references = listSourceReferences().filter(reference =>
    rules.some(rule => reference.targetIds.includes(rule.id)),
  );
  return (
    <div className="inspector-content">
      <div className="inspector-topline">
        <p className="result-kicker">Fact inspector</p>
        <button
          ref={closeRef}
          className="inspector-close"
          onClick={close}
          type="button"
          aria-label="Close fact inspector"
        >
          Close
        </button>
      </div>
      <h2>{fact.label}</h2>
      <p className="inspector-value">{fact.value}</p>
      <section className="inspector-section">
        <h3>Rule</h3>
        {rules.length ? (
          rules.map(rule => (
            <article className="rule-entry" key={rule.id}>
              <h4>{rule.title}</h4>
              <p>{rule.explanation}</p>
              <code>{rule.id}</code>
            </article>
          ))
        ) : (
          <p>No rule is mapped to this fact.</p>
        )}
      </section>
      <section className="inspector-section">
        <h3>Sources</h3>
        {references.length ? (
          references.map(reference => {
            const source = getSource(reference.sourceId);
            if (!source) return null;
            return (
              <article className="source-entry" key={reference.id}>
                <h4>{source.title}</h4>
                {reference.location && <p>{reference.location}</p>}
                <small>{source.author}</small>
                {sourceUrl(source.provenance) ? (
                  <a
                    href={sourceUrl(source.provenance) ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open source
                  </a>
                ) : (
                  <span>Source details only</span>
                )}
              </article>
            );
          })
        ) : (
          <p>No source reference is recorded for this rule.</p>
        )}
      </section>
    </div>
  );
}
function sourceUrl(provenance: string) {
  return provenance.match(/https?:\/\/[^\s]+/)?.[0]?.replace(/[),.;]+$/, '') ?? null;
}
