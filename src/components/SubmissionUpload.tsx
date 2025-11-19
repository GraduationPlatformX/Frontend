import { Upload, FileText, Download, MessageSquare, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatDate, formatFileSize } from "../lib/utils";
import { Group } from "@/types";
import { usePost } from "@/hooks";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { getBadgeVariant } from "@/Helpers";

export function SubmissionUpload({ group }: { group?: Group }) {
  const project = group?.project;
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = async (milestoneId: string) => {
    if (!files.length) {
      toast.error("The file is required");
      return;
    }

    const formData = new FormData();
    formData.append("milestoneId", milestoneId);
    files.forEach((file) => {
      formData.append("files", file); // <-- append the actual file
    });
    const token = localStorage.getItem("access_token");
    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/submissions`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
        });
    } catch (error: any) {
      console.error("Upload failed:", error.response?.data || error.message);
      throw error;
    }
  };

  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      case "IN_REVIEW":
        return "default";
      default:
        return "secondary";
    }
  };

  if (!project) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No project found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {project.milestones
        .sort((a, b) => a.id - b.id)
        .map((milestone) => {
          const submissions = milestone.submissions;

          return (
            <Card key={milestone.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </div>

                  <Badge
                    variant={
                      submissions.length > 0
                        ? getBadgeVariant(milestone.status)
                        : "secondary"
                    }
                  >
                    {submissions.length > 0 ? milestone.status.toLowerCase() : "No submission"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="space-y-3 border p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <a
                                target="_blank"
                                className="text-sm font-medium"
                                href={submission.fileUrl}
                              >
                                Open File
                              </a>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(10000)} •{" "}
                                {formatDate(submission.submittedAt.toString())}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Feedback
                          </h4>

                          {["greate job"].map((note, index) => (
                            <div
                              key={index}
                              className="p-3 bg-blue-50 rounded-lg"
                            >
                              <p className="text-sm text-gray-700 mb-1">
                                Supervisor : {group?.supervisor?.name}
                              </p>
                              <p className="text-sm font-medium mb-1">{note}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(submission.updatedAt.toString())}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500 mb-4">
                      No submission yet
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        setFiles(Array.from(e.target.files || []))
                      }
                      className="mb-4"
                    />
                    <Button
                      onClick={() => handleFileUpload(milestone.id.toString())}
                      disabled={!files.length}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
