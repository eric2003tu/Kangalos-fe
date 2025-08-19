import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPositions,
  getPosition,
  createPosition,
  patchPosition,
  updatePosition,
  deletePosition,
  getPositionOccupants,
  assignUserToPosition,
  updatePositionOccupancy,
  removePositionOccupancy,
} from "../services/positionServices";
import type {
  CreatePositionRequest,
  UpdatePositionRequest,
  QueryPositionRequest,
  AssignUserToPositionRequest,
  UpdatePositionOccupancyRequest,
  GetPositionOccupantsRequest,
} from "../types/positionTypes";
import toast from "react-hot-toast";

export const usePositions = (params?: QueryPositionRequest) => {
  return useQuery({
    queryKey: ["positions", params],
    queryFn: () => getPositions(params),
  });
};

export const usePosition = (id: string) => {
  return useQuery({
    queryKey: ["position", id],
    queryFn: () => getPosition(id),
    enabled: !!id,
  });
};

export const useCreatePosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePositionRequest) => createPosition(data),
    onSuccess: () => {
      toast.success("Position created successfully");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create position");
    },
  });
};

export const usePatchPosition = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePositionRequest) => patchPosition(id, data),
    onSuccess: () => {
      toast.success("Position updated successfully");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      queryClient.invalidateQueries({ queryKey: ["position", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update position");
    },
  });
};

export const useUpdatePosition = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePositionRequest) => updatePosition(id, data),
    onSuccess: () => {
      toast.success("Position updated successfully");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      queryClient.invalidateQueries({ queryKey: ["position", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update position");
    },
  });
};

export const useDeletePosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePosition(id),
    onSuccess: () => {
      toast.success("Position deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete position");
    },
  });
};

export const usePositionOccupants = (
  id: string,
  params?: GetPositionOccupantsRequest,
) => {
  return useQuery({
    queryKey: ["position", id, "occupants", params],
    queryFn: () => getPositionOccupants(id, params),
    enabled: !!id,
  });
};

export const useAssignUserToPosition = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignUserToPositionRequest) => assignUserToPosition(id, data),
    onSuccess: () => {
      toast.success("User assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["position", id, "occupants"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to assign user");
    },
  });
};

export const useUpdatePositionOccupancy = (id: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePositionOccupancyRequest) =>
      updatePositionOccupancy(id, userId, data),
    onSuccess: () => {
      toast.success("Occupancy updated successfully");
      queryClient.invalidateQueries({ queryKey: ["position", id, "occupants"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update occupancy");
    },
  });
};

export const useRemovePositionOccupancy = (id: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removePositionOccupancy(id, userId),
    onSuccess: () => {
      toast.success("Occupancy removed successfully");
      queryClient.invalidateQueries({ queryKey: ["position", id, "occupants"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove occupancy");
    },
  });
};
