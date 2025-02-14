import Checkbox from "expo-checkbox";

import { ViewRow } from "@/components/Layout/ViewRow";
import { Text } from "@/components/core/Text";

import { GenericData } from "./types";

type Props<TData extends GenericData> = {
  items: Array<TData>;
  selectedItems: Array<string>;
  setSelectedItems: (items: Array<string>) => void;
};

export function SelectAllRow<TData extends GenericData>({ items, selectedItems, setSelectedItems }: Props<TData>) {
  const allSelected = items.length === selectedItems.length;

  function handleSelectAll() {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  }

  return (
    <ViewRow alignItems="center" height={60} paddingHorizontal={16} gap={8}>
      <Checkbox
        accessibilityLabel="Select all"
        value={allSelected}
        onValueChange={handleSelectAll}
        style={{ padding: 14 }}
      />
      <Text>Select All</Text>
    </ViewRow>
  );
}
