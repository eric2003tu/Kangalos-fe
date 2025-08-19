"use client";

import { useState } from "react";
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
import { Save, X } from "lucide-react";
import { useCreateRole } from "../hooks/useRoleHooks";
import { CreateRoleForm, createRoleSchema } from "../schemas/roleSchemas";
import { useTranslations } from "next-intl";

interface CreateRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoleDialog({ isOpen, onClose }: CreateRoleDialogProps) {
  const t = useTranslations("rolesFeature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createRole } = useCreateRole();

  const form = useForm<CreateRoleForm>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      organisationUnitId: "",
    },
  });

  const onSubmit = async (data: CreateRoleForm) => {
    try {
      setIsSubmitting(true);
      await createRole(data);
      form.reset();
      onClose();
    } catch (err) {
      console.error("Error creating role:", err);
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
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
                <X className="h-4 w-4 mr-2" />
                {t("actions.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? t("actions.creating") : t("actions.create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
