
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { AboutContent, getAboutContent, saveAboutContent } from '@/utils/adminUtils';
import { refreshSectionData } from '@/hooks/useSectionData';

interface EditAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditAboutModal: React.FC<EditAboutModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState<AboutContent>(getAboutContent());
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      saveAboutContent(content);
      refreshSectionData(); // Trigger data refresh for all components
      toast.success("About content updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to save changes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">About Me Description</Label>
            <Textarea 
              id="description" 
              rows={8}
              value={content.description} 
              onChange={(e) => setContent({...content, description: e.target.value})}
              className="min-h-[200px]"
            />
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

export default EditAboutModal;
