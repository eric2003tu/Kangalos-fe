import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  ProjectAuthor,
  CreateProjectAuthorRequest,
  CreateProjectAuthorResponse,
  UpdateProjectAuthorRequest,
  UpdateProjectAuthorResponse,
} from "../types/projectAuthorTypes";

export const getProjectAuthors = async (): Promise<ProjectAuthor[]> => {
  try {
    const res = await axiosInstance.get("/project-author");
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch project authors"));
  }
};

export const getProjectAuthor = async (id: string): Promise<ProjectAuthor> => {
  try {
    const res = await axiosInstance.get(`/project-author/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch project author"));
  }
};

export const createProjectAuthor = async (
  data: CreateProjectAuthorRequest,
): Promise<CreateProjectAuthorResponse> => {
  try {
    const res = await axiosInstance.post("/project-author", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create project author"));
  }
};

export const updateProjectAuthor = async (
  id: string,
  data: UpdateProjectAuthorRequest,
): Promise<UpdateProjectAuthorResponse> => {
  try {
    const res = await axiosInstance.patch(`/project-author/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update project author"));
  }
};

export const deleteProjectAuthor = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/project-author/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete project author"));
  }
};
