import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../types/story';

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

const THEME_STORAGE_KEY = 'storyverse_theme_v1';
const MOTION_STORAGE_KEY = 'storyverse_reduced_motion_v1';

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  reducedMotion: false,
  setReducedMotion: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
    }
    return 'dark';
  });

  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MOTION_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    try {
      localStorage.setItem(MOTION_STORAGE_KEY, String(reducedMotion));
    } catch {
      // ignore
    }
  }, [reducedMotion]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: setThemeState,
        reducedMotion,
        setReducedMotion: setReducedMotionState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
