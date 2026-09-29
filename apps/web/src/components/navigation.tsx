import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Settings } from 'lucide-react';
import { ROUTES } from '../route-paths';

const destinations = [
  { label: 'Gieo quẻ', path: ROUTES.home, icon: Home },
  { label: 'Thư viện', path: ROUTES.library, icon: BookOpen },
  { label: 'Cài đặt', path: ROUTES.settings, icon: Settings },
] as const;

function isCurrentDestination(pathname: string, path: string) {
  return path === ROUTES.home
    ? pathname === path
    : pathname === path || pathname.startsWith(`${path}/`);
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

  return (
    <nav
      className="flex items-center justify-between px-5 py-3 border-b border-neutral-100"
      aria-label="Điều hướng chính"
    >
      <Link
        className="flex items-center gap-2 text-sm font-medium text-neutral-900 no-underline"
        to={ROUTES.home}
        aria-label="Trang chủ Lục Hào"
      >
        <span className="font-serif text-base leading-none" aria-hidden="true">
          ☯
        </span>
        <span className="font-serif font-semibold tracking-wide">Lục Hào</span>
      </Link>

      <div className="flex items-center gap-1">
        {destinations.map(({ label, path, icon: Icon }) => {
          const current = isCurrentDestination(pathname, path);
          return (
            <Link
              key={label}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm no-underline transition-colors ${
                current ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              to={path}
              aria-current={current ? 'page' : undefined}
            >
              <Icon size={14} aria-hidden="true" strokeWidth={current ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      <span
        className="flex items-center gap-1.5 text-xs text-neutral-400"
        role="status"
        aria-label={online ? 'Đang kết nối' : 'Ngoại tuyến'}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-neutral-400' : 'bg-neutral-300'}`}
          aria-hidden="true"
        />
        {online ? 'Có mạng' : 'Ngoại tuyến'}
      </span>
    </nav>
  );
}
