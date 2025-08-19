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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Save, X } from "lucide-react";
import { useCreateUserPosition } from "../hooks/useUserPositionHooks";
import { useUsers } from "../../users/hooks/useUserHooks";
import { usePositions } from "../../positions/hooks/usePositionHooks";
import { CreateUserPositionForm, createUserPositionSchema } from "../schemas/userPositionSchemas";
import { useTranslations } from "next-intl";

interface CreateUserPositionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUserPositionDialog({ isOpen, onClose }: CreateUserPositionDialogProps) {
  const t = useTranslations("userPositions");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createAssignment } = useCreateUserPosition();
  const { data: usersRes } = useUsers();
  const { data: positionsRes } = usePositions();

  const form = useForm<CreateUserPositionForm>({
    resolver: zodResolver(createUserPositionSchema),
    defaultValues: {
      userId: "",
      positionId: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data: CreateUserPositionForm) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
        endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
      };
      await createAssignment(payload);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error creating assignment:", error);
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
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.userIdPlaceholder") as string} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(usersRes?.data || []).map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.username || `${u.firstName} ${u.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="positionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.positionId")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.positionIdPlaceholder") as string} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(positionsRes?.data || []).map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
