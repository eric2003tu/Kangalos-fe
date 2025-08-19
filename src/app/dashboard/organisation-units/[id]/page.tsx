"use client";

import { useOrganisationUnit } from "@/features/organisation-units/hooks/useOrganisationUnitHooks";
import OrganisationUnitUsersTable from "@/features/organisation-units/components/OrganisationUnitUsersTable";
import OrganisationUnitPositionsTable from "@/features/organisation-units/components/OrganisationUnitPositionsTable";
import OrganisationUnitProjectsTable from "@/features/organisation-units/components/OrganisationUnitProjectsTable";
import OrganisationUnitStakeholdersTable from "@/features/organisation-units/components/OrganisationUnitStakeholdersTable";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LoadingSpinner, ErrorDisplay } from "@/components/ui/feedback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OrganisationUnitDetailsPage() {
  const { id } = useParams<{ id: string; }>();
  const t = useTranslations("organisationUnits");

  const { data: unit, isLoading, error, refetch } = useOrganisationUnit(id, {
    includePositions: true,
    includeProjects: true,
    includeStakeholders: true,
    includeUsers: true,
    includeRoles: true,
    includeChildren: true,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner message={t("loading") as string} />
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ErrorDisplay error={error as Error} onRetry={refetch} title={t("error") as string} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{unit.name}</h1>
        <p className="text-muted-foreground">{unit.shortName}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("details.basicInfo")}</CardTitle>
          <CardDescription>{t("details.basicInfoDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>{t("table.code")}: </strong>
            {unit.code || "N/A"}
          </p>
          <p>
            <strong>{t("table.email")}: </strong>
            {unit.contactEmail || "N/A"}
          </p>
          <p>
            <strong>{t("table.phone")}: </strong>
            {unit.contactPhone || "N/A"}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 cursor-pointer">
          <TabsTrigger value="positions">{t("tabs.positions")}</TabsTrigger>
          <TabsTrigger value="projects">{t("tabs.projects")}</TabsTrigger>
          <TabsTrigger value="stakeholders">{t("tabs.stakeholders")}</TabsTrigger>
          <TabsTrigger value="users">{t("tabs.users")}</TabsTrigger>
        </TabsList>
        <TabsContent value="positions">
          <OrganisationUnitPositionsTable orgUnitId={id} />
        </TabsContent>
        <TabsContent value="projects">
          <OrganisationUnitProjectsTable orgUnitId={id} />
        </TabsContent>
        <TabsContent value="stakeholders">
          <OrganisationUnitStakeholdersTable orgUnitId={id} />
        </TabsContent>
        <TabsContent value="users">
          <OrganisationUnitUsersTable orgUnitId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
