import type { RefObject } from 'react';
import { getSource, getRulesForFact, listSourceReferences } from '@liuyao/knowledge';
import type { KnowledgeFactId } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';

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
      <span>{fact.label}</span>
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
  const rules = getRulesForFact(fact.id);
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
          rules.map(rule => (
            <article
              key={rule.id}
              className="flex flex-col gap-2 border-b pb-3 last:border-b-0 last:pb-0"
            >
              <h4 className="font-medium">{rule.title}</h4>
              <p className="text-muted-foreground">{rule.explanation}</p>
              <code className="break-all text-xs text-muted-foreground">{rule.id}</code>
              <Button
                variant="link"
                size="lg"
                className="h-auto min-h-11 whitespace-normal text-left"
                render={<Link to={ROUTES.libraryDetail('rule', rule.id)} />}
              >
                Mở quy tắc trong Thư viện
              </Button>
            </article>
          ))
        ) : (
          <p className="text-muted-foreground">Chưa có quy tắc được liên kết với dữ kiện này.</p>
        )}
      </section>
      <Separator />
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold">Nguồn tham khảo</h3>
        {references.length ? (
          references.map(reference => {
            const source = getSource(reference.sourceId);
            if (!source) return null;
            const url = sourceUrl(source.provenance);
            return (
              <article
                key={reference.id}
                className="flex flex-col gap-2 border-b pb-3 last:border-b-0 last:pb-0"
              >
                <h4 className="font-medium">{source.title}</h4>
                <p className="text-muted-foreground">
                  {source.author}
                  {reference.location ? ` · ${reference.location}` : ''}
                </p>
                {url ? (
                  <Button
                    variant="link"
                    size="lg"
                    className="h-auto min-h-11 whitespace-normal text-left"
                    render={<a href={url} target="_blank" rel="noreferrer" />}
                  >
                    Mở nguồn tham khảo
                  </Button>
                ) : (
                  <p className="text-muted-foreground">Chỉ có thông tin nguồn</p>
                )}
              </article>
            );
          })
        ) : (
          <p className="text-muted-foreground">Chưa ghi nhận nguồn tham khảo cho quy tắc này.</p>
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
            Xem trong thư viện: {fact.label}
          </Button>
        </>
      )}
    </div>
  );
}

function sourceUrl(provenance: string) {
  return provenance.match(/https?:\/\/[^\s]+/)?.[0]?.replace(/[),.;]+$/, '') ?? null;
}
