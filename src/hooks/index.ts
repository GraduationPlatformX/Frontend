// Main API hook
export { useApi, useGet, usePost, usePut, useDelete, usePatch } from './useApi';
export type { ApiResponse, UseApiOptions, UseApiReturn } from './useApi';

// Authentication

// Groups
export { useGroups, useGroup, useCreateGroup, useMyGroup } from './useGroups';

// Projects
export { useProjects, useProject, useMyProject } from './useProjects';

// Submissions
export {
  useSubmissions,
  useUploadSubmission,
  useApproveSubmission,
  useRejectSubmission,
  useAddSubmissionComment,
} from './useSubmissions';

// Messages
export { useMessages } from './useMessages';

// Supervisor Requests
export {
  useSupervisorRequests,
  useSupervisors,
  useApproveRequest,
  useRejectRequest,
} from './useSupervisorRequests';

// Notifications
export { useNotifications } from './useNotifications';

