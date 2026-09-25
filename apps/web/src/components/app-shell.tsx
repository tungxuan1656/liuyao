import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../route-paths';
import { Navigation } from './navigation';

type AppShellProps = {
  children: ReactNode;
  focused?: boolean;
};

export function AppShell({ children, focused }: AppShellProps) {
  const { pathname } = useLocation();
  const isFocused = focused ?? pathname === ROUTES.casting;

  return (
    <div className={`app-shell${isFocused ? ' app-shell-focused' : ''}`}>
      {!isFocused && <Navigation />}
      <div className="app-shell-content">{children}</div>
    </div>
  );
}

export default AppShell;
