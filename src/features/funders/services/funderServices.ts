import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  Funder,
  CreateFunderRequest,
  CreateFunderResponse,
  UpdateFunderRequest,
  UpdateFunderResponse,
  QueryFunderRequest,
  QueryFunderResponse,
} from "../types/funderTypes";

export const getFunders = async (
  params?: QueryFunderRequest,
): Promise<QueryFunderResponse> => {
  try {
    const res = await axiosInstance.get("/funder", { params });
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch funders"));
  }
};

export const getFunder = async (id: string): Promise<Funder> => {
  try {
    const res = await axiosInstance.get(`/funder/${id}`);
    return res.data.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch funder"));
  }
};

export const createFunder = async (
  data: CreateFunderRequest,
): Promise<CreateFunderResponse> => {
  try {
    const res = await axiosInstance.post("/funder", data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create funder"));
  }
};

export const updateFunder = async (
  id: string,
  data: UpdateFunderRequest,
): Promise<UpdateFunderResponse> => {
  try {
    const res = await axiosInstance.patch(`/funder/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update funder"));
  }
};

export const patchFunder = async (
  id: string,
  data: UpdateFunderRequest,
): Promise<UpdateFunderResponse> => {
  try {
    const res = await axiosInstance.patch(`/funder/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update funder"));
  }
};

export const deleteFunder = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/funder/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete funder"));
  }
};
