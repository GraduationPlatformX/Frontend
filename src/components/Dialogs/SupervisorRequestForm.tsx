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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { Loader } from "lucide-react";
import { Group } from "@/types";
import { usePost } from "@/hooks";
import { toast } from "sonner";

interface SupervisorRequestFormProps {
  userGroup: Group;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupervisorRequestForm({
  userGroup,
  open,
  onOpenChange,
}: SupervisorRequestFormProps) {
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const {
    loading: loadingSearchSupervisors,
    searchValue,
    onChange,
    setSearchValue,
    users: supervisors,
  } = useDebouncedSearch(2000, "supervisors");


  const {
    loading: loadingSendSupervisorsRequest,
    execute: executeSendSupervisorRequest,
  } = usePost(`supervisor-requests`, {
    onSuccess: () => {
      toast.success(
        "Request sent successfully to " +
          supervisors.find((s) => s.id === selectedValue)?.name
      );
      onOpenChange(false);
      setSearchValue("");
      setSelectedValue(null);
    },
    onError: (errMsg: string) => {
      toast.error(errMsg);
    },
  });


  const handleSubmit = () => {
    if (!selectedValue) {
      return;
    }

    executeSendSupervisorRequest({
      supervisorId: selectedValue,
      groupId: userGroup.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Supervisor</DialogTitle>
          <DialogDescription>
            Select a supervisor
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
                {loadingSearchSupervisors ? (
                  <span className="flex items-center justify-center">
                    <Loader />
                  </span>
                ) : (
                  supervisors.map((supervisor) => (
                    <button
                      key={supervisor.id}
                      onClick={() => {
                        setSearchValue(
                          `${supervisor.name} - ${supervisor.email}`
                        );
                        setSelectedValue(supervisor.id);
                      }}
                      className={`${
                        selectedValue === supervisor.id ? "bg-gray-100" : ""
                      } w-full font-bold text-left px-3 py-2 rounded hover:bg-gray-100`}
                    >
                      {supervisor.name} - {supervisor.email}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {/* <div className="space-y-4">
          <div>
            <Label htmlFor="supervisor">Select Supervisor</Label>
            <Select
              id="supervisor"
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
            >
              <option value="">Choose a supervisor...</option>
              {mockSupervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name} - {supervisor.specialty}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div> */}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={loadingSendSupervisorsRequest || !searchValue}
            onClick={handleSubmit}
          >
            {loadingSendSupervisorsRequest ? "Sending..." : "Send Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
