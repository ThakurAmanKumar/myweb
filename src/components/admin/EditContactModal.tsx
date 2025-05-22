
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
import { 
  ContactInfo, 
  EmailConfig,
  getContactInfo, 
  saveContactInfo, 
  getEmailConfig, 
  saveEmailConfig 
} from '@/utils/adminUtils';
import { Plus, Trash2 } from 'lucide-react';

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditContactModal: React.FC<EditContactModalProps> = ({ isOpen, onClose }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(getContactInfo());
  const [emailConfig, setEmailConfig] = useState<EmailConfig>(getEmailConfig());
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    try {
      saveContactInfo(contactInfo);
      saveEmailConfig(emailConfig);
      toast({
        title: "Success",
        description: "Contact information updated successfully!",
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

  const addContactItem = () => {
    setContactInfo([...contactInfo, { type: '', value: '' }]);
  };

  const removeContactItem = (index: number) => {
    const newContactInfo = [...contactInfo];
    newContactInfo.splice(index, 1);
    setContactInfo(newContactInfo);
  };

  const updateContactItem = (index: number, field: 'type' | 'value', value: string) => {
    const newContactInfo = [...contactInfo];
    newContactInfo[index] = { ...newContactInfo[index], [field]: value };
    setContactInfo(newContactInfo);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Contact Details</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addContactItem}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Contact
              </Button>
            </div>
            
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-end gap-3 bg-secondary/10 p-3 rounded-md">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`type-${index}`}>Type</Label>
                  <Input 
                    id={`type-${index}`}
                    value={item.type} 
                    onChange={(e) => updateContactItem(index, 'type', e.target.value)}
                    placeholder="Email, GitHub, LinkedIn, etc."
                  />
                </div>
                <div className="flex-[2] space-y-2">
                  <Label htmlFor={`value-${index}`}>Value</Label>
                  <Input 
                    id={`value-${index}`}
                    value={item.value} 
                    onChange={(e) => updateContactItem(index, 'value', e.target.value)}
                    placeholder="contact@example.com, https://github.com/username"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeContactItem(index)}
                  className="text-destructive hover:text-destructive h-10 w-10 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">Email Service Configuration</h3>
            
            <div className="space-y-2">
              <Label htmlFor="serviceId">EmailJS Service ID</Label>
              <Input 
                id="serviceId" 
                value={emailConfig.serviceId} 
                onChange={(e) => setEmailConfig({...emailConfig, serviceId: e.target.value})}
                placeholder="service_id"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="templateId">EmailJS Template ID</Label>
              <Input 
                id="templateId" 
                value={emailConfig.templateId} 
                onChange={(e) => setEmailConfig({...emailConfig, templateId: e.target.value})}
                placeholder="template_id"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publicKey">EmailJS Public Key</Label>
              <Input 
                id="publicKey" 
                value={emailConfig.publicKey} 
                onChange={(e) => setEmailConfig({...emailConfig, publicKey: e.target.value})}
                placeholder="public_key"
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

export default EditContactModal;
