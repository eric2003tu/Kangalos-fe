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
import CreateUserDialog from "./CreateUserDialog";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "mantine-react-table";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import { useUsers } from "../hooks/useUserHooks";
import { User } from "../types/userTypes";
import { useTranslations } from "next-intl";

export default function UsersTable() {
  const t = useTranslations("users");
  const { data: usersResponse, isLoading, error, refetch } = useUsers();
  const [isRefetching, setIsRefetching] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);

  // Table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  // Column visibility state - hide username, phone, email, and createdAt by default
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    firstName: true,
    username: false,
    email: false,
    phone: false,
    userType: true,
    isVerified: true,
    createdAt: false,
    actions: true,
  });

  const users = usersResponse?.data || [];

  const handleRefresh = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  const handleEdit = useCallback((userId: string) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  }, []);

  const handleDelete = useCallback((userId: string) => {
    setSelectedUserId(userId);
    setShowDeleteDialog(true);
  }, []);

  const getUserTypeBadge = useCallback((userType: string | undefined | null) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      ORGANISATION: "default",
      STUDENT: "secondary",
      STAFF: "outline",
      INDIVIDUAL: "destructive",
    };

    return (
      <Badge variant={variants[userType || ""] || "default"}>
        {userType ? t(`userTypes.${userType.toLowerCase()}`) : t("userTypes.unknown")}
      </Badge>
    );
  }, [t]);

  const getVerificationBadge = useCallback((isVerified: boolean) => {
    return (
      <Badge variant={isVerified ? "default" : "destructive"}>
        {isVerified ? t("status.verified") : t("status.unverified")}
      </Badge>
    );
  }, [t]);

  const formatDate = (date: string | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  // Define columns for Mantine React Table
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: t("table.firstName"),
        Cell: ({ row }) => (
          <div className="font-medium">
            {row.original.firstName} {row.original.lastName}
          </div>
        ),
      },
      {
        accessorKey: "username",
        header: t("table.username"),
        Cell: ({ cell }) => (
          <div className="font-mono text-sm">
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: t("table.email"),
        Cell: ({ cell }) => (
          <div className="text-sm text-muted-foreground">
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: t("table.phone"),
        Cell: ({ cell }) => (
          <div className="text-sm">
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "userType",
        header: t("table.userType"),
        Cell: ({ cell }) => getUserTypeBadge(cell.getValue<string>()),
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { value: "ORGANISATION", label: t("userTypes.organisation") },
            { value: "STUDENT", label: t("userTypes.student") },
            { value: "STAFF", label: t("userTypes.staff") },
            { value: "INDIVIDUAL", label: t("userTypes.individual") },
          ],
        },
      },
      {
        accessorKey: "isVerified",
        header: t("table.verification"),
        Cell: ({ cell }) => getVerificationBadge(cell.getValue<boolean>()),
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { value: "true", label: t("status.verified") },
            { value: "false", label: t("status.unverified") },
          ],
        },
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
            <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original.id)} className="h-8 w-8 p-0">
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
    [t, getUserTypeBadge, getVerificationBadge, handleEdit, handleDelete]
  );

  const table = useMantineReactTable({
    columns,
    data: users,
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
      showGlobalFilter: false, // We're using custom search input
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
            {usersResponse?.meta?.pagination?.total || 0} {t("total")}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("common.search")}
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
                checked={columnVisibility.firstName}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, firstName: checked ?? false }))
                }
              >
                {t("table.firstName")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.username}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, username: checked ?? false }))
                }
              >
                {t("table.username")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.email}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, email: checked ?? false }))
                }
              >
                {t("table.email")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.phone}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, phone: checked ?? false }))
                }
              >
                {t("table.phone")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.userType}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, userType: checked ?? false }))
                }
              >
                {t("table.userType")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.isVerified}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, isVerified: checked ?? false }))
                }
              >
                {t("table.verification")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columnVisibility.createdAt}
                onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, createdAt: checked ?? false }))
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
          <Button
            onClick={() => setShowCreateModal(true)}
            size="sm"
          >
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

      <CreateUserDialog
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {selectedUserId && (
        <>
          <EditUserDialog
            userId={selectedUserId}
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedUserId(undefined);
            }}
          />

          <DeleteUserDialog
            userId={selectedUserId}
            isOpen={showDeleteDialog}
            onClose={() => {
              setShowDeleteDialog(false);
              setSelectedUserId(undefined);
            }}
          />
        </>
      )}
    </div>
  );
}