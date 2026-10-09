import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createContentLoader, getContentMetadata } from '@liuyao/knowledge';
import type { ContentRecord, ContentEntry } from '@liuyao/knowledge';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
import { ROUTES } from './route-paths';
import { KnowledgeEntries, KnowledgeReferences } from './knowledge-entries';
import { KnowledgeTables } from './knowledge-tables';
const load = createContentLoader(async item => {
  const response = await fetch(import.meta.env.BASE_URL + item.asset);
  if (!response.ok) throw new Error('Knowledge unavailable');
  return response.json();
});
function ContentSection({
  title,
  entries,
  id,
}: {
  title: string;
  entries: readonly ContentEntry[];
  id?: string;
}) {
  return (
    <Card id={id} className="min-w-0 scroll-mt-24">
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <KnowledgeEntries entries={entries} />
      </CardContent>
    </Card>
  );
}
export function KnowledgeContent({ id }: { id: string }) {
  const { hash } = useLocation();
  const [attempt, setAttempt] = useState(0);
  const key = id + ':' + attempt;
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
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
    }
    target.scrollIntoView();
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
      <ContentSection title="Tổng quan" entries={record.entries} />
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
                    <Link className="underline" to={ROUTES.libraryDetail(target.type, target.id)}>
                      {target.title}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </CardContent>
        </Card>
      ) : null}
      {record.type === 'hexagram' &&
        record.lines.map(line => (
          <ContentSection
            key={line.position}
            id={'line-' + line.position}
            title={'Hào ' + line.position + ' · ' + line.label}
            entries={line.entries}
          />
        ))}
      {record.type === 'hexagram' &&
        record.specialPassages?.map((passage, index) => (
          <ContentSection key={index} title={passage.title} entries={passage.entries} />
        ))}
      {record.tables?.length ? <KnowledgeTables tables={record.tables} /> : null}
      {record.figures?.map(figure => (
        <Card key={figure.id} id={figure.id} className="scroll-mt-24">
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
            {figure.authorAlternatives?.map((view, index) => (
              <div key={index}>
                <p>
                  {view.author} · {view.description}
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
