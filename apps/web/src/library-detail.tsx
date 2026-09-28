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
          ← Quay lại thư viện
        </Link>
        <section className="library-empty">
          <span className="empty-symbol" aria-hidden="true">
            ?
          </span>
          <h1>Không tìm thấy mục</h1>
          <p>Địa chỉ này không khớp với mục nào trong thư viện trên thiết bị.</p>
          <Link to={ROUTES.library}>Mở thư viện</Link>
        </section>
      </main>
    );

  const related = getRelatedFigures(record);
  return (
    <main className="library-detail">
      <Link className="detail-back" to={ROUTES.library}>
        ← Quay lại thư viện
      </Link>
      <article className="detail-sheet">
        <header className="detail-heading">
          <div className="detail-title-block">
            <p className="library-kicker">
              {({ hexagram: 'Quẻ', trigram: 'Quái', term: 'Thuật ngữ', rule: 'Quy tắc' } as const)[
                entityType as 'hexagram' | 'trigram' | 'term' | 'rule'
              ] ?? 'Mục'}
              {'kingWenNumber' in record
                ? ` · Số thứ tự ${record.kingWenNumber}`
                : 'category' in record
                  ? ` · ${({ metadata: 'Thông tin', structure: 'Cấu trúc', transformation: 'Biến đổi', classification: 'Phân loại' } as const)[record.category]}`
                  : ''}
            </p>
            <h1>{recordName(record)}</h1>
          </div>
          <span className="detail-id">{record.id}</span>
        </header>
        <p className="detail-description">{recordDescription(record)}</p>
        {'upperTrigramId' in record && (
          <section className="detail-section">
            <h2>Gồm hai quái</h2>
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
                      <span>{index === 0 ? 'Ngoại quái' : 'Nội quái'}</span>
                      <strong>{trigram.name}</strong>
                    </Link>
                  )
                );
              })}
            </div>
          </section>
        )}
        {related.length > 0 && !('upperTrigramId' in record) && (
          <section className="detail-section">
            <h2>Quẻ liên quan</h2>
            <div className="related-grid">
              {related.map((item: KnowledgeEntity) => (
                <Link key={item.id} className="related-link" to={recordPath(item)}>
                  <span>{item.kind === 'trigram' ? 'Quái' : 'Quẻ'}</span>
                  <strong>{item.name}</strong>
                </Link>
              ))}
            </div>
          </section>
        )}
        {references.length > 0 && (
          <section className="detail-section source-section">
            <h2>Nguồn và vị trí tra cứu</h2>
            {references.map(reference => (
              <div className="source-record" key={reference.id}>
                <h3>{reference.source.title}</h3>
                <p className="source-author">{reference.source.author}</p>
                <dl>
                  <div>
                    <dt>Thông tin xuất bản</dt>
                    <dd>{reference.source.publication}</dd>
                  </div>
                  {reference.location && (
                    <div>
                      <dt>Vị trí trích dẫn</dt>
                      <dd>{reference.location}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Quyền sử dụng</dt>
                    <dd>{reference.source.rights}</dd>
                  </div>
                  <div>
                    <dt>Xuất xứ</dt>
                    <dd>{reference.source.provenance}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </section>
        )}
        {references.length === 0 && (
          <p className="source-unavailable">Chưa ghi nhận vị trí nguồn cho mục này.</p>
        )}
      </article>
    </main>
  );
}
