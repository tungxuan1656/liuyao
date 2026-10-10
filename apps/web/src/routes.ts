import { createElement } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import { CastingFlow } from './casting-flow';
import { AppShell } from './components/app-shell';
import { PwaUpdateBanner } from './components/pwa-update-banner';
import { LibraryDetailPage, LibraryPage } from './library';
import { ReadingSessionProvider } from './reading-session';
import { ResultView } from './result-view';
import { ROUTES } from './route-paths';
import { SettingsPage } from './settings';

export { ROUTES } from './route-paths';

function RouteLayout() {
  return createElement(
    ReadingSessionProvider,
    null,
    createElement(AppShell, null, createElement(PwaUpdateBanner), createElement(Outlet)),
  );
}

export const router = createBrowserRouter([
  {
    element: createElement(RouteLayout),
    children: [
      { path: ROUTES.home, element: createElement(App) },
      { path: ROUTES.library, element: createElement(LibraryPage) },
      { path: ROUTES.settings, element: createElement(SettingsPage) },
      { path: ROUTES.casting, element: createElement(CastingFlow) },
      { path: ROUTES.result, element: createElement(ResultView) },
      { path: '/library/:entityType/:id', element: createElement(LibraryDetailPage) },
    ],
  },
]);
