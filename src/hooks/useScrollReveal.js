import { useEffect } from 'react';

export default function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // 1. Auto-tagging system: Find elements and assign reveal classes if they don't have them
    const main = document.querySelector('main');
    if (!main) return;

    // Helper to check if element or its parent already has a reveal class or should be excluded
    const isExcluded = (el) => {
      return el.closest('.no-reveal') || 
             (typeof el.className === 'string' && el.className.includes('reveal-')) ||
             el.closest('header') || 
             el.closest('footer') ||
             el.closest('.animate-marquee-seamless'); // don't mess with marquees
    };

    // --- Typography ---
    main.querySelectorAll('h1, h2, h3, h4').forEach(el => {
      if (!isExcluded(el)) {
        el.classList.add('reveal-up', 'reveal-base');
      }
    });

    main.querySelectorAll('p, li').forEach(el => {
      if (!isExcluded(el)) {
        el.classList.add('reveal-up', 'reveal-base');
        if (!el.style.transitionDelay) el.style.transitionDelay = '100ms';
      }
    });

    // --- Layout Columns (Left/Right) ---
    main.querySelectorAll('.grid').forEach(grid => {
      if (grid.classList.contains('lg:grid-cols-12') || grid.classList.contains('md:grid-cols-2') || grid.classList.contains('lg:grid-cols-2')) {
        const children = Array.from(grid.children);
        if (children.length >= 2) {
          if (!isExcluded(children[0])) {
            children[0].classList.add('reveal-left', 'reveal-base');
          }
          if (!isExcluded(children[children.length - 1])) {
            children[children.length - 1].classList.add('reveal-right', 'reveal-base');
          }
        }
      }
    });

    // --- Cards & Images (Scale + Stagger) ---
    main.querySelectorAll('.grid > div, img, .glass-panel, .bg-surface-raised, .bg-surface-subtle').forEach((el, i) => {
      if (!isExcluded(el) && !el.classList.contains('lg:col-span-12')) {
        el.classList.add('reveal-scale', 'reveal-base');
        
        // Contextual stagger based on sibling index
        const parent = el.parentElement;
        if (parent) {
           const siblings = Array.from(parent.children);
           const index = siblings.indexOf(el);
           if (index > 0) {
             const delay = Math.min(index * 150, 750); // Max delay 750ms
             if (!el.style.transitionDelay) el.style.transitionDelay = `${delay}ms`;
           }
        }
      }
    });
    
    // --- Buttons ---
    main.querySelectorAll('button:not(.nav-button)').forEach(el => {
       if (!isExcluded(el)) {
         el.classList.add('reveal-up', 'reveal-base');
         if (!el.style.transitionDelay) el.style.transitionDelay = '150ms';
       }
    });

    // 2. Intersection Observer setup
    const revealElements = main.querySelectorAll('.reveal-base');
    
    // Use IntersectionObserver to trigger animations when elements enter viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a small requestAnimationFrame to ensure CSS applies properly
          requestAnimationFrame(() => {
            entry.target.classList.add('is-revealed');
          });
          observer.unobserve(entry.target); 
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05
    });

    // Give DOM a tiny bit to settle before observing to prevent flash
    setTimeout(() => {
      revealElements.forEach(el => observer.observe(el));
    }, 50);

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, dependencies);
}
