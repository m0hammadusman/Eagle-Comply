import React, { createContext, useContext, useState } from 'react';
import {
  solutions as defaultSolutions,
  industries as defaultIndustries,
  countries as defaultCountries,
  regulations as defaultRegulations,
  experts as defaultExperts,
  caseStudies as defaultCaseStudies,
  insights as defaultInsights,
  resources as defaultResources
} from '../data/complianceData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [solutions, setSolutions] = useState(defaultSolutions);
  const [industries, setIndustries] = useState(defaultIndustries);
  const [countries, setCountries] = useState(defaultCountries);
  const [regulations, setRegulations] = useState(defaultRegulations);
  const [experts, setExperts] = useState(defaultExperts);
  const [caseStudies, setCaseStudies] = useState(defaultCaseStudies);
  const [insights, setInsights] = useState(defaultInsights);
  const [resources, setResources] = useState(defaultResources);
  const [consultations, setConsultations] = useState([]);

  // Experience & 3D Settings Engine
  const [experienceConfig, setExperienceConfig] = useState({
    latticeNodes: 65,
    connectionDistance: 130,
    motionSpeed: 1.0,
    enable3DShaders: true,
    videoHeroLoop: 'lattice-loop',
    highPerformanceMode: true
  });

  // Actions
  const bookConsultation = (booking) => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const newBooking = {
      id: 'APT-' + randomId,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...booking
    };
    setConsultations(prev => [newBooking, ...prev]);
    return newBooking;
  };

  return (
    <DataContext.Provider value={{
      solutions, setSolutions,
      industries, setIndustries,
      countries, setCountries,
      regulations, setRegulations,
      experts, setExperts,
      caseStudies, setCaseStudies,
      insights, setInsights,
      resources, setResources,
      consultations, bookConsultation,
      experienceConfig, setExperienceConfig
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

