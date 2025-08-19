import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  ProjectSdg,
  CreateProjectSdgRequest,
  CreateProjectSdgResponse,
} from '../types/sdgTypes';

export const getProjectSdgs = async (): Promise<ProjectSdg[]> => {
  try {
    const res = await axiosInstance.get('/project-sdgs');
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch project sdgs'));
  }
};

export const getSdgsForProject = async (projectId: string): Promise<ProjectSdg[]> => {
  try {
    const res = await axiosInstance.get(`/projects/${projectId}/sdgs`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch project sdgs'));
  }
};

export const addSdgToProject = async (
  projectId: string,
  data: CreateProjectSdgRequest,
): Promise<CreateProjectSdgResponse> => {
  try {
    const res = await axiosInstance.post(`/projects/${projectId}/sdgs`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to add sdg'));
  }
};

export const removeSdgFromProject = async (
  projectId: string,
  sdgId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/projects/${projectId}/sdgs/${sdgId}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to remove sdg'));
  }
};

export const getProjectsBySdg = async (sdgId: string): Promise<ProjectSdg[]> => {
  try {
    const res = await axiosInstance.get(`/sdgs/projects/${sdgId}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch projects by sdg'));
  }
};

export const getSdgStatistics = async (): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.get('/sdgs/statistics');
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch statistics'));
  }
};

export const getSdgCoverage = async (): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.get('/sdgs/coverage');
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch coverage'));
  }
};
