import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { Group } from '../types';
import { useGet } from './useApi';

export function useGroups() {
  const getGroups = useCallback(async () => {
    const response = await api.get<{ success: boolean; data: Group[] }>('/groups');
    return response.data.data;
  }, []);

  const getMyGroup = useCallback(async () => {
    const response = await api.get<{ success: boolean; data: Group }>('/groups/my-group');
    return response.data.data;
  }, []);

  const createGroup = useCallback(async (data: { name: string; description: string }) => {
    const response = await api.post<{ success: boolean; data: Group }>('/groups', data);
    return response.data.data;
  }, []);

  const addMember = useCallback(async (groupId: string, email: string) => {
    const response = await api.post<{ success: boolean; data: Group }>(
      `/groups/${groupId}/members`,
      { email }
    );
    return response.data.data;
  }, []);

  const removeMember = useCallback(async (groupId: string, memberId: string) => {
    const response = await api.delete<{ success: boolean }>(`/groups/${groupId}/members/${memberId}`);
    return response.data.success;
  }, []);

  return {
    getGroups,
    getMyGroup,
    createGroup,
    addMember,
    removeMember,
  };
}

export function useGroup(groupId: string) {
  const { data, loading, error, execute } = useGet<Group>(`/groups/${groupId}`);

  return {
    group: data,
    loading,
    error,
    refetch: execute,
  };
}

export function useCreateGroup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: { name: string; description: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<{ success: boolean; data: Group }>('/groups', data);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to create group');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useMyGroup() {
  const { data, loading, error, execute } = useGet<Group>('/groups/my-group');
  
  return {
    group: data,
    loading,
    error,
    refetch: execute,
  };
}

