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
import { useCreateFunder } from "../hooks/useFunderHooks";
import { CreateFunderForm, createFunderSchema } from "../schemas/funderSchemas";
import { useTranslations } from "next-intl";

interface CreateFunderDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateFunderDialog({ isOpen, onClose }: CreateFunderDialogProps) {
  const t = useTranslations("funders");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createFunder } = useCreateFunder();

  const form = useForm<CreateFunderForm>({
    resolver: zodResolver(createFunderSchema),
    defaultValues: {
      name: "",
      funderType: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const onSubmit = async (data: CreateFunderForm) => {
    try {
      setIsSubmitting(true);
      await createFunder(data);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error creating funder:", error);
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
              name="funderType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.funderType")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.funderTypePlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.contactEmail")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("form.contactEmailPlaceholder") as string} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.contactPhone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.contactPhonePlaceholder") as string} {...field} disabled={isSubmitting} />
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
