// types.ts

// ───────────────────── ENUMS ─────────────────────

export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR'
}

export enum GroupRole {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER'
}

export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum GroupStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  PENDING = "PENDING",
}

export enum ProjectStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export enum MilestoneStatus {
  PENDING = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  REVIEWED = "REVIEWED",
  COMPLETED = "COMPLETED",
}

export enum NotificationType {
  COMMENT = 'COMMENT',
  REQUEST = 'REQUEST',
  SUBMISSION = 'SUBMISSION',
  MILESTONE = 'MILESTONE',
  GROUP = 'GROUP'
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// ───────────────────── ENTITIES ─────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt?: Date;
  phone?: string;
  bio?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: number;
  name: string;
  description?: string;
  createdById: number;
  supervisorId?: number;
  maxMembers: number;
  status: GroupStatus;
  createdAt: Date;
  updatedAt: Date;

  createdBy: User;
  supervisor?: User;
  members: GroupMember[];
  project?: Project;
  chat?: GroupChat;
}

export interface GroupMember {
  id: number;
  groupId: number;
  studentId: number;
  role: GroupRole;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  group: Group;
  student: User;
}

export interface SupervisorRequest {
  id: number;
  groupId: number;
  supervisorId: number;
  status: RequestStatus;
  message?: string;
  requestedById?: number;
  createdAt: Date;
  updatedAt: Date;

  group: Group;
  supervisor: User;
  requestedBy?: User;
}

export interface GroupChat {
  id: number;
  groupId: number;
  createdAt: Date;
  updatedAt: Date;

  group: Group;
  messages: GroupChatMessage[];
}

export interface GroupChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  content?: string;
  createdAt: Date;

  chat: GroupChat;
  sender: User;
}

export interface Notification {
  id: number;
  userId: number;
  type?: NotificationType;
  message: string;
  meta?: any;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;

  user: User;
}

export interface Project {
  id: number;
  groupId: number;
  title: string;
  description?: string;
  technologies?: any;
  status: ProjectStatus;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;

  group: Group;
  milestones: Milestone[];
}

export interface Milestone {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  deadline?: Date;
  status: MilestoneStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  project: Project;
  submissions: Submission[];
}

export interface Submission {
  id: number;
  milestoneId: number;
  submittedBy: number;
  fileUrl: string;
  status: SubmissionStatus;
  notes?: string[];
  grade?: number;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  milestone: Milestone;
  student: User;
}
