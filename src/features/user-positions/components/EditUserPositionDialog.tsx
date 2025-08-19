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
import { useUpdateUserPosition } from "../hooks/useUserPositionHooks";
import { UpdateUserPositionForm, updateUserPositionSchema } from "../schemas/userPositionSchemas";
import { UserPosition } from "../types/userPositionTypes";
import { useTranslations } from "next-intl";

interface EditUserPositionDialogProps {
  assignment: UserPosition;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditUserPositionDialog({ assignment, isOpen, onClose }: EditUserPositionDialogProps) {
  const t = useTranslations("userPositions");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: updateAssignment } = useUpdateUserPosition(
    assignment.userId,
    assignment.positionId,
    assignment.startDate
  );

  const form = useForm<UpdateUserPositionForm>({
    resolver: zodResolver(updateUserPositionSchema),
    defaultValues: {
      userId: assignment.userId,
      positionId: assignment.positionId,
      startDate: assignment.startDate ? assignment.startDate.slice(0, 10) : "",
      endDate: assignment.endDate ? assignment.endDate.slice(0, 10) : "",
    },
  });

  const onSubmit = async (data: UpdateUserPositionForm) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
        endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
      };
      await updateAssignment(payload);
      onClose();
    } catch (error) {
      console.error("Error updating assignment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.startDate")}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.endDate")}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={isSubmitting} />
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
