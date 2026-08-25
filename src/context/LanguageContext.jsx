import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, { supportedLanguages, resources } from '../i18n';
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

export { supportedLanguages };

export function LanguageProvider({ children }) {
  const { t: translateFn } = useTranslation();
  
  // Normalize language code to 2-letter (e.g. 'en-US' -> 'en', 'ar-AE' -> 'ar')
  const normalizeLang = (code) => {
    if (!code) return 'en';
    const clean = code.split('-')[0].toLowerCase();
    return supportedLanguages.some(l => l.code === clean) ? clean : 'en';
  };

  const [lang, setLangState] = useState(() => normalizeLang(i18n.language || localStorage.getItem('eg-comp-lang') || 'en'));

  const setLanguage = (newLang) => {
    const valid = normalizeLang(newLang);
    setLangState(valid);
    i18n.changeLanguage(valid);
    localStorage.setItem('eg-comp-lang', valid);
  };

  useEffect(() => {
    const handleLangChange = (lng) => {
      const valid = normalizeLang(lng);
      setLangState(valid);
      const curr = supportedLanguages.find(l => l.code === valid) || supportedLanguages[0];
      document.documentElement.dir = curr.dir;
      document.documentElement.lang = valid;
    };

    i18n.on('languageChanged', handleLangChange);
    handleLangChange(i18n.language || lang);

    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);

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

  // Provide complete translation dictionary with fallback
  const t = useMemo(() => {
    const currentBundle = resources[lang]?.translation || {};
    const fallbackBundle = resources.en?.translation || {};
    return mergeTranslations(fallbackBundle, currentBundle);
  }, [lang]);

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
  const resourcesData = useMemo(() => getLocalizedResources(lang), [lang]);
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
      setLanguage,
      t,
      translateFn,
      i18n,
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
      resources: resourcesData,
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

