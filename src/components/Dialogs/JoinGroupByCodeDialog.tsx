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

export function JoinGroupByCodeDialog({ open, onOpenChange }: any) {
  const [inviteCode, setInviteCode] = useState("");
  const { loading, execute } = usePost(`groups/join`, {
    onSuccess: () => {
      onOpenChange(false);
      setInviteCode("");
      window.location.href = "/dashboard";
    },
    onError: (errMsg: string) => {
      toast.error(errMsg);
      setInviteCode("");
    },
  });

  const handleJoinGroup = () => {
    if (!inviteCode) return;
    execute({ code: inviteCode });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Group</DialogTitle>
          <DialogDescription>Enter the group invitation code</DialogDescription>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={loading || !inviteCode} onClick={handleJoinGroup}>
            {loading ? "Joining..." : "Join Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
