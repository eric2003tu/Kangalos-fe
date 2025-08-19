import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  ProjectEvaluation,
  CreateProjectEvaluationRequest,
  CreateProjectEvaluationResponse,
  UpdateProjectEvaluationRequest,
  UpdateProjectEvaluationResponse,
  QueryProjectEvaluationRequest,
  QueryProjectEvaluationResponse,
  ProjectEvaluationSummary,
} from "../types/projectEvaluationTypes";

export const getProjectEvaluations = async (
  params?: QueryProjectEvaluationRequest,
): Promise<QueryProjectEvaluationResponse> => {
  try {
    const res = await axiosInstance.get("/project-evaluations", { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch evaluations"));
  }
};

export const getProjectEvaluation = async (
  id: string,
): Promise<ProjectEvaluation> => {
  try {
    const res = await axiosInstance.get(`/project-evaluations/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch evaluation"));
  }
};

export const createProjectEvaluation = async (
  data: CreateProjectEvaluationRequest,
): Promise<CreateProjectEvaluationResponse> => {
  try {
    const res = await axiosInstance.post("/project-evaluations", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create evaluation"));
  }
};

export const updateProjectEvaluation = async (
  id: string,
  data: UpdateProjectEvaluationRequest,
): Promise<UpdateProjectEvaluationResponse> => {
  try {
    const res = await axiosInstance.put(`/project-evaluations/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update evaluation"));
  }
};

export const deleteProjectEvaluation = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/project-evaluations/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete evaluation"));
  }
};

export const getProjectEvaluationsByProject = async (
  projectId: string,
): Promise<ProjectEvaluation[]> => {
  try {
    const res = await axiosInstance.get(`/projects/${projectId}/evaluations`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch evaluations"));
  }
};

export const createProjectEvaluationForProject = async (
  projectId: string,
  data: CreateProjectEvaluationRequest,
): Promise<CreateProjectEvaluationResponse> => {
  try {
    const res = await axiosInstance.post(`/projects/${projectId}/evaluations`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create evaluation"));
  }
};

export const getProjectEvaluationSummary = async (
  projectId: string,
): Promise<ProjectEvaluationSummary> => {
  try {
    const res = await axiosInstance.get(`/projects/${projectId}/evaluations/summary`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch summary"));
  }
};

export const getProjectEvaluationsByEvaluator = async (
  userId: string,
): Promise<ProjectEvaluation[]> => {
  try {
    const res = await axiosInstance.get(`/evaluators/${userId}/evaluations`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch evaluations"));
  }
};

export const getPendingProjectEvaluations = async (): Promise<ProjectEvaluation[]> => {
  try {
    const res = await axiosInstance.get("/evaluations/pending");
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch evaluations"));
  }
};
