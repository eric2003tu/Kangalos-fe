import React from "react";
import StartupsTable from "@/features/startups/components/StartupsTable";
import { useTranslations } from "next-intl";

export default function StartupsPage() {
  const t = useTranslations("startups");
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("pageDescription")}</p>
        </div>
        <StartupsTable />
      </div>
    </div>
  );
}
