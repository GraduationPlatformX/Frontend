import { useState } from "react";
import {
  GraduationCap,
  FolderKanban,
  FileUp,
  MessageSquare,
  UserPlus,
  PlusSquare,
  Plus,
} from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { GroupManagement } from "./GroupManagement";
import { ProjectView } from "./ProjectView";
import { ChatInterface } from "./ChatInterface";
import { SubmissionUpload } from "./SubmissionUpload";
import { SupervisorRequestForm } from "./Dialogs/SupervisorRequestForm";
import { Milestone, Submission } from "@/types";
import Loader from "./ui/Loader";
import {
  getBadgeVariant,
  getLastSubmissions,
  getProjectProgress,
} from "@/Helpers";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/contexts/DashboardDataContext";
import { CreateProjectDialog } from "./Dialogs/CreateProjectDialog";

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isCreateProjectDialogeOpen, setIsCreateProjectDialogeOpen] =
    useState(false);

  const { data: userGroup, loading } = useDashboardData();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Student Dashboard"
        icon={<GraduationCap className="h-6 w-6 text-primary" />}
      />
      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader/>
        </div>
      ) : (
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
                        <Badge
                          variant={getBadgeVariant(userGroup.status)}
                          className="mb-2"
                        >
                          {userGroup.status}
                        </Badge>
                        <p className="text-sm text-gray-600">
                          {userGroup?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {userGroup?.members?.length} members
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
                    {userGroup?.project ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {getProjectProgress(userGroup?.project?.milestones)}
                            %
                          </span>
                        </div>
                        <Progress
                          value={getProjectProgress(
                            userGroup?.project?.milestones
                          )}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          {
                            userGroup?.project.milestones.filter(
                              (m: Milestone) => m.status === "COMPLETED"
                            ).length
                          }{" "}
                          of {userGroup?.project.milestones.length} milestones
                          completed
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
                      <p className="text-sm text-gray-600">
                        Supervisor assigned : {userGroup?.supervisor?.name}
                      </p>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          No supervisor yet
                        </p>
                        {userGroup?.createdById === user?.id && (
                          <Button
                            size="sm"
                            onClick={() => setIsRequestDialogOpen(true)}
                          >
                            Request Supervisor
                          </Button>
                        )}
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
                    {userGroup?.project?.milestones ? (
                      getLastSubmissions(userGroup?.project?.milestones).map(
                        (submission: Submission) => (
                          <div
                            key={submission.id}
                            className="flex items-center gap-3"
                          >
                            <FileUp className="h-5 w-5 text-gray-400" />
                            <div className="flex-1">
                              <a
                                target="_blank"
                                href={submission.fileUrl}
                                className="text-sm font-medium"
                              >
                                Open Url
                              </a>
                              <p className="text-xs text-gray-500">
                                Uploaded{" "}
                                {new Date(
                                  submission.submittedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={getBadgeVariant(submission.status)}>
                              {submission.status}
                            </Badge>
                          </div>
                        )
                      )
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
              <GroupManagement userGroup={userGroup || undefined} />
            </TabsContent>

            <TabsContent value="project" className="mt-6">
              {userGroup?.project ? (
                <ProjectView project={userGroup?.project} />
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setIsCreateProjectDialogeOpen(true);
                    }}
                    className="mb-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                  <CreateProjectDialog
                    onChange={setIsCreateProjectDialogeOpen}
                    open={isCreateProjectDialogeOpen}
                  />
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FolderKanban className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">No project found</p>
                      {/* {user?.id === userGroup.createdById && (
                        <p className="text-sm text-gray-400 mt-2">
                          {userGroup
                            ? "Create a project to start"
                            : "Create a group and request a supervisor to get started"}
                        </p>
                      )} */}
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="submissions" className="mt-6">
              {userGroup?.project?.milestones.length ? (
                <SubmissionUpload group={userGroup || undefined} />
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-500">No Submissions</p>
                    <p className="text-gray-500">
                      Milestones submission's will appear in this area
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              {userGroup ? (
                <ChatInterface
                  groupId={userGroup?.id}
                  chatId={userGroup?.chat?.id}
                />
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">
                      Join a group to start chatting
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      <SupervisorRequestForm
        userGroup={userGroup!}
        open={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
      />
    </div>
  );
}

export default StudentDashboard;
