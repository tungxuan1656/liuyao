import type { ContentEntry, ContentLink, ContentReference } from '@liuyao/knowledge';
import { getContentMetadata, getSource } from '@liuyao/knowledge';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
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
export function KnowledgeReferences({
  references,
  summary,
  expanded = false,
}: {
  references?: readonly ContentReference[];
  summary?: ReactNode;
  expanded?: boolean;
}) {
  if (!references || references.length === 0) {
    if (summary) return <div>{summary}</div>;
    return <p className="text-sm text-muted-foreground">Chưa có trích dẫn nguồn cho mục này.</p>;
  }
  return (
    <details open={expanded}>
      <summary className="group min-h-11 cursor-pointer content-center text-muted-foreground hover:text-foreground">
        {summary ?? <span>Nguồn tham khảo</span>}
      </summary>
      <ul className="ps-5 text-sm text-muted-foreground">
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
function entrySummary(entry: ContentEntry) {
  if (entry.title && entry.attribution) {
    return (
      <span className="inline-flex flex-wrap items-baseline gap-x-2">
        <span className="font-semibold text-foreground">{entry.title}</span>
        <span className="text-muted-foreground group-hover:text-foreground">
          {entry.attribution.author}
          {entry.attribution.via ? ` · ${entry.attribution.via}` : ''}
        </span>
      </span>
    );
  }
  if (entry.title) {
    return <span className="font-semibold text-foreground">{entry.title}</span>;
  }
  if (entry.attribution) {
    return (
      <span className="text-muted-foreground group-hover:text-foreground">
        {entry.attribution.author}
        {entry.attribution.via ? ` · ${entry.attribution.via}` : ''}
      </span>
    );
  }
  return entry.references?.length ? (
    <span className="text-muted-foreground group-hover:text-foreground">Nguồn tham khảo</span>
  ) : null;
}

export function KnowledgeEntries({
  entries,
  expanded = false,
  referencesExpanded = false,
  suppressReferences = false,
}: {
  entries: readonly ContentEntry[];
  expanded?: boolean;
  referencesExpanded?: boolean;
  suppressReferences?: boolean;
}) {
  if (!entries || entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Chưa có chú giải phát hành cho phần này.</p>
    );
  }
  const visible = expanded ? entries : entries.slice(0, 4);
  return (
    <div className="flex flex-col gap-6">
      {visible.map((entry, index) => {
        const summary = suppressReferences ? null : entrySummary(entry);
        return (
          <article
            key={entry.id ?? index}
            id={entry.id}
            className="flex scroll-mt-24 flex-col gap-3 target:ring-2 target:ring-primary"
          >
            {summary ? (
              <KnowledgeReferences
                references={entry.references}
                summary={summary}
                expanded={referencesExpanded}
              />
            ) : null}
            <p className="whitespace-pre-line font-serif text-lg leading-relaxed">{entry.text}</p>
            {entry.condition && (
              <p className="whitespace-pre-line text-muted-foreground">{entry.condition}</p>
            )}
            {entry.target ? <TargetLink target={entry.target} /> : null}
            {entry.links?.length ? <KnowledgeLinks links={entry.links} /> : null}
          </article>
        );
      })}
      {!expanded && entries.length > 4 && (
        <details>
          <summary className="min-h-11 cursor-pointer content-center">
            Chú giải và các cách đọc khác
          </summary>
          <KnowledgeEntries
            entries={entries.slice(4)}
            expanded
            referencesExpanded={referencesExpanded}
          />
        </details>
      )}
    </div>
  );
}

export function ContentSection({
  title,
  entries,
  id,
  expanded = false,
  referencesExpanded = false,
}: {
  expanded?: boolean;
  referencesExpanded?: boolean;
  title: string;
  entries: readonly ContentEntry[];
  id?: string;
}) {
  const [firstEntry] = entries;
  const singleEntry =
    entries.length === 1 && firstEntry && !firstEntry.title && !firstEntry.attribution
      ? firstEntry
      : null;

  if (singleEntry?.references?.length) {
    return (
      <Card id={id} className="min-w-0 scroll-mt-24 target:ring-2 target:ring-primary">
        <CardHeader>
          <KnowledgeReferences
            references={singleEntry.references}
            summary={
              <CardTitle
                role="heading"
                aria-level={2}
                className="inline-block text-foreground group-hover:underline"
              >
                {title}
              </CardTitle>
            }
            expanded={referencesExpanded}
          />
        </CardHeader>
        <CardContent>
          <KnowledgeEntries
            entries={entries}
            expanded={expanded}
            referencesExpanded={referencesExpanded}
            suppressReferences
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id={id} className="min-w-0 scroll-mt-24 target:ring-2 target:ring-primary">
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <KnowledgeEntries
          entries={entries}
          expanded={expanded}
          referencesExpanded={referencesExpanded}
        />
      </CardContent>
    </Card>
  );
}
