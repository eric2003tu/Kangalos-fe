import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getStakeholders,
  getStakeholdersByType,
  getStakeholdersByOrganisationUnit,
  getStakeholderProjects,
  getStakeholder,
  createStakeholder,
  updateStakeholder,
  patchStakeholder,
  deleteStakeholder,
} from '../services/stakeholderServices';
import type {
  CreateStakeholderRequest,
  UpdateStakeholderRequest,
  QueryStakeholderRequest,
} from '../types/stakeholderTypes';
import toast from 'react-hot-toast';

export const useStakeholders = (params?: QueryStakeholderRequest) => {
  return useQuery({
    queryKey: ['stakeholders', params],
    queryFn: () => getStakeholders(params),
  });
};

export const useStakeholdersByType = (type: string) => {
  return useQuery({
    queryKey: ['stakeholders', 'type', type],
    queryFn: () => getStakeholdersByType(type),
    enabled: !!type,
  });
};

export const useStakeholdersByOrganisationUnit = (orgUnitId: string) => {
  return useQuery({
    queryKey: ['stakeholders', 'org-unit', orgUnitId],
    queryFn: () => getStakeholdersByOrganisationUnit(orgUnitId),
    enabled: !!orgUnitId,
  });
};

export const useStakeholderProjects = (id: string) => {
  return useQuery({
    queryKey: ['stakeholder', id, 'projects'],
    queryFn: () => getStakeholderProjects(id),
    enabled: !!id,
  });
};

export const useStakeholder = (id: string) => {
  return useQuery({
    queryKey: ['stakeholder', id],
    queryFn: () => getStakeholder(id),
    enabled: !!id,
  });
};

export const useCreateStakeholder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStakeholderRequest) => createStakeholder(data),
    onSuccess: () => {
      toast.success('Stakeholder created successfully');
      queryClient.invalidateQueries({ queryKey: ['stakeholders'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create stakeholder');
    },
  });
};

export const useUpdateStakeholder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateStakeholderRequest) => updateStakeholder(id, data),
    onSuccess: () => {
      toast.success('Stakeholder updated successfully');
      queryClient.invalidateQueries({ queryKey: ['stakeholders'] });
      queryClient.invalidateQueries({ queryKey: ['stakeholder', id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update stakeholder');
    },
  });
};

export const usePatchStakeholder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateStakeholderRequest) => patchStakeholder(id, data),
    onSuccess: () => {
      toast.success('Stakeholder updated successfully');
      queryClient.invalidateQueries({ queryKey: ['stakeholders'] });
      queryClient.invalidateQueries({ queryKey: ['stakeholder', id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update stakeholder');
    },
  });
};

export const useDeleteStakeholder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStakeholder(id),
    onSuccess: () => {
      toast.success('Stakeholder deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['stakeholders'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete stakeholder');
    },
  });
};
