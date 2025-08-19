import React from "react";
import UsersTable from "@/features/users/components/UsersTable";
import { useTranslations } from "next-intl";

export default function UsersPage() {
  const t = useTranslations("users");
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">
            {t("pageDescription")}
          </p>
        </div>
        <UsersTable />
      </div>
    </div>
  );
}
