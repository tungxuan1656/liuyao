import type { ContentEntry, ContentRecord } from '@liuyao/knowledge';
import { createContentLoader, getContentMetadata } from '@liuyao/knowledge';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { KnowledgeEntries, KnowledgeLinks, KnowledgeReferences } from './knowledge-entries';
import { KnowledgeTables } from './knowledge-tables';
import { ROUTES } from './route-paths';

export const loadContentRecord = createContentLoader(async item => {
  const response = await fetch(import.meta.env.BASE_URL + item.asset);
  if (!response.ok) throw new Error('Knowledge unavailable');
  return response.json();
});
const load = loadContentRecord;
function ContentSection({
  title,
  entries,
  id,
  expanded = false,
}: {
  expanded?: boolean;
  title: string;
  entries: readonly ContentEntry[];
  id?: string;
}) {
  return (
    <Card id={id} className="min-w-0 scroll-mt-24 target:ring-2 target:ring-primary">
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <KnowledgeEntries entries={entries} expanded={expanded} />
      </CardContent>
    </Card>
  );
}
export function KnowledgeContent({ id }: { id: string }) {
  const { hash } = useLocation();
  const [attempt, setAttempt] = useState(0);
  const key = `${id}:${attempt}`;
  const [state, setState] = useState<{ key: string; record?: ContentRecord; error?: boolean }>();
  useEffect(() => {
    let active = true;
    load(id)
      .then(record => {
        if (active) setState({ key, record });
      })
      .catch(() => {
        if (active) setState({ key, error: true });
      });
    return () => {
      active = false;
    };
  }, [id, key]);
  useEffect(() => {
    if (!state?.record || state.key !== key || !hash) return;
    let cleanup: (() => void) | undefined;
    try {
      const targetId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(targetId);
      if (target) {
        for (let parent = target.parentElement; parent; parent = parent.parentElement) {
          if (parent instanceof HTMLDetailsElement) parent.open = true;
        }
        target.scrollIntoView();
        const previous = document.querySelectorAll('.ring-primary.ring-2');
        for (const el of previous) {
          el.classList.remove('ring-2', 'ring-primary');
        }
        target.classList.add('ring-2', 'ring-primary');
        cleanup = () => {
          target.classList.remove('ring-2', 'ring-primary');
        };
      }
    } catch {
      // Ignore malformed URL fragments
    }
    return cleanup;
  }, [hash, key, state]);
  if (state?.key !== key) return <p role="status">Đang tải nội dung…</p>;
  if (state.error || !state.record)
    return (
      <Alert>
        <AlertTitle>Chưa tải được nội dung</AlertTitle>
        <AlertDescription>
          <p>Hãy thử lại khi có kết nối hoặc khi thư viện ngoại tuyến đã tải xong.</p>
          <Button variant="outline" onClick={() => setAttempt(value => value + 1)}>
            Thử lại
          </Button>
        </AlertDescription>
      </Alert>
    );
  const record = state.record;
  return (
    <section className="flex min-w-0 flex-col gap-6" aria-label="Nội dung tham khảo">
      <ContentSection
        title={
          record.type === 'article' && record.sequence !== undefined
            ? `Bài ${record.sequence}`
            : 'Tổng quan'
        }
        entries={record.entries}
        expanded={record.type === 'article'}
      />
      {record.links?.length ? (
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Liên kết tham khảo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <KnowledgeLinks links={record.links} />
          </CardContent>
        </Card>
      ) : null}
      {record.type === 'hexagram' && (
        <nav aria-label="Chuyển nhanh đến hào" className="flex flex-wrap gap-2">
          {record.lines.map(line => (
            <Button
              key={line.position}
              variant="outline"
              size="lg"
              className="h-auto min-h-11 min-w-0 whitespace-normal text-left"
              render={<a href={`#line-${line.position}`} />}
            >
              Hào {line.position} · {line.label}
            </Button>
          ))}
          {record.specialPassages?.map((passage, index) => (
            <Button
              key={passage.title}
              variant="outline"
              size="lg"
              className="h-auto min-h-11 min-w-0 whitespace-normal text-left"
              render={<a href={`#special-${index}`} />}
            >
              {passage.title}
            </Button>
          ))}
        </nav>
      )}
      {record.type === 'article' && record.applicableRuleIds?.length ? (
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Quy tắc áp dụng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <KnowledgeLinks links={record.applicableRuleIds.map(recordId => ({ recordId }))} />
          </CardContent>
        </Card>
      ) : null}
      {record.relatedIds?.length && record.type !== 'hexagram' && record.type !== 'trigram' ? (
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Nội dung liên quan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {record.relatedIds.map(id => {
                const target = getContentMetadata(id);
                return target ? (
                  <li key={id}>
                    <Link
                      className="inline-flex min-h-11 items-center underline"
                      to={ROUTES.libraryDetail(target.type, target.id)}
                    >
                      {target.title}
                    </Link>
                  </li>
                ) : (
                  <li key={id} className="text-muted-foreground">
                    Mục liên quan chưa phát hành
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      ) : null}
      {record.type === 'hexagram' &&
        record.lines.map(line => (
          <ContentSection
            key={line.position}
            id={`line-${line.position}`}
            title={`Hào ${line.position} · ${line.label}`}
            entries={line.entries}
          />
        ))}
      {record.type === 'hexagram' &&
        record.specialPassages?.map((passage, index) => (
          <ContentSection
            key={passage.title}
            id={`special-${index}`}
            title={passage.title}
            entries={passage.entries}
          />
        ))}
      {record.tables?.length ? <KnowledgeTables tables={record.tables} /> : null}
      {record.figures?.map(figure => (
        <Card
          key={figure.id}
          id={figure.id}
          className="scroll-mt-24 target:ring-2 target:ring-primary"
        >
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              {figure.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p>{figure.orientation.description}</p>
            <ul>
              {figure.labels.map(label => (
                <li key={label.id}>{label.text}</li>
              ))}
            </ul>
            <KnowledgeReferences references={figure.references} />
            {figure.authorAlternatives?.map(view => (
              <div key={view.author}>
                <p>
                  {view.author}
                  {view.via ? ` · qua ${view.via}` : ''} · {view.description}
                </p>
                <KnowledgeReferences references={view.references} />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      {record.notes?.length ? (
        <ContentSection title="Ghi chú và khác biệt nguồn" entries={record.notes} />
      ) : null}
    </section>
  );
}
