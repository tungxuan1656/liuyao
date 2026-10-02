import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, House, Settings2 } from 'lucide-react';
import { ROUTES } from '../route-paths';
import { cn } from '../lib/utils';
import { buttonVariants } from './ui/button';

const destinations = [
  { label: 'Gieo quẻ', path: ROUTES.home, icon: House },
  { label: 'Thư viện', path: ROUTES.library, icon: BookOpen },
  { label: 'Cài đặt', path: ROUTES.settings, icon: Settings2 },
] as const;

function isCurrentDestination(pathname: string, path: string) {
  if (path === ROUTES.home) {
    return pathname === ROUTES.home || pathname === ROUTES.casting || pathname === ROUTES.result;
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Navigation() {
  const { pathname } = useLocation();

  const mobileParent =
    pathname === ROUTES.casting || pathname === ROUTES.result
      ? ROUTES.home
      : pathname.startsWith(`${ROUTES.library}/`)
        ? ROUTES.library
        : null;
  const mobileTitle =
    pathname === ROUTES.casting
      ? 'Lập quẻ'
      : pathname === ROUTES.result
        ? 'Kết quả'
        : pathname.startsWith(`${ROUTES.library}/`)
          ? 'Chi tiết thư viện'
          : 'Lục Hào';

  return (
    <header data-app-header className="sticky top-0 z-20 isolate border-b bg-background">
      <div
        data-app-header-content
        className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-4"
      >
        <div className="flex min-w-0 items-center gap-2 md:hidden">
          {mobileParent ? (
            <Link
              to={mobileParent}
              className={buttonVariants({ variant: 'ghost', size: 'icon-lg' })}
              aria-label={
                mobileParent === ROUTES.library ? 'Quay lại thư viện' : 'Quay lại trang gieo quẻ'
              }
            >
              <ArrowLeft aria-hidden="true" />
            </Link>
          ) : null}
          {mobileParent ? (
            <span className="truncate font-serif text-lg font-semibold">{mobileTitle}</span>
          ) : (
            <Link
              to={ROUTES.home}
              className="inline-flex min-h-11 items-center gap-2"
              aria-label="Trang chủ Lục Hào"
            >
              <img
                src="/pwa-192x192.png"
                alt=""
                aria-hidden="true"
                className="size-9 shrink-0 object-contain md:size-10"
              />
              <span className="font-serif text-lg font-semibold">{mobileTitle}</span>
            </Link>
          )}
        </div>

        <Link
          to={ROUTES.home}
          className="hidden items-center gap-2 text-foreground no-underline md:inline-flex"
          aria-label="Trang chủ Lục Hào"
        >
          <img
            src="/pwa-192x192.png"
            alt=""
            aria-hidden="true"
            className="size-9 shrink-0 object-contain md:size-10"
          />
          <span className="font-serif text-xl font-semibold">Lục Hào</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {destinations.map(({ label, path, icon: Icon }) => {
            const current = isCurrentDestination(pathname, path);
            return (
              <Link
                key={path}
                to={path}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 border-b-2 px-4 text-sm font-medium transition-colors',
                  current
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <nav className="flex shrink-0 items-center gap-1 md:hidden" aria-label="Điều hướng chính">
          {destinations.slice(1).map(({ label, path, icon: Icon }) => {
            const current = isCurrentDestination(pathname, path);
            return (
              <Link
                key={path}
                to={path}
                aria-label={label}
                title={label}
                aria-current={current ? 'page' : undefined}
                className={buttonVariants({
                  variant: current ? 'secondary' : 'ghost',
                  size: 'icon-lg',
                })}
              >
                <Icon aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
