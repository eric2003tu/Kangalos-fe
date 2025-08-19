"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Edit, Mail, Phone, Trash } from "lucide-react";
import { useFunder } from "../hooks/useFunderHooks";
import EditFunderDialog from "./EditFunderDialog";
import DeleteFunderDialog from "./DeleteFunderDialog";
import { useTranslations } from "next-intl";

interface FunderDetailsAndActionsDialogProps {
  funderId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function FunderDetailsAndActionsDialog({ funderId, isOpen, onClose }: FunderDetailsAndActionsDialogProps) {
  const t = useTranslations("funders");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: funder, isLoading } = useFunder(funderId || "");

  if (!funderId) return null;

  const formatDate = (date?: string | null) => {
    if (!date) return t("common.unknown");
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return t("common.error");
    }
  };

  if (isLoading || !funder) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t("dialogs.details.title")}</DialogTitle>
            <DialogDescription>{t("dialogs.details.description")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const displayName = funder.name;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{displayName}</DialogTitle>
            <DialogDescription>{t("dialogs.details.description")}</DialogDescription>
          </DialogHeader>

          <Card>
            <CardHeader>
              <CardTitle>{t("dialogs.details.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("form.funderType")}</p>
                <p className="text-base">{funder.funderType || "-"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("form.contactEmail")}</p>
                  <p className="text-base">{funder.contactEmail || "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("form.contactPhone")}</p>
                  <p className="text-base">{funder.contactPhone || "-"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("table.createdAt")}</p>
                    <p className="text-base">{formatDate(funder.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("table.updatedAt")}</p>
                    <p className="text-base">{formatDate(funder.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowEditDialog(true)}>
                <Edit className="h-4 w-4 mr-2" />
                {t("actions.edit")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(true)} className="text-destructive hover:text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                {t("actions.delete")}
              </Button>
            </div>
            <Button onClick={onClose}>{t("actions.close")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showEditDialog && (
        <EditFunderDialog funderId={funderId} isOpen={showEditDialog} onClose={() => setShowEditDialog(false)} />
      )}
      {showDeleteDialog && (
        <DeleteFunderDialog funderId={funderId} isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} />
      )}
    </>
  );
}
