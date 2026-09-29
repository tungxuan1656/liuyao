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

export function LibraryDetailPage() {
  const { entityType = '', id = '' } = useParams();
  const record = getRecord(entityType, id);
  const references = getReferences(record?.id ?? '');
  if (!record)
    return (
      <main className="library-detail">
        <Button
          variant="ghost"
          size="sm"
          render={<Link className="detail-back" to={ROUTES.library} />}
        >
          ← Quay lại thư viện
        </Button>
        <Card className="library-empty">
          <CardContent className="p-6">
            <span className="empty-symbol" aria-hidden="true">
              ?
            </span>
            <h1>Không tìm thấy mục</h1>
            <p>Địa chỉ này không khớp với mục nào trong thư viện trên thiết bị.</p>
            <Link to={ROUTES.library}>Mở thư viện</Link>
          </CardContent>
        </Card>
      </main>
    );

  const related = getRelatedFigures(record);
  const applicableRules = getApplicableRules(record);
  return (
    <main className="library-detail">
      <Button
        variant="ghost"
        size="sm"
        render={<Link className="detail-back" to={ROUTES.library} />}
      >
        ← Quay lại thư viện
      </Button>
      <Card className="detail-sheet">
        <CardContent className="p-5">
          <header className="detail-heading">
            <div className="detail-title-block">
              <p className="library-kicker">
                {(
                  { hexagram: 'Quẻ', trigram: 'Quái', term: 'Thuật ngữ', rule: 'Quy tắc' } as const
                )[entityType as 'hexagram' | 'trigram' | 'term' | 'rule'] ?? 'Mục'}
                {'kingWenNumber' in record
                  ? ` · Số thứ tự ${record.kingWenNumber}`
                  : 'category' in record
                    ? ` · ${({ metadata: 'Thông tin', structure: 'Cấu trúc', transformation: 'Biến đổi', classification: 'Phân loại' } as const)[record.category]}`
                    : ''}
              </p>
              <h1>{recordName(record)}</h1>
            </div>
            <Badge variant="outline" className="detail-id">
              {record.id}
            </Badge>
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
              <h2>
                Quẻ liên quan <span className="related-count">{related.length} quẻ</span>
              </h2>
              <div className="related-grid">
                {related.map(item => (
                  <Link key={item.id} className="related-link" to={recordPath(item)}>
                    <span>
                      {'kingWenNumber' in item
                        ? `Quẻ số ${String(item.kingWenNumber).padStart(2, '0')}`
                        : 'Quái'}
                    </span>
                    <strong>{item.name}</strong>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {applicableRules.length > 0 && (
            <section className="detail-section">
              <h2>Quy tắc áp dụng</h2>
              <div className="related-grid">
                {applicableRules.map(rule => (
                  <Link key={rule.id} className="related-link" to={recordPath(rule)}>
                    <span>Quy tắc</span>
                    <strong>{rule.title}</strong>
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
        </CardContent>
      </Card>
    </main>
  );
}
