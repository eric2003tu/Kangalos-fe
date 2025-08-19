import type { User } from "../../users/types/userTypes";
import type { Position } from "../../positions/types/positionTypes";

export interface UserPosition {
  userId: string;
  positionId: string;
  startDate: string;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  position?: Position;
}

export interface CreateUserPositionRequest {
  userId: string;
  positionId: string;
  startDate?: string;
  endDate?: string;
}
export type CreateUserPositionResponse = UserPosition;

export interface UpdateUserPositionRequest {
  userId?: string;
  positionId?: string;
  startDate?: string;
  endDate?: string;
}
export type UpdateUserPositionResponse = UserPosition;

export interface GetUserPositionsRequest {
  userId?: string;
  positionId?: string;
  currentOnly?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'startDate' | 'endDate';
  sortOrder?: 'asc' | 'desc';
}

export interface GetUserPositionsResponse {
  data: UserPosition[];
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
