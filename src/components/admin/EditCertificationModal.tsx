
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
import { toast } from "@/hooks/use-toast";
import { Certification, addCertification, updateCertification } from '@/utils/adminUtils';

interface EditCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification?: Certification;
  isNew?: boolean;
}

const EditCertificationModal: React.FC<EditCertificationModalProps> = ({ 
  isOpen, 
  onClose, 
  certification, 
  isNew = false 
}) => {
  const [formData, setFormData] = useState<Certification>(
    certification || { id: '', title: '', issuer: '', date: '', link: '' }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      if (isNew) {
        const { id, ...newCert } = formData; // Remove id for new certification
        addCertification(newCert);
        toast({
          title: "Success",
          description: "Certification added successfully!",
        });
      } else {
        updateCertification(formData);
        toast({
          title: "Success",
          description: "Certification updated successfully!",
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save certification.",
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
          <DialogTitle>{isNew ? 'Add' : 'Edit'} Certification</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Certification Title</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Deep Learning Specialization"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input 
              id="issuer" 
              value={formData.issuer} 
              onChange={(e) => setFormData({...formData, issuer: e.target.value})}
              placeholder="Coursera - DeepLearning.AI"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              placeholder="March 2023"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link">Certificate Link</Label>
            <Input 
              id="link" 
              value={formData.link} 
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="https://www.example.com/certificate"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading || !formData.title || !formData.issuer || !formData.date}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCertificationModal;
