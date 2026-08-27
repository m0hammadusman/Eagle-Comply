import { 
  solutions as rawSolutions, 
  industries as rawIndustries, 
  countries as rawCountries, 
  regulations as rawRegulations, 
  insights as rawInsights, 
  resources as rawResources, 
  caseStudies as rawCaseStudies, 
  experts as rawExperts, 
  careers as rawCareers 
} from './complianceData.js';

import localizedJson from './localizedData.json';


function getLangData(lang = 'en') {
  const base = localizedJson[lang] || localizedJson.en || {};
  const enBase = localizedJson.en || {};
  return {
    ...base,
    solutions: { ...(enBase.solutions || {}), ...(base.solutions || {}) },
    industries: { ...(enBase.industries || {}), ...(base.industries || {}) },
    countries: { ...(enBase.countries || {}), ...(base.countries || {}) },
    regulations: { ...(enBase.regulations || {}), ...(base.regulations || {}) },
    caseStudies: { ...(enBase.caseStudies || {}), ...(base.caseStudies || {}) },
    insights: { ...(enBase.insights || {}), ...(base.insights || {}) },
    resources: { ...(enBase.resources || {}), ...(base.resources || {}) },
    careers: { ...(enBase.careers || {}), ...(base.careers || {}) },
    detailCommon: { ...(enBase.detailCommon || {}), ...(base.detailCommon || {}) }
  };
}

export function getLocalizedSolutions(lang = 'en') {
  const dict = getLangData(lang).solutions || {};
  return rawSolutions.map(s => {
    const loc = dict[s.id] || {};
    return {
      ...s,
      name: loc.name || s.name,
      category: loc.category || s.category,
      badge: loc.badge || s.badge,
      shortDesc: loc.shortDesc || s.shortDesc,
      valueProp: loc.valueProp || s.valueProp,
      pricingTier: loc.pricingTier || s.pricingTier,
      timeline: loc.timeline || s.timeline,
      challenges: loc.challenges || s.challenges,
      scope: loc.scope || s.scope,
      deliverables: loc.deliverables || s.deliverables,
      process: loc.process || s.process
    };
  });
}

export function getLocalizedIndustries(lang = 'en') {
  const dict = getLangData(lang).industries || {};
  return rawIndustries.map(ind => {
    const loc = dict[ind.id] || {};
    return {
      ...ind,
      name: loc.name || ind.name,
      heroTag: loc.heroTag || ind.heroTag,
      overview: loc.overview || ind.overview,
      challenges: loc.challenges || ind.challenges,
      deliverables: loc.deliverables || ind.deliverables
    };
  });
}

export function getLocalizedCountries(lang = 'en') {
  const dict = getLangData(lang).countries || {};
  return rawCountries.map(c => {
    const loc = dict[c.id] || {};
    return {
      ...c,
      name: loc.name || c.name,
      region: loc.region || c.region,
      capital: loc.capital || c.capital,
      overview: loc.overview || c.overview,
      status: loc.status || c.status,
      office: loc.office || c.office,
      keySectors: loc.keySectors || c.keySectors
    };
  });
}

export function getLocalizedRegulations(lang = 'en') {
  const dict = getLangData(lang).regulations || {};
  return rawRegulations.map(r => {
    const loc = dict[r.id] || {};
    return {
      ...r,
      name: loc.name || r.name,
      jurisdiction: loc.jurisdiction || r.jurisdiction,
      status: loc.status || r.status,
      shortDesc: loc.shortDesc || r.shortDesc,
      penalties: loc.penalties || r.penalties
    };
  });
}

export function getLocalizedExperts(lang = 'en') {
  const dict = getLangData(lang).experts || {};
  return rawExperts.map(e => {
    const loc = dict[e.id] || {};
    return {
      ...e,
      name: loc.name || e.name,
      title: loc.title || e.title,
      role: loc.role || e.role,
      location: loc.location || e.location,
      bio: loc.bio || e.bio
    };
  });
}

export function getLocalizedCaseStudies(lang = 'en') {
  const dict = getLangData(lang).caseStudies || {};
  return rawCaseStudies.map(cs => {
    const loc = dict[cs.id] || {};
    return {
      ...cs,
      title: loc.title || cs.title,
      client: loc.client || cs.client,
      industryName: loc.industryName || cs.industryName,
      challenge: loc.challenge || cs.challenge,
      solution: loc.solution || cs.solution,
      outcome: loc.outcome || cs.outcome
    };
  });
}

export function getLocalizedInsights(lang = 'en') {
  const dict = getLangData(lang).insights || {};
  return rawInsights.map(ins => {
    const loc = dict[ins.id] || {};
    return {
      ...ins,
      title: loc.title || ins.title,
      category: loc.category || ins.category,
      authorName: loc.authorName || ins.authorName,
      readTime: loc.readTime || ins.readTime,
      excerpt: loc.excerpt || ins.excerpt
    };
  });
}

export function getLocalizedResources(lang = 'en') {
  const dict = getLangData(lang).resources || {};
  return rawResources.map(res => {
    const loc = dict[res.id] || {};
    return {
      ...res,
      title: loc.title || res.title,
      category: loc.category || res.category,
      format: loc.format || res.format,
      description: loc.description || res.description
    };
  });
}

export function getLocalizedCareers(lang = 'en') {
  const dict = getLangData(lang).careers || {};
  return rawCareers.map(car => {
    const loc = dict[car.id] || {};
    return {
      ...car,
      title: loc.title || car.title,
      department: loc.department || car.department,
      location: loc.location || car.location,
      type: loc.type || car.type,
      description: loc.description || car.description
    };
  });
}

export function getLocalizedPillars(lang = 'en') {
  const data = getLangData(lang);
  return data.corePillars || getLangData('en').corePillars || [];
}

export function getLocalizedBadges(lang = 'en') {
  const data = getLangData(lang);
  return data.badges || getLangData('en').badges || [];
}

export function getLocalizedRadar(lang = 'en') {
  const data = getLangData(lang);
  return data.radar || getLangData('en').radar || {};
}

export function getLocalizedMilestones(lang = 'en') {
  const data = getLangData(lang);
  return data.milestones || getLangData('en').milestones || [];
}

export function getLocalizedOffices(lang = 'en') {
  const data = getLangData(lang);
  return data.offices || getLangData('en').offices || [];
}

export function getLocalizedDetailCommon(lang = 'en') {
  const data = getLangData(lang);
  return data.detailCommon || getLangData('en').detailCommon || {};
}

export function getLocalizedModals(lang = 'en') {
  const data = getLangData(lang);
  return data.modals || getLangData('en').modals || {};
}
