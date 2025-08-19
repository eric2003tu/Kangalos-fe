"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Search, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "mantine-react-table";
import { useProjects } from "@/features/projects/hooks/useProjectHooks";
import { Project } from "@/features/projects/types/projectTypes";
import AddProjectDialog from "./AddProjectDialog";
import { useTranslations } from "next-intl";

interface Props {
  orgUnitId: string;
}

export default function OrganisationUnitProjectsTable({ orgUnitId }: Props) {
  const t = useTranslations("projects");
  const { data: response, isLoading, error, refetch } = useProjects({ organisationUnitId: orgUnitId });
  const projects = response?.data || [];
  const [isRefetching, setIsRefetching] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    title: true,
    projectType: true,
    year: true,
  });

  const handleRefresh = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
      { accessorKey: "title", header: t("table.title") },
      { accessorKey: "projectType", header: t("table.projectType") },
      { accessorKey: "year", header: t("table.year") },
    ],
    [t],
  );

  const table = useMantineReactTable({
    columns,
    data: projects,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enablePagination: true,
    enableSorting: true,
    enableTopToolbar: true,
    enableBottomToolbar: true,
    enableRowActions: false,
    enableHiding: true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      columnVisibility,
      showGlobalFilter: false,
    },
    state: {
      columnFilters,
      globalFilter,
      pagination,
      sorting,
      columnVisibility,
      isLoading,
      showProgressBars: isRefetching,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    renderTopToolbar: () => (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
          <Badge variant="outline">{(response as { meta?: { pagination?: { total?: number } } } | undefined)?.meta?.pagination?.total || 0} {t("total")}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("common.search") as string}
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <EyeOff className="h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={columnVisibility.title}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, title: checked ?? false }))}
              >
                {t("table.title")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.projectType}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, projectType: checked ?? false }))}
              >
                {t("table.projectType")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.year}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, year: checked ?? false }))}
              >
                {t("table.year")}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefetching}>
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
            {t("actions.refresh")}
          </Button>
          <Button onClick={() => setShowCreateModal(true)} size="sm">
            <PlusCircle className="h-4 w-4" />
            {t("actions.create")}
          </Button>
        </div>
      </div>
    ),
  });

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-lg font-medium text-destructive">{t("errors.loadFailed")}</p>
          <p className="text-sm text-muted-foreground mt-2">{(error as Error).message}</p>
          <Button variant="outline" onClick={handleRefresh} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("actions.retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <MantineReactTable table={table} />
      <AddProjectDialog orgUnitId={orgUnitId} isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
