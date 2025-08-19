"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OrganisationUnitSelect from "./OrganisationUnitSelect";
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
import { useRole, useUpdateRole } from "../hooks/useRoleHooks";
import { UpdateRoleForm, updateRoleSchema } from "../schemas/roleSchemas";
import { useTranslations } from "next-intl";

interface EditRoleDialogProps {
  roleId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditRoleDialog({ roleId, isOpen, onClose }: EditRoleDialogProps) {
  const t = useTranslations("rolesFeature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: role, isLoading, error } = useRole(roleId);
  const { mutateAsync: updateRole } = useUpdateRole(roleId);

  const form = useForm<UpdateRoleForm>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      organisationUnitId: "",
    },
  });

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name || "",
        description: role.description || "",
        organisationUnitId: role.organisationUnitId || "",
      });
    }
  }, [role, form]);

  const onSubmit = async (data: UpdateRoleForm) => {
    try {
      setIsSubmitting(true);
      await updateRole(data);
      onClose();
    } catch (err) {
      console.error("Error updating role:", err);
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

  if (error || !role) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("dialogs.edit.title")}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-destructive">{t("errors.roleNotFound")}</p>
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
            <FormField
              control={form.control}
              name="organisationUnitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.organisationUnit")}</FormLabel>
                  <OrganisationUnitSelect
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t("form.organisationUnitPlaceholder") as string}
                  />
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
