
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
import { ResumeContent, getResumeContent, saveResumeContent } from '@/utils/adminUtils';

interface EditResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditResumeModal: React.FC<EditResumeModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState<ResumeContent>(getResumeContent());
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      saveResumeContent(content);
      toast({
        title: "Success",
        description: "Resume content updated successfully!",
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
          <DialogTitle>Edit Resume Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="url">Resume URL</Label>
            <Input 
              id="url" 
              value={content.url} 
              onChange={(e) => setContent({...content, url: e.target.value})}
              placeholder="https://example.com/resume.pdf"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="displayText">Resume Display Text</Label>
            <Textarea 
              id="displayText" 
              value={content.displayText} 
              onChange={(e) => setContent({...content, displayText: e.target.value})}
              placeholder="Check out my detailed resume..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fileName">Resume File Name</Label>
            <Input 
              id="fileName" 
              value={content.fileName} 
              onChange={(e) => setContent({...content, fileName: e.target.value})}
              placeholder="Resume_YourName.pdf"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading || !content.url}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditResumeModal;
