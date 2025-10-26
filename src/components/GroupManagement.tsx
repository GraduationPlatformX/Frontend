import { useState } from 'react';
import { Crown, UserPlus, X, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { getGroups, STORAGE_KEYS } from '../services/mockData';
import { Group } from '../types';
import { toast } from 'sonner';

export function GroupManagement() {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>(getGroups());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const userGroup = groups.find(g => g.members.some(m => m.id === user?.id));

  const handleCreateGroup = () => {
    if (!groupName || !groupDescription) {
      toast.error('Please fill all fields');
      return;
    }

    const newGroup: Group = {
      id: `g${Date.now()}`,
      name: groupName,
      description: groupDescription,
      leaderId: user!.id,
      members: [{ id: user!.id, name: user!.name, email: user!.email }],
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(updatedGroups));
    
    toast.success('Group created successfully!');
    setIsCreateDialogOpen(false);
    setGroupName('');
    setGroupDescription('');
  };

  const handleRemoveMember = (memberId: string) => {
    if (!userGroup || userGroup.leaderId !== user?.id) {
      toast.error('Only the group leader can remove members');
      return;
    }

    if (memberId === userGroup.leaderId) {
      toast.error('Leader cannot be removed');
      return;
    }

    const updatedGroups = groups.map(g => {
      if (g.id === userGroup.id) {
        return {
          ...g,
          members: g.members.filter(m => m.id !== memberId),
        };
      }
      return g;
    });

    setGroups(updatedGroups);
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(updatedGroups));
    toast.success('Member removed');
  };

  const handleInviteMember = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email');
      return;
    }

    // In a real app, this would send an invitation
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setIsInviteDialogOpen(false);
  };

  if (!userGroup) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create or Join a Group</CardTitle>
            <CardDescription>
              Form a group of 2-6 members to start your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Create New Group
            </Button>
            <Button onClick={() => setIsJoinDialogOpen(true)} variant="outline" className="w-full">
              Join Existing Group
            </Button>
          </CardContent>
        </Card>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Create a new group to start working on your project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., AI Researchers"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project..."
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Group</DialogTitle>
              <DialogDescription>
                Enter the group invitation code
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Invitation Code</Label>
                <Input
                  id="code"
                  placeholder="Enter code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => toast.info('Join feature coming soon')}>
                Join
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{userGroup.name}</CardTitle>
            <CardDescription>{userGroup.description}</CardDescription>
          </div>
          <Badge>
            {userGroup.members.length} members
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsInviteDialogOpen(true)}
            disabled={userGroup.members.length >= 6}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Group Members</h4>
          {userGroup.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Avatar name={member.name} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{member.name}</p>
                    {member.id === userGroup.leaderId && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>
              {userGroup.leaderId === user?.id && member.id !== userGroup.leaderId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription>
              Send an invitation to add a new member to your group
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="member@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteMember}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

