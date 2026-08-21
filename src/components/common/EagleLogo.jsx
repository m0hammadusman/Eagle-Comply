import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function EagleLogo({ 
  className = 'h-10 md:h-12 lg:h-14 xl:h-16 w-auto',
  alt = 'Eagle Compliance',
  forceWhite = false
}) {
  const { isDark } = useTheme();

  if (forceWhite) {
    return (
      <div className="relative inline-flex items-center justify-center shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}logo-dark.png`}
          alt={alt}
          className={`${className} object-contain shrink-0`}
        />
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      {/* Light Mode Logo */}
      <img
        src={`${import.meta.env.BASE_URL}logo-light.png`}
        alt={alt}
        className={`${className} object-contain transition-opacity duration-300 block dark:hidden shrink-0`}
      />
      {/* Dark Mode Logo */}
      <img
        src={`${import.meta.env.BASE_URL}logo-dark.png`}
        alt={alt}
        className={`${className} object-contain transition-opacity duration-300 hidden dark:block shrink-0`}
      />
    </div>
  );
}
