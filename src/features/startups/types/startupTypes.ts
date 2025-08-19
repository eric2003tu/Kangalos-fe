export interface Startup {
  id: string;
  projectId: string;
  name: string;
  description?: string | null;
  year: number;
  registered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStartupRequest {
  name: string;
  description?: string;
  projectId: string;
  year: number;
  registered?: boolean;
}
export type CreateStartupResponse = Startup;

export interface UpdateStartupRequest {
  name?: string;
  description?: string;
  projectId?: string;
  year?: number;
  registered?: boolean;
}
export type UpdateStartupResponse = Startup;

export interface QueryStartupRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'year' | 'registered' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  projectId?: string;
  registered?: boolean;
  year?: number;
}

export interface QueryStartupResponse {
  data: Startup[];
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
