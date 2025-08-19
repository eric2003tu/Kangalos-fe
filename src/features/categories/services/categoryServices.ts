import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  Category,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  CategoryListResponse,
  QueryCategoryRequest,
} from "../types/categoryTypes";

export const getCategories = async (
  params?: QueryCategoryRequest,
  includeChildren: boolean = true,
): Promise<CategoryListResponse> => {
  try {
    const res = await axiosInstance.get("/categories", { params: { ...params, includeChildren } });
    return res.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch categories"));
  }
};

export const getCategoryTree = async (): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get("/categories/tree");
    return res.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch category tree"));
  }
};

export const getCategory = async (
  id: string,
  params?: { includeChildren?: true; },
): Promise<Category> => {
  try {
    const res = await axiosInstance.get(`/categories/${id}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch category"));
  }
};

export const createCategory = async (
  data: CreateCategoryRequest,
): Promise<CreateCategoryResponse> => {
  try {
    const res = await axiosInstance.post("/categories", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create category"));
  }
};

export const updateCategory = async (
  id: string,
  data: UpdateCategoryRequest,
): Promise<UpdateCategoryResponse> => {
  try {
    const res = await axiosInstance.put(`/categories/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update category"));
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/categories/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete category"));
  }
};

export const getCategoryChildren = async (id: string): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get(`/categories/${id}/children`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch children"));
  }
};

export const getCategoryParent = async (id: string): Promise<Category | null> => {
  try {
    const res = await axiosInstance.get(`/categories/${id}/parent`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch parent"));
  }
};

export const createChildCategory = async (
  id: string,
  data: CreateCategoryRequest,
): Promise<CreateCategoryResponse> => {
  try {
    const res = await axiosInstance.post(`/categories/${id}/children`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create child category"));
  }
};
