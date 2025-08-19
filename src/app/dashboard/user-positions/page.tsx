import React from "react";
import UserPositionsTable from "@/features/user-positions/components/UserPositionsTable";
import { useTranslations } from "next-intl";

export default function UserPositionsPage() {
  const t = useTranslations("userPositions");
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("pageDescription")}</p>
        </div>
        <UserPositionsTable />
      </div>
    </div>
  );
}
