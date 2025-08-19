"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Edit, Trash, EyeOff, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_ColumnFiltersState, type MRT_PaginationState, type MRT_SortingState } from "mantine-react-table";
import { useUserPositions } from "../hooks/useUserPositionHooks";
import { UserPosition } from "../types/userPositionTypes";
import CreateUserPositionDialog from "./CreateUserPositionDialog";
import EditUserPositionDialog from "./EditUserPositionDialog";
import DeleteUserPositionDialog from "./DeleteUserPositionDialog";
import { useTranslations } from "next-intl";

export default function UserPositionsTable() {
  const t = useTranslations("userPositions");
  const { data: response, isLoading, error, refetch } = useUserPositions();
  const [isRefetching, setIsRefetching] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selected, setSelected] = useState<UserPosition | undefined>(undefined);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    username: true,
    position: true,
    startDate: true,
    endDate: true,
    actions: true,
  });

  const data = response?.data || [];

  const handleRefresh = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  const handleEdit = useCallback((assignment: UserPosition) => {
    setSelected(assignment);
    setShowEditModal(true);
  }, []);

  const handleDelete = useCallback((assignment: UserPosition) => {
    setSelected(assignment);
    setShowDeleteDialog(true);
  }, []);

  const formatDate = (date: string | undefined | null) => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return date;
    }
  };

  const columns = useMemo<MRT_ColumnDef<UserPosition>[]>(
    () => [
      {
        accessorKey: "username",
        header: t("table.username"),
        Cell: ({ row }) => row.original.user?.username ?? row.original.userId,
      },
      {
        accessorKey: "position",
        header: t("table.position"),
        Cell: ({ row }) => row.original.position?.title ?? row.original.positionId,
      },
      {
        accessorKey: "startDate",
        header: t("table.startDate"),
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
      },
      {
        accessorKey: "endDate",
        header: t("table.endDate"),
        Cell: ({ cell }) => formatDate(cell.getValue<string>()) || "-",
      },
      {
        accessorKey: "actions",
        header: t("table.actions"),
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)} className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
              <span className="sr-only">{t("actions.edit")}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(row.original)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">{t("actions.delete")}</span>
            </Button>
          </div>
        ),
      },
    ],
    [t, handleEdit, handleDelete]
  );

  const table = useMantineReactTable({
    columns,
    data,
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
          <span className="text-sm text-muted-foreground">
            {response?.meta?.pagination?.total || 0} {t("total")}
          </span>
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
                checked={columnVisibility.username}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, username: checked ?? false }))}
              >
                {t("table.username")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.position}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, position: checked ?? false }))}
              >
                {t("table.position")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.startDate}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, startDate: checked ?? false }))}
              >
                {t("table.startDate")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.endDate}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, endDate: checked ?? false }))}
              >
                {t("table.endDate")}
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

      <CreateUserPositionDialog isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />

      {selected && (
        <>
          <EditUserPositionDialog assignment={selected} isOpen={showEditModal} onClose={() => { setShowEditModal(false); setSelected(undefined); }} />
          <DeleteUserPositionDialog assignment={selected} isOpen={showDeleteDialog} onClose={() => { setShowDeleteDialog(false); setSelected(undefined); }} />
        </>
      )}
    </div>
  );
}
