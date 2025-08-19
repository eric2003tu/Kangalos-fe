import axiosInstance from "@/lib/axiosConfig";
import { handleAxiosError } from "@/lib/errorHandler";
import type {
  Attachment,
  CreateAttachmentRequest,
  CreateAttachmentResponse,
  UpdateAttachmentRequest,
  UpdateAttachmentResponse,
  QueryAttachmentsRequest,
  QueryAttachmentsResponse,
} from "../types/attachmentTypes";

export const getAttachments = async (
  params?: QueryAttachmentsRequest,
): Promise<QueryAttachmentsResponse> => {
  try {
    const response = await axiosInstance.get("/attachments", { params });
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch attachments"));
  }
};

export const getAttachment = async (id: string): Promise<Attachment> => {
  try {
    const response = await axiosInstance.get(`/attachments/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch attachment"));
  }
};

export const createAttachment = async (
  data: CreateAttachmentRequest,
): Promise<CreateAttachmentResponse> => {
  try {
    const response = await axiosInstance.post("/attachments", data);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to create attachment"));
  }
};

export const updateAttachment = async (
  id: string,
  data: UpdateAttachmentRequest,
): Promise<UpdateAttachmentResponse> => {
  try {
    const response = await axiosInstance.put(`/attachments/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to update attachment"));
  }
};

export const deleteAttachment = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/attachments/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to delete attachment"));
  }
};

export const getDownloadUrl = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.get(`/attachments/${id}/download`);
    return response.data.url;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to get download url"));
  }
};

export const getAttachmentMetadata = async (
  id: string,
): Promise<Record<string, unknown>> => {
  try {
    const response = await axiosInstance.get(`/attachments/${id}/metadata`);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch metadata"));
  }
};

export const getAttachmentsByProject = async (
  projectId: string,
): Promise<Attachment[]> => {
  try {
    const response = await axiosInstance.get(`/attachments/by-project/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch attachments"));
  }
};

export const getAttachmentsByUploader = async (
  userId: string,
): Promise<Attachment[]> => {
  try {
    const response = await axiosInstance.get(`/attachments/by-uploader/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to fetch attachments"));
  }
};
