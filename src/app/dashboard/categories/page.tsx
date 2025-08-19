"use client";

import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import CategoryTable from "@/features/categories/components/CategoryTable";
import CategorySidebar from "@/features/categories/components/CategorySidebar";
import { useTranslations } from "next-intl";

export default function CategoriesPage() {
  const t = useTranslations("categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="h-full p-4 overflow-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">{t("page.title")}</h1>
              <p className="text-muted-foreground text-sm">{t("page.description")}</p>
            </div>
            <div className="h-full">
              <CategoryTable
                selectedCategoryId={selectedCategoryId ?? undefined}
                onRowClick={(category) => setSelectedCategoryId(category.id)}
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <CategorySidebar onSelect={setSelectedCategoryId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
