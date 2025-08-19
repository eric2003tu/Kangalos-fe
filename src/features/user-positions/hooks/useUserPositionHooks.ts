import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUserPosition,
  getUserPositions,
  getPositionsForUser,
  getUsersForPosition,
  updateUserPosition,
  updateUserPositionByQuery,
  deleteUserPosition,
  deleteUserPositionByQuery,
} from '../services/userPositionServices';
import type {
  CreateUserPositionRequest,
  UpdateUserPositionRequest,
  GetUserPositionsRequest,
} from '../types/userPositionTypes';
import toast from 'react-hot-toast';

export const useUserPositions = (params?: GetUserPositionsRequest) => {
  return useQuery({
    queryKey: ['user-positions', params],
    queryFn: () => getUserPositions(params),
  });
};

export const usePositionsForUser = (
  userId: string,
  params?: GetUserPositionsRequest,
) => {
  return useQuery({
    queryKey: ['user-positions', 'user', userId, params],
    queryFn: () => getPositionsForUser(userId, params),
    enabled: !!userId,
  });
};

export const useUsersForPosition = (
  positionId: string,
  params?: GetUserPositionsRequest,
) => {
  return useQuery({
    queryKey: ['user-positions', 'position', positionId, params],
    queryFn: () => getUsersForPosition(positionId, params),
    enabled: !!positionId,
  });
};

export const useCreateUserPosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserPositionRequest) => createUserPosition(data),
    onSuccess: () => {
      toast.success('Assignment created successfully');
      queryClient.invalidateQueries({ queryKey: ['user-positions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create assignment');
    },
  });
};

export const useUpdateUserPosition = (
  userId: string,
  positionId: string,
  startDate: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserPositionRequest) =>
      updateUserPosition(userId, positionId, startDate, data),
    onSuccess: () => {
      toast.success('Assignment updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user-positions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update assignment');
    },
  });
};

export const useUpdateUserPositionByQuery = (
  userId: string,
  positionId: string,
  startDate: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserPositionRequest) =>
      updateUserPositionByQuery(userId, positionId, startDate, data),
    onSuccess: () => {
      toast.success('Assignment updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user-positions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update assignment');
    },
  });
};

export const useDeleteUserPosition = (
  userId: string,
  positionId: string,
  startDate: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUserPosition(userId, positionId, startDate),
    onSuccess: () => {
      toast.success('Assignment removed successfully');
      queryClient.invalidateQueries({ queryKey: ['user-positions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete assignment');
    },
  });
};

export const useDeleteUserPositionByQuery = (
  userId: string,
  positionId: string,
  startDate: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUserPositionByQuery(userId, positionId, startDate),
    onSuccess: () => {
      toast.success('Assignment removed successfully');
      queryClient.invalidateQueries({ queryKey: ['user-positions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete assignment');
    },
  });
};
