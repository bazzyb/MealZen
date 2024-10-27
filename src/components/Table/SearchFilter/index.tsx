import { IconButton } from "../../core/IconButton";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";

import { ViewRow } from "@/components/Layout/ViewRow";
import { TextInput } from "@/components/core/TextInput";
import { useAppTheme } from "@/styles/useAppTheme";

import { SelectMenu } from "./SelectMenu";

export type SharedSearchFilterProps = {
  onSearchChange?: (search: string) => void;
  onDeleteMany?: (ids: Array<string>) => Promise<void>;
};

export type SearchFilterProps = SharedSearchFilterProps & {
  isSelectedMode?: boolean;
  setIsSelectedMode?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: Array<string>;
  setSelectedItems: (items: Array<string>) => void;
};

export function SearchFilter(props: SearchFilterProps) {
  const { onSearchChange, onDeleteMany, isSelectedMode, setIsSelectedMode, selectedItems, setSelectedItems } = props;

  const [searchText, setSearchText] = useState("");

  const { colors } = useAppTheme();

  function handleSearchChange(text: string) {
    setSearchText(text);
    onSearchChange?.(text);
  }

  function toggleSelectedMode() {
    setSelectedItems?.([]);
    setIsSelectedMode?.(prev => !prev);
  }

  async function handleDeleteMany() {
    await onDeleteMany?.(selectedItems || []);
    toggleSelectedMode();
  }

  if (!onSearchChange) return null;

  return (
    <ViewRow padding={8} justifyContent="center" alignItems="center" gap={8}>
      <TextInput
        style={{ flex: 1, width: "auto" }}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearchChange}
      />
      <IconButton onPress={toggleSelectedMode} accessibilityLabel="Select multiple rows">
        {isSelectedMode ? (
          <AntDesign name="close" size={24} color={colors.text} />
        ) : (
          <FontAwesome6 name="edit" size={24} color={colors.text} />
        )}
      </IconButton>
      {isSelectedMode && <SelectMenu selectedItems={selectedItems} handleDeleteMany={handleDeleteMany} />}
    </ViewRow>
  );
}
