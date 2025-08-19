import axiosInstance from '@/lib/axiosConfig';
import { handleAxiosError } from '@/lib/errorHandler';
import type {
  CreateUserPositionRequest,
  CreateUserPositionResponse,
  UpdateUserPositionRequest,
  UpdateUserPositionResponse,
  GetUserPositionsRequest,
  GetUserPositionsResponse,
} from '../types/userPositionTypes';

export const createUserPosition = async (
  data: CreateUserPositionRequest,
): Promise<CreateUserPositionResponse> => {
  try {
    const res = await axiosInstance.post('/user-positions', data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to assign position'));
  }
};

export const getUserPositions = async (
  params?: GetUserPositionsRequest,
): Promise<GetUserPositionsResponse> => {
  try {
    const res = await axiosInstance.get('/user-positions', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch assignments'));
  }
};

export const getPositionsForUser = async (
  userId: string,
  params?: GetUserPositionsRequest,
): Promise<GetUserPositionsResponse> => {
  try {
    const res = await axiosInstance.get(`/user-positions/user/${userId}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch assignments'));
  }
};

export const getUsersForPosition = async (
  positionId: string,
  params?: GetUserPositionsRequest,
): Promise<GetUserPositionsResponse> => {
  try {
    const res = await axiosInstance.get(`/user-positions/position/${positionId}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to fetch assignments'));
  }
};

export const updateUserPosition = async (
  userId: string,
  positionId: string,
  startDate: string,
  data: UpdateUserPositionRequest,
): Promise<UpdateUserPositionResponse> => {
  try {
    const res = await axiosInstance.patch(
      `/user-positions/${userId}/${positionId}/${startDate}`,
      data,
    );
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update assignment'));
  }
};

export const updateUserPositionByQuery = async (
  userId: string,
  positionId: string,
  startDate: string,
  data: UpdateUserPositionRequest,
): Promise<UpdateUserPositionResponse> => {
  try {
    const res = await axiosInstance.put(
      `/user-positions/${userId}/${positionId}`,
      data,
      { params: { startDate } },
    );
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to update assignment'));
  }
};

export const deleteUserPosition = async (
  userId: string,
  positionId: string,
  startDate: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/user-positions/${userId}/${positionId}/${startDate}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete assignment'));
  }
};

export const deleteUserPositionByQuery = async (
  userId: string,
  positionId: string,
  startDate: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/user-positions/${userId}/${positionId}`, {
      params: { startDate },
    });
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to delete assignment'));
  }
};
