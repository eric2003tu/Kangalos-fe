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
import { useFunder, useUpdateFunder } from "../hooks/useFunderHooks";
import { UpdateFunderForm, updateFunderSchema } from "../schemas/funderSchemas";
import { useTranslations } from "next-intl";

interface EditFunderDialogProps {
  funderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditFunderDialog({ funderId, isOpen, onClose }: EditFunderDialogProps) {
  const t = useTranslations("funders");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: funder, isLoading, error } = useFunder(funderId);
  const { mutateAsync: updateFunder } = useUpdateFunder(funderId);

  const form = useForm<UpdateFunderForm>({
    resolver: zodResolver(updateFunderSchema),
    defaultValues: {
      name: "",
      funderType: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  useEffect(() => {
    if (funder) {
      form.reset({
        name: funder.name || "",
        funderType: funder.funderType || "",
        contactEmail: funder.contactEmail || "",
        contactPhone: funder.contactPhone || "",
      });
    }
  }, [funder, form]);

  const onSubmit = async (data: UpdateFunderForm) => {
    try {
      setIsSubmitting(true);
      await updateFunder(data);
      onClose();
    } catch (err) {
      console.error("Error updating funder:", err);
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

  if (error || !funder) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("dialogs.edit.title")}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-destructive">{t("errors.funderNotFound")}</p>
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
