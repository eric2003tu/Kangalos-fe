import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getProjectSdgs,
  getSdgsForProject,
  addSdgToProject,
  removeSdgFromProject,
  getProjectsBySdg,
  getSdgStatistics,
  getSdgCoverage,
} from '../services/sdgServices';
import type { CreateProjectSdgRequest } from '../types/sdgTypes';
import toast from 'react-hot-toast';

export const useProjectSdgs = () => {
  return useQuery({
    queryKey: ['project-sdgs'],
    queryFn: () => getProjectSdgs(),
  });
};

export const useSdgsForProject = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId, 'sdgs'],
    queryFn: () => getSdgsForProject(projectId),
    enabled: !!projectId,
  });
};

export const useAddSdgToProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectSdgRequest) =>
      addSdgToProject(projectId, data),
    onSuccess: () => {
      toast.success('SDG added');
      queryClient.invalidateQueries({ queryKey: ['project', projectId, 'sdgs'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add SDG');
    },
  });
};

export const useRemoveSdgFromProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sdgId: string) => removeSdgFromProject(projectId, sdgId),
    onSuccess: () => {
      toast.success('SDG removed');
      queryClient.invalidateQueries({ queryKey: ['project', projectId, 'sdgs'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove SDG');
    },
  });
};

export const useProjectsBySdg = (sdgId: string) => {
  return useQuery({
    queryKey: ['sdg', sdgId, 'projects'],
    queryFn: () => getProjectsBySdg(sdgId),
    enabled: !!sdgId,
  });
};

export const useSdgStatistics = () => {
  return useQuery({
    queryKey: ['sdg', 'statistics'],
    queryFn: () => getSdgStatistics(),
  });
};

export const useSdgCoverage = () => {
  return useQuery({
    queryKey: ['sdg', 'coverage'],
    queryFn: () => getSdgCoverage(),
  });
};
