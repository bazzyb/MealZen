import { useState } from "react";

import { ViewRow } from "@/components/Layout/ViewRow";
import { TextInput } from "@/components/core/TextInput";

export type SearchFilterProps = {
  onSearchChange?: (search: string) => void;
  // onSortChange?: (sort: string) => void;
};

export function SearchFilter({ onSearchChange }: SearchFilterProps) {
  const [searchText, setSearchText] = useState("");

  function handleSearchChange(text: string) {
    setSearchText(text);
    onSearchChange?.(text);
  }

  if (!onSearchChange) return null;

  return (
    <ViewRow padding={8}>
      <TextInput placeholder="Search..." value={searchText} onChangeText={handleSearchChange} />
    </ViewRow>
  );
}
