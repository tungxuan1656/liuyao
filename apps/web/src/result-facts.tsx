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
      className="flex-1 w-full min-w-[44px] min-h-[44px] inline-flex items-center justify-between gap-1 px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 border-b border-dotted border-neutral-300 hover:border-solid hover:border-neutral-900 transition-all text-left bg-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
      type="button"
      onClick={() => onSelect(fact)}
      aria-label={`${fact.label}: ${fact.value}. Xem giải thích dữ kiện này`}
    >
      <span className="text-[0.65rem] md:text-xs">{fact.label}</span>
      <strong className="text-neutral-900 font-semibold">{fact.value}</strong>
      <span aria-hidden="true" className="text-[0.7rem] text-neutral-400 hidden md:inline">
        ↗
      </span>
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2">
        <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 m-0">
          Giải thích dữ kiện
        </p>
        <button
          ref={closeRef}
          className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-sm font-medium text-neutral-900 hover:text-neutral-600 bg-transparent border-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          onClick={close}
          type="button"
          aria-label="Đóng phần giải thích dữ kiện"
        >
          Đóng
        </button>
      </div>
      <h2 className="text-xl font-medium m-0">{fact.label}</h2>
      <p className="p-3 bg-neutral-50 font-serif text-lg m-0">{fact.value}</p>

      <section className="mt-4">
        <h3 className="text-[0.75rem] font-semibold tracking-wider uppercase text-neutral-900 mb-3 m-0">
          Quy tắc
        </h3>
        {rules.length ? (
          <div className="grid gap-3">
            {rules.map(rule => (
              <div className="p-4 border-t border-neutral-200" key={rule.id}>
                <h4 className="text-sm font-medium text-neutral-900 mb-1 mt-0">{rule.title}</h4>
                <p className="text-sm text-neutral-600 leading-relaxed mb-2 mt-0">
                  {rule.explanation}
                </p>
                <code className="text-xs text-neutral-400 block mb-2 break-all">{rule.id}</code>
                <Link
                  className="inline-flex min-h-[44px] items-center text-xs font-medium text-neutral-900 hover:text-neutral-600"
                  to={ROUTES.libraryDetail('rule', rule.id)}
                >
                  Mở quy tắc trong Thư viện
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">Chưa có quy tắc được liên kết với dữ kiện này.</p>
        )}
      </section>

      <section className="mt-4">
        <h3 className="text-[0.75rem] font-semibold tracking-wider uppercase text-neutral-900 mb-3 m-0">
          Nguồn tham khảo
        </h3>
        {references.length ? (
          <div className="grid gap-3">
            {references.map(reference => {
              const source = getSource(reference.sourceId);
              if (!source) return null;
              return (
                <div className="p-4 border-t border-neutral-200" key={reference.id}>
                  <h4 className="text-sm font-medium text-neutral-900 mb-1 mt-0">{source.title}</h4>
                  {reference.location && (
                    <p className="text-sm text-neutral-600 mb-1 mt-0">{reference.location}</p>
                  )}
                  <small className="text-xs text-neutral-500 block mb-2">{source.author}</small>
                  {sourceUrl(source.provenance) ? (
                    <a
                      className="inline-flex min-h-[44px] items-center text-xs font-medium text-neutral-900 hover:text-neutral-600"
                      href={sourceUrl(source.provenance) ?? undefined}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Mở nguồn tham khảo
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-400">Chỉ có thông tin nguồn</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">Chưa ghi nhận nguồn tham khảo cho quy tắc này.</p>
        )}
      </section>

      {fact.libraryTarget && (
        <footer className="mt-6 pt-4 border-t border-neutral-200">
          <Link
            className="inline-flex min-h-[44px] items-center text-sm font-medium text-neutral-900 hover:text-neutral-600"
            to={ROUTES.libraryDetail(fact.libraryTarget.kind, fact.libraryTarget.id)}
          >
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
