"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "mantine-react-table";
import { MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingSpinner, ErrorDisplay } from "@/components/ui/feedback";
import { Category } from "../types/categoryTypes";
import EditCategoryDialog from "./EditCategoryDialog";
import AddChildCategoryDialog from "./AddChildCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import { useCategory } from "../hooks/useCategoryHooks";
import { useTranslations } from "next-intl";

interface CategoryTableProps {
  selectedCategoryId?: string;
  onRowClick?: (category: Category) => void;
}

export default function CategoryTable({ selectedCategoryId, onRowClick }: CategoryTableProps) {
  const t = useTranslations("categories");

  const { data: category, isLoading, error, refetch } = useCategory(selectedCategoryId ?? "", {
    includeChildren: true,
  });

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [addChildId, setAddChildId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const selectedCategory = category;

  const tableData = useMemo(
    () => (selectedCategory ? [selectedCategory, ...(selectedCategory.children ?? [])] : []),
    [selectedCategory]
  );

  const handleRowClick = useCallback((category: Category) => {
    onRowClick?.(category);
  }, [onRowClick]);

  const columns = useMemo<MRT_ColumnDef<Category>[]>(() => [
    {
      accessorKey: "name",
      header: t("table.name"),
      size: 180,
    },
    {
      accessorKey: "description",
      header: t("table.description"),
      size: 250,
      Cell: ({ cell }) => (
        <div className="text-xs text-muted-foreground truncate max-w-[220px]">
          {cell.getValue<string>() || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: t("table.updated"),
      size: 90,
      Cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        return (
          <div className="text-[10px]">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      enableColumnActions: false,
      enableSorting: false,
      enableHiding: false,
      size: 50,
      Cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" aria-label={t("table.openMenu") as string}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-xs" onClick={() => setEditId(row.original.id)}>
              <Edit className="h-3 w-3 mr-2" />
              {t("table.editCategory")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={() => setAddChildId(row.original.id)}>
              <Plus className="h-3 w-3 mr-2" />
              {t("table.addChild")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive text-xs" onClick={() => setDeleteId(row.original.id)}>
              <Trash2 className="h-3 w-3 mr-2" />
              {t("table.deleteCategory")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [t]);

  const table = useMantineReactTable({
    columns,
    data: tableData,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      pagination,
      sorting,
    },
    enableColumnActions: true,
    enableSorting: true,
    enablePagination: true,
    enableFilters: true,
    enableGlobalFilter: true,
    enableColumnOrdering: true,
    enableColumnResizing: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableHiding: true,
    manualPagination: false,
    initialState: {
      pagination: { pageSize: 8, pageIndex: 0 },
      showGlobalFilter: true,
      density: 'xs',
      columnVisibility: {
        description: true,
        updatedAt: false,
      }
    },
    mantineTableProps: {
      highlightOnHover: true,
      striped: true,
      className: "text-xs",
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row.original),
      className: `cursor-pointer ${row.index === 0 && selectedCategory ? "bg-blue-50" : ""}`,
      style: { height: '32px' },
    }),
    mantineTableHeadRowProps: {
      style: { height: '36px' },
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex gap-2 items-center">
        {selectedCategory ? (
          <div className="bg-muted/50 p-1.5 rounded-sm border">
            <p className="text-xs text-muted-foreground">
              {t("table.showing")} {" "}
              <span className="font-medium text-foreground">{selectedCategory.name}</span>
              <span className="text-[10px] ml-1">{t("table.andChildren")}</span>
            </p>
          </div>
        ) : (
          <div className="bg-muted/50 p-1.5 rounded-sm border">
            <p className="text-xs text-muted-foreground">{t("table.selectCategory")}</p>
          </div>
        )}
      </div>
    ),
    renderEmptyRowsFallback: () => (
      <div className="text-center py-4 text-xs text-muted-foreground">
        {selectedCategory ? t("table.noChildren", { name: selectedCategory.name }) : t("table.selectCategory")}
      </div>
    ),
  });

  if (!selectedCategoryId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-muted-foreground">{t("table.selectCategory")}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner message={t("loading")} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay error={error as Error} onRetry={refetch} title={t("error")} />
    );
  }

  return (
    <div className="space-y-2">
      <div className="rounded-sm border p-1">
        <MantineReactTable table={table} />
      </div>
      {editId && (
        <EditCategoryDialog
          categoryId={editId}
          isOpen={!!editId}
          onClose={() => setEditId(null)}
        />
      )}
      {addChildId && (
        <AddChildCategoryDialog
          parentId={addChildId}
          isOpen={!!addChildId}
          onClose={() => setAddChildId(null)}
        />
      )}
      {deleteId && (
        <DeleteCategoryDialog
          categoryId={deleteId}
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
