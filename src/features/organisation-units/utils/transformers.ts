import type { OrgNode } from "@/components/global/tree/types";
import type { OrganisationUnit } from "../types/organisationUnitTypes";

/**
 * Transform a single OrganisationUnit to OrgNode format
 */
export const transformOrganisationUnitToOrgNode = (unit: OrganisationUnit): OrgNode => {
  return {
    id: unit.id,
    parentId: unit.parentId,
    name: unit.name,
    code: unit.code,
    shortName: unit.shortName,
    level: unit.level,
    contactEmail: unit.contactEmail,
    contactPhone: unit.contactPhone,
    latitude: unit.latitude,
    longitude: unit.longitude,
    createdAt: unit.createdAt,
    updatedAt: unit.updatedAt,
    children: unit.children?.map(transformOrganisationUnitToOrgNode) || [],
  };
};

/**
 * Transform an array of OrganisationUnits to OrgNode array
 */
export const transformOrganisationUnitsToOrgNodes = (
  units: OrganisationUnit[]
): OrgNode[] => {
  return units.map(transformOrganisationUnitToOrgNode);
};

/**
 * Find a specific organisation unit by ID in a tree structure
 */
export const findOrganisationUnitById = (
  units: OrganisationUnit[],
  id: string
): OrganisationUnit | null => {
  for (const unit of units) {
    if (unit.id === id) {
      return unit;
    }
    if (unit.children && unit.children.length > 0) {
      const found = findOrganisationUnitById(unit.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

/**
 * Find a specific organisation unit by ID in OrgNode tree structure
 */
export const findOrgNodeById = (
  nodes: OrgNode[],
  id: string
): OrgNode | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const found = findOrgNodeById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

/**
 * Get all leaf nodes (units without children) from a tree
 */
export const getLeafUnits = (units: OrganisationUnit[]): OrganisationUnit[] => {
  const leafUnits: OrganisationUnit[] = [];

  const traverse = (unitList: OrganisationUnit[]) => {
    for (const unit of unitList) {
      if (!unit.children || unit.children.length === 0) {
        leafUnits.push(unit);
      } else {
        traverse(unit.children);
      }
    }
  };

  traverse(units);
  return leafUnits;
};

/**
 * Get the hierarchy path for a specific unit
 */
export const getUnitHierarchyPath = (
  units: OrganisationUnit[],
  targetId: string
): OrganisationUnit[] => {
  const path: OrganisationUnit[] = [];

  const findPath = (unitList: OrganisationUnit[], currentPath: OrganisationUnit[]): boolean => {
    for (const unit of unitList) {
      const newPath = [...currentPath, unit];

      if (unit.id === targetId) {
        path.push(...newPath);
        return true;
      }

      if (unit.children && unit.children.length > 0) {
        if (findPath(unit.children, newPath)) {
          return true;
        }
      }
    }
    return false;
  };

  findPath(units, []);
  return path;
};
