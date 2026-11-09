/**
 * Theme manager for Light and Dark modes
 */

export type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'fatish_theme_mode';

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Respect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    console.error('Failed to read theme preference', e);
  }
  return 'light';
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
    window.dispatchEvent(new CustomEvent('fatish-theme-changed', { detail: { theme } }));
  } catch (e) {
    console.error('Failed to persist theme preference', e);
  }
}
