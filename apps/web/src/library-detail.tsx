import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from './components/ui/empty';
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

const kinds = { hexagram: 'Quẻ', trigram: 'Quái', term: 'Thuật ngữ', rule: 'Quy tắc' } as const;
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
      <main className="route-page route-page--detail">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Không tìm thấy mục</EmptyTitle>
            <EmptyDescription>
              Địa chỉ này không khớp với mục nào trong thư viện trên thiết bị.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button render={<Link to={ROUTES.library} />}>Mở thư viện</Button>
          </EmptyContent>
        </Empty>
      </main>
    );

  const related = getRelatedFigures(record);
  const applicableRules = getApplicableRules(record);
  const category = kinds[entityType as keyof typeof kinds] ?? 'Mục';
  const recordMeta =
    'kingWenNumber' in record
      ? `Số thứ tự ${record.kingWenNumber}`
      : 'category' in record
        ? ruleCategories[record.category]
        : undefined;
  const trigramIds =
    'upperTrigramId' in record ? [record.upperTrigramId, record.lowerTrigramId] : [];

  return (
    <main className="route-page route-page--detail flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Badge variant="secondary">Thư viện / {category}</Badge>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
          {formatName(recordName(record))}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {recordMeta ?? 'Nội dung tham khảo được lưu trên thiết bị.'}
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <Card className="min-w-0 lg:col-span-8">
          <CardHeader>
            <CardTitle>Tổng quan</CardTitle>
            <CardDescription>
              {category}
              {recordMeta ? ` · ${recordMeta}` : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <code className="break-all text-xs text-muted-foreground">{record.id}</code>
            <p className="font-serif text-lg leading-relaxed">{recordDescription(record)}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Tra cứu tiếp</CardTitle>
            <CardDescription>Xem các mục khác trong cẩm nang.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" render={<Link to={ROUTES.library} />}>
              Mở thư viện <ArrowRight data-icon="inline-end" />
            </Button>
          </CardFooter>
        </Card>

        {trigramIds.length > 0 && (
          <Card className="min-w-0 lg:col-span-6">
            <CardHeader>
              <CardTitle>Gồm hai quái</CardTitle>
              <CardDescription>Ngoại quái ở trên, nội quái ở dưới.</CardDescription>
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
              <CardTitle>Quẻ liên quan</CardTitle>
              <CardDescription>{related.length} quẻ liên kết với mục này.</CardDescription>
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
              <CardTitle>Quy tắc áp dụng</CardTitle>
              <CardDescription>Quy tắc tính liên quan đến mục này.</CardDescription>
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

        <Card className="min-w-0 lg:col-span-12">
          <CardHeader>
            <CardTitle>Nguồn và vị trí tra cứu</CardTitle>
            <CardDescription>Thông tin xuất xứ của mục tham khảo.</CardDescription>
          </CardHeader>
          <CardContent>
            {references.length > 0 ? (
              <div className="grid items-start gap-4 md:grid-cols-2">
                {references.map(reference => (
                  <article
                    key={reference.id}
                    className="flex flex-col gap-3 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-semibold">{reference.source.title}</h3>
                      <p className="text-muted-foreground">{reference.source.author}</p>
                    </div>
                    <dl className="grid gap-3">
                      <div>
                        <dt className="text-muted-foreground">Thông tin xuất bản</dt>
                        <dd className="break-words">{reference.source.publication}</dd>
                      </div>
                      {reference.location && (
                        <div>
                          <dt className="text-muted-foreground">Vị trí trích dẫn</dt>
                          <dd className="break-words">{reference.location}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-muted-foreground">Quyền sử dụng</dt>
                        <dd className="break-words">{reference.source.rights}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Xuất xứ</dt>
                        <dd className="break-words">{reference.source.provenance}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Chưa ghi nhận vị trí nguồn cho mục này.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
