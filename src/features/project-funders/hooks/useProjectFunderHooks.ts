import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectFunder,
  getProjectFunders,
  getProjectFunder,
  updateProjectFunder,
  deleteProjectFunder,
} from "../services/projectFunderServices";
import type {
  CreateProjectFunderRequest,
  UpdateProjectFunderRequest,
  QueryProjectFunderRequest,
} from "../types/projectFunderTypes";
import toast from "react-hot-toast";

export const useProjectFunders = (params?: QueryProjectFunderRequest) => {
  return useQuery({
    queryKey: ["project-funders", params],
    queryFn: () => getProjectFunders(params),
  });
};

export const useProjectFunder = (projectId: string, funderId: string) => {
  return useQuery({
    queryKey: ["project-funder", projectId, funderId],
    queryFn: () => getProjectFunder(projectId, funderId),
    enabled: !!projectId && !!funderId,
  });
};

export const useCreateProjectFunder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectFunderRequest) => createProjectFunder(data),
    onSuccess: () => {
      toast.success("Project funder created successfully");
      queryClient.invalidateQueries({ queryKey: ["project-funders"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create project funder");
    },
  });
};

export const useUpdateProjectFunder = (projectId: string, funderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectFunderRequest) =>
      updateProjectFunder(projectId, funderId, data),
    onSuccess: () => {
      toast.success("Project funder updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project-funders"] });
      queryClient.invalidateQueries({
        queryKey: ["project-funder", projectId, funderId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update project funder");
    },
  });
};

export const useDeleteProjectFunder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, funderId }: { projectId: string; funderId: string }) =>
      deleteProjectFunder(projectId, funderId),
    onSuccess: () => {
      toast.success("Project funder deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["project-funders"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete project funder");
    },
  });
};
