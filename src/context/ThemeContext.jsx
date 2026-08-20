import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [setting, setSetting] = useState(() => localStorage.getItem('eg-comp-theme') || 'system');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    localStorage.setItem('eg-comp-theme', setting);
    function applyTheme() {
      let dark = true;
      if (setting === 'light') dark = false;
      else if (setting === 'dark') dark = true;
      else {
        dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      setIsDark(dark);
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    applyTheme();

    if (setting === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener ? mediaQuery.addEventListener('change', listener) : mediaQuery.addListener(listener);
      return () => mediaQuery.removeEventListener ? mediaQuery.removeEventListener('change', listener) : mediaQuery.removeListener(listener);
    }
  }, [setting]);

  return (
    <ThemeContext.Provider value={{ theme: setting, setTheme: setSetting, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
