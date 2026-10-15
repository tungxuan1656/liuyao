import type { ContentEntry, ContentLink, ContentReference } from '@liuyao/knowledge';
import { getContentMetadata, getSource } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';

function linkPath(link: ContentLink) {
  const target = getContentMetadata(link.recordId);
  return target
    ? ROUTES.libraryDetail(target.type, target.id) +
        (link.position ? `#line-${link.position}` : link.sectionId ? `#${link.sectionId}` : '')
    : undefined;
}
export function KnowledgeLinks({ links }: { links: readonly ContentLink[] }) {
  return (
    <ul>
      {links.map(link => {
        const href = linkPath(link);
        return (
          <li key={`${link.recordId}:${link.position ?? link.sectionId ?? ''}`}>
            {href ? (
              <Link className="inline-flex min-h-11 items-center underline" to={href}>
                {getContentMetadata(link.recordId)?.title}
                {link.position ? ` · Hào ${link.position}` : ''}
              </Link>
            ) : (
              <span className="text-muted-foreground">Mục liên quan chưa phát hành</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
export function KnowledgeReferences({ references }: { references: readonly ContentReference[] }) {
  if (!references || references.length === 0) {
    return <p className="text-sm text-muted-foreground">Chưa có trích dẫn nguồn cho mục này.</p>;
  }
  return (
    <details>
      <summary className="min-h-11 cursor-pointer content-center text-muted-foreground">
        Nguồn tham khảo
      </summary>
      <ul>
        {references.map((ref, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: references carry no identifier of their own; the list is static.
          <li key={i}>
            {'sourceId' in ref ? (
              <>
                <Link
                  className="inline-flex min-h-11 items-center underline"
                  to={ROUTES.libraryDetail('source', ref.sourceId)}
                >
                  {getSource(ref.sourceId)?.title ?? ref.sourceId}
                </Link>
                {' · PDF ' +
                  (ref.pdfPages[0] === ref.pdfPages[1] ? ref.pdfPages[0] : ref.pdfPages.join('–')) +
                  (ref.printedPages
                    ? ' · Trang in ' +
                      (ref.printedPages[0] === ref.printedPages[1]
                        ? ref.printedPages[0]
                        : ref.printedPages.join('–'))
                    : '') +
                  (ref.section ? ` · ${ref.section}` : '')}
              </>
            ) : (
              <a
                className="inline-flex min-h-11 items-center underline"
                href={`https://github.com/tungxuan1656/liuyao/blob/main/${ref.documentPath}`}
                target="_blank"
                rel="noreferrer"
              >
                Quy ước dự án · {ref.documentPath} · {ref.section.replace(/^#+\s*/, '')}
              </a>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
function TargetLink({ target }: { target: NonNullable<ContentEntry['target']> }) {
  const item = getContentMetadata(target.recordId);
  return item ? (
    <Link
      className="inline-flex min-h-11 items-center underline"
      to={`${ROUTES.libraryDetail(item.type, item.id)}#${target.id}`}
    >
      {item.title} · {target.kind === 'table' ? 'Bảng tham chiếu' : 'Hình tham chiếu'}
    </Link>
  ) : (
    <span className="text-sm text-muted-foreground">Tài liệu tham chiếu chưa phát hành</span>
  );
}
export function KnowledgeEntries({
  entries,
  expanded = false,
}: {
  entries: readonly ContentEntry[];
  expanded?: boolean;
}) {
  if (!entries || entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Chưa có chú giải phát hành cho phần này.</p>
    );
  }
  const visible = expanded ? entries : entries.slice(0, 4);
  return (
    <div className="flex flex-col gap-6">
      {visible.map((entry, index) => (
        <article
          key={entry.id ?? index}
          id={entry.id}
          className="flex scroll-mt-24 flex-col gap-3 target:ring-2 target:ring-primary"
        >
          {entry.title && <h3 className="font-semibold">{entry.title}</h3>}
          {entry.attribution && (
            <p className="text-muted-foreground">
              {entry.attribution.author}
              {entry.attribution.via ? ` · ${entry.attribution.via}` : ''}
            </p>
          )}
          <p className="whitespace-pre-line font-serif text-lg leading-relaxed">{entry.text}</p>
          {entry.condition && (
            <p className="whitespace-pre-line text-muted-foreground">{entry.condition}</p>
          )}
          <KnowledgeReferences references={entry.references} />
          {entry.target ? <TargetLink target={entry.target} /> : null}
          {entry.links?.length ? <KnowledgeLinks links={entry.links} /> : null}
        </article>
      ))}
      {!expanded && entries.length > 4 && (
        <details>
          <summary className="min-h-11 cursor-pointer content-center">
            Chú giải và các cách đọc khác
          </summary>
          <KnowledgeEntries entries={entries.slice(4)} expanded />
        </details>
      )}
    </div>
  );
}
