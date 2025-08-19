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
import { Skeleton } from "@/components/ui/skeleton";
import { Save, X } from "lucide-react";
import { usePermission, useUpdatePermission } from "../hooks/usePermissionHooks";
import { UpdatePermissionForm, updatePermissionSchema } from "../schemas/permissionSchemas";
import { useTranslations } from "next-intl";

interface EditPermissionDialogProps {
  permissionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditPermissionDialog({ permissionId, isOpen, onClose }: EditPermissionDialogProps) {
  const t = useTranslations("permissions");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: permission, isLoading, error } = usePermission(permissionId);
  const { mutateAsync: updatePermission } = useUpdatePermission(permissionId);

  const form = useForm<UpdatePermissionForm>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: {
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (permission) {
      form.reset({
        code: permission.code || "",
        description: permission.description || "",
      });
    }
  }, [permission, form]);

  const onSubmit = async (data: UpdatePermissionForm) => {
    try {
      setIsSubmitting(true);
      await updatePermission(data);
      onClose();
    } catch (err) {
      console.error("Error updating permission:", err);
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
          <div className="space-y-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <DialogFooter>
            <Button variant="outline" disabled>
              <X className="h-4 w-4 mr-2" />
              {t("actions.cancel")}
            </Button>
            <Button disabled>
              <Save className="h-4 w-4 mr-2" />
              {t("actions.update")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !permission) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("dialogs.edit.title")}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-destructive">{t("errors.permissionNotFound")}</p>
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
                {isSubmitting ? t("actions.updating") : t("actions.update")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
