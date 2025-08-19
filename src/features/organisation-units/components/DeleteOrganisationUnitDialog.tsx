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
import { useOrganisationUnit, useDeleteOrganisationUnit } from "../hooks/useOrganisationUnitHooks";
import { useTranslations } from "next-intl";

interface DeleteOrganisationUnitDialogProps {
  unitId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteOrganisationUnitDialog({ unitId, isOpen, onClose }: DeleteOrganisationUnitDialogProps) {
  const t = useTranslations("organisationUnits");
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: unit, isLoading, error } = useOrganisationUnit(unitId || "");
  const { mutateAsync: deleteUnit } = useDeleteOrganisationUnit();

  useEffect(() => {
    if (isOpen) {
      setConfirmText("");
    }
  }, [isOpen]);

  const confirmDelete = async () => {
    if (!unitId) return;
    try {
      setIsDeleting(true);
      await deleteUnit(unitId);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  if (!unitId) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              <p>{t("errors.unitNotFound")}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("actions.close")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

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

  if (error || !unit) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              <p>{error ? t("errors.loadFailed") : t("errors.unitNotFound")}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("actions.close")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  const displayName = unit.name || `Unit ${unitId}`;
  const isConfirmDisabled = confirmText !== displayName;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogs.delete.title")}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>{t("dialogs.delete.description", { name: displayName })}</p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-sm font-medium text-destructive">{t("dialogs.delete.warning")}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("dialogs.delete.confirmLabel", { name: displayName })}</p>
                <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder={displayName} disabled={isDeleting} className="font-mono" />
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
