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
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { Loader, Mail } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function InviteGroupMemberDialog({ group, open, onOpenChange }: any) {
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const {
    loading: loadingSendGroupInvitation,
    execute: executeSendGroupInvitation,
  } = usePost(`groups/${group?.id}/invite/${selectedValue}`, {
    onSuccess: () => {
      toast.success(
        "Invitation sent successfully to " +
          students.find((s) => s.id === selectedValue)?.name
      );
      onOpenChange(false);
      setSearchValue("");
      setSelectedValue(null);
    },
    onError: (errMsg: string) => {
      toast.error(errMsg);
    },
  });

  const {
    loading: loadingSearchStudents,
    searchValue,
    onChange,
    setSearchValue,
    users: students,
  } = useDebouncedSearch(2000, "students");

  const handleInviteMember = async () => {
    if (!selectedValue || !searchValue) return;
    await executeSendGroupInvitation();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Send an invitation to add a new member to your group
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address , Name</Label>
            <Input
              id="email"
              type="email"
              placeholder="member@example.com"
              value={searchValue}
              onChange={onChange}
            />
            {searchValue && (
              <div className=" top-full left-0 w-full mt-1 bg-white rounded-lg shadow p-2 max-h-60 overflow-y-auto">
                {loadingSearchStudents ? (
                  <span className="flex items-center justify-center">
                    <Loader />
                  </span>
                ) : (
                  students.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSearchValue(`${student.name} - ${student.email}`);
                        setSelectedValue(student.id);
                      }}
                      className={`${
                        selectedValue === student.id ? "bg-gray-100" : ""
                      } w-full font-bold text-left px-3 py-2 rounded hover:bg-gray-100`}
                    >
                      {student.name} - {student.email}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={loadingSendGroupInvitation || !searchValue}
            onClick={handleInviteMember}
          >
            <Mail className="h-4 w-4 mr-2" />
            {loadingSendGroupInvitation ? "Sending..." : "Send Invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
