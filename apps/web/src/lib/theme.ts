// Theme application lives here. index.html repeats the dark-class bootstrap
// before first paint so a saved dark theme never flashes light.

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'liuyao-theme';
const THEME_COLORS: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#151b1e',
};

export function getStoredTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

export function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable; the theme still applies to this session.
  }
  applyTheme(theme);
}

export function initTheme(): void {
  applyTheme(getStoredTheme());
}
