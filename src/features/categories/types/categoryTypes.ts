export interface Category {
  id: string;
  parentId?: string | null;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  parentId?: string;
}
export type CreateCategoryResponse = Category;

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  parentId?: string;
}
export type UpdateCategoryResponse = Category;

export interface CategoryListResponse {
  data: Category[];
  meta: Record<string, unknown>;
}

export interface QueryCategoryRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  parentId?: string;
  includeChildren?: boolean;
}
