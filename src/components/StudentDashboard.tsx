import { useState } from 'react';
import { GraduationCap, FolderKanban, FileUp, MessageSquare } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { getGroups, getProjects, getSubmissions } from '../services/mockData';
import { GroupManagement } from './GroupManagement';
import { ProjectView } from './ProjectView';
import { ChatInterface } from './ChatInterface';
import { SubmissionUpload } from './SubmissionUpload';
import { SupervisorRequestForm } from './SupervisorRequestForm';

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  const groups = getGroups();
  const projects = getProjects();
  const submissions = getSubmissions();

  const userGroup = groups.find(g => g.members.some(m => m.id === user?.id));
  const userProject = userGroup ? projects.find(p => p.groupId === userGroup.id) : null;
  const groupSubmissions = userGroup ? submissions.filter(s => s.groupId === userGroup.id) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Student Dashboard" icon={<GraduationCap className="h-6 w-6 text-primary" />} />
      
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="group">My Group</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="chat">Group Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Group Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {userGroup ? (
                    <div>
                      <Badge variant="success" className="mb-2">
                        {userGroup.status}
                      </Badge>
                      <p className="text-sm text-gray-600">{userGroup.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {userGroup.members.length} members
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No group yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  {userProject ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{userProject.progress}%</span>
                      </div>
                      <Progress value={userProject.progress} />
                      <p className="text-xs text-gray-500 mt-2">
                        {userProject.milestones.filter(m => m.status === 'COMPLETED').length} of{' '}
                        {userProject.milestones.length} milestones completed
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No active project</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Supervisor</CardTitle>
                </CardHeader>
                <CardContent>
                  {userGroup?.supervisorId ? (
                    <p className="text-sm text-gray-600">Supervisor assigned</p>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">No supervisor yet</p>
                      <Button size="sm" onClick={() => setIsRequestDialogOpen(true)}>
                        Request Supervisor
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupSubmissions.length > 0 ? (
                    groupSubmissions.slice(0, 3).map((submission) => (
                      <div key={submission.id} className="flex items-center gap-3">
                        <FileUp className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{submission.fileName}</p>
                          <p className="text-xs text-gray-500">
                            Uploaded {new Date(submission.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            submission.status === 'APPROVED'
                              ? 'success'
                              : submission.status === 'REJECTED'
                              ? 'error'
                              : 'secondary'
                          }
                        >
                          {submission.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="group" className="mt-6">
            <GroupManagement />
          </TabsContent>

          <TabsContent value="project" className="mt-6">
            {userProject ? (
              <ProjectView project={userProject} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FolderKanban className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No project found</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Create a group and request a supervisor to get started
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            <SubmissionUpload />
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            {userGroup ? (
              <ChatInterface groupId={userGroup.id} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Join a group to start chatting</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <SupervisorRequestForm
        open={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
      />
    </div>
  );
}

export default StudentDashboard;

