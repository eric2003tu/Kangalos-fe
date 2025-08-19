import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  getUsers,
  searchUsers,
  getUsersByType,
  getUsersByOrganisationUnit,
  getCurrentUser,
  updateCurrentUser,
  getUser,
  updateUser,
  deleteUser,
  getUserRoles,
  assignRoleToUser,
  removeRoleFromUser,
  getUserPositions,
  getUserProjects,
} from '../services/userServices';
import type {
  CreateUserRequest,
  UpdateUserRequest,
  AssignRoleToUserRequest,
  SearchUserRequest,
  UserType,
} from '../types/userTypes';
import toast from 'react-hot-toast';

export const useUsers = (params?: SearchUserRequest) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
};

export const useSearchUsers = (params?: SearchUserRequest) => {
  return useQuery({
    queryKey: ['users', 'search', params],
    queryFn: () => searchUsers(params),
  });
};

export const useUsersByType = (
  userType: UserType,
  params?: SearchUserRequest,
) => {
  return useQuery({
    queryKey: ['users', 'type', userType, params],
    queryFn: () => getUsersByType(userType, params),
    enabled: !!userType,
  });
};

export const useUsersByOrganisationUnit = (
  orgUnitId: string,
  params?: SearchUserRequest,
) => {
  return useQuery({
    queryKey: ['users', 'orgUnit', orgUnitId, params],
    queryFn: () => getUsersByOrganisationUnit(orgUnitId, params),
    enabled: !!orgUnitId,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: getCurrentUser,
  });
};

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateCurrentUser(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: () => {
      toast.success('User created successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create user');
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateUser(id, data),
    onSuccess: () => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update user');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });
};

export const useUserRoles = (id: string) => {
  return useQuery({
    queryKey: ['user', id, 'roles'],
    queryFn: () => getUserRoles(id),
    enabled: !!id,
  });
};

export const useAssignRoleToUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignRoleToUserRequest) => assignRoleToUser(id, data),
    onSuccess: () => {
      toast.success('Role assigned successfully');
      queryClient.invalidateQueries({ queryKey: ['user', id, 'roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to assign role');
    },
  });
};

export const useRemoveRoleFromUser = (id: string, roleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeRoleFromUser(id, roleId),
    onSuccess: () => {
      toast.success('Role removed successfully');
      queryClient.invalidateQueries({ queryKey: ['user', id, 'roles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove role');
    },
  });
};

export const useUserPositions = (
  id: string,
  params?: SearchUserRequest,
) => {
  return useQuery({
    queryKey: ['user', id, 'positions', params],
    queryFn: () => getUserPositions(id, params),
    enabled: !!id,
  });
};

export const useUserProjects = (id: string) => {
  return useQuery({
    queryKey: ['user', id, 'projects'],
    queryFn: () => getUserProjects(id),
    enabled: !!id,
  });
};
