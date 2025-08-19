export enum ProjectStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FUNDED = 'FUNDED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum IpType {
  PATENT = 'PATENT',
  UTILITY_MODEL = 'UTILITY_MODEL',
  COPYRIGHT = 'COPYRIGHT',
  TRADEMARK = 'TRADEMARK',
  NONE = 'NONE',
}

export interface Project {
  id: string;
  title: string;
  titleNorm: string;
  abstract?: string | null;
  projectType: string;
  year: number;
  status: ProjectStatus;
  submittedAt: string;
  innovationField?: string | null;
  expectedIp?: IpType | null;
  progressPercent?: number | null;
  organisationUnitId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  titleNorm: string;
  projectType: string;
  year: number;
  organisationUnitId: string;
  abstract?: string;
  innovationField?: string;
  expectedIp?: IpType;
  progressPercent?: number;
  status?: ProjectStatus;
  submittedAt?: string;
}
export type CreateProjectResponse = Project;

export interface UpdateProjectRequest {
  title?: string;
  titleNorm?: string;
  projectType?: string;
  year?: number;
  organisationUnitId?: string;
  abstract?: string;
  innovationField?: string;
  expectedIp?: IpType;
  progressPercent?: number;
  status?: ProjectStatus;
  submittedAt?: string;
}
export type UpdateProjectResponse = Project;

export interface QueryProjectRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  organisationUnitId?: string;
  status?: ProjectStatus;
  year?: number;
  projectType?: string;
  authorId?: string;
}

export interface QueryProjectResponse {
  data: Project[];
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
