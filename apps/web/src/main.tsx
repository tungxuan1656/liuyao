import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { initPwaInstall } from './lib/pwa-install';
import { initPwaUpdate } from './lib/pwa-update';
import { initTheme } from './lib/theme';
import { router } from './routes';

initPwaUpdate();
initPwaInstall();
initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
