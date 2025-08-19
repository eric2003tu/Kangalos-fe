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
import { useCategory, useUpdateCategory } from "../hooks/useCategoryHooks";
import { updateCategorySchema, type UpdateCategoryForm } from "../schemas/categorySchemas";
import { useTranslations } from "next-intl";

interface EditCategoryDialogProps {
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditCategoryDialog({ categoryId, isOpen, onClose }: EditCategoryDialogProps) {
  const t = useTranslations("categories");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: category, isLoading, error } = useCategory(categoryId);
  const { mutateAsync: updateCategory } = useUpdateCategory(categoryId);

  const form = useForm<UpdateCategoryForm>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: { name: "", description: "", parentId: undefined },
  });

  useEffect(() => {
    if (category) {
      form.reset({ name: category.name || "", description: category.description || "", parentId: category.parentId || undefined });
    }
  }, [category, form]);

  const onSubmit = async (data: UpdateCategoryForm) => {
    try {
      setIsSubmitting(true);
      await updateCategory(data);
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

  if (error || !category) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("dialogs.edit.title")}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-destructive">{t("errors.categoryNotFound")}</p>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.description")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.descriptionPlaceholder") as string} {...field} disabled={isSubmitting} />
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
