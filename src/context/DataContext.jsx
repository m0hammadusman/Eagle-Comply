import React, { createContext, useContext, useState } from 'react';
import {
  solutions as defaultSolutions,
  industries as defaultIndustries,
  countries as defaultCountries,
  regulations as defaultRegulations,
  experts as defaultExperts,
  caseStudies as defaultCaseStudies,
  insights as defaultInsights,
  resources as defaultResources,
  initialProjects,
  initialDocuments,
  initialAppointments,
  initialInvoices
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

  // Workflow / Leads / Submissions state
  const [consultations, setConsultations] = useState(initialAppointments);
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState(initialProjects);
  const [documents, setDocuments] = useState(initialDocuments);
  const [invoices, setInvoices] = useState(initialInvoices);

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

  const requestQuote = (quoteData) => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const newQuote = {
      id: 'QT-2026-' + randomId,
      status: 'Under Review',
      submittedAt: new Date().toISOString().split('T')[0],
      ...quoteData
    };
    setQuotes(prev => [newQuote, ...prev]);
    return newQuote;
  };

  const addDocument = (docData) => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const randomHash = Math.random().toString(36).substring(2);
    const newDoc = {
      id: 'DOC-' + randomId,
      uploadDate: new Date().toISOString().split('T')[0],
      version: '1.0',
      status: 'Uploaded',
      encryptionHash: 'sha256-' + randomHash + 'e3b0c44298fc',
      verified: true,
      ...docData
    };
    setDocuments(prev => [newDoc, ...prev]);
    return newDoc;
  };

  const updateMilestone = (projectId, milestoneId, newStatus) => {
    setProjects(prev => prev.map(prj => {
      if (prj.id !== projectId) return prj;
      const updatedMilestones = prj.milestones.map(m => m.id === milestoneId ? { ...m, status: newStatus } : m);
      const completedCount = updatedMilestones.filter(m => m.status === 'Completed').length;
      const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
      return {
        ...prj,
        milestones: updatedMilestones,
        progress: newProgress
      };
    }));
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
      quotes, requestQuote,
      projects, updateMilestone,
      documents, addDocument,
      invoices, setInvoices,
      experienceConfig, setExperienceConfig
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
