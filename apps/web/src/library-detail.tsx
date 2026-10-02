import { Link, useParams } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from './components/ui/empty';
import {
  getRecord,
  getApplicableRules,
  getReferences,
  getRelatedFigures,
  recordDescription,
  recordName,
  recordPath,
} from './library-data';
import { getLinePresentation } from './line-value-presentation';

function formatName(name: string) {
  return ['6', '7', '8', '9'].includes(name) ? getLinePresentation(Number(name)).name : name;
}

const ruleCategories = {
  metadata: 'Thông tin',
  structure: 'Cấu trúc',
  transformation: 'Biến đổi',
  classification: 'Phân loại',
} as const;

export function LibraryDetailPage() {
  const { entityType = '', id = '' } = useParams();
  const record = getRecord(entityType, id);
  const references = getReferences(record?.id ?? '');

  if (!record)
    return (
      <main className="route-page">
        <Empty>
          <EmptyHeader>
            <EmptyTitle role="heading" aria-level={1}>
              Không tìm thấy mục
            </EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button size="lg" render={<Link to={ROUTES.library} />}>
              Mở thư viện
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    );

  const related = getRelatedFigures(record);
  const applicableRules = getApplicableRules(record);
  const recordMeta =
    'kingWenNumber' in record
      ? `Quẻ ${String(record.kingWenNumber).padStart(2, '0')}`
      : 'category' in record
        ? ruleCategories[record.category]
        : undefined;
  const trigramIds =
    'upperTrigramId' in record ? [record.upperTrigramId, record.lowerTrigramId] : [];

  return (
    <main className="route-page flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Button
          variant="link"
          size="lg"
          className="hidden self-start md:inline-flex"
          render={<Link to={ROUTES.library} />}
        >
          Thư viện
        </Button>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
          {formatName(recordName(record))}
        </h1>
        {recordMeta && <Badge variant="outline">{recordMeta}</Badge>}
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-12">
        {!('kingWenNumber' in record) && (
          <Card className="min-w-0 lg:col-span-12">
            <CardContent>
              <p className="font-serif text-lg leading-relaxed">{recordDescription(record)}</p>
            </CardContent>
          </Card>
        )}

        {trigramIds.length > 0 && (
          <Card className="min-w-0 lg:col-span-6">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Cấu trúc quẻ
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {trigramIds.map((trigramId, index) => {
                const trigram = related.find(item => item.id === trigramId);
                return (
                  trigram && (
                    <Button
                      key={`${index}-${trigramId}`}
                      variant="outline"
                      size="lg"
                      className="h-auto min-h-11 min-w-0 whitespace-normal text-left"
                      render={<Link to={recordPath(trigram)} />}
                    >
                      {index === 0 ? 'Ngoại quái' : 'Nội quái'} · {formatName(trigram.name)}
                    </Button>
                  )
                );
              })}
            </CardContent>
          </Card>
        )}

        {related.length > 0 && trigramIds.length === 0 && (
          <Card className="min-w-0 lg:col-span-6">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Quẻ liên quan
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {related.map(item => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="lg"
                  className="h-auto min-h-11 min-w-0 whitespace-normal text-left"
                  render={<Link to={recordPath(item)} />}
                >
                  {'kingWenNumber' in item
                    ? `${String(item.kingWenNumber).padStart(2, '0')} · `
                    : ''}
                  {formatName(item.name)}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {applicableRules.length > 0 && (
          <Card className="min-w-0 lg:col-span-6">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Quy tắc áp dụng
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {applicableRules.map(rule => (
                <Button
                  key={rule.id}
                  variant="outline"
                  size="lg"
                  className="h-auto min-h-11 min-w-0 whitespace-normal text-left"
                  render={<Link to={recordPath(rule)} />}
                >
                  {formatName(rule.title)}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {references.length > 0 && (
          <Card className="min-w-0 lg:col-span-12">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Nguồn tham khảo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col divide-y">
                {references.map(reference => (
                  <article
                    key={reference.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-semibold">{reference.source.title}</h3>
                      {reference.location && (
                        <p className="text-muted-foreground">{reference.location}</p>
                      )}
                    </div>
                    <details>
                      <summary className="min-h-11 cursor-pointer content-center text-muted-foreground">
                        Thông tin nguồn
                      </summary>
                      <dl className="grid gap-3">
                        <div>
                          <dt className="text-muted-foreground">Tác giả</dt>
                          <dd className="break-words">{reference.source.author}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Thông tin xuất bản</dt>
                          <dd className="break-words">{reference.source.publication}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Quyền sử dụng</dt>
                          <dd className="break-words">{reference.source.rights}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Xuất xứ</dt>
                          <dd className="break-words">{reference.source.provenance}</dd>
                        </div>
                      </dl>
                    </details>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
