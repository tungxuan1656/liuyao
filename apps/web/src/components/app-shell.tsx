import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './navigation';
import './route-layout.css';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { pathname, hash } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Path changes intentionally reset scroll; anchored content owns its target scroll.
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div data-app-shell className="flex min-h-dvh flex-col bg-muted/30">
      <Navigation />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export default AppShell;
