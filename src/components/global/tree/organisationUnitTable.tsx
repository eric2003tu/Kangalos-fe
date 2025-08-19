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
import { MoreHorizontal, Plus, Edit, Trash2, Users, Building, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { OrgNode } from "./types";
import EditOrganisationUnitDialog from "@/features/organisation-units/components/EditOrganisationUnitDialog";
import AddChildDialog from "@/features/organisation-units/components/AddChildDialog";
import DeleteOrganisationUnitDialog from "@/features/organisation-units/components/DeleteOrganisationUnitDialog";
import { useTranslations } from "next-intl";

interface OrganisationUnitTableProps {
  selectedUnit?: OrgNode;
  onRowClick?: (unit: OrgNode) => void;
}

export function OrganisationUnitTable({ selectedUnit, onRowClick }: OrganisationUnitTableProps) {
  const t = useTranslations("organisationUnits");
  // Table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [addChildId, setAddChildId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  // Memoize children calculation to prevent unnecessary recalculations
  const children = useMemo(() => selectedUnit?.children || [], [selectedUnit?.children]);

  // Memoize table data to prevent unnecessary re-renders
  const tableData = useMemo(() =>
    selectedUnit ? [selectedUnit, ...children] : [],
    [selectedUnit, children]
  );

  const handleRowClick = useCallback((unit: OrgNode) => {
    onRowClick?.(unit);
  }, [onRowClick]);

  // Memoize columns definition to prevent recreation on every render
  const columns = useMemo<MRT_ColumnDef<OrgNode>[]>(() => [
    {
      accessorKey: "name",
      header: t("table.name"),
      size: 180,
      Cell: ({ row }) => (
        <div className="flex flex-col">
          <div className="font-medium text-xs truncate max-w-[160px]">{row.original.name}</div>
          {row.original.shortName && (
            <div className="text-[10px] text-muted-foreground truncate max-w-[160px]">{row.original.shortName}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: t("table.code"),
      size: 80,
      Cell: ({ row }) => <div className="text-[10px] font-mono">{row.original.code || "N/A"}</div>,
    },
    {
      accessorKey: "level",
      header: t("table.level"),
      size: 60,
      Cell: ({ row }) => (
        <Badge variant="secondary" className="text-[10px] px-1 py-0">
          {row.original.level}
        </Badge>
      ),
    },
    {
      accessorKey: "contactEmail",
      header: t("table.email"),
      size: 150,
      Cell: ({ row }) => <div className="text-[10px] truncate max-w-[130px]">{row.original.contactEmail || "N/A"}</div>,
    },
    {
      accessorKey: "contactPhone",
      header: t("table.phone"),
      size: 110,
      Cell: ({ row }) => <div className="text-[10px]">{row.original.contactPhone || "N/A"}</div>,
    },
    {
      accessorKey: "coordinates",
      header: t("table.location"),
      size: 120,
      Cell: ({ row }) => (
        <div className="text-[10px]">
          {row.original.latitude && row.original.longitude
            ? `${row.original.latitude.toFixed(2)}, ${row.original.longitude.toFixed(2)}`
            : "N/A"}
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
      id: "actions",
      header: t("table.actions"),
      size: 50,
      enableHiding: false,
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-5 w-5 p-0">
              <span className="sr-only">{t("table.openMenu")}</span>
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="text-xs" onClick={() => router.push(`/dashboard/organisation-units/${row.original.id}`)}>
              <Eye className="h-3 w-3 mr-2" />
              {t("table.viewDetails")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={() => setEditId(row.original.id)}>
              <Edit className="h-3 w-3 mr-2" />
              {t("table.editUnit")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={() => setAddChildId(row.original.id)}>
              <Plus className="h-3 w-3 mr-2" />
              {t("table.addChild")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={() => router.push(`/dashboard/organisation-units/${row.original.id}#positions`)}>
              <Building className="h-3 w-3 mr-2" />
              {t("table.managePositions")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={() => router.push(`/dashboard/organisation-units/${row.original.id}#users`)}>
              <Users className="h-3 w-3 mr-2" />
              {t("table.viewUsers")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive text-xs" onClick={() => setDeleteId(row.original.id)}>
              <Trash2 className="h-3 w-3 mr-2" />
              {t("table.deleteUnit")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [t, router]);

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
      // Don't set columnVisibility in state, let it be managed by the table
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
      density: 'xs', // This sets the smallest density
      columnVisibility: {
        // Hide these columns by default in initialState instead
        code: false,
        contactEmail: false,
        contactPhone: false,
        coordinates: false,
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
      className: `cursor-pointer ${row.index === 0 && selectedUnit ? "bg-blue-50" : ""}`,
      style: { height: '32px' }, // Make rows smaller
    }),
    mantineTableHeadRowProps: {
      style: { height: '36px' }, // Make header smaller
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex gap-2 items-center">
        {selectedUnit ? (
          <div className="bg-muted/50 p-1.5 rounded-sm border">
            <p className="text-xs text-muted-foreground">
              {t("table.showing")} {" "}
              <span className="font-medium text-foreground">{selectedUnit.name}</span>
              <span className="text-[10px] ml-1">{t("table.andChildren")}</span>
            </p>
          </div>
        ) : (
          <div className="bg-muted/50 p-1.5 rounded-sm border">
            <p className="text-xs text-muted-foreground">{t("table.selectUnit")}</p>
          </div>
        )}
      </div>
    ),
    renderEmptyRowsFallback: () => (
      <div className="text-center py-4 text-xs text-muted-foreground">
        {selectedUnit ? t("table.noChildren", { name: selectedUnit.name }) : t("table.selectUnit")}
      </div>
    ),
  });

  return (
    <div className="space-y-2">
      <div className="rounded-sm border p-1">
        <MantineReactTable table={table} />
      </div>
      {editId && (
        <EditOrganisationUnitDialog
          unitId={editId}
          isOpen={!!editId}
          onClose={() => setEditId(null)}
        />
      )}
      {addChildId && (
        <AddChildDialog
          parentId={addChildId}
          isOpen={!!addChildId}
          onClose={() => setAddChildId(null)}
        />
      )}
      {deleteId && (
        <DeleteOrganisationUnitDialog
          unitId={deleteId}
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
