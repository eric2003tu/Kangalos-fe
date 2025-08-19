import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryTree,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryChildren,
  getCategoryParent,
  createChildCategory,
} from "../services/categoryServices";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  QueryCategoryRequest,
} from "../types/categoryTypes";
import toast from "react-hot-toast";

export const useCategories = (params?: QueryCategoryRequest) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
};

export const useCategoryTree = () => {
  return useQuery({
    queryKey: ["categories", "tree"],
    queryFn: () => getCategoryTree(),
  });
};

export const useCategory = (
  id: string,
  params?: { includeChildren?: true }
) => {
  return useQuery({
    queryKey: ["category", id, params],
    queryFn: () => getCategory(id, params),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => createCategory(data),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) => updateCategory(id, data),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
};

export const useCategoryChildren = (id: string) => {
  return useQuery({
    queryKey: ["category", id, "children"],
    queryFn: () => getCategoryChildren(id),
    enabled: !!id,
  });
};

export const useCategoryParent = (id: string) => {
  return useQuery({
    queryKey: ["category", id, "parent"],
    queryFn: () => getCategoryParent(id),
    enabled: !!id,
  });
};

export const useCreateChildCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => createChildCategory(id, data),
    onSuccess: () => {
      toast.success("Child category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id, "children"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create child category");
    },
  });
};
