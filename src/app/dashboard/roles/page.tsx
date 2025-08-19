import React from "react";
import RolesTable from "@/features/roles/components/RolesTable";
import { useTranslations } from "next-intl";

export default function RolesPage() {
  const t = useTranslations("rolesFeature");
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("pageDescription")}</p>
        </div>
        <RolesTable />
      </div>
    </div>
  );
}
