import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import DraggableFlatList, { DragEndParams } from "react-native-draggable-flatlist";

import { ViewColumn } from "@/components/Layout/ViewColumn";

import { TableHeader } from "./Header";
import { NoItemsFound } from "./NoItemsFound";
import { TableRow } from "./Row";
import { SearchFilter, SharedSearchFilterProps } from "./SearchFilter";
import { GenericData, TableProps } from "./types";

type Props<TData extends GenericData> = TableProps<TData> & SharedSearchFilterProps;

export function Table<TData extends GenericData>(props: Props<TData>) {
  const { data, columns, onRowPress, isSortable, hideHeader, onOrderChange, onSearchChange, onDeleteMany } = props;

  const [items, setItems] = useState<TData[]>(data);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  useEffect(() => {
    // update table when row inserted, updated or deleted
    setItems(data);
  }, [data]);

  const handleOrderChange = useCallback(({ data: reorderedItems }: DragEndParams<TData>) => {
    if (onOrderChange) {
      onOrderChange(reorderedItems, setItems);
    }
  }, []);

  function handleSelectedItem(id: string, isSelected: boolean) {
    if (isSelected) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  }

  const SearchFilterComponent = useMemo(
    () => (
      <SearchFilter
        onSearchChange={onSearchChange}
        onDeleteMany={onDeleteMany}
        isSelectedMode={isSelectMode}
        setIsSelectedMode={setIsSelectMode}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    ),
    [isSelectMode, selectedItems],
  );

  if (!items.length) {
    return (
      <ViewColumn flex={1} height="100%">
        {SearchFilterComponent}
        <NoItemsFound />
      </ViewColumn>
    );
  }

  if (isSortable) {
    return (
      <ViewColumn flex={1}>
        {SearchFilterComponent}
        <DraggableFlatList
          data={items}
          renderItem={({ item, drag, isActive }) => (
            <TableRow
              item={item}
              columns={columns}
              onPress={() => onRowPress?.(item)}
              isSelectMode={isSelectMode}
              isSelected={selectedItems.includes(item.id)}
              handleSelectedItem={handleSelectedItem}
              draggableProps={{ drag, isActive }}
            />
          )}
          ListHeaderComponent={() => !hideHeader && <TableHeader columns={columns} />}
          renderPlaceholder={() => <ViewColumn alignItems="center" backgroundColor="#DDD" />}
          stickyHeaderIndices={[0]}
          keyExtractor={item => item.id.toString()}
          onDragEnd={handleOrderChange}
          initialNumToRender={items.length}
        />
      </ViewColumn>
    );
  }

  return (
    <ViewColumn flex={1}>
      {SearchFilterComponent}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TableRow
            item={item}
            columns={columns}
            onPress={() => onRowPress?.(item)}
            isSelectMode={isSelectMode}
            isSelected={selectedItems.includes(item.id)}
            handleSelectedItem={handleSelectedItem}
          />
        )}
        ListHeaderComponent={() => !hideHeader && <TableHeader columns={columns} />}
        stickyHeaderIndices={[0]}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={items.length}
      />
    </ViewColumn>
  );
}
