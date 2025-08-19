"use client";
import React from "react";
import { useAttachmentUpload } from "@/features/attachments/hooks/useAttachmentUpload";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function AttachmentsPage() {
  const t = useTranslations("attachments");
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || undefined;
  const uploaderId = session?.user?.id;

  const { handleUpload, isUploading } = useAttachmentUpload({
    uploaderId,
    projectId,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    void handleUpload(Array.from(e.target.files));
    e.target.value = "";
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{t("title")}</h1>
      <label className="block mb-2" htmlFor="file-upload">
        {t("upload")}
      </label>
      <input id="file-upload" type="file" multiple onChange={onChange} />
      {isUploading && <p className="mt-2 text-sm">{t("uploading")}</p>}
    </div>
  );
}
