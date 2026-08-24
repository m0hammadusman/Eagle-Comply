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
            styles: { branding: { brandColor: "#334DAF" } },
            cssVarsPerTheme: {
              dark: {
                "cal-brand": "#334DAF",
                "cal-brand-emphasis": "#253982",
                "cal-brand-text": "#FFFFFF",
                "cal-brand-subtle": "#16295C",
                "cal-bg-booker": "#101E42",
                "cal-bg-muted": "#16295C",
                "cal-bg-emphasis": "#1E3778",
                "cal-border-booker": "#1E3778",
                "cal-border-subtle": "#1E3778",
                "cal-border-default": "#2B4E9E",
                "cal-text": "#FFFFFF",
                "cal-text-muted": "#D0E4FE",
                "cal-text-emphasis": "#F9FBFF"
              },
              light: {
                "cal-brand": "#334DAF",
                "cal-brand-emphasis": "#253982",
                "cal-brand-text": "#FFFFFF",
                "cal-brand-subtle": "#E8F2FE",
                "cal-bg-booker": "#FFFFFF",
                "cal-bg-muted": "#F9FBFF",
                "cal-bg-emphasis": "#E8F2FE",
                "cal-border-booker": "#D0E4FE",
                "cal-border-subtle": "#D0E4FE",
                "cal-border-default": "#D0E4FE",
                "cal-text": "#091F5C",
                "cal-text-muted": "#334DAF",
                "cal-text-emphasis": "#091F5C"
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
