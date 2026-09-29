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
    <div className="flex flex-col min-h-dvh">
      {!isFocused && <Navigation />}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export default AppShell;
