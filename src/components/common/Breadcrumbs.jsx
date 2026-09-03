import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Breadcrumbs({ items = [], onNavigate }) {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#7D797A] dark:text-[#7D797A] py-3" aria-label="Breadcrumb">
      <button
        onClick={() => onNavigate && onNavigate('home')}
        className="hover:text-[#E31F1F] dark:hover:text-[#FF3333] flex items-center gap-1 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>{t.nav?.home || 'Home'}</span>
      </button>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-[#7D797A] rtl:rotate-180" />
          {idx === items.length - 1 || !item.route ? (
            <span className="font-semibold text-black dark:text-white dark:text-white">
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => onNavigate && onNavigate(item.route, item.params)}
              className="hover:text-[#E31F1F] dark:hover:text-[#FF3333] transition-colors"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
