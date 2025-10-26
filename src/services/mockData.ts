import { Group, Project, SupervisorRequest, Submission, Message, Notification, Supervisor, User } from '../types';

// Mock Groups
export const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'AI Researchers',
    description: 'Working on machine learning project',
    leaderId: '1',
    members: [
      { id: '1', name: 'John Doe', email: 'student@test.com' },
      { id: '4', name: 'Alice Johnson', email: 'alice@test.com' },
      { id: '5', name: 'Bob Wilson', email: 'bob@test.com' },
    ],
    supervisorId: '2',
    projectId: 'p1',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15').toISOString(),
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'AI-Powered Recommendation System',
    description: 'Building an intelligent recommendation system using machine learning',
    groupId: 'g1',
    supervisorId: '2',
    status: 'IN_PROGRESS',
    progress: 45,
    milestones: [
      {
        id: 'm1',
        title: 'Project Proposal',
        description: 'Submit initial project proposal',
        status: 'COMPLETED',
        dueDate: '2024-02-01',
        hasSubmission: true,
        needsReview: false,
      },
      {
        id: 'm2',
        title: 'Literature Review',
        description: 'Review existing research papers',
        status: 'COMPLETED',
        dueDate: '2024-02-28',
        hasSubmission: true,
        needsReview: false,
      },
      {
        id: 'm3',
        title: 'System Design',
        description: 'Design system architecture',
        status: 'IN_PROGRESS',
        dueDate: '2024-03-15',
        hasSubmission: false,
        needsReview: false,
      },
      {
        id: 'm4',
        title: 'Implementation',
        description: 'Implement the core system',
        status: 'PENDING',
        dueDate: '2024-04-30',
        hasSubmission: false,
        needsReview: false,
      },
      {
        id: 'm5',
        title: 'Final Report',
        description: 'Write final documentation',
        status: 'PENDING',
        dueDate: '2024-05-31',
        hasSubmission: false,
        needsReview: false,
      },
    ],
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Supervisors
export const mockSupervisors: Supervisor[] = [
  {
    id: '2',
    name: 'Dr. Sarah Smith',
    email: 'supervisor@test.com',
    specialty: 'Machine Learning',
    maxProjects: 5,
    currentProjects: 2,
    availability: 'AVAILABLE',
  },
  {
    id: '6',
    name: 'Dr. Michael Chen',
    email: 'michael@test.com',
    specialty: 'Web Development',
    maxProjects: 4,
    currentProjects: 1,
    availability: 'AVAILABLE',
  },
  {
    id: '7',
    name: 'Dr. Emily Brown',
    email: 'emily@test.com',
    specialty: 'Data Science',
    maxProjects: 6,
    currentProjects: 3,
    availability: 'LIMITED',
  },
];

// Mock Supervisor Requests
export const mockSupervisorRequests: SupervisorRequest[] = [
  {
    id: 'sr1',
    groupId: 'g1',
    supervisorId: '2',
    projectTitle: 'AI-Powered Recommendation System',
    projectDescription: 'Building an intelligent recommendation system',
    status: 'APPROVED',
    requestedAt: new Date('2024-01-22').toISOString(),
    respondedAt: new Date('2024-01-23').toISOString(),
  },
];

// Mock Submissions
export const mockSubmissions: Submission[] = [
  {
    id: 'sub1',
    milestoneId: 'm1',
    groupId: 'g1',
    fileName: 'proposal.pdf',
    fileUrl: '#',
    fileSize: 1024000,
    status: 'APPROVED',
    uploadedAt: new Date('2024-01-31').toISOString(),
    comments: [
      {
        id: 'c1',
        author: 'Dr. Sarah Smith',
        authorId: '2',
        text: 'Excellent proposal! Clear objectives and methodology.',
        date: new Date('2024-02-01').toISOString(),
      },
    ],
  },
  {
    id: 'sub2',
    milestoneId: 'm2',
    groupId: 'g1',
    fileName: 'literature_review.pdf',
    fileUrl: '#',
    fileSize: 2048000,
    status: 'APPROVED',
    uploadedAt: new Date('2024-02-27').toISOString(),
    comments: [],
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    groupId: 'g1',
    senderId: '1',
    senderName: 'John Doe',
    content: 'Hey team! I\'ve uploaded the proposal draft.',
    timestamp: new Date('2024-01-28T10:30:00').toISOString(),
    isRead: true,
  },
  {
    id: 'msg2',
    groupId: 'g1',
    senderId: '4',
    senderName: 'Alice Johnson',
    content: 'Great work! Let me review it and add my sections.',
    timestamp: new Date('2024-01-28T11:15:00').toISOString(),
    isRead: true,
  },
  {
    id: 'msg3',
    groupId: 'g1',
    senderId: '5',
    senderName: 'Bob Wilson',
    content: 'I\'ll work on the literature review section.',
    timestamp: new Date('2024-01-28T12:00:00').toISOString(),
    isRead: true,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    type: 'COMMENT',
    content: 'Dr. Sarah Smith commented on your submission',
    relatedId: 'sub1',
    isRead: false,
    createdAt: new Date('2024-02-01T09:00:00').toISOString(),
  },
  {
    id: 'n2',
    userId: '1',
    type: 'REQUEST',
    content: 'Supervisor request approved',
    relatedId: 'sr1',
    isRead: false,
    createdAt: new Date('2024-01-23T14:30:00').toISOString(),
  },
  {
    id: 'n3',
    userId: '1',
    type: 'MILESTONE',
    content: 'Milestone "System Design" due in 5 days',
    relatedId: 'm3',
    isRead: true,
    createdAt: new Date('2024-03-10T08:00:00').toISOString(),
  },
];

// Storage keys
const STORAGE_KEYS = {
  GROUPS: 'platform_groups',
  PROJECTS: 'platform_projects',
  REQUESTS: 'platform_requests',
  SUBMISSIONS: 'platform_submissions',
  MESSAGES: 'platform_messages',
  NOTIFICATIONS: 'platform_notifications',
};

// Initialize localStorage with mock data
export const initializeMockData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.GROUPS)) {
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(mockGroups));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mockProjects));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(mockSupervisorRequests));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(mockSubmissions));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mockMessages));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mockNotifications));
  }
};

// Helper functions to get data from localStorage
export const getGroups = (): Group[] => {
  const data = localStorage.getItem(STORAGE_KEYS.GROUPS);
  return data ? JSON.parse(data) : [];
};

export const getProjects = (): Project[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return data ? JSON.parse(data) : [];
};

export const getRequests = (): SupervisorRequest[] => {
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  return data ? JSON.parse(data) : [];
};

export const getSubmissions = (): Submission[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
  return data ? JSON.parse(data) : [];
};

export const getMessages = (groupId: string): Message[] => {
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  const messages = data ? JSON.parse(data) : [];
  return messages.filter((m: Message) => m.groupId === groupId);
};

export const getNotifications = (userId: string): Notification[] => {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  const notifications = data ? JSON.parse(data) : [];
  return notifications.filter((n: Notification) => n.userId === userId);
};

// Mock Users (exported for admin dashboard)
export const mockUsersForAdmin: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@test.com',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '4',
    name: 'Alice Johnson',
    email: 'alice@test.com',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-05').toISOString(),
  },
  {
    id: '5',
    name: 'Bob Wilson',
    email: 'bob@test.com',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-06').toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Sarah Smith',
    email: 'supervisor@test.com',
    role: 'SUPERVISOR',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@test.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01').toISOString(),
  },
];

export { STORAGE_KEYS };

