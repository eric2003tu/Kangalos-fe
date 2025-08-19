"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Edit, Trash, EyeOff, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateStartupDialog from "./CreateStartupDialog";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "mantine-react-table";
import EditStartupDialog from "./EditStartupDialog";
import DeleteStartupDialog from "./DeleteStartupDialog";
import { useStartups } from "../hooks/useStartupHooks";
import { Startup } from "../types/startupTypes";
import { useTranslations } from "next-intl";

export default function StartupsTable() {
  const t = useTranslations("startups");
  const { data: startupsResponse, isLoading, error, refetch } = useStartups();
  const [isRefetching, setIsRefetching] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedStartupId, setSelectedStartupId] = useState<string | undefined>(
    undefined,
  );

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    description: true,
    year: true,
    registered: true,
    createdAt: false,
    actions: true,
  });

  const startups = startupsResponse?.data || [];

  const handleRefresh = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  const handleEdit = useCallback((id: string) => {
    setSelectedStartupId(id);
    setShowEditModal(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setSelectedStartupId(id);
    setShowDeleteDialog(true);
  }, []);

  const getRegisteredBadge = useCallback(
    (registered: boolean) => (
      <Badge variant={registered ? "secondary" : "destructive"}>
        {registered ? t("status.registered") : t("status.unregistered")}
      </Badge>
    ),
    [t],
  );

  const formatDate = (date: string | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  const columns = useMemo<MRT_ColumnDef<Startup>[]>(
    () => [
      { accessorKey: "name", header: t("table.name") },
      { accessorKey: "description", header: t("table.description") },
      { accessorKey: "year", header: t("table.year") },
      {
        accessorKey: "registered",
        header: t("table.registered"),
        Cell: ({ cell }) => getRegisteredBadge(cell.getValue<boolean>()),
      },
      {
        accessorKey: "createdAt",
        header: t("table.createdAt"),
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
      },
      {
        accessorKey: "actions",
        header: t("table.actions"),
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(row.original.id)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">{t("actions.edit")}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(row.original.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">{t("actions.delete")}</span>
            </Button>
          </div>
        ),
      },
    ],
    [t, handleEdit, handleDelete, getRegisteredBadge],
  );

  const table = useMantineReactTable({
    columns,
    data: startups,
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
          <Badge variant="outline">
            {
              (startupsResponse as { meta?: { pagination?: { total?: number; }; }; })
                ?.meta?.pagination?.total ?? 0
            } {t("total")}
          </Badge>
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
                checked={columnVisibility.name}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    name: checked ?? false,
                  }))
                }
              >
                {t("table.name")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.description}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    description: checked ?? false,
                  }))
                }
              >
                {t("table.description")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.year}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    year: checked ?? false,
                  }))
                }
              >
                {t("table.year")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.registered}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    registered: checked ?? false,
                  }))
                }
              >
                {t("table.registered")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.createdAt}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    createdAt: checked ?? false,
                  }))
                }
              >
                {t("table.createdAt")}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefetching}
          >
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
          <p className="text-lg font-medium text-destructive">
            {t("errors.loadFailed")}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {error.message}
          </p>
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="mt-4"
          >
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

      <CreateStartupDialog
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {selectedStartupId && (
        <>
          <EditStartupDialog
            startupId={selectedStartupId}
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedStartupId(undefined);
            }}
          />

          <DeleteStartupDialog
            startupId={selectedStartupId}
            isOpen={showDeleteDialog}
            onClose={() => {
              setShowDeleteDialog(false);
              setSelectedStartupId(undefined);
            }}
          />
        </>
      )}
    </div>
  );
}

