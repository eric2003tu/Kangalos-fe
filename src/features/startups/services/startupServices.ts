import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  Startup,
  CreateStartupRequest,
  CreateStartupResponse,
  UpdateStartupRequest,
  UpdateStartupResponse,
  QueryStartupRequest,
  QueryStartupResponse,
} from '../types/startupTypes';

export const getStartups = async (
  params?: QueryStartupRequest,
): Promise<QueryStartupResponse> => {
  try {
    const res = await axiosInstance.get('/startups', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch startups'));
  }
};

export const getStartup = async (id: string): Promise<Startup> => {
  try {
    const res = await axiosInstance.get(`/startups/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch startup'));
  }
};

export const createStartup = async (
  data: CreateStartupRequest,
): Promise<CreateStartupResponse> => {
  try {
    const res = await axiosInstance.post('/startups', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to create startup'));
  }
};

export const updateStartup = async (
  id: string,
  data: UpdateStartupRequest,
): Promise<UpdateStartupResponse> => {
  try {
    const res = await axiosInstance.put(`/startups/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update startup'));
  }
};

export const deleteStartup = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/startups/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete startup'));
  }
};

export const getStartupByProject = async (projectId: string): Promise<Startup> => {
  try {
    const res = await axiosInstance.get(`/startups/by-project/${projectId}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch startup'));
  }
};

export const getRegisteredStartups = async (): Promise<Startup[]> => {
  try {
    const res = await axiosInstance.get('/startups/registered');
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch startups'));
  }
};

export const getStartupsByYear = async (year: number): Promise<Startup[]> => {
  try {
    const res = await axiosInstance.get(`/startups/by-year/${year}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch startups'));
  }
};
