import { Link, useParams } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
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
  if (['6', '7', '8', '9'].includes(name)) {
    return getLinePresentation(Number(name)).name;
  }
  return name;
}

export function LibraryDetailPage() {
  const { entityType = '', id = '' } = useParams();
  const record = getRecord(entityType, id);
  const references = getReferences(record?.id ?? '');
  if (!record)
    return (
      <main className="route-page route-page--detail text-foreground">
        <Button
          variant="ghost"
          size="sm"
          render={
            <Link
              className="inline-flex min-h-[44px] items-center text-muted-foreground text-sm hover:text-foreground no-underline"
              to={ROUTES.library}
            />
          }
        >
          ← Quay lại thư viện
        </Button>
        <Card className="mt-6 grid min-h-[250px] p-8 place-content-center text-center border-0 shadow-none bg-transparent">
          <CardContent className="p-6">
            <span className="text-foreground font-serif text-4xl" aria-hidden="true">
              ?
            </span>
            <h1 className="mt-3 mb-1 font-serif text-2xl font-medium">Không tìm thấy mục</h1>
            <p className="max-w-[26rem] m-0 text-muted-foreground leading-relaxed">
              Địa chỉ này không khớp với mục nào trong thư viện trên thiết bị.
            </p>
            <Link
              to={ROUTES.library}
              className="inline-block mt-3 min-h-[44px] text-foreground underline underline-offset-4"
            >
              Mở thư viện
            </Link>
          </CardContent>
        </Card>
      </main>
    );

  const related = getRelatedFigures(record);
  const applicableRules = getApplicableRules(record);
  return (
    <main className="route-page route-page--detail text-foreground">
      <Button
        variant="ghost"
        size="sm"
        render={
          <Link
            className="inline-flex min-h-[44px] items-center text-muted-foreground text-sm hover:text-foreground no-underline"
            to={ROUTES.library}
          />
        }
      >
        ← Quay lại thư viện
      </Button>
      <Card className="mx-auto mt-6 min-w-0 max-w-[42rem] rounded-none border border-border bg-card p-4 shadow-none ring-0 sm:p-6">
        <CardContent className="p-0">
          <header className="flex items-start justify-between gap-4">
            <div className="grid gap-2">
              <p className="m-0 text-muted-foreground text-sm tracking-wide">
                {(
                  { hexagram: 'Quẻ', trigram: 'Quái', term: 'Thuật ngữ', rule: 'Quy tắc' } as const
                )[entityType as 'hexagram' | 'trigram' | 'term' | 'rule'] ?? 'Mục'}
                {'kingWenNumber' in record
                  ? ` · Số thứ tự ${record.kingWenNumber}`
                  : 'category' in record
                    ? ` · ${({ metadata: 'Thông tin', structure: 'Cấu trúc', transformation: 'Biến đổi', classification: 'Phân loại' } as const)[record.category]}`
                    : ''}
              </p>
              <h1 className="m-0 font-serif text-3xl md:text-5xl font-medium tracking-tight">
                {formatName(recordName(record))}
              </h1>
            </div>
            <Badge
              variant="outline"
              className="max-w-[45%] break-words text-right text-xs text-muted-foreground"
            >
              {record.id}
            </Badge>
          </header>
          <p className="my-6 font-serif text-lg leading-relaxed">{recordDescription(record)}</p>
          {'upperTrigramId' in record && (
            <section className="mt-6 border-t border-border pt-4">
              <h2 className="mb-3 font-serif text-base font-semibold">Gồm hai quái</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[record.upperTrigramId, record.lowerTrigramId].map((trigramId, index) => {
                  const trigram = related.find(item => item.id === trigramId);
                  return (
                    trigram && (
                      <Link
                        key={`${index}-${trigramId}`}
                        className="grid min-h-[82px] grid-cols-[1fr_auto] gap-1 border border-border p-3 text-foreground no-underline transition-colors hover:bg-muted/50"
                        to={recordPath(trigram)}
                      >
                        <span className="text-muted-foreground text-xs capitalize">
                          {index === 0 ? 'Ngoại quái' : 'Nội quái'}
                        </span>
                        <strong className="font-serif font-medium">
                          {formatName(trigram.name)}
                        </strong>
                      </Link>
                    )
                  );
                })}
              </div>
            </section>
          )}
          {related.length > 0 && !('upperTrigramId' in record) && (
            <section className="mt-6 border-t border-border pt-4">
              <h2 className="mb-3 font-serif text-base font-semibold">
                Quẻ liên quan{' '}
                <span className="ml-2 text-muted-foreground font-sans text-sm font-normal">
                  {related.length} quẻ
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {related.map(item => (
                  <Link
                    key={item.id}
                    className="grid min-h-[82px] grid-cols-[1fr_auto] gap-1 border border-border p-3 text-foreground no-underline transition-colors hover:bg-muted/50"
                    to={recordPath(item)}
                  >
                    <span className="text-muted-foreground text-xs capitalize">
                      {'kingWenNumber' in item
                        ? `Quẻ số ${String(item.kingWenNumber).padStart(2, '0')}`
                        : 'Quái'}
                    </span>
                    <strong className="font-serif font-medium">{formatName(item.name)}</strong>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {applicableRules.length > 0 && (
            <section className="mt-6 border-t border-border pt-4">
              <h2 className="mb-3 font-serif text-base font-semibold">Quy tắc áp dụng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {applicableRules.map(rule => (
                  <Link
                    key={rule.id}
                    className="grid min-h-[82px] grid-cols-[1fr_auto] gap-1 border border-border p-3 text-foreground no-underline transition-colors hover:bg-muted/50"
                    to={recordPath(rule)}
                  >
                    <span className="text-muted-foreground text-xs capitalize">Quy tắc</span>
                    <strong className="font-serif font-medium">{formatName(rule.title)}</strong>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {references.length > 0 && (
            <section className="mt-6 border-t border-border pt-4">
              <h2 className="mb-3 font-serif text-base font-semibold">Nguồn và vị trí tra cứu</h2>
              {references.map(reference => (
                <div
                  className="py-2 pb-4 border-b border-dashed border-border last:border-0"
                  key={reference.id}
                >
                  <h3 className="m-0 font-serif text-base font-semibold leading-relaxed">
                    {reference.source.title}
                  </h3>
                  <p className="mt-1 mb-3 text-muted-foreground text-sm">
                    {reference.source.author}
                  </p>
                  <dl className="grid gap-2 m-0">
                    <div className="grid grid-cols-[100px_1fr] gap-3">
                      <dt className="text-muted-foreground text-xs">Thông tin xuất bản</dt>
                      <dd className="m-0 break-words text-sm leading-relaxed">
                        {reference.source.publication}
                      </dd>
                    </div>
                    {reference.location && (
                      <div className="grid grid-cols-[100px_1fr] gap-3">
                        <dt className="text-muted-foreground text-xs">Vị trí trích dẫn</dt>
                        <dd className="m-0 break-words text-sm leading-relaxed">
                          {reference.location}
                        </dd>
                      </div>
                    )}
                    <div className="grid grid-cols-[100px_1fr] gap-3">
                      <dt className="text-muted-foreground text-xs">Quyền sử dụng</dt>
                      <dd className="m-0 break-words text-sm leading-relaxed">
                        {reference.source.rights}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-3">
                      <dt className="text-muted-foreground text-xs">Xuất xứ</dt>
                      <dd className="m-0 break-words text-sm leading-relaxed">
                        {reference.source.provenance}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </section>
          )}
          {references.length === 0 && (
            <p className="mt-8 text-muted-foreground text-sm">
              Chưa ghi nhận vị trí nguồn cho mục này.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
