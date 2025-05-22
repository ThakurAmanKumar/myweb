
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
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Skill, addSkill, updateSkill } from '@/utils/adminUtils';
import { refreshSectionData } from '@/hooks/useSectionData';

interface EditSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill;
  isNew?: boolean;
}

const EditSkillModal: React.FC<EditSkillModalProps> = ({ isOpen, onClose, skill, isNew = false }) => {
  const [formData, setFormData] = useState<Skill>(
    skill || { id: '', category: '', name: '', level: 80 }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      if (isNew) {
        const { id, ...newSkill } = formData; // Remove id for new skill
        addSkill(newSkill);
        toast.success("Skill added successfully!");
      } else {
        updateSkill(formData);
        toast.success("Skill updated successfully!");
      }
      refreshSectionData(); // Trigger data refresh across components
      onClose();
    } catch (error) {
      toast.error("Failed to save skill.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add' : 'Edit'} Skill</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              placeholder="Programming Languages"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Python"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="level">Skill Level: {formData.level}%</Label>
            </div>
            <Slider
              id="level"
              value={[formData.level]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setFormData({...formData, level: value[0]})}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading || !formData.name || !formData.category}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSkillModal;
