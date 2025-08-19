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
import { useCreateProject } from "@/features/projects/hooks/useProjectHooks";
import { createProjectSchema, CreateProjectForm } from "@/features/projects/schemas/projectSchemas";
import type { CreateProjectRequest } from "@/features/projects/types/projectTypes";
import { useTranslations } from "next-intl";

interface AddProjectDialogProps {
  orgUnitId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProjectDialog({ orgUnitId, isOpen, onClose }: AddProjectDialogProps) {
  const t = useTranslations("projects");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createProject } = useCreateProject();

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      titleNorm: "",
      projectType: "",
      year: new Date().getFullYear(),
      organisationUnitId: orgUnitId,
    },
  });

  const onSubmit = async (data: CreateProjectForm) => {
    try {
      setIsSubmitting(true);
      await createProject(data as CreateProjectRequest);
      form.reset({
        title: "",
        titleNorm: "",
        projectType: "",
        year: new Date().getFullYear(),
        organisationUnitId: orgUnitId,
      });
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
          <DialogTitle>{t("dialogs.create.title")}</DialogTitle>
          <DialogDescription>{t("dialogs.create.description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.title")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.titlePlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleNorm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.titleNorm")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.titleNormPlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.projectType")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.projectTypePlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.year")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isSubmitting} />
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
