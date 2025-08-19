export interface ProjectEvaluation {
  id: string;
  projectId: string;
  evaluatorId: string;
  score: number;
  comments?: string | null;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectEvaluationRequest {
  projectId: string;
  evaluatorId: string;
  score: number;
  comments?: string;
  status?: 'PENDING' | 'COMPLETED';
}
export type CreateProjectEvaluationResponse = ProjectEvaluation;

export interface UpdateProjectEvaluationRequest {
  projectId?: string;
  evaluatorId?: string;
  score?: number;
  comments?: string;
  status?: 'PENDING' | 'COMPLETED';
}
export type UpdateProjectEvaluationResponse = ProjectEvaluation;

export interface QueryProjectEvaluationRequest {
  page?: number;
  limit?: number;
  projectId?: string;
  evaluatorId?: string;
  status?: 'PENDING' | 'COMPLETED';
}

export interface QueryProjectEvaluationResponse {
  data: ProjectEvaluation[];
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

export interface ProjectEvaluationSummary {
  averageScore: number;
  pendingCount: number;
}
