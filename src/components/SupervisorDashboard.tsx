import { useState } from 'react';
import { UserCheck, UserPlus, FolderKanban, ClipboardCheck } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { getRequests, getProjects, getSubmissions, STORAGE_KEYS } from '../services/mockData';
import { SupervisorRequest, Submission } from '../types';
import { formatDate } from '../lib/utils';
import { toast } from 'sonner';

function SupervisorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState(getRequests());
  const [submissions, setSubmissions] = useState(getSubmissions());

  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const activeProjects = getProjects().filter(p => p.supervisorId === user?.id);
  const reviewsNeeded = submissions.filter(s => s.status === 'PENDING' || s.status === 'IN_REVIEW');

  const handleRequestResponse = (requestId: string, approved: boolean) => {
    const allRequests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]');
    const updated = allRequests.map((r: SupervisorRequest) =>
      r.id === requestId
        ? {
            ...r,
            status: approved ? 'APPROVED' : 'REJECTED',
            respondedAt: new Date().toISOString(),
          }
        : r
    );
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
    setRequests(updated);
    toast.success(approved ? 'Request approved' : 'Request rejected');
  };

  const handleSubmissionReview = (submissionId: string, approved: boolean) => {
    const allSubmissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
    const updated = allSubmissions.map((s: Submission) =>
      s.id === submissionId
        ? { ...s, status: approved ? 'APPROVED' : 'REJECTED' }
        : s
    );
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));
    setSubmissions(updated);
    toast.success(approved ? 'Submission approved' : 'Submission rejected');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Supervisor Dashboard" icon={<UserCheck className="h-6 w-6 text-primary" />} />
      
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pendingRequests.length}</div>
                  <p className="text-sm text-gray-500 mt-2">Awaiting your response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activeProjects.length}</div>
                  <p className="text-sm text-gray-500 mt-2">Currently supervising</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reviews Needed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{reviewsNeeded.length}</div>
                  <p className="text-sm text-gray-500 mt-2">Submissions to review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                      {activeProjects.reduce((sum) => sum + 3, 0)}
                    </div>
                  <p className="text-sm text-gray-500 mt-2">Across all projects</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center gap-3">
                      <UserPlus className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{request.projectTitle}</p>
                        <p className="text-xs text-gray-500">
                          Requested {formatDate(request.requestedAt)}
                        </p>
                      </div>
                      <Badge variant="warning">Pending</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <div className="space-y-4">
              {pendingRequests.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No pending requests</p>
                  </CardContent>
                </Card>
              ) : (
                pendingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{request.projectTitle}</CardTitle>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                      <CardDescription>{request.projectDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Requested: {formatDate(request.requestedAt)}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRequestResponse(request.id, false)}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRequestResponse(request.id, true)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="space-y-4">
              {activeProjects.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FolderKanban className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No active projects</p>
                  </CardContent>
                </Card>
              ) : (
                activeProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant="default">{project.status}</Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Progress: {project.progress}%
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {reviewsNeeded.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ClipboardCheck className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No submissions to review</p>
                  </CardContent>
                </Card>
              ) : (
                reviewsNeeded.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{submission.fileName}</CardTitle>
                        <Badge variant="secondary">{submission.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Uploaded: {formatDate(submission.uploadedAt)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSubmissionReview(submission.id, false)}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSubmissionReview(submission.id, true)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SupervisorDashboard;

