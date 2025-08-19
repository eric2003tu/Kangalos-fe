import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAttachments,
  getAttachment,
  createAttachment,
  updateAttachment,
  deleteAttachment,
  getDownloadUrl,
  getAttachmentMetadata,
  getAttachmentsByProject,
  getAttachmentsByUploader,
} from "../services/attachmentServices";
import type {
  CreateAttachmentRequest,
  UpdateAttachmentRequest,
  QueryAttachmentsRequest,
} from "../types/attachmentTypes";
import toast from "react-hot-toast";

export const useAttachments = (params?: QueryAttachmentsRequest) => {
  return useQuery({
    queryKey: ["attachments", params],
    queryFn: () => getAttachments(params),
  });
};

export const useAttachment = (id: string) => {
  return useQuery({
    queryKey: ["attachment", id],
    queryFn: () => getAttachment(id),
    enabled: !!id,
  });
};

export const useCreateAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAttachmentRequest) => createAttachment(data),
    onSuccess: () => {
      toast.success("Attachment created successfully");
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create attachment");
    },
  });
};

export const useUpdateAttachment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAttachmentRequest) => updateAttachment(id, data),
    onSuccess: () => {
      toast.success("Attachment updated successfully");
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
      queryClient.invalidateQueries({ queryKey: ["attachment", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update attachment");
    },
  });
};

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAttachment(id),
    onSuccess: () => {
      toast.success("Attachment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete attachment");
    },
  });
};

export const useDownloadAttachment = (id: string) => {
  return useQuery({
    queryKey: ["attachment", id, "download"],
    queryFn: () => getDownloadUrl(id),
    enabled: !!id,
  });
};

export const useAttachmentMetadata = (id: string) => {
  return useQuery({
    queryKey: ["attachment", id, "metadata"],
    queryFn: () => getAttachmentMetadata(id),
    enabled: !!id,
  });
};

export const useAttachmentsByProject = (projectId: string) => {
  return useQuery({
    queryKey: ["attachments", "project", projectId],
    queryFn: () => getAttachmentsByProject(projectId),
    enabled: !!projectId,
  });
};

export const useAttachmentsByUploader = (userId: string) => {
  return useQuery({
    queryKey: ["attachments", "uploader", userId],
    queryFn: () => getAttachmentsByUploader(userId),
    enabled: !!userId,
  });
};
