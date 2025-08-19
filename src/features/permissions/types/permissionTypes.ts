export interface Permission {
  id: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionRequest {
  code: string;
  description?: string;
}
export type CreatePermissionResponse = Permission;

export interface UpdatePermissionRequest {
  code?: string;
  description?: string;
}
export type UpdatePermissionResponse = Permission;

export interface QueryPermissionRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export interface QueryPermissionResponse {
  data: Permission[];
  meta: {
    pagination: {
      total: number;
      count: number;
      perPage: number;
      currentPage: number;
      totalPages: number;
      links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
      };
    };
  };
}
