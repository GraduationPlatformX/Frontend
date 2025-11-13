import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { Submission } from '../types';

export function useSubmissions() {
  const getSubmissions = useCallback(async () => {
    const response = await api.get<{ success: boolean; data: Submission[] }>('/submissions');
    return response.data.data;
  }, []);

  const getSubmissionById = useCallback(async (id: string) => {
    const response = await api.get<{ success: boolean; data: Submission }>(`/submissions/${id}`);
    return response.data.data;
  }, []);

  return {
    getSubmissions,
    getSubmissionById,
  };
}

export function useUploadSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File, milestoneId: string, groupId: string) => {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('milestoneId', milestoneId);
      formData.append('groupId', groupId);

      try {
        const response = await api.post<{ success: boolean; data: Submission }>(
          '/submissions',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data.data;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message || 'Failed to upload submission';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { upload, loading, error };
}

export function useApproveSubmission(submissionId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approve = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put<{ success: boolean; data: Submission }>(
        `/submissions/${submissionId}/approve`
      );
      return response.data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to approve submission';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [submissionId]);

  return { approve, loading, error };
}

export function useRejectSubmission(submissionId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reject = useCallback(async (feedback: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put<{ success: boolean; data: Submission }>(
        `/submissions/${submissionId}/reject`,
        { feedback }
      );
      return response.data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to reject submission';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [submissionId]);

  return { reject, loading, error };
}

export function useAddSubmissionComment(submissionId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = useCallback(async (text: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<{ success: boolean; data: any }>(
        `/submissions/${submissionId}/comments`,
        { text }
      );
      return response.data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to add comment';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [submissionId]);

  return { addComment, loading, error };
}

