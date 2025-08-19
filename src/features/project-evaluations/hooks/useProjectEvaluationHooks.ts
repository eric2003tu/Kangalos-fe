import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProjectEvaluations,
  getProjectEvaluation,
  createProjectEvaluation,
  updateProjectEvaluation,
  deleteProjectEvaluation,
  getProjectEvaluationsByProject,
  createProjectEvaluationForProject,
  getProjectEvaluationSummary,
  getProjectEvaluationsByEvaluator,
  getPendingProjectEvaluations,
} from "../services/projectEvaluationServices";
import type {
  CreateProjectEvaluationRequest,
  UpdateProjectEvaluationRequest,
  QueryProjectEvaluationRequest,
} from "../types/projectEvaluationTypes";
import toast from "react-hot-toast";

export const useProjectEvaluations = (
  params?: QueryProjectEvaluationRequest,
) => {
  return useQuery({
    queryKey: ["project-evaluations", params],
    queryFn: () => getProjectEvaluations(params),
  });
};

export const useProjectEvaluation = (id: string) => {
  return useQuery({
    queryKey: ["project-evaluation", id],
    queryFn: () => getProjectEvaluation(id),
    enabled: !!id,
  });
};

export const useCreateProjectEvaluation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectEvaluationRequest) =>
      createProjectEvaluation(data),
    onSuccess: () => {
      toast.success("Evaluation created successfully");
      queryClient.invalidateQueries({ queryKey: ["project-evaluations"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create evaluation");
    },
  });
};

export const useUpdateProjectEvaluation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectEvaluationRequest) =>
      updateProjectEvaluation(id, data),
    onSuccess: () => {
      toast.success("Evaluation updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project-evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["project-evaluation", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update evaluation");
    },
  });
};

export const useDeleteProjectEvaluation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProjectEvaluation(id),
    onSuccess: () => {
      toast.success("Evaluation deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["project-evaluations"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete evaluation");
    },
  });
};

export const useProjectEvaluationsByProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project-evaluations", "project", projectId],
    queryFn: () => getProjectEvaluationsByProject(projectId),
    enabled: !!projectId,
  });
};

export const useCreateEvaluationForProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectEvaluationRequest) =>
      createProjectEvaluationForProject(projectId, data),
    onSuccess: () => {
      toast.success("Evaluation created successfully");
      queryClient.invalidateQueries({
        queryKey: ["project-evaluations", "project", projectId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create evaluation");
    },
  });
};

export const useProjectEvaluationSummary = (projectId: string) => {
  return useQuery({
    queryKey: ["project-evaluations", "summary", projectId],
    queryFn: () => getProjectEvaluationSummary(projectId),
    enabled: !!projectId,
  });
};

export const useProjectEvaluationsByEvaluator = (userId: string) => {
  return useQuery({
    queryKey: ["project-evaluations", "evaluator", userId],
    queryFn: () => getProjectEvaluationsByEvaluator(userId),
    enabled: !!userId,
  });
};

export const usePendingProjectEvaluations = () => {
  return useQuery({
    queryKey: ["project-evaluations", "pending"],
    queryFn: () => getPendingProjectEvaluations(),
  });
};
