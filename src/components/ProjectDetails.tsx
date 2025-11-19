import { useEffect, useState } from "react";
import { UserCheck, PlusCircle, Crown, FileText } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import { formatDate, formatFileSize } from "@/lib/utils";
import { GroupMember, Milestone, Project, Submission } from "@/types";
import { useGet, usePatch, usePost } from "@/hooks";
import Loader from "./ui/Loader";
import { toast } from "sonner";
import axios from "axios";
import { api } from "@/services/api";

export function ProjectDetails() {
  const { id: projectId } = useParams();

  const [feedbackInputs, setFeedbackInputs] = useState<{
    [submissionId: number]: string;
  }>({});
  const [milestoneForm, setMilestoneForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const {
    loading,
    data: project,
    execute,
  } = useGet<Project>(`projects/${projectId}`, {
    immediate: true,
  });

  const { loading: loadingCreateMilestone, execute: executeCreateMilestone } =
    usePost(`projects/${projectId}/milestones`, {
      onSuccess: () => {
        toast.success("Milestone Created.");
        execute();
      },
    });

  const handleMilestoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMilestoneForm({ ...milestoneForm, [e.target.name]: e.target.value });
  };

  const handleCreateMilestone = async () => {
    if (
      !milestoneForm.title ||
      !milestoneForm.description ||
      !milestoneForm.deadline
    ) {
      toast.error("Please, fill all fields");
      return;
    }

    console.log({
      ...milestoneForm,
      deadline: new Date(milestoneForm.deadline).toISOString(),
    });

    executeCreateMilestone({
      ...milestoneForm,
      deadline: new Date(milestoneForm.deadline).toISOString(),
    });
  };

  const handleAddFeedback = async (s: Submission) => {
    if (!feedbackInputs[s.id]) {
      toast.error("Please provide a feedback");
      return;
    }

    console.log(feedbackInputs[s.id]);

    try {
      const res = api
        .patch(`/submissions/${s.id}`, {
          feedback: [...(s.feedback || []), feedbackInputs[s.id]],
        })
        .then(() => execute());
      //
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Supervisor Dashboard"
        icon={<UserCheck className="h-6 w-6 text-primary" />}
      />
      {loading || !project ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {project?.title}
                <Badge variant="outline" className="ml-2 capitalize">
                  {project?.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-gray-700">{project?.description}</div>
              <div className="mb-2">
                <span className="font-semibold">Technologies:</span>{" "}
                {project?.technologies?.length
                  ? project?.technologies.map((item: string, index: number) => (
                      <Badge key={index}>{item}</Badge>
                    ))
                  : "N/A"}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Group:</span>
                {project?.group?.name}
              </div>
              <div className="flex flex-row mb-2 gap-2">
                <span className="font-semibold">Members:</span>
                <span className="flex flex-row items-center gap-2">
                  {project?.group?.members?.map((m: GroupMember) => (
                    <Badge key={m.id}>
                      {m.role === "LEADER" && (
                        <Crown
                          fill=""
                          className="h-4 w-4  text-yellow-500 mx-1"
                        />
                      )}
                      {m.student.name}
                    </Badge>
                  ))}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Start Date: </span>
                {formatDate(project?.createdAt?.toString())}
              </div>
              <div className="mb-2">
                <span className="font-semibold">End Date: </span>
                {project?.endDate
                  ? formatDate(project?.endDate.toString())
                  : formatDate(
                      new Date(
                        new Date(project.createdAt).setMonth(
                          new Date(project.createdAt).getMonth() + 4
                        )
                      ).toString()
                    )}
              </div>
              <div className="mb-2 text-xs text-gray-400">
                Created: {formatDate(project?.createdAt.toString())}
                {" | "}
                Updated: {formatDate(project?.updatedAt.toString())}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              {project?.milestones?.length === 0 ? (
                <div className="text-gray-500">No milestones yet.</div>
              ) : (
                <ul className="space-y-4">
                  {project?.milestones
                    .sort((a, b) => a.id - b.id)

                    .map((m: Milestone) => (
                      <li key={m.id} className="border-b pb-2">
                        <div className="font-semibold">{m.title}</div>
                        <div className="text-sm text-gray-700">
                          {m.description}
                        </div>
                        <div className="text-xs text-gray-400">
                          Due:{" "}
                          {m.deadline
                            ? formatDate(m.deadline.toString())
                            : "N/A"}
                          {" | "}Created: {formatDate(m.createdAt.toString())}
                        </div>
                        <div className="mt-4">
                          {m.submissions
                            ?.sort((a, b) => a.id - b.id)
                            .map((s: Submission) => (
                              <div
                                key={s.id}
                                className="flex flex-col gap-2 mb-4"
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <a
                                      target="_blank"
                                      className="text-sm font-medium"
                                      href={s.fileUrl}
                                    >
                                      Open File
                                    </a>
                                    <p className="text-xs text-gray-500">
                                      {formatDate(s.submittedAt.toString())}
                                    </p>
                                  </div>
                                </div>
                                {/* Show feedback array */}
                                {s.feedback && s.feedback.length > 0 && (
                                  <div className="ml-8">
                                    <div className="text-xs font-semibold text-gray-700 mb-1">
                                      Feedback:
                                    </div>
                                    <ul className="list-disc ml-4 text-xs text-gray-600">
                                      {s?.feedback?.map(
                                        (fb: string, idx: number) => (
                                          <li key={idx}>{fb}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                                {/* Input to provide feedback */}
                                <div className="ml-8 flex items-center gap-2 mt-1">
                                  <input
                                    type="text"
                                    placeholder="Provide feedback..."
                                    value={feedbackInputs[s.id] || ""}
                                    onChange={(e) => {
                                      setFeedbackInputs((prev) => ({
                                        ...prev,
                                        [s.id]: e.target.value,
                                      }));
                                    }}
                                    className="w-64 flex h-10  border-b border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      handleAddFeedback(s);
                                      setFeedbackInputs((prev) => ({
                                        ...prev,
                                        [s.id]: "",
                                      }));
                                    }}
                                  >
                                    Send
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                Create Milestone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input
                  name="title"
                  placeholder="Milestone title"
                  value={milestoneForm.title}
                  onChange={handleMilestoneChange}
                />
                <Textarea
                  name="description"
                  placeholder="Milestone description"
                  value={milestoneForm.description}
                  onChange={handleMilestoneChange}
                />
                <Input
                  name="deadline"
                  type="date"
                  value={milestoneForm.deadline}
                  onChange={handleMilestoneChange}
                />
                <Button
                  onClick={handleCreateMilestone}
                  disabled={
                    loadingCreateMilestone ||
                    !milestoneForm.title.trim() ||
                    !milestoneForm.description ||
                    !milestoneForm.deadline
                  }
                >
                  Add Milestone
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
