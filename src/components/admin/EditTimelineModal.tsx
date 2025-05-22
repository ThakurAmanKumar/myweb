
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
import { TimelineItem, addTimelineItem, updateTimelineItem } from '@/utils/adminUtils';
import { refreshSectionData } from '@/hooks/useSectionData';

interface EditTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: TimelineItem;
  isNew?: boolean;
}

const EditTimelineModal: React.FC<EditTimelineModalProps> = ({ isOpen, onClose, item, isNew = false }) => {
  const [formData, setFormData] = useState<TimelineItem>(
    item || { id: '', year: '', title: '', description: '' }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      if (isNew) {
        const { id, ...newItem } = formData; // Remove id for new item
        addTimelineItem(newItem);
        toast.success("Timeline item added successfully!");
      } else {
        updateTimelineItem(formData);
        toast.success("Timeline item updated successfully!");
      }
      refreshSectionData(); // Trigger data refresh across components
      onClose();
    } catch (error) {
      toast.error("Failed to save timeline item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add' : 'Edit'} Timeline Item</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year/Period</Label>
            <Input 
              id="year" 
              value={formData.year} 
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              placeholder="2023 - Present"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="B.Tech in Computer Science"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Pursuing degree with specialization in AI and ML"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading || !formData.year || !formData.title}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTimelineModal;
