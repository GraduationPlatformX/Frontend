import { useState } from "react";
import { Crown, UserPlus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { Avatar } from "./ui/avatar";
import { useAuth } from "../contexts/AuthContext";
import { Group, GroupMember } from "@/types";
import { DeleteGroupMemberDialog } from "./DeleteGroupMemberDialog";
import { InviteGroupMemberDialog } from "./Dialogs/InviteGroupMemberDialog";
import { JoinGroupByCodeDialog } from "./Dialogs/JoinGroupByCodeDialog";
import { CreateGroupDialog } from "./Dialogs/CreateGroupDialog";

export function GroupManagement({
  userGroup,
}: {
  userGroup: Group | undefined;
}) {
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!userGroup) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create or Join a Group</CardTitle>
            <CardDescription>
              Form a group of 2-6 members to start your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="w-full"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create New Group
            </Button>
            <Button
              onClick={() => setIsJoinDialogOpen(true)}
              variant="outline"
              className="w-full"
            >
              Join Existing Group
            </Button>
          </CardContent>
        </Card>

        <CreateGroupDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />

        <JoinGroupByCodeDialog
          open={isJoinDialogOpen}
          onOpenChange={setIsJoinDialogOpen}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{userGroup.name}</CardTitle>
            <CardDescription>{userGroup.description}</CardDescription>
          </div>
          <Badge>{userGroup?.members?.length ?? 0} members</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {userGroup.createdById === user?.id && (
            <Button
              size="sm"
              onClick={() => setIsAddMemberDialogOpen(true)}
              disabled={userGroup.members.length >= userGroup.maxMembers}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Group Members</h4>
          {userGroup?.members?.map((member: GroupMember) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <DeleteGroupMemberDialog
                group={userGroup!}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                userId={member.student.id}
              />
              <div className="flex items-center gap-3">
                <Avatar name={member.student.name} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{member.student.name}</p>
                    {member.role === "LEADER" && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {member.student.email}
                  </p>
                </div>
              </div>
              {userGroup.createdById === user?.id &&
                member.role !== "LEADER" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
            </div>
          ))}
        </div>
      </CardContent>

      <InviteGroupMemberDialog
        group={userGroup}
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
      />
    </Card>
  );
}
