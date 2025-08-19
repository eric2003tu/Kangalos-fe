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
import { useSearchUsers } from "@/features/users/hooks/useUserHooks";
import { useTranslations } from "next-intl";
import type { User } from "@/features/users/types/userTypes";

interface UserSelectProps {
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
}

export default function UserSelect({
  value,
  onChange,
  placeholder,
}: UserSelectProps) {
  const t = useTranslations("userRoles");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useSearchUsers({ search, limit: 10 });
  const users: User[] = data?.data ?? [];
  const selectedUser = users.find((u) => u.id === value);
  const selectedLabel = selectedUser
    ? `${selectedUser.firstName ?? ""} ${selectedUser.lastName ?? ""}`.trim()
    : "";

  const handleSelect = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedLabel || placeholder || t("form.userIdPlaceholder")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="w-56">
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={t("common.search")}
          />
          <CommandEmpty>{t("noUsersFound")}</CommandEmpty>
          <CommandList>
            {users.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => handleSelect(user.id)}
              >
                {`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
                  user.email ||
                  user.id}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
