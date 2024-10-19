import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import DraggableFlatList, { DragEndParams } from "react-native-draggable-flatlist";

import { ViewColumn } from "@/components/Layout/ViewColumn";

import { TableHeader } from "./Header";
import { TableRow } from "./Row";
import { GenericData, TableProps } from "./types";

export function Table<TData extends GenericData>(props: TableProps<TData>) {
  const { data, columns, onRowPress, isSortable, hideHeader, onOrderChange } = props;

  const [items, setItems] = useState<TData[]>(data);

  useEffect(() => {
    // update table when row inserted, updated or deleted
    setItems(data);
  }, [data]);

  const handleOrderChange = useCallback(({ data: reorderedItems }: DragEndParams<TData>) => {
    if (onOrderChange) {
      onOrderChange(reorderedItems, setItems);
    }
  }, []);

  if (isSortable) {
    return (
      <ViewColumn flex={1}>
        <DraggableFlatList
          data={items}
          renderItem={({ item, drag, isActive }) => (
            <TableRow
              item={item}
              columns={columns}
              onPress={() => onRowPress?.(item)}
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
    <FlatList
      data={items}
      renderItem={({ item }) => <TableRow item={item} columns={columns} onPress={() => onRowPress?.(item)} />}
      ListHeaderComponent={() => !hideHeader && <TableHeader columns={columns} />}
      stickyHeaderIndices={[0]}
      keyExtractor={item => item.id.toString()}
      initialNumToRender={items.length}
    />
  );
}
