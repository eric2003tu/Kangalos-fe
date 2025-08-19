"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { OrganizationTree, OrgNode } from "@/components/global/tree";
import { useOrganisationUnitTree } from "@/features/organisation-units/hooks/useOrganisationUnitHooks";
import {
  transformOrganisationUnitsToOrgNodes,
  findOrgNodeById,
} from "@/features/organisation-units/utils/transformers";
import { useTranslations } from "next-intl";

interface OrganisationUnitSelectProps {
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
}

export default function OrganisationUnitSelect({
  value,
  onChange,
  placeholder,
}: OrganisationUnitSelectProps) {
  const t = useTranslations("organisationUnits");
  const [open, setOpen] = useState(false);
  const { data } = useOrganisationUnitTree();

  const nodes = useMemo(
    () => (data ? transformOrganisationUnitsToOrgNodes(data) : []),
    [data]
  );

  const treeData = useMemo(() => ({ data: nodes }), [nodes]);

  const selectedLabel = useMemo(() => {
    if (!value) return "";
    const node = findOrgNodeById(nodes, value);
    return node?.name ?? "";
  }, [value, nodes]);

  const handleSelect = (node: OrgNode | null) => {
    onChange(node?.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedLabel || placeholder || t("table.selectUnit")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 max-h-64 overflow-auto">
        <OrganizationTree
          data={treeData}
          treeLabel={t("tree.title")}
          rootLabel={t("tree.rootLabel")}
          initiallyExpandedItems={["root"]}
          onSelectionChange={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
