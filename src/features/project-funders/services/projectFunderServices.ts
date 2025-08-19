import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  ProjectFunder,
  CreateProjectFunderRequest,
  CreateProjectFunderResponse,
  UpdateProjectFunderRequest,
  UpdateProjectFunderResponse,
  QueryProjectFunderRequest,
  QueryProjectFunderResponse,
} from "../types/projectFunderTypes";

export const createProjectFunder = async (
  data: CreateProjectFunderRequest,
): Promise<CreateProjectFunderResponse> => {
  try {
    const res = await axiosInstance.post("/project-funder", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create project funder"));
  }
};

export const getProjectFunders = async (
  params?: QueryProjectFunderRequest,
): Promise<QueryProjectFunderResponse> => {
  try {
    const res = await axiosInstance.get("/project-funder", { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch project funders"));
  }
};

export const getProjectFunder = async (
  projectId: string,
  funderId: string,
): Promise<ProjectFunder> => {
  try {
    const res = await axiosInstance.get(`/project-funder/${projectId}/${funderId}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch project funder"));
  }
};

export const updateProjectFunder = async (
  projectId: string,
  funderId: string,
  data: UpdateProjectFunderRequest,
): Promise<UpdateProjectFunderResponse> => {
  try {
    const res = await axiosInstance.patch(`/project-funder/${projectId}/${funderId}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update project funder"));
  }
};

export const deleteProjectFunder = async (
  projectId: string,
  funderId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/project-funder/${projectId}/${funderId}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete project funder"));
  }
};
