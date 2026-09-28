import type { RefObject } from 'react';
import { getSource, getRulesForFact, listSourceReferences } from '@liuyao/knowledge';
import type { KnowledgeFactId } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';

type FactLibraryTarget =
  { kind: 'hexagram'; id: `hexagram-${string}` } | { kind: 'trigram'; id: `trigram-${string}` };

export type FactSelection = {
  id: KnowledgeFactId;
  label: string;
  value: string;
  libraryTarget?: FactLibraryTarget;
};

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
      aria-label={`${fact.label}: ${fact.value}. Xem giải thích dữ kiện này`}
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
        <p className="result-kicker">Giải thích dữ kiện</p>
        <button
          ref={closeRef}
          className="inspector-close"
          onClick={close}
          type="button"
          aria-label="Đóng phần giải thích dữ kiện"
        >
          Đóng
        </button>
      </div>
      <h2>{fact.label}</h2>
      <p className="inspector-value">{fact.value}</p>
      <section className="inspector-section">
        <h3>Quy tắc</h3>
        {rules.length ? (
          rules.map(rule => (
            <article className="rule-entry" key={rule.id}>
              <h4>{rule.title}</h4>
              <p>{rule.explanation}</p>
              <code>{rule.id}</code>
              <Link to={ROUTES.libraryDetail('rule', rule.id)}>Mở quy tắc trong Thư viện</Link>
            </article>
          ))
        ) : (
          <p>Chưa có quy tắc được liên kết với dữ kiện này.</p>
        )}
      </section>
      <section className="inspector-section">
        <h3>Nguồn tham khảo</h3>
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
                    Mở nguồn tham khảo
                  </a>
                ) : (
                  <span>Chỉ có thông tin nguồn</span>
                )}
              </article>
            );
          })
        ) : (
          <p>Chưa ghi nhận nguồn tham khảo cho quy tắc này.</p>
        )}
      </section>
      {fact.libraryTarget && (
        <footer className="inspector-footer">
          <Link to={ROUTES.libraryDetail(fact.libraryTarget.kind, fact.libraryTarget.id)}>
            Xem trong thư viện: {fact.label}
          </Link>
        </footer>
      )}
    </div>
  );
}
function sourceUrl(provenance: string) {
  return provenance.match(/https?:\/\/[^\s]+/)?.[0]?.replace(/[),.;]+$/, '') ?? null;
}
