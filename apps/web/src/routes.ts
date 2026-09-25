import { createElement } from 'react';
import { createBrowserRouter, Link, Outlet, useParams } from 'react-router-dom';
import App from './App';
import { AppShell } from './components/app-shell';
import { ROUTES } from './route-paths';

export { ROUTES } from './route-paths';

function RouteShell({ title, libraryDetail = false }: { title: string; libraryDetail?: boolean }) {
  return createElement(
    'main',
    { className: 'mx-auto max-w-3xl space-y-4 p-6' },
    createElement('h1', { className: 'font-serif text-2xl font-semibold' }, title),
    createElement(
      'p',
      { className: 'text-muted-foreground' },
      'This destination is not implemented yet.',
    ),
    libraryDetail
      ? createElement(
          Link,
          {
            className:
              'inline-flex min-h-11 min-w-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            to: ROUTES.library,
          },
          '← Back to Library',
        )
      : createElement(
          Link,
          { className: 'underline underline-offset-4', to: ROUTES.home },
          'Return to home',
        ),
  );
}

function LibraryDetailRoute() {
  const { entityType, id } = useParams();
  return createElement(RouteShell, {
    title: `Library detail: ${entityType ?? ''} / ${id ?? ''}`,
    libraryDetail: true,
  });
}

function RouteLayout() {
  return createElement(AppShell, null, createElement(Outlet));
}

export const router = createBrowserRouter([
  {
    element: createElement(RouteLayout),
    children: [
      { path: ROUTES.home, element: createElement(App) },
      { path: ROUTES.library, element: createElement(RouteShell, { title: 'Library' }) },
      { path: ROUTES.settings, element: createElement(RouteShell, { title: 'Settings' }) },
      { path: ROUTES.casting, element: createElement(RouteShell, { title: 'Casting' }) },
      { path: '/library/:entityType/:id', element: createElement(LibraryDetailRoute) },
    ],
  },
]);
