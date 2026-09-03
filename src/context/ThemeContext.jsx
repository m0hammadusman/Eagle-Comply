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

      // Sync Cal.com embed theme dynamically
      if (typeof window !== 'undefined' && window.Cal && window.Cal.ns && window.Cal.ns["strategic-compliance-consultation"]) {
        try {
          window.Cal.ns["strategic-compliance-consultation"]("ui", {
            theme: dark ? "dark" : "light",
            styles: { branding: { brandColor: "#E31F1F" } },
            cssVarsPerTheme: {
              dark: {
                "cal-brand": "#E31F1F",
                "cal-brand-emphasis": "#B42318",
                "cal-brand-text": "#FFFFFF",
                "cal-brand-subtle": "#131313",
                "cal-bg-booker": "#030303",
                "cal-bg-muted": "#131313",
                "cal-bg-emphasis": "#1E1E1E",
                "cal-border-booker": "#1E1E1E",
                "cal-border-subtle": "#1E1E1E",
                "cal-border-default": "#2A2E35",
                "cal-text": "#FFFFFF",
                "cal-text-muted": "#E4E4E4",
                "cal-text-emphasis": "#FFFFFF"
              },
              light: {
                "cal-brand": "#E31F1F",
                "cal-brand-emphasis": "#B42318",
                "cal-brand-text": "#FFFFFF",
                "cal-brand-subtle": "#F5F3F2",
                "cal-bg-booker": "#FFFFFF",
                "cal-bg-muted": "#FFFFFF",
                "cal-bg-emphasis": "#F5F3F2",
                "cal-border-booker": "#E4E4E4",
                "cal-border-subtle": "#E4E4E4",
                "cal-border-default": "#E4E4E4",
                "cal-text": "#E31F1F",
                "cal-text-muted": "#E31F1F",
                "cal-text-emphasis": "#E31F1F"
              }
            },
            hideEventTypeDetails: false,
            layout: "month_view"
          });
        } catch (e) {
          // Cal not yet initialized or ready
        }
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
