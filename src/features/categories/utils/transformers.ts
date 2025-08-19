import type { OrgNode } from "@/components/global/tree/types";
import type { Category } from "../types/categoryTypes";

export const transformCategoryToOrgNode = (category: Category): OrgNode => {
  return {
    id: category.id,
    parentId: category.parentId ?? null,
    name: category.name,
    code: null,
    shortName: category.name,
    level: 0,
    contactEmail: "",
    contactPhone: "",
    latitude: 0,
    longitude: 0,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    children: category.children?.map(transformCategoryToOrgNode) || [],
  };
};

export const transformCategoriesToOrgNodes = (categories: Category[]): OrgNode[] => {
  return categories.map(transformCategoryToOrgNode);
};
