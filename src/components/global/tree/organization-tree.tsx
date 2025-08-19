'use client';

import { useState, useMemo, useCallback } from "react";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";
import { OrganizationTreeProps, TreeItems, OrgNode } from "./types";

const transformOrgData = (
  orgData: OrganizationTreeProps['data'],
  rootLabel: string
): { items: TreeItems; orgLookup: Map<string, OrgNode> } => {
  const items: TreeItems = {};
  const orgLookup = new Map<string, OrgNode>();

  const processNode = (node: OrganizationTreeProps['data']['data'][0]): void => {
    orgLookup.set(node.id, node);

    items[node.id] = {
      index: node.id,
      canMove: true,
      isFolder: node.children.length > 0,
      children: node.children.map(child => child.id),
      data: node.name,
      canRename: true,
      orgData: node
    };

    node.children.forEach(processNode);
  };

  // Create root item
  items.root = {
    index: 'root',
    canMove: true,
    isFolder: true,
    children: orgData.data.map(item => item.id),
    data: rootLabel,
    canRename: true
  };

  // Process all nodes
  orgData.data.forEach(processNode);

  return { items, orgLookup };
};

export function OrganizationTree({
  data,
  rootLabel = 'Organizations',
  canDragAndDrop = true,
  canReorderItems = true,
  canDropOnFolder = true,
  canDropOnNonFolder = false,
  initiallyExpandedItems = ['root'],
  treeLabel = 'Organization Tree',
  onSelectionChange
}: OrganizationTreeProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Memoize the transformed data to prevent unnecessary recalculations
  const treeData = useMemo(() => transformOrgData(data, rootLabel ?? 'Organizations'), [data, rootLabel]);

  // Memoize the selection handler to prevent unnecessary re-renders
  const handleSelectionChange = useCallback((newSelectedItems: (string | number)[]) => {
    const stringItems = newSelectedItems.map(item => String(item));
    setSelectedItems(stringItems);

    if (onSelectionChange) {
      if (stringItems.length > 0) {
        const selectedId = stringItems[0];
        const selectedOrgData = treeData.orgLookup.get(selectedId);
        onSelectionChange(selectedOrgData || null);
      } else {
        onSelectionChange(null);
      }
    }
  }, [onSelectionChange, treeData.orgLookup]);

  // Memoize the data provider to prevent recreation on every render
  const dataProvider = useMemo(() =>
    new StaticTreeDataProvider(treeData.items, (item, data) => ({
      ...item,
      data,
    })), [treeData.items]);

  // Memoize the view state to prevent object recreation
  const viewState = useMemo(() => ({
    "tree-1": {
      expandedItems: initiallyExpandedItems,
      selectedItems: selectedItems,
    },
  }), [initiallyExpandedItems, selectedItems]);

  return (
    <UncontrolledTreeEnvironment
      dataProvider={dataProvider}
      getItemTitle={(item) => item.data}
      canDragAndDrop={canDragAndDrop}
      canReorderItems={canReorderItems}
      canDropOnFolder={canDropOnFolder}
      canDropOnNonFolder={canDropOnNonFolder}
      viewState={viewState}
      onSelectItems={handleSelectionChange}
    >
      <Tree treeId="tree-1" rootItem="root" treeLabel={treeLabel} />
    </UncontrolledTreeEnvironment>
  );
}
