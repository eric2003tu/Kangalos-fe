import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  getRolePermissions,
  assignPermissionToRole,
  removePermissionFromRole,
} from '../services/roleServices';
import type {
  CreateRoleRequest,
  UpdateRoleRequest,
  QueryRoleRequest,
  AssignPermissionRequest,
} from '../types/roleTypes';
import toast from 'react-hot-toast';

export const useRoles = (params?: QueryRoleRequest) => {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => getRoles(params),
  });
};

export const useRole = (id: string) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => getRole(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleRequest) => createRole(data),
    onSuccess: () => {
      toast.success('Role created successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create role');
    },
  });
};

export const useUpdateRole = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRoleRequest) => updateRole(id, data),
    onSuccess: () => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update role');
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      toast.success('Role deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete role');
    },
  });
};

export const useRolePermissions = (id: string) => {
  return useQuery({
    queryKey: ['role', id, 'permissions'],
    queryFn: () => getRolePermissions(id),
    enabled: !!id,
  });
};

export const useAssignPermissionToRole = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignPermissionRequest) =>
      assignPermissionToRole(id, data),
    onSuccess: () => {
      toast.success('Permission assigned');
      queryClient.invalidateQueries({ queryKey: ['role', id, 'permissions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to assign permission');
    },
  });
};

export const useRemovePermissionFromRole = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (permissionId: string) =>
      removePermissionFromRole(id, permissionId),
    onSuccess: () => {
      toast.success('Permission removed');
      queryClient.invalidateQueries({ queryKey: ['role', id, 'permissions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove permission');
    },
  });
};
