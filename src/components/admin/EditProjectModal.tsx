
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Project, addProject, updateProject } from '@/utils/adminUtils';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  isNew?: boolean;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ isOpen, onClose, project, isNew = false }) => {
  const emptyProject = { 
    id: '', 
    title: '', 
    description: '', 
    image: 'https://via.placeholder.com/500x300/1A1F2C/FFFFFF?text=Project+Image', 
    tags: [], 
    github: '', 
    demo: '' 
  };
  
  const [formData, setFormData] = useState<Project>(project || emptyProject);
  const [newTag, setNewTag] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      if (isNew) {
        const { id, ...newProject } = formData; // Remove id for new project
        addProject(newProject);
        toast({
          title: "Success",
          description: "Project added successfully!",
        });
      } else {
        updateProject(formData);
        toast({
          title: "Success",
          description: "Project updated successfully!",
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({...formData, tags: [...formData.tags, newTag.trim()]});
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({...formData, tags: formData.tags.filter(tag => tag !== tagToRemove)});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add' : 'Edit'} Project</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="AI Image Generator"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="A brief description of your project"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image" 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
            <div className="mt-2 h-40 rounded-md overflow-hidden">
              <img 
                src={formData.image} 
                alt="Project Preview" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/500x300/1A1F2C/FFFFFF?text=Project+Image';
                }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="tags" 
                value={newTag} 
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add technology tag"
              />
              <Button type="button" onClick={addTag} className="shrink-0">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div 
                  key={index} 
                  className="bg-secondary text-foreground text-sm px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)} 
                    className="ml-1 p-1 rounded-full hover:bg-secondary/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL (optional)</Label>
            <Input 
              id="github" 
              value={formData.github} 
              onChange={(e) => setFormData({...formData, github: e.target.value})}
              placeholder="https://github.com/yourusername/repo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="demo">Demo URL (optional)</Label>
            <Input 
              id="demo" 
              value={formData.demo} 
              onChange={(e) => setFormData({...formData, demo: e.target.value})}
              placeholder="https://demo.example.com"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading || !formData.title || !formData.description}>
            {isLoading ? "Saving..." : "Save Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;
