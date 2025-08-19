import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFunders,
  getFunder,
  createFunder,
  updateFunder,
  patchFunder,
  deleteFunder,
} from "../services/funderServices";
import type {
  CreateFunderRequest,
  UpdateFunderRequest,
  QueryFunderRequest,
} from "../types/funderTypes";
import toast from "react-hot-toast";

export const useFunders = (params?: QueryFunderRequest) => {
  return useQuery({
    queryKey: ["funders", params],
    queryFn: () => getFunders(params),
  });
};

export const useFunder = (id: string) => {
  return useQuery({
    queryKey: ["funder", id],
    queryFn: () => getFunder(id),
    enabled: !!id,
  });
};

export const useCreateFunder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFunderRequest) => createFunder(data),
    onSuccess: () => {
      toast.success("Funder created successfully");
      queryClient.invalidateQueries({ queryKey: ["funders"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create funder");
    },
  });
};

export const useUpdateFunder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateFunderRequest) => updateFunder(id, data),
    onSuccess: () => {
      toast.success("Funder updated successfully");
      queryClient.invalidateQueries({ queryKey: ["funders"] });
      queryClient.invalidateQueries({ queryKey: ["funder", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update funder");
    },
  });
};

export const usePatchFunder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateFunderRequest) => patchFunder(id, data),
    onSuccess: () => {
      toast.success("Funder updated successfully");
      queryClient.invalidateQueries({ queryKey: ["funders"] });
      queryClient.invalidateQueries({ queryKey: ["funder", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update funder");
    },
  });
};

export const useDeleteFunder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFunder(id),
    onSuccess: () => {
      toast.success("Funder deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["funders"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete funder");
    },
  });
};
