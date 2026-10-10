import { ArrowRight, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from './components/ui/empty';
import { Field, FieldLabel } from './components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './components/ui/input-group';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import type { Category, RuleFilter } from './library-data';
import {
  categories,
  filterRules,
  getLibraryRecords,
  recordDescription,
  recordName,
  recordPath,
  ruleCategories,
} from './library-data';
import { getLinePresentation } from './line-value-presentation';

const ruleLabels = {
  all: 'Tất cả',
  metadata: 'Thông tin',
  structure: 'Cấu trúc',
  transformation: 'Biến đổi',
  classification: 'Phân loại',
} as const;

function formatName(name: string) {
  return ['6', '7', '8', '9'].includes(name) ? getLinePresentation(Number(name)).name : name;
}

export function LibraryPage() {
  const [category, setCategory] = useState<Category>('hexagrams');
  const [query, setQuery] = useState('');
  const [ruleFilter, setRuleFilter] = useState<RuleFilter>('all');
  const records = useMemo(() => getLibraryRecords(category, query), [category, query]);
  const shown = category === 'rules' ? filterRules(records, ruleFilter) : records;
  const categoryLabel = categories.find(item => item.id === category)?.label ?? 'Thư viện';

  return (
    <main className="route-page flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">Thư viện</h1>
      </header>

      <Card>
        <CardContent className="flex min-w-0 flex-col gap-6">
          <Tabs value={category} onValueChange={value => value && setCategory(value as Category)}>
            <TabsList
              variant="line"
              className="grid h-auto! w-full grid-cols-2 sm:flex sm:w-fit"
              aria-label="Danh mục tri thức"
            >
              {categories.map(({ id, label }) => (
                <TabsTrigger key={id} value={id} className="min-h-11">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Field>
            <FieldLabel htmlFor="library-search" className="sr-only">
              Tìm kiếm
            </FieldLabel>
            <InputGroup className="h-11 pl-3">
              <InputGroupAddon>
                <Search aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="library-search"
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Tìm trong thư viện"
              />
              {query && (
                <InputGroupAddon align="inline-end" className="py-0">
                  {/* The dialog-like clear control keeps the 44px touch target required by ui-layout.md. */}
                  <InputGroupButton
                    size="icon-sm"
                    className="size-11"
                    onClick={() => setQuery('')}
                    aria-label="Xóa nội dung tìm kiếm"
                  >
                    <X aria-hidden="true" />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
          </Field>
          {category === 'rules' && (
            <ToggleGroup
              aria-label="Lọc quy tắc"
              size="lg"
              value={[ruleFilter]}
              onValueChange={value => setRuleFilter((value[0] as RuleFilter | undefined) ?? 'all')}
              className="flex-wrap justify-start"
            >
              {ruleCategories.map(filter => (
                <ToggleGroupItem key={filter} value={filter}>
                  {ruleLabels[filter]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground" role="status">
        {shown.length} mục
      </p>

      {shown.length ? (
        <section
          className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3"
          aria-label={`Các mục ${categoryLabel}`}
        >
          {shown.map(record => (
            <Link
              key={record.id}
              to={recordPath(record)}
              aria-label={`Xem ${formatName(recordName(record))}`}
              className="group/library-card min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Card
                size="sm"
                className="min-w-0 transition-colors group-hover/library-card:bg-muted/50"
              >
                <CardHeader>
                  <CardTitle role="heading" aria-level={2}>
                    {formatName(recordName(record))}
                  </CardTitle>
                  {!('kingWenNumber' in record) && (
                    <CardDescription className="line-clamp-3">
                      {recordDescription(record)}
                    </CardDescription>
                  )}
                  <CardAction className="flex items-center gap-3 self-center">
                    {'kingWenNumber' in record && (
                      <Badge variant="outline">
                        {String(record.kingWenNumber).padStart(2, '0')}
                      </Badge>
                    )}
                    <ArrowRight aria-hidden="true" className="size-4 text-muted-foreground" />
                  </CardAction>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </section>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyTitle role="heading" aria-level={2}>
              Không tìm thấy mục nào
            </EmptyTitle>
          </EmptyHeader>
          {query && (
            <EmptyContent>
              <Button variant="outline" size="lg" onClick={() => setQuery('')}>
                Xóa tìm kiếm
              </Button>
            </EmptyContent>
          )}
        </Empty>
      )}
    </main>
  );
}
