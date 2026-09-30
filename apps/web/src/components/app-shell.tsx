import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../route-paths';
import { Navigation } from './navigation';
import './route-layout.css';

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
      <div
        className={`flex-1 min-w-0 ${
          isFocused
            ? 'route-casting-container pb-[env(safe-area-inset-bottom)] md:pb-0'
            : 'pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default AppShell;
