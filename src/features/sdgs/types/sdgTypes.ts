export interface ProjectSdg {
  projectId: string;
  sdgId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectSdgRequest {
  sdgId: string;
}
export type CreateProjectSdgResponse = ProjectSdg;
