export interface Stakeholder {
  id: string;
  name: string;
  stakeholderType: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  organisationUnitId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStakeholderRequest {
  name: string;
  stakeholderType: string;
  contactEmail?: string;
  contactPhone?: string;
}
export type CreateStakeholderResponse = Stakeholder;

export interface UpdateStakeholderRequest {
  name?: string;
  stakeholderType?: string;
  contactEmail?: string;
  contactPhone?: string;
}
export type UpdateStakeholderResponse = Stakeholder;

export interface QueryStakeholderRequest {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  organisationUnitId?: string;
}

export interface StakeholderListResponse {
  data: Stakeholder[];
  meta: Record<string, unknown>;
}
