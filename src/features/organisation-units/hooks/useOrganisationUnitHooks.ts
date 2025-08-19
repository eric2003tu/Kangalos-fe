import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrganisationUnit,
  getOrganisationUnits,
  getOrganisationUnitTree,
  getOrganisationUnit,
  updateOrganisationUnit,
  deleteOrganisationUnit,
  getOrganisationUnitChildren,
  getOrganisationUnitParent,
  getOrganisationUnitHierarchy,
  addChildOrganisationUnit,
  getOrganisationUnitPositions,
  getOrganisationUnitUsers,
  getOrganisationUnitProjects,
  getOrganisationUnitStakeholders,
} from "../services/organisationUnitServices";
import type {
  CreateOrganisationUnitRequest,
  UpdateOrganisationUnitRequest,
  QueryOrganisationUnitRequest,
  GetOrgUnitUsersQueryRequest,
  GetOrgUnitProjectsQueryRequest,
  GetOrgUnitStakeholdersQueryRequest,
} from "../types/organisationUnitTypes";
import toast from "react-hot-toast";

export const useOrganisationUnits = (params?: QueryOrganisationUnitRequest) => {
  return useQuery({
    queryKey: ["organisation-units", params],
    queryFn: () => getOrganisationUnits(params),
  });
};

export const useOrganisationUnitTree = (params?: { includePositions?: boolean; }) => {
  return useQuery({
    queryKey: ["organisation-units", "tree", params],
    queryFn: () => getOrganisationUnitTree(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useOrganisationUnit = (
  id: string,
  params?: {
    includePositions?: boolean;
    includeProjects?: boolean;
    includeStakeholders?: boolean;
    includeUsers?: boolean;
    includeRoles?: boolean;
    includeChildren?: boolean;
  },
) => {
  return useQuery({
    queryKey: ["organisation-unit", id, params],
    queryFn: () => getOrganisationUnit(id, params),
    enabled: !!id,
  });
};

export const useCreateOrganisationUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrganisationUnitRequest) => createOrganisationUnit(data),
    onSuccess: () => {
      toast.success("Organisation unit created successfully");
      queryClient.invalidateQueries({ queryKey: ["organisation-units"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create organisation unit");
    },
  });
};

export const useUpdateOrganisationUnit = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateOrganisationUnitRequest) => updateOrganisationUnit(id, data),
    onSuccess: () => {
      toast.success("Organisation unit updated successfully");
      queryClient.invalidateQueries({ queryKey: ["organisation-units"] });
      queryClient.invalidateQueries({ queryKey: ["organisation-unit", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update organisation unit");
    },
  });
};

export const useDeleteOrganisationUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteOrganisationUnit(id),
    onSuccess: () => {
      toast.success("Organisation unit deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["organisation-units"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete organisation unit");
    },
  });
};

export const useOrganisationUnitChildren = (id: string) => {
  return useQuery({
    queryKey: ["organisation-unit", id, "children"],
    queryFn: () => getOrganisationUnitChildren(id),
    enabled: !!id,
  });
};

export const useOrganisationUnitParent = (id: string) => {
  return useQuery({
    queryKey: ["organisation-unit", id, "parent"],
    queryFn: () => getOrganisationUnitParent(id),
    enabled: !!id,
  });
};

export const useOrganisationUnitHierarchy = (id: string) => {
  return useQuery({
    queryKey: ["organisation-unit", id, "hierarchy"],
    queryFn: () => getOrganisationUnitHierarchy(id),
    enabled: !!id,
  });
};

export const useAddChildOrganisationUnit = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrganisationUnitRequest) => addChildOrganisationUnit(id, data),
    onSuccess: () => {
      toast.success("Child organisation unit added successfully");
      queryClient.invalidateQueries({ queryKey: ["organisation-unit", id, "children"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add child organisation unit");
    },
  });
};

export const useOrganisationUnitPositions = (id: string) => {
  return useQuery({
    queryKey: ["organisation-unit", id, "positions"],
    queryFn: () => getOrganisationUnitPositions(id),
    enabled: !!id,
  });
};

export const useOrganisationUnitUsers = (
  id: string,
  params?: GetOrgUnitUsersQueryRequest,
) => {
  return useQuery({
    queryKey: ["organisation-unit", id, "users", params],
    queryFn: () => getOrganisationUnitUsers(id, params),
    enabled: !!id,
  });
};

export const useOrganisationUnitProjects = (
  id: string,
  params?: GetOrgUnitProjectsQueryRequest,
) => {
  return useQuery({
    queryKey: ["organisation-unit", id, "projects", params],
    queryFn: () => getOrganisationUnitProjects(id, params),
    enabled: !!id,
  });
};

export const useOrganisationUnitStakeholders = (
  id: string,
  params?: GetOrgUnitStakeholdersQueryRequest,
) => {
  return useQuery({
    queryKey: ["organisation-unit", id, "stakeholders", params],
    queryFn: () => getOrganisationUnitStakeholders(id, params),
    enabled: !!id,
  });
};
