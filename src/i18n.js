import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';
import ko from './locales/ko.json';

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

export const resources = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
  de: { translation: de },
  es: { translation: es },
  it: { translation: it },
  pt: { translation: pt },
  ja: { translation: ja },
  zh: { translation: zh },
  ko: { translation: ko }
};

const detectorOptions = {
  order: ['localStorage', 'navigator', 'htmlTag'],
  lookupLocalStorage: 'eg-comp-lang',
  caches: ['localStorage'],
  checkWhitelist: true
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: supportedLanguages.map(l => l.code),
    nonExplicitSupportedLngs: true,
    detection: detectorOptions,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
