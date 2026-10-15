import type { HexagramId, KnowledgeFactId } from '@liuyao/knowledge';
import { getRulesForFact } from '@liuyao/knowledge';
import type { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { KnowledgeContent } from './knowledge-content';
import { ResultKnowledgeInspector } from './result-knowledge-inspector';
import { ROUTES } from './route-paths';

type FactLibraryTarget =
  | { kind: 'hexagram'; id: `hexagram-${string}` }
  | { kind: 'trigram'; id: `trigram-${string}` };

export type HexagramKnowledgeContext = {
  contextType: 'primary' | 'changed';
  hexagramId: HexagramId;
  position?: number;
  lines?: readonly {
    position: number;
    polarity: 'yin' | 'yang';
    changing: boolean;
    inputValue: number;
  }[];
  selectionToken?: number;
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

export function FactRulesContent({ factId }: { factId: KnowledgeFactId }) {
  const rules = getRulesForFact(factId);

  if (rules.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-muted-foreground">
          Quy tắc
        </h4>
        <div className="flex flex-col divide-y">
          {rules.map(rule => (
            <article key={rule.id} className="flex flex-col gap-1.5 py-2.5 first:pt-0 last:pb-0">
              <h5 className="font-medium text-foreground">{rule.title}</h5>
              <KnowledgeContent id={rule.id} />
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-left font-normal"
                render={<Link to={ROUTES.libraryDetail('rule', rule.id)} />}
              >
                Xem quy tắc
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
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
        key={`${fact.context.contextType}-${fact.context.hexagramId}-${fact.context.selectionToken ?? fact.context.position ?? 'overview'}`}
        fact={fact as FactSelection & { context: HexagramKnowledgeContext }}
        close={close}
        closeRef={closeRef}
      />
    );
  }

  const isCustomFact = fact.id === 'context.hexagram' || fact.id === 'context.line';

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
      {!isCustomFact && <FactRulesContent factId={fact.id as KnowledgeFactId} />}
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
