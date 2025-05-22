import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User, Edit, Plus, Trash2, LogOut, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAdminContext } from '@/contexts/AdminContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Import admin utils
import {
  getSkills,
  getTimeline,
  getProjects,
  getCertifications,
  deleteSkill,
  deleteTimelineItem,
  deleteProject,
  deleteCertification,
  Skill,
  TimelineItem,
  Project,
  Certification
} from '@/utils/adminUtils';

// Import admin edit modals
import EditHeroModal from './admin/EditHeroModal';
import EditAboutModal from './admin/EditAboutModal';
import EditSkillModal from './admin/EditSkillModal';
import EditTimelineModal from './admin/EditTimelineModal';
import EditProjectModal from './admin/EditProjectModal';
import EditCertificationModal from './admin/EditCertificationModal';
import EditResumeModal from './admin/EditResumeModal';
import EditContactModal from './admin/EditContactModal';
import { refreshSectionData } from '@/hooks/useSectionData';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, adminEmail, logout, login, updateCredentials } = useAdminContext();
  
  // State for data management
  const [skills, setSkills] = useState<Skill[]>(getSkills());
  const [timeline, setTimeline] = useState<TimelineItem[]>(getTimeline());
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [certifications, setCertifications] = useState<Certification[]>(getCertifications());

  // State for settings
  const [showSettings, setShowSettings] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for modals
  const [editHeroOpen, setEditHeroOpen] = useState(false);
  const [editAboutOpen, setEditAboutOpen] = useState(false);
  const [editSkillOpen, setEditSkillOpen] = useState(false);
  const [editTimelineOpen, setEditTimelineOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editCertOpen, setEditCertOpen] = useState(false);
  const [editResumeOpen, setEditResumeOpen] = useState(false);
  const [editContactOpen, setEditContactOpen] = useState(false);
  
  // State for selected items to edit
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem | undefined>();
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [selectedCert, setSelectedCert] = useState<Certification | undefined>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be verified against a database
      // For now, we'll use hardcoded credentials as requested
      const storedEmail = localStorage.getItem('adminEmail') || 'akt@aktnp11';
      const storedPassword = localStorage.getItem('adminPassword') || 'rajan#aktnp';
      
      if (email === storedEmail && password === storedPassword) {
        login(email);
        toast({
          title: "Success",
          description: "Admin login successful"
        });
        setEmail('');
        setPassword('');
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Success",
      description: "Logged out successfully"
    });
    onClose();
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    if (newEmail && newPassword) {
      updateCredentials(newEmail, newPassword);
      toast({
        title: "Success",
        description: "Admin credentials updated successfully"
      });
      setNewEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setShowSettings(false);
    } else {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive"
      });
    }
  };

  const refreshData = () => {
    setSkills(getSkills());
    setTimeline(getTimeline());
    setProjects(getProjects());
    setCertifications(getCertifications());
    refreshSectionData();
  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setEditSkillOpen(true);
  };

  const handleDeleteSkill = (id: string) => {
    if (deleteSkill(id)) {
      toast({
        title: "Success",
        description: "Skill deleted successfully"
      });
      refreshData();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive"
      });
    }
  };

  const handleEditTimelineItem = (item: TimelineItem) => {
    setSelectedTimeline(item);
    setEditTimelineOpen(true);
  };

  const handleDeleteTimelineItem = (id: string) => {
    if (deleteTimelineItem(id)) {
      toast({
        title: "Success",
        description: "Timeline item deleted successfully"
      });
      refreshData();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete timeline item",
        variant: "destructive"
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setEditProjectOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    if (deleteProject(id)) {
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
      refreshData();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  const handleEditCertification = (cert: Certification) => {
    setSelectedCert(cert);
    setEditCertOpen(true);
  };

  const handleDeleteCertification = (id: string) => {
    if (deleteCertification(id)) {
      toast({
        title: "Success",
        description: "Certification deleted successfully"
      });
      refreshData();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete certification",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={isAuthenticated ? "sm:max-w-4xl max-h-[90vh] overflow-y-auto" : "sm:max-w-md"}>
          {!isAuthenticated ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Admin Login
                </DialogTitle>
                <DialogDescription>
                  Secure access for site administrators only
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleLogin} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="admin@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <DialogFooter className="sm:justify-end">
                  <Button 
                    variant="secondary" 
                    onClick={onClose} 
                    type="button"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" /> Admin Dashboard
                  </DialogTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Logged in as: <span className="font-medium text-foreground">{adminEmail}</span>
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
                <DialogDescription>
                  Manage your website content
                </DialogDescription>
              </DialogHeader>

              {showSettings ? (
                <div className="bg-card rounded-lg border p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
                  <form onSubmit={handleUpdateCredentials} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">New Email</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newEmail"
                          placeholder="New admin email"
                          className="pl-10"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="New password"
                          className="pl-10"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          className="pl-10"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button 
                        variant="secondary" 
                        type="button" 
                        onClick={() => setShowSettings(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Update Credentials
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <Tabs defaultValue="home" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>
                  
                  {/* Home Section */}
                  <TabsContent value="home">
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Home Section</h2>
                        <Button size="sm" onClick={() => setEditHeroOpen(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Content
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h3 className="font-medium">Profile Image</h3>
                            <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center relative">
                              <img 
                                src="https://via.placeholder.com/400x400/1A1F2C/FFFFFF?text=AK" 
                                alt="Profile" 
                                className="h-full w-full object-cover rounded-full"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-medium">Hero Content</h3>
                            <div className="bg-muted/40 rounded p-3">
                              <p className="text-sm font-medium">Name: Aman Kumar Thakur</p>
                              <p className="text-sm">Job Title: B.Tech CSE Student & AI/ML Developer</p>
                              <p className="text-sm">Description: Building futuristic solutions with AI, ML, and modern web technologies</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* About Section */}
                  <TabsContent value="about">
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">About Section</h2>
                        <Button size="sm" onClick={() => setEditAboutOpen(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Content
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-muted/40 rounded p-3">
                          <h3 className="font-medium mb-2">About Me Content</h3>
                          <p className="text-sm">I'm a B.Tech CSE student specializing in AI and Machine Learning, passionate about creating intelligent systems that solve real-world problems.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Skills</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Skill</TableHead>
                                <TableHead>Level (%)</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {skills.map((skill) => (
                                <TableRow key={skill.id}>
                                  <TableCell>{skill.category}</TableCell>
                                  <TableCell>{skill.name}</TableCell>
                                  <TableCell>{skill.level}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button variant="ghost" size="icon" onClick={() => handleEditSkill(skill)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(skill.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={() => {
                              setSelectedSkill(undefined);
                              setEditSkillOpen(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Skill
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Timeline</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {timeline.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.year}</TableCell>
                                  <TableCell>{item.title}</TableCell>
                                  <TableCell>{item.description}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button variant="ghost" size="icon" onClick={() => handleEditTimelineItem(item)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTimelineItem(item.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={() => {
                              setSelectedTimeline(undefined);
                              setEditTimelineOpen(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Timeline Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Projects Section */}
                  <TabsContent value="projects">
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Projects</h2>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedProject(undefined);
                            setEditProjectOpen(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </div>
                      
                      <Table>
                        <TableCaption>List of all projects</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell>{project.title}</TableCell>
                              <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                              <TableCell>{project.tags.join(', ')}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* Certifications Section */}
                  <TabsContent value="certifications">
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Certifications</h2>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedCert(undefined);
                            setEditCertOpen(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Certification
                        </Button>
                      </div>
                      
                      <Table>
                        <TableCaption>List of all certifications</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Issuer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {certifications.map((cert) => (
                            <TableRow key={cert.id}>
                              <TableCell>{cert.title}</TableCell>
                              <TableCell>{cert.issuer}</TableCell>
                              <TableCell>{cert.date}</TableCell>
                              <TableCell className="max-w-xs truncate">{cert.link}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleEditCertification(cert)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCertification(cert.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* Resume Section */}
                  <TabsContent value="resume">
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Resume</h2>
                        <Button size="sm" onClick={() => setEditResumeOpen(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Resume
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-muted/40 rounded p-4">
                          <h3 className="font-medium mb-2">Resume URL</h3>
                          <p className="text-sm break-all">https://amankumarthakur.com.np/Resume_AmanKumarThakur.pdf</p>
                        </div>
                        
                        <div className="bg-muted/40 rounded p-4">
                          <h3 className="font-medium mb-2">Resume Display Text</h3>
                          <p className="text-sm">Check out my detailed resume to learn more about my education, skills, experience, and achievements.</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Current Resume File</h3>
                          <div className="flex items-center p-2 bg-muted/30 rounded">
                            <span className="text-sm">Resume_AmanKumarThakur.pdf</span>
                            <Button variant="ghost" size="sm" className="ml-2">View</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Contact Section */}
                  <TabsContent value="contact">
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Contact Information</h2>
                        <Button size="sm" onClick={() => setEditContactOpen(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Contact Info
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Contact Type</TableHead>
                              <TableHead>Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Email</TableCell>
                              <TableCell>contact@amankumarthakur.com</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>GitHub</TableCell>
                              <TableCell>https://github.com/ThakurAmanKumar</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>LinkedIn</TableCell>
                              <TableCell>https://linkedin.com/in/amankumarthakur</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        
                        <div className="bg-muted/40 rounded p-4">
                          <h3 className="font-medium mb-2">Email Service Configuration</h3>
                          <p className="text-sm">EmailJS Service ID: service_id</p>
                          <p className="text-sm">EmailJS Template ID: template_id</p>
                          <p className="text-sm">EmailJS Public Key: public_key</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modals */}
      {editHeroOpen && (
        <EditHeroModal 
          isOpen={editHeroOpen} 
          onClose={() => {
            setEditHeroOpen(false);
            refreshData();
          }} 
        />
      )}

      {editAboutOpen && (
        <EditAboutModal 
          isOpen={editAboutOpen} 
          onClose={() => {
            setEditAboutOpen(false);
            refreshData();
          }} 
        />
      )}

      {editSkillOpen && (
        <EditSkillModal 
          isOpen={editSkillOpen} 
          onClose={() => {
            setEditSkillOpen(false);
            setSelectedSkill(undefined);
            refreshData();
          }} 
          skill={selectedSkill}
          isNew={!selectedSkill}
        />
      )}

      {editTimelineOpen && (
        <EditTimelineModal 
          isOpen={editTimelineOpen} 
          onClose={() => {
            setEditTimelineOpen(false);
            setSelectedTimeline(undefined);
            refreshData();
          }} 
          item={selectedTimeline}
          isNew={!selectedTimeline}
        />
      )}

      {editProjectOpen && (
        <EditProjectModal 
          isOpen={editProjectOpen} 
          onClose={() => {
            setEditProjectOpen(false);
            setSelectedProject(undefined);
            refreshData();
          }} 
          project={selectedProject}
          isNew={!selectedProject}
        />
      )}

      {editCertOpen && (
        <EditCertificationModal 
          isOpen={editCertOpen} 
          onClose={() => {
            setEditCertOpen(false);
            setSelectedCert(undefined);
            refreshData();
          }} 
          certification={selectedCert}
          isNew={!selectedCert}
        />
      )}

      {editResumeOpen && (
        <EditResumeModal 
          isOpen={editResumeOpen} 
          onClose={() => {
            setEditResumeOpen(false);
            refreshData();
          }} 
        />
      )}

      {editContactOpen && (
        <EditContactModal 
          isOpen={editContactOpen} 
          onClose={() => {
            setEditContactOpen(false);
            refreshData();
          }} 
        />
      )}
    </>
  );
};

export default AdminLogin;
