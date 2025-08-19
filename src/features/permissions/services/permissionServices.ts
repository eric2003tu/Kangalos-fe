import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  Permission,
  CreatePermissionRequest,
  CreatePermissionResponse,
  UpdatePermissionRequest,
  UpdatePermissionResponse,
  QueryPermissionRequest,
  QueryPermissionResponse,
} from "../types/permissionTypes";

export const getPermissions = async (
  params?: QueryPermissionRequest,
): Promise<QueryPermissionResponse> => {
  try {
    const res = await axiosInstance.get("/permissions", { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch permissions"));
  }
};

export const getPermission = async (id: string): Promise<Permission> => {
  try {
    const res = await axiosInstance.get(`/permissions/${id}`);
    return res.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch permission"));
  }
};

export const createPermission = async (
  data: CreatePermissionRequest,
): Promise<CreatePermissionResponse> => {
  try {
    const res = await axiosInstance.post("/permissions", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create permission"));
  }
};

export const updatePermission = async (
  id: string,
  data: UpdatePermissionRequest,
): Promise<UpdatePermissionResponse> => {
  try {
    const res = await axiosInstance.patch(`/permissions/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update permission"));
  }
};

export const deletePermission = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/permissions/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete permission"));
  }
};
