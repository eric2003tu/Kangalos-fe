import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  CreateUserRoleRequest,
  CreateUserRoleResponse,
  GetUserRolesRequest,
  GetUserRolesResponse,
} from '../types/userRoleTypes';

export const createUserRole = async (
  data: CreateUserRoleRequest,
): Promise<CreateUserRoleResponse> => {
  try {
    const res = await axiosInstance.post('/user-roles', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to assign role'));
  }
};

export const getUserRoles = async (
  params?: GetUserRolesRequest,
): Promise<GetUserRolesResponse> => {
  try {
    const res = await axiosInstance.get('/user-roles', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch assignments'));
  }
};

export const getRolesForUser = async (
  userId: string,
  params?: GetUserRolesRequest,
): Promise<GetUserRolesResponse> => {
  try {
    const res = await axiosInstance.get(`/user-roles/user/${userId}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch assignments'));
  }
};

export const getUsersForRole = async (
  roleId: string,
  params?: GetUserRolesRequest,
): Promise<GetUserRolesResponse> => {
  try {
    const res = await axiosInstance.get(`/user-roles/role/${roleId}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch assignments'));
  }
};

export const deleteUserRole = async (
  userId: string,
  roleId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/user-roles/${userId}/${roleId}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete assignment'));
  }
};
