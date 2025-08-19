export interface Role {
  id: string;
  name: string;
  description?: string | null;
  organisationUnitId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  organisationUnitId?: string;
}
export type CreateRoleResponse = Role;

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  organisationUnitId?: string;
}
export type UpdateRoleResponse = Role;

export interface QueryRoleRequest {
  organisationUnitId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface RoleListResponse {
  data: Role[];
  meta: Record<string, unknown>;
}

export interface AssignPermissionRequest {
  permissionId: string;
}
export type AssignPermissionResponse = Role;
