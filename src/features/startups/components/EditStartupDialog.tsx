"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save, X } from "lucide-react";
import { useStartup, useUpdateStartup } from "../hooks/useStartupHooks";
import {
  updateStartupSchema,
  UpdateStartupForm,
} from "../schemas/startupSchemas";
import { useTranslations } from "next-intl";

interface EditStartupDialogProps {
  startupId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditStartupDialog({
  startupId,
  isOpen,
  onClose,
}: EditStartupDialogProps) {
  const t = useTranslations("startups");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: startup, isLoading } = useStartup(startupId);
  const { mutateAsync: updateStartup } = useUpdateStartup(startupId);

  const form = useForm<UpdateStartupForm>({
    resolver: zodResolver(updateStartupSchema),
    defaultValues: {
      name: "",
      description: "",
      projectId: "",
      year: new Date().getFullYear(),
      registered: false,
    },
  });

  useEffect(() => {
    if (startup) {
      form.reset({
        name: startup.name,
        description: startup.description || "",
        projectId: startup.projectId,
        year: startup.year,
        registered: startup.registered,
      });
    }
  }, [startup, form]);

  const onSubmit = async (data: UpdateStartupForm) => {
    try {
      setIsSubmitting(true);
      await updateStartup(data);
      onClose();
    } catch (err) {
      console.error("Error updating startup:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                    <Input
                      placeholder={t("form.namePlaceholder") as string}
                      {...field}
                      disabled={isSubmitting || isLoading}
                    />
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
                    <Input
                      placeholder={t("form.descriptionPlaceholder") as string}
                      {...field}
                      disabled={isSubmitting || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.projectId")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.projectIdPlaceholder") as string}
                      {...field}
                      disabled={isSubmitting || isLoading}
                    />
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
                    <Input
                      type="number"
                      placeholder={t("form.yearPlaceholder") as string}
                      {...field}
                      disabled={isSubmitting || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registered"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting || isLoading}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("form.registered")}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
              >
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

