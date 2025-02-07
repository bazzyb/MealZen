import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";

import { ViewRow } from "@/components/Layout/ViewRow";
import { SectionOverlay } from "@/components/SectionOverlay";
import { IconButton } from "@/components/core/IconButton";
import { Text } from "@/components/core/Text";
import { TextInput } from "@/components/core/TextInput";
import { useAppTheme } from "@/styles/useAppTheme";

import { SelectMenu } from "./SelectMenu";

export type SharedSearchFilterProps = {
  onSearchChange?: (search: string) => void;
  onDeleteMany?: (ids: Array<string>) => Promise<void>;
  deleteWarning?: string;
};

export type SearchFilterProps = SharedSearchFilterProps & {
  isSelectedMode?: boolean;
  setIsSelectedMode?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: Array<string>;
  setSelectedItems: (items: Array<string>) => void;
};

export function SearchFilter(props: SearchFilterProps) {
  const {
    onSearchChange,
    onDeleteMany,
    isSelectedMode,
    setIsSelectedMode,
    selectedItems,
    setSelectedItems,
    deleteWarning,
  } = props;

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

  return (
    <SectionOverlay position="top" style={{ gap: 8, padding: 12 }}>
      <ViewRow gap={8} height={50}>
        <TextInput placeholder="Search..." value={searchText} onChangeText={handleSearchChange} style={{ flex: 1 }} />
        {onDeleteMany && !isSelectedMode && (
          <IconButton onPress={toggleSelectedMode} accessibilityLabel="Turn on select mode">
            <FontAwesome6 name="edit" size={24} color={colors.text} />
          </IconButton>
        )}
        {onDeleteMany && isSelectedMode && (
          <IconButton onPress={toggleSelectedMode} accessibilityLabel="Turn off select mode">
            <AntDesign name="close" size={24} color={colors.text} />
          </IconButton>
        )}
      </ViewRow>

      {isSelectedMode && (
        <ViewRow justifyContent="flex-end" alignItems="center" gap={8}>
          <Text>Selected Items: {selectedItems.length}</Text>
          {onDeleteMany && (
            <SelectMenu
              selectedItems={selectedItems}
              handleDeleteMany={handleDeleteMany}
              deleteWarning={deleteWarning}
            />
          )}
        </ViewRow>
      )}
    </SectionOverlay>
  );
}
