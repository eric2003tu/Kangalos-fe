export interface UserRole {
  userId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  };
  role?: {
    id: string;
    name: string;
    organisationUnitId?: string | null;
  };
}

export interface CreateUserRoleRequest {
  userId: string;
  roleId: string;
}
export type CreateUserRoleResponse = UserRole;

export interface GetUserRolesRequest {
  userId?: string;
  roleId?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface GetUserRolesResponse {
  data: UserRole[];
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
