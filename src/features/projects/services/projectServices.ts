import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  Project,
  CreateProjectRequest,
  CreateProjectResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
  QueryProjectRequest,
  QueryProjectResponse,
} from '../types/projectTypes';

export const getProjects = async (
  params?: QueryProjectRequest,
): Promise<QueryProjectResponse> => {
  try {
    const res = await axiosInstance.get('/projects', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch projects'));
  }
};

export const searchProjects = async (
  params?: QueryProjectRequest,
): Promise<QueryProjectResponse> => {
  try {
    const res = await axiosInstance.get('/projects/search', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to search projects'));
  }
};

export const getProject = async (id: string): Promise<Project> => {
  try {
    const res = await axiosInstance.get(`/projects/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch project'));
  }
};

export const createProject = async (
  data: CreateProjectRequest,
): Promise<CreateProjectResponse> => {
  try {
    const res = await axiosInstance.post('/projects/project', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to create project'));
  }
};

export const updateProject = async (
  id: string,
  data: UpdateProjectRequest,
): Promise<UpdateProjectResponse> => {
  try {
    const res = await axiosInstance.patch(`/projects/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update project'));
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/projects/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete project'));
  }
};
