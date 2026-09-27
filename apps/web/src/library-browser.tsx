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
          <p className="library-kicker">A field guide to Liu Yao</p>
          <h1>
            Library<span aria-hidden="true">.</span>
          </h1>
          <p>Explore the figures, language and conventions behind each reading.</p>
        </div>
        <div className="library-seal" aria-hidden="true">
          <span>易</span>
          <small>REFERENCE</small>
        </div>
      </header>

      <section className="library-browser" aria-label="Browse knowledge">
        <nav className="library-tabs" aria-label="Knowledge categories">
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
            <span className="sr-only">Search names, aliases and descriptions</span>
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search the library"
            />
            {query && (
              <button
                type="button"
                className="library-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
          <span className="library-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
        {category === 'rules' && (
          <div className="rule-filters" aria-label="Filter rules">
            {ruleCategories.map(filter => (
              <button
                key={filter}
                type="button"
                aria-pressed={ruleFilter === filter}
                className={ruleFilter === filter ? 'is-active' : ''}
                onClick={() => setRuleFilter(filter)}
              >
                {filter === 'all'
                  ? 'All rules'
                  : `${filter.slice(0, 1).toUpperCase()}${filter.slice(1)}`}
              </button>
            ))}
          </div>
        )}
        {shown.length ? (
          <div className={`library-list library-list-${category}`}>
            {shown.map(record => (
              <Link key={record.id} className="library-entry" to={recordPath(record)}>
                <span className="entry-mark" aria-hidden="true">
                  {'han' in record ? record.han : recordKind(record) === 'rule' ? '律' : '語'}
                </span>
                <span className="entry-copy">
                  <span className="entry-title">{recordName(record)}</span>
                  <span className="entry-description">{recordDescription(record)}</span>
                </span>
                <span className="entry-aside">
                  {'kingWenNumber' in record
                    ? String(record.kingWenNumber).padStart(2, '0')
                    : 'category' in record
                      ? record.category
                      : ''}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="library-empty" role="status">
            <span className="empty-symbol" aria-hidden="true">
              無
            </span>
            <h2>No entries found</h2>
            <p>Try another name or clear the search to browse all {category}.</p>
            {query && (
              <button type="button" onClick={() => setQuery('')}>
                Clear search
              </button>
            )}
          </div>
        )}
        <p className="library-local-note">
          <span aria-hidden="true">◉</span> Reference content is stored on this device.
        </p>
      </section>
    </main>
  );
}
