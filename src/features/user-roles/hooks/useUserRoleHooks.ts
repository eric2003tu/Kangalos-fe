import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUserRole,
  getUserRoles,
  getRolesForUser,
  getUsersForRole,
  deleteUserRole,
} from '../services/userRoleServices';
import type {
  CreateUserRoleRequest,
  GetUserRolesRequest,
} from '../types/userRoleTypes';
import toast from 'react-hot-toast';

export const useUserRoles = (params?: GetUserRolesRequest) => {
  return useQuery({
    queryKey: ['user-roles', params],
    queryFn: () => getUserRoles(params),
  });
};

export const useRolesForUser = (
  userId: string,
  params?: GetUserRolesRequest,
) => {
  return useQuery({
    queryKey: ['user-roles', 'user', userId, params],
    queryFn: () => getRolesForUser(userId, params),
    enabled: !!userId,
  });
};

export const useUsersForRole = (
  roleId: string,
  params?: GetUserRolesRequest,
) => {
  return useQuery({
    queryKey: ['user-roles', 'role', roleId, params],
    queryFn: () => getUsersForRole(roleId, params),
    enabled: !!roleId,
  });
};

export const useCreateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserRoleRequest) => createUserRole(data),
    onSuccess: () => {
      toast.success('Role assigned successfully');
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to assign role');
    },
  });
};

export const useDeleteUserRole = (userId: string, roleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUserRole(userId, roleId),
    onSuccess: () => {
      toast.success('Role removed successfully');
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove role');
    },
  });
};
