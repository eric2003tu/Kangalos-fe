export interface ProjectFunder {
  projectId: string;
  funderId: string;
  amount?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectFunderRequest {
  projectId: string;
  funderId: string;
  amount?: number;
}
export type CreateProjectFunderResponse = ProjectFunder;

export interface UpdateProjectFunderRequest {
  projectId?: string;
  funderId?: string;
  amount?: number;
}
export type UpdateProjectFunderResponse = ProjectFunder;

export interface QueryProjectFunderRequest {
  page?: number;
  limit?: number;
  projectId?: string;
  funderId?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface QueryProjectFunderResponse {
  data: ProjectFunder[];
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
