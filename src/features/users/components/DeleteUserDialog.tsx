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
import { useUser, useDeleteUser } from "../hooks/useUserHooks";
import { useTranslations } from "next-intl";

interface DeleteUserDialogProps {
  userId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteUserDialog({
  userId,
  isOpen,
  onClose,
}: DeleteUserDialogProps) {
  const t = useTranslations("users");
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: user, isLoading, error } = useUser(userId ?? "");
  const { mutateAsync: deleteUser } = useDeleteUser();

  // Debug logging
  useEffect(() => {
    if (user) {
      console.log("DeleteUserDialog - User data:", user);
    }
    if (error) {
      console.error("DeleteUserDialog - Error:", error);
    }
  }, [user, error]);

  // clear input when opening
  useEffect(() => {
    if (isOpen) {
      setConfirmText("");
    }
  }, [isOpen]);

  const confirmDelete = async () => {
    if (!userId) return;
    try {
      setIsDeleting(true);
      await deleteUser(userId);
      onClose();
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle case where userId is not provided
  if (!userId) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              <p>{t("errors.userNotFound")}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("actions.close")}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Handle loading state
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
            <AlertDialogCancel disabled>
              {t("actions.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction disabled>
              {t("actions.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Handle error or missing user data
  if (error || !user) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              <p>{error ? t("errors.loadFailed") : t("errors.userNotFound")}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("actions.close")}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // once loaded
  const userDisplayName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
    user.username ||
    user.email ||
    `User ${userId}`;

  const isConfirmDisabled = confirmText !== userDisplayName;

  // Format the creation date safely
  const formatCreatedDate = (dateString: string | undefined | null) => {
    if (!dateString) return t("common.unknown") || "Unknown";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return t("common.error") || "Invalid Date";
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>
                {t("dialogs.delete.description", {
                  name: userDisplayName,
                  username: user.username ?? "",
                  email: user.email ?? "",
                })}
              </p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-sm font-medium text-destructive">
                  {t("dialogs.delete.warning")}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {t("dialogs.delete.confirmLabel", { name: userDisplayName })}
                </p>
                <Input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={userDisplayName}
                  disabled={isDeleting}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>{t("form.userType")}:</strong>{" "}
                  {user.userType ? t(`userTypes.${user.userType.toLowerCase()}`) : t("userTypes.unknown")}
                </p>
                <p>
                  <strong>{t("form.email")}:</strong> {user.email || "N/A"}
                </p>
                <p>
                  <strong>{t("table.verification")}:</strong>{" "}
                  {user.isVerified !== undefined
                    ? (user.isVerified ? t("status.verified") : t("status.unverified"))
                    : "N/A"}
                </p>
                <p>
                  <strong>{t("table.createdAt")}:</strong>{" "}
                  {formatCreatedDate(user.createdAt)}
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDelete}
            disabled={isConfirmDisabled || isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? t("actions.deleting") : t("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
