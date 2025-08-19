"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteUserPosition } from "../hooks/useUserPositionHooks";
import { UserPosition } from "../types/userPositionTypes";
import { useTranslations } from "next-intl";

interface DeleteUserPositionDialogProps {
  assignment: UserPosition | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteUserPositionDialog({ assignment, isOpen, onClose }: DeleteUserPositionDialogProps) {
  const t = useTranslations("userPositions");
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutateAsync: deleteAssignment } = useDeleteUserPosition(
    assignment?.userId || "",
    assignment?.positionId || "",
    assignment?.startDate || ""
  );

  const confirmDelete = async () => {
    if (!assignment) return;
    try {
      setIsDeleting(true);
      await deleteAssignment();
      onClose();
    } catch (err) {
      console.error("Error deleting assignment:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!assignment) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("dialogs.delete.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>{t("actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
            {isDeleting ? t("actions.deleting") : t("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
