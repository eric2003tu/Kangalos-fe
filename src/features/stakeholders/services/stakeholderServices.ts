import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  Stakeholder,
  CreateStakeholderRequest,
  CreateStakeholderResponse,
  UpdateStakeholderRequest,
  UpdateStakeholderResponse,
  QueryStakeholderRequest,
  StakeholderListResponse,
} from '../types/stakeholderTypes';

export const getStakeholders = async (
  params?: QueryStakeholderRequest,
): Promise<StakeholderListResponse> => {
  try {
    const res = await axiosInstance.get('/stakeholder', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch stakeholders'));
  }
};

export const getStakeholdersByType = async (
  type: string,
): Promise<Stakeholder[]> => {
  try {
    const res = await axiosInstance.get(`/stakeholder/by-type/${type}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch stakeholders'));
  }
};

export const getStakeholdersByOrganisationUnit = async (
  orgUnitId: string,
): Promise<Stakeholder[]> => {
  try {
    const res = await axiosInstance.get(`/stakeholder/by-org-unit/${orgUnitId}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch stakeholders'));
  }
};

export const getStakeholderProjects = async (
  id: string,
): Promise<Record<string, unknown>[]> => {
  try {
    const res = await axiosInstance.get(`/stakeholder/${id}/projects`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch projects'));
  }
};

export const getStakeholder = async (id: string): Promise<Stakeholder> => {
  try {
    const res = await axiosInstance.get(`/stakeholder/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch stakeholder'));
  }
};

export const createStakeholder = async (
  data: CreateStakeholderRequest,
): Promise<CreateStakeholderResponse> => {
  try {
    const res = await axiosInstance.post('/stakeholder', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to create stakeholder'));
  }
};

export const updateStakeholder = async (
  id: string,
  data: UpdateStakeholderRequest,
): Promise<UpdateStakeholderResponse> => {
  try {
    const res = await axiosInstance.put(`/stakeholder/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update stakeholder'));
  }
};

export const patchStakeholder = async (
  id: string,
  data: UpdateStakeholderRequest,
): Promise<UpdateStakeholderResponse> => {
  try {
    const res = await axiosInstance.patch(`/stakeholder/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update stakeholder'));
  }
};

export const deleteStakeholder = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/stakeholder/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete stakeholder'));
  }
};
