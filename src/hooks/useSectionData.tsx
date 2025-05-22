
import { useEffect, useState } from 'react';
import {
  getHeroContent,
  getAboutContent,
  getSkills,
  getTimeline,
  getProjects,
  getCertifications,
  getResumeContent,
  getContactInfo,
  getEmailConfig,
  HeroContent,
  AboutContent,
  Skill,
  TimelineItem,
  Project,
  Certification,
  ResumeContent,
  ContactInfo,
  EmailConfig
} from '@/utils/adminUtils';

// Hook for Hero section data
export const useHeroData = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(getHeroContent());
  
  useEffect(() => {
    // This will re-fetch the data when localStorage changes
    const handleStorageChange = () => {
      setHeroContent(getHeroContent());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return heroContent;
};

// Hook for About section data
export const useAboutData = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>(getAboutContent());
  const [skills, setSkills] = useState<Skill[]>(getSkills());
  const [timeline, setTimeline] = useState<TimelineItem[]>(getTimeline());
  
  useEffect(() => {
    // This will re-fetch the data when localStorage changes
    const handleStorageChange = () => {
      setAboutContent(getAboutContent());
      setSkills(getSkills());
      setTimeline(getTimeline());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return { aboutContent, skills, timeline };
};

// Hook for Projects section data
export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  
  useEffect(() => {
    // This will re-fetch the data when localStorage changes
    const handleStorageChange = () => {
      setProjects(getProjects());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return projects;
};

// Hook for Certifications section data
export const useCertificationsData = () => {
  const [certifications, setCertifications] = useState<Certification[]>(getCertifications());
  
  useEffect(() => {
    // This will re-fetch the data when localStorage changes
    const handleStorageChange = () => {
      setCertifications(getCertifications());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return certifications;
};

// Hook for Resume section data
export const useResumeData = () => {
  const [resumeContent, setResumeContent] = useState<ResumeContent>(getResumeContent());
  
  useEffect(() => {
    // This will re-fetch the data when localStorage changes
    const handleStorageChange = () => {
      setResumeContent(getResumeContent());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return resumeContent;
};

// Hook for Contact section data
export const useContactData = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(getContactInfo());
  const [emailConfig, setEmailConfig] = useState<EmailConfig>(getEmailConfig());
  
  useEffect(() => {
    // This will re-fetch the data when localStorage changes
    const handleStorageChange = () => {
      setContactInfo(getContactInfo());
      setEmailConfig(getEmailConfig());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return { contactInfo, emailConfig };
};

// Helper function to trigger storage event for other components
export const refreshSectionData = () => {
  // This will trigger the storage event for all components
  window.dispatchEvent(new Event('storage'));
};
