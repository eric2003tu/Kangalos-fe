import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  OrganisationUnit,
  CreateOrganisationUnitRequest,
  CreateOrganisationUnitResponse,
  UpdateOrganisationUnitRequest,
  UpdateOrganisationUnitResponse,
  QueryOrganisationUnitRequest,
  QueryOrganisationUnitResponse,
  GetOrgUnitUsersQueryRequest,
  GetOrgUnitProjectsQueryRequest,
  GetOrgUnitStakeholdersQueryRequest,
} from "../types/organisationUnitTypes";

export const createOrganisationUnit = async (
  data: CreateOrganisationUnitRequest,
): Promise<CreateOrganisationUnitResponse> => {
  try {
    const res = await axiosInstance.post("/organisation-unit", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create organisation unit"));
  }
};

export const getOrganisationUnits = async (
  params?: QueryOrganisationUnitRequest,
): Promise<QueryOrganisationUnitResponse> => {
  try {
    const res = await axiosInstance.get("/organisation-unit", { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch organisation units"));
  }
};

export const getOrganisationUnitTree = async (
  params?: { includePositions?: boolean; },
): Promise<OrganisationUnit[]> => {
  try {
    const res = await axiosInstance.get("/organisation-unit/tree", { params });
    // The API returns the array directly or within a data property
    return res.data.data || res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch organisation unit tree"));
  }
};

export const getOrganisationUnit = async (
  id: string,
  params?: {
    includePositions?: boolean;
    includeProjects?: boolean;
    includeStakeholders?: boolean;
    includeUsers?: boolean;
    includeRoles?: boolean;
    includeChildren?: boolean;
  },
): Promise<OrganisationUnit> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}`, { params });
    return res.data.data || res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch organisation unit"));
  }
};

export const updateOrganisationUnit = async (
  id: string,
  data: UpdateOrganisationUnitRequest,
): Promise<UpdateOrganisationUnitResponse> => {
  try {
    const res = await axiosInstance.patch(`/organisation-unit/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update organisation unit"));
  }
};

export const deleteOrganisationUnit = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/organisation-unit/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete organisation unit"));
  }
};

export const getOrganisationUnitChildren = async (
  id: string,
): Promise<OrganisationUnit[]> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}/children`);
    return res.data.data || res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch organisation unit children"));
  }
};

export const getOrganisationUnitParent = async (
  id: string,
): Promise<OrganisationUnit | null> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}/parent`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch parent"));
  }
};

export const getOrganisationUnitHierarchy = async (
  id: string,
): Promise<OrganisationUnit[]> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}/hierarchy`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch hierarchy"));
  }
};

export const addChildOrganisationUnit = async (
  id: string,
  data: CreateOrganisationUnitRequest,
): Promise<CreateOrganisationUnitResponse> => {
  try {
    const res = await axiosInstance.post(`/organisation-unit/${id}/children`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to add child organisation unit"));
  }
};

export const getOrganisationUnitPositions = async (
  id: string,
): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}/positions`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch positions"));
  }
};

export const getOrganisationUnitUsers = async (
  id: string,
  params?: GetOrgUnitUsersQueryRequest,
): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}/users`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch users"));
  }
};

export const getOrganisationUnitProjects = async (
  id: string,
  params?: GetOrgUnitProjectsQueryRequest,
): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}/projects`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch projects"));
  }
};

export const getOrganisationUnitStakeholders = async (
  id: string,
  params?: GetOrgUnitStakeholdersQueryRequest,
): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.get(`/organisation-unit/${id}/stakeholders`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch stakeholders"));
  }
};
