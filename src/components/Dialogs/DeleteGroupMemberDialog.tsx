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
import { useDelete } from "@/hooks";
import { toast } from "sonner";
import { Group } from "@/types";
import { useDashboardData } from "@/contexts/DashboardDataContext";

export function DeleteGroupMemberDialog({
  group,
  userId,
  open,
  onOpenChange,
}: {group: Group; userId: number; open: boolean; onOpenChange: (open: boolean) => void}) {
  const {execute:refreshDashboardData} = useDashboardData()
  
  const { loading, execute } = useDelete(`groups/${group?.id}/members/${userId}`, {
    onSuccess: () => {
      toast.success("Member removed successfully");
      refreshDashboardData();
      onOpenChange(false);

    },
    onError: (errMsg: string) => {
      toast.error(errMsg);
    },
  });

  const handleSubmit = () => {
    execute();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> 
            Remove Member from Group
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this member from the group? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4"></div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            variant="destructive"
          >
            {loading ? "Removing..." : "Remove Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
