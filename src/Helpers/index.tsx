import {
  Role,
  GroupRole,
  RequestStatus,
  GroupStatus,
  ProjectStatus,
  MilestoneStatus,
  NotificationType,
  SubmissionStatus,
  Milestone, Submission
} from "@/types"; // adjust path if needed

type BadgeVariant = "default" | "secondary" | "success" | "error" | "warning" | "outline" | undefined;

export function getBadgeVariant(value: string): BadgeVariant {
  switch (value) {
    // Roles
    case Role.STUDENT:
      return "default";
    case Role.ADMIN:
      return "success";
    case Role.SUPERVISOR:
      return "secondary";

    // Group Roles
    case GroupRole.LEADER:
      return "success";
    case GroupRole.MEMBER:
      return "outline";

    // Request Status
    case RequestStatus.PENDING:
      return "warning";
    case RequestStatus.ACCEPTED:
      return "success";
    case RequestStatus.REJECTED:
      return "error";

    // Group Status
    case GroupStatus.OPEN:
      return "success";
    case GroupStatus.CLOSED:
      return "secondary";
    case GroupStatus.PENDING:
      return "warning";

    // Project Status
    case ProjectStatus.DRAFT:
      return "outline";
    case ProjectStatus.SUBMITTED:
      return "default";
    case ProjectStatus.IN_REVIEW:
      return "warning";
    case ProjectStatus.APPROVED:
      return "success";
    case ProjectStatus.REJECTED:
      return "error";
    case ProjectStatus.COMPLETED:
      return "secondary";

    // Milestone Status
    case MilestoneStatus.PENDING:
      return "warning";
    case MilestoneStatus.SUBMITTED:
      return "default";
    case MilestoneStatus.REVIEWED:
      return "secondary";
    case MilestoneStatus.COMPLETED:
      return "success";

    // Notification Type
    case NotificationType.COMMENT:
      return "default";
    case NotificationType.REQUEST:
      return "warning";
    case NotificationType.SUBMISSION:
      return "success";
    case NotificationType.MILESTONE:
      return "secondary";
    case NotificationType.GROUP:
      return "outline";

    // Submission Status
    case SubmissionStatus.PENDING:
      return "warning";
    case SubmissionStatus.APPROVED:
      return "success";
    case SubmissionStatus.REJECTED:
      return "error";

    default:
      return "secondary";
  }
}


export const getLastSubmissions = (milestones: Milestone[]) => {
  // 1) flatten all submissions to one array
  const allSubs: Submission[] = milestones.flatMap(
    (m: Milestone) => m.submissions ?? []
  );

  // 2) sort newest first
  const sorted = allSubs.sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  // 3) take top 3
  return sorted.slice(0, 3);
};

export const getProjectProgress = (milestones: Milestone[]) => {
  if (milestones.length === 0) return 0;
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(
    (m) => m.status === "COMPLETED"
  ).length;
  return Math.round((completedMilestones / totalMilestones) * 100);
};
