import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from "../services/permissionServices";
import type {
  CreatePermissionRequest,
  UpdatePermissionRequest,
  QueryPermissionRequest,
} from "../types/permissionTypes";
import toast from "react-hot-toast";

export const usePermissions = (params?: QueryPermissionRequest) => {
  return useQuery({
    queryKey: ["permissions", params],
    queryFn: () => getPermissions(params),
  });
};

export const usePermission = (id: string) => {
  return useQuery({
    queryKey: ["permission", id],
    queryFn: () => getPermission(id),
    enabled: !!id,
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePermissionRequest) => createPermission(data),
    onSuccess: () => {
      toast.success("Permission created successfully");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create permission");
    },
  });
};

export const useUpdatePermission = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePermissionRequest) => updatePermission(id, data),
    onSuccess: () => {
      toast.success("Permission updated successfully");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["permission", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update permission");
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePermission(id),
    onSuccess: () => {
      toast.success("Permission deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete permission");
    },
  });
};
