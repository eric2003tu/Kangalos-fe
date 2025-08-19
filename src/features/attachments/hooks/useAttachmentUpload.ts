"use client";
import { useUploadThing } from "@/lib/uploadthing";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { createAttachment } from "../services/attachmentServices";
import type { CreateAttachmentRequest } from "../types/attachmentTypes";

interface UseAttachmentUploadParams {
  uploaderId?: string;
  projectId?: string;
}

export const useAttachmentUpload = (
  { uploaderId, projectId }: UseAttachmentUploadParams,
) => {
  const t = useTranslations("attachments");

  const { startUpload, isUploading } = useUploadThing("attachmentUploader", {
    onClientUploadComplete: async (res) => {
      if (!res || !uploaderId) return;
      try {
        await Promise.all(
          res.map((file) => {
            const payload: CreateAttachmentRequest = {
              uploaderId,
              projectId,
              filename: file.name,
              url: file.url,
              fileType: file.type,
              fileSize: file.size,
            };
            return createAttachment(payload);
          }),
        );
        toast.success(t("uploadSuccess"));
      } catch {
        toast.error(t("uploadError"));
      }
    },
    onUploadError: () => {
      toast.error(t("uploadError"));
    },
  });

  const handleUpload = async (files: File[]) => {
    if (!uploaderId) {
      toast.error(t("uploadError"));
      return;
    }
    await startUpload(files);
  };

  return { handleUpload, isUploading };
};
