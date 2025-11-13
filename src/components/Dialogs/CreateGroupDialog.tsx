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

export function CreateGroupDialog({ open, onOpenChange }: any) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const { loading: loadingCreateGroup, execute: executeCreateGroup } = usePost(
    `groups`,
    {
      onSuccess: () => {
        onOpenChange(false);
        setGroupName("");
        setGroupDescription("");
        window.location.href = "/dashboard";
      },
      onError: (errMsg: string) => {
        toast.error(errMsg);
      },
    }
  );

  const handleCreateGroup = () => {
    if (!groupName || !groupDescription) {
      toast.error("Please fill all fields");
      return;
    }

    executeCreateGroup({
      name: groupName,
      description: groupDescription,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={loadingCreateGroup || !groupName || !groupDescription}
            onClick={handleCreateGroup}
          >
            {loadingCreateGroup ? "Creating..." : "Create Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
