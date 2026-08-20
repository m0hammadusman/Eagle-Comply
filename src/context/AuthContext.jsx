import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  VISITOR: 'visitor',
  CUSTOMER: 'customer',
  CONSULTANT: 'consultant',
  ADMIN: 'admin'
};

const userProfiles = {
  visitor: null,
  customer: {
    id: 'USR-8821',
    name: 'Alexander Sterling',
    role: 'customer',
    organization: 'Apex Cognitive Systems Inc.',
    title: 'Chief Compliance & Risk Officer',
    email: 'a.sterling@apexcognitive.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tier: 'Enterprise Platinum Tier'
  },
  consultant: {
    id: 'CON-101',
    name: 'Dr. Elena Vance, JD, PhD',
    role: 'consultant',
    organization: 'Eagle Compliance Global Advisory',
    title: 'Managing Director, AI & Emerging Tech Governance',
    email: 'e.vance@eaglecompliance.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    specialisms: ['EU AI Act', 'ISO 42001', 'TLPT']
  },
  admin: {
    id: 'ADM-001',
    name: 'Victoria Hawthorne',
    role: 'admin',
    organization: 'Eagle Compliance Operations & Technology',
    title: 'Principal Compliance Architect & System Administrator',
    email: 'v.hawthorne@eaglecompliance.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    permissions: ['all']
  }
};

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => localStorage.getItem('eg-role') || ROLES.VISITOR);

  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    localStorage.setItem('eg-role', newRole);
  };

  const user = userProfiles[currentRole];

  return (
    <AuthContext.Provider value={{ currentRole, switchRole, user, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
