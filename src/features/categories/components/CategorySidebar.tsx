"use client";

import { OrganizationTree } from "@/components/global/tree";
import { useCategoryTree } from "../hooks/useCategoryHooks";
import { transformCategoriesToOrgNodes } from "../utils/transformers";
import { LoadingSpinner, ErrorDisplay } from "@/components/ui/feedback";
import { useTranslations } from "next-intl";

interface CategorySidebarProps {
  onSelect: (id: string | null) => void;
}

export default function CategorySidebar({ onSelect }: CategorySidebarProps) {
  const t = useTranslations("categories");
  const { data, isLoading, error, refetch } = useCategoryTree();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingSpinner message={t("loading")} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error as Error}
        onRetry={refetch}
        title={t("error")}
      />
    );
  }

  const nodes = transformCategoriesToOrgNodes(data || []);

  if (nodes.length === 0) {
    return (
      <ErrorDisplay
        error={new Error(t("empty.title"))}
        onRetry={refetch}
        title={t("error")}
      />
    );
  }

  return (
    <div className="h-full p-4 border-l bg-gray-50/50 overflow-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">{t("tree.title")}</h2>
        <p className="text-muted-foreground text-xs">{t("tree.instructions")}</p>
      </div>
      <OrganizationTree
        data={{ data: nodes }}
        treeLabel={t("tree.title")}
        rootLabel={t("tree.rootLabel")}
        initiallyExpandedItems={["root"]}
        onSelectionChange={(node) => {
          const id = node?.id === "root" ? null : node?.id || null;
          onSelect(id);
        }}
      />
    </div>
  );
}

