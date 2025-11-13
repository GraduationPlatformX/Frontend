import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { SupervisorRequest, Supervisor } from '../types';

export function useSupervisorRequests() {
  const getRequests = useCallback(async () => {
    const response = await api.get<{ success: boolean; data: SupervisorRequest[] }>(
      '/supervisor-requests'
    );
    return response.data.data;
  }, []);

  const createRequest = useCallback(
    async (data: { supervisorId: string; projectTitle: string; projectDescription: string }) => {
      const response = await api.post<{ success: boolean; data: SupervisorRequest }>(
        '/supervisor-requests',
        data
      );
      return response.data.data;
    },
    []
  );

  return {
    getRequests,
    createRequest,
  };
}

export function useSupervisors() {
  const getSupervisors = useCallback(async () => {
    const response = await api.get<{ success: boolean; data: Supervisor[] }>('/supervisors');
    return response.data.data;
  }, []);

  return {
    getSupervisors,
  };
}

export function useApproveRequest(requestId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approve = useCallback(async (feedback?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put<{ success: boolean; data: SupervisorRequest }>(
        `/supervisor-requests/${requestId}/approve`,
        { feedback }
      );
      return response.data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to approve request';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  return { approve, loading, error };
}

export function useRejectRequest(requestId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reject = useCallback(async (rejectionReason: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put<{ success: boolean; data: SupervisorRequest }>(
        `/supervisor-requests/${requestId}/reject`,
        { rejectionReason }
      );
      return response.data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to reject request';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  return { reject, loading, error };
}

