import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  categories,
  filterRules,
  getLibraryRecords,
  recordDescription,
  recordKind,
  recordName,
  recordPath,
  ruleCategories,
} from './library-data';
import type { Category, RuleFilter } from './library-data';
import './library.css';

export function LibraryPage() {
  const [category, setCategory] = useState<Category>('hexagrams');
  const [query, setQuery] = useState('');
  const [ruleFilter, setRuleFilter] = useState<RuleFilter>('all');
  const records = useMemo(() => getLibraryRecords(category, query), [category, query]);
  const shown = category === 'rules' ? filterRules(records, ruleFilter) : records;

  return (
    <main className="library-page">
      <header className="library-heading">
        <div className="library-heading-copy">
          <p className="library-kicker">Cẩm nang Lục Hào</p>
          <h1>
            Thư viện<span aria-hidden="true">.</span>
          </h1>
          <p>Tra cứu quẻ, quái, thuật ngữ và quy tắc tính quẻ.</p>
        </div>
        <div className="library-seal" aria-hidden="true">
          <span>☯</span>
          <small>TRA CỨU</small>
        </div>
      </header>

      <section className="library-browser" aria-label="Tra cứu tri thức">
        <nav className="library-tabs" aria-label="Danh mục tri thức">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={category === id}
              className={`library-tab${category === id ? ' is-selected' : ''}`}
              onClick={() => setCategory(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="library-toolbar">
          <label className="library-search">
            <span className="library-search-icon" aria-hidden="true">
              ⌕
            </span>
            <span className="sr-only">Tìm theo tên và phần mô tả</span>
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Tìm trong thư viện"
            />
            {query && (
              <button
                type="button"
                className="library-clear"
                onClick={() => setQuery('')}
                aria-label="Xóa nội dung tìm kiếm"
              >
                ×
              </button>
            )}
          </label>
          <span className="library-count" aria-live="polite">
            {shown.length} mục
          </span>
        </div>
        {category === 'rules' && (
          <div className="rule-filters" aria-label="Lọc quy tắc">
            {ruleCategories.map(filter => (
              <button
                key={filter}
                type="button"
                aria-pressed={ruleFilter === filter}
                className={ruleFilter === filter ? 'is-active' : ''}
                onClick={() => setRuleFilter(filter)}
              >
                {filter === 'all'
                  ? 'Tất cả quy tắc'
                  : (
                      {
                        metadata: 'Thông tin',
                        structure: 'Cấu trúc',
                        transformation: 'Biến đổi',
                        classification: 'Phân loại',
                      } as const
                    )[filter]}
              </button>
            ))}
          </div>
        )}
        {shown.length ? (
          <div className={`library-list library-list-${category}`}>
            {shown.map(record => (
              <Link key={record.id} className="library-entry" to={recordPath(record)}>
                <span className="entry-mark" aria-hidden="true">
                  {recordKind(record) === 'rule' ? '≡' : recordKind(record) === 'term' ? 'Aa' : '☯'}
                </span>
                <span className="entry-copy">
                  <span className="entry-title">{recordName(record)}</span>
                  <span className="entry-description">{recordDescription(record)}</span>
                </span>
                <span className="entry-aside">
                  {'kingWenNumber' in record
                    ? String(record.kingWenNumber).padStart(2, '0')
                    : 'category' in record
                      ? (
                          {
                            metadata: 'Thông tin',
                            structure: 'Cấu trúc',
                            transformation: 'Biến đổi',
                            classification: 'Phân loại',
                          } as const
                        )[record.category]
                      : ''}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="library-empty" role="status">
            <span className="empty-symbol" aria-hidden="true">
              ∅
            </span>
            <h2>Không tìm thấy mục nào</h2>
            <p>Thử tên khác hoặc xóa nội dung tìm kiếm để xem toàn bộ danh mục.</p>
            {query && (
              <button type="button" onClick={() => setQuery('')}>
                Xóa nội dung tìm kiếm
              </button>
            )}
          </div>
        )}
        <p className="library-local-note">
          <span aria-hidden="true">◉</span> Nội dung tra cứu được lưu trên thiết bị này.
        </p>
      </section>
    </main>
  );
}
