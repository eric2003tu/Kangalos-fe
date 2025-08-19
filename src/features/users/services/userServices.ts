import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  User,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  AssignRoleToUserRequest,
  SearchUserRequest,
  SearchUserResponse,
  UserType,
} from '../types/userTypes';

export const createUser = async (
  data: CreateUserRequest,
): Promise<CreateUserResponse> => {
  try {
    const res = await axiosInstance.post('/users', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to create user'));
  }
};

export const getUsers = async (
  params?: SearchUserRequest,
): Promise<SearchUserResponse> => {
  try {
    const res = await axiosInstance.get('/users', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch users'));
  }
};

export const searchUsers = async (
  params?: SearchUserRequest,
): Promise<SearchUserResponse> => {
  try {
    const res = await axiosInstance.get('/users/search', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to search users'));
  }
};

export const getUsersByType = async (
  userType: UserType,
  params?: SearchUserRequest,
): Promise<SearchUserResponse> => {
  try {
    const res = await axiosInstance.get(`/users/by-type/${userType}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch users'));
  }
};

export const getUsersByOrganisationUnit = async (
  orgUnitId: string,
  params?: SearchUserRequest,
): Promise<SearchUserResponse> => {
  try {
    const res = await axiosInstance.get(`/users/by-org-unit/${orgUnitId}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch users'));
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const res = await axiosInstance.get('/users/me');
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch user'));
  }
};

export const updateCurrentUser = async (
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> => {
  try {
    const res = await axiosInstance.put('/users/me', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update user'));
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch user'));
  }
};

export const updateUser = async (
  id: string,
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> => {
  try {
    const res = await axiosInstance.patch(`/users/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update user'));
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete user'));
  }
};

export const getUserRoles = async (id: string): Promise<SearchUserResponse> => {
  try {
    const res = await axiosInstance.get(`/users/${id}/roles`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch roles'));
  }
};

export const assignRoleToUser = async (
  id: string,
  data: AssignRoleToUserRequest,
): Promise<void> => {
  try {
    await axiosInstance.post(`/users/${id}/roles`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to assign role'));
  }
};

export const removeRoleFromUser = async (
  id: string,
  roleId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}/roles/${roleId}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to remove role'));
  }
};

export const getUserPositions = async (
  id: string,
  params?: SearchUserRequest,
): Promise<SearchUserResponse> => {
  try {
    const res = await axiosInstance.get(`/users/${id}/positions`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch positions'));
  }
};

export const getUserProjects = async (id: string): Promise<SearchUserResponse> => {
  try {
    const res = await axiosInstance.get(`/users/${id}/projects`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch projects'));
  }
};
