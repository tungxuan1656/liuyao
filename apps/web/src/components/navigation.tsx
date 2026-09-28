import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../route-paths';

const destinations = [
  { label: 'Gieo quẻ', path: ROUTES.home, icon: '⌂' },
  { label: 'Thư viện', path: ROUTES.library, icon: '▤' },
  { label: 'Cài đặt', path: ROUTES.settings, icon: '⚙' },
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
    <nav className="app-navigation" aria-label="Điều hướng chính">
      <Link className="app-brand" to={ROUTES.home} aria-label="Trang chủ Lục Hào">
        <span className="app-brand-mark" aria-hidden="true">
          <span aria-hidden="true">☯</span>
        </span>
        <span>Lục Hào</span>
      </Link>
      <div className="app-navigation-links">
        {destinations.map(({ label, path, icon }) => {
          const current = isCurrentDestination(pathname, path);
          return (
            <Link
              className={`app-navigation-link${current ? ' is-current' : ''}`}
              to={path}
              key={label}
              aria-current={current ? 'page' : undefined}
            >
              <span className="app-navigation-icon" aria-hidden="true">
                {icon}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <span className={`app-network-status${online ? ' is-online' : ' is-offline'}`} role="status">
        <span className="app-network-indicator" aria-hidden="true" />
        {online ? 'Có mạng' : 'Ngoại tuyến'}
      </span>
    </nav>
  );
}
