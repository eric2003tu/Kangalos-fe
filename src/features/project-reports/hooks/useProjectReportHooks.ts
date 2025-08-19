import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectReport,
  getProjectReports,
  getProjectReport,
  getProjectReportsByProject,
  updateProjectReport,
  patchProjectReport,
  deleteProjectReport,
  createProjectReportForProject,
  getLatestProjectReport,
  getProjectReportSummary,
  getReportsBySubmitter,
  getReportsByPeriod,
  getPendingReports,
} from "../services/projectReportServices";
import type {
  CreateProjectReportRequest,
  CreateProjectReportWithoutProjectIdRequest,
  UpdateProjectReportRequest,
  QueryProjectReportRequest,
} from "../types/projectReportTypes";
import toast from "react-hot-toast";

export const useProjectReports = (params?: QueryProjectReportRequest) => {
  return useQuery({
    queryKey: ["project-reports", params],
    queryFn: () => getProjectReports(params),
  });
};

export const useProjectReport = (id: string) => {
  return useQuery({
    queryKey: ["project-report", id],
    queryFn: () => getProjectReport(id),
    enabled: !!id,
  });
};

export const useCreateProjectReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectReportRequest) => createProjectReport(data),
    onSuccess: () => {
      toast.success("Report created successfully");
      queryClient.invalidateQueries({ queryKey: ["project-reports"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create report");
    },
  });
};

export const useUpdateProjectReport = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectReportRequest) => updateProjectReport(id, data),
    onSuccess: () => {
      toast.success("Report updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project-reports"] });
      queryClient.invalidateQueries({ queryKey: ["project-report", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update report");
    },
  });
};

export const usePatchProjectReport = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectReportRequest) => patchProjectReport(id, data),
    onSuccess: () => {
      toast.success("Report updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project-reports"] });
      queryClient.invalidateQueries({ queryKey: ["project-report", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update report");
    },
  });
};

export const useDeleteProjectReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProjectReport(id),
    onSuccess: () => {
      toast.success("Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["project-reports"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete report");
    },
  });
};

export const useProjectReportsByProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project-reports", "project", projectId],
    queryFn: () => getProjectReportsByProject(projectId),
    enabled: !!projectId,
  });
};

export const useCreateReportForProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectReportWithoutProjectIdRequest) =>
      createProjectReportForProject(projectId, data),
    onSuccess: () => {
      toast.success("Report created successfully");
      queryClient.invalidateQueries({
        queryKey: ["project-reports", "project", projectId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create report");
    },
  });
};

export const useLatestProjectReport = (projectId: string) => {
  return useQuery({
    queryKey: ["project-reports", "latest", projectId],
    queryFn: () => getLatestProjectReport(projectId),
    enabled: !!projectId,
  });
};

export const useProjectReportSummary = (projectId: string) => {
  return useQuery({
    queryKey: ["project-reports", "summary", projectId],
    queryFn: () => getProjectReportSummary(projectId),
    enabled: !!projectId,
  });
};

export const useReportsBySubmitter = (userId: string) => {
  return useQuery({
    queryKey: ["project-reports", "submitter", userId],
    queryFn: () => getReportsBySubmitter(userId),
    enabled: !!userId,
  });
};

export const useReportsByPeriod = (period: string) => {
  return useQuery({
    queryKey: ["project-reports", "period", period],
    queryFn: () => getReportsByPeriod(period),
    enabled: !!period,
  });
};

export const usePendingReports = () => {
  return useQuery({
    queryKey: ["project-reports", "pending"],
    queryFn: () => getPendingReports(),
  });
};
