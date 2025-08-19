import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  Position,
  CreatePositionRequest,
  CreatePositionResponse,
  UpdatePositionRequest,
  UpdatePositionResponse,
  QueryPositionRequest,
  QueryPositionResponse,
  AssignUserToPositionRequest,
  UpdatePositionOccupancyRequest,
  GetPositionOccupantsRequest,
} from "../types/positionTypes";

export const getPositions = async (
  params?: QueryPositionRequest,
): Promise<QueryPositionResponse> => {
  try {
    const res = await axiosInstance.get("/positions", { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch positions"));
  }
};

export const getPosition = async (id: string): Promise<Position> => {
  try {
    const res = await axiosInstance.get(`/positions/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch position"));
  }
};

export const createPosition = async (
  data: CreatePositionRequest,
): Promise<CreatePositionResponse> => {
  try {
    const res = await axiosInstance.post("/positions", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create position"));
  }
};

export const patchPosition = async (
  id: string,
  data: UpdatePositionRequest,
): Promise<UpdatePositionResponse> => {
  try {
    const res = await axiosInstance.patch(`/positions/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update position"));
  }
};

export const updatePosition = async (
  id: string,
  data: UpdatePositionRequest,
): Promise<UpdatePositionResponse> => {
  try {
    const res = await axiosInstance.put(`/positions/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update position"));
  }
};

export const deletePosition = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/positions/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete position"));
  }
};

export const getPositionOccupants = async (
  id: string,
  params?: GetPositionOccupantsRequest,
): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.get(`/positions/${id}/occupants`, { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch occupants"));
  }
};

export const assignUserToPosition = async (
  id: string,
  data: AssignUserToPositionRequest,
): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.post(`/positions/${id}/occupants`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to assign user"));
  }
};

export const updatePositionOccupancy = async (
  id: string,
  userId: string,
  data: UpdatePositionOccupancyRequest,
): Promise<Record<string, unknown>> => {
  try {
    const res = await axiosInstance.put(
      `/positions/${id}/occupants/${userId}`,
      data,
    );
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update occupancy"));
  }
};

export const removePositionOccupancy = async (
  id: string,
  userId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/positions/${id}/occupants/${userId}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to remove occupancy"));
  }
};
