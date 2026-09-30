import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
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
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from './components/ui/empty';
import { Field, FieldLabel } from './components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './components/ui/input-group';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';

const ruleLabels = {
  all: 'Tất cả quy tắc',
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
        <Badge variant="secondary">Cẩm nang Lục Hào</Badge>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">Thư viện</h1>
        <p className="max-w-2xl text-muted-foreground">
          Tra cứu quẻ, quái, thuật ngữ và quy tắc tính quẻ.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <Card className="min-w-0 lg:col-span-8">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Tra cứu tri thức
            </CardTitle>
            <CardDescription>Chọn danh mục và tìm theo tên hoặc nội dung.</CardDescription>
          </CardHeader>
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
              <FieldLabel htmlFor="library-search">Tìm kiếm</FieldLabel>
              <InputGroup className="h-11">
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
                onValueChange={value =>
                  setRuleFilter((value[0] as RuleFilter | undefined) ?? 'all')
                }
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
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              {categoryLabel}
            </CardTitle>
            <CardDescription>Tri thức tham khảo có sẵn trên thiết bị.</CardDescription>
            <CardAction>
              <Badge variant="outline" aria-live="polite">
                {shown.length} mục
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Mở từng mục để xem mô tả, quy tắc liên quan và vị trí nguồn tra cứu.
            </p>
          </CardContent>
        </Card>
      </div>

      {shown.length ? (
        <section
          className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3"
          aria-label={`Các mục ${categoryLabel}`}
        >
          {shown.map(record => (
            <Card key={record.id} size="sm" className="min-w-0">
              <CardHeader>
                <CardTitle role="heading" aria-level={3}>
                  {formatName(recordName(record))}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {recordDescription(record)}
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">
                    {'kingWenNumber' in record
                      ? `Quẻ ${String(record.kingWenNumber).padStart(2, '0')}`
                      : recordKind(record) === 'rule'
                        ? 'Quy tắc'
                        : recordKind(record) === 'term'
                          ? 'Thuật ngữ'
                          : 'Quái'}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="lg"
                  render={<Link to={recordPath(record)} />}
                  aria-label={`Xem ${formatName(recordName(record))}`}
                >
                  Xem chi tiết <ArrowRight data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyTitle role="heading" aria-level={2}>
              Không tìm thấy mục nào
            </EmptyTitle>
            <EmptyDescription>
              Thử tên khác hoặc xóa nội dung tìm kiếm để xem toàn bộ danh mục.
            </EmptyDescription>
          </EmptyHeader>
          {query && (
            <EmptyContent>
              <Button variant="outline" size="lg" onClick={() => setQuery('')}>
                Xóa nội dung tìm kiếm
              </Button>
            </EmptyContent>
          )}
        </Empty>
      )}
    </main>
  );
}
