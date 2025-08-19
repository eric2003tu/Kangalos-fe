export type StakeholderRole =
  | 'OWNER'
  | 'PARTNER'
  | 'SPONSOR'
  | 'REGULATOR'
  | 'BENEFICIARY';

export interface ProjectStakeholder {
  projectId: string;
  stakeholderId: string;
  role: StakeholderRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectStakeholderRequest {
  stakeholderId: string;
  role?: StakeholderRole;
}
export type CreateProjectStakeholderResponse = ProjectStakeholder;

export interface UpdateProjectStakeholderRequest {
  stakeholderId?: string;
  role?: StakeholderRole;
}
export type UpdateProjectStakeholderResponse = ProjectStakeholder;

export type ProjectStakeholderListResponse = ProjectStakeholder[];
