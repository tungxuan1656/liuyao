export const ROUTES = {
  home: '/',
  library: '/library',
  libraryTopic: (id: string) => `/library/topic/${encodeURIComponent(id)}`,
  settings: '/settings',
  productInformation: '/settings/about',
  casting: '/casting',
  result: '/result',
  libraryDetail: (entityType: string, id: string) =>
    `/library/${encodeURIComponent(entityType)}/${encodeURIComponent(id)}`,
} as const;
