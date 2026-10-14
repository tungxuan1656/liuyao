import type { HexagramId, KnowledgeFactId } from '@liuyao/knowledge';
import { getRulesForFact, getSource, listSourceReferences } from '@liuyao/knowledge';
import type { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { ResultKnowledgeInspector } from './result-knowledge-inspector';
import { ROUTES } from './route-paths';

type FactLibraryTarget =
  | { kind: 'hexagram'; id: `hexagram-${string}` }
  | { kind: 'trigram'; id: `trigram-${string}` };

export type HexagramKnowledgeContext = {
  contextType: 'primary' | 'changed';
  hexagramId: HexagramId;
  position?: number;
  lineInfo?: {
    polarity: 'yin' | 'yang';
    changing: boolean;
    inputValue: number;
    transformedPolarity?: 'yin' | 'yang';
  };
};

export type FactSelection = {
  id: KnowledgeFactId | 'context.hexagram' | 'context.line';
  label: string;
  value: string;
  libraryTarget?: FactLibraryTarget;
  context?: HexagramKnowledgeContext;
};

export function FactButton({
  fact,
  onSelect,
  hideLabel = false,
}: {
  fact: FactSelection;
  onSelect: (fact: FactSelection) => void;
  hideLabel?: boolean;
}) {
  // Each fact needs its label and value visible at narrow board widths.
  return (
    <Button
      variant="outline"
      size="lg"
      className="h-auto min-h-11 w-full min-w-0 flex-col items-start gap-1 whitespace-normal py-2 text-left"
      type="button"
      onClick={() => onSelect(fact)}
      aria-label={`${fact.label}: ${fact.value}. Xem giải thích dữ kiện này`}
    >
      <span className={hideLabel ? 'sr-only' : undefined}>{fact.label}</span>
      <strong className="max-w-full break-words font-semibold">{fact.value}</strong>
    </Button>
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
  if (fact.context) {
    return (
      <ResultKnowledgeInspector
        key={`${fact.context.contextType}-${fact.context.hexagramId}`}
        fact={fact as FactSelection & { context: HexagramKnowledgeContext }}
        close={close}
        closeRef={closeRef}
      />
    );
  }

  const rules =
    fact.id === 'context.hexagram' || fact.id === 'context.line' ? [] : getRulesForFact(fact.id);
  const references = listSourceReferences().filter(reference =>
    rules.some(rule => reference.targetIds.includes(rule.id)),
  );

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <Badge variant="secondary">{fact.label}</Badge>
          <p className="break-words font-serif text-xl font-semibold">{fact.value}</p>
        </div>
        <Button
          ref={closeRef}
          variant="ghost"
          size="lg"
          onClick={close}
          aria-label="Đóng phần giải thích dữ kiện"
        >
          Đóng
        </Button>
      </div>
      <Separator />
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold">Quy tắc</h3>
        {rules.length ? (
          <div className="flex flex-col divide-y">
            {rules.map(rule => (
              <article key={rule.id} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0">
                <h4 className="font-medium">{rule.title}</h4>
                <p className="text-muted-foreground">{rule.explanation}</p>
                <Button
                  variant="link"
                  size="lg"
                  className="h-auto min-h-11 whitespace-normal text-left"
                  render={<Link to={ROUTES.libraryDetail('rule', rule.id)} />}
                >
                  Xem quy tắc
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Chưa có quy tắc liên quan.</p>
        )}
      </section>
      <Separator />
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold">Nguồn tham khảo</h3>
        {references.length ? (
          <div className="flex flex-col divide-y">
            {references.map(reference => {
              const source = getSource(reference.sourceId);
              if (!source) return null;
              const isProjectConvention = source.id === 'source-liuyao-v1-contract';
              const url = sourceUrl(source.provenance);
              return (
                <article
                  key={reference.id}
                  className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-medium">{source.title}</h4>
                    {isProjectConvention && <Badge variant="outline">Quy ước dự án</Badge>}
                  </div>
                  <p className="text-muted-foreground">
                    {source.author}
                    {reference.location ? ` · ${reference.location}` : ''}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="link"
                      size="lg"
                      className="h-auto min-h-11 whitespace-normal text-left"
                      render={<Link to={ROUTES.libraryDetail('source', source.id)} />}
                    >
                      Chi tiết nguồn
                    </Button>
                    {url ? (
                      <Button
                        variant="link"
                        size="lg"
                        className="h-auto min-h-11 whitespace-normal text-left"
                        render={<a href={url} target="_blank" rel="noreferrer" />}
                      >
                        Tài liệu tham khảo
                      </Button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">Chưa có nguồn tham khảo.</p>
        )}
      </section>
      {fact.libraryTarget && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="lg"
            className="h-auto min-h-11 whitespace-normal text-left"
            render={
              <Link to={ROUTES.libraryDetail(fact.libraryTarget.kind, fact.libraryTarget.id)} />
            }
          >
            Xem trong thư viện
          </Button>
        </>
      )}
    </div>
  );
}

function sourceUrl(provenance: string) {
  return provenance.match(/https?:\/\/[^\s]+/)?.[0]?.replace(/[),.;]+$/, '') ?? null;
}
