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
import { useStakeholders } from "@/features/stakeholders/hooks/useStakeholderHooks";
import { useTranslations } from "next-intl";
import type { Stakeholder } from "@/features/stakeholders/types/stakeholderTypes";

interface StakeholderSelectProps {
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
}

export default function StakeholderSelect({ value, onChange, placeholder }: StakeholderSelectProps) {
  const t = useTranslations("stakeholders");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useStakeholders({ search, limit: 10 });
  const stakeholders: Stakeholder[] = data?.data ?? [];
  const selected = stakeholders.find((s) => s.id === value);
  const selectedLabel = selected ? selected.name : "";

  const handleSelect = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedLabel || placeholder || t("form.name")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="w-56">
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={t("common.search")}
          />
          <CommandEmpty>{t("noStakeholdersFound")}</CommandEmpty>
          <CommandList>
            {stakeholders.map((s) => (
              <CommandItem key={s.id} onSelect={() => handleSelect(s.id)}>
                {s.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

