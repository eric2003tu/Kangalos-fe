"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Save, X } from "lucide-react";
import { useOrganisationUnit, useUpdateOrganisationUnit } from "../hooks/useOrganisationUnitHooks";
import { UpdateOrganisationUnitForm, updateOrganisationUnitSchema } from "../schemas/organisationUnitSchemas";
import { useTranslations } from "next-intl";

interface EditOrganisationUnitDialogProps {
  unitId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditOrganisationUnitDialog({ unitId, isOpen, onClose }: EditOrganisationUnitDialogProps) {
  const t = useTranslations("organisationUnits");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: unit, isLoading, error } = useOrganisationUnit(unitId);
  const { mutateAsync: updateUnit } = useUpdateOrganisationUnit(unitId);

  const form = useForm<UpdateOrganisationUnitForm>({
    resolver: zodResolver(updateOrganisationUnitSchema),
    defaultValues: { name: "", code: "", parentId: undefined },
  });

  useEffect(() => {
    if (unit) {
      form.reset({ name: unit.name || "", code: unit.code || "", parentId: unit.parentId || undefined });
    }
  }, [unit, form]);

  const onSubmit = async (data: UpdateOrganisationUnitForm) => {
    try {
      setIsSubmitting(true);
      await updateUnit(data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("dialogs.edit.title")}</DialogTitle>
            <DialogDescription>{t("dialogs.edit.description")}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !unit) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("dialogs.edit.title")}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-destructive">{t("errors.unitNotFound")}</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              {t("actions.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("dialogs.edit.title")}</DialogTitle>
          <DialogDescription>{t("dialogs.edit.description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.namePlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.code")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.codePlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                <X className="h-4 w-4 mr-2" />
                {t("actions.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {t("actions.update")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
