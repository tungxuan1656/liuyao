import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, House, Settings2 } from 'lucide-react';
import { ROUTES } from '../route-paths';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';

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
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

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
    <>
      <header className="border-b bg-background">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-2 md:hidden">
            {mobileParent ? (
              <Link
                to={mobileParent}
                className="inline-flex size-11 shrink-0 items-center justify-center text-foreground"
                aria-label={
                  mobileParent === ROUTES.library ? 'Quay lại thư viện' : 'Quay lại trang gieo quẻ'
                }
              >
                <ArrowLeft aria-hidden="true" />
              </Link>
            ) : (
              <span className="font-serif text-2xl" aria-hidden="true">
                ☯
              </span>
            )}
            <span className="truncate font-serif text-lg font-semibold">{mobileTitle}</span>
          </div>

          <Link
            to={ROUTES.home}
            className="hidden items-center gap-2 text-foreground no-underline md:inline-flex"
            aria-label="Trang chủ Lục Hào"
          >
            <span className="font-serif text-2xl" aria-hidden="true">
              ☯
            </span>
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

          <Badge
            variant="secondary"
            role="status"
            aria-label={online ? 'Đang kết nối' : 'Ngoại tuyến'}
          >
            {online ? 'Có mạng' : 'Ngoại tuyến'}
          </Badge>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Các trang chính"
      >
        <div className="grid grid-cols-3">
          {destinations.map(({ label, path, icon: Icon }) => {
            const current = isCurrentDestination(pathname, path);
            return (
              <Link
                key={path}
                to={path}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                  current ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                <Icon aria-hidden="true" className="size-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
