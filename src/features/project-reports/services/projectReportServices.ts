import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  ProjectReport,
  CreateProjectReportRequest,
  CreateProjectReportResponse,
  CreateProjectReportWithoutProjectIdRequest,
  CreateProjectReportWithoutProjectIdResponse,
  UpdateProjectReportRequest,
  UpdateProjectReportResponse,
  QueryProjectReportRequest,
  QueryProjectReportResponse,
  ProjectReportSummary,
} from "../types/projectReportTypes";

export const createProjectReport = async (
  data: CreateProjectReportRequest,
): Promise<CreateProjectReportResponse> => {
  try {
    const res = await axiosInstance.post("/project-reports", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create report"));
  }
};

export const getProjectReports = async (
  params?: QueryProjectReportRequest,
): Promise<QueryProjectReportResponse> => {
  try {
    const res = await axiosInstance.get("/project-reports", { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch reports"));
  }
};

export const getProjectReport = async (id: string): Promise<ProjectReport> => {
  try {
    const res = await axiosInstance.get(`/project-reports/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch report"));
  }
};

export const getProjectReportsByProject = async (
  projectId: string,
): Promise<ProjectReport[]> => {
  try {
    const res = await axiosInstance.get(`/project-reports/project/${projectId}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch reports"));
  }
};

export const updateProjectReport = async (
  id: string,
  data: UpdateProjectReportRequest,
): Promise<UpdateProjectReportResponse> => {
  try {
    const res = await axiosInstance.put(`/project-reports/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update report"));
  }
};

export const patchProjectReport = async (
  id: string,
  data: UpdateProjectReportRequest,
): Promise<UpdateProjectReportResponse> => {
  try {
    const res = await axiosInstance.patch(`/project-reports/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update report"));
  }
};

export const deleteProjectReport = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/project-reports/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete report"));
  }
};

export const createProjectReportForProject = async (
  projectId: string,
  data: CreateProjectReportWithoutProjectIdRequest,
): Promise<CreateProjectReportWithoutProjectIdResponse> => {
  try {
    const res = await axiosInstance.post(`/projects/${projectId}/reports`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create report"));
  }
};

export const getLatestProjectReport = async (
  projectId: string,
): Promise<ProjectReport> => {
  try {
    const res = await axiosInstance.get(`/projects/${projectId}/reports/latest`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch latest report"));
  }
};

export const getProjectReportSummary = async (
  projectId: string,
): Promise<ProjectReportSummary> => {
  try {
    const res = await axiosInstance.get(`/projects/${projectId}/reports/summary`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch summary"));
  }
};

export const getReportsBySubmitter = async (
  userId: string,
): Promise<ProjectReport[]> => {
  try {
    const res = await axiosInstance.get(`/reports/by-submitter/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch reports"));
  }
};

export const getReportsByPeriod = async (period: string): Promise<ProjectReport[]> => {
  try {
    const res = await axiosInstance.get(`/reports/by-period/${period}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch reports"));
  }
};

export const getPendingReports = async (): Promise<ProjectReport[]> => {
  try {
    const res = await axiosInstance.get("/reports/pending");
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch reports"));
  }
};
