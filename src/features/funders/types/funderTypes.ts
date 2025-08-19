export interface Funder {
  id: string;
  name: string;
  funderType: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFunderRequest {
  name: string;
  funderType: string;
  contactEmail?: string;
  contactPhone?: string;
}
export type CreateFunderResponse = Funder;

export interface UpdateFunderRequest {
  name?: string;
  funderType?: string;
  contactEmail?: string;
  contactPhone?: string;
}
export type UpdateFunderResponse = Funder;

export interface QueryFunderRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface QueryFunderResponse {
  data: Funder[];
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
