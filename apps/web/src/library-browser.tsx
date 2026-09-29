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
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { InputGroup, InputGroupInput, InputGroupAddon } from './components/ui/input-group';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { Button } from './components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from './components/ui/empty';

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
        <Tabs value={category} onValueChange={value => value && setCategory(value as Category)}>
          <TabsList className="library-tabs" aria-label="Danh mục tri thức">
            {categories.map(({ id, label }) => (
              <TabsTrigger key={id} value={id} className="library-tab">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="library-toolbar">
          <label className="library-search-label">
            <span className="sr-only">Tìm theo tên và phần mô tả</span>
            <InputGroup className="library-search">
              <InputGroupAddon>
                <span className="library-search-icon" aria-hidden="true">
                  ⌕
                </span>
              </InputGroupAddon>
              <InputGroupInput
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Tìm trong thư viện"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="library-clear"
                  onClick={() => setQuery('')}
                  aria-label="Xóa nội dung tìm kiếm"
                >
                  ×
                </Button>
              )}
            </InputGroup>
          </label>
          <span className="library-count" aria-live="polite">
            {shown.length} mục
          </span>
        </div>
        {category === 'rules' && (
          <ToggleGroup
            value={[ruleFilter]}
            onValueChange={value => setRuleFilter((value[0] as RuleFilter | undefined) ?? 'all')}
            className="rule-filters"
            aria-label="Lọc quy tắc"
          >
            {ruleCategories.map(filter => (
              <ToggleGroupItem
                key={filter}
                value={filter}
                aria-label={
                  filter === 'all'
                    ? 'Tất cả quy tắc'
                    : (
                        {
                          metadata: 'Thông tin',
                          structure: 'Cấu trúc',
                          transformation: 'Biến đổi',
                          classification: 'Phân loại',
                        } as const
                      )[filter]
                }
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
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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
          <Empty className="library-empty">
            <EmptyHeader>
              <span className="empty-symbol" aria-hidden="true">
                ∅
              </span>
              <EmptyTitle>Không tìm thấy mục nào</EmptyTitle>
              <EmptyDescription>
                Thử tên khác hoặc xóa nội dung tìm kiếm để xem toàn bộ danh mục.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              {query && (
                <Button variant="outline" type="button" onClick={() => setQuery('')}>
                  Xóa nội dung tìm kiếm
                </Button>
              )}
            </EmptyContent>
          </Empty>
        )}
        <p className="library-local-note">
          <span aria-hidden="true">◉</span> Nội dung tra cứu được lưu trên thiết bị này.
        </p>
      </section>
    </main>
  );
}
