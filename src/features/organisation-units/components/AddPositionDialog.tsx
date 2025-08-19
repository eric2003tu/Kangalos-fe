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
import { useCreatePosition } from "@/features/positions/hooks/usePositionHooks";
import { createPositionSchema, CreatePositionForm } from "@/features/positions/schemas/positionSchemas";
import { useTranslations } from "next-intl";

interface AddPositionDialogProps {
  orgUnitId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPositionDialog({ orgUnitId, isOpen, onClose }: AddPositionDialogProps) {
  const t = useTranslations("positions");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createPosition } = useCreatePosition();

  const form = useForm<CreatePositionForm>({
    resolver: zodResolver(createPositionSchema),
    defaultValues: { title: "", description: "", organisationUnitId: orgUnitId },
  });

  const onSubmit = async (data: CreatePositionForm) => {
    try {
      setIsSubmitting(true);
      await createPosition(data);
      form.reset({ title: "", description: "", organisationUnitId: orgUnitId });
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
