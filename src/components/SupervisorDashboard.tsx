import { useState } from "react";
import {
  UserCheck,
  UserPlus,
  FolderKanban,
} from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { formatDate } from "../lib/utils";
import { useDashboardData } from "@/contexts/DashboardDataContext";
import Loader from "./ui/Loader";
import {
  getGroupProjects,
  getProjectProgress,
  getProjectsByStatus,
  getReviewsNeededCount,
  getTotalStudentsCount,
} from "@/Helpers";
import { usePatch} from "@/hooks";
import { Link } from "react-router-dom";

function SupervisorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data, loading ,execute } = useDashboardData();


  const { loading: loadingAcceptRequest, execute: executeAcceptRequest } =
    usePatch("/supervisor-requests/accept",{
      onSuccess:() => {
        execute()
      }
    });
  const { loading: loadingRejectRequest, execute: executeRejectRequest } =
    usePatch("/supervisor-requests/reject",{
      onSuccess:() => {
        execute()
      }
    });

  const handleRequestResponse = (requestId: string, isAccept: boolean) => {
    if (isAccept) {
      executeAcceptRequest({
        requestId,
      });
    } 

    if(!isAccept) {
      executeRejectRequest({
        requestId,
      });
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Supervisor Dashboard"
        icon={<UserCheck className="h-6 w-6 text-primary" />}
      />
      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader/>
        </div>
      ) : (
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
                    <div className="text-3xl font-bold">
                      {data?.supervisorRequests?.length}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Awaiting your response
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {getProjectsByStatus(data?.supervisedGroups).length}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Currently supervising
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reviews Needed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {getReviewsNeededCount(data?.supervisedGroups)}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Submissions to review
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {getTotalStudentsCount(data?.supervisedGroups)}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Across all projects
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data?.supervisorRequests?.slice(0, 3)
                      .map((request: any) => (
                        <div
                          key={request.id}
                          className="flex items-center gap-3"
                        >
                          <UserPlus className="h-5 w-5 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {request.projectTitle}
                            </p>
                            <p className="text-xs text-gray-500">
                              Requested {formatDate(request.createdAt)}
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
                {data?.supervisorRequests.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">No pending requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  data?.supervisorRequests.map((request: any) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{request.group.name}</CardTitle>
                          <Badge variant="warning">Pending</Badge>
                        </div>
                        <CardDescription>
                          {request.group.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Requested: {formatDate(request.createdAt)}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              disabled={loadingAcceptRequest || loadingRejectRequest}
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleRequestResponse(request.id, false)
                              }
                            >
                              Reject
                            </Button>
                            <Button
                              disabled={loadingAcceptRequest || loadingRejectRequest}

                              size="sm"
                              onClick={() =>
                                handleRequestResponse(request.id, true)
                              }
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
                {data?.supervisedGroups?.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FolderKanban className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">No active projects</p>
                    </CardContent>
                  </Card>
                ) : (
                  getGroupProjects(data?.supervisedGroups).map((project) => (
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
                            Progress: {getProjectProgress(project.milestones)}%
                          </div>
                          <Link to={`/project-details/${project.id}`}>
                          <Button  variant="outline" size="sm">
                            View Details
                          </Button></Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* <TabsContent value="reviews" className="mt-6">
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
                </TabsContent> */}
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default SupervisorDashboard;
