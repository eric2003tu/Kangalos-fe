"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import UserSelect from "./UserSelect";
import RoleSelect from "./RoleSelect";
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
import { useCreateUserRole } from "../hooks/useUserRoleHooks";
import { CreateUserRoleForm, createUserRoleSchema } from "../schemas/userRoleSchemas";
import { useTranslations } from "next-intl";

interface CreateUserRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUserRoleDialog({ isOpen, onClose }: CreateUserRoleDialogProps) {
  const t = useTranslations("userRoles");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createUserRole } = useCreateUserRole();

  const form = useForm<CreateUserRoleForm>({
    resolver: zodResolver(createUserRoleSchema),
    defaultValues: {
      userId: "",
      roleId: "",
    },
  });

  const onSubmit = async (data: CreateUserRoleForm) => {
    try {
      setIsSubmitting(true);
      await createUserRole(data);
      form.reset();
      onClose();
    } catch (err) {
      console.error("Error assigning role:", err);
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
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.userId")}</FormLabel>
                  <FormControl>
                    <UserSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("form.userIdPlaceholder") as string}
                    />
                    <Input placeholder={t("form.userIdPlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.roleId")}</FormLabel>
                  <FormControl>
                    <RoleSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("form.roleIdPlaceholder") as string}
                    />
                    <Input placeholder={t("form.roleIdPlaceholder") as string} {...field} disabled={isSubmitting} />
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
                {isSubmitting ? t("actions.creating") : t("actions.create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
