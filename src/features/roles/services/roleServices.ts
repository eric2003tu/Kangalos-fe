import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  Role,
  CreateRoleRequest,
  CreateRoleResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
  QueryRoleRequest,
  RoleListResponse,
  AssignPermissionRequest,
  AssignPermissionResponse,
} from '../types/roleTypes';

export const getRoles = async (
  params?: QueryRoleRequest,
): Promise<RoleListResponse> => {
  try {
    const res = await axiosInstance.get('/roles', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch roles'));
  }
};

export const getRole = async (id: string): Promise<Role> => {
  try {
    const res = await axiosInstance.get(`/roles/${id}`);
    return res.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch role'));
  }
};

export const createRole = async (
  data: CreateRoleRequest,
): Promise<CreateRoleResponse> => {
  try {
    const res = await axiosInstance.post('/roles', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to create role'));
  }
};

export const updateRole = async (
  id: string,
  data: UpdateRoleRequest,
): Promise<UpdateRoleResponse> => {
  try {
    const res = await axiosInstance.patch(`/roles/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update role'));
  }
};

export const deleteRole = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/roles/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete role'));
  }
};

export const getRolePermissions = async (id: string): Promise<string[]> => {
  try {
    const res = await axiosInstance.get(`/roles/${id}/permissions`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch role permissions'));
  }
};

export const assignPermissionToRole = async (
  id: string,
  data: AssignPermissionRequest,
): Promise<AssignPermissionResponse> => {
  try {
    const res = await axiosInstance.post(`/roles/${id}/permissions`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to assign permission'));
  }
};

export const removePermissionFromRole = async (
  id: string,
  permissionId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/roles/${id}/permissions/${permissionId}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to remove permission'));
  }
};
