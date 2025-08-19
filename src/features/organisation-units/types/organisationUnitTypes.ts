export interface OrganisationUnit {
  id: string;
  parentId: string | null;
  name: string;
  code: string;
  shortName: string;
  level: number;
  contactEmail: string;
  contactPhone: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  children?: OrganisationUnit[];
  positions?: { id: string; title: string }[];
  projects?: { id: string; name?: string; title?: string }[];
  stakeholders?: { id: string; name: string }[];
}

export interface CreateOrganisationUnitRequest {
  name: string;
  code?: string;
  parentId?: string;
}
export type CreateOrganisationUnitResponse = OrganisationUnit;

export interface UpdateOrganisationUnitRequest {
  name?: string;
  code?: string;
  parentId?: string;
}
export type UpdateOrganisationUnitResponse = OrganisationUnit;

export interface QueryOrganisationUnitRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  parentId?: string;
  includePositions?: boolean;
}

export interface QueryOrganisationUnitResponse {
  data: OrganisationUnit[];
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

export interface GetOrgUnitUsersQueryRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  currentOnly?: boolean;
}

export interface GetOrgUnitProjectsQueryRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetOrgUnitStakeholdersQueryRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  organisationUnitId?: string;
}
