export type UserType = 'ORGANISATION' | 'STUDENT' | 'STAFF' | 'INDIVIDUAL';

export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  userType?: UserType | null;
  isVerified?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  userType: UserType;
}
export type CreateUserResponse = User;

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  userType?: UserType;
  password?: string;
}
export type UpdateUserResponse = User;

export interface AssignRoleToUserRequest {
  roleId: string;
}

export interface SearchUserRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  userType?: UserType;
  organisationUnitId?: string;
}

export interface SearchUserResponse {
  data: User[];
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
