"use client";

import { useState, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "mantine-react-table";
import { useUsersByOrganisationUnit } from "@/features/users/hooks/useUserHooks";
import { User } from "@/features/users/types/userTypes";
import { useTranslations } from "next-intl";

interface OrganisationUnitUsersTableProps {
  orgUnitId: string;
}

export default function OrganisationUnitUsersTable({ orgUnitId }: OrganisationUnitUsersTableProps) {
  const t = useTranslations("users");
  const { data: usersResponse, isLoading } = useUsersByOrganisationUnit(orgUnitId);
  const users = usersResponse?.data || [];

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const getUserTypeBadge = useCallback((userType: string | undefined | null) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      ORGANISATION: "default",
      STUDENT: "secondary",
      STAFF: "outline",
      INDIVIDUAL: "destructive",
    };

    return <Badge variant={variants[userType || ""] || "default"}>{userType ? t(`userTypes.${userType.toLowerCase()}`) : t("userTypes.unknown")}</Badge>;
  }, [t]);

  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
    {
      accessorKey: "firstName",
      header: t("table.firstName"),
      Cell: ({ row }) => <div className="font-medium">{row.original.firstName} {row.original.lastName}</div>,
    },
    {
      accessorKey: "username",
      header: t("table.username"),
      Cell: ({ cell }) => <div className="font-mono text-sm">{cell.getValue<string>()}</div>,
    },
    {
      accessorKey: "email",
      header: t("table.email"),
      Cell: ({ cell }) => <div className="text-sm text-muted-foreground">{cell.getValue<string>()}</div>,
    },
    {
      accessorKey: "userType",
      header: t("table.userType"),
      Cell: ({ cell }) => getUserTypeBadge(cell.getValue<string>()),
    },
  ], [t, getUserTypeBadge]);

  const table = useMantineReactTable({
    columns,
    data: users,
    state: { columnFilters, pagination, sorting, isLoading },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  return <MantineReactTable table={table} />;
}
