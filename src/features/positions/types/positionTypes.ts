export interface Position {
  id: string;
  organisationUnitId: string;
  title: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePositionRequest {
  title: string;
  description?: string;
  organisationUnitId: string;
}
export type CreatePositionResponse = Position;

export interface UpdatePositionRequest {
  title?: string;
  description?: string;
  organisationUnitId?: string;
}
export type UpdatePositionResponse = Position;

export interface QueryPositionRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  organisationUnitId?: string;
}

export interface QueryPositionResponse {
  data: Position[];
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

export interface AssignUserToPositionRequest {
  userId: string;
  startDate?: string;
  endDate?: string;
}

export interface UpdatePositionOccupancyRequest {
  startDate?: string;
  endDate?: string;
  originalStartDate?: string;
}

export interface GetPositionOccupantsRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  currentOnly?: boolean;
}
