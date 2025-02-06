import { useCallback, useEffect, useMemo, useState } from "react";
import DraggableFlatList, { DragEndParams } from "react-native-draggable-flatlist";
import Animated from "react-native-reanimated";

import { ViewColumn } from "@/components/Layout/ViewColumn";

import { NoItemsFound } from "./NoItemsFound";
import { TableRow } from "./Row";
import { SearchFilter, SharedSearchFilterProps } from "./SearchFilter";
import { SelectAllRow } from "./SelectAllRow";
import { GenericData, TableProps } from "./types";

type Props<TData extends GenericData> = TableProps<TData> & SharedSearchFilterProps;

export function Table<TData extends GenericData>(props: Props<TData>) {
  const { data, columns, onRowPress, isSortable, onOrderChange, onSearchChange, onDeleteMany, deleteWarning } = props;

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
        deleteWarning={deleteWarning}
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
        {!!onSearchChange && SearchFilterComponent}
        <NoItemsFound />
      </ViewColumn>
    );
  }

  if (isSortable) {
    return (
      <ViewColumn flex={1}>
        {!!onSearchChange && SearchFilterComponent}
        {isSelectMode && (
          <SelectAllRow items={items} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        )}
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
          renderPlaceholder={() => <ViewColumn alignItems="center" backgroundColor="#DDD" />}
          keyExtractor={item => item.id.toString()}
          onDragEnd={handleOrderChange}
          initialNumToRender={items.length}
        />
      </ViewColumn>
    );
  }

  return (
    <ViewColumn flex={1}>
      {!!onSearchChange && SearchFilterComponent}
      {isSelectMode && <SelectAllRow items={items} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />}
      <Animated.FlatList
        // itemLayoutAnimation={CurvedTransition}
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
        initialNumToRender={items.length}
      />
    </ViewColumn>
  );
}
