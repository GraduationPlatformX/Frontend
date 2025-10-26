import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { mockSupervisors } from '../services/mockData';
import { STORAGE_KEYS } from '../services/mockData';
import { useAuth } from '../contexts/AuthContext';
import { getGroups } from '../services/mockData';
import { toast } from 'sonner';

interface SupervisorRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupervisorRequestForm({ open, onOpenChange }: SupervisorRequestFormProps) {
  const { user } = useAuth();
  const groups = getGroups();
  const userGroup = groups.find(g => g.members.some(m => m.id === user?.id));
  
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = () => {
    if (!selectedSupervisor || !projectTitle || !projectDescription) {
      toast.error('Please fill all fields');
      return;
    }

    if (!userGroup) {
      toast.error('You must be in a group to request a supervisor');
      return;
    }

    const newRequest = {
      id: `sr${Date.now()}`,
      groupId: userGroup.id,
      supervisorId: selectedSupervisor,
      projectTitle,
      projectDescription,
      status: 'PENDING' as const,
      requestedAt: new Date().toISOString(),
    };

    const allRequests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const updated = [...allRequests, newRequest];
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));

    toast.success('Supervisor request submitted!');
    setSelectedSupervisor('');
    setProjectTitle('');
    setProjectDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Supervisor</DialogTitle>
          <DialogDescription>
            Select a supervisor and provide project details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="supervisor">Select Supervisor</Label>
            <Select
              id="supervisor"
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
            >
              <option value="">Choose a supervisor...</option>
              {mockSupervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name} - {supervisor.specialty}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

