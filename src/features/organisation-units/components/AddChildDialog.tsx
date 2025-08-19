"use client";

import { useState } from "react";
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
import { useAddChildOrganisationUnit } from "../hooks/useOrganisationUnitHooks";
import { createOrganisationUnitSchema, CreateOrganisationUnitForm } from "../schemas/organisationUnitSchemas";
import { useTranslations } from "next-intl";

interface AddChildDialogProps {
  parentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddChildDialog({ parentId, isOpen, onClose }: AddChildDialogProps) {
  const t = useTranslations("organisationUnits");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: addChild } = useAddChildOrganisationUnit(parentId);

  const form = useForm<CreateOrganisationUnitForm>({
    resolver: zodResolver(createOrganisationUnitSchema),
    defaultValues: { name: "", code: "", parentId },
  });

  const onSubmit = async (data: CreateOrganisationUnitForm) => {
    try {
      setIsSubmitting(true);
      await addChild(data);
      form.reset();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("dialogs.addChild.title")}</DialogTitle>
          <DialogDescription>{t("dialogs.addChild.description")}</DialogDescription>
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
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
                <X className="h-4 w-4 mr-2" />
                {t("actions.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {t("actions.create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
