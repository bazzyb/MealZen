import { ReactNode, useCallback, useState } from "react";
import DraggableFlatList, { DragEndParams } from "react-native-draggable-flatlist";

import { ViewColumn } from "@/components/Views/ViewColumn";

import { TableHeader } from "./Header";
import { HeaderCell } from "./HeaderCell";
import { TableRow } from "./Row";
import { RowCell } from "./RowCell";

type GenericData = {
  id: string | number;
} & Record<string, string | ReactNode>;

type Column<TData extends GenericData> = {
  label: string;
  accessor: keyof TData;
  width?: number;
};

type TableProps<TData extends GenericData> = {
  data: TData[];
  columns: Array<Column<TData>>;
};

export function Table<TData extends GenericData>({ data, columns }: TableProps<TData>) {
  const [items, setItems] = useState<TData[]>(data);

  const onOrderChange = useCallback(({ data: reorderedItems }: DragEndParams<TData>) => {
    setItems(reorderedItems);
  }, []);

  return (
    <DraggableFlatList
      data={items}
      renderItem={({ item, drag, isActive }) => (
        <TableRow draggableProps={{ drag, isActive }}>
          {columns.map(({ label, accessor, width }) => (
            <RowCell key={label} width={width}>
              {item[accessor]}
            </RowCell>
          ))}
        </TableRow>
      )}
      ListHeaderComponent={() => (
        <TableHeader>
          {columns.map(({ label, width }) => (
            <HeaderCell key={label} width={width}>
              {label}
            </HeaderCell>
          ))}
        </TableHeader>
      )}
      renderPlaceholder={() => <ViewColumn alignItems="center" backgroundColor="#DDD" />}
      stickyHeaderIndices={[0]}
      keyExtractor={item => item.id.toString()}
      onDragEnd={onOrderChange}
      initialNumToRender={items.length}
    />
  );
}
