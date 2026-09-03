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
            styles: { branding: { brandColor: "#DD2A40" } },
            cssVarsPerTheme: {
              dark: {
                "cal-brand": "#DD2A40",
                "cal-brand-emphasis": "#BA1B30",
                "cal-brand-text": "#FFFFFF",
                "cal-brand-subtle": "#111111",
                "cal-bg-booker": "#000000",
                "cal-bg-muted": "#111111",
                "cal-bg-emphasis": "#22252A",
                "cal-border-booker": "#22252A",
                "cal-border-subtle": "#22252A",
                "cal-border-default": "#2A2E35",
                "cal-text": "#FFFFFF",
                "cal-text-muted": "#E4E7EC",
                "cal-text-emphasis": "#FFFFFF"
              },
              light: {
                "cal-brand": "#DD2A40",
                "cal-brand-emphasis": "#BA1B30",
                "cal-brand-text": "#FFFFFF",
                "cal-brand-subtle": "#F8F9FA",
                "cal-bg-booker": "#FFFFFF",
                "cal-bg-muted": "#FFFFFF",
                "cal-bg-emphasis": "#F8F9FA",
                "cal-border-booker": "#E4E7EC",
                "cal-border-subtle": "#E4E7EC",
                "cal-border-default": "#E4E7EC",
                "cal-text": "#DD2A40",
                "cal-text-muted": "#DD2A40",
                "cal-text-emphasis": "#DD2A40"
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
