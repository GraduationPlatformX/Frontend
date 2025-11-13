import { useCallback } from 'react';
import { api } from '../services/api';
import { Project } from '../types';
import { useGet } from './useApi';

export function useProjects() {
  const getProjects = useCallback(async () => {
    const response = await api.get<{ success: boolean; data: Project[] }>('/projects');
    return response.data.data;
  }, []);

  const getMyProject = useCallback(async () => {
    const response = await api.get<{ success: boolean; data: Project }>('/projects/my-project');
    return response.data.data;
  }, []);

  const getProjectById = useCallback(async (id: string) => {
    const response = await api.get<{ success: boolean; data: Project }>(`/projects/${id}`);
    return response.data.data;
  }, []);

  return {
    getProjects,
    getMyProject,
    getProjectById,
  };
}

export function useProject(projectId: string) {
  const { data, loading, error, execute } = useGet<Project>(`/projects/${projectId}`);

  return {
    project: data,
    loading,
    error,
    refetch: execute,
  };
}

export function useMyProject() {
  const { data, loading, error, execute } = useGet<Project>('/projects/my-project');

  return {
    project: data,
    loading,
    error,
    refetch: execute,
  };
}

