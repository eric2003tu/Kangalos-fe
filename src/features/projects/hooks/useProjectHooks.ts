import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getProjects,
  searchProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../services/projectServices';
import type {
  CreateProjectRequest,
  UpdateProjectRequest,
  QueryProjectRequest,
} from '../types/projectTypes';
import toast from 'react-hot-toast';

export const useProjects = (params?: QueryProjectRequest) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => getProjects(params),
  });
};

export const useSearchProjects = (params?: QueryProjectRequest) => {
  return useQuery({
    queryKey: ['projects', 'search', params],
    queryFn: () => searchProjects(params),
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectRequest) => createProject(data),
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create project');
    },
  });
};

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectRequest) => updateProject(id, data),
    onSuccess: () => {
      toast.success('Project updated successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      toast.success('Project deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete project');
    },
  });
};
