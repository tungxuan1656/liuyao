export const ROUTES = {
  home: '/',
  library: '/library',
  settings: '/settings',
  casting: '/casting',
  result: '/result',
  libraryDetail: (entityType: string, id: string) =>
    `/library/${encodeURIComponent(entityType)}/${encodeURIComponent(id)}`,
} as const;
