export interface OrgNode {
  id: string;
  parentId: string | null;
  name: string;
  code: string | null;
  shortName: string;
  level: number;
  contactEmail: string;
  contactPhone: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  children: OrgNode[];
}

export interface OrgData {
  data: OrgNode[];
}

export interface TreeItem {
  index: string;
  canMove: boolean;
  isFolder: boolean;
  children: string[];
  data: string;
  canRename: boolean;
  orgData?: OrgNode; // Store the full org data
}

export interface TreeItems {
  [key: string]: TreeItem;
}

export interface OrganizationTreeProps {
  data: OrgData;
  rootLabel?: string;
  canDragAndDrop?: boolean;
  canReorderItems?: boolean;
  canDropOnFolder?: boolean;
  canDropOnNonFolder?: boolean;
  initiallyExpandedItems?: string[];
  treeLabel?: string;
  onSelectionChange?: (selectedOrgData: OrgNode | null) => void;
}
