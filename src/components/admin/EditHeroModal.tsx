
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
import { toast } from "@/hooks/use-toast";
import { HeroContent, getHeroContent, saveHeroContent } from '@/utils/adminUtils';

interface EditHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditHeroModal: React.FC<EditHeroModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState<HeroContent>(getHeroContent());
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      saveHeroContent(content);
      toast({
        title: "Success",
        description: "Hero content updated successfully!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Hero Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={content.name} 
              onChange={(e) => setContent({...content, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input 
              id="jobTitle" 
              value={content.jobTitle} 
              onChange={(e) => setContent({...content, jobTitle: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={content.description} 
              onChange={(e) => setContent({...content, description: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <Input 
              id="profileImage" 
              value={content.profileImage} 
              onChange={(e) => setContent({...content, profileImage: e.target.value})}
            />
            <div className="mt-2 h-20 w-20 rounded-full overflow-hidden">
              <img 
                src={content.profileImage} 
                alt="Profile" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x400/1A1F2C/FFFFFF?text=AK';
                }}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditHeroModal;
