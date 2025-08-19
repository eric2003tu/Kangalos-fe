"use client";

import { useState } from "react";
import { OrganizationTree, OrganisationUnitTable, OrgNode } from "@/components/global/tree";
import { useOrganisationUnitTree } from "@/features/organisation-units/hooks/useOrganisationUnitHooks";
import { transformOrganisationUnitsToOrgNodes } from "@/features/organisation-units/utils/transformers";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { LoadingSpinner, ErrorDisplay, EmptyState } from "@/components/ui/feedback";
import { useTranslations } from "next-intl";

export default function OrganisationUnitsPage() {
  const t = useTranslations("organisationUnits");
  const [selectedOrgData, setSelectedOrgData] = useState<OrgNode | null>(null);

  // Fetch organisation unit tree from API
  const {
    data: organisationUnits,
    isLoading: isTreeLoading,
    error: treeError,
    refetch: refetchTree
  } = useOrganisationUnitTree({ includePositions: true });

  // Transform API data to component format
  const treeData = organisationUnits ? { data: transformOrganisationUnitsToOrgNodes(organisationUnits) } : { data: [] };

  const handleTableRowClick = (unit: OrgNode) => {
    setSelectedOrgData(unit);
  };

  // Loading state
  if (isTreeLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner message={t("loading")} />
      </div>
    );
  }

  // Error state
  if (treeError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ErrorDisplay
          error={treeError}
          onRetry={refetchTree}
          title={t("error")}
        />
      </div>
    );
  }

  // Empty state
  if (!treeData || treeData.data.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <EmptyState
          title={t("empty.title")}
          description={t("empty.description")}
        />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="h-full p-4 overflow-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">{t("page.title")}</h1>
              <p className="text-muted-foreground text-sm">
                {t("page.description")}
              </p>
            </div>
            <div className="h-full">
              <OrganisationUnitTable
                selectedUnit={selectedOrgData || undefined}
                onRowClick={handleTableRowClick}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full p-4 border-l bg-gray-50/50 overflow-auto">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">{t("tree.title")}</h2>
              <p className="text-muted-foreground text-xs">
                {t("tree.instructions")}
              </p>
            </div>
            <OrganizationTree
              data={treeData}
              treeLabel={t("tree.title")}
              rootLabel={t("tree.rootLabel")}
              initiallyExpandedItems={["root"]}
              onSelectionChange={setSelectedOrgData}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
