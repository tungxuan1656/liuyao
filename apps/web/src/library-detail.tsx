import { Link, useParams } from 'react-router-dom';
import type { KnowledgeEntity } from '@liuyao/knowledge';
import { ROUTES } from './route-paths';
import {
  getRecord,
  getReferences,
  getRelatedFigures,
  recordDescription,
  recordName,
  recordPath,
} from './library-data';

export function LibraryDetailPage() {
  const { entityType = '', id = '' } = useParams();
  const record = getRecord(entityType, id);
  const references = getReferences(record?.id ?? '');
  if (!record)
    return (
      <main className="library-detail">
        <Link className="detail-back" to={ROUTES.library}>
          ← Library
        </Link>
        <section className="library-empty">
          <span className="empty-symbol" aria-hidden="true">
            ?
          </span>
          <h1>Entry not found</h1>
          <p>This address does not match an entry in the local library.</p>
          <Link to={ROUTES.library}>Browse the library</Link>
        </section>
      </main>
    );

  const related = getRelatedFigures(record);
  return (
    <main className="library-detail">
      <Link className="detail-back" to={ROUTES.library}>
        ← Back to Library
      </Link>
      <article className="detail-sheet">
        <header className="detail-heading">
          <div className="detail-title-block">
            <p className="library-kicker">
              {entityType}
              {'kingWenNumber' in record
                ? ` · King Wen ${record.kingWenNumber}`
                : 'category' in record
                  ? ` · ${record.category}`
                  : ''}
            </p>
            <h1>{recordName(record)}</h1>
            {'han' in record && <p className="detail-han">{record.han}</p>}
          </div>
          <span className="detail-id">{record.id}</span>
        </header>
        <p className="detail-description">{recordDescription(record)}</p>
        {'upperTrigramId' in record && (
          <section className="detail-section">
            <h2>Made from two trigrams</h2>
            <div className="related-grid">
              {[record.upperTrigramId, record.lowerTrigramId].map((trigramId, index) => {
                const trigram = related.find(item => item.id === trigramId);
                return (
                  trigram && (
                    <Link
                      key={`${index}-${trigramId}`}
                      className="related-link"
                      to={recordPath(trigram)}
                    >
                      <span>{index === 0 ? 'Upper' : 'Lower'}</span>
                      <strong>{trigram.name}</strong>
                      <span className="related-han">{trigram.han}</span>
                    </Link>
                  )
                );
              })}
            </div>
          </section>
        )}
        {related.length > 0 && !('upperTrigramId' in record) && (
          <section className="detail-section">
            <h2>Related figures</h2>
            <div className="related-grid">
              {related.map((item: KnowledgeEntity) => (
                <Link key={item.id} className="related-link" to={recordPath(item)}>
                  <span>{item.kind}</span>
                  <strong>{item.name}</strong>
                  <span className="related-han">{item.han}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        {references.length > 0 && (
          <section className="detail-section source-section">
            <h2>Sources &amp; locations</h2>
            {references.map(reference => (
              <div className="source-record" key={reference.id}>
                <h3>{reference.source.title}</h3>
                <p className="source-author">{reference.source.author}</p>
                <dl>
                  <div>
                    <dt>Publication</dt>
                    <dd>{reference.source.publication}</dd>
                  </div>
                  {reference.location && (
                    <div>
                      <dt>Location</dt>
                      <dd>{reference.location}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Rights</dt>
                    <dd>{reference.source.rights}</dd>
                  </div>
                  <div>
                    <dt>Provenance</dt>
                    <dd>{reference.source.provenance}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </section>
        )}
        {references.length === 0 && (
          <p className="source-unavailable">No source location is recorded for this entry.</p>
        )}
      </article>
    </main>
  );
}
