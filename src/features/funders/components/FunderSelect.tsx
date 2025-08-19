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
import { useFunders } from "@/features/funders/hooks/useFunderHooks";
import { useTranslations } from "next-intl";
import type { Funder } from "@/features/funders/types/funderTypes";

interface FunderSelectProps {
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
}

export default function FunderSelect({ value, onChange, placeholder }: FunderSelectProps) {
  const t = useTranslations("funders");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useFunders({ search, limit: 10 });
  const funders: Funder[] = data?.data ?? [];
  const selected = funders.find((f) => f.id === value);
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
          <CommandEmpty>{t("noFundersFound")}</CommandEmpty>
          <CommandList>
            {funders.map((f) => (
              <CommandItem key={f.id} onSelect={() => handleSelect(f.id)}>
                {f.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

