import React from "react";
import PermissionsTable from "@/features/permissions/components/PermissionsTable";
import { useTranslations } from "next-intl";

export default function PermissionsPage() {
  const t = useTranslations("permissions");
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("pageDescription")}</p>
        </div>
        <PermissionsTable />
      </div>
    </div>
  );
}
