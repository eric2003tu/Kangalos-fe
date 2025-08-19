import React from "react";
import FundersTable from "@/features/funders/components/FundersTable";
import { useTranslations } from "next-intl";

export default function FundersPage() {
  const t = useTranslations("funders");
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("pageDescription")}</p>
        </div>
        <FundersTable />
      </div>
    </div>
  );
}
