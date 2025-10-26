// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'SUPERVISOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

// Group Model
export interface Group {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  members: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  supervisorId?: string;
  projectId?: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
  createdAt: string;
}

// Project Model
export interface Project {
  id: string;
  title: string;
  description: string;
  groupId: string;
  supervisorId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    dueDate: string;
    hasSubmission: boolean;
    needsReview: boolean;
  }>;
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

// Supervisor Request Model
export interface SupervisorRequest {
  id: string;
  groupId: string;
  supervisorId: string;
  projectTitle: string;
  projectDescription: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  respondedAt?: string;
  rejectionReason?: string;
}

// Submission Model
export interface Submission {
  id: string;
  milestoneId: string;
  groupId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  uploadedAt: string;
  comments: Array<{
    id: string;
    author: string;
    authorId: string;
    text: string;
    date: string;
  }>;
}

// Chat Message Model
export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

// Notification Model
export interface Notification {
  id: string;
  userId: string;
  type: 'COMMENT' | 'REQUEST' | 'SUBMISSION' | 'MILESTONE' | 'GROUP';
  content: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

// Supervisor Model
export interface Supervisor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  maxProjects: number;
  currentProjects: number;
  availability: 'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE';
}

// Milestone Status Types
export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type SubmissionStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

