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
import { getLinePresentation } from './line-value-presentation';
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

function formatName(name: string) {
  if (['6', '7', '8', '9'].includes(name)) {
    return getLinePresentation(Number(name)).name;
  }
  return name;
}

export function LibraryPage() {
  const [category, setCategory] = useState<Category>('hexagrams');
  const [query, setQuery] = useState('');
  const [ruleFilter, setRuleFilter] = useState<RuleFilter>('all');
  const records = useMemo(() => getLibraryRecords(category, query), [category, query]);
  const shown = category === 'rules' ? filterRules(records, ruleFilter) : records;

  return (
    <main className="w-full max-w-[920px] mx-auto text-foreground">
      <header className="flex min-w-0 min-h-[160px] py-6 items-center">
        <div className="min-w-0">
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
            Cẩm nang Lục Hào
          </p>
          <h1 className="m-0 font-serif text-4xl md:text-5xl font-medium tracking-tight">
            Thư viện
          </h1>
          <p className="mt-3 max-w-[35rem] text-muted-foreground text-base leading-relaxed">
            Tra cứu quẻ, quái, thuật ngữ và quy tắc tính quẻ.
          </p>
        </div>
      </header>

      <section className="min-w-0 py-6" aria-label="Tra cứu tri thức">
        <Tabs value={category} onValueChange={value => value && setCategory(value as Category)}>
          <TabsList
            className="flex overflow-x-auto gap-1 border-b-0 scrollbar-none w-full grid-cols-2 sm:flex bg-transparent p-0"
            aria-label="Danh mục tri thức"
          >
            {categories.map(({ id, label }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="relative min-h-[44px] sm:min-h-[48px] px-2 sm:px-4 py-2 sm:py-2.5 border-0 bg-transparent text-muted-foreground whitespace-normal sm:whitespace-nowrap cursor-pointer data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:bg-transparent"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex min-w-0 mt-4 mb-3 items-center justify-between gap-2 sm:gap-4">
          <label className="block min-w-0 flex-1">
            <span className="sr-only">Tìm theo tên và phần mô tả</span>
            <InputGroup className="flex w-full sm:max-w-[470px] min-h-[46px] px-3 items-center gap-2 border-0 bg-secondary rounded-md focus-within:ring-2 focus-within:ring-foreground">
              <InputGroupAddon>
                <span
                  className="text-muted-foreground font-serif text-2xl leading-none"
                  aria-hidden="true"
                >
                  ⌕
                </span>
              </InputGroupAddon>
              <InputGroupInput
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Tìm trong thư viện"
                className="min-h-[44px] w-full min-w-0 border-0 outline-none bg-transparent text-foreground text-sm"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="grid w-11 h-11 shrink-0 place-items-center border-0 bg-transparent text-muted-foreground text-xl cursor-pointer hover:bg-transparent hover:text-foreground"
                  onClick={() => setQuery('')}
                  aria-label="Xóa nội dung tìm kiếm"
                >
                  ×
                </Button>
              )}
            </InputGroup>
          </label>
          <span
            className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap"
            aria-live="polite"
          >
            {shown.length} mục
          </span>
        </div>
        {category === 'rules' && (
          <ToggleGroup
            value={[ruleFilter]}
            onValueChange={value => setRuleFilter((value[0] as RuleFilter | undefined) ?? 'all')}
            className="flex overflow-x-auto py-1 gap-2 scrollbar-none justify-start"
            aria-label="Lọc quy tắc"
          >
            {ruleCategories.map(filter => (
              <ToggleGroupItem
                key={filter}
                value={filter}
                className="min-h-[44px] px-3 py-2 border-0 rounded-full bg-transparent text-muted-foreground text-xs whitespace-nowrap cursor-pointer data-[state=on]:bg-secondary data-[state=on]:text-foreground hover:bg-secondary/50"
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
          <div
            className={`grid min-w-0 grid-cols-1 sm:grid-cols-2 ${category === 'hexagrams' ? 'md:grid-cols-3' : ''} mt-2 border-t border-border`}
          >
            {shown.map(record => (
              <Link
                key={record.id}
                className="flex min-w-0 min-h-[80px] px-3 py-3 items-center gap-3 text-foreground hover:bg-neutral-50 border-b border-border transition-colors no-underline"
                to={recordPath(record)}
              >
                <span
                  className={`grid w-10 h-10 shrink-0 place-items-center text-foreground font-serif ${category === 'hexagrams' ? 'text-xl' : 'text-2xl'}`}
                  aria-hidden="true"
                >
                  {recordKind(record) === 'rule' ? '≡' : recordKind(record) === 'term' ? 'Aa' : '☯'}
                </span>
                <span className="grid min-w-0 gap-1">
                  <span className="font-serif text-base font-semibold">
                    {formatName(recordName(record))}
                  </span>
                  <span className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                    {recordDescription(record)}
                  </span>
                </span>
                <span
                  className={`ml-auto text-muted-foreground whitespace-nowrap ${category === 'hexagrams' ? 'font-serif text-base' : 'text-xs'}`}
                >
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
          <Empty className="grid min-h-[250px] p-8 place-content-center text-center">
            <EmptyHeader className="gap-2">
              <span className="text-foreground font-serif text-4xl" aria-hidden="true">
                ∅
              </span>
              <EmptyTitle className="mt-2 font-serif text-xl font-medium tracking-normal normal-case">
                Không tìm thấy mục nào
              </EmptyTitle>
              <EmptyDescription className="max-w-[26rem] text-muted-foreground leading-relaxed">
                Thử tên khác hoặc xóa nội dung tìm kiếm để xem toàn bộ danh mục.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              {query && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setQuery('')}
                  className="min-h-[44px] mt-3 border-0 bg-transparent text-foreground underline underline-offset-4 hover:bg-transparent"
                >
                  Xóa nội dung tìm kiếm
                </Button>
              )}
            </EmptyContent>
          </Empty>
        )}
        <p className="flex mt-5 items-center gap-2 text-muted-foreground text-xs">
          <span className="text-foreground" aria-hidden="true">
            ◉
          </span>{' '}
          Nội dung tra cứu được lưu trên thiết bị này.
        </p>
      </section>
    </main>
  );
}
