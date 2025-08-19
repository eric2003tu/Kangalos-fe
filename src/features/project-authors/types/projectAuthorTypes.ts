export type AuthorRole = "LEAD" | "CO_AUTHOR" | "SUPERVISOR";

export interface ProjectAuthor {
  id: string;
  projectId: string;
  userId: string;
  role: AuthorRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectAuthorRequest {
  projectId: string;
  userId: string;
  role?: AuthorRole;
}
export type CreateProjectAuthorResponse = ProjectAuthor;

export interface UpdateProjectAuthorRequest {
  projectId?: string;
  userId?: string;
  role?: AuthorRole;
}
export type UpdateProjectAuthorResponse = ProjectAuthor;
