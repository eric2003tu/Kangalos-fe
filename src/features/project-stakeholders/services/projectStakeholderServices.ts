import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  CreateProjectStakeholderRequest,
  CreateProjectStakeholderResponse,
  UpdateProjectStakeholderRequest,
  UpdateProjectStakeholderResponse,
  ProjectStakeholderListResponse,
} from "../types/projectStakeholderTypes";

export const getProjectStakeholders = async (): Promise<ProjectStakeholderListResponse> => {
  try {
    const res = await axiosInstance.get("/project-stakeholders");
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch stakeholders"));
  }
};

export const getStakeholdersOfProject = async (
  projectId: string,
): Promise<ProjectStakeholderListResponse> => {
  try {
    const res = await axiosInstance.get(`/projects/${projectId}/stakeholders`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch stakeholders"));
  }
};

export const addProjectStakeholder = async (
  projectId: string,
  data: CreateProjectStakeholderRequest,
): Promise<CreateProjectStakeholderResponse> => {
  try {
    const res = await axiosInstance.post(`/projects/${projectId}/stakeholders`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to add stakeholder"));
  }
};

export const updateProjectStakeholder = async (
  projectId: string,
  stakeholderId: string,
  data: UpdateProjectStakeholderRequest,
): Promise<UpdateProjectStakeholderResponse> => {
  try {
    const res = await axiosInstance.put(
      `/projects/${projectId}/stakeholders/${stakeholderId}`,
      data,
    );
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update stakeholder"));
  }
};

export const deleteProjectStakeholder = async (
  projectId: string,
  stakeholderId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/projects/${projectId}/stakeholders/${stakeholderId}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to remove stakeholder"));
  }
};
