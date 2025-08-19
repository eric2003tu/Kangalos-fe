import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getStartups,
  getStartup,
  createStartup,
  updateStartup,
  deleteStartup,
  getStartupByProject,
  getRegisteredStartups,
  getStartupsByYear,
} from '../services/startupServices';
import type {
  CreateStartupRequest,
  UpdateStartupRequest,
  QueryStartupRequest,
} from '../types/startupTypes';
import toast from 'react-hot-toast';

export const useStartups = (params?: QueryStartupRequest) => {
  return useQuery({
    queryKey: ['startups', params],
    queryFn: () => getStartups(params),
  });
};

export const useStartup = (id: string) => {
  return useQuery({
    queryKey: ['startup', id],
    queryFn: () => getStartup(id),
    enabled: !!id,
  });
};

export const useCreateStartup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStartupRequest) => createStartup(data),
    onSuccess: () => {
      toast.success('Startup created successfully');
      queryClient.invalidateQueries({ queryKey: ['startups'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create startup');
    },
  });
};

export const useUpdateStartup = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateStartupRequest) => updateStartup(id, data),
    onSuccess: () => {
      toast.success('Startup updated successfully');
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      queryClient.invalidateQueries({ queryKey: ['startup', id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update startup');
    },
  });
};

export const useDeleteStartup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStartup(id),
    onSuccess: () => {
      toast.success('Startup deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['startups'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete startup');
    },
  });
};

export const useStartupByProject = (projectId: string) => {
  return useQuery({
    queryKey: ['startup', 'project', projectId],
    queryFn: () => getStartupByProject(projectId),
    enabled: !!projectId,
  });
};

export const useRegisteredStartups = () => {
  return useQuery({
    queryKey: ['startups', 'registered'],
    queryFn: getRegisteredStartups,
  });
};

export const useStartupsByYear = (year: number) => {
  return useQuery({
    queryKey: ['startups', 'year', year],
    queryFn: () => getStartupsByYear(year),
    enabled: !!year,
  });
};
