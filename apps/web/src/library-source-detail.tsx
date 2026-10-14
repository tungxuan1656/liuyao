import type { ContentMetadata } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import type { getSourceReferences, LibrarySource } from './library-data';
import { ROUTES } from './route-paths';

export function LibrarySourceSections({
  source,
  contents,
  references,
}: {
  source: LibrarySource;
  contents: readonly ContentMetadata[];
  references: ReturnType<typeof getSourceReferences>;
}) {
  return (
    <>
      <Card className="min-w-0 lg:col-span-12">
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            Thông tin thư mục
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3">
            <div>
              <dt className="text-muted-foreground">Tác giả</dt>
              <dd className="break-words">{source.author}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Thông tin xuất bản</dt>
              <dd className="break-words">{source.publication}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Quyền sử dụng</dt>
              <dd className="break-words">{source.rights}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Xuất xứ bản nguồn</dt>
              <dd className="break-words">{source.provenance}</dd>
            </div>
            {source.limitations?.length ? (
              <div>
                <dt className="text-muted-foreground">Phạm vi diễn giải</dt>
                <dd>{source.limitations.join(' ')}</dd>
              </div>
            ) : null}
          </dl>
        </CardContent>
      </Card>

      {contents.length > 0 && (
        <Card className="min-w-0 lg:col-span-12">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Nội dung sử dụng nguồn
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contents.map(item => (
              <Button
                key={item.id}
                variant="outline"
                size="lg"
                className="h-auto min-h-11 min-w-0 whitespace-normal text-left"
                render={<Link to={ROUTES.libraryDetail(item.type, item.id)} />}
              >
                {item.title}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {references.length > 0 && (
        <Card className="min-w-0 lg:col-span-12">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Mục từ tham chiếu
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {references.map(reference => (
              <article key={reference.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
                {reference.location && (
                  <p className="text-muted-foreground">{reference.location}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {reference.targets.map(target => (
                    <Button
                      key={target.id}
                      variant="outline"
                      size="lg"
                      className="h-auto min-h-11 min-w-0 whitespace-normal text-left"
                      render={<Link to={target.path} />}
                    >
                      {target.title}
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
