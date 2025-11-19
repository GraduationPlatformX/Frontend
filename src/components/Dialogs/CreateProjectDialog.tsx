import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { usePost } from "@/hooks";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDashboardData } from "@/contexts/DashboardDataContext";
import { Select } from "../ui/select";
import { TECHNOLOGIES_LIST } from "@/constants";

export function CreateProjectDialog({ open, onOpenChange }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const { data, execute } = useDashboardData();

  const { loading: loadingCreateProject, execute: executeCreateProject } =
    usePost(`projects`, {
      onSuccess: () => {
        onOpenChange(false);
        setTitle("");
        setDescription("");
        setTechnologies([]);
        execute();
      },
      onError: (errMsg: string) => {
        toast.error(errMsg);
      },
    });

  const handleCreateProject = () => {
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }
    console.log({
      title,
      description,
      groupId: data.id,
      technologies,
    });

    executeCreateProject({
      title,
      description,
      groupId : data.id,
      technologies
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to start working
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Project Title</Label>
            <Input
              id="name"
              placeholder="e.g., AI Researchers"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Technologies</Label>
            <Select
              id="technologies"
              className="h-[300px]"
              value={technologies}
              multiple
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setTechnologies(selected);
              }}
            >
              {TECHNOLOGIES_LIST.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={loadingCreateProject || !title || !description}
            onClick={handleCreateProject}
          >
            {loadingCreateProject ? "Creating..." : "Create Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
