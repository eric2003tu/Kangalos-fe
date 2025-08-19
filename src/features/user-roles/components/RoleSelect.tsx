"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { useRoles } from "@/features/roles/hooks/useRoleHooks";
import { useTranslations } from "next-intl";
import type { Role } from "@/features/roles/types/roleTypes";

interface RoleSelectProps {
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
}

export default function RoleSelect({ value, onChange, placeholder }: RoleSelectProps) {
  const t = useTranslations("userRoles");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useRoles({ search, limit: 10 });
  const roles: Role[] = data?.data ?? [];
  const selectedRole = roles.find((r) => r.id === value);
  const selectedLabel = selectedRole?.name ?? "";

  const handleSelect = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedLabel || placeholder || t("form.roleIdPlaceholder")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="w-56">
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={t("common.search")}
          />
          <CommandEmpty>{t("noRolesFound")}</CommandEmpty>
          <CommandList>
            {roles.map((role) => (
              <CommandItem key={role.id} onSelect={() => handleSelect(role.id)}>
                {role.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
