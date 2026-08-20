import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import translationsData from './translations.json';
import {
  getLocalizedSolutions,
  getLocalizedIndustries,
  getLocalizedCountries,
  getLocalizedRegulations,
  getLocalizedExperts,
  getLocalizedCaseStudies,
  getLocalizedInsights,
  getLocalizedResources,
  getLocalizedCareers,
  getLocalizedPillars,
  getLocalizedBadges,
  getLocalizedRadar,
  getLocalizedMilestones,
  getLocalizedOffices,
  getLocalizedDetailCommon,
  getLocalizedModals
} from '../data/localizedData';

const LanguageContext = createContext();

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', badge: 'GB', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', badge: 'AE', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', badge: 'FR', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', badge: 'DE', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', badge: 'ES', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', badge: 'IT', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', badge: 'PT', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', badge: 'JP', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', badge: 'CN', dir: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', badge: 'KR', dir: 'ltr' }
];

export const translations = translationsData;

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('eg-comp-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('eg-comp-lang', lang);
    const curr = supportedLanguages.find(l => l.code === lang) || supportedLanguages[0];
    document.documentElement.dir = curr.dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const mergeTranslations = (base, override) => {
    if (Array.isArray(base)) return Array.isArray(override) ? override : base;
    if (base && typeof base === 'object') {
      const result = { ...base };
      Object.keys(override || {}).forEach((key) => {
        result[key] = mergeTranslations(base[key], override[key]);
      });
      return result;
    }
    return override ?? base;
  };

  // Always keep the translation tree complete. This prevents a language switch
  // from crashing a shared component when a newly added key is missing.
  const t = useMemo(() => mergeTranslations(translations.en, translations[lang] || {}), [lang]);
  const isRtl = lang === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';

  // Localized Datasets
  const solutions = useMemo(() => getLocalizedSolutions(lang), [lang]);
  const industries = useMemo(() => getLocalizedIndustries(lang), [lang]);
  const countries = useMemo(() => getLocalizedCountries(lang), [lang]);
  const regulations = useMemo(() => getLocalizedRegulations(lang), [lang]);
  const experts = useMemo(() => getLocalizedExperts(lang), [lang]);
  const caseStudies = useMemo(() => getLocalizedCaseStudies(lang), [lang]);
  const insights = useMemo(() => getLocalizedInsights(lang), [lang]);
  const resources = useMemo(() => getLocalizedResources(lang), [lang]);
  const careers = useMemo(() => getLocalizedCareers(lang), [lang]);
  const corePillars = useMemo(() => getLocalizedPillars(lang), [lang]);
  const badges = useMemo(() => getLocalizedBadges(lang), [lang]);
  const radar = useMemo(() => getLocalizedRadar(lang), [lang]);
  const milestones = useMemo(() => getLocalizedMilestones(lang), [lang]);
  const offices = useMemo(() => getLocalizedOffices(lang), [lang]);
  const detailCommon = useMemo(() => getLocalizedDetailCommon(lang), [lang]);
  const modals = useMemo(() => getLocalizedModals(lang), [lang]);

  return (
    <LanguageContext.Provider value={{
      language: lang,
      setLanguage: setLang,
      t,
      isRtl,
      direction,
      supportedLanguages,
      solutions,
      industries,
      countries,
      regulations,
      experts,
      caseStudies,
      insights,
      resources,
      careers,
      corePillars,
      badges,
      radar,
      milestones,
      offices,
      detailCommon,
      modals
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
