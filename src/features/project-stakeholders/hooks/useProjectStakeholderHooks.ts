import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProjectStakeholders,
  getStakeholdersOfProject,
  addProjectStakeholder,
  updateProjectStakeholder,
  deleteProjectStakeholder,
} from "../services/projectStakeholderServices";
import type {
  CreateProjectStakeholderRequest,
  UpdateProjectStakeholderRequest,
} from "../types/projectStakeholderTypes";
import toast from "react-hot-toast";

export const useProjectStakeholders = () => {
  return useQuery({
    queryKey: ["project-stakeholders"],
    queryFn: () => getProjectStakeholders(),
  });
};

export const useStakeholdersOfProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project-stakeholders", projectId],
    queryFn: () => getStakeholdersOfProject(projectId),
    enabled: !!projectId,
  });
};

export const useAddProjectStakeholder = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectStakeholderRequest) =>
      addProjectStakeholder(projectId, data),
    onSuccess: () => {
      toast.success("Stakeholder added successfully");
      queryClient.invalidateQueries({
        queryKey: ["project-stakeholders", projectId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add stakeholder");
    },
  });
};

export const useUpdateProjectStakeholder = (
  projectId: string,
  stakeholderId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectStakeholderRequest) =>
      updateProjectStakeholder(projectId, stakeholderId, data),
    onSuccess: () => {
      toast.success("Stakeholder updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["project-stakeholders", projectId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update stakeholder");
    },
  });
};

export const useDeleteProjectStakeholder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, stakeholderId }: { projectId: string; stakeholderId: string }) =>
      deleteProjectStakeholder(projectId, stakeholderId),
    onSuccess: () => {
      toast.success("Stakeholder removed successfully");
      queryClient.invalidateQueries({ queryKey: ["project-stakeholders"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove stakeholder");
    },
  });
};
