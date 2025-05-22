import { toast } from "@/hooks/use-toast";

// Types for different content sections
export interface Skill {
  id: string;
  category: string;
  name: string;
  level: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ContactInfo {
  type: string;
  value: string;
}

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export interface HeroContent {
  name: string;
  jobTitle: string;
  description: string;
  profileImage: string;
}

export interface AboutContent {
  description: string;
}

export interface ResumeContent {
  url: string;
  displayText: string;
  fileName: string;
}

// Local storage keys
const SKILLS_KEY = "website_skills";
const TIMELINE_KEY = "website_timeline";
const PROJECTS_KEY = "website_projects";
const CERTIFICATIONS_KEY = "website_certifications";
const HERO_KEY = "website_hero";
const ABOUT_KEY = "website_about";
const RESUME_KEY = "website_resume";
const CONTACT_KEY = "website_contact";
const EMAIL_CONFIG_KEY = "website_email_config";

// Default values
export const defaultHeroContent: HeroContent = {
  name: "Aman Kumar Thakur",
  jobTitle: "B.Tech CSE Student & AI/ML Developer",
  description: "Building futuristic solutions with AI, ML, and modern web technologies",
  profileImage: "https://via.placeholder.com/400x400/1A1F2C/FFFFFF?text=AK",
};

export const defaultAboutContent: AboutContent = {
  description: "I'm a B.Tech CSE student specializing in AI and Machine Learning, passionate about creating intelligent systems that solve real-world problems.",
};

export const defaultSkills: Skill[] = [
  { id: "1", category: "Programming Languages", name: "Python", level: 95 },
  { id: "2", category: "Machine Learning", name: "TensorFlow", level: 90 },
];

export const defaultTimeline: TimelineItem[] = [
  { 
    id: "1", 
    year: "2023 - Present", 
    title: "B.Tech in Computer Science", 
    description: "Pursuing degree with specialization in AI and ML" 
  },
];

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "AI Image Generator",
    description: "A deep learning model that generates high-resolution images from text descriptions",
    image: "https://via.placeholder.com/500x300/1A1F2C/FFFFFF?text=AI+Image+Generator",
    tags: ["Python", "PyTorch", "React"],
    github: "https://github.com/ThakurAmanKumar",
    demo: "#"
  },
  {
    id: "2",
    title: "Predictive Analytics Dashboard",
    description: "Interactive dashboard that visualizes data trends and makes predictions",
    image: "https://via.placeholder.com/500x300/1A1F2C/FFFFFF?text=Analytics+Dashboard",
    tags: ["TypeScript", "React", "D3.js"],
    github: "https://github.com/ThakurAmanKumar",
    demo: "#"
  }
];

export const defaultCertifications: Certification[] = [
  {
    id: "1",
    title: "Deep Learning Specialization",
    issuer: "Coursera - DeepLearning.AI",
    date: "March 2023",
    link: "https://github.com/ThakurAmanKumar"
  },
  {
    id: "2",
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "January 2023",
    link: "https://github.com/ThakurAmanKumar"
  }
];

export const defaultResumeContent: ResumeContent = {
  url: "https://amankumarthakur.com.np/Resume_AmanKumarThakur.pdf",
  displayText: "Check out my detailed resume to learn more about my education, skills, experience, and achievements.",
  fileName: "Resume_AmanKumarThakur.pdf"
};

export const defaultContactInfo: ContactInfo[] = [
  { type: "Email", value: "contact@amankumarthakur.com" },
  { type: "GitHub", value: "https://github.com/ThakurAmanKumar" },
  { type: "LinkedIn", value: "https://linkedin.com/in/amankumarthakur" }
];

export const defaultEmailConfig: EmailConfig = {
  serviceId: 'service_6r6avmc',
  templateId: 'template_ypkhjk6',
  publicKey: 'JhX_UZgTWQtz7medU'
};

// Helper function to generate random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Generic function to save data to localStorage
const saveData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} data:`, error);
    toast({
      title: "Error",
      description: `Failed to save data. Please try again.`,
      variant: "destructive"
    });
  }
};

// Generic function to load data from localStorage
const loadData = <T>(key: string, defaultData: T): T => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultData;
  } catch (error) {
    console.error(`Error loading ${key} data:`, error);
    toast({
      title: "Error",
      description: `Failed to load data. Using default values.`,
      variant: "destructive"
    });
    return defaultData;
  }
};

// Skills management
export const getSkills = (): Skill[] => {
  return loadData<Skill[]>(SKILLS_KEY, defaultSkills);
};

export const saveSkills = (skills: Skill[]): void => {
  saveData(SKILLS_KEY, skills);
};

export const addSkill = (skill: Omit<Skill, "id">): Skill => {
  const skills = getSkills();
  const newSkill = { ...skill, id: generateId() };
  skills.push(newSkill);
  saveSkills(skills);
  return newSkill;
};

export const updateSkill = (skill: Skill): boolean => {
  const skills = getSkills();
  const index = skills.findIndex(s => s.id === skill.id);
  if (index !== -1) {
    skills[index] = skill;
    saveSkills(skills);
    return true;
  }
  return false;
};

export const deleteSkill = (id: string): boolean => {
  const skills = getSkills();
  const filteredSkills = skills.filter(s => s.id !== id);
  if (filteredSkills.length !== skills.length) {
    saveSkills(filteredSkills);
    return true;
  }
  return false;
};

// Timeline management
export const getTimeline = (): TimelineItem[] => {
  return loadData<TimelineItem[]>(TIMELINE_KEY, defaultTimeline);
};

export const saveTimeline = (timeline: TimelineItem[]): void => {
  saveData(TIMELINE_KEY, timeline);
};

export const addTimelineItem = (item: Omit<TimelineItem, "id">): TimelineItem => {
  const timeline = getTimeline();
  const newItem = { ...item, id: generateId() };
  timeline.push(newItem);
  saveTimeline(timeline);
  return newItem;
};

export const updateTimelineItem = (item: TimelineItem): boolean => {
  const timeline = getTimeline();
  const index = timeline.findIndex(t => t.id === item.id);
  if (index !== -1) {
    timeline[index] = item;
    saveTimeline(timeline);
    return true;
  }
  return false;
};

export const deleteTimelineItem = (id: string): boolean => {
  const timeline = getTimeline();
  const filteredTimeline = timeline.filter(t => t.id !== id);
  if (filteredTimeline.length !== timeline.length) {
    saveTimeline(filteredTimeline);
    return true;
  }
  return false;
};

// Projects management
export const getProjects = (): Project[] => {
  return loadData<Project[]>(PROJECTS_KEY, defaultProjects);
};

export const saveProjects = (projects: Project[]): void => {
  saveData(PROJECTS_KEY, projects);
};

export const addProject = (project: Omit<Project, "id">): Project => {
  const projects = getProjects();
  const newProject = { ...project, id: generateId() };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

export const updateProject = (project: Project): boolean => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  if (index !== -1) {
    projects[index] = project;
    saveProjects(projects);
    return true;
  }
  return false;
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filteredProjects = projects.filter(p => p.id !== id);
  if (filteredProjects.length !== projects.length) {
    saveProjects(filteredProjects);
    return true;
  }
  return false;
};

// Certifications management
export const getCertifications = (): Certification[] => {
  return loadData<Certification[]>(CERTIFICATIONS_KEY, defaultCertifications);
};

export const saveCertifications = (certifications: Certification[]): void => {
  saveData(CERTIFICATIONS_KEY, certifications);
};

export const addCertification = (certification: Omit<Certification, "id">): Certification => {
  const certifications = getCertifications();
  const newCertification = { ...certification, id: generateId() };
  certifications.push(newCertification);
  saveCertifications(certifications);
  return newCertification;
};

export const updateCertification = (certification: Certification): boolean => {
  const certifications = getCertifications();
  const index = certifications.findIndex(c => c.id === certification.id);
  if (index !== -1) {
    certifications[index] = certification;
    saveCertifications(certifications);
    return true;
  }
  return false;
};

export const deleteCertification = (id: string): boolean => {
  const certifications = getCertifications();
  const filteredCertifications = certifications.filter(c => c.id !== id);
  if (filteredCertifications.length !== certifications.length) {
    saveCertifications(filteredCertifications);
    return true;
  }
  return false;
};

// Hero content management
export const getHeroContent = (): HeroContent => {
  return loadData<HeroContent>(HERO_KEY, defaultHeroContent);
};

export const saveHeroContent = (content: HeroContent): void => {
  saveData(HERO_KEY, content);
};

// About content management
export const getAboutContent = (): AboutContent => {
  return loadData<AboutContent>(ABOUT_KEY, defaultAboutContent);
};

export const saveAboutContent = (content: AboutContent): void => {
  saveData(ABOUT_KEY, content);
};

// Resume content management
export const getResumeContent = (): ResumeContent => {
  return loadData<ResumeContent>(RESUME_KEY, defaultResumeContent);
};

export const saveResumeContent = (content: ResumeContent): void => {
  saveData(RESUME_KEY, content);
};

// Contact info management
export const getContactInfo = (): ContactInfo[] => {
  return loadData<ContactInfo[]>(CONTACT_KEY, defaultContactInfo);
};

export const saveContactInfo = (info: ContactInfo[]): void => {
  saveData(CONTACT_KEY, info);
};

export const addContactInfo = (info: ContactInfo): ContactInfo => {
  const contactInfo = getContactInfo();
  contactInfo.push(info);
  saveContactInfo(contactInfo);
  return info;
};

export const updateContactInfo = (index: number, info: ContactInfo): boolean => {
  const contactInfo = getContactInfo();
  if (index >= 0 && index < contactInfo.length) {
    contactInfo[index] = info;
    saveContactInfo(contactInfo);
    return true;
  }
  return false;
};

export const deleteContactInfo = (index: number): boolean => {
  const contactInfo = getContactInfo();
  if (index >= 0 && index < contactInfo.length) {
    contactInfo.splice(index, 1);
    saveContactInfo(contactInfo);
    return true;
  }
  return false;
};

// Email config management
export const getEmailConfig = (): EmailConfig => {
  const storedConfig = localStorage.getItem('emailConfig');
  if (storedConfig) {
    return JSON.parse(storedConfig);
  }
  
  // Return default values
  return {
    serviceId: 'service_6r6avmc',
    templateId: 'template_ypkhjk6',
    publicKey: 'JhX_UZgTWQtz7medU'
  };
};

export const saveEmailConfig = (config: EmailConfig): void => {
  saveData(EMAIL_CONFIG_KEY, config);
};
