export interface ProjectReport {
  id: string;
  projectId: string;
  title: string;
  reportingPeriod?: string | null;
  content?: string | null;
  fundUsage?: number | null;
  submittedAt: string;
  submittedById: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectReportRequest {
  projectId: string;
  title: string;
  reportingPeriod?: string;
  content?: string;
  fundUsage?: number;
  submittedById: string;
}
export type CreateProjectReportResponse = ProjectReport;

export interface CreateProjectReportWithoutProjectIdRequest {
  title: string;
  reportingPeriod?: string;
  content?: string;
  fundUsage?: number;
  submittedById: string;
}
export type CreateProjectReportWithoutProjectIdResponse = ProjectReport;

export interface UpdateProjectReportRequest {
  projectId?: string;
  title?: string;
  reportingPeriod?: string;
  content?: string;
  fundUsage?: number;
  submittedById?: string;
}
export type UpdateProjectReportResponse = ProjectReport;

export interface QueryProjectReportRequest {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
  reportingPeriod?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface QueryProjectReportResponse {
  data: ProjectReport[];
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

export interface ProjectReportSummary {
  [key: string]: unknown;
}
