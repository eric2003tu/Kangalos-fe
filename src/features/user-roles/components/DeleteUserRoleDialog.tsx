"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteUserRole, useUserRoles } from "../hooks/useUserRoleHooks";
import { useTranslations } from "next-intl";

interface DeleteUserRoleDialogProps {
  userId: string;
  roleId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteUserRoleDialog({ userId, roleId, isOpen, onClose }: DeleteUserRoleDialogProps) {
  const t = useTranslations("userRoles");
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: assignments, isLoading, error } = useUserRoles({ userId, roleId });
  const { mutateAsync: deleteUserRole } = useDeleteUserRole(userId, roleId);

  useEffect(() => {
    if (isOpen) {
      setConfirmText("");
    }
  }, [isOpen]);

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteUserRole();
      onClose();
    } catch (err) {
      console.error("Error removing assignment:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const assignment = assignments?.data[0];

  if (isLoading) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled>{t("actions.cancel")}</AlertDialogCancel>
            <AlertDialogAction disabled>{t("actions.delete")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (error || !assignment) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              <p>{error ? t("errors.loadFailed") : t("errors.assignmentNotFound")}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("actions.close")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  const displayLabel = `${assignment.user?.firstName ?? ""} ${assignment.user?.lastName ?? ""}`.trim() || assignment.userId;
  const isConfirmDisabled = confirmText !== "YES";

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>{t("dialogs.delete.description", { user: displayLabel, role: assignment.role?.name ?? assignment.roleId })}</p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-sm font-medium text-destructive">{t("dialogs.delete.warning")}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("dialogs.delete.confirmLabel")}</p>
                <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="YES" disabled={isDeleting} className="font-mono" />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>{t("actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} disabled={isConfirmDisabled || isDeleting} className="bg-destructive hover:bg-destructive/90">
            {isDeleting ? t("actions.deleting") : t("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
