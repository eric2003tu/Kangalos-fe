import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProjectAuthors,
  getProjectAuthor,
  createProjectAuthor,
  updateProjectAuthor,
  deleteProjectAuthor,
} from "../services/projectAuthorServices";
import type {
  CreateProjectAuthorRequest,
  UpdateProjectAuthorRequest,
} from "../types/projectAuthorTypes";
import toast from "react-hot-toast";

export const useProjectAuthors = () => {
  return useQuery({
    queryKey: ["project-authors"],
    queryFn: () => getProjectAuthors(),
  });
};

export const useProjectAuthor = (id: string) => {
  return useQuery({
    queryKey: ["project-author", id],
    queryFn: () => getProjectAuthor(id),
    enabled: !!id,
  });
};

export const useCreateProjectAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectAuthorRequest) => createProjectAuthor(data),
    onSuccess: () => {
      toast.success("Project author created successfully");
      queryClient.invalidateQueries({ queryKey: ["project-authors"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create project author");
    },
  });
};

export const useUpdateProjectAuthor = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectAuthorRequest) =>
      updateProjectAuthor(id, data),
    onSuccess: () => {
      toast.success("Project author updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project-authors"] });
      queryClient.invalidateQueries({ queryKey: ["project-author", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update project author");
    },
  });
};

export const useDeleteProjectAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProjectAuthor(id),
    onSuccess: () => {
      toast.success("Project author deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["project-authors"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete project author");
    },
  });
};
